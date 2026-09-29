import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  Building2,
  Calendar,
  BookOpen,
  ArrowRight,
  Shield,
  Sparkles,
  Info
} from 'lucide-react';
import { fetchBidReadinessReport } from '../api';

export default function ReportScreen({
  activeTender,
  bidderProfile,
  setActiveScreen,
  onShowToast
}) {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await fetchBidReadinessReport(activeTender?.tender_overview?.tender_id || 'gem-netsec-2026');
        setReport(data);
      } catch (err) {
        console.warn('Error fetching report, assembling from state:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadReport();
  }, [activeTender]);

  const overview = report?.tender_overview || activeTender?.tender_overview || {};
  const profile = report?.bidder_profile || bidderProfile || {};
  const satisfied = report?.satisfied_requirements || (activeTender?.compliance_results || []).filter(c => c.status === 'Satisfied');
  const needsVerif = report?.needs_verification_requirements || (activeTender?.compliance_results || []).filter(c => c.status === 'Needs Verification');
  const missing = report?.missing_requirements || (activeTender?.compliance_results || []).filter(c => c.status === 'Missing / Not Found');
  const criticalRisks = report?.critical_risks || (activeTender?.risks || []).filter(r => r.severity === 'CRITICAL');
  const allRisks = report?.all_risks || activeTender?.risks || [];
  const deadlines = report?.important_deadlines || activeTender?.deadlines || [];
  const nextActions = report?.recommended_next_actions || [
    "Acquire the mandatory STQC / CERT-In firmware test certificate from the OEM (Page 18, Clause 9.6).",
    "Verify Udyam NIC classification for ₹ 8.5 Lakhs EMD exemption; initiate Bank Guarantee if needed (Page 13, Clause 6.3).",
    "Request fresh Bank Solvency Certificate of ₹ 2.0 Cr issued within 90 days from scheduled bank branch (Page 14, Clause 6.9).",
    "Submit pre-bid clarification regarding ISO 27001 applicability prior to September 30 cutoff date (Page 2, Bid Notice)."
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report || activeTender, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `BidGuard_Report_${overview.tender_ref || 'GEM2026'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast({ type: 'success', message: 'Report JSON downloaded.' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Action Bar (hidden in print) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Bid Readiness Executive Report</h3>
            <p className="text-xs text-slate-500">Official Decision Packet for Tender Evaluation</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF / Print</span>
          </button>
          <button
            onClick={() => setActiveScreen('upload')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Analysis</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Body */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8 text-slate-900 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg mb-1">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>BidGuard AI — Bid Readiness Report</span>
            </div>
            <p className="text-xs text-slate-500">
              Procurement Intelligence, Compliance Verification & Risk Audit
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="font-mono text-slate-500 block">Report Generated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block mt-1">
              GeM Procurement Audit
            </span>
          </div>
        </div>

        {/* SECTION 1: Tender & Bidder Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tender Details Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px] pb-1 border-b border-slate-200">
              1. Tender Overview
            </h4>
            <div>
              <span className="text-slate-400 block text-[10px]">Tender Title</span>
              <strong className="text-slate-900 text-sm">{overview.tender_title}</strong>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">GeM Bid Reference</span>
                <span className="font-mono font-bold text-slate-800">{overview.tender_ref}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Procuring Authority</span>
                <span className="font-semibold text-slate-800">{overview.authority}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Estimated Value</span>
                <span className="font-bold text-slate-900">{overview.estimated_value}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Submission Deadline</span>
                <span className="font-bold text-rose-700">{overview.submission_deadline}</span>
              </div>
            </div>
          </div>

          {/* Bidder Profile Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px] pb-1 border-b border-slate-200">
              2. Evaluated Bidder Profile
            </h4>
            <div>
              <span className="text-slate-400 block text-[10px]">Evaluated Entity</span>
              <strong className="text-slate-900 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>{profile.company_name}</span>
              </strong>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Average Annual Turnover</span>
                <span className="font-bold text-slate-800">{profile.annual_turnover}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Commercial Experience</span>
                <span className="font-semibold text-slate-800">{profile.experience_years} Years (Active)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">GST Verification</span>
                <span className="font-bold text-emerald-700">{profile.gst_status}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ISO Certifications</span>
                <span className="font-semibold text-slate-800">{profile.iso_certification}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Compliance Summary Ledger */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <span>3. Bid Compliance Summary</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-2xl font-extrabold text-emerald-700 block">{satisfied.length}</span>
              <span className="font-semibold text-emerald-900 text-[11px]">Satisfied Requirements</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-2xl font-extrabold text-amber-700 block">{needsVerif.length}</span>
              <span className="font-semibold text-amber-900 text-[11px]">Needs Verification</span>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <span className="text-2xl font-extrabold text-rose-700 block">{missing.length}</span>
              <span className="font-semibold text-rose-900 text-[11px]">Missing / Gaps</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <span className="text-2xl font-extrabold text-blue-700 block">{criticalRisks.length}</span>
              <span className="font-semibold text-blue-900 text-[11px]">Critical Contract Risks</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Missing Requirements (Disqualification Traps) */}
        {missing.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>4. Missing Requirements / High Disqualification Risk</span>
            </div>
            <div className="border border-rose-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-rose-50/70 text-rose-950 font-semibold border-b border-rose-200">
                  <tr>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3">Tender Citation</th>
                    <th className="py-2.5 px-3">Current Status & Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100 bg-rose-50/20">
                  {missing.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{m.requirement_title}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{m.source_page}</td>
                      <td className="py-2.5 px-3 text-rose-900 font-medium">{m.reasoning || m.bidder_evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 4: Needs Verification Items */}
        {needsVerif.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>5. Requirements Requiring Immediate Verification</span>
            </div>
            <div className="border border-amber-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-amber-50/70 text-amber-950 font-semibold border-b border-amber-200">
                  <tr>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3">Citation</th>
                    <th className="py-2.5 px-3">Bidder Evidence Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 bg-amber-50/20">
                  {needsVerif.map((n) => (
                    <tr key={n.id}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{n.requirement_title}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{n.source_page}</td>
                      <td className="py-2.5 px-3 text-slate-800">{n.bidder_evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 5: Satisfied Requirements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>6. Verified & Satisfied Requirements ({satisfied.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {satisfied.map((s) => (
              <div key={s.id} className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/30 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block leading-tight">{s.requirement_title}</strong>
                  <span className="text-[11px] text-emerald-800 mt-0.5 block">{s.bidder_evidence}</span>
                  <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Source: {s.source_page}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Critical & High Contract Risks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>7. Contractual & Compliance Risk Matrix</span>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 w-1/6">Severity</th>
                  <th className="py-2.5 px-3 w-1/3">Risk Clause</th>
                  <th className="py-2.5 px-3 w-1/6">Citation</th>
                  <th className="py-2.5 px-3 w-1/3">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allRisks.slice(0, 4).map((r) => (
                  <tr key={r.id}>
                    <td className="py-2.5 px-3 font-bold text-[11px]">
                      <span className={`px-2 py-0.5 rounded ${
                        r.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                        r.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{r.risk_title}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{r.source_page}</td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium">{r.recommended_action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 7: Recommended Next Actions (1, 2, 3...) */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-[11px] text-blue-900">
            8. Prioritized Next Actions for NovaTech Bid Team
          </h4>
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-xs space-y-2.5">
            {nextActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8: Important Deadlines */}
        {deadlines.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Critical Tender Timelines:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {deadlines.map((d, i) => (
                <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">{d.event}</span>
                  <span className="font-bold text-slate-800 text-[11px] font-mono">{d.date_time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANDATORY LEGAL DISCLAIMER - USP REQUIREMENT */}
        <div className="pt-6 border-t border-slate-300 text-center">
          <p className="text-xs text-slate-500 font-medium italic">
            “BidGuard AI helps identify requirements and potential gaps. Final bid decisions remain with the bidder.”
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            BidGuard AI • Powered by Google Gemini API • Hackathon Prototype
          </p>
        </div>
      </div>
    </div>
  );
}
