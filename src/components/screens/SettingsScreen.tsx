import React, { useState } from "react";
import { ScreenName } from "../../App";
import { User, ChevronRight, Shield, LogOut, Globe, FileQuestion, Bell, Camera, Save, Droplet, Calendar, Ruler } from "lucide-react";
import { currentUser } from "../../lib/data";
import { motion, AnimatePresence } from "motion/react";

interface SettingsScreenProps {
  navigate: (screen: ScreenName) => void;
  onLogout: () => void;
}

export default function SettingsScreen({ navigate, onLogout }: SettingsScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: "alex.morgan@example.com",
    dob: "1991-05-12",
    bloodGroup: currentUser.bloodGroup,
    weight: "72",
    height: "178"
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
       setLoading(false);
       setIsEditing(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto md:px-8">
      
      <header className="bg-white md:bg-transparent px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 md:static md:shadow-none md:pt-8 md:px-0 md:pb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
        {!isEditing && (
           <button 
             onClick={() => setIsEditing(true)}
             className="text-blue-600 font-semibold text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
           >
             Edit Profile
           </button>
        )}
      </header>

      <div className="px-6 md:px-0 space-y-6">
         
         {/* Profile Card */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
               <div className="relative group cursor-pointer">
                  <img src={currentUser.avatar} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={24} />
                  </div>
               </div>
               
               <div className="flex-1 w-full text-center md:text-left">
                  {isEditing ? (
                     <div className="grid md:grid-cols-2 gap-4">
                        <div>
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name</label>
                           <input 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                           />
                        </div>
                        <div>
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</label>
                           <input 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                           />
                        </div>
                     </div>
                  ) : (
                     <>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">{formData.name}</h2>
                        <p className="text-slate-500">{formData.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                             Premium Member
                           </span>
                        </div>
                     </>
                  )}
               </div>
            </div>

            {/* Physical Stats Form */}
            <div className="mt-8 pt-8 border-t border-slate-100">
               <h3 className="text-sm font-bold text-slate-900 mb-4">Physical Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className={`p-4 rounded-xl border transition-colors ${isEditing ? "bg-white border-slate-200" : "bg-slate-50 border-transparent"}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-slate-400" />
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth</label>
                     </div>
                     {isEditing ? (
                        <input 
                           type="date"
                           name="dob"
                           value={formData.dob}
                           onChange={handleChange}
                           className="w-full bg-slate-50 rounded-lg px-2 py-1 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                     ) : (
                        <p className="font-bold text-slate-900 text-lg">12 May 1991</p>
                     )}
                  </div>
                  
                  <div className={`p-4 rounded-xl border transition-colors ${isEditing ? "bg-white border-slate-200" : "bg-slate-50 border-transparent"}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <Droplet size={16} className="text-red-500" />
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</label>
                     </div>
                     {isEditing ? (
                        <select 
                           name="bloodGroup"
                           value={formData.bloodGroup}
                           onChange={handleChange}
                           className="w-full bg-slate-50 rounded-lg px-2 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                        >
                           <option>A+</option>
                           <option>A-</option>
                           <option>B+</option>
                           <option>B-</option>
                           <option>O+</option>
                           <option>O-</option>
                           <option>AB+</option>
                           <option>AB-</option>
                        </select>
                     ) : (
                        <p className="font-bold text-slate-900 text-lg">{formData.bloodGroup}</p>
                     )}
                  </div>

                  <div className={`p-4 rounded-xl border transition-colors ${isEditing ? "bg-white border-slate-200" : "bg-slate-50 border-transparent"}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <Ruler size={16} className="text-blue-500" />
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weight (kg)</label>
                     </div>
                     {isEditing ? (
                        <input 
                           type="number"
                           name="weight"
                           value={formData.weight}
                           onChange={handleChange}
                           className="w-full bg-slate-50 rounded-lg px-2 py-1 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                     ) : (
                        <p className="font-bold text-slate-900 text-lg">{formData.weight} kg</p>
                     )}
                  </div>
               </div>
            </div>

            {isEditing && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100"
               >
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center gap-2"
                  >
                     {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                        <>
                           <Save size={18} /> Save Changes
                        </>
                     )}
                  </button>
               </motion.div>
            )}
         </div>

         {/* Other Settings Sections */}
         <div className="grid md:grid-cols-2 gap-6">
            <Section title="Account">
               <SettingsItem icon={User} label="Family Profiles" onClick={() => navigate("Family")} />
               <SettingsItem icon={Bell} label="Notifications" onClick={() => {}} />
               <SettingsItem icon={Globe} label="Language" value="English" onClick={() => {}} />
            </Section>

            <Section title="Security">
               <SettingsItem icon={Shield} label="Privacy & Security" onClick={() => {}} />
               <SettingsItem icon={FileQuestion} label="Data Export" onClick={() => {}} />
            </Section>
         </div>

         <Section title="About">
            <SettingsItem icon={FileQuestion} label="Help & Support" onClick={() => {}} />
            <div className="px-4 py-3 flex justify-between items-center text-sm">
               <span className="text-slate-500">Version</span>
               <span className="text-slate-400">2.4.0 (Build 892)</span>
            </div>
         </Section>

         <button 
           onClick={onLogout}
           className="w-full bg-white text-red-500 font-semibold py-4 rounded-xl border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm"
         >
           <LogOut size={18} /> Log Out
         </button>
      </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
     <h3 className="px-6 pt-5 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
     <div className="divide-y divide-slate-50">
        {children}
     </div>
  </div>
);

const SettingsItem = ({ icon: Icon, label, value, onClick }: any) => (
  <button onClick={onClick} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left group">
     <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
        <Icon size={20} />
     </div>
     <span className="flex-1 font-medium text-slate-700">{label}</span>
     {value && <span className="text-sm text-slate-400 mr-2">{value}</span>}
     <ChevronRight size={16} className="text-slate-300" />
  </button>
);
