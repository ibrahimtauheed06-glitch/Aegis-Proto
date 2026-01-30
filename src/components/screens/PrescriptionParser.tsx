import React, { useState } from "react";
import { ScreenName } from "../../App";
import { ChevronLeft, Camera, Image, Check, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface PrescriptionParserProps {
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
}

export default function PrescriptionParser({ navigate, goBack }: PrescriptionParserProps) {
  const [step, setStep] = useState<"capture" | "review">("capture");

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col text-white">
      {step === "capture" ? (
         <>
           <header className="px-6 pt-12 pb-4 flex items-center justify-between">
             <button onClick={goBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <ChevronLeft size={24} />
             </button>
             <span className="font-semibold">Scan Prescription</span>
             <div className="w-10" />
           </header>

           <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="w-[80%] aspect-[3/4] border-2 border-white/30 rounded-3xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                 <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                 <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                 <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                 <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
              </div>
              <p className="text-slate-400 mt-8 text-sm">Align the prescription within the frame</p>
           </div>

           <div className="p-10 pb-16 flex items-center justify-between">
              <button className="text-white/80 flex flex-col items-center gap-1 text-xs">
                 <Image size={24} /> Gallery
              </button>
              
              <button 
                onClick={() => setStep("review")}
                className="w-20 h-20 bg-white rounded-full border-4 border-slate-800 outline outline-2 outline-white flex items-center justify-center"
              >
                 <div className="w-16 h-16 bg-white rounded-full border-2 border-slate-300" />
              </button>
              
              <div className="w-8" /> 
           </div>
         </>
      ) : (
         <div className="bg-slate-50 h-full min-h-screen text-slate-900 flex flex-col">
            <header className="bg-white px-6 pt-12 pb-4 shadow-sm flex items-center gap-4">
               <button onClick={() => setStep("capture")} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
                  <ChevronLeft size={24} />
               </button>
               <h1 className="text-lg font-bold text-slate-900">Review Medicines</h1>
            </header>

            <div className="p-6 flex-1 overflow-y-auto">
               <div className="mb-6 h-48 w-full bg-slate-200 rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" alt="Prescription" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                     <button className="bg-white/90 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Retake Photo</button>
                  </div>
               </div>

               <h3 className="font-bold text-slate-900 mb-4">Detected Medications (3)</h3>

               <div className="space-y-4">
                  {[
                     { name: "Amoxicillin", dose: "500mg", freq: "Twice daily" },
                     { name: "Paracetamol", dose: "650mg", freq: "As needed" },
                     { name: "Cetirizine", dose: "10mg", freq: "Once daily (Night)" }
                  ].map((med, i) => (
                     <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                           {i + 1}
                        </div>
                        <div className="flex-1">
                           <input type="text" defaultValue={med.name} className="font-bold text-slate-900 w-full mb-1 bg-transparent border-b border-dashed border-slate-200 focus:border-blue-500 outline-none pb-0.5" />
                           <div className="flex gap-4">
                              <input type="text" defaultValue={med.dose} className="text-xs text-slate-500 w-full bg-transparent outline-none" />
                              <input type="text" defaultValue={med.freq} className="text-xs text-slate-500 w-full bg-transparent outline-none text-right" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
               <button 
                 onClick={() => navigate("Calendar")}
                 className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
               >
                  Confirm & Add to Calendar <Check size={20} />
               </button>
            </div>
         </div>
      )}
    </div>
  );
}
