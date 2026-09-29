import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileCheck,
  FileText,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileCode2,
  ShieldAlert
} from 'lucide-react';
import { analyzeTenderUpload, loadDemoTender } from '../api';

export default function UploadScreen({
  onAnalysisComplete,
  setActiveScreen,
  onShowToast
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const fileInputRef = useRef(null);

  const steps = [
    'Parsing document structure and tables...',
    'Gemini extracting Eligibility, Technical & Financial requirements...',
    'Grounding specifications with page citations...',
    'Benchmarking against NovaTech Solutions profile...',
    'Synthesizing bid risks & next actions...'
  ];

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      onShowToast({ type: 'error', message: 'Please upload a valid PDF document.' });
      return;
    }

    setSelectedFile(file);
    setFileMetadata({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      pages: '24 (est.)',
      type: 'Procurement Tender PDF'
    });
    onShowToast({ type: 'success', message: `Selected ${file.name}` });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const runAnalysis = async (fileToUpload) => {
    if (!fileToUpload) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const interval = setInterval(() => {
      setAnalysisStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      console.log('[BidGuard] Analyzing uploaded tender file:', fileToUpload.name);
      const data = await analyzeTenderUpload(fileToUpload, false);
      
      if (!data || !data.tender_overview) {
        throw new Error('Analysis response is incomplete or invalid.');
      }

      clearInterval(interval);
      setAnalysisStep(steps.length - 1);

      await new Promise((r) => setTimeout(r, 350));

      onAnalysisComplete(data);
      onShowToast({ type: 'success', message: 'Tender analysis completed with evidence citations!' });
      setActiveScreen('analysis');
    } catch (error) {
      clearInterval(interval);
      console.error('[BidGuard] Upload Analysis Error:', error);
      onShowToast({
        type: 'error',
        message: `Analysis failed: ${error.message || 'Server error occurred while analyzing PDF.'}`
      });
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  const handleUseDemoTender = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const interval = setInterval(() => {
      setAnalysisStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);

    try {
      console.log('[BidGuard] Requesting Demo Tender directly via GET /api/tender/demo');
      const demoData = await loadDemoTender();

      if (!demoData || !demoData.tender_overview || !demoData.requirements) {
        throw new Error('Received incomplete demo tender structure from server.');
      }

      clearInterval(interval);
      setAnalysisStep(steps.length - 1);

      await new Promise((r) => setTimeout(r, 350));

      onAnalysisComplete(demoData);
      onShowToast({ type: 'success', message: 'Demo GeM tender loaded successfully!' });
      setActiveScreen('analysis');
    } catch (error) {
      clearInterval(interval);
      console.error('[BidGuard] Demo Tender Error:', error);
      onShowToast({
        type: 'error',
        message: `Failed to load demo tender: ${error.message || 'Please check your connection and retry.'}`
      });
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200/80 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Gemini-Powered Tender Ingestion</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyze a Tender
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Upload a GeM or procurement tender PDF and let Gemini extract the requirements that matter for your bid.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-6">
        {/* Drag and Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : selectedFile
              ? 'border-emerald-300 bg-emerald-50/20'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            accept=".pdf,application/pdf"
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              selectedFile ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {selectedFile ? (
                <FileCheck className="w-7 h-7" />
              ) : (
                <UploadCloud className="w-7 h-7" />
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                {selectedFile ? selectedFile.name : 'Drag & drop tender PDF here, or click to browse'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supported format: <strong className="text-slate-700">PDF</strong> (GeM, Central/State PSU, CPWD) • Up to 50 MB
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg shadow-xs transition-colors"
            >
              Browse PDF
            </button>
          </div>
        </div>

        {/* Selected File Details Banner */}
        {fileMetadata && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{fileMetadata.name}</h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                  <span>File size: <strong>{fileMetadata.size}</strong></span>
                  <span>•</span>
                  <span>Pages: <strong>{fileMetadata.pages}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">Ready for OCR & Extraction</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => runAnalysis(selectedFile, false)}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Tender</span>
            </button>
          </div>
        )}

        {/* Loading State Banner */}
        {isAnalyzing && (
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-6 text-center space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-center gap-3 text-blue-900 font-bold text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span>Gemini is analyzing tender requirements...</span>
            </div>
            <p className="text-xs text-blue-700 font-medium max-w-md mx-auto">
              {steps[analysisStep]}
            </p>
            <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden max-w-sm mx-auto">
              <div
                className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Demo Mode / Judge Fast-Track */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              Judges Fast-Track & Demo Mode
            </span>
            <p className="text-xs text-slate-600">
              Test BidGuard AI immediately with an authentic GeM Network Security procurement tender without configuring an API key.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="/sample_gem_tender.pdf"
              download="GeM_Network_Security_Tender_2026.pdf"
              className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3 py-2 rounded-lg font-medium transition-colors"
              title="Download the 6-page sample GeM tender PDF to test drag & drop upload"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handleUseDemoTender}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg shadow-xs transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Use Demo Tender</span>
            </button>
          </div>
        </div>
      </div>

      {/* What BidGuard Extracts Card */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 text-xs text-slate-600">
        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>What Gemini extracts and verifies from your tender PDF:</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">1. Eligibility Criteria</strong>
            Experience years, legal incorporation, past orders.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">2. Technical Specs</strong>
            Throughput, FIPS/EAL4+, STQC certs, warranty SLA.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">3. Financial Requirements</strong>
            Turnover (CA UDIN), EMD amount, Bank Solvency, PBG.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">4. Document Checklist</strong>
            Mandatory annexures, certificates, stamp paper.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">5. Critical Deadlines</strong>
            Submission cutoff, pre-bid meeting, opening dates.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">6. Penalties & Risks</strong>
            Liquidated damages, downtime SLA fines, MII terms.
          </div>
        </div>
      </div>
    </div>
  );
}
