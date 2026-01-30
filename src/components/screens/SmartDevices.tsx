import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Activity, Heart, Zap, RefreshCw, 
  Watch, Smartphone, Settings, AlertCircle, CheckCircle, Moon 
} from "lucide-react";
import { getLatestMetrics, getDevices, connectDeviceProvider, mockSync } from "../../lib/wearables";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";

export default function SmartDevices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const fetchedDevices = await getDevices();
    setDevices(fetchedDevices);
    
    const latestMetrics = await getLatestMetrics();
    setMetrics(latestMetrics);
    
    setLoading(false);
  }

  const handleSync = async (e: React.MouseEvent, provider: string) => {
    e.stopPropagation();
    setSyncing(provider);
    await mockSync(provider);
    await fetchData(); // Refresh data
    setTimeout(() => setSyncing(null), 1000);
  };

  const handleConnect = async (e: React.MouseEvent, provider: string) => {
      e.stopPropagation();
      try {
          await connectDeviceProvider(provider);
          await fetchData();
      } catch (error) {
          console.error("Failed to connect", error);
      }
  };

  const handleTroubleshoot = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate("/troubleshoot");
  };

  // Helper to map DB provider to UI config
  const getProviderConfig = (provider: string) => {
     switch(provider) {
         case 'apple': return { name: "Apple Health", icon: Activity, color: "text-white", bg: "bg-black" };
         case 'samsung': return { name: "Samsung Health", icon: Heart, color: "text-white", bg: "bg-[#12a9d8]" };
         case 'googlefit': return { name: "Google Fit", icon: Zap, color: "text-[#EA4335]", bg: "bg-white border border-slate-200" };
         default: return { name: provider, icon: Watch, color: "text-slate-500", bg: "bg-slate-200" };
     }
  };

  // Default metric values if none exist - integers
  const displayMetrics = metrics || {
      heart_rate_avg: 0,
      steps: 0,
      sleep_duration: 0,
      calories: 0
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sync Center</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your connected health ecosystem</p>
         </div>
         <NeonButton 
             onClick={fetchData}
             variant="secondary"
             className="!py-2"
           >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh Status
         </NeonButton>
      </div>

         
         {/* Live Vitals Grid */}
         <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity size={20} className="text-cyan-500" />
                  Live Stream
               </h2>
               <button onClick={() => navigate("/analytics")} className="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                  View Full Analytics
               </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Heart Rate Card */}
               <GlassCard className="flex flex-col justify-between" hoverEffect onClick={() => navigate('/analytics')}>
                  <div className="flex items-center gap-2 mb-3">
                     <Heart size={18} className="text-rose-500" />
                     <span className="text-xs font-bold text-slate-400 uppercase">Avg HR</span>
                  </div>
                  <div>
                     <span className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(displayMetrics.heart_rate_avg)}</span>
                     <span className="text-xs text-slate-400 font-medium ml-1">bpm</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
                     <div className="bg-rose-500 h-full rounded-full" style={{ width: '60%' }} />
                  </div>
               </GlassCard>

               {/* Steps Card */}
               <GlassCard className="flex flex-col justify-between" hoverEffect onClick={() => navigate('/analytics')}>
                  <div className="flex items-center gap-2 mb-3">
                     <Smartphone size={18} className="text-cyan-500" />
                     <span className="text-xs font-bold text-slate-400 uppercase">Steps</span>
                  </div>
                  <div>
                     <span className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(displayMetrics.steps).toLocaleString()}</span>
                     <span className="text-xs text-slate-400 font-medium ml-1">steps</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
                     <div className="bg-cyan-500 h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: '84%' }} />
                  </div>
               </GlassCard>

               {/* Sleep Card */}
               <GlassCard className="flex flex-col justify-between" hoverEffect onClick={() => navigate('/analytics')}>
                  <div className="flex items-center gap-2 mb-3">
                     <Moon size={18} className="text-indigo-500" />
                     <span className="text-xs font-bold text-slate-400 uppercase">Sleep</span>
                  </div>
                  <div>
                     <span className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(displayMetrics.sleep_duration)}</span>
                     <span className="text-xs text-slate-400 font-medium ml-1">hrs</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
                     <div className="bg-indigo-500 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
               </GlassCard>

               {/* Calories Card */}
               <GlassCard className="flex flex-col justify-between" hoverEffect onClick={() => navigate('/analytics')}>
                  <div className="flex items-center gap-2 mb-3">
                     <Zap size={18} className="text-orange-500" />
                     <span className="text-xs font-bold text-slate-400 uppercase">Active Cal</span>
                  </div>
                  <div>
                     <span className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(displayMetrics.calories)}</span>
                     <span className="text-xs text-slate-400 font-medium ml-1">kcal</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
                     <div className="bg-orange-500 h-full rounded-full" style={{ width: '45%' }} />
                  </div>
               </GlassCard>
            </div>
         </section>

         {/* Connected Devices List */}
         <section>
             <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Connected Ecosystems</h3>
                <button onClick={() => navigate("/permissions")} className="text-cyan-600 dark:text-cyan-400 font-bold text-sm hover:underline">
                   Manage Access
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dynamically Rendered Devices */}
                {['apple', 'samsung', 'googlefit'].map((providerKey) => {
                    const deviceData = devices.find(d => d.provider === providerKey);
                    const config = getProviderConfig(providerKey);
                    const isConnected = !!deviceData;
                    const isSyncing = syncing === providerKey;

                    return (
                        <GlassCard key={providerKey} hoverEffect className="relative overflow-visible">
                           <div className="flex justify-between items-start mb-6">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${config.bg} ${providerKey === 'googlefit' ? 'text-[#EA4335]' : 'text-white'}`}>
                                 <config.icon size={28} />
                              </div>
                              {isConnected ? (
                                 <div className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                                    <CheckCircle size={12} />
                                    <span>Active</span>
                                 </div>
                              ) : (
                                 <div className="bg-slate-100 dark:bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-bold">
                                    Disconnected
                                 </div>
                              )}
                           </div>

                           <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{config.name}</h4>
                           
                           {isConnected ? (
                              <>
                                 <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                                    Last synced: {deviceData.last_synced ? new Date(deviceData.last_synced).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Never'}
                                 </p>
                                 <NeonButton 
                                    onClick={(e: React.MouseEvent) => handleSync(e, providerKey)}
                                    variant="secondary"
                                    className="w-full !py-2 !text-sm"
                                 >
                                    <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
                                    {isSyncing ? "Syncing..." : "Sync Now"}
                                 </NeonButton>
                              </>
                           ) : (
                              <>
                                 <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                                    Connect to import health records
                                 </p>
                                 <NeonButton 
                                    onClick={(e: React.MouseEvent) => handleConnect(e, providerKey)}
                                    variant="primary"
                                    className="w-full !py-2 !text-sm"
                                 >
                                    Connect
                                 </NeonButton>
                              </>
                           )}
                           
                           {/* Error Simulation for Google Fit if connected */}
                           {isConnected && providerKey === 'googlefit' && (
                              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-50 dark:bg-amber-900/50 border border-amber-100 dark:border-amber-800 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/70 transition-colors z-30"
                                   onClick={handleTroubleshoot}>
                                    <AlertCircle size={14} className="text-amber-500" />
                                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Sync Issues Detected</span>
                              </div>
                           )}
                        </GlassCard>
                    );
                })}

                {/* Permissions Management Card */}
                <GlassCard 
                  onClick={() => navigate("/permissions")}
                  hoverEffect
                  className="border-dashed !border-slate-300 dark:!border-slate-700 flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[220px] group !bg-slate-50/30 dark:!bg-slate-800/30"
                >
                   <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors shadow-sm">
                      <Settings size={28} className="text-slate-400 group-hover:text-cyan-500" />
                   </div>
                   <div className="text-center">
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">Permissions</h4>
                      <p className="text-xs text-slate-400 mt-1">Manage data access</p>
                   </div>
                </GlassCard>
             </div>
         </section>
    </div>
  );
}
