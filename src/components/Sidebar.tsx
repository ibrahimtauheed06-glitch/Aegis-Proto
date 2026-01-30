import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, Activity, FileText, Smartphone, User, 
  Settings, LogOut, ShieldAlert
} from "lucide-react";
import { GlassCard } from "./ui/FuturisticElements";
import aegisLogo from "figma:asset/a846679f83e3e1d9be2c1025dccef005694afc5d.png";

interface SidebarProps {
  mobileOverride?: boolean;
}

export default function Sidebar({ mobileOverride = false }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Strict matching for Dashboard root to avoid highlighting everything
  const isActive = (path: string) => {
    if (path === '/dashboard') {
        return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ to, icon: Icon, label }: any) => (
    <Link to={to} className="block mb-2">
      <div 
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group cursor-pointer
          ${isActive(to) 
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_4px_20px_rgba(0,123,255,0.3)] dark:shadow-[0_4px_20px_rgba(0,123,255,0.5)] scale-[1.02]" 
            : "text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-sm active:scale-95"}
        `}
      >
        <Icon size={20} className={`transition-transform duration-300 ${isActive(to) ? "text-white" : "group-hover:scale-110"}`} />
        <span className={`font-semibold tracking-wide ${!isOpen ? "md:hidden" : ""}`}>{label}</span>
      </div>
    </Link>
  );

  return (
    <div className={`${mobileOverride ? 'flex' : 'hidden md:flex'} flex-col w-72 h-screen sticky top-0 p-4 z-50`}>
      <GlassCard className="h-full flex flex-col relative !p-4 !bg-white/90 dark:!bg-slate-900/90">
        {/* Logo Area */}
        <Link to="/dashboard" className="flex items-center gap-3 px-2 mb-8 pt-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
          <img 
            src={aegisLogo} 
            alt="Aegis Logo" 
            className="w-10 h-10 rounded-full object-cover shadow-md"
          />
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Aegis
            </h1>
            <div className="flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">v2.0 Connected</span>
            </div>
          </div>
        </Link>

        {/* Navigation - Scrollable Area */}
        <nav className="flex-1 space-y-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar">
          <div className="px-4 mb-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">Command</div>
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/devices" icon={Smartphone} label="Smart Sync" />
          <NavItem to="/analytics" icon={Activity} label="Analytics" />
          
          <div className="px-4 mb-2 mt-6 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">Records</div>
          <NavItem to="/records" icon={FileText} label="Medical Files" />
          <NavItem to="/emergency" icon={ShieldAlert} label="Emergency ID" />
          
          <div className="px-4 mb-2 mt-6 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">System</div>
          <NavItem to="/profile" icon={User} label="Profile" />
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        {/* User Capsule - Fixed at bottom */}
        <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group active:scale-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center ring-2 ring-white dark:ring-slate-700 shadow-md group-hover:ring-cyan-400 transition-all">
               <User size={20} className="text-white dark:text-slate-400 fill-current" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Dr. Aditi</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pro Member</p>
            </div>
            <LogOut size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" />
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
