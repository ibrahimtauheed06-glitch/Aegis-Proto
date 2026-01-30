import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border animate-in slide-in-from-right-full duration-300
              ${toast.type === 'success' 
                ? 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white border-green-500/50' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white border-blue-500/50'}
            `}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <AlertCircle size={18} className="text-blue-500" />
            )}
            <span className="text-sm font-bold">{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
            >
              <X size={14} className="opacity-50" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
