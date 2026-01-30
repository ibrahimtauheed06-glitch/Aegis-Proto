import React from "react";

export const GlassCard = ({ children, className = "", hoverEffect = false, noPadding = false, onClick, style }: any) => {
  // Determine if overflow should be visible based on className input or default to hidden
  const hasOverflowVisible = className.includes("overflow-visible");
  const overflowClass = hasOverflowVisible ? "" : "overflow-hidden";

  return (
    <div 
      onClick={onClick}
      style={style}
      className={`
        relative
        ${overflowClass}
        bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl 
        border border-white/60 dark:border-white/10
        shadow-[0_8px_30px_rgba(0,123,255,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        rounded-3xl
        text-slate-900 dark:text-white
        transition-all duration-300
        ${hoverEffect || onClick ? "hover:shadow-[0_8px_30px_rgba(0,212,255,0.2)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 hover:border-cyan-200 dark:hover:border-cyan-500/30 hover:z-20" : ""}
        ${onClick ? "cursor-pointer active:scale-[0.98]" : ""}
        ${noPadding ? "" : "p-6"}
        ${className}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-white/60 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none ${hasOverflowVisible ? 'rounded-3xl' : ''}`} />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export const NeonButton = ({ children, onClick, variant = "primary", className = "", icon: Icon, disabled = false }: any) => {
  const baseStyle = `
    relative group px-6 py-3 rounded-2xl font-bold transition-all duration-300 
    flex items-center justify-center gap-2 overflow-hidden text-sm tracking-wide
    active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] border border-transparent hover:scale-[1.02]",
    secondary: "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-700/80 border border-white/80 dark:border-white/10 shadow-sm hover:shadow-md backdrop-blur-md hover:text-cyan-600 dark:hover:text-cyan-400",
    accent: "bg-cyan-500 text-white shadow-[0_4px_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:brightness-110",
    outline: "border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 bg-transparent"
  };

  return (
    <button 
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick(e);
        }
      }} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {Icon && <Icon size={18} className="group-hover:scale-110 transition-transform" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const PageBackground = ({ children }: any) => (
  <div className="min-h-screen bg-[#F0F4F8] dark:bg-[#020617] text-slate-900 dark:text-white selection:bg-cyan-200 selection:text-cyan-900 font-sans transition-colors duration-500">
    {/* Ambient Background Glows */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
       {/* Light Mode Blobs */}
       <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-200/20 rounded-full blur-[120px] mix-blend-multiply dark:hidden" />
       <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-200/20 rounded-full blur-[120px] mix-blend-multiply dark:hidden" />
       <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-white/40 rounded-full blur-[80px] dark:hidden" />

       {/* Dark Mode Blobs */}
       <div className="hidden dark:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
       <div className="hidden dark:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px]" />
       <div className="hidden dark:block absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px]" />
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);
