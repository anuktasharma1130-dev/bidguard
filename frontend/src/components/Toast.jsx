import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    warning: 'border-amber-200 bg-amber-50/90 text-amber-950',
    error: 'border-rose-200 bg-rose-50/90 text-rose-950',
    info: 'border-blue-200 bg-blue-50/90 text-blue-950'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border shadow-lg max-w-sm text-xs ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <p className="font-medium flex-1">{toast.message}</p>
        <button onClick={onClose} className="opacity-70 hover:opacity-100 p-0.5">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
