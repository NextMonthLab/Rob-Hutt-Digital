import { Router } from "express";
import { storage } from "../storage";

export function aboutRoutes(router: Router) {
  // Get about page data
  router.get("/about", async (req, res) => {
    try {
      const about = await storage.getAbout();
      
      if (!about) {
        // Return default about data if none found
        return res.json({
          bio: [
            "With over 15 years of experience in digital strategy and creative direction, I've helped brands across multiple industries strengthen their digital presence and streamline their operations.",
            "My background spans award-winning filmmaking, marketing automation, and brand development—giving me a unique perspective that bridges creative vision with technical execution.",
            "I believe in simplifying the complex, removing bottlenecks, and delivering solutions that not only look great but perform exceptionally well."
          ],
          credentials: [
            "Royal Television Society Award - Documentary Direction",
            "Certified Marketing Automation Specialist",
            "Featured in Creative Quarterly, \"Digital Innovators\""
          ],
          quote: "I'm passionate about helping people translate their vision into reality. Technology should simplify, not complicate.",
          profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          skills: {
            creativeSkills: [
              { name: "Brand Strategy", level: 95 },
              { name: "Visual Direction", level: 90 },
              { name: "Storytelling", level: 95 }
            ],
            technicalSkills: [
              { name: "Automation Design", level: 90 },
              { name: "Studio Engineering", level: 85 },
              { name: "Marketing Systems", level: 95 }
            ]
          }
        });
      }
      
      return res.json(about);
    } catch (error) {
      console.error("Error fetching about data:", error);
      return res.status(500).json({ 
        message: "Failed to fetch about data" 
      });
    }
  });
}
