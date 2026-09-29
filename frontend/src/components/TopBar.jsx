import React from 'react';
import {
  Building2,
  Sparkles,
  RefreshCw,
  PlusCircle,
  FileCheck2,
  ChevronRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export default function TopBar({
  activeScreen,
  setActiveScreen,
  bidderProfile,
  onOpenProfileModal,
  onResetDemo,
  backendInfo,
  activeTender
}) {
  const screenTitles = {
    dashboard: 'Bid Intelligence Dashboard',
    upload: 'Analyze Tender Document',
    analysis: 'Tender Intelligence & Requirements Extraction',
    compliance: 'Bidder Compliance Check',
    risks: 'Bid Risk & Clause Analysis',
    ask: 'Ask Your Tender — Grounded Q&A',
    report: 'Bid Readiness Report & Decision Pack'
  };

  const steps = [
    { id: 'upload', label: '1. Upload' },
    { id: 'analysis', label: '2. Understand' },
    { id: 'compliance', label: '3. Verify' },
    { id: 'risks', label: '4. Risks' },
    { id: 'report', label: '5. Bid Readiness' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-30 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Screen Title & Pipeline Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
            <span className="font-semibold text-blue-900">BidGuard AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-600 capitalize">{activeScreen}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {screenTitles[activeScreen] || 'BidGuard AI'}
          </h1>
        </div>

        {/* Center / Progress Pipeline */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 text-xs">
          {steps.map((step, idx) => {
            const isCurrent = activeScreen === step.id;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveScreen(step.id)}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {step.label}
                </button>
                {idx < steps.length - 1 && (
                  <span className="text-slate-300 text-[10px]">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Company Profile & Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Demo reset button */}
          <button
            onClick={onResetDemo}
            title="Reset to official GeM demo tender data"
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Use Demo Tender</span>
          </button>

          {/* Bidder Profile Pill */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center gap-2 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-blue-900 px-3 py-1.5 rounded-lg text-xs transition-colors"
            title="Click to view or edit bidder credentials"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <div className="text-left">
              <span className="font-semibold block leading-tight">
                {bidderProfile?.company_name || 'NovaTech Solutions'}
              </span>
              <span className="text-[10px] text-blue-600 block">
                Turnover: {bidderProfile?.annual_turnover || '₹8 Cr'} • {bidderProfile?.experience_years || 5}y Exp
              </span>
            </div>
          </button>

          {/* New Tender CTA */}
          <button
            onClick={() => setActiveScreen('upload')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all shadow-blue-500/10"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Analyze Tender</span>
          </button>
        </div>
      </div>
    </header>
  );
}
