import { Router } from "express";
import { storage } from "../storage";
import { DEFAULT_CLIENT_PROFILE, sendSotWebhook, createSotAuditLog } from "../utils/webhook";

// Source of Truth (SOT) integration endpoints
export function sotRoutes(router: Router) {
  // Initialize endpoint to create default client profile
  router.post("/sot/initialize", async (req, res) => {
    try {
      // Check if profile already exists
      const existingProfile = await storage.getSotClientProfile();
      
      if (existingProfile) {
        return res.status(200).json({
          success: true,
          message: "Client profile already initialized",
          profile: existingProfile
        });
      }
      
      // Initialize with default profile
      const clientProfile = await storage.updateSotClientProfile(DEFAULT_CLIENT_PROFILE);
      
      // Create audit log
      createSotAuditLog('initialize_profile', { profileId: clientProfile.businessId });
      
      return res.status(201).json({
        success: true,
        message: "Client profile initialized successfully",
        timestamp: new Date().toISOString(),
        profile: clientProfile
      });
    } catch (error) {
      console.error("Error initializing SOT client profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to initialize client profile",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Endpoint to update client profile in SOT
  router.post("/sot/update-client-profile", async (req, res) => {
    try {
      const clientProfile = req.body;

      // Create audit log
      createSotAuditLog('update_profile', { 
        profileId: clientProfile.businessId,
        updateType: 'manual'
      });
      
      // Store the profile update in our database
      await storage.updateSotClientProfile(clientProfile);

      // Send webhook notification about the update
      await sendSotWebhook('system_update', {
        action: 'profile_updated',
        timestamp: new Date().toISOString()
      }, clientProfile);
      
      return res.status(200).json({
        success: true,
        message: "Client profile updated successfully",
        timestamp: new Date().toISOString(),
        profile: clientProfile
      });
    } catch (error) {
      console.error("Error updating SOT client profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update client profile",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Endpoint to get the latest client profile
  router.get("/sot/client-profile", async (req, res) => {
    try {
      let clientProfile = await storage.getSotClientProfile();
      
      if (!clientProfile) {
        // If no profile exists yet, initialize with default
        clientProfile = await storage.updateSotClientProfile(DEFAULT_CLIENT_PROFILE);
        createSotAuditLog('create_default_profile', { 
          profileId: clientProfile.businessId,
          reason: 'auto_init_on_get'
        });
      }
      
      return res.status(200).json({
        success: true,
        profile: clientProfile
      });
    } catch (error) {
      console.error("Error fetching SOT client profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch client profile",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint for SOT monitoring
  router.get("/sot/health", async (req, res) => {
    try {
      // Gather system health metrics
      const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        components: {
          server: "online",
          contactForm: "operational",
          services: "available"
        },
        metrics: {
          responseTime: process.hrtime()[1] / 1000000, // Nanoseconds to milliseconds
          uptime: process.uptime()
        }
      };
      
      // Record health check in audit log
      createSotAuditLog('health_check', {
        status: health.status,
        components: health.components
      });
      
      return res.status(200).json(health);
    } catch (error) {
      console.error("Error checking SOT health:", error);
      
      // Record failed health check
      createSotAuditLog('health_check', {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : "Unknown error"
      }, false);
      
      return res.status(500).json({
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Endpoint to manually trigger a webhook notification (for testing)
  router.post("/sot/trigger-webhook", async (req, res) => {
    try {
      const { eventType, payload } = req.body;
      
      if (!eventType || !['service_update', 'contact_submission', 'content_update', 'system_update'].includes(eventType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event type. Must be one of: service_update, contact_submission, content_update, system_update"
        });
      }
      
      const clientProfile = await storage.getSotClientProfile();
      
      if (!clientProfile) {
        return res.status(404).json({
          success: false,
          message: "Client profile not found. Initialize profile first."
        });
      }
      
      // Create audit log for webhook trigger
      createSotAuditLog('trigger_webhook', {
        eventType,
        payload
      });
      
      // Send the webhook
      const result = await sendSotWebhook(
        eventType as any,
        payload || { test: true, timestamp: new Date().toISOString() },
        clientProfile
      );
      
      return res.status(result.success ? 200 : 500).json({
        success: result.success,
        message: result.message
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to trigger webhook",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}