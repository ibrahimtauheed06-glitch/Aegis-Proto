import React, { useState } from "react";
import { ScreenName } from "../../App";
import { ChevronLeft, Calendar as CalendarIcon, Clock, Check, Plus, Sun, Moon, Coffee } from "lucide-react";
import { motion } from "motion/react";
import { medications } from "../../lib/data";

interface MedicationCalendarProps {
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
}

export default function MedicationCalendar({ navigate, goBack }: MedicationCalendarProps) {
  const [selectedDay, setSelectedDay] = useState(3);
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [26, 27, 28, 29, 30, 31, 1];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <header className="bg-white px-6 pt-12 pb-6 rounded-b-3xl shadow-sm z-10 sticky top-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
               <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Medications</h1>
          </div>
          <button 
             onClick={() => navigate("Prescription")}
             className="bg-blue-600 text-white p-2 rounded-lg shadow-md shadow-blue-200"
          >
             <Plus size={20} />
          </button>
        </div>

        {/* Calendar Strip */}
        <div className="flex justify-between items-center">
           {weekDays.map((day, i) => {
              const isActive = i === selectedDay;
              return (
                <button 
                   key={i}
                   onClick={() => setSelectedDay(i)}
                   className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                     isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" : "text-slate-400 hover:bg-slate-100"
                   }`}
                >
                   <span className="text-[10px] font-bold opacity-80">{day}</span>
                   <span className={`text-sm font-bold ${isActive ? "text-white" : "text-slate-700"}`}>{dates[i]}</span>
                   {i === selectedDay && <div className="w-1 h-1 rounded-full bg-white mt-1" />}
                </button>
              )
           })}
        </div>
      </header>

      <div className="p-6 space-y-8">
         
         {/* Morning */}
         <TimeSection title="Morning" icon={Coffee} time="8:00 AM">
            {medications.filter(m => m.timing === "Morning").map(m => (
               <MedicationCard key={m.id} med={m} />
            ))}
         </TimeSection>

         {/* Afternoon */}
         <TimeSection title="Afternoon" icon={Sun} time="1:00 PM">
            <div className="text-sm text-slate-400 italic px-2">No medications scheduled</div>
         </TimeSection>

         {/* Night */}
         <TimeSection title="Night" icon={Moon} time="9:00 PM">
            <MedicationCard med={{ name: "Melatonin", dosage: "5mg", taken: false, type: "Pill" }} />
         </TimeSection>

      </div>
    </div>
  );
}

const TimeSection = ({ title, icon: Icon, time, children }: any) => (
  <div>
     <div className="flex items-center gap-3 mb-4">
        <div className="bg-white p-2 rounded-lg shadow-sm text-slate-600">
           <Icon size={18} />
        </div>
        <div>
           <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
           <p className="text-xs text-slate-400">{time}</p>
        </div>
     </div>
     <div className="space-y-3 pl-2 border-l-2 border-slate-100 ml-4">
        {children}
     </div>
  </div>
);

const MedicationCard = ({ med }: any) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 ml-4 flex items-center justify-between group active:scale-[0.99] transition-transform">
     <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${med.taken ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-600"}`}>
           <CalendarIcon size={18} />
        </div>
        <div>
           <p className={`font-bold ${med.taken ? "text-slate-400 line-through" : "text-slate-900"}`}>{med.name}</p>
           <p className="text-xs text-slate-500">{med.dosage} • {med.type}</p>
        </div>
     </div>
     
     <button className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
        med.taken 
          ? "bg-green-500 border-green-500 text-white" 
          : "border-slate-200 text-transparent hover:border-blue-500 hover:text-blue-500"
     }`}>
        <Check size={16} strokeWidth={4} />
     </button>
  </div>
);
