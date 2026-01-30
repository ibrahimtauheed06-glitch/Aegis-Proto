import React, { useState } from "react";
import { ScreenName } from "../../App";
import { ChevronLeft, Plus, Users, UserPlus } from "lucide-react";
import { currentUser } from "../../lib/data";

interface FamilyProfilesProps {
  goBack: () => void;
}

const familyMembers = [
  { id: 1, name: "Alex Morgan", relation: "Me", age: 34, avatar: currentUser.avatar, active: true },
  { id: 2, name: "Sarah Morgan", relation: "Wife", age: 31, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100", active: false },
  { id: 3, name: "Leo Morgan", relation: "Son", age: 4, avatar: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=100&h=100", active: false },
];

export default function FamilyProfiles({ goBack }: FamilyProfilesProps) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <header className="bg-white px-6 pt-12 pb-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
           <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Family Profiles</h1>
      </header>

      <div className="p-6 grid grid-cols-2 gap-4">
         {familyMembers.map((member) => (
            <div 
              key={member.id}
              className={`bg-white p-6 rounded-2xl shadow-sm border-2 flex flex-col items-center justify-center text-center gap-3 relative cursor-pointer hover:shadow-md transition-all ${
                 member.active ? "border-blue-500" : "border-transparent"
              }`}
            >
               <div className="relative">
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                  {member.active && (
                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                        <Users size={12} />
                     </div>
                  )}
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                  <p className="text-xs text-slate-500">{member.relation}</p>
               </div>
            </div>
         ))}

         {/* Add New Profile */}
         <button className="bg-slate-100 border-2 border-dashed border-slate-300 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-500 hover:bg-slate-200 hover:border-slate-400 transition-all">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
               <Plus size={32} />
            </div>
            <span className="font-semibold text-sm">Add Member</span>
         </button>
      </div>
    </div>
  );
}
