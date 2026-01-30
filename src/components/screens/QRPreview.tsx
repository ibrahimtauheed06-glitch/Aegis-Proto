import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Share2, Download, Copy, Check } from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import { QRCodeSVG } from "qrcode.react";

export default function QRPreview() {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const qrData = JSON.stringify({
    patient: "Aditi",
    id: "MED-8842-XJ",
    report: "Comprehensive Blood Panel",
    date: "2023-10-24",
    url: "https://aegis.health/share/x8d9s0"
  });

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Share Record</h1>
      </div>

      <GlassCard className="flex flex-col items-center justify-center p-8 md:p-12 gap-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scan to View</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Share this medical record securely with your doctor
          </p>
        </div>

        <div className="p-4 bg-white rounded-3xl shadow-lg">
          <QRCodeSVG 
            value={qrData} 
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="w-full space-y-3">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-mono truncate px-2">
              https://aegis.health/share/x8d9s0
            </span>
            <button 
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-400" />}
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full">
           <NeonButton className="flex-1 justify-center" icon={Share2}>
             Share
           </NeonButton>
           <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
             <Download size={20} />
           </button>
        </div>
      </GlassCard>
      
      <p className="text-center text-xs text-slate-400 mt-8 max-w-xs mx-auto">
        This QR code grants temporary access to this specific record for 24 hours.
      </p>
    </div>
  );
}
