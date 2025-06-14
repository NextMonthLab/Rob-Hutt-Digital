import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Send,
  Database,
  Globe,
  Settings
} from "lucide-react";

const Admin = () => {
  const [testResult, setTestResult] = useState<string>("");
  const queryClient = useQueryClient();

  // Get SOT client profile
  const { data: sotProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/sot/profile"],
  });

  // Initialize SOT profile
  const initializeMutation = useMutation({
    mutationFn: () => fetch("/api/sot/initialize", { method: "POST" }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sot/profile"] });
      setTestResult("SOT profile initialized successfully");
    },
  });

  // Test webhook
  const webhookMutation = useMutation({
    mutationFn: () => fetch("/api/sot/webhook", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "admin_test",
        payload: { message: "Admin dashboard test webhook" }
      })
    }).then(res => res.json()),
    onSuccess: (data) => {
      setTestResult(`Webhook test: ${data.success ? "Success" : "Failed"}`);
    },
  });

  // Health check
  const { data: healthData, refetch: refetchHealth } = useQuery({
    queryKey: ["/api/sot/health"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">
            Monitor NextMonth SOT integration and system health
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Activity className="w-6 h-6 mr-2 text-blue-600" />
                System Health
              </h2>
              <button
                onClick={() => refetchHealth()}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Database Connection
                </span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  NextMonth API
                </span>
                {healthData?.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  SOT Integration
                </span>
                {sotProfile ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          </motion.div>

          {/* SOT Profile Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">SOT Profile Management</h2>

            {profileLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading profile...</p>
              </div>
            ) : sotProfile ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Profile Active</p>
                  <p className="text-green-600 text-sm">
                    Business ID: {sotProfile.businessId}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Business Name:</span>
                    <p className="text-gray-600">{sotProfile.businessName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Industry:</span>
                    <p className="text-gray-600">{sotProfile.industry}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="text-gray-600">{sotProfile.activityTracking?.accountStatus}</p>
                  </div>
                  <div>
                    <span className="font-medium">Environment:</span>
                    <p className="text-gray-600">{sotProfile.platformBlueprintInformation?.hostingEnvironment}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No SOT profile found</p>
                <button
                  onClick={() => initializeMutation.mutate()}
                  disabled={initializeMutation.isPending}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {initializeMutation.isPending ? "Initializing..." : "Initialize Profile"}
                </button>
              </div>
            )}
          </motion.div>

          {/* Integration Testing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6">Integration Testing</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Available Tests</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => webhookMutation.mutate()}
                    disabled={webhookMutation.isPending}
                    className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {webhookMutation.isPending ? "Sending..." : "Test Webhook"}
                  </button>

                  <button
                    onClick={() => initializeMutation.mutate()}
                    disabled={initializeMutation.isPending}
                    className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {initializeMutation.isPending ? "Initializing..." : "Reinitialize SOT"}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Test Results</h3>
                <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
                  {testResult ? (
                    <p className="text-sm text-gray-700">{testResult}</p>
                  ) : (
                    <p className="text-sm text-gray-500">No tests run yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;