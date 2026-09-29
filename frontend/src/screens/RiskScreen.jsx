import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Info,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  Wrench,
  HelpCircle
} from 'lucide-react';

export default function RiskScreen({
  activeTender,
  setActiveScreen
}) {
  const [severityFilter, setSeverityFilter] = useState('All');

  const risks = activeTender?.risks || [];

  const filteredRisks = risks.filter(
    (r) => severityFilter === 'All' || r.severity.toUpperCase() === severityFilter.toUpperCase()
  );

  const getSeverityStyle = (severity) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return {
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          border: 'border-rose-300',
          headerBg: 'bg-rose-50/60',
          accent: 'text-rose-600',
          icon: ShieldAlert
        };
      case 'HIGH':
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          border: 'border-amber-300',
          headerBg: 'bg-amber-50/60',
          accent: 'text-amber-600',
          icon: AlertTriangle
        };
      case 'MEDIUM':
        return {
          badge: 'bg-blue-100 text-blue-800 border-blue-300',
          border: 'border-blue-300',
          headerBg: 'bg-blue-50/60',
          accent: 'text-blue-600',
          icon: AlertCircle
        };
      case 'LOW':
      default:
        return {
          badge: 'bg-slate-100 text-slate-700 border-slate-300',
          border: 'border-slate-200',
          headerBg: 'bg-slate-50',
          accent: 'text-slate-500',
          icon: Info
        };
    }
  };

  const counts = {
    all: risks.length,
    critical: risks.filter(r => r.severity === 'CRITICAL').length,
    high: risks.filter(r => r.severity === 'HIGH').length,
    medium: risks.filter(r => r.severity === 'MEDIUM').length,
    low: risks.filter(r => r.severity === 'LOW').length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-200/80 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Evidence-Backed Risk Analysis</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Bid Risk Analysis
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Grounded identification of disqualification traps, punitive SLA clauses, and critical compliance omissions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveScreen('ask')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask Tender Q&A</span>
            </button>
            <button
              onClick={() => setActiveScreen('report')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <span>View Readiness Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          onClick={() => setSeverityFilter('All')}
          className={`p-3 rounded-lg border text-left transition-all ${
            severityFilter === 'All'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-medium opacity-80">All Identified Risks</div>
          <div className="text-lg font-bold">{counts.all}</div>
        </button>

        <button
          onClick={() => setSeverityFilter('CRITICAL')}
          className={`p-3 rounded-lg border text-left transition-all ${
            severityFilter === 'CRITICAL'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'
          }`}
        >
          <div className="text-[11px] font-bold text-rose-700">CRITICAL</div>
          <div className="text-lg font-bold">{counts.critical}</div>
        </button>

        <button
          onClick={() => setSeverityFilter('HIGH')}
          className={`p-3 rounded-lg border text-left transition-all ${
            severityFilter === 'HIGH'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
          }`}
        >
          <div className="text-[11px] font-bold text-amber-700">HIGH</div>
          <div className="text-lg font-bold">{counts.high}</div>
        </button>

        <button
          onClick={() => setSeverityFilter('MEDIUM')}
          className={`p-3 rounded-lg border text-left transition-all ${
            severityFilter === 'MEDIUM'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
          }`}
        >
          <div className="text-[11px] font-bold text-blue-700">MEDIUM</div>
          <div className="text-lg font-bold">{counts.medium}</div>
        </button>

        <button
          onClick={() => setSeverityFilter('LOW')}
          className={`p-3 rounded-lg border text-left transition-all ${
            severityFilter === 'LOW'
              ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-700">LOW</div>
          <div className="text-lg font-bold">{counts.low}</div>
        </button>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRisks.map((risk) => {
          const style = getSeverityStyle(risk.severity);
          const Icon = style.icon;

          return (
            <div
              key={risk.id}
              className={`bg-white rounded-xl border ${style.border} shadow-xs overflow-hidden flex flex-col justify-between`}
            >
              <div>
                {/* Card Header */}
                <div className={`p-4 border-b border-slate-100 flex items-center justify-between ${style.headerBg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${style.badge}`}>
                      {risk.severity} RISK
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 font-semibold">{risk.id}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold bg-white text-blue-800 border border-slate-200 px-2 py-0.5 rounded">
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    <span>{risk.source_page}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {risk.risk_title}
                  </h3>

                  {/* Why it matters */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Why It Matters:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {risk.why_it_matters}
                    </p>
                  </div>

                  {/* Recommended Action */}
                  <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-emerald-600" />
                      <span>Recommended Action:</span>
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {risk.recommended_action}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px]">Tender Grounded Analysis</span>
                <button
                  onClick={() => setActiveScreen('compliance')}
                  className="font-semibold text-blue-600 hover:text-blue-800 text-[11px] flex items-center gap-1 hover:underline"
                >
                  <span>Review Evidence Item →</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers & Ethics Note */}
      <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 border border-slate-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Risk Assessment Note:</strong> BidGuard AI risk scores evaluate contractual risk exposure and documentary compliance based exclusively on tender provisions. The AI does not guarantee bid selection or replace formal legal review.
        </p>
      </div>

      {/* Footer Navigation CTA */}
      <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-blue-950 text-sm">Next Step: Bid Readiness Report</h4>
          <p className="text-xs text-blue-700 mt-0.5">
            Compile the complete compliance matrix, risk mitigations, and executive decision packet.
          </p>
        </div>
        <button
          onClick={() => setActiveScreen('report')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <span>Generate Final Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
