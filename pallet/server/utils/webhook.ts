import { SotClientProfile } from "../storage";

/**
 * Default client profile for initialization
 */
export const DEFAULT_CLIENT_PROFILE: SotClientProfile = {
  businessId: "rob-hutt-digital",
  businessName: "Rob Hutt Digital",
  businessType: "Digital Marketing Agency",
  industry: "Marketing & Advertising",
  description: "Personal brand and digital marketing services by Rob Hutt",
  location: {
    city: "New York",
    country: "USA"
  },
  dateOnboarded: new Date().toISOString(),
  platformBlueprintInformation: {
    currentBlueprintVersion: "1.0.0",
    pagesPublished: ["home", "services", "about", "contact"],
    toolsInstalled: ["NextMonth Integration", "Content Management", "Analytics"],
    automationsActive: ["contact_form", "service_booking"],
    lastDeploymentDate: new Date().toISOString(),
    hostingEnvironment: "replit"
  },
  activityTracking: {
    totalCreditsPurchased: 1000,
    totalCreditsConsumed: 0,
    lastActivityTimestamp: new Date().toISOString(),
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
    lastSyncTimestamp: new Date().toISOString()
  },
  systemMetadata: {
    instanceId: `rob-hutt-${Date.now()}`,
    instanceType: "council-member",
    tenantId: "nextmonth-ecosystem",
    isTemplate: false,
    isCloneable: false,
    supportTier: "premium",
    statusCheckFrequency: 15, // in minutes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

/**
 * Sends a webhook notification to the NextMonth ecosystem when a significant event occurs
 * 
 * @param eventType - Type of event that triggered the webhook
 * @param payload - The data to send in the webhook
 * @param profile - The current client profile (fetched from storage if not provided)
 */
export async function sendSotWebhook(
  eventType: string,
  payload: any,
  profile: SotClientProfile
): Promise<{ success: boolean; message: string }> {
  try {
    // In a real-world application, this would make an actual HTTP request to an external endpoint
    // For simulation purposes, we'll just log the event
    console.log(`[SOT Webhook] ${new Date().toISOString()} - Event: ${eventType}`, {
      eventType,
      payload,
      source: {
        businessId: profile.businessId,
        businessName: profile.businessName,
        instanceId: profile.systemMetadata.instanceId
      },
      timestamp: new Date().toISOString()
    });
    
    // Create an audit log for this webhook
    createSotAuditLog(`webhook_${eventType}`, {
      eventType,
      payload,
      timestamp: new Date().toISOString()
    });
    
    // Simulate a successful webhook notification
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

/**
 * Utility function to create an audit log entry for SOT-related actions
 */
export function createSotAuditLog(
  action: string,
  data: any
): void {
  // In a real-world application, this might write to a database or log file
  // For simulation purposes, we'll just log to the console
  console.log(`[SOT Audit] ${new Date().toISOString()} - ${action}`, data);
}