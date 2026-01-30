import React from "react";
import { ScreenName } from "../../App";
import { ChevronLeft, Phone, AlertCircle, Droplet, Pill, FileText } from "lucide-react";
import { currentUser } from "../../lib/data";

interface EmergencyCardProps {
  goBack: () => void;
}

export default function EmergencyCard({ goBack }: EmergencyCardProps) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm flex items-center gap-4 sticky top-0 z-10 md:pt-8 md:rounded-b-2xl md:max-w-4xl md:mx-auto md:w-full md:mt-4">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
           <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Medical ID</h1>
        <div className="ml-auto">
           <AlertCircle className="text-red-500" />
        </div>
      </header>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
         <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-white p-6 border-b border-slate-100 flex items-center gap-4">
               <img src={currentUser.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
               <div>
                  <h2 className="text-2xl font-bold text-slate-900">{currentUser.name}</h2>
                  <p className="text-slate-500 text-sm">DOB: 12 May 1991 (34 yrs)</p>
               </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
               <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                     <Droplet size={20} />
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 font-medium uppercase">Blood Type</p>
                     <p className="text-lg font-bold text-slate-900">{currentUser.bloodGroup}</p>
                  </div>
               </div>
               <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                     <span className="text-xs font-bold">kg</span>
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 font-medium uppercase">Weight</p>
                     <p className="text-lg font-bold text-slate-900">72 kg</p>
                  </div>
               </div>
            </div>

            <div className="p-6 space-y-6">
               
               {/* Medical Details */}
               <Section title="Medical Conditions">
                  <p className="text-slate-700 font-medium">Asthma (Mild)</p>
               </Section>

               <Section title="Allergies & Reactions">
                  <ul className="space-y-2">
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        <span className="text-slate-700 font-medium">Penicillin <span className="text-slate-400 font-normal text-sm">- Severe rash</span></span>
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        <span className="text-slate-700 font-medium">Peanuts <span className="text-slate-400 font-normal text-sm">- Anaphylaxis</span></span>
                     </li>
                  </ul>
               </Section>

               <Section title="Medications">
                  <div className="flex gap-3 flex-wrap">
                     <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                        <Pill size={14} className="text-blue-500" />
                        <span className="text-sm font-semibold text-slate-700">Amoxicillin</span>
                     </div>
                     <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                        <Pill size={14} className="text-blue-500" />
                        <span className="text-sm font-semibold text-slate-700">Vitamin D3</span>
                     </div>
                  </div>
               </Section>

               <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Emergency Contact</h3>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-slate-900">Sarah Morgan (Wife)</p>
                        <p className="text-slate-500 text-sm">+1 (555) 123-4567</p>
                     </div>
                     <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-200 hover:scale-105 transition-transform">
                        <Phone size={20} className="fill-current" />
                     </button>
                  </div>
               </div>

            </div>

            {/* Footer QR */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col items-center text-center">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 mb-2">
                   <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://healthvault.app/emergency/${currentUser.name}`} 
                      alt="QR Code" 
                      className="w-24 h-24 opacity-80"
                   />
                </div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Scan for digital access</p>
            </div>
         </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div>
     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h3>
     {children}
  </div>
);
