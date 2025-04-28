import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sotClient, SotEventType } from "../lib/sotClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [clientProfile, setClientProfile] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Fetch client profile and health status on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profile = await sotClient.getClientProfile();
        setClientProfile(profile.profile);
        
        const health = await sotClient.checkHealth();
        setHealthStatus(health);
      } catch (error) {
        console.error("Error fetching SOT data:", error);
        toast({
          title: "Failed to fetch SOT data",
          description: "Check the console for more details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      
      const profile = await sotClient.getClientProfile();
      setClientProfile(profile.profile);
      
      const health = await sotClient.checkHealth();
      setHealthStatus(health);
      
      toast({
        title: "Data refreshed",
        description: "SOT data has been updated",
        variant: "default"
      });
    } catch (error) {
      console.error("Error refreshing SOT data:", error);
      toast({
        title: "Failed to refresh data",
        description: "Check the console for more details",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };
  
  // Trigger a test webhook
  const triggerTestWebhook = async (eventType: SotEventType) => {
    try {
      setRefreshing(true);
      
      const testPayload = {
        test: true,
        timestamp: new Date().toISOString(),
        message: `Test ${eventType} from Rob Hutt Digital`
      };
      
      const result = await sotClient.triggerWebhook(eventType, testPayload);
      
      toast({
        title: "Webhook triggered",
        description: `${eventType} webhook sent successfully`,
        variant: "default"
      });
    } catch (error) {
      console.error(`Error triggering ${eventType} webhook:`, error);
      toast({
        title: "Failed to trigger webhook",
        description: "Check the console for more details",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };
  
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">NextMonth Integration Admin</h1>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500">
              Manage your Source of Truth (SOT) integration with the NextMonth ecosystem
            </p>
            
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading || refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile">Client Profile</TabsTrigger>
                <TabsTrigger value="health">System Health</TabsTrigger>
                <TabsTrigger value="webhook">Webhook Testing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>SOT Client Profile</CardTitle>
                    <CardDescription>
                      Details of your integration with the NextMonth ecosystem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {clientProfile ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Business Information</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Business ID</p>
                              <p>{clientProfile.businessId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Business Name</p>
                              <p>{clientProfile.businessName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Business Type</p>
                              <p>{clientProfile.businessType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Industry</p>
                              <p>{clientProfile.industry}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold">Platform Information</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Blueprint Version</p>
                              <p>{clientProfile.platformBlueprintInformation.currentBlueprintVersion}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Environment</p>
                              <p>{clientProfile.platformBlueprintInformation.hostingEnvironment}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Deployment</p>
                              <p>{new Date(clientProfile.platformBlueprintInformation.lastDeploymentDate).toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Published Pages</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {clientProfile.platformBlueprintInformation.pagesPublished.map((page: string) => (
                                <Badge key={page} variant="outline">{page}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Tools Installed</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {clientProfile.platformBlueprintInformation.toolsInstalled.map((tool: string) => (
                                <Badge key={tool} variant="outline">{tool}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold">Webhook Configuration</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Realtime Webhook</p>
                              <Badge variant={clientProfile.dynamicUpdateTriggers.realtimeWebhookEnabled ? "default" : "secondary"}>
                                {clientProfile.dynamicUpdateTriggers.realtimeWebhookEnabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Update Frequency</p>
                              <p>{clientProfile.dynamicUpdateTriggers.updateFrequency}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Sync</p>
                              <p>{new Date(clientProfile.dynamicUpdateTriggers.lastSyncTimestamp).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">No Profile Found</h3>
                        <p className="text-gray-500 mt-2">
                          Client profile has not been initialized or could not be retrieved
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      Last updated: {clientProfile?.systemMetadata?.updatedAt ? 
                        new Date(clientProfile.systemMetadata.updatedAt).toLocaleString() : 'Never'}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => sotClient.initialize().then(() => handleRefresh())}
                    >
                      Reinitialize Profile
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="health">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>
                      Current health status of your NextMonth integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {healthStatus ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                          {healthStatus.status === "healthy" ? (
                            <div className="flex items-center">
                              <CheckCircle2 className="h-10 w-10 text-green-500 mr-3" />
                              <div>
                                <p className="text-xl font-semibold">All Systems Operational</p>
                                <p className="text-sm text-gray-500">
                                  Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <AlertCircle className="h-10 w-10 text-red-500 mr-3" />
                              <div>
                                <p className="text-xl font-semibold">System Issues Detected</p>
                                <p className="text-sm text-gray-500">
                                  Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold">Component Status</h3>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            {Object.entries(healthStatus.components).map(([key, value]: [string, any]) => (
                              <div key={key} className="bg-white p-4 rounded-lg border">
                                <p className="text-sm font-medium">{key}</p>
                                <Badge variant={value === "online" || value === "operational" ? "default" : "destructive"}>
                                  {value}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold">Performance Metrics</h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-white p-4 rounded-lg border">
                              <p className="text-sm font-medium">Response Time</p>
                              <p className="text-xl">{healthStatus.metrics.responseTime.toFixed(2)} ms</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                              <p className="text-sm font-medium">Server Uptime</p>
                              <p className="text-xl">{Math.floor(healthStatus.metrics.uptime / 60)} minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">Health Data Not Available</h3>
                        <p className="text-gray-500 mt-2">
                          Unable to retrieve health status information
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="w-full"
                    >
                      {refreshing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Refreshing...
                        </>
                      ) : "Check Health Status"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="webhook">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Testing</CardTitle>
                    <CardDescription>
                      Test webhook notifications to the NextMonth ecosystem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p>
                        Use these controls to manually trigger webhook notifications to test your integration.
                        This is useful for verifying that the NextMonth ecosystem is properly receiving updates.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Service Update</CardTitle>
                            <CardDescription>
                              Simulates a service content change
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button
                              onClick={() => triggerTestWebhook("service_update")}
                              disabled={refreshing}
                              className="w-full"
                              variant="outline"
                            >
                              Trigger Service Update
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Contact Submission</CardTitle>
                            <CardDescription>
                              Simulates a new contact form submission
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button
                              onClick={() => triggerTestWebhook("contact_submission")}
                              disabled={refreshing}
                              className="w-full"
                              variant="outline"
                            >
                              Trigger Contact Webhook
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Content Update</CardTitle>
                            <CardDescription>
                              Simulates a content or copy change
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button
                              onClick={() => triggerTestWebhook("content_update")}
                              disabled={refreshing}
                              className="w-full"
                              variant="outline"
                            >
                              Trigger Content Update
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">System Update</CardTitle>
                            <CardDescription>
                              Simulates a system configuration change
                            </CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button
                              onClick={() => triggerTestWebhook("system_update")}
                              disabled={refreshing}
                              className="w-full"
                              variant="outline"
                            >
                              Trigger System Update
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h3 className="text-lg font-semibold">Webhook Audit Log</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Check the server console to view the webhook audit log entries
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;