# BidGuard AI

> **Tagline:** “Understand. Verify. Bid with Confidence.”  
> **Hackathon Theme:** Best Use of Google Gemini API  
> **Tracks:** AI / ML + Open Innovation  
> **Core USP:** *“Don’t just summarize the tender. Tell me whether I’m ready to bid.”*

---

## 🎯 Executive Summary & Purpose

Government and enterprise procurement tenders (such as GeM, Central/State PSUs, and CPWD tenders) are notorious for dense, hundreds-of-pages PDF documents filled with hidden disqualification criteria, tight turnover thresholds, mandatory certifications, and aggressive SLA penalty clauses.

Generic PDF summarizers fail bidders because an executive summary does not tell a company if it is **actually eligible to bid** or if a missing document will cause instant technical rejection.

**BidGuard AI** transforms complex procurement documents into an actionable, evidence-backed decision pipeline:
$$\text{Tender PDF} \longrightarrow \text{Gemini Ingestion} \longrightarrow \text{Extracted Requirements} \longrightarrow \text{Bidder Verification} \longrightarrow \text{Contract Risks} \longrightarrow \text{Bid Readiness Report}$$

---

## 🚀 Key Features & The 7 Screens

| Screen | Purpose & Capabilities |
| :--- | :--- |
| **1. Dashboard** | Real-time procurement pipeline overview, key metrics (*Active Tenders: 3*, *Requirements Extracted: 25*, *Needs Verification: 7*, *Critical Risks: 1*), and recent tenders table. |
| **2. Tender Upload** | Drag & drop PDF uploader with file metadata (size, page count), **"Use Demo Tender"** 1-click fast-track for hackathon judges, sample GeM tender PDF download, and progressive AI step indicator. |
| **3. Tender Intelligence** | Categorized requirements (*Eligibility, Technical, Financial, Documents, Important Dates, Key Clauses*) with **strict Page & Clause citations** (e.g. `Source: Page 12, Clause 6.1`). |
| **4. Compliance Check** | **Core USP:** Benchmarks extracted criteria against verified corporate credentials (*NovaTech Solutions Pvt. Ltd.*). Uses strictly 4 status categories: `✅ Satisfied`, `⚠️ Needs Verification`, `❌ Missing / Not Found`, and `ℹ️ Informational`. Supports live evidence updates. |
| **5. Risk Analysis** | Objective risk matrix categorized by `CRITICAL`, `HIGH`, `MEDIUM`, and `LOW` with *Why It Matters*, *Source Page Citation*, and *Recommended Mitigation Action*. |
| **6. Ask Your Tender** | Grounded **Gemini Tender Q&A** with clickable inquiry chips (*"What documents are mandatory?"*, *"What penalties are mentioned?"*), providing answers backed by page citations. |
| **7. Bid Readiness Report** | Executive decision packet with compliance summary, disqualification warnings, prioritized action checklist, and print-ready / JSON export capabilities with legal disclaimer. |

---

## 🧠 Google Gemini API Integration

The AI architecture is isolated within `backend/gemini_service.py` to ensure clean separation of concerns and production readiness:

1. **Document Understanding & Requirement Extraction:**
   - Extracts structured parameters (*Eligibility, Technical Specifications, Financial turnover/EMD, Required Document Checklist, Important Dates, Key Clauses*).
   - Generates page-level grounding references (`Source: Page X, Clause Y`).

2. **Compliance Reasoning Engine:**
   - Compares extracted criteria against bidder profile attributes (*Experience, Turnover, GST, Government Projects, ISO Certifications*).
   - Classifies status strictly into `Satisfied`, `Needs Verification`, `Missing / Not Found`, or `Informational`.

3. **Risk & Penalty Identification:**
   - Pinpoints non-waivable technical criteria (e.g., STQC / CERT-In firmware certificates, liquidated damages caps, and SLA penalties).

4. **Grounded Tender Q&A:**
   - Answers specific bidder questions using tender document context, always citing the relevant source page.

5. **Built-in Demo Mode Fallback:**
   - If `GEMINI_API_KEY` is not provided or API calls fail, BidGuard AI **automatically and gracefully activates DEMO MODE** with authentic GeM tender benchmark data. **Judges can evaluate the entire application end-to-end without needing an API key.**

---

## 🛠️ Tech Stack

- **Frontend:**
  - React 19 (Vite)
  - Tailwind CSS v4 (Enterprise B2B dark-navy & clean white palette)
  - Lucide React (Enterprise iconography)
  - Print-optimized CSS for executive PDF export
- **Backend:**
  - Python 3.11+
  - FastAPI
  - Pydantic v2 (Strict typing & validation schemas)
  - PyPDF (PDF text and metadata extraction)
  - ReportLab (Sample GeM tender PDF generator)
- **AI / LLM:**
  - Google Gemini API (`google-genai` SDK, model `gemini-2.5-flash`)
- **Deployment:**
  - Frontend: Deployable to Vercel (`vercel.json`)
  - Backend: Deployable to Render (`render.yaml` / `Procfile`)

---

## 📦 Project Structure

```
BidGuard/
├── backend/
│   ├── main.py                  # FastAPI application & REST endpoints
│   ├── gemini_service.py        # Gemini client, structured prompts & JSON parser
│   ├── schemas.py               # Pydantic data schemas
│   ├── demo_data.py             # Authentic GeM tender benchmark & QA database
│   ├── create_sample_pdf.py     # Script generating a 6-page GeM-style sample tender
│   ├── sample_gem_tender.pdf    # 6-page GeM-style sample tender for demo/testing
│   ├── requirements.txt         # Python dependencies
│   ├── Procfile                 # Cloud container procfile
│   └── .env.example             # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx            # Enterprise sidebar navigation
│   │   │   ├── TopBar.jsx             # Pipeline breadcrumb & bidder pill
│   │   │   ├── Toast.jsx              # Toast notification system
│   │   │   ├── BidderProfileModal.jsx # Company profile inspector & editor
│   │   │   └── EvidenceModal.jsx      # Compliance evidence override modal
│   │   ├── screens/
│   │   │   ├── DashboardScreen.jsx    # Screen 1: Dashboard
│   │   │   ├── UploadScreen.jsx       # Screen 2: Tender Ingestion
│   │   │   ├── AnalysisScreen.jsx     # Screen 3: Tender Intelligence
│   │   │   ├── ComplianceScreen.jsx   # Screen 4: Compliance Check
│   │   │   ├── RiskScreen.jsx         # Screen 5: Risk Analysis
│   │   │   ├── AskTenderScreen.jsx    # Screen 6: Ask Your Tender Q&A
│   │   │   └── ReportScreen.jsx       # Screen 7: Bid Readiness Report
│   │   ├── api.js                     # REST API service client
│   │   ├── App.jsx                    # Root state & screen router
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind styles & print CSS
│   ├── public/
│   │   └── sample_gem_tender.pdf      # Downloadable sample PDF for testing
│   ├── index.html                     # HTML head & Inter typography
│   ├── vite.config.js                 # Vite bundler & API proxy
│   ├── vercel.json                    # Vercel deployment configuration
│   └── package.json                   # Frontend dependencies
│
├── render.yaml                  # Render deployment configuration
├── start.ps1                    # One-click Windows PowerShell starter
├── start.sh                     # One-click Linux/macOS Bash starter
└── README.md                    # Project documentation
```

---

## ⚡ Quick Start: Running Locally

### Option A: One-Click Startup

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Linux / macOS (Bash):**
```bash
chmod +x start.sh
./start.sh
```

---

### Option B: Manual Step-by-Step

#### 1. Setup Backend

```bash
# Navigate to project root
cd c:\Projects\BidGuard

# (Optional) Set your Gemini API Key in backend/.env:
# GEMINI_API_KEY=your_key_here

# Install Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI backend
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```
Backend API will be running at `http://127.0.0.1:8000` (API Docs at `/docs`).

#### 2. Setup Frontend

```bash
# In another terminal window:
cd c:\Projects\BidGuard\frontend

# Install Node dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev -- --host 127.0.0.1 --port 3000
```
Open **`http://127.0.0.1:3000`** in your browser.

---

## 🏆 Hackathon Judging Walkthrough (10-Second Flow)

1. Open `http://127.0.0.1:3000/`.
2. Notice the clean B2B enterprise procurement dashboard with **Active Tenders**, **Extracted Requirements**, and the **BidGuard Intelligence Pipeline**.
3. Click **"Analyze New Tender"** or click **"Analyze Tender"** in the sidebar.
4. Click **"Use Demo Tender"** (or drag & drop `sample_gem_tender.pdf` downloaded via the link).
5. Watch the progressive Gemini extraction stages animate.
6. Explore **Tender Intelligence**: filter by *Technical, Financial, or Eligibility* to see evidence citations (e.g. `Source: Page 12, Clause 6.1`).
7. Click **"Compliance Check"**: benchmark against *NovaTech Solutions Pvt. Ltd.* Click **"Update"** on any item to see dynamic evidence editing.
8. Click **"Risk Analysis"**: inspect the `CRITICAL` risk regarding mandatory STQC / CERT-In firmware certificates.
9. Click **"Ask Your Tender"**: click any question chip (e.g., *"What penalties are mentioned?"*) to receive an instant, grounded answer with page citations.
10. Click **"Bid Readiness Report"**: view the executive report and click **"Export PDF / Print"** or **"Download JSON"**.

---

## ⚖️ Disclaimer

> *BidGuard AI helps identify requirements and potential gaps. Final bid decisions remain with the bidder.*
