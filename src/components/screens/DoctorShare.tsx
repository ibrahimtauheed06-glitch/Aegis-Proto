import React, { useState } from "react";
import { ScreenName } from "../../App";
import { ChevronLeft, QrCode, Copy, Clock, Share2, Check } from "lucide-react";

interface DoctorShareProps {
  goBack: () => void;
}

export default function DoctorShare({ goBack }: DoctorShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm flex items-center gap-4">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
           <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Doctor Share Capsule</h1>
      </header>

      <div className="flex-1 p-6 flex flex-col items-center">
         
         <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 border border-slate-100 w-full max-w-sm text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
               <QrCode size={32} />
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-2">Dr. Share Access</h2>
            <p className="text-slate-500 text-sm mb-8 px-4">
               Allow a doctor to view your latest reports and vitals without full account access.
            </p>
            
            <div className="bg-slate-900 p-4 rounded-xl mb-6 inline-block">
               {/* QR Code Placeholder */}
               <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://healthvault.app/share/xyz123`} 
                    alt="QR Code" 
                    className="w-44 h-44"
                  />
               </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-2 px-4 rounded-full text-xs font-bold w-fit mx-auto">
               <Clock size={14} /> Expires in 23h 59m
            </div>
         </div>

         <div className="w-full max-w-sm space-y-3">
            <button 
              onClick={handleCopy}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? "Link Copied!" : "Copy Secure Link"}
            </button>
            
            <button className="w-full bg-white text-slate-700 font-semibold py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Share2 size={20} /> Share via App
            </button>
         </div>

      </div>
    </div>
  );
}
