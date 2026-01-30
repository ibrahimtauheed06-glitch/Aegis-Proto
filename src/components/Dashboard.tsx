import React from "react";
import { useNavigate } from "react-router";
import { 
  Activity, Heart, Moon, Zap, Upload, Plus, ArrowUpRight, 
  ChevronRight 
} from "lucide-react";
import { GlassCard, NeonButton } from "./ui/FuturisticElements";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useToast } from "./ui/ToastContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/upload");
  };

  const handleSyncClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/devices');
  };

  const handleDeviceClick = (e: React.MouseEvent, device: string) => {
    e.stopPropagation();
    navigate('/devices');
    showToast(`Managing ${device} settings`, "info");
  };

  const handleTimeRange = (e: React.MouseEvent, t: string) => {
    e.stopPropagation();
    showToast(`View set to ${t}`, "info");
  };

  // Mock Data - Integers only
  const data = [
    { name: 'Mon', uv: 4000 },
    { name: 'Tue', uv: 3000 },
    { name: 'Wed', uv: 2000 },
    { name: 'Thu', uv: 2780 },
    { name: 'Fri', uv: 1890 },
    { name: 'Sat', uv: 2390 },
    { name: 'Sun', uv: 3490 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Hero Welcome */}
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 shadow-xl shadow-blue-500/10 dark:shadow-blue-900/20">
         {/* Background Gradient Mesh */}
         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
         <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:24px_24px]" />
         <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl mix-blend-screen animate-pulse" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  Welcome back, <span className="text-cyan-100">Aditi</span>
               </h1>
               <p className="text-blue-50 text-lg max-w-lg font-medium opacity-90">
                  Your AI health analysis is ready. No critical anomalies detected in your recent sync.
               </p>
            </div>
            <div className="flex gap-3">
               <NeonButton 
                  onClick={handleUpload} 
                  icon={Upload} 
                  className="!bg-white/20 !backdrop-blur-md !border-white/30 hover:!bg-white/30 !text-white !shadow-lg"
               >
                  Upload Report
               </NeonButton>
               <NeonButton 
                  onClick={handleSyncClick} 
                  icon={Plus} 
                  className="!bg-white !text-blue-600 hover:!bg-blue-50 !shadow-lg border-none"
               >
                  Sync Device
               </NeonButton>
            </div>
         </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Heart Rate - Red/Pink Theme */}
         <GlassCard 
            hoverEffect 
            onClick={() => navigate('/analytics')}
         >
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                  <Heart size={24} fill="currentColor" className="fill-current opacity-20" />
               </div>
               <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded-full border border-rose-100 dark:border-rose-800">
                  <ArrowUpRight size={12} /> +2%
               </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">72 <span className="text-sm font-medium text-slate-400">bpm</span></h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Resting Heart Rate</p>
            
            <div style={{ width: '100%', height: '50px', minWidth: 0 }} className="mt-4 -mx-2 pointer-events-none">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorRose" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <Area type="monotone" dataKey="uv" stroke="#fb7185" strokeWidth={3} fill="url(#colorRose)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         {/* Steps - Blue/Cyan Theme */}
         <GlassCard 
            hoverEffect
            onClick={() => navigate('/analytics')}
         >
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">
                  <Activity size={24} />
               </div>
               <span className="flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 px-2 py-1 rounded-full border border-cyan-100 dark:border-cyan-800">
                  Goal: 10k
               </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">8,432 <span className="text-sm font-medium text-slate-400">steps</span></h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Daily Activity</p>
            
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-8 overflow-hidden">
               <div className="h-full bg-cyan-500 rounded-full w-[84%] shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
            </div>
         </GlassCard>

         {/* Sleep - Purple/Indigo Theme */}
         <GlassCard 
            hoverEffect
            onClick={() => navigate('/analytics')}
         >
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                  <Moon size={24} />
               </div>
               <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                  Optimal
               </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">7 <span className="text-sm font-medium text-slate-400">hrs</span></h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Sleep Duration</p>
            
            <div className="flex gap-1 mt-6">
               {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`flex-1 rounded-full h-1.5 ${i > 5 ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-indigo-500'}`} />
               ))}
            </div>
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart Section */}
         <GlassCard 
            className="lg:col-span-2 min-h-[400px]"
            onClick={() => navigate('/analytics')}
            hoverEffect
         >
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Health Timeline</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Combined biometrics from all sources</p>
               </div>
               <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                  {['Day', 'Week', 'Month'].map(t => (
                     <button 
                        key={t} 
                        onClick={(e) => handleTimeRange(e, t)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${t === 'Week' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                     >
                        {t}
                     </button>
                  ))}
               </div>
            </div>
            
            <div style={{ width: '100%', height: 300, minWidth: 0 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)', backgroundColor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(10px)', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        formatter={(value: any) => [Math.round(value), "Value"]}
                     />
                     <Area type="monotone" dataKey="uv" stroke="#0ea5e9" strokeWidth={4} fill="url(#colorMain)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         {/* Side Widgets */}
         <div className="space-y-6">
            {/* Device Status */}
            <GlassCard noPadding className="p-0">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                  <h3 className="font-bold text-slate-900 dark:text-white">Devices</h3>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               </div>
               <div className="p-4 space-y-2">
                  <div 
                     onClick={(e) => handleDeviceClick(e, 'Apple Watch')}
                     className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                     <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-slate-200 dark:shadow-black/50">
                        <Activity size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Apple Watch</p>
                        <p className="text-xs text-slate-400">Synced 2m ago</p>
                     </div>
                     <ChevronRight size={16} className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
                  </div>

                  <div 
                     onClick={(e) => handleDeviceClick(e, 'Galaxy Ring')}
                     className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                     <div className="w-10 h-10 rounded-full bg-[#12a9d8] text-white flex items-center justify-center shadow-lg shadow-cyan-100 dark:shadow-cyan-900/30">
                        <Heart size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Galaxy Ring</p>
                        <p className="text-xs text-slate-400">Synced 1h ago</p>
                     </div>
                     <ChevronRight size={16} className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
                  </div>
               </div>
               <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                     onClick={(e) => { e.stopPropagation(); navigate('/devices'); }}
                     className="w-full py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
                  >
                     Manage Devices <ArrowUpRight size={12} />
                  </button>
               </div>
            </GlassCard>

            {/* AI Insight */}
            <GlassCard 
               className="!bg-gradient-to-br !from-violet-600 !to-indigo-600 !border-transparent text-white cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
               onClick={() => navigate('/analytics')}
            >
               <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-xs font-bold text-white/80 uppercase tracking-widest">AI Insight</span>
               </div>
               <p className="text-lg font-medium leading-relaxed mb-4">
                  "Your sleep quality improved by <span className="text-green-300 font-bold">12%</span> this week. Keep maintaining your 10:30 PM bedtime."
               </p>
               <button className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1">
                  View Analysis <ChevronRight size={12} />
               </button>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
