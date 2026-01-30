import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [view, setView] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const toggleView = () => {
    setView(view === "login" ? "register" : "login");
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        layout
        className="bg-white w-full max-w-md rounded-3xl shadow-xl shadow-slate-200 overflow-hidden"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current stroke-2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {view === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-sm">
              {view === "login" ? "Enter your details to access your vault." : "Join HealthVault to secure your medical data."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {view === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {view === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 mt-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {view === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                 <>
                   {view === "login" ? "Login" : "Create Account"}
                   <ArrowRight size={20} />
                 </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-slate-500 text-sm">
            {view === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={toggleView}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors ml-1"
            >
              {view === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
