import React, { useState } from "react";
import { useNavigate } from "react-router";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import { ArrowLeft, CheckCircle, XCircle, Shield, Smartphone, RefreshCw } from "lucide-react";

export default function PermissionsManager() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apple' | 'samsung' | 'google'>('apple');

  const tabs = [
      { id: 'apple', label: 'Apple Health', color: 'bg-black' },
      { id: 'samsung', label: 'Samsung Health', color: 'bg-[#12a9d8]' },
      { id: 'google', label: 'Google Fit', color: 'bg-white border border-slate-200 !text-slate-900' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Data Permissions</h1>
            <p className="text-slate-500 dark:text-slate-400">Control what data Aegis can access</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                    px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all
                    ${activeTab === tab.id 
                        ? 'bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900' 
                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}
                `}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
              <GlassCard>
                  <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-900 dark:text-white">Read Permissions</h3>
                      <button className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline">Select All</button>
                  </div>

                  <div className="space-y-4">
                      <PermissionToggle label="Steps & Distance" description="Daily step count and walking distance" enabled={true} />
                      <PermissionToggle label="Heart Rate" description="Resting, walking, and variable heart rate" enabled={true} />
                      <PermissionToggle label="Sleep Analysis" description="Sleep stages (REM, Deep, Light) and duration" enabled={true} />
                      <PermissionToggle label="Blood Oxygen (SpO2)" description="Peripheral oxygen saturation levels" enabled={false} />
                      <PermissionToggle label="Active Energy" description="Calories burned during workouts" enabled={true} />
                  </div>
              </GlassCard>
          </div>

          <div className="space-y-4">
              <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <Shield size={32} className="text-cyan-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Privacy First</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Your health data is encrypted end-to-end. We only read data you explicitly approve.
                  </p>
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                      <CheckCircle size={14} /> HIPAA Compliant
                  </div>
              </GlassCard>

              <GlassCard>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Sync Status</h3>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Operational
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last successful handshake: 2 mins ago</p>
                  <NeonButton variant="secondary" className="w-full !text-xs !py-2">
                      <RefreshCw size={12} /> Test Connection
                  </NeonButton>
              </GlassCard>
          </div>
      </div>
    </div>
  );
}

function PermissionToggle({ label, description, enabled }: any) {
    const [isOn, setIsOn] = useState(enabled);

    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{label}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`
                    w-12 h-6 rounded-full p-1 transition-colors relative
                    ${isOn ? 'bg-cyan-500' : 'bg-slate-200 dark:bg-slate-700'}
                `}
            >
                <div className={`
                    w-4 h-4 rounded-full bg-white shadow-sm transition-transform
                    ${isOn ? 'translate-x-6' : 'translate-x-0'}
                `} />
            </button>
        </div>
    );
}
