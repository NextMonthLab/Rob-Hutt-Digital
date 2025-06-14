import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Common schemas for all custom post types
export const cptBase = {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  tag: text("tag"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
};

// Users schema (keeping from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Highlight cards
export const highlightCards = pgTable("highlight_cards", {
  ...cptBase,
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

// Services
export const services = pgTable("services", {
  ...cptBase,
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  detailUrl: text("detail_url"),
  automation: text("automation"),
});

// About page
export const about = pgTable("about", {
  ...cptBase,
  content: json("content").notNull(),
  profileImage: text("profile_image"),
});

// Contact submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  processed: boolean("processed").notNull().default(false),
  automation: text("automation"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHighlightCardSchema = createInsertSchema(highlightCards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAboutSchema = createInsertSchema(about).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  processed: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHighlightCard = z.infer<typeof insertHighlightCardSchema>;
export type HighlightCard = typeof highlightCards.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type About = typeof about.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
