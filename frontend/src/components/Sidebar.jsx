import React from 'react';
import {
  LayoutDashboard,
  FileUp,
  FileSearch,
  ShieldCheck,
  AlertTriangle,
  MessageSquareCode,
  FileText,
  Shield,
  Sparkles,
  ExternalLink,
  Building2
} from 'lucide-react';

export default function Sidebar({
  activeScreen,
  setActiveScreen,
  activeTender,
  isDemoMode,
  backendInfo
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Analyze Tender', icon: FileUp, badge: 'Upload' },
    { id: 'analysis', label: 'Tender Intelligence', icon: FileSearch, badge: activeTender?.requirements?.length || 24 },
    { id: 'compliance', label: 'Compliance Check', icon: ShieldCheck, badge: 'NovaTech' },
    { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle, badge: 'Critical (1)' },
    { id: 'ask', label: 'Ask Your Tender', icon: MessageSquareCode, badge: 'AI Q&A' },
    { id: 'report', label: 'Bid Readiness Report', icon: FileText, highlight: true },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between shrink-0 border-r border-slate-800 select-none min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">BidGuard AI</span>
              </div>
              <p className="text-[11px] text-blue-400 font-medium">Procurement Intelligence</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs bg-slate-800/80 rounded-md px-2.5 py-1.5 border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-blue-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Gemini Powered</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider bg-blue-900/60 text-blue-200 px-1.5 py-0.5 rounded font-mono font-semibold">
              {backendInfo?.gemini_configured ? 'Live API' : 'Demo Mode'}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Procurement Pipeline
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        isActive
                          ? 'bg-blue-700/80 text-blue-100'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Active Tender Context */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Active Tender</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.5 rounded">
              GeM Validated
            </span>
          </div>
          <h4 className="text-xs font-semibold text-white line-clamp-2 leading-relaxed">
            {activeTender?.tender_overview?.tender_title || 'Procurement of Network Security Equipment'}
          </h4>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/60 pt-2">
            <span>Ref: {activeTender?.tender_overview?.tender_ref?.slice(0, 14) || 'GEM/2026/B/8941'}...</span>
            <span className="text-amber-300 font-mono font-medium">
              {activeTender?.tender_overview?.submission_deadline?.split(',')[0] || 'Oct 14'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="italic">“Understand. Verify. Bid.”</span>
          <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
