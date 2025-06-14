import { Router } from "express";
import { storage } from "../storage";

export function highlightCardsRoutes(router: Router) {
  // Get all highlight cards
  router.get("/highlightCards", async (req, res) => {
    try {
      const highlightCards = await storage.getHighlightCards();
      
      if (!highlightCards || highlightCards.length === 0) {
        // Return default highlight cards if none found
        return res.json([
          {
            id: 1,
            icon: "bx-rocket",
            title: "Strategic Approach",
            description: "We develop comprehensive strategies tailored to your specific business goals and market position."
          },
          {
            id: 2,
            icon: "bx-trophy",
            title: "Proven Results",
            description: "Our track record speaks for itself with measurable results and satisfied clients across various industries."
          },
          {
            id: 3,
            icon: "bx-group",
            title: "Expert Team",
            description: "Work with experienced professionals who understand your industry and bring years of expertise to your project."
          },
          {
            id: 4,
            icon: "bx-time-five",
            title: "Timely Delivery",
            description: "We respect your timeline and deliver quality work on schedule, keeping your projects moving forward."
          }
        ]);
      }
      
      return res.json(highlightCards);
    } catch (error) {
      console.error("Error fetching highlight cards:", error);
      return res.status(500).json({ 
        message: "Failed to fetch highlight cards" 
      });
    }
  });
  
  // Get a single highlight card by ID
  router.get("/highlightCards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid ID format" 
        });
      }
      
      const highlightCard = await storage.getHighlightCard(id);
      
      if (!highlightCard) {
        return res.status(404).json({ 
          message: "Highlight card not found" 
        });
      }
      
      return res.json(highlightCard);
    } catch (error) {
      console.error("Error fetching highlight card:", error);
      return res.status(500).json({ 
        message: "Failed to fetch highlight card" 
      });
    }
  });
}
