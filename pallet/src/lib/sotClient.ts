import { apiRequest } from "./queryClient";
import axios from 'axios';

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
    // Initialize on client startup after a short delay to ensure the app is fully loaded
    setTimeout(() => {
      this.initialize().catch(err => {
        console.error("Failed to initialize SOT client:", err);
      });
    }, 1000);
  }
  
  /**
   * Initialize the SOT client profile
   */
  async initialize(): Promise<any> {
    try {
      const response = await axios.post('/api/sot/initialize');
      console.log("[SOT] Initialized client profile:", response.data.success);
      return response.data;
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
      const response = await axios.get('/api/sot/client-profile');
      return response.data;
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
      const response = await axios.post('/api/sot/trigger-webhook', {
        eventType,
        payload
      });
      
      return response.data;
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
      const response = await axios.get('/api/sot/health');
      return response.data;
    } catch (error) {
      console.error("[SOT] Health check failed:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const sotClient = new SotClient();