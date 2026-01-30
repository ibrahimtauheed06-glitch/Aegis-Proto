import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import { ChevronDown, Calendar, Filter } from "lucide-react";

const bloodPressureData = [
  { day: "Mon", sys: 120, dia: 80 },
  { day: "Tue", sys: 122, dia: 82 },
  { day: "Wed", sys: 118, dia: 79 },
  { day: "Thu", sys: 125, dia: 85 },
  { day: "Fri", sys: 121, dia: 81 },
  { day: "Sat", sys: 119, dia: 78 },
  { day: "Sun", sys: 120, dia: 80 },
];

const glucoseData = [
  { day: "Mon", value: 95 },
  { day: "Tue", value: 102 },
  { day: "Wed", value: 98 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 96 },
  { day: "Sat", value: 105 },
  { day: "Sun", value: 99 },
];

export default function HealthTimeline() {
  const [activeTab, setActiveTab] = React.useState<"Trends" | "Reports" | "Vitals">("Trends");

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
      <header className="bg-white px-6 py-4 pt-12 shadow-sm sticky top-0 z-10 md:pt-8 md:rounded-b-2xl">
        <h1 className="text-xl font-bold text-slate-900 mb-4">Health Timeline</h1>
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {["Trends", "Reports", "Vitals"].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                 activeTab === tab 
                   ? "bg-white text-blue-600 shadow-sm" 
                   : "text-slate-500 hover:text-slate-700"
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
           <button className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 whitespace-nowrap">
             <Calendar size={14} /> Last 7 Days
           </button>
           <button className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 whitespace-nowrap">
             <Filter size={14} /> All Categories
           </button>
        </div>

        {/* Charts Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 Blood Pressure
                 <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
              </h3>
              <p className="text-xl font-bold text-slate-900">120/80</p>
           </div>
           
           <div className="h-48 w-full min-w-0">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={bloodPressureData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10}} 
                    dy={10}
                 />
                 <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    cursor={{stroke: '#cbd5e1', strokeWidth: 1}}
                 />
                 <Line 
                    type="monotone" 
                    dataKey="sys" 
                    stroke="#0A84FF" 
                    strokeWidth={3} 
                    dot={{fill: '#0A84FF', r: 4, strokeWidth: 0}}
                    activeDot={{r: 6, strokeWidth: 0}}
                 />
                 <Line 
                    type="monotone" 
                    dataKey="dia" 
                    stroke="#a78bfa" 
                    strokeWidth={3} 
                    dot={{fill: '#a78bfa', r: 4, strokeWidth: 0}}
                    activeDot={{r: 6, strokeWidth: 0}}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 Glucose Levels
                 <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Slightly High</span>
              </h3>
              <p className="text-xl font-bold text-slate-900">105 <span className="text-xs text-slate-400 font-normal">mg/dL</span></p>
           </div>
           
           <div className="h-40 w-full min-w-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={glucoseData}>
                 <defs>
                    <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10}} 
                    dy={10}
                 />
                 <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                 <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorGlucose)" 
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
      </div>
    </div>
  );
}
