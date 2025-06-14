import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { highlightCardsRoutes } from "./api/highlightCards";
import { servicesRoutes } from "./api/services";
import { aboutRoutes } from "./api/about";
import { sotRoutes } from "./api/sot";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API router
  const apiRouter = express.Router();
  
  // Register API routes
  highlightCardsRoutes(apiRouter);
  servicesRoutes(apiRouter);
  aboutRoutes(apiRouter);
  sotRoutes(apiRouter);
  
  // Contact form submission
  apiRouter.post("/contact", async (req, res) => {
    try {
      // Validate form data
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        automation: "contact_form"
      });
      
      // Get the SOT client profile for webhook notification
      const clientProfile = await storage.getSotClientProfile();
      
      // If SOT integration is active and we have a client profile, send webhook
      if (clientProfile) {
        // Import webhook utilities
        const { sendSotWebhook, createSotAuditLog } = require('./utils/webhook');
        
        // Create audit log for the submission
        createSotAuditLog('contact_submission', {
          submissionId: submission.id,
          name: submission.name,
          email: submission.email,
          timestamp: submission.createdAt
        });
        
        // Send webhook notification about the new contact submission
        await sendSotWebhook('contact_submission', {
          submissionId: submission.id,
          name: submission.name, 
          email: submission.email,
          timestamp: submission.createdAt,
          automation: "contact_form"
        }, clientProfile);
      }
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Contact form submission error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  });
  
  // Mount the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
