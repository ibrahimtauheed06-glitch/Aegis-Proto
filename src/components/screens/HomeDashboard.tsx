import React from "react";
import { ScreenName } from "../../App";
import { currentUser, reports, timelineEvents } from "../../lib/data";
import { Bell, Scan, QrCode, FilePlus, ChevronRight, Activity, Calendar, Pill, CloudUpload, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface HomeDashboardProps {
  navigate: (screen: ScreenName) => void;
}

export default function HomeDashboard({ navigate }: HomeDashboardProps) {
  const latestReport = reports[0];

  return (
    <div className="pb-24 md:pb-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 md:pt-8 md:pb-8 rounded-b-3xl md:rounded-none shadow-sm z-10 sticky top-0 md:static">
        <div className="flex justify-between items-center mb-6 md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <p className="text-xs text-slate-500 font-medium">Good Morning,</p>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">{currentUser.name}</h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 relative hover:bg-slate-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Quick Actions - Mobile Only */}
        <div className="md:hidden grid grid-cols-4 gap-4">
           <ActionButton 
             icon={Scan} 
             label="Scan" 
             color="bg-blue-600" 
             textColor="text-white"
             onClick={() => navigate("Upload")}
           />
           <ActionButton 
             icon={QrCode} 
             label="QR Card" 
             color="bg-red-50" 
             textColor="text-red-600"
             onClick={() => navigate("Emergency")}
           />
           <ActionButton 
             icon={Pill} 
             label="Meds" 
             color="bg-emerald-50" 
             textColor="text-emerald-600"
             onClick={() => navigate("Calendar")}
           />
           <ActionButton 
             icon={Calendar} 
             label="History" 
             color="bg-violet-50" 
             textColor="text-violet-600"
             onClick={() => navigate("Timeline")}
           />
        </div>
      </header>

      <div className="px-6 py-6 md:px-8 md:max-w-7xl md:mx-auto space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="md:col-span-2 space-y-6 md:space-y-8">
            
            {/* Desktop Stats Row */}
            <div className="hidden md:grid grid-cols-3 gap-4">
                <div onClick={() => navigate("Upload")} className="bg-blue-600 p-5 rounded-2xl text-white shadow-lg shadow-blue-200 cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between h-32">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <CloudUpload size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold">Upload Report</h3>
                        <p className="text-blue-100 text-xs">AI Analysis ready</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
                     <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                            <Activity size={20} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">+2.4%</span>
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900">Health Score</h3>
                        <p className="text-slate-500 text-xs">Improving steadily</p>
                     </div>
                </div>

                <div onClick={() => navigate("Timeline")} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-blue-200 transition-colors">
                     <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                        <TrendingUp size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900">Vitals Trend</h3>
                        <p className="text-slate-500 text-xs">Last 7 days</p>
                     </div>
                </div>
            </div>

            {/* Latest Report Card */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Recent Health Reports</h2>
                <button onClick={() => navigate("Reports")} className="text-sm text-blue-600 font-medium hover:underline">See All</button>
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={() => navigate("AISummary")}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer hover:shadow-md"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex-1">
                      <div className="flex justify-between md:justify-start items-start md:items-center gap-3 mb-3">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {latestReport.category}
                        </div>
                        <span className="text-xs text-slate-400">{latestReport.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{latestReport.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{latestReport.labName}</p>
                      
                      <div className="flex items-center gap-3">
                        {latestReport.status === "Attention" && (
                            <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-semibold">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Action Needed
                            </div>
                        )}
                      </div>
                  </div>
                  
                  <div className="md:border-l md:border-slate-100 md:pl-8 flex flex-col items-start gap-2 min-w-[150px]">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis</span>
                      <p className="text-sm text-slate-600 line-clamp-2">{latestReport.summary}</p>
                      <div className="text-xs text-blue-600 font-semibold flex items-center mt-2 group-hover:translate-x-1 transition-transform">
                          View AI Summary <ChevronRight size={14} />
                      </div>
                  </div>
                </div>
              </motion.div>
            </section>

             {/* Timeline Preview (Desktop Wide) */}
             <section className="hidden md:block">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-800">Timeline Preview</h2>
                    <button onClick={() => navigate("Timeline")} className="text-sm text-blue-600 font-medium hover:underline">Full History</button>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-3 gap-6">
                        {timelineEvents.map((event, idx) => (
                            <div key={idx} className="relative pl-4 border-l-2 border-slate-100">
                                <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                                    event.type === 'Report' ? 'bg-blue-500' : 
                                    event.type === 'Vitals' ? 'bg-red-500' : 'bg-emerald-500'
                                }`} />
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{event.title}</h4>
                                <span className="text-xs text-slate-400 block mb-2">{event.date}</span>
                                <p className="text-xs text-slate-500 line-clamp-2">{event.description}</p>
                            </div>
                        ))}
                    </div>
                 </div>
             </section>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="space-y-6">
            {/* Doctor Share Capsule */}
            <section>
                <div 
                    onClick={() => navigate("DoctorShare")}
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform cursor-pointer"
                >
                    <div className="flex items-start justify-between">
                        <div>
                        <h3 className="font-bold text-lg mb-1">Doctor Share</h3>
                        <p className="text-blue-100 text-sm mb-4">Create a temporary secure link for your doctor.</p>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors">
                            <QrCode size={14} /> Generate Code
                        </button>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Share2Icon />
                        </div>
                    </div>
                </div>
            </section>

             {/* Mobile Timeline Preview (Hidden on Desktop) */}
            <section className="md:hidden">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Timeline</h2>
                <div className="relative pl-4 space-y-6 before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    {timelineEvents.slice(0, 3).map((event, idx) => (
                        <div key={idx} className="relative flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-1.5 border-2 border-white shadow-sm z-10 ${
                            event.type === 'Report' ? 'bg-blue-500' : 
                            event.type === 'Vitals' ? 'bg-red-500' : 'bg-emerald-500'
                        }`} />
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-slate-900 text-sm">{event.title}</h4>
                                <span className="text-[10px] text-slate-400 font-medium">{event.date}</span>
                            </div>
                            <p className="text-xs text-slate-500">{event.description}</p>
                        </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Emergency Widget (Desktop) */}
            <section className="hidden md:block">
                 <div onClick={() => navigate("Emergency")} className="bg-red-50 p-6 rounded-2xl border border-red-100 cursor-pointer hover:bg-red-100 transition-colors group">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <QrCode size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900">Emergency Card</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Instant access to your critical medical info and emergency contacts.</p>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wide">View Card &rarr;</span>
                 </div>
            </section>

        </div>

      </div>
    </div>
  );
}

const ActionButton = ({ icon: Icon, label, color, textColor, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
     <div className={`w-14 h-14 rounded-2xl ${color} ${textColor} flex items-center justify-center shadow-sm group-active:scale-95 transition-transform`}>
        <Icon size={24} />
     </div>
     <span className="text-xs font-medium text-slate-600">{label}</span>
  </button>
);

const Share2Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);
