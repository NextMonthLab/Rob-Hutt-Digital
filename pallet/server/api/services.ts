import { Router } from "express";
import { storage } from "../storage";

export function servicesRoutes(router: Router) {
  // Get all services
  router.get("/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      
      if (!services || services.length === 0) {
        // Return default services if none found
        return res.json([
          {
            id: 1,
            icon: "bx-briefcase",
            title: "Service Name 1",
            description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings."
          },
          {
            id: 2,
            icon: "bx-trending-up",
            title: "Service Name 2",
            description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings."
          },
          {
            id: 3,
            icon: "bx-cog",
            title: "Service Name 3",
            description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings."
          }
        ]);
      }
      
      return res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ 
        message: "Failed to fetch services" 
      });
    }
  });
  
  // Get a single service by ID
  router.get("/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid ID format" 
        });
      }
      
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ 
          message: "Service not found" 
        });
      }
      
      return res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      return res.status(500).json({ 
        message: "Failed to fetch service" 
      });
    }
  });
}
