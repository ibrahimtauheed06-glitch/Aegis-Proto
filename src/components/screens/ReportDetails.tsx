import React from "react";
import { ScreenName } from "../../App";
import { reports } from "../../lib/data";
import { ChevronLeft, Download, Share2, FileText, Calendar, Building2, Stethoscope, AlertTriangle, Activity } from "lucide-react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ReportDetailsProps {
  id: string | null;
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
}

const mockChartData = [
  { day: "Jan", val: 110 },
  { day: "Feb", val: 115 },
  { day: "Mar", val: 108 },
  { day: "Apr", val: 120 },
  { day: "May", val: 118 },
  { day: "Jun", val: 125 }, // Spike
];

export default function ReportDetails({ id, navigate, goBack }: ReportDetailsProps) {
  const report = reports.find(r => r.id === id) || reports[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto">
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm flex items-center justify-between sticky top-0 z-10 md:pt-8 md:rounded-b-2xl">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
           <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
           <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
              <Download size={20} />
           </button>
           <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
              <Share2 size={20} />
           </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
         
         {/* Summary Header */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
               <FileText size={32} />
            </div>
            <div className="flex-1">
               <h1 className="text-xl font-bold text-slate-900 mb-2">{report.title}</h1>
               <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                  <span className="flex items-center gap-1"><Building2 size={14} /> {report.labName}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                     {report.category}
                  </span>
               </div>
            </div>
         </div>

         {/* Doctor's Summary */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
             <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Stethoscope size={18} className="text-blue-600" /> Doctor's Summary
             </h3>
             <p className="text-sm text-slate-600 leading-relaxed">
                {report.summary}
                <span className="block mt-2 font-medium text-slate-900">Recommended: Schedule a follow-up in 3 months.</span>
             </p>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {/* Chart Preview (Vitals) */}
            <div className="md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                   <Activity size={16} className="text-slate-400" /> Vital Trends
                </h3>
                <div className="h-32 w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <Tooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}} />
                      <Line 
                         type="monotone" 
                         dataKey="val" 
                         stroke="#0A84FF" 
                         strokeWidth={2} 
                         dot={{r: 2}}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">6 Month Trend</p>
            </div>

            {/* Abnormal Values Highlight */}
            <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-900 px-1">Abnormal Findings</h3>
                {report.parameters.filter(p => p.status !== "Normal").map((param, i) => (
                   <div key={i} className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                      <div>
                         <p className="font-bold text-slate-900">{param.name}</p>
                         <p className="text-xs text-red-600 font-medium">Out of Range ({param.range} {param.unit})</p>
                      </div>
                      <div className="text-right">
                         <span className="text-lg font-bold text-red-600">{param.value}</span>
                         <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-red-600 uppercase">
                            <AlertTriangle size={10} /> {param.status}
                         </div>
                      </div>
                   </div>
                ))}
                {report.parameters.filter(p => p.status !== "Normal").length === 0 && (
                   <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                      <p className="text-green-700 font-medium text-sm">No abnormal values detected.</p>
                   </div>
                )}
            </div>
         </div>

         {/* Full Table */}
         <div className="space-y-4">
            <h3 className="font-bold text-slate-900 px-1">Full Report</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                     <tr>
                        <th className="px-4 py-3">Test</th>
                        <th className="px-4 py-3">Result</th>
                        <th className="px-4 py-3 text-right">Ref Range</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {report.parameters.map((param, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                           <td className="px-4 py-4 font-medium text-slate-900">{param.name}</td>
                           <td className="px-4 py-4">
                              <span className={`font-bold ${
                                 param.status === "Low" ? "text-amber-500" :
                                 param.status === "High" ? "text-red-500" : "text-slate-700"
                              }`}>
                                 {param.value}
                              </span>
                              <span className="text-xs text-slate-400 ml-1">{param.unit}</span>
                           </td>
                           <td className="px-4 py-4 text-right text-slate-400 text-xs">{param.range}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

      </div>
      </div>
    </div>
  );
}
