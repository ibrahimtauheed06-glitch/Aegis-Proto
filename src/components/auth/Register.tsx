import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Activity, User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import aegisLogo from "figma:asset/a846679f83e3e1d9be2c1025dccef005694afc5d.png";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      <GlassCard className="w-full max-w-md !p-8 relative z-10" hoverEffect={false}>
        <div className="text-center mb-8">
          <img 
            src={aegisLogo} 
            alt="Aegis Logo" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Join the secure health network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
              <input 
                type="text" 
                required
                placeholder="Dr. Aditi"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
              <input 
                type="email" 
                required
                placeholder="aditi@example.com"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
              <input 
                type="password" 
                required
                placeholder="Create a strong password"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800 mt-2">
            <ShieldCheck size={20} className="text-cyan-600 dark:text-cyan-400" />
            <p className="text-xs text-cyan-800 dark:text-cyan-200 leading-tight">Your data is encrypted and HIPAA compliant.</p>
          </div>

          <div className="pt-2">
            <NeonButton 
              className="w-full !py-3.5 !text-base"
              variant="primary"
            >
              {loading ? "Creating Profile..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </NeonButton>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/" className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}