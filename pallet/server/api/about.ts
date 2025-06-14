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
            "Tell your brand story here. Replace this with information about your business, mission, and what makes you unique in your industry.",
            "Share your journey, experience, and the values that drive your work. This is where potential clients learn who you are and why they should choose you.",
            "Highlight your expertise, achievements, and the passion that fuels your business success."
          ],
          credentials: [
            "Add Your Certification Here",
            "Years of Experience in Your Field",
            "Your Awards or Recognition",
            "Notable Client Achievements"
          ],
          quote: "Add an inspiring quote that represents your business philosophy or mission statement.",
          profileImage: "https://via.placeholder.com/400x400?text=Upload+Your+Business+Image",
          skills: {
            creativeSkills: [
              { name: "Your Skill 1", level: 95 },
              { name: "Your Skill 2", level: 90 },
              { name: "Your Skill 3", level: 88 },
              { name: "Your Skill 4", level: 85 }
            ],
            technicalSkills: [
              { name: "Your Technical Skill 1", level: 92 },
              { name: "Your Technical Skill 2", level: 88 },
              { name: "Your Technical Skill 3", level: 90 },
              { name: "Your Technical Skill 4", level: 95 }
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
