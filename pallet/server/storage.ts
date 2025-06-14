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
    
    // Initialize with template data
    this.initializeTemplateData();
  }

  private initializeTemplateData() {
    // Initialize with direct generic template data
    const templateServices = [
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

    const templateHighlightCards = [
      {
        id: 1,
        title: "Strategic Approach",
        type: "value",
        tag: "strategy",
        icon: "bx-rocket",
        description: "We develop comprehensive strategies tailored to your specific business goals and market position.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Proven Results",
        type: "achievement",
        tag: "success",
        icon: "bx-trophy",
        description: "Our track record speaks for itself with measurable results and satisfied clients across various industries.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Expert Team",
        type: "team",
        tag: "expertise",
        icon: "bx-group",
        description: "Work with experienced professionals who understand your industry and bring years of expertise to your project.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        title: "Timely Delivery",
        type: "service",
        tag: "reliability",
        icon: "bx-time-five",
        description: "We respect your timeline and deliver quality work on schedule, keeping your projects moving forward.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const templateAbout = {
      id: 1,
      title: "About Our Business",
      type: "company",
      tag: null,
      content: {
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
      },
      profileImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Initialize services
    templateServices.forEach(service => {
      this.services.set(service.id, service);
      this.serviceCurrentId = Math.max(this.serviceCurrentId, service.id + 1);
    });

    // Initialize highlight cards
    templateHighlightCards.forEach(card => {
      this.highlightCards.set(card.id, card);
      this.highlightCardCurrentId = Math.max(this.highlightCardCurrentId, card.id + 1);
    });

    // Initialize about section
    this.about = templateAbout;
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
