// Centralized API base URL configuration
// 1. Reads VITE_API_BASE_URL if explicitly set in environment
// 2. In production builds or non-localhost hostnames, defaults to deployed Render backend
// 3. In local development without env var, falls back to http://127.0.0.1:8000
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://bidguard-backend.onrender.com'
    : (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
        ? 'https://bidguard-backend.onrender.com'
        : 'http://127.0.0.1:8000'))
).replace(/\/+$/, '');

const API_BASE = `${API_BASE_URL}/api`;

// Fetch helper with timeout to prevent infinite hanging
async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return res;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs / 1000}s. Server is taking too long to respond.`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchHealth() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/health`, { method: 'GET' }, 15000);
    if (!res.ok) throw new Error(`Health check failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('[BidGuard] Backend health check failed:', err);
    return { status: 'client_fallback', gemini_configured: false, mode: 'Demo Mode' };
  }
}

export async function fetchRecentTenders() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/tenders/recent`, { method: 'GET' }, 20000);
    if (!res.ok) throw new Error('Failed to fetch recent tenders');
    return await res.json();
  } catch (err) {
    console.error('[BidGuard] Error fetching recent tenders:', err);
    return [];
  }
}

export async function fetchCurrentTender() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/tender/current`, { method: 'GET' }, 20000);
    if (!res.ok) throw new Error('Failed to fetch current tender');
    return await res.json();
  } catch (err) {
    console.error('[BidGuard] Error fetching current tender:', err);
    return null;
  }
}

export async function loadDemoTender() {
  const url = `${API_BASE}/tender/demo`;
  console.log('[BidGuard] Loading demo tender from:', url);

  const res = await fetchWithTimeout(url, { method: 'GET' }, 30000);
  if (!res.ok) {
    throw new Error(`Failed to load demo tender (${res.status} ${res.statusText})`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Invalid response format from server (expected JSON, got ${contentType})`);
  }

  const data = await res.json();
  if (!data || !data.tender_overview || !data.requirements) {
    throw new Error('Incomplete demo tender data received from server');
  }

  return data;
}

export async function analyzeTenderUpload(file, useDemo = false) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  formData.append('use_demo', useDemo ? 'true' : 'false');

  const url = `${API_BASE}/tender/analyze`;
  console.log('[BidGuard] Analyzing tender via:', url);

  const res = await fetchWithTimeout(url, {
    method: 'POST',
    body: formData,
  }, 35000);

  if (!res.ok) {
    throw new Error(`Analysis failed (${res.status} ${res.statusText})`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Invalid response format from server (expected JSON, got ${contentType})`);
  }

  return await res.json();
}

export async function updateComplianceItem(complianceId, status, bidderEvidence) {
  const res = await fetchWithTimeout(`${API_BASE}/tender/compliance/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compliance_id: complianceId,
      status: status,
      bidder_evidence: bidderEvidence
    }),
  }, 20000);

  if (!res.ok) throw new Error('Failed to update compliance item');
  return await res.json();
}

export async function askTenderQuestion(question) {
  const res = await fetchWithTimeout(`${API_BASE}/tender/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  }, 30000);

  if (!res.ok) throw new Error('Failed to answer question');
  return await res.json();
}

export async function fetchBidReadinessReport(tenderId = 'gem-netsec-2026') {
  const res = await fetchWithTimeout(`${API_BASE}/tender/report/${tenderId}`, { method: 'GET' }, 25000);
  if (!res.ok) throw new Error('Failed to fetch report');
  return await res.json();
}

export async function fetchBidderProfile() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/bidder/profile`, { method: 'GET' }, 15000);
    if (!res.ok) throw new Error('Failed to fetch bidder profile');
    return await res.json();
  } catch (err) {
    console.error('[BidGuard] Error fetching profile:', err);
    return null;
  }
}

export async function updateBidderProfile(profile) {
  const res = await fetchWithTimeout(`${API_BASE}/bidder/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  }, 20000);

  if (!res.ok) throw new Error('Failed to update profile');
  return await res.json();
}
