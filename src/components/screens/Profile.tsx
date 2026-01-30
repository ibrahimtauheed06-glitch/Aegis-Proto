import React, { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Edit3, Camera, Save 
} from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Banner & Avatar */}
      <div className="relative">
         <div className="h-48 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 w-full relative overflow-hidden shadow-lg shadow-blue-500/10">
             <div className="absolute inset-0 bg-white/10 pattern-grid mix-blend-overlay" />
         </div>
         <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <div className="relative group">
                <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200" 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-xl object-cover"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={16} />
                </button>
            </div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Aditi</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Pro Member • ID: #882192</p>
            </div>
         </div>
         <div className="absolute bottom-4 right-8">
            <NeonButton 
                variant={isEditing ? "primary" : "secondary"} 
                onClick={() => setIsEditing(!isEditing)}
                icon={isEditing ? Save : Edit3}
            >
                {isEditing ? "Save Changes" : "Edit Profile"}
            </NeonButton>
         </div>
      </div>

      <div className="h-10" /> {/* Spacer for overlapped avatar */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Personal Details */}
          <div className="space-y-6">
              <GlassCard>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact Info</h3>
                  <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Mail size={18} className="text-slate-400" />
                          <span className="text-sm">aditi@example.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Phone size={18} className="text-slate-400" />
                          <span className="text-sm">+91 9519458204</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <MapPin size={18} className="text-slate-400" />
                          <span className="text-sm">San Francisco, CA</span>
                      </div>
                  </div>
              </GlassCard>

              <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h3 className="font-bold">Pro Plan</h3>
                          <p className="text-xs text-slate-400">Renews Oct 2024</p>
                      </div>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-500/30">Active</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full mb-2">
                      <div className="bg-cyan-400 h-full rounded-full w-[75%]" />
                  </div>
                  <p className="text-xs text-slate-400">75% storage used</p>
              </GlassCard>
          </div>

          {/* Right Column - Medical Parameters */}
          <div className="md:col-span-2">
              <GlassCard>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-6">Medical Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Full Name" value="Aditi" isEditing={isEditing} />
                      <InputField label="Date of Birth" value="May 15, 1992" isEditing={isEditing} />
                      <InputField label="Blood Type" value="O+" isEditing={isEditing} />
                      <InputField label="Height" value="170 cm" isEditing={isEditing} />
                      <InputField label="Weight" value="68 kg" isEditing={isEditing} />
                      <InputField label="Known Allergies" value="Penicillin, Peanuts" isEditing={isEditing} />
                  </div>
              </GlassCard>
          </div>
      </div>
    </div>
  );
}

function InputField({ label, value, isEditing }: any) {
    return (
        <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                {label}
            </label>
            {isEditing ? (
                <input 
                    type="text" 
                    defaultValue={value}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-900 dark:text-white font-medium"
                />
            ) : (
                <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-transparent rounded-xl text-slate-900 dark:text-white font-bold">
                    {value}
                </div>
            )}
        </div>
    );
}
