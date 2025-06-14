import { 
  User, 
  InsertUser, 
  Service, 
  HighlightCard, 
  About, 
  ContactSubmission, 
  InsertContactSubmission 
} from "../../shared/schema";

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
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getHighlightCards(): Promise<HighlightCard[]>;
  getHighlightCard(id: number): Promise<HighlightCard | undefined>;
  getAbout(): Promise<About | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
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

    this.userCurrentId = 0;
    this.serviceCurrentId = 0;
    this.highlightCardCurrentId = 0;
    this.contactSubmissionCurrentId = 0;
    
    this.initializeGenericTemplateData();
  }

  private initializeGenericTemplateData() {
    // Force clear any existing data first and use imported template data
    this.services.clear();
    this.highlightCards.clear();
    this.about = undefined;
    
    console.log('=== STORAGE INITIALIZATION DEBUG ===');
    console.log('Clearing existing data and initializing with template data...');
    
    try {
      // Import from template-data.ts instead of hardcoding
      const templateDataModule = require('./template-data');
      console.log('Template module keys:', Object.keys(templateDataModule));
      
      const { templateServices, templateHighlightCards, templateAbout } = templateDataModule;
      console.log('Template services loaded:', templateServices?.length || 0, 'items');
      console.log('First template service:', templateServices?.[0]?.title);
      console.log('All template service titles:', templateServices?.map((s: any) => s.title) || []);

      // Initialize services from template data
      if (templateServices && templateServices.length > 0) {
        templateServices.forEach((service: Service) => {
          this.services.set(service.id, service);
          console.log('Added service:', service.title);
        });
        this.serviceCurrentId = templateServices.length;
      } else {
        console.error('No template services found!');
      }

      // Initialize highlight cards from template data
      if (templateHighlightCards && templateHighlightCards.length > 0) {
        templateHighlightCards.forEach((card: HighlightCard) => {
          this.highlightCards.set(card.id, card);
        });
        this.highlightCardCurrentId = templateHighlightCards.length;
      }

      // Initialize about from template data
      if (templateAbout) {
        this.about = templateAbout;
      }

      console.log('Generic template data initialized successfully');
      console.log('Final services count:', this.services.size);
      console.log('Final services titles:', Array.from(this.services.values()).map(s => s.title));
    } catch (error) {
      console.error('Failed to load template data:', error);
      console.log('Falling back to hardcoded generic data...');
      this.initializeFallbackData();
    }
  }

  private initializeFallbackData() {
    // Hardcoded fallback generic data
    const fallbackServices: Service[] = [
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

    fallbackServices.forEach(service => {
      this.services.set(service.id, service);
    });
    this.serviceCurrentId = fallbackServices.length;

    console.log('Fallback data initialized with', fallbackServices.length, 'services');
  }

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
    const id = ++this.userCurrentId;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getHighlightCards(): Promise<HighlightCard[]> {
    return Array.from(this.highlightCards.values());
  }

  async getHighlightCard(id: number): Promise<HighlightCard | undefined> {
    return this.highlightCards.get(id);
  }

  async getAbout(): Promise<About | undefined> {
    return this.about;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = ++this.contactSubmissionCurrentId;
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async updateSotClientProfile(profile: SotClientProfile): Promise<SotClientProfile> {
    this.sotClientProfile = profile;
    return profile;
  }

  async getSotClientProfile(): Promise<SotClientProfile | null> {
    return this.sotClientProfile;
  }
}

export const storage = new MemStorage();