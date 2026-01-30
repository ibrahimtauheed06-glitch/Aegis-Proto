import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import { ArrowLeft, AlertCircle, RefreshCw, CheckCircle, Lock, Smartphone, ChevronRight } from "lucide-react";

export default function SyncTroubleshoot() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Troubleshoot Connection</h1>
            <p className="text-slate-500 dark:text-slate-400">Google Fit Sync Issues</p>
        </div>
      </div>

      <GlassCard className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/30 dark:border-amber-800">
         <div className="flex gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-xl h-fit">
                <AlertCircle size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Permission Denied</h3>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Aegis cannot access your Google Fit step count data. This usually happens when the "Physical Activity" permission was declined during setup.
                </p>
            </div>
         </div>
      </GlassCard>

      <GlassCard>
         <h3 className="font-bold text-slate-900 dark:text-white mb-4">Suggested Fixes</h3>
         
         <div className="space-y-4">
             <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="mt-1">
                    <Smartphone size={20} className="text-slate-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Check Device Settings</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Open Settings {'>'} Privacy {'>'} Aegis on your phone and ensure all toggles are enabled.</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
             </div>

             <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="mt-1">
                    <Lock size={20} className="text-slate-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Re-authenticate Google Account</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Disconnect and reconnect your Google account to refresh the OAuth token.</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
             </div>
         </div>

         <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
             <NeonButton variant="secondary" onClick={() => navigate(-1)}>Cancel</NeonButton>
             <NeonButton variant="primary">Reconnect Google Fit</NeonButton>
         </div>
      </GlassCard>
    </div>
  );
}
