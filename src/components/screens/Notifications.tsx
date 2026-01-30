import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, AlertTriangle, Clock, FileText } from "lucide-react";
import { GlassCard } from "../ui/FuturisticElements";

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Smith is confirmed for tomorrow at 10:00 AM.",
      time: "2 hours ago",
      type: "success",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      title: "Medication Reminder",
      message: "It's time to take your Vitamin D supplement.",
      time: "5 hours ago",
      type: "info",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "New Test Results",
      message: "Your Comprehensive Blood Panel results are now available.",
      time: "1 day ago",
      type: "alert",
      icon: FileText,
      color: "text-cyan-500"
    },
    {
      id: 4,
      title: "Subscription Renewal",
      message: "Your Aegis Pro subscription will renew in 3 days.",
      time: "2 days ago",
      type: "warning",
      icon: AlertTriangle,
      color: "text-amber-500"
    }
  ];

  const getIconBg = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-500/10 dark:bg-green-500/20';
      case 'info': return 'bg-blue-500/10 dark:bg-blue-500/20';
      case 'alert': return 'bg-cyan-500/10 dark:bg-cyan-500/20';
      case 'warning': return 'bg-amber-500/10 dark:bg-amber-500/20';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400">Stay updated with your health alerts</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <GlassCard key={notification.id} className="flex gap-4 !p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
              <notification.icon size={24} className={notification.color} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{notification.title}</h3>
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{notification.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {notification.message}
              </p>
            </div>
            {notification.type === 'alert' && (
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2"></div>
            )}
          </GlassCard>
        ))}
      </div>

      <div className="text-center pt-8">
        <button className="text-sm text-slate-400 hover:text-cyan-500 transition-colors font-medium">
          Mark all as read
        </button>
      </div>
    </div>
  );
}
