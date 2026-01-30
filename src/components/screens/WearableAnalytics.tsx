import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMetricsHistory } from "../../lib/wearables";
import { 
  ChevronLeft, Activity, Heart, Moon, Zap, Calendar, ArrowUpRight 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar 
} from "recharts";
import { GlassCard, NeonButton } from "../ui/FuturisticElements";

export default function WearableAnalytics() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getMetricsHistory();
    setMetrics(data);
    setLoading(false);
  }

  // Format data for chart (reverse so oldest is left)
  const chartData = [...metrics].reverse().map(m => ({
    ...m,
    date: new Date(m.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    steps: Math.round(m.steps),
    heart_rate_avg: Math.round(m.heart_rate_avg),
    sleep_duration: Math.round(m.sleep_duration)
  }));

  const latest = metrics[0] || {};

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400">Deep dive into your biometrics</p>
         </div>
         <NeonButton onClick={() => navigate(-1)} variant="outline" className="!px-4">
            <ChevronLeft size={18} /> Back
         </NeonButton>
      </div>

      {loading ? (
          <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
      ) : metrics.length === 0 ? (
          <GlassCard className="text-center py-20 border-dashed">
              <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Activity size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Data Available</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">Connect a device and sync your data to see analytics.</p>
              <NeonButton onClick={() => navigate(-1)}>
                  Go to Device Setup
              </NeonButton>
          </GlassCard>
      ) : (
          <>
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MetricCard 
                      title="Steps" 
                      value={latest.steps ? Math.round(latest.steps).toLocaleString() : 0} 
                      unit="steps"
                      icon={Activity}
                      color="text-cyan-600 dark:text-cyan-400"
                      bg="bg-cyan-50 dark:bg-cyan-900/30"
                  />
                  <MetricCard 
                      title="Avg Heart Rate" 
                      value={latest.heart_rate_avg ? Math.round(latest.heart_rate_avg) : 0} 
                      unit="bpm"
                      icon={Heart}
                      color="text-rose-600 dark:text-rose-400"
                      bg="bg-rose-50 dark:bg-rose-900/30"
                  />
                  <MetricCard 
                      title="Sleep" 
                      value={latest.sleep_duration ? Math.round(latest.sleep_duration) : 0} 
                      unit="hours"
                      icon={Moon}
                      color="text-indigo-600 dark:text-indigo-400"
                      bg="bg-indigo-50 dark:bg-indigo-900/30"
                  />
                  <MetricCard 
                      title="SpO2" 
                      value={latest.spo2 ? Math.round(latest.spo2) : 0} 
                      unit="%"
                      icon={Zap}
                      color="text-teal-600 dark:text-teal-400"
                      bg="bg-teal-50 dark:bg-teal-900/30"
                  />
              </div>

              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Steps Trend */}
                 <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Activity Trend</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Steps over time</p>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-bold bg-cyan-50 dark:bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-100 dark:border-cyan-800">
                            <ArrowUpRight size={16} /> +12%
                        </div>
                    </div>
                    
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={10} minHeight={10}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.3} />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 12, fill: '#94a3b8'}}
                                    tickMargin={10}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(30, 41, 59, 0.9)', color: '#fff' }}
                                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    formatter={(value: any) => [Math.round(value), "Steps"]}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="steps" 
                                    stroke="#0891b2" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorSteps)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                 </GlassCard>

                 {/* Heart Rate & Sleep Combined */}
                 <GlassCard>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Recovery</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sleep & Resting HR</p>
                        </div>
                    </div>
                    
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={10} minHeight={10}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.3} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} tickMargin={10} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(30, 41, 59, 0.9)', color: '#fff' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                    formatter={(value: any, name: any) => [Math.round(value), name]}
                                />
                                <Bar dataKey="sleep_duration" name="Sleep (hrs)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="heart_rate_avg" name="Avg HR" fill="#fb7185" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </GlassCard>
              </div>

              {/* Recent History Table */}
              <GlassCard className="!p-0 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/30">
                      <Calendar size={18} className="text-slate-400" />
                      <h3 className="font-bold text-slate-900 dark:text-white">Recent Sync History</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {metrics.slice(0, 5).map((m: any) => (
                          <div key={m.id} className="px-6 py-4 flex items-center justify-between hover:bg-cyan-50/10 transition-colors group">
                              <div className="flex items-center gap-3">
                                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                  <div>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                                         {m.source} Sync
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(m.timestamp).toLocaleString()}</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{Math.round(m.steps).toLocaleString()} steps</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">{Math.round(m.calories)} kcal</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </GlassCard>
          </>
      )}
    </div>
  );
}

function MetricCard({ title, value, unit, icon: Icon, color, bg }: any) {
  return (
    <GlassCard hoverEffect className="flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{title}</span>
         <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
            <Icon size={18} />
         </div>
      </div>
      <div>
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h2>
         <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{unit}</span>
      </div>
    </GlassCard>
  );
}
