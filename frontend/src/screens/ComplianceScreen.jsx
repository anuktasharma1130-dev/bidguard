import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Building2,
  Edit3,
  Filter,
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ComplianceScreen({
  activeTender,
  bidderProfile,
  onOpenProfileModal,
  onEditEvidence,
  setActiveScreen
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const complianceResults = activeTender?.compliance_results || [];

  const counts = {
    total: complianceResults.length,
    satisfied: complianceResults.filter(c => c.status === 'Satisfied').length,
    needsVerification: complianceResults.filter(c => c.status === 'Needs Verification').length,
    missing: complianceResults.filter(c => c.status === 'Missing / Not Found').length,
    informational: complianceResults.filter(c => c.status === 'Informational').length
  };

  const filteredItems = complianceResults.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = !searchQuery ||
      item.requirement_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bidder_evidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source_page.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Satisfied':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Satisfied</span>
          </span>
        );
      case 'Needs Verification':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Needs Verification</span>
          </span>
        );
      case 'Missing / Not Found':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Missing / Not Found</span>
          </span>
        );
      case 'Informational':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Informational</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner: Bidder Profile Benchmark */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200/80 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Evidence-Backed Verification</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Bidder Compliance Check
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Comparing extracted tender specifications against corporate credentials and verified government project credentials.
            </p>
          </div>

          {/* Bidder Profile Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 lg:min-w-[420px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-slate-900 text-xs">
                  {bidderProfile?.company_name || 'NovaTech Solutions Pvt. Ltd.'}
                </span>
              </div>
              <button
                onClick={onOpenProfileModal}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Experience:</span>
                <strong className="text-slate-800">{bidderProfile?.experience_years || 5} Years</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Annual Turnover:</span>
                <strong className="text-slate-800">{bidderProfile?.annual_turnover || '₹8 Cr'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">GST Status:</span>
                <strong className="text-emerald-700">{bidderProfile?.gst_status || 'Verified'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Govt Projects:</span>
                <strong className="text-slate-800">Yes (RailTel, PowerGrid)</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">ISO Certification:</span>
                <strong className="text-slate-800">{bidderProfile?.iso_certification || 'ISO 9001:2015 Available'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter('Satisfied')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'Satisfied'
              ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Satisfied</span>
            </span>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              {counts.satisfied}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Credentials verified against tender threshold</p>
        </button>

        <button
          onClick={() => setStatusFilter('Needs Verification')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'Needs Verification'
              ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Needs Verification</span>
            </span>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
              {counts.needsVerification}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Missing recent document or unconfirmed clause</p>
        </button>

        <button
          onClick={() => setStatusFilter('Missing / Not Found')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'Missing / Not Found'
              ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-rose-800 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Missing / Not Found</span>
            </span>
            <span className="text-xs font-mono font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
              {counts.missing}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Critical omission risking bid disqualification</p>
        </button>

        <button
          onClick={() => setStatusFilter('All')}
          className={`p-4 rounded-xl border text-left transition-all ${
            statusFilter === 'All'
              ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>All Checklist Items</span>
            </span>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
              {counts.total}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Complete evidence verification ledger</p>
        </button>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              Showing {filteredItems.length} of {counts.total} Requirements
            </span>
            {statusFilter !== 'All' && (
              <button
                onClick={() => setStatusFilter('All')}
                className="text-[10px] text-blue-600 hover:underline font-medium"
              >
                (Clear Filter)
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search evidence or requirement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-2/5">Requirement & Clause</th>
                <th className="py-3 px-4 w-1/6">Tender Citation</th>
                <th className="py-3 px-4 w-1/4">Bidder Evidence</th>
                <th className="py-3 px-4 w-1/6">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Requirement Title & Category */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="font-semibold text-slate-900 leading-snug">
                      {item.requirement_title}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium inline-block mt-0.5">
                      {item.category}
                    </span>
                    {item.reasoning && (
                      <p className="text-[11px] text-slate-600 mt-1.5 bg-slate-50 p-2 rounded border border-slate-200/80 leading-relaxed">
                        <strong className="text-slate-700">Reasoning:</strong> {item.reasoning}
                      </p>
                    )}
                  </td>

                  {/* Tender Source Page */}
                  <td className="py-3.5 px-4 align-top">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded">
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      <span>{item.source_page}</span>
                    </span>
                  </td>

                  {/* Bidder Evidence */}
                  <td className="py-3.5 px-4 align-top font-medium text-slate-800">
                    <div className="leading-relaxed bg-white p-2 rounded border border-slate-200/90 text-xs">
                      {item.bidder_evidence}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Action Button */}
                  <td className="py-3.5 px-3 align-top text-right whitespace-nowrap">
                    <button
                      onClick={() => onEditEvidence(item)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                      title="Update evidence or override compliance status"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-amber-50/80 rounded-xl border border-amber-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-amber-950 text-sm">Next Step: Bid Risk Analysis</h4>
          <p className="text-xs text-amber-800 mt-0.5">
            Identify penalties, liquidated damages clauses, and technical disqualification traps.
          </p>
        </div>
        <button
          onClick={() => setActiveScreen('risks')}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <span>View Risk Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
