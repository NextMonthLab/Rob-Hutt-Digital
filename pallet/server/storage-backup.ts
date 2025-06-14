// Backup of working storage implementation
import { 
  User, InsertUser, 
  Service, InsertService, 
  HighlightCard, InsertHighlightCard, 
  About, InsertAbout,
  ContactSubmission, InsertContactSubmission 
} from "../shared/schema";

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
  getHighlightCard(id: number): Promise<HighlightCard | undefined>;
  
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
    this.about = undefined;
    this.contactSubmissions = new Map();
    this.sotClientProfile = null;
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.highlightCardCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    
    // Initialize with generic template data immediately
    this.initializeGenericTemplateData();
  }

  private initializeGenericTemplateData() {
    // Generic business services
    const templateServices: Service[] = [
      {
        id: 1,
        title: "Service Name 1",
        type: "service",
        tag: "popular",
        icon: "bx-briefcase",
        description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
        detailUrl: "#services",
        automation: "enabled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Service Name 2", 
        type: "service",
        tag: "featured",
        icon: "bx-trending-up",
        description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
        detailUrl: "#services",
        automation: "partial",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Service Name 3",
        type: "service", 
        tag: "premium",
        icon: "bx-cog",
        description: "Brief description of what this service includes and how it benefits your clients. Customize this text to match your business offerings.",
        detailUrl: "#services",
        automation: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Generic business highlight cards
    const templateHighlightCards: HighlightCard[] = [
      {
        id: 1,
        type: "highlight",
        title: "Strategic Excellence",
        tag: null,
        icon: "bx-rocket",
        description: "Proven track record of delivering results that exceed expectations and drive business growth.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        type: "highlight",
        title: "Trusted Partnership",
        tag: null,
        icon: "bx-shield-check", 
        description: "Building long-term relationships based on transparency, reliability, and consistent performance.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        type: "highlight",
        title: "Innovation Focus",
        tag: null,
        icon: "bx-trending-up",
        description: "Staying ahead of industry trends to deliver cutting-edge solutions that give you competitive advantage.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        type: "highlight", 
        title: "Efficient Delivery",
        tag: null,
        icon: "bx-time",
        description: "Streamlined processes and clear communication ensure projects are completed on time and within budget.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Generic business about
    const templateAbout: About = {
      id: 1,
      type: "about",
      title: "About Our Business", 
      tag: null,
      content: {
        bio: [
          "Professional with extensive experience in business strategy and client solutions. Passionate about helping businesses grow and succeed through innovative approaches.",
          "Dedicated to delivering exceptional results and building lasting relationships with clients across various industries.",
          "Committed to staying ahead of industry trends and continuously improving service offerings to meet evolving market needs."
        ],
        credentials: [
          "Industry Certification - Business Strategy",
          "Professional Development Certificate", 
          "Featured Speaker at Industry Conference"
        ],
        quote: "Success comes from understanding client needs and delivering solutions that exceed expectations.",
        skills: {
          creativeSkills: [
            { name: "Strategic Planning", level: 95 },
            { name: "Creative Problem Solving", level: 90 },
            { name: "Client Communication", level: 95 }
          ],
          technicalSkills: [
            { name: "Business Analysis", level: 90 },
            { name: "Process Optimization", level: 85 },
            { name: "Project Management", level: 95 }
          ]
        }
      },
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Initialize storage with template data
    templateServices.forEach(service => {
      this.services.set(service.id, service);
      this.serviceCurrentId = Math.max(this.serviceCurrentId, service.id + 1);
    });

    templateHighlightCards.forEach(card => {
      this.highlightCards.set(card.id, card);
      this.highlightCardCurrentId = Math.max(this.highlightCardCurrentId, card.id + 1);
    });

    this.about = templateAbout;
    
    console.log('Generic template data initialized successfully');
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
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
  
  async getHighlightCard(id: number): Promise<HighlightCard | undefined> {
    return this.highlightCards.get(id);
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
      automation: null
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  // SOT integration methods
  async updateSotClientProfile(profile: SotClientProfile): Promise<SotClientProfile> {
    this.sotClientProfile = profile;
    console.log(`SOT Client Profile updated: ${profile.businessId}`);
    
    // Update timestamps
    this.sotClientProfile.systemMetadata.updatedAt = new Date().toISOString();
    this.sotClientProfile.dynamicUpdateTriggers.lastSyncTimestamp = new Date().toISOString();
    
    return this.sotClientProfile;
  }
  
  async getSotClientProfile(): Promise<SotClientProfile | null> {
    return this.sotClientProfile;
  }
}

export const storage = new MemStorage();