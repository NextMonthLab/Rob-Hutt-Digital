import { apiRequest } from "./queryClient";

/**
 * Client-side utility for interacting with the Source of Truth (SOT) API
 */

export type SotEventType = 'service_update' | 'contact_submission' | 'content_update' | 'system_update';

/**
 * Interface for SOT-related functions
 */
interface ISotClient {
  /**
   * Initialize the SOT client profile
   */
  initialize(): Promise<any>;
  
  /**
   * Get the current SOT client profile
   */
  getClientProfile(): Promise<any>;
  
  /**
   * Trigger a webhook notification
   * @param eventType The type of event
   * @param payload The data to send
   */
  triggerWebhook(eventType: SotEventType, payload: any): Promise<any>;
  
  /**
   * Check the health status of the SOT integration
   */
  checkHealth(): Promise<any>;
}

/**
 * Implementation of the SOT client
 */
class SotClient implements ISotClient {
  constructor() {
    // Initialize on client startup
    this.initialize().catch(err => {
      console.error("Failed to initialize SOT client:", err);
    });
  }
  
  /**
   * Initialize the SOT client profile
   */
  async initialize(): Promise<any> {
    try {
      const response = await apiRequest({
        url: "/api/sot/initialize",
        method: "POST"
      });
      
      console.log("[SOT] Initialized client profile:", response.success);
      return response;
    } catch (error) {
      console.error("[SOT] Failed to initialize client profile:", error);
      throw error;
    }
  }
  
  /**
   * Get the current SOT client profile
   */
  async getClientProfile(): Promise<any> {
    try {
      const response = await apiRequest({
        url: "/api/sot/client-profile",
        method: "GET"
      });
      
      return response;
    } catch (error) {
      console.error("[SOT] Failed to get client profile:", error);
      throw error;
    }
  }
  
  /**
   * Trigger a webhook notification
   * @param eventType The type of event
   * @param payload The data to send
   */
  async triggerWebhook(eventType: SotEventType, payload: any): Promise<any> {
    try {
      const response = await apiRequest({
        url: "/api/sot/trigger-webhook",
        method: "POST",
        data: {
          eventType,
          payload
        }
      });
      
      return response;
    } catch (error) {
      console.error(`[SOT] Failed to trigger webhook for event '${eventType}':`, error);
      throw error;
    }
  }
  
  /**
   * Check the health status of the SOT integration
   */
  async checkHealth(): Promise<any> {
    try {
      const response = await apiRequest({
        url: "/api/sot/health",
        method: "GET"
      });
      
      return response;
    } catch (error) {
      console.error("[SOT] Health check failed:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const sotClient = new SotClient();