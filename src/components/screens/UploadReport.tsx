import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, CloudUpload, Camera, FileText, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function UploadReport() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectFile = () => {
    navigate("/file-picker");
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full flex-1">
        <header className="bg-white dark:bg-slate-800 px-6 pt-12 pb-4 shadow-sm flex items-center gap-4 md:pt-8 md:rounded-b-2xl md:mt-4 md:mx-6 transition-colors">
          <button onClick={() => navigate("/dashboard")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">AI Medical Report Scanner</h1>
        </header>

        <div className="flex-1 p-6 md:grid md:grid-cols-3 md:gap-8">
          
          {/* Main Upload Area (Left 2/3) */}
          <div className="md:col-span-2 flex flex-col h-full">
            <AnimatePresence mode="wait">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex-1 min-h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 transition-colors bg-white dark:bg-slate-800 ${
                    isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-slate-300 dark:border-slate-700"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleSelectFile(); }}
                >
                  <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 shadow-sm">
                      <CloudUpload size={40} />
                  </div>
                  <div className="text-center px-8">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Report</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Drag & drop PDF or Image here</p>
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">(Max size: 10MB)</p>
                  </div>
                  
                  <button onClick={handleSelectFile} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:scale-105 transition-transform">
                      Select File
                  </button>
                  
                  <div className="flex items-center gap-4 w-full px-12 my-2 max-w-sm">
                      <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1" />
                      <span className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase">OR</span>
                      <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1" />
                  </div>

                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold bg-slate-100 dark:bg-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Camera size={20} /> Scan with Camera
                  </button>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sidebar (Recent Uploads) - Desktop Only */}
          <div className="hidden md:flex flex-col gap-6">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                   <Clock size={18} className="text-slate-400" /> Recent Uploads
                </h3>
                
                <div className="space-y-4">
                   {[
                      { name: "Blood_Work_Jan28.pdf", date: "Today", status: "Processed" },
                      { name: "MRI_Report_Dec12.pdf", date: "Dec 12", status: "Processed" },
                      { name: "Prescription_Nov02.jpg", date: "Nov 02", status: "Failed" },
                   ].map((file, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                         <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <FileText size={20} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
                            <div className="flex justify-between items-center mt-1">
                               <span className="text-xs text-slate-400">{file.date}</span>
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  file.status === "Processed" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                               }`}>
                                  {file.status}
                               </span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                   <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <h4 className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-1">Did you know?</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-300 leading-relaxed">
                         You can upload photos of handwritten prescriptions too. Our AI is trained to read doctor handwriting.
                      </p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
