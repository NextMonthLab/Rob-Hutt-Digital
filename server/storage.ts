import { 
  users, type User, type InsertUser,
  type Service, type HighlightCard, type About, type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

// SOT Client Profile type
export type SotClientProfile = {
  businessId: string;
  businessName: string;
  businessType: string;
  industry: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  dateOnboarded: string;
  platformBlueprintInformation: {
    currentBlueprintVersion: string;
    pagesPublished: string[];
    toolsInstalled: string[];
    automationsActive: string[];
    lastDeploymentDate: string;
    hostingEnvironment: string;
  };
  activityTracking: {
    totalCreditsPurchased: number;
    totalCreditsConsumed: number;
    lastActivityTimestamp: string;
    accountStatus: string;
  };
  externalPublicInfo: {
    websiteUrl: string;
    publicLinkedIn: string;
    publicYouTubeChannel: string;
    podcastInfo: Record<string, any>;
  };
  dynamicUpdateTriggers: {
    realtimeWebhookEnabled: boolean;
    updateFrequency: string;
    lastSyncTimestamp: string;
  };
  systemMetadata: {
    instanceId: string;
    instanceType: string;
    tenantId: string;
    isTemplate: boolean;
    isCloneable: boolean;
    supportTier: string;
    statusCheckFrequency: number;
    createdAt: string;
    updatedAt: string;
  };
};

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  
  // HighlightCard methods
  getHighlightCards(): Promise<HighlightCard[]>;
  
  // About methods
  getAbout(): Promise<About | undefined>;
  
  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // SOT integration methods
  updateSotClientProfile(profile: SotClientProfile): Promise<SotClientProfile>;
  getSotClientProfile(): Promise<SotClientProfile | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private highlightCards: Map<number, HighlightCard>;
  private about: About | undefined;
  private contactSubmissions: Map<number, ContactSubmission>;
  private sotClientProfile: SotClientProfile | null;
  
  private userCurrentId: number;
  private serviceCurrentId: number;
  private highlightCardCurrentId: number;
  private contactSubmissionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.highlightCards = new Map();
    this.contactSubmissions = new Map();
    this.sotClientProfile = null;
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.highlightCardCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    
    // Initialize with default data if needed
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  // HighlightCard methods
  async getHighlightCards(): Promise<HighlightCard[]> {
    return Array.from(this.highlightCards.values());
  }
  
  // About methods
  async getAbout(): Promise<About | undefined> {
    return this.about;
  }
  
  // Contact methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionCurrentId++;
    const timestamp = new Date().toISOString();
    const contactSubmission: ContactSubmission = { 
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
  async updateSotClientProfile(profile: SotClientProfile): Promise<SotClientProfile> {
    this.sotClientProfile = {
      ...profile,
      systemMetadata: {
        ...profile.systemMetadata,
        updatedAt: new Date().toISOString()
      }
    };
    
    // After updating the SOT profile, we should trigger a webhook to notify
    // any systems dependent on this data that an update has occurred
    console.log(`SOT Client Profile updated: ${this.sotClientProfile.businessId}`);
    
    return this.sotClientProfile;
  }
  
  async getSotClientProfile(): Promise<SotClientProfile | null> {
    return this.sotClientProfile;
  }
}

export const storage = new MemStorage();
