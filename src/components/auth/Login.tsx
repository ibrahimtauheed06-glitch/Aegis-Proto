import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Activity, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";
import aegisLogo from "figma:asset/a846679f83e3e1d9be2c1025dccef005694afc5d.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      <GlassCard className="w-full max-w-md !p-8 relative z-10" hoverEffect={false}>
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img 
            src={aegisLogo} 
            alt="Aegis Logo" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Access your Aegis dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
              <input 
                type="email" 
                required
                placeholder="doctor@aegis.app"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Password</label>
              <a href="#" className="text-xs font-bold text-cyan-600 hover:text-cyan-500">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <NeonButton 
              className="w-full !py-3.5 !text-base"
              variant="primary"
            >
              {loading ? "Authenticating..." : "Sign In to Vault"}
              {!loading && <ArrowRight size={18} />}
            </NeonButton>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}