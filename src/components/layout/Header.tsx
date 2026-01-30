import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { currentUser } from "../../lib/data";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between sticky top-0 z-20 hidden md:flex">
      {/* Search (Optional global search) */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for patients, reports, or settings..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
            <p className="text-xs text-slate-500">Premium Member</p>
          </div>
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
