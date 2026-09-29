import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, Info, Save } from 'lucide-react';

export default function EvidenceModal({
  isOpen,
  onClose,
  item,
  onSave
}) {
  if (!isOpen || !item) return null;

  const [status, setStatus] = useState(item.status);
  const [evidence, setEvidence] = useState(item.bidder_evidence || '');

  const statuses = [
    { value: 'Satisfied', label: 'Satisfied', icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
    { value: 'Needs Verification', label: 'Needs Verification', icon: AlertTriangle, color: 'text-amber-700 bg-amber-50 border-amber-300' },
    { value: 'Missing / Not Found', label: 'Missing / Not Found', icon: XCircle, color: 'text-rose-700 bg-rose-50 border-rose-300' },
    { value: 'Informational', label: 'Informational', icon: Info, color: 'text-slate-700 bg-slate-50 border-slate-300' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.id, status, evidence);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
              {item.source_page}
            </span>
            <h3 className="font-bold text-slate-900 text-sm mt-1">{item.requirement_title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement Category</label>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-medium">
              {item.category}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Compliance Status</label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => {
                const Icon = s.icon;
                const isSelected = status === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStatus(s.value)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                      isSelected
                        ? `${s.color} ring-2 ring-blue-500 font-semibold shadow-xs`
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Bidder Evidence / Verification Notes</label>
            <textarea
              rows={3}
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="e.g. Certificate number, turnover figures, or uploaded file reference..."
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {item.reasoning && (
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-3 text-xs text-blue-900">
              <span className="font-semibold block mb-0.5">Gemini Reasoning Note:</span>
              <p className="text-slate-700 leading-relaxed">{item.reasoning}</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
