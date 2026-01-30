import React, { useState } from "react";
import { 
  Link,
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigate
} from "react-router";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SmartDevices from "./components/screens/SmartDevices";
import WearableAnalytics from "./components/screens/WearableAnalytics";
import SyncTroubleshoot from "./components/screens/SyncTroubleshoot";
import PermissionsManager from "./components/screens/PermissionsManager";
import MedicalFiles from "./components/screens/MedicalFiles";
import EmergencyID from "./components/screens/EmergencyID";
import Profile from "./components/screens/Profile";
import Settings from "./components/screens/Settings";
import UploadReport from "./components/screens/UploadReport";
import FilePicker from "./components/screens/FilePicker";
import UploadSuccess from "./components/screens/UploadSuccess";
import AISummary from "./components/screens/AISummary";
import Notifications from "./components/screens/Notifications";
import QRPreview from "./components/screens/QRPreview";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { PageBackground } from "./components/ui/FuturisticElements";
import { ThemeProvider } from "./components/ThemeContext";
import { ToastProvider } from "./components/ui/ToastContext";
import { Bell, Search, Menu } from "lucide-react";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen relative">
      {/* Desktop Sidebar (Sticky behavior managed by Sidebar component styles) */}
      <div className="hidden md:block flex-shrink-0">
         <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* 
            Wrapper specifically to override the 'hidden md:flex' in Sidebar 
            and ensure it displays in the mobile overlay context 
          */}
          <div className="relative z-50 h-full">
             <Sidebar mobileOverride={true} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between md:justify-end bg-transparent pointer-events-none">
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 dark:border-white/10"
            >
              <Menu size={24} className="text-slate-700 dark:text-slate-200" />
            </button>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-white/40 dark:border-white/10 shadow-sm w-64 focus-within:ring-2 focus-within:ring-cyan-400/50 transition-all group">
              <Search size={16} className="text-slate-400 group-focus-within:text-cyan-500" />
              <input
                type="text"
                placeholder="Search records..."
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-white/40 dark:border-white/10 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:text-cyan-600 transition-all group active:scale-95"
            >
              <Bell
                size={20}
                className="text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
              />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Routes Content - Scroll handled by Window/Body */}
        <div className="px-4 pb-12 md:px-8 md:pb-8 pt-0">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/devices" element={<SmartDevices />} />
            <Route path="/analytics" element={<WearableAnalytics />} />
            <Route path="/records" element={<MedicalFiles />} />
            <Route path="/emergency" element={<EmergencyID />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Upload Flow */}
            <Route path="/upload" element={<UploadReport />} />
            <Route path="/file-picker" element={<FilePicker />} />
            <Route path="/upload-success" element={<UploadSuccess />} />
            <Route path="/preview" element={<AISummary />} />
            
            {/* New Routes */}
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/qr-preview" element={<QRPreview />} />

            {/* Sub-routes */}
            <Route path="/troubleshoot" element={<SyncTroubleshoot />} />
            <Route path="/permissions" element={<PermissionsManager />} />
            
            {/* Fallback for other routes */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <PageBackground>
            <AppContent />
          </PageBackground>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
