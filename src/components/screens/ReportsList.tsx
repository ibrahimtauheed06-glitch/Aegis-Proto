import React, { useState } from "react";
import { ScreenName } from "../../App";
import { reports } from "../../lib/data";
import { Search, Filter, FileText, ChevronRight, Plus, Calendar, ArrowUpRight, MoreHorizontal, Download } from "lucide-react";
import { motion } from "motion/react";

interface ReportsListProps {
  navigate: (screen: ScreenName) => void;
  onSelect: (id: string) => void;
}

export default function ReportsList({ navigate, onSelect }: ReportsListProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter(r => 
    (activeCategory === "All" || r.category === activeCategory) &&
    (r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.labName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto md:px-8">
      
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 md:static md:bg-transparent md:shadow-none md:pt-8 md:px-0 md:pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
          <div>
             <h1 className="text-xl md:text-2xl font-bold text-slate-900">Medical Records</h1>
             <p className="text-slate-500 text-sm hidden md:block mt-1">Manage and track your health history</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search records..." 
                   className="bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                />
             </div>
             
             <button className="md:hidden w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100">
                <Filter size={16} />
             </button>

             <button 
               onClick={() => navigate("Upload")}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
             >
                <Plus size={18} />
                <span className="hidden md:inline">Upload New</span>
                <span className="md:hidden">Upload</span>
             </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="relative md:hidden">
           <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
           <input 
             type="text" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search reports, doctors, labs..." 
             className="w-full bg-slate-100 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
           />
        </div>
      </header>
      
      {/* Filters */}
      <div className="px-6 md:px-0 pb-4 md:pb-6 flex gap-2 overflow-x-auto no-scrollbar">
         {["All", "Bloodwork", "Radiology", "Prescriptions", "Genetic"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
         ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4">Report Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReports.map((report) => (
              <tr 
                key={report.id} 
                onClick={() => onSelect(report.id)}
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                       <FileText size={18} />
                    </div>
                    <div>
                       <p className="font-semibold text-slate-900 text-sm">{report.title}</p>
                       <p className="text-xs text-slate-500">{report.labName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {report.date}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {report.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    report.status === "Attention" 
                      ? "bg-amber-50 text-amber-600 border border-amber-100" 
                      : "bg-green-50 text-green-600 border border-green-100"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${report.status === "Attention" ? "bg-amber-500" : "bg-green-500"}`} />
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                       <Download size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                       <ArrowUpRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReports.length === 0 && (
           <div className="p-12 text-center text-slate-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No records found matching your criteria.</p>
           </div>
        )}
      </div>

      {/* Mobile List Cards */}
      <div className="md:hidden px-6 space-y-4">
         {filteredReports.map((report) => (
           <div 
             key={report.id} 
             onClick={() => onSelect(report.id)}
             className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.99] transition-transform cursor-pointer"
           >
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                 <FileText size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                 <h3 className="font-bold text-slate-900 text-sm mb-0.5 truncate">{report.title}</h3>
                 <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{report.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="truncate">{report.labName}</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 {report.status === "Attention" && (
                   <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm animate-pulse" />
                 )}
                 <ChevronRight size={18} className="text-slate-300" />
              </div>
           </div>
         ))}
         {filteredReports.length === 0 && (
           <div className="py-12 text-center text-slate-400">
              <p>No records found.</p>
           </div>
        )}
      </div>
      </div>
    </div>
  );
}
