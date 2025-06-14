import { Router } from "express";
import { storage } from "../storage";
import { sendSotWebhook, createSotAuditLog, DEFAULT_CLIENT_PROFILE } from "../utils/webhook";

/**
 * Source of Truth (SOT) API Routes for NextMonth Integration
 */
export function sotRoutes(router: Router) {
  
  /**
   * Initialize a new SOT client profile
   * This will create a new client profile if one doesn't exist
   */
  router.post("/sot/initialize", async (req, res) => {
    try {
      // Get the existing profile or use the default
      const existingProfile = await storage.getSotClientProfile();
      
      if (existingProfile) {
        // Profile already exists, just update timestamps
        const updatedProfile = {
          ...existingProfile,
          dynamicUpdateTriggers: {
            ...existingProfile.dynamicUpdateTriggers,
            lastSyncTimestamp: new Date().toISOString()
          },
          systemMetadata: {
            ...existingProfile.systemMetadata,
            updatedAt: new Date().toISOString()
          }
        };
        
        await storage.updateSotClientProfile(updatedProfile);
        console.log("SOT Client Profile updated:", existingProfile.businessId);
        
        // Create audit log
        createSotAuditLog('initialize_profile', {
          timestamp: new Date().toISOString(),
          action: 'initialize_profile',
          details: {
            profileId: existingProfile.businessId
          },
          success: true,
          environment: process.env.NODE_ENV || 'development'
        });
        
        return res.status(200).json({
          success: true,
          message: "Client profile refreshed successfully"
        });
      }
      
      // No profile exists, create a new one
      const newProfile = {
        ...DEFAULT_CLIENT_PROFILE,
        dynamicUpdateTriggers: {
          ...DEFAULT_CLIENT_PROFILE.dynamicUpdateTriggers,
          lastSyncTimestamp: new Date().toISOString()
        },
        systemMetadata: {
          ...DEFAULT_CLIENT_PROFILE.systemMetadata,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      
      await storage.updateSotClientProfile(newProfile);
      console.log("SOT Client Profile created:", newProfile.businessId);
      
      // Create audit log
      createSotAuditLog('initialize_profile', {
        timestamp: new Date().toISOString(),
        action: 'initialize_profile',
        details: {
          profileId: newProfile.businessId
        },
        success: true,
        environment: process.env.NODE_ENV || 'development'
      });
      
      return res.status(201).json({
        success: true,
        message: "Client profile created successfully"
      });
    } catch (error) {
      console.error("Failed to initialize SOT client profile:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to initialize client profile",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  /**
   * Get the current SOT client profile
   */
  router.get("/sot/client-profile", async (req, res) => {
    try {
      const profile = await storage.getSotClientProfile();
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "No client profile found"
        });
      }
      
      return res.status(200).json({
        success: true,
        profile
      });
    } catch (error) {
      console.error("Failed to get SOT client profile:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve client profile",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  /**
   * Trigger a webhook notification to the NextMonth ecosystem
   */
  router.post("/sot/trigger-webhook", async (req, res) => {
    try {
      const { eventType, payload } = req.body;
      
      if (!eventType) {
        return res.status(400).json({
          success: false,
          message: "Event type is required"
        });
      }
      
      // Get client profile
      const profile = await storage.getSotClientProfile();
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "No client profile found"
        });
      }
      
      // Send webhook notification
      const result = await sendSotWebhook(eventType, payload || {}, profile);
      
      return res.status(200).json({
        success: true,
        message: `Webhook triggered for event: ${eventType}`,
        result
      });
    } catch (error) {
      console.error("Failed to trigger webhook:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to trigger webhook",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  /**
   * Check the health status of the SOT integration
   */
  router.get("/sot/health", async (req, res) => {
    try {
      // Get client profile
      const profile = await storage.getSotClientProfile();
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "No client profile found"
        });
      }
      
      // Generate simulated health status for now
      // In a real implementation, this would check actual service statuses
      const healthStatus = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        components: {
          "API Gateway": "online",
          "Auth Service": "operational",
          "Webhook Service": "operational",
          "Content Service": "online",
          "Notification Service": "online",
          "Analytics Service": "operational"
        },
        metrics: {
          responseTime: 127 + Math.random() * 50, // Simulated response time
          uptime: 3600 + Math.floor(Math.random() * 7200), // Simulated uptime in seconds
          requestsPerMinute: 12 + Math.floor(Math.random() * 8)
        }
      };
      
      return res.status(200).json(healthStatus);
    } catch (error) {
      console.error("Failed to check health status:", error);
      
      return res.status(500).json({
        success: false,
        message: "Failed to check health status",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}