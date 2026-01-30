import React from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Eye, RefreshCw, Home } from "lucide-react";
import { motion } from "motion/react";

export default function UploadSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl text-center border border-slate-100 dark:border-slate-700"
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle size={48} />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Successful</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Your file has been securely uploaded and analyzed by Aegis AI.
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => navigate("/preview")}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
          >
            <Eye size={20} /> View File
          </button>
          
          <button 
            onClick={() => navigate("/upload")}
            className="w-full py-3.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} /> Upload Another
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")}
            className="w-full py-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold transition-all flex items-center justify-center gap-2"
          >
             Go Back to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
