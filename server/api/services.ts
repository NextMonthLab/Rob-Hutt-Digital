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
            icon: "bx-broadcast",
            title: "Studio Build & Delivery",
            description: "I design and deliver YouTube and podcast studios—customised to your brand and operational within two weeks."
          },
          {
            id: 2,
            icon: "bx-palette",
            title: "Brand Identity & Development",
            description: "From brand refresh to full rebrand, I handle design, messaging, and execution."
          },
          {
            id: 3,
            icon: "bx-cog",
            title: "Marketing Automation",
            description: "I streamline your digital marketing by removing bottlenecks, replacing them with smooth automation."
          },
          {
            id: 4,
            icon: "bx-movie-play",
            title: "Video Strategy & Direction",
            description: "As an award-winning filmmaker, I help bring clarity and story to your video brand."
          },
          {
            id: 5,
            icon: "bx-news",
            title: "Press & PR Support",
            description: "From press releases to high-impact positioning—I help you get seen, shared, and remembered."
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
