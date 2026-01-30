import React from "react";
import { 
  ShieldAlert, Phone, Copy, Heart, FileText, Lock, Smartphone, Pill 
} from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import { useToast } from "../ui/ToastContext";
import aegisLogo from "figma:asset/a846679f83e3e1d9be2c1025dccef005694afc5d.png";

export default function EmergencyID() {
  const { showToast } = useToast();

  const handleLockscreen = () => {
    showToast("Lockscreen widget settings opened", "info");
  };

  const handleCall = () => {
    showToast("Calling Emergency Contact...", "info");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Emergency ID</h1>
            <p className="text-slate-500 dark:text-slate-400">Critical medical data for first responders</p>
         </div>
         <NeonButton variant="outline" icon={Smartphone} onClick={handleLockscreen}>
            Show Lockscreen Version
         </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* QR Card - Main Feature */}
         <GlassCard 
            className="md:col-span-1 flex flex-col items-center text-center !bg-gradient-to-b !from-red-600 !to-rose-700 !border-transparent text-white relative overflow-hidden shadow-red-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => showToast("QR Code Expanded", "info")}
         >
            <div className="absolute inset-0 bg-white/5 pattern-dots mix-blend-overlay opacity-20" />
            
            <div className="relative z-10 w-full flex flex-col items-center py-4">
               <img 
                 src={aegisLogo} 
                 alt="Aegis" 
                 className="w-16 h-16 rounded-full object-cover mb-6 shadow-lg"
               />
               
               <h2 className="text-2xl font-bold mb-1">Medical ID</h2>
               <p className="text-white/80 text-sm mb-6">Scan for Emergency Info</p>
               
               <div className="p-4 bg-white rounded-2xl shadow-lg mb-6">
                  {/* Mock QR Code */}
                  <div className="w-40 h-40 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 border-4 border-white/20 rounded-lg" />
                     <div className="w-32 h-32 bg-white flex flex-wrap content-center justify-center p-2">
                         <div className="w-full h-full bg-black opacity-90 pattern-dots" />
                     </div>
                     <ShieldAlert size={24} className="absolute text-red-600 bg-white rounded-full p-0.5" />
                  </div>
               </div>
               
               <p className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                 ID: #882-192-MED 
                 <Copy size={12} className="cursor-pointer hover:text-white" onClick={(e) => {e.stopPropagation(); handleCopy("882-192-MED");}} />
               </p>
            </div>
         </GlassCard>

         {/* Medical Details */}
         <div className="md:col-span-2 space-y-6">
            <GlassCard>
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <Heart className="text-red-500" size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Critical Info</h3>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Blood Type</span>
                     <p className="text-3xl font-bold text-slate-900 dark:text-white">O+</p>
                  </div>
                  <div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Age / Weight</span>
                     <p className="text-xl font-bold text-slate-900 dark:text-white">32y <span className="text-slate-400 mx-1">/</span> 68kg</p>
                  </div>
                  <div className="col-span-2">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Allergies</span>
                     <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 rounded-lg text-sm font-bold">Penicillin</span>
                        <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 rounded-lg text-sm font-bold">Peanuts</span>
                     </div>
                  </div>
                  <div className="col-span-2">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Conditions</span>
                     <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800 rounded-lg text-sm font-bold">Asthma (Mild)</span>
                     </div>
                  </div>
               </div>
            </GlassCard>

            <GlassCard>
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <Pill className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Current Medications</h3>
               </div>
               <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white">Albuterol Inhaler</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">90mcg / As needed</p>
                     </div>
                     <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold">Active</span>
                  </li>
                  <li className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white">Vitamin D3</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">2000 IU / Daily</p>
                     </div>
                     <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold">Active</span>
                  </li>
               </ul>
            </GlassCard>
            
            <GlassCard>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <Phone className="text-green-500" size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
               </div>
               <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-300">AB</div>
                      <div>
                          <p className="font-bold text-slate-900 dark:text-white">Abhinav (Spouse)</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">+91 9519458204</p>
                      </div>
                  </div>
                  <button 
                     onClick={handleCall}
                     className="p-2 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:scale-110 active:scale-95 transition-all"
                  >
                      <Phone size={18} />
                  </button>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}