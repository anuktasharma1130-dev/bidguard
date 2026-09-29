import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Toast from './components/Toast';
import BidderProfileModal from './components/BidderProfileModal';
import EvidenceModal from './components/EvidenceModal';

import DashboardScreen from './screens/DashboardScreen';
import UploadScreen from './screens/UploadScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import RiskScreen from './screens/RiskScreen';
import AskTenderScreen from './screens/AskTenderScreen';
import ReportScreen from './screens/ReportScreen';

import {
  fetchHealth,
  fetchRecentTenders,
  fetchCurrentTender,
  loadDemoTender,
  fetchBidderProfile,
  updateBidderProfile,
  updateComplianceItem
} from './api';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeTender, setActiveTender] = useState(null);
  const [recentTenders, setRecentTenders] = useState([]);
  const [bidderProfile, setBidderProfile] = useState({
    company_name: 'NovaTech Solutions Pvt. Ltd.',
    experience_years: 5,
    annual_turnover: '₹8 Cr',
    gst_status: 'Verified',
    govt_projects: '2 completed projects with Central/State PSU',
    iso_certification: 'ISO 9001:2015 Available',
    technical_certifications: 'Tier-1 OEM Partner (Pending C-DAC cert)',
    emd_prepared: false,
    additional_notes: 'Registered MSME enterprise'
  });
  const [backendInfo, setBackendInfo] = useState({
    status: 'checking',
    gemini_configured: false,
    mode: 'Demo Mode'
  });

  const [toast, setToast] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [evidenceModalItem, setEvidenceModalItem] = useState(null);

  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Initial load
  useEffect(() => {
    async function initData() {
      // 1. Health & Mode Check
      const health = await fetchHealth();
      setBackendInfo(health);

      // 2. Fetch Recent Tenders
      const recent = await fetchRecentTenders();
      if (recent && recent.length > 0) {
        setRecentTenders(recent);
      }

      // 3. Fetch Bidder Profile
      const profile = await fetchBidderProfile();
      if (profile) {
        setBidderProfile(profile);
      }

      // 4. Fetch Current / Demo Tender
      try {
        const tender = await fetchCurrentTender();
        if (tender && tender.requirements) {
          setActiveTender(tender);
        } else {
          const demo = await loadDemoTender();
          setActiveTender(demo);
        }
      } catch (err) {
        console.warn('Could not load current tender, using fallback demo:', err);
        const demo = await loadDemoTender();
        setActiveTender(demo);
      }
    }

    initData();
  }, []);

  const handleResetDemo = async () => {
    try {
      const demo = await loadDemoTender();
      setActiveTender(demo);
      showToast({ type: 'success', message: 'Demo GeM tender loaded successfully.' });
    } catch (err) {
      showToast({ type: 'info', message: 'Loaded local demo benchmark tender.' });
    }
  };

  const handleSaveProfile = async (updatedProfile) => {
    setBidderProfile(updatedProfile);
    try {
      await updateBidderProfile(updatedProfile);
      showToast({ type: 'success', message: 'Bidder profile updated across platform.' });
    } catch (err) {
      showToast({ type: 'info', message: 'Profile updated in session memory.' });
    }
  };

  const handleSaveEvidence = async (itemId, newStatus, newEvidence) => {
    try {
      await updateComplianceItem(itemId, newStatus, newEvidence);
    } catch (err) {
      console.warn('Backend update error, updating local state:', err);
    }

    // Update in local state
    if (activeTender && activeTender.compliance_results) {
      const updatedList = activeTender.compliance_results.map((c) =>
        c.id === itemId
          ? { ...c, status: newStatus, bidder_evidence: newEvidence }
          : c
      );
      setActiveTender({
        ...activeTender,
        compliance_results: updatedList
      });
      showToast({ type: 'success', message: 'Compliance verification record updated!' });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        activeTender={activeTender}
        isDemoMode={!backendInfo?.gemini_configured}
        backendInfo={backendInfo}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          bidderProfile={bidderProfile}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onResetDemo={handleResetDemo}
          backendInfo={backendInfo}
          activeTender={activeTender}
        />

        <main className="p-6 md:p-8 flex-1">
          {activeScreen === 'dashboard' && (
            <DashboardScreen
              activeTender={activeTender}
              recentTenders={recentTenders}
              setActiveScreen={setActiveScreen}
              bidderProfile={bidderProfile}
              onResetDemo={handleResetDemo}
            />
          )}

          {activeScreen === 'upload' && (
            <UploadScreen
              onAnalysisComplete={(data) => {
                setActiveTender(data);
              }}
              setActiveScreen={setActiveScreen}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'analysis' && (
            <AnalysisScreen
              activeTender={activeTender}
              setActiveScreen={setActiveScreen}
            />
          )}

          {activeScreen === 'compliance' && (
            <ComplianceScreen
              activeTender={activeTender}
              bidderProfile={bidderProfile}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
              onEditEvidence={(item) => setEvidenceModalItem(item)}
              setActiveScreen={setActiveScreen}
            />
          )}

          {activeScreen === 'risks' && (
            <RiskScreen
              activeTender={activeTender}
              setActiveScreen={setActiveScreen}
            />
          )}

          {activeScreen === 'ask' && (
            <AskTenderScreen
              activeTender={activeTender}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'report' && (
            <ReportScreen
              activeTender={activeTender}
              bidderProfile={bidderProfile}
              setActiveScreen={setActiveScreen}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Toast Alerts */}
      <BidderProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        bidderProfile={bidderProfile}
        onSaveProfile={handleSaveProfile}
      />

      <EvidenceModal
        isOpen={!!evidenceModalItem}
        onClose={() => setEvidenceModalItem(null)}
        item={evidenceModalItem}
        onSave={handleSaveEvidence}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
