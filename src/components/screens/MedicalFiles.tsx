import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
  FileText, Search, Filter, Download, Eye, Calendar, 
  MoreVertical, FileCheck, AlertCircle, QrCode 
} from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import { useToast } from "../ui/ToastContext";

export default function MedicalFiles() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [filter, setFilter] = useState("All");

  const handleAction = (action: string) => {
    showToast(`${action} successful`, "success");
  };

  const records = [
    { id: 1, title: "Comprehensive Blood Panel", date: "Oct 24, 2023", type: "Lab Result", doctor: "Dr. Sarah Smith", status: "Normal" },
    { id: 2, title: "MRI Lumbar Spine", date: "Sep 12, 2023", type: "Imaging", doctor: "Dr. James Wilson", status: "Attention" },
    { id: 3, title: "Annual Physical Examination", date: "Aug 05, 2023", type: "General", doctor: "Dr. Emily Chen", status: "Normal" },
    { id: 4, title: "Vaccination Record - Flu", date: "Jan 15, 2023", type: "Immunization", doctor: "Clinic A", status: "Normal" },
  ];

  const categories = ["All", "Lab Result", "Imaging", "General", "Immunization"];

  const getStatusColor = (status: string) => {
    return status === "Normal" 
        ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800" 
        : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Medical Records</h1>
            <p className="text-slate-500 dark:text-slate-400">Securely stored health documents</p>
         </div>
         <NeonButton icon={FileText} onClick={() => navigate("/upload")}>
            Upload New Record
         </NeonButton>
      </div>

      {/* Search & Filter */}
      <GlassCard className="!p-4 flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by doctor, condition, or date..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-700 dark:text-white placeholder:text-slate-400"
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
               <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                     filter === cat 
                     ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md" 
                     : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 active:scale-95"
                  }`}
               >
                  {cat}
               </button>
            ))}
         </div>
      </GlassCard>

      {/* New Report Mock Card */}
      <GlassCard 
         className="relative overflow-hidden cursor-pointer group !p-0 border-l-4 border-l-blue-500"
         onClick={() => navigate("/preview")}
      >
         <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-bl-xl text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Just Now
         </div>
         <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center animate-pulse">
               <FileText size={24} />
            </div>
            <div>
               <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  New Report.pdf
               </h3>
               <p className="text-sm text-slate-500 dark:text-slate-400">
                  Ready for AI Analysis • <span className="text-blue-500 font-medium">Tap to view</span>
               </p>
            </div>
            
            {/* Added QR Button to Main Card as well for easy access if needed, though mostly for list items */}
             <div className="ml-auto mr-4">
                 <button
                     onClick={(e) => { e.stopPropagation(); navigate("/qr-preview"); }}
                     className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-400 hover:text-blue-500 transition-colors"
                 >
                     <QrCode size={20} />
                 </button>
             </div>
         </div>
      </GlassCard>

      {/* Records List */}
      <div className="grid grid-cols-1 gap-4">
         {records.map((record) => (
            <GlassCard key={record.id} hoverEffect className="flex flex-col md:flex-row items-start md:items-center gap-4 !p-5 cursor-pointer group">
               <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">
                  <FileText size={24} />
               </div>
               
               <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">{record.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                     <span className="flex items-center gap-1"><Calendar size={12} /> {record.date}</span>
                     <span className="flex items-center gap-1"><FileCheck size={12} /> {record.doctor}</span>
                  </div>
               </div>

               <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(record.status)}`}>
                  {record.status === "Attention" && <AlertCircle size={12} />}
                  {record.status}
               </div>

               <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <button 
                     onClick={(e) => { e.stopPropagation(); navigate("/qr-preview"); }}
                     className="flex-1 md:flex-none p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors active:scale-90"
                     title="Share via QR"
                  >
                     <QrCode size={20} />
                  </button>
                  <button 
                     onClick={(e) => { e.stopPropagation(); handleAction("Preview opened"); }}
                     className="flex-1 md:flex-none p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors active:scale-90"
                  >
                     <Eye size={20} />
                  </button>
                  <button 
                     onClick={(e) => { e.stopPropagation(); handleAction("Download started"); }}
                     className="flex-1 md:flex-none p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors active:scale-90"
                  >
                     <Download size={20} />
                  </button>
                  <button 
                     onClick={(e) => { e.stopPropagation(); handleAction("Menu opened"); }}
                     className="flex-1 md:flex-none p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors active:scale-90"
                  >
                     <MoreVertical size={20} />
                  </button>
               </div>
            </GlassCard>
         ))}
      </div>
    </div>
  );
}
