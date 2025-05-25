var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/utils/webhook.ts
var webhook_exports = {};
__export(webhook_exports, {
  DEFAULT_CLIENT_PROFILE: () => DEFAULT_CLIENT_PROFILE,
  createSotAuditLog: () => createSotAuditLog,
  sendSotWebhook: () => sendSotWebhook
});
async function sendSotWebhook(eventType, payload, profile) {
  try {
    console.log(`[SOT Webhook] ${(/* @__PURE__ */ new Date()).toISOString()} - Event: ${eventType}`, {
      eventType,
      payload,
      source: {
        businessId: profile.businessId,
        businessName: profile.businessName,
        instanceId: profile.systemMetadata.instanceId
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    createSotAuditLog(`webhook_${eventType}`, {
      eventType,
      payload,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    return {
      success: true,
      message: `Webhook for ${eventType} sent successfully`
    };
  } catch (error) {
    console.error(`[SOT Webhook Error] Failed to send webhook for ${eventType}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
function createSotAuditLog(action, data) {
  console.log(`[SOT Audit] ${(/* @__PURE__ */ new Date()).toISOString()} - ${action}`, data);
}
var DEFAULT_CLIENT_PROFILE;
var init_webhook = __esm({
  "server/utils/webhook.ts"() {
    "use strict";
    DEFAULT_CLIENT_PROFILE = {
      businessId: "rob-hutt-digital",
      businessName: "Rob Hutt Digital",
      businessType: "Digital Marketing Agency",
      industry: "Marketing & Advertising",
      description: "Personal brand and digital marketing services by Rob Hutt",
      location: {
        city: "New York",
        country: "USA"
      },
      dateOnboarded: (/* @__PURE__ */ new Date()).toISOString(),
      platformBlueprintInformation: {
        currentBlueprintVersion: "1.0.0",
        pagesPublished: ["home", "services", "about", "contact"],
        toolsInstalled: ["NextMonth Integration", "Content Management", "Analytics"],
        automationsActive: ["contact_form", "service_booking"],
        lastDeploymentDate: (/* @__PURE__ */ new Date()).toISOString(),
        hostingEnvironment: "replit"
      },
      activityTracking: {
        totalCreditsPurchased: 1e3,
        totalCreditsConsumed: 0,
        lastActivityTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
        accountStatus: "active"
      },
      externalPublicInfo: {
        websiteUrl: "https://robhutt.digital",
        publicLinkedIn: "https://linkedin.com/in/rob-hutt",
        publicYouTubeChannel: "",
        podcastInfo: {}
      },
      dynamicUpdateTriggers: {
        realtimeWebhookEnabled: true,
        updateFrequency: "realtime",
        lastSyncTimestamp: (/* @__PURE__ */ new Date()).toISOString()
      },
      systemMetadata: {
        instanceId: `rob-hutt-${Date.now()}`,
        instanceType: "council-member",
        tenantId: "nextmonth-ecosystem",
        isTemplate: false,
        isCloneable: false,
        supportTier: "premium",
        statusCheckFrequency: 15,
        // in minutes
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  }
});

// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  services;
  highlightCards;
  about;
  contactSubmissions;
  sotClientProfile;
  userCurrentId;
  serviceCurrentId;
  highlightCardCurrentId;
  contactSubmissionCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.services = /* @__PURE__ */ new Map();
    this.highlightCards = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.sotClientProfile = null;
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.highlightCardCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Service methods
  async getServices() {
    return Array.from(this.services.values());
  }
  async getService(id) {
    return this.services.get(id);
  }
  // HighlightCard methods
  async getHighlightCards() {
    return Array.from(this.highlightCards.values());
  }
  // About methods
  async getAbout() {
    return this.about;
  }
  // Contact methods
  async createContactSubmission(submission) {
    const id = this.contactSubmissionCurrentId++;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const contactSubmission = {
      ...submission,
      id,
      createdAt: timestamp,
      processed: false,
      automation: submission.automation || null
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  // SOT integration methods
  async updateSotClientProfile(profile) {
    this.sotClientProfile = {
      ...profile,
      systemMetadata: {
        ...profile.systemMetadata,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    console.log(`SOT Client Profile updated: ${this.sotClientProfile.businessId}`);
    return this.sotClientProfile;
  }
  async getSotClientProfile() {
    return this.sotClientProfile;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var cptBase = {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  tag: text("tag"),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString()),
  updatedAt: text("updated_at").notNull().default((/* @__PURE__ */ new Date()).toISOString())
};
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var highlightCards = pgTable("highlight_cards", {
  ...cptBase,
  icon: text("icon").notNull(),
  description: text("description").notNull()
});
var services = pgTable("services", {
  ...cptBase,
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  detailUrl: text("detail_url"),
  automation: text("automation")
});
var about = pgTable("about", {
  ...cptBase,
  content: json("content").notNull(),
  profileImage: text("profile_image")
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString()),
  processed: boolean("processed").notNull().default(false),
  automation: text("automation")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertHighlightCardSchema = createInsertSchema(highlightCards).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertAboutSchema = createInsertSchema(about).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  processed: true
});

// server/api/highlightCards.ts
function highlightCardsRoutes(router) {
  router.get("/highlightCards", async (req, res) => {
    try {
      const highlightCards2 = await storage.getHighlightCards();
      if (!highlightCards2 || highlightCards2.length === 0) {
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
      return res.json(highlightCards2);
    } catch (error) {
      console.error("Error fetching highlight cards:", error);
      return res.status(500).json({
        message: "Failed to fetch highlight cards"
      });
    }
  });
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

// server/api/services.ts
function servicesRoutes(router) {
  router.get("/services", async (req, res) => {
    try {
      const services2 = await storage.getServices();
      if (!services2 || services2.length === 0) {
        return res.json([
          {
            id: 1,
            icon: "bx-broadcast",
            title: "Studio Build & Delivery",
            description: "I design and deliver YouTube and podcast studios\u2014customised to your brand and operational within two weeks."
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
            description: "From press releases to high-impact positioning\u2014I help you get seen, shared, and remembered."
          }
        ]);
      }
      return res.json(services2);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({
        message: "Failed to fetch services"
      });
    }
  });
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

// server/api/about.ts
function aboutRoutes(router) {
  router.get("/about", async (req, res) => {
    try {
      const about2 = await storage.getAbout();
      if (!about2) {
        return res.json({
          bio: [
            "With over 15 years of experience in digital strategy and creative direction, I've helped brands across multiple industries strengthen their digital presence and streamline their operations.",
            "My background spans award-winning filmmaking, marketing automation, and brand development\u2014giving me a unique perspective that bridges creative vision with technical execution.",
            "I believe in simplifying the complex, removing bottlenecks, and delivering solutions that not only look great but perform exceptionally well."
          ],
          credentials: [
            "Royal Television Society Award - Documentary Direction",
            "Certified Marketing Automation Specialist",
            'Featured in Creative Quarterly, "Digital Innovators"'
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
      return res.json(about2);
    } catch (error) {
      console.error("Error fetching about data:", error);
      return res.status(500).json({
        message: "Failed to fetch about data"
      });
    }
  });
}

// server/api/sot.ts
init_webhook();
function sotRoutes(router) {
  router.post("/sot/initialize", async (req, res) => {
    try {
      const existingProfile = await storage.getSotClientProfile();
      if (existingProfile) {
        const updatedProfile = {
          ...existingProfile,
          dynamicUpdateTriggers: {
            ...existingProfile.dynamicUpdateTriggers,
            lastSyncTimestamp: (/* @__PURE__ */ new Date()).toISOString()
          },
          systemMetadata: {
            ...existingProfile.systemMetadata,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        };
        await storage.updateSotClientProfile(updatedProfile);
        console.log("SOT Client Profile updated:", existingProfile.businessId);
        createSotAuditLog("initialize_profile", {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          action: "initialize_profile",
          details: {
            profileId: existingProfile.businessId
          },
          success: true,
          environment: process.env.NODE_ENV || "development"
        });
        return res.status(200).json({
          success: true,
          message: "Client profile refreshed successfully"
        });
      }
      const newProfile = {
        ...DEFAULT_CLIENT_PROFILE,
        dynamicUpdateTriggers: {
          ...DEFAULT_CLIENT_PROFILE.dynamicUpdateTriggers,
          lastSyncTimestamp: (/* @__PURE__ */ new Date()).toISOString()
        },
        systemMetadata: {
          ...DEFAULT_CLIENT_PROFILE.systemMetadata,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
      await storage.updateSotClientProfile(newProfile);
      console.log("SOT Client Profile created:", newProfile.businessId);
      createSotAuditLog("initialize_profile", {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        action: "initialize_profile",
        details: {
          profileId: newProfile.businessId
        },
        success: true,
        environment: process.env.NODE_ENV || "development"
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
  router.post("/sot/trigger-webhook", async (req, res) => {
    try {
      const { eventType, payload } = req.body;
      if (!eventType) {
        return res.status(400).json({
          success: false,
          message: "Event type is required"
        });
      }
      const profile = await storage.getSotClientProfile();
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "No client profile found"
        });
      }
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
  router.get("/sot/health", async (req, res) => {
    try {
      const profile = await storage.getSotClientProfile();
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "No client profile found"
        });
      }
      const healthStatus = {
        status: "healthy",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        components: {
          "API Gateway": "online",
          "Auth Service": "operational",
          "Webhook Service": "operational",
          "Content Service": "online",
          "Notification Service": "online",
          "Analytics Service": "operational"
        },
        metrics: {
          responseTime: 127 + Math.random() * 50,
          // Simulated response time
          uptime: 3600 + Math.floor(Math.random() * 7200),
          // Simulated uptime in seconds
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

// server/routes.ts
async function registerRoutes(app2) {
  const apiRouter = express.Router();
  highlightCardsRoutes(apiRouter);
  servicesRoutes(apiRouter);
  aboutRoutes(apiRouter);
  sotRoutes(apiRouter);
  apiRouter.post("/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        automation: "contact_form"
      });
      const clientProfile = await storage.getSotClientProfile();
      if (clientProfile) {
        const { sendSotWebhook: sendSotWebhook2, createSotAuditLog: createSotAuditLog2 } = (init_webhook(), __toCommonJS(webhook_exports));
        createSotAuditLog2("contact_submission", {
          submissionId: submission.id,
          name: submission.name,
          email: submission.email,
          timestamp: submission.createdAt
        });
        await sendSotWebhook2("contact_submission", {
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
  app2.use("/api", apiRouter);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
