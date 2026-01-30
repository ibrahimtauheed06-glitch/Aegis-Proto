import React, { useState } from "react";
import { ScreenName } from "../../App";
import { 
  ChevronLeft, CheckCircle, Activity, Heart, Moon, Zap, 
  Flame, Droplet, Watch, RefreshCw, Smartphone, CheckSquare, 
  Square, Shield, Lock, LayoutDashboard, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

interface DeviceSetupProps {
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
}

export default function DeviceSetup({ navigate, goBack }: DeviceSetupProps) {
  const [step, setStep] = useState(0); // 0=Select, 1=Info, 2=Auth/Perms, 3=Success
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Platform specific logic
  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 1) {
       setStep(2);
    } else if (step === 2) {
       setLoading(true);
       setTimeout(() => {
          setLoading(false);
          setStep(3);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
       }, 2000);
    } else {
       navigate("SmartDevices");
    }
  };

  // Renderers for different flows
  const renderAppleFlow = () => {
     // ... (Existing Apple flow logic adapted)
     return (
        <AppleFlow step={step} onNext={handleNext} setStep={setStep} />
     );
  };

  const renderSamsungFlow = () => {
     return (
        <SamsungFlow step={step} onNext={handleNext} loading={loading} />
     );
  };

  const renderGoogleFlow = () => {
     return (
        <GoogleFlow step={step} onNext={handleNext} loading={loading} />
     );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-white z-10 md:pt-8 md:max-w-2xl md:mx-auto md:w-full border-b border-transparent">
        <button onClick={step === 0 ? goBack : () => setStep(step - 1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
           <ChevronLeft size={24} />
        </button>
        <div className="font-bold text-slate-900">
           {step === 0 ? "Add Source" : selectedPlatform}
        </div>
        <div className="w-10" /> 
      </header>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Select Platform */}
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect Ecosystem</h1>
              <p className="text-slate-500 mb-8">Choose the platform where your health data lives.</p>

              <div className="grid gap-4">
                  <PlatformButton 
                    name="Apple Health" 
                    desc="iPhone, Apple Watch" 
                    icon={Activity} 
                    bg="bg-black" 
                    onClick={() => handlePlatformSelect("Apple Health")} 
                  />
                  <PlatformButton 
                    name="Samsung Health" 
                    desc="Galaxy Watch, Samsung Phones" 
                    icon={Heart} 
                    bg="bg-[#12a9d8]" // Samsung Blue/Teal
                    onClick={() => handlePlatformSelect("Samsung Health")} 
                  />
                  <PlatformButton 
                    name="Google Fit" 
                    desc="Android, Wear OS" 
                    icon={Zap} 
                    bg="bg-white border border-slate-200 text-slate-900" 
                    iconColor="text-[#EA4335]" // Google Red
                    hoverBorder="hover:border-[#EA4335]"
                    onClick={() => handlePlatformSelect("Google Fit")} 
                  />
              </div>
            </motion.div>
          )}

          {/* Flow Rendering */}
          {step > 0 && selectedPlatform === "Apple Health" && renderAppleFlow()}
          {step > 0 && selectedPlatform === "Samsung Health" && renderSamsungFlow()}
          {step > 0 && selectedPlatform === "Google Fit" && renderGoogleFlow()}

        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS & FLOWS ---

const PlatformButton = ({ name, desc, icon: Icon, bg, iconColor = "text-white", hoverBorder = "hover:border-black", onClick }: any) => (
  <button onClick={onClick} className={`flex items-center gap-4 p-5 rounded-2xl border border-slate-200 ${hoverBorder} hover:shadow-lg transition-all group text-left`}>
     <div className={`w-14 h-14 ${bg} ${iconColor} rounded-2xl flex items-center justify-center shrink-0`}>
        <Icon size={28} />
     </div>
     <div>
        <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
     </div>
     <ChevronRight className="ml-auto text-slate-300 group-hover:text-slate-900" />
  </button>
);

// --- APPLE FLOW ---
const AppleFlow = ({ step, onNext, setStep }: any) => {
  const [toggles, setToggles] = useState({ steps: true, heartRate: true, sleep: true, spo2: true, calories: true });
  
  if (step === 1) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
         <div className="text-center mb-8">
            <div className="w-20 h-20 bg-black text-white rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl">
               <Activity size={40} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect Apple Health</h1>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Sync your health data securely.</p>
         </div>
         <div className="bg-slate-50 rounded-2xl border border-slate-100 divide-y divide-slate-100 mb-8">
            <PermissionToggle icon={Activity} label="Steps & Distance" active={toggles.steps} onClick={() => setToggles({...toggles, steps: !toggles.steps})} />
            <PermissionToggle icon={Heart} label="Heart Rate" active={toggles.heartRate} onClick={() => setToggles({...toggles, heartRate: !toggles.heartRate})} />
            <PermissionToggle icon={Moon} label="Sleep Analysis" active={toggles.sleep} onClick={() => setToggles({...toggles, sleep: !toggles.sleep})} />
         </div>
         <button onClick={onNext} className="mt-auto w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-300 active:scale-95 transition-transform flex items-center justify-center gap-2">
            Allow in Apple Health
         </button>
      </motion.div>
    );
  }

  if (step === 2) {
    // Mock iOS Modal
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
         <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-b border-slate-200">
               <span className="font-semibold text-slate-900">Health Access</span>
               <button onClick={() => setStep(1)} className="text-blue-600 font-semibold text-sm">Cancel</button>
            </div>
            <div className="p-6">
               <h3 className="font-bold text-slate-900 mb-6">"HealthVault" would like to access your health data.</h3>
               <div className="space-y-4 mb-8">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Turn On All</div>
                  {Object.keys(toggles).slice(0, 3).map((key) => (
                     <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-900 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="w-12 h-7 bg-green-500 rounded-full relative"><div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-sm" /></div>
                     </div>
                  ))}
               </div>
               <div className="flex flex-col gap-3">
                  <button onClick={onNext} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl">Allow</button>
                  <button onClick={() => setStep(1)} className="w-full text-blue-600 font-bold py-2">Don't Allow</button>
               </div>
            </div>
         </motion.div>
      </div>
    );
  }

  return <SuccessScreen platform="Apple Health" onNext={onNext} stats={{ steps: "8,432", hr: "72 bpm" }} />;
};

// --- SAMSUNG FLOW ---
const SamsungFlow = ({ step, onNext, loading }: any) => {
  const [checked, setChecked] = useState([true, true, true, true, true]);

  if (step === 1) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
         <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#12a9d8] text-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl shadow-cyan-100">
               <Heart size={40} className="fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect Samsung Health</h1>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Sync your Galaxy Watch and phone data.</p>
         </div>
         <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <Watch size={18} className="text-[#12a9d8]" /> Data to Sync
            </h3>
            <ul className="space-y-3">
               {["Step count", "Active minutes", "Heart Rate (all-day)", "Sleep data", "Stress level"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#12a9d8]" /> {item}
                  </li>
               ))}
            </ul>
         </div>
         <button onClick={onNext} className="mt-auto w-full bg-[#12a9d8] hover:bg-[#0e8eb6] text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-200 active:scale-95 transition-all">
            Grant Samsung Health Access
         </button>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
         <h2 className="text-xl font-bold text-slate-900 mb-6">Review Permissions</h2>
         <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-500 leading-relaxed">
               HealthVault will sync data in the background. You can revoke access at any time in your Samsung Account settings.
            </p>
         </div>
         <div className="space-y-4 mb-8">
            {["Steps", "Active Time", "Heart Rate", "Sleep", "Stress"].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white" onClick={() => {
                  const newChecked = [...checked]; newChecked[i] = !newChecked[i]; setChecked(newChecked);
               }}>
                  <span className="font-bold text-slate-700">{item}</span>
                  {checked[i] ? <CheckSquare className="text-[#12a9d8]" /> : <Square className="text-slate-300" />}
               </div>
            ))}
         </div>
         <button onClick={onNext} disabled={loading} className="mt-auto w-full bg-[#12a9d8] text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-200 flex items-center justify-center gap-2">
            {loading ? <RefreshCw className="animate-spin" /> : "Allow & Sync"}
         </button>
      </motion.div>
    );
  }

  return <SuccessScreen platform="Samsung Health" onNext={onNext} color="text-[#12a9d8]" stats={{ steps: "6,201", hr: "68 bpm", sleep: "7h 12m" }} />;
};

// --- GOOGLE FLOW ---
const GoogleFlow = ({ step, onNext, loading }: any) => {
  if (step === 1) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
         <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white border-2 border-slate-100 text-[#EA4335] rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-sm">
               <Heart size={40} className="fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect Google Fit</h1>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">Sync activity, sleep, and vitals from your Google account.</p>
         </div>
         
         <div className="grid grid-cols-2 gap-4 mb-8">
            {[{i:Activity, l:"Activity"}, {i:Heart, l:"Heart Rate"}, {i:Moon, l:"Sleep"}, {i:Flame, l:"Body Temp"}].map((item, i) => (
               <div key={i} className="bg-slate-50 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                  <item.i className="text-slate-400" size={24} />
                  <span className="font-bold text-slate-700 text-sm">{item.l}</span>
               </div>
            ))}
         </div>

         <button onClick={onNext} className="mt-auto w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
         </button>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-xl p-8 my-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
             <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
             <span className="font-medium text-slate-600">Sign in with Google</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Choose an account</h3>
          <p className="text-sm text-slate-500 mb-6">to continue to HealthVault</p>
          
          <div onClick={onNext} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-2">
             <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">J</div>
             <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">John Doe</p>
                <p className="text-xs text-slate-500">john.doe@gmail.com</p>
             </div>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><UserIcon /></div>
             <p className="text-sm font-medium text-slate-700">Use another account</p>
          </div>
          {loading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><RefreshCw className="animate-spin text-blue-600" /></div>}
       </motion.div>
    );
  }

  return <SuccessScreen platform="Google Fit" onNext={onNext} color="text-[#EA4335]" stats={{ steps: "5,120", mins: "45 active" }} />;
};

// --- SHARED SUCCESS SCREEN ---
const SuccessScreen = ({ platform, onNext, color = "text-green-600", stats }: any) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-12">
      <div className={`w-24 h-24 bg-green-100 ${color} rounded-full flex items-center justify-center mb-6 shadow-sm`}>
         <CheckCircle size={48} className="text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Sync Successful!</h1>
      <p className="text-slate-500 mb-8 max-w-xs">We've connected to {platform}.</p>

      <div className="bg-slate-50 rounded-2xl p-6 w-full max-w-xs mb-8 border border-slate-100">
         <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500">Status</span>
            <span className="text-sm font-bold text-green-600 flex items-center gap-1"><CheckCircle size={14} /> Connected</span>
         </div>
         <div className="space-y-2">
            {Object.entries(stats).map(([key, val]: any) => (
               <div key={key} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 capitalize">{key}</span>
                  <span className="text-sm font-bold text-slate-900">{val}</span>
               </div>
            ))}
         </div>
      </div>
      
      <button onClick={onNext} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
        Go to Dashboard
      </button>
   </motion.div>
);

const PermissionToggle = ({ icon: Icon, label, active, onClick }: any) => (
  <div className="flex items-center gap-4 p-4 hover:bg-slate-100 transition-colors cursor-pointer" onClick={onClick}>
     <div className={`p-2 rounded-lg transition-colors ${active ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-400"}`}>
        <Icon size={20} />
     </div>
     <span className={`font-bold transition-colors flex-1 ${active ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
     <div className={`w-12 h-7 rounded-full transition-colors relative ${active ? "bg-blue-600" : "bg-slate-300"}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${active ? "left-6" : "left-1"}`} />
     </div>
  </div>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
