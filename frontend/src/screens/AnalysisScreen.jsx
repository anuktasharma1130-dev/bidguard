import React, { useState } from 'react';
import {
  FileSearch,
  Search,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  FileCheck2,
  DollarSign,
  Cpu,
  BookmarkCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function AnalysisScreen({
  activeTender,
  setActiveScreen
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Eligibility Requirements',
    'Technical Requirements',
    'Financial Requirements',
    'Required Documents',
    'Important Dates',
    'Key Clauses'
  ];

  const requirements = activeTender?.requirements || [];
  const overview = activeTender?.tender_overview || {};
  const deadlines = activeTender?.deadlines || [];

  const filteredRequirements = requirements.filter((req) => {
    const matchesCategory = selectedCategory === 'All' || req.category === selectedCategory;
    const matchesQuery = !searchQuery ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.source_page.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Eligibility Requirements':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'Technical Requirements':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'Financial Requirements':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'Required Documents':
        return <FileCheck2 className="w-4 h-4 text-amber-600" />;
      case 'Important Dates':
        return <Calendar className="w-4 h-4 text-violet-600" />;
      case 'Key Clauses':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <BookmarkCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded">
                {overview.tender_ref || 'GEM/2026/B/8941203'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {overview.authority || 'Ministry of Heavy Industries'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {overview.tender_title || 'Procurement of Network Security Equipment'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Extracted via Google Gemini • Grounded in {overview.pages_count || 24} document pages
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveScreen('compliance')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <span>Check Bidder Compliance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Estimated Value</span>
            <span className="font-bold text-slate-800">{overview.estimated_value || '₹ 4.25 Crores'}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Submission End Date</span>
            <span className="font-bold text-slate-800">{overview.submission_deadline || 'Oct 14, 2026, 15:00 IST'}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Pre-Bid Meeting</span>
            <span className="font-bold text-slate-800">{overview.pre_bid_meeting || 'Oct 02, 2026, 11:00 IST'}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Requirements Parsed</span>
            <span className="font-bold text-blue-700">{requirements.length} Evidence Items</span>
          </div>
        </div>
      </div>

      {/* Deadlines Timeline Card */}
      {deadlines.length > 0 && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-violet-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Important Milestones & Submission Deadlines
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {deadlines.map((dl, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    dl.is_critical ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {dl.is_critical ? 'CRITICAL DEADLINE' : 'NOTICE'}
                  </span>
                  <span className="text-[10px] text-blue-700 font-mono font-medium">{dl.source_page}</span>
                </div>
                <h4 className="font-bold text-slate-900 line-clamp-1">{dl.event}</h4>
                <p className="text-[11px] text-slate-600 mt-1 font-mono font-semibold text-slate-700">
                  {dl.date_time}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative shrink-0 w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search requirements or clause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequirements.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  {getCategoryIcon(req.category)}
                  <span className="text-[11px] font-semibold text-slate-500">{req.category}</span>
                </div>
                {/* SOURCE EVIDENCE BADGE - USP REQUIREMENT */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    <span>Source: {req.source_page}</span>
                  </span>
                  {req.mandatory && (
                    <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                      Mandatory
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {req.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {req.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] text-slate-400 font-semibold">{req.id}</span>
              <button
                onClick={() => setActiveScreen('compliance')}
                className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1 hover:underline"
              >
                <span>Verify in Compliance Check →</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRequirements.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <FileSearch className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="font-bold text-slate-800">No requirements found matching your search</p>
          <p className="text-xs text-slate-500 mt-1">Try switching category tabs or clearing your search query.</p>
        </div>
      )}

      {/* Bottom Sticky CTA */}
      <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-blue-950 text-sm">Next Step: Bidder Compliance Check</h4>
          <p className="text-xs text-blue-700 mt-0.5">
            Compare these {requirements.length} extracted specifications with NovaTech Solutions' corporate credentials.
          </p>
        </div>
        <button
          onClick={() => setActiveScreen('compliance')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <span>Open Compliance Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
