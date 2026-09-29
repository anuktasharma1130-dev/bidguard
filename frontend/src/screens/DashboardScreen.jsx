import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Upload,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle
} from 'lucide-react';

export default function DashboardScreen({
  activeTender,
  recentTenders,
  setActiveScreen,
  bidderProfile,
  onResetDemo
}) {
  const requirementsCount = activeTender?.requirements?.length || 24;
  const complianceResults = activeTender?.compliance_results || [];
  const needsVerificationCount = complianceResults.filter(c => c.status === 'Needs Verification').length || 7;
  const criticalRisksCount = (activeTender?.risks || []).filter(r => r.severity === 'CRITICAL').length || 2;
  const satisfiedCount = complianceResults.filter(c => c.status === 'Satisfied').length || 5;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Hero / Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-7 shadow-lg border border-slate-800 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>BidGuard AI • Tender Intelligence Platform</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Turn complex tender documents into actionable bid decisions.
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Don’t just summarize the tender. BidGuard AI extracts evidence-backed requirements, compares them against your company profile, and highlights gaps before you submit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveScreen('upload')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all shadow-blue-600/30 hover:shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span>Analyze New Tender</span>
            </button>
            <button
              onClick={() => setActiveScreen('compliance')}
              className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Run Compliance Check</span>
            </button>
          </div>
        </div>

        {/* Visual Pipeline Banner */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-blue-400 font-mono font-semibold block">STAGE 1</span>
            <span className="font-semibold text-slate-200">1. Upload Tender PDF</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-blue-400 font-mono font-semibold block">STAGE 2</span>
            <span className="font-semibold text-slate-200">2. Gemini Understanding</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-blue-400 font-mono font-semibold block">STAGE 3</span>
            <span className="font-semibold text-slate-200">3. Requirements Extracted</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-blue-400 font-mono font-semibold block">STAGE 4</span>
            <span className="font-semibold text-slate-200">4. Bidder Profile Verified</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 col-span-2 md:col-span-1">
            <span className="text-[10px] text-emerald-400 font-mono font-semibold block">FINAL</span>
            <span className="font-semibold text-emerald-300">5. Readiness Report</span>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Tenders */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Tenders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">3</span>
            <span className="text-xs text-slate-500 font-medium">in pipeline</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">GeM & Central PSU tenders analyzed</p>
        </div>

        {/* Card 2: Requirements Extracted */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Requirements Extracted</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{requirementsCount}</span>
            <span className="text-xs text-indigo-600 font-medium">with page sources</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Eligibility, Tech, Finance & Clauses</p>
        </div>

        {/* Card 3: Needs Verification */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Needs Verification</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700">{needsVerificationCount}</span>
            <span className="text-xs text-amber-600 font-medium">evidence gaps</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Certificates & EMD documentation</p>
        </div>

        {/* Card 4: Critical Risks */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">Critical Risks</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600">{criticalRisksCount}</span>
            <span className="text-xs text-rose-600 font-medium">disqualification traps</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">STQC lab cert & SLA penalties</p>
        </div>
      </div>

      {/* Featured Active Tender Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                {activeTender?.tender_overview?.tender_ref || 'GEM/2026/B/8941203'}
              </span>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                Active Benchmark
              </span>
              <span className="text-xs text-slate-500">
                {activeTender?.tender_overview?.authority || 'Ministry of Heavy Industries'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeTender?.tender_overview?.tender_title || 'Procurement of Network Security Equipment'}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Submission: <strong className="text-slate-800">{activeTender?.tender_overview?.submission_deadline || 'Oct 14, 2026, 15:00 hrs IST'}</strong>
              </span>
              <span>•</span>
              <span>Value: <strong className="text-slate-800">{activeTender?.tender_overview?.estimated_value || '₹ 4.25 Cr'}</strong></span>
              <span>•</span>
              <span>Doc Size: <strong className="text-slate-800">{activeTender?.tender_overview?.pages_count || 24} Pages</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveScreen('analysis')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              View Requirements
            </button>
            <button
              onClick={() => setActiveScreen('compliance')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Check Compliance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveScreen('report')}
              className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
            >
              Readiness Report
            </button>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Satisfied Criteria</span>
              </span>
              <span className="font-bold text-emerald-800">{satisfiedCount} items</span>
            </div>
            <p className="text-[11px] text-emerald-700">Turnover (₹8 Cr vs ₹5 Cr), 5 yrs experience, GST verified.</p>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Needs Verification</span>
              </span>
              <span className="font-bold text-amber-800">{needsVerificationCount} items</span>
            </div>
            <p className="text-[11px] text-amber-700">EMD exemption NIC code, fresh solvency certificate date.</p>
          </div>

          <div className="bg-rose-50/60 border border-rose-200/70 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-rose-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Missing / Critical Gap</span>
              </span>
              <span className="font-bold text-rose-800">2 items</span>
            </div>
            <p className="text-[11px] text-rose-700">STQC firmware cert missing, stamp paper affidavit not printed.</p>
          </div>
        </div>
      </div>

      {/* Recent Tenders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recent Tenders in Repository</h3>
            <p className="text-xs text-slate-500">Government e-Marketplace (GeM) and State PSU procurement opportunities</p>
          </div>
          <button
            onClick={() => setActiveScreen('upload')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>+ Upload Another Tender</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Tender</th>
                <th className="py-3 px-4">Procuring Authority</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Requirements</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTenders.map((t) => {
                const isCurrent = t.id === 'gem-netsec-2026';
                const statusStyles = {
                  'Ready for Verification': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  'Analyzed': 'bg-blue-50 text-blue-700 border-blue-200',
                  'Needs Review': 'bg-amber-50 text-amber-700 border-amber-200'
                };

                return (
                  <tr key={t.id} className={`hover:bg-slate-50/80 transition-colors ${isCurrent ? 'bg-blue-50/20' : ''}`}>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{t.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{t.bid_number}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{t.authority}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{t.estimated_value}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">{t.deadline}</div>
                      <span className="text-[10px] text-slate-400">15:00 IST</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{t.requirements_count}</span>
                      <span className="text-slate-400"> rules</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${statusStyles[t.status] || 'bg-slate-100 text-slate-700'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isCurrent ? (
                        <button
                          onClick={() => setActiveScreen('compliance')}
                          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Check Bid →
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveScreen('analysis')}
                          className="font-medium text-slate-500 hover:text-slate-800"
                        >
                          Inspect
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
