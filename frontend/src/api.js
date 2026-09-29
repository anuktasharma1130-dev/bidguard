const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or unreachable, using client fallback:', err);
    return { status: 'client_fallback', gemini_configured: false, mode: 'Demo Mode' };
  }
}

export async function fetchRecentTenders() {
  try {
    const res = await fetch(`${API_BASE}/tenders/recent`);
    if (!res.ok) throw new Error('Failed to fetch recent tenders');
    return await res.json();
  } catch (err) {
    console.error('Error fetching recent tenders:', err);
    return [];
  }
}

export async function fetchCurrentTender() {
  try {
    const res = await fetch(`${API_BASE}/tender/current`);
    if (!res.ok) throw new Error('Failed to fetch current tender');
    return await res.json();
  } catch (err) {
    console.error('Error fetching current tender:', err);
    return null;
  }
}

export async function loadDemoTender() {
  try {
    const res = await fetch(`${API_BASE}/tender/demo`);
    if (!res.ok) throw new Error('Failed to load demo tender');
    return await res.json();
  } catch (err) {
    console.error('Error loading demo tender:', err);
    throw err;
  }
}

export async function analyzeTenderUpload(file, useDemo = false) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  formData.append('use_demo', useDemo ? 'true' : 'false');

  const res = await fetch(`${API_BASE}/tender/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Analysis failed');
  }
  return await res.json();
}

export async function updateComplianceItem(complianceId, status, bidderEvidence) {
  const res = await fetch(`${API_BASE}/tender/compliance/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compliance_id: complianceId,
      status: status,
      bidder_evidence: bidderEvidence
    }),
  });
  if (!res.ok) throw new Error('Failed to update compliance item');
  return await res.json();
}

export async function askTenderQuestion(question) {
  const res = await fetch(`${API_BASE}/tender/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('Failed to answer question');
  return await res.json();
}

export async function fetchBidReadinessReport(tenderId = 'gem-netsec-2026') {
  const res = await fetch(`${API_BASE}/tender/report/${tenderId}`);
  if (!res.ok) throw new Error('Failed to fetch report');
  return await res.json();
}

export async function fetchBidderProfile() {
  try {
    const res = await fetch(`${API_BASE}/bidder/profile`);
    if (!res.ok) throw new Error('Failed to fetch bidder profile');
    return await res.json();
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
}

export async function updateBidderProfile(profile) {
  const res = await fetch(`${API_BASE}/bidder/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return await res.json();
}
