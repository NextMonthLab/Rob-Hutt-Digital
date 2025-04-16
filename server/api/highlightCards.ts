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
            title: "Strategic Vision",
            description: "I transform complex ideas into clear, actionable digital strategies that deliver results."
          },
          {
            id: 2,
            icon: "bx-bulb",
            title: "Creative Direction",
            description: "Award-winning creative expertise to help your brand stand out in today's crowded marketplace."
          },
          {
            id: 3,
            icon: "bx-cog",
            title: "Technical Execution",
            description: "I bridge the gap between creative vision and technical implementation for seamless delivery."
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
