import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, FileText, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "../ui/FuturisticElements";

export default function FilePicker() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const files = [
    { name: "Lab_Results_Oct2023.pdf", size: "1.2 MB", date: "Oct 24, 2023" },
    { name: "Vaccination_Record.pdf", size: "850 KB", date: "Jan 15, 2023" },
  ];

  const handleSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleConfirm = () => {
    if (selectedFile) {
      navigate("/upload-success");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col p-6">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Select File</h1>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full space-y-4">
        {files.map((file) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(file.name)}
            className={`
              relative p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4
              ${selectedFile === file.name 
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md" 
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"}
            `}
          >
            <div className={`p-3 rounded-xl ${selectedFile === file.name ? "bg-blue-100 text-blue-600" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
              <FileText size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white">{file.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{file.size} • {file.date}</p>
            </div>
            {selectedFile === file.name && (
              <div className="text-blue-500">
                <CheckCircle size={24} fill="currentColor" className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl mx-auto w-full">
        <button
          onClick={handleConfirm}
          disabled={!selectedFile}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
            ${selectedFile 
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-blue-900/30 transform hover:-translate-y-1" 
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}
          `}
        >
          Upload Selected File
        </button>
      </div>
    </div>
  );
}
