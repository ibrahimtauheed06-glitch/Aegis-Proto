import React, { useState } from "react";
import { 
  Bell, Lock, Eye, Moon, Globe, LogOut, ChevronRight, Smartphone, Sun 
} from "lucide-react";
import { useNavigate } from "react-router";
import { GlassCard } from "../ui/FuturisticElements";
import { useTheme } from "../ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Preferences and application controls</p>
      </div>

      <div className="space-y-6">
          {/* Account */}
          <section>
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Account</h3>
              <GlassCard noPadding className="divide-y divide-slate-100 dark:divide-slate-800">
                  <SettingsRow 
                      icon={Bell} 
                      title="Notifications" 
                      initialValue={true}
                      toggle
                  />
                  <SettingsRow 
                      icon={Lock} 
                      title="Privacy & Security" 
                      onClick={() => navigate('/permissions')}
                  />
                  <SettingsRow 
                      icon={Eye} 
                      title="Data Sharing" 
                      value="3 Apps" 
                      onClick={() => navigate('/devices')}
                  />
              </GlassCard>
          </section>

          {/* Preferences */}
          <section>
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Preferences</h3>
              <GlassCard noPadding className="divide-y divide-slate-100 dark:divide-slate-800">
                  <SettingsRow 
                      icon={theme === 'dark' ? Sun : Moon} 
                      title="Dark Mode" 
                      initialValue={theme === 'dark'}
                      onToggle={toggleTheme}
                      toggle
                  />
                  <SettingsRow icon={Globe} title="Language" value="English" />
                  <SettingsRow icon={Smartphone} title="Device Units" value="Metric" />
              </GlassCard>
          </section>

          {/* Actions */}
          <section>
              <GlassCard noPadding className="divide-y divide-slate-100 dark:divide-slate-800">
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-red-600 font-bold"
                  >
                      <LogOut size={20} />
                      Log Out
                  </button>
              </GlassCard>
          </section>
          
          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
              Aegis v2.0.4 (Build 2024.10.24)
          </p>
      </div>
    </div>
  );
}

function SettingsRow({ icon: Icon, title, value, toggle, initialValue = false, onToggle, onClick }: any) {
    const [isEnabled, setIsEnabled] = useState(initialValue);

    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        if (onToggle) onToggle(newState);
    };

    const Wrapper = onClick ? 'button' : 'div';
    const wrapperProps = onClick ? { onClick, className: "w-full text-left" } : {};

    return (
        <Wrapper {...wrapperProps} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:shadow-sm transition-all">
                    <Icon size={18} />
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{title}</span>
            </div>

            <div className="flex items-center gap-3">
                {value && <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{value}</span>}
                
                {toggle ? (
                     <div 
                        onClick={(e) => { e.stopPropagation(); handleToggle(); }}
                        className={`w-11 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${isEnabled ? 'bg-cyan-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                ) : (
                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
                )}
            </div>
        </Wrapper>
    );
}
