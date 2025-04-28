import axios from 'axios';
import { SotClientProfile } from '../storage';

// Default SOT client profile according to NextMonth ecosystem requirements
export const DEFAULT_CLIENT_PROFILE: SotClientProfile = {
  businessId: "rob-hutt-digital",
  businessName: "Rob Hutt Digital",
  businessType: "Professional Services and Personal Brand",
  industry: "Technology / Creative Consultancy",
  description: "Rob Hutt Digital serves as the professional and creative portfolio site within the NextMonth ecosystem, showcasing services, capabilities, and brand storylines.",
  location: {
    city: "unknown",
    country: "unknown"
  },
  dateOnboarded: new Date().toISOString(),
  platformBlueprintInformation: {
    currentBlueprintVersion: "v1.0.0",
    pagesPublished: [
      "/",
      "/services",
      "/about",
      "/contact"
    ],
    toolsInstalled: [
      "contact-form",
      "services-module",
      "bio-presentation-module",
      "responsive-navigation"
    ],
    automationsActive: [],
    lastDeploymentDate: new Date().toISOString(),
    hostingEnvironment: "Replit"
  },
  activityTracking: {
    totalCreditsPurchased: 0,
    totalCreditsConsumed: 0,
    lastActivityTimestamp: new Date().toISOString(),
    accountStatus: "active"
  },
  externalPublicInfo: {
    websiteUrl: "https://robhuttdigital.com",
    publicLinkedIn: "",
    publicYouTubeChannel: "",
    podcastInfo: {}
  },
  dynamicUpdateTriggers: {
    realtimeWebhookEnabled: true,
    updateFrequency: "event-driven",
    lastSyncTimestamp: new Date().toISOString()
  },
  systemMetadata: {
    instanceId: "rob-hutt-digital-001",
    instanceType: "professional_site",
    tenantId: "rob-hutt-digital-001",
    isTemplate: false,
    isCloneable: false,
    supportTier: "core",
    statusCheckFrequency: 3600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

// For future use - this would be set based on environment variables
const SOT_ENDPOINT = process.env.SOT_ENDPOINT || 'https://api.nextmonth.dev/api/sot';
const SOT_API_KEY = process.env.SOT_API_KEY || '';

/**
 * Sends a webhook notification to the NextMonth ecosystem when a significant event occurs
 * 
 * @param eventType - Type of event that triggered the webhook
 * @param payload - The data to send in the webhook
 * @param profile - The current client profile (fetched from storage if not provided)
 */
export async function sendSotWebhook(
  eventType: 'service_update' | 'contact_submission' | 'content_update' | 'system_update',
  payload: any,
  profile: SotClientProfile
): Promise<{ success: boolean; message: string }> {
  try {
    // In a production environment, this would actually send the webhook
    // For now, we'll just log it
    console.log(`[SOT Webhook] Event: ${eventType}`);
    console.log(`[SOT Webhook] Payload:`, JSON.stringify(payload, null, 2));
    
    // Update the lastSyncTimestamp in the profile
    profile.dynamicUpdateTriggers.lastSyncTimestamp = new Date().toISOString();
    
    // In a production environment with real API endpoints:
    /*
    const response = await axios.post(`${SOT_ENDPOINT}/update-client-profile`, {
      ...profile,
      eventType,
      eventPayload: payload,
      eventTimestamp: new Date().toISOString()
    }, {
      headers: {
        'Authorization': `Bearer ${SOT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: response.status >= 200 && response.status < 300,
      message: `Webhook sent: ${response.statusText}`
    };
    */
    
    return {
      success: true,
      message: `Webhook notification for event ${eventType} logged (simulation mode)`
    };
  } catch (error) {
    console.error(`[SOT Webhook] Error sending webhook:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Utility function to create an audit log entry for SOT-related actions
 */
export function createSotAuditLog(
  action: string,
  details: any,
  success: boolean = true
): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    action,
    details,
    success,
    environment: process.env.NODE_ENV || 'development'
  };
  
  // In a production app, this would write to a database or file
  console.log(`[SOT Audit] ${timestamp} - ${action}`, JSON.stringify(logEntry, null, 2));
}