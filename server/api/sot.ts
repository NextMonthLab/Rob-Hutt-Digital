import { Router } from "express";
import { storage } from "../storage";

// Source of Truth (SOT) integration endpoints
export function sotRoutes(router: Router) {
  // Endpoint to update client profile in SOT
  router.post("/sot/update-client-profile", async (req, res) => {
    try {
      const clientProfile = req.body;

      // Log the update for audit purposes
      console.log(`SOT client profile update: ${new Date().toISOString()}`);
      
      // Store the profile update in our database (if needed)
      await storage.updateSotClientProfile(clientProfile);
      
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
      const clientProfile = await storage.getSotClientProfile();
      
      if (!clientProfile) {
        return res.status(404).json({
          success: false,
          message: "Client profile not found"
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
      
      return res.status(200).json(health);
    } catch (error) {
      console.error("Error checking SOT health:", error);
      return res.status(500).json({
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      });
    }
  });
}