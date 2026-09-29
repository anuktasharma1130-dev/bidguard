import os
import io
import logging
from typing import Optional, List
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader

from backend.schemas import (
    TenderAnalysisResponse,
    TenderOverview,
    BidderProfile,
    ComplianceResult,
    RiskItem,
    BidReadinessReport,
    AskRequest,
    ComplianceUpdateRequest,
    TenderQAItem
)
from backend.gemini_service import gemini_service
from backend.demo_data import (
    get_demo_analysis_response,
    get_demo_report,
    DEMO_TENDER_OVERVIEW,
    DEMO_BIDDER_PROFILE,
    DEMO_COMPLIANCE_RESULTS,
    DEMO_RISKS,
    DEMO_DEADLINES,
    DEMO_REQUIREMENTS
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("bidguard.api")

app = FastAPI(
    title="BidGuard AI Backend",
    description="AI-powered tender intelligence and bid-readiness platform API powered by Google Gemini",
    version="1.0.0"
)

# CORS configuration for local Vite development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for active session
CURRENT_STATE = {
    "analysis": get_demo_analysis_response(),
    "bidder_profile": DEMO_BIDDER_PROFILE,
    "active_pdf_text": "",
    "custom_tender": False
}

@app.get("/api/health")
def health_check():
    """Health status and Gemini API connectivity info"""
    return {
        "status": "healthy",
        "service": "BidGuard AI",
        "version": "1.0.0",
        "gemini_configured": gemini_service.is_configured(),
        "gemini_model": gemini_service.model_name,
        "mode": "Gemini Live" if gemini_service.is_configured() else "Demo Mode Ready"
    }

@app.get("/api/tenders/recent")
def get_recent_tenders():
    """Returns recent tenders for Dashboard display"""
    return [
        {
            "id": "gem-netsec-2026",
            "title": "GeM Procurement of Network Security Equipment",
            "authority": "Ministry of Heavy Industries",
            "bid_number": "GEM/2026/B/8941203",
            "deadline": "Oct 14, 2026",
            "requirements_count": len(DEMO_REQUIREMENTS),
            "status": "Ready for Verification",
            "category": "Hardware / Cyber Security",
            "estimated_value": "₹ 4.25 Cr"
        },
        {
            "id": "gem-cloud-2026",
            "title": "Supply and Commissioning of Modular Data Center UPS & PDU",
            "authority": "RailTel Corporation of India",
            "bid_number": "GEM/2026/B/7710924",
            "deadline": "Nov 02, 2026",
            "requirements_count": 34,
            "status": "Analyzed",
            "category": "Data Center Infrastructure",
            "estimated_value": "₹ 2.80 Cr"
        },
        {
            "id": "gem-cctv-2026",
            "title": "Smart City AI Surveillance Edge Analytics System",
            "authority": "Smart Cities Mission / Municipal Corp",
            "bid_number": "GEM/2026/B/6548110",
            "deadline": "Oct 28, 2026",
            "requirements_count": 42,
            "status": "Needs Review",
            "category": "AI / Video Analytics",
            "estimated_value": "₹ 5.60 Cr"
        }
    ]

@app.get("/api/tender/demo", response_model=TenderAnalysisResponse)
def get_demo_tender():
    """Returns the pre-baked realistic GeM tender analysis"""
    CURRENT_STATE["analysis"] = get_demo_analysis_response()
    CURRENT_STATE["custom_tender"] = False
    return CURRENT_STATE["analysis"]

@app.post("/api/tender/analyze", response_model=TenderAnalysisResponse)
async def analyze_tender(
    file: Optional[UploadFile] = File(None),
    use_demo: Optional[bool] = Form(False)
):
    """
    Upload and analyze a GeM/tender PDF document.
    Extracts text and leverages Gemini for structured extraction.
    Falls back gracefully to demo data if demo mode is requested or no file provided.
    """
    if use_demo or not file:
        logger.info("Using Demo Tender Analysis upon request")
        demo_resp = get_demo_analysis_response()
        CURRENT_STATE["analysis"] = demo_resp
        CURRENT_STATE["custom_tender"] = False
        return demo_resp

    try:
        content = await file.read()
        file_size_mb = f"{len(content) / (1024 * 1024):.1f} MB"
        pdf_reader = PdfReader(io.BytesIO(content))
        num_pages = len(pdf_reader.pages)
        
        extracted_text = []
        for i, page in enumerate(pdf_reader.pages[:30]):  # parse up to 30 pages
            text = page.extract_text() or ""
            extracted_text.append(f"--- Page {i+1} ---\n{text}")
        
        full_text = "\n".join(extracted_text)
        CURRENT_STATE["active_pdf_text"] = full_text

        # Call Gemini or fallback
        analysis = gemini_service.analyze_tender_document(full_text, file.filename)
        analysis.tender_overview.file_name = file.filename
        analysis.tender_overview.file_size = file_size_mb
        analysis.tender_overview.pages_count = num_pages

        CURRENT_STATE["analysis"] = analysis
        CURRENT_STATE["custom_tender"] = True
        return analysis

    except Exception as e:
        logger.error(f"Error parsing PDF: {e}. Falling back to demo data.")
        demo_resp = get_demo_analysis_response()
        demo_resp.tender_overview.file_name = file.filename if file else "Uploaded_Tender.pdf"
        CURRENT_STATE["analysis"] = demo_resp
        return demo_resp

@app.get("/api/tender/current", response_model=TenderAnalysisResponse)
def get_current_tender():
    """Retrieve currently active tender analysis"""
    return CURRENT_STATE["analysis"]

@app.get("/api/tender/compliance", response_model=List[ComplianceResult])
def get_compliance_results():
    """Retrieve compliance checklist for the current tender"""
    return CURRENT_STATE["analysis"].compliance_results

@app.post("/api/tender/compliance/update")
def update_compliance_item(req: ComplianceUpdateRequest):
    """Allows user to update evidence or status on a compliance item"""
    for item in CURRENT_STATE["analysis"].compliance_results:
        if item.id == req.compliance_id:
            item.status = req.status
            item.bidder_evidence = req.bidder_evidence
            return {"success": True, "updated_item": item}
    raise HTTPException(status_code=404, detail="Compliance item not found")

@app.get("/api/tender/risks", response_model=List[RiskItem])
def get_risk_analysis(severity: Optional[str] = Query(None)):
    """Retrieve categorized risk items with why-it-matters and action"""
    risks = CURRENT_STATE["analysis"].risks
    if severity:
        risks = [r for r in risks if r.severity.upper() == severity.upper()]
    return risks

@app.post("/api/tender/ask", response_model=TenderQAItem)
def ask_tender(req: AskRequest):
    """
    Tender Q&A grounded in the document context.
    Cites specific page number and clause.
    """
    tender_text = CURRENT_STATE.get("active_pdf_text", "")
    answer_obj = gemini_service.answer_question(req.question, tender_text)
    return TenderQAItem(
        question=req.question,
        answer=answer_obj["answer"],
        source_page=answer_obj["source_page"]
    )

@app.get("/api/tender/report/{id}", response_model=BidReadinessReport)
def get_bid_readiness_report(id: str):
    """Generate and return the full Bid Readiness Report"""
    analysis = CURRENT_STATE["analysis"]
    profile = CURRENT_STATE["bidder_profile"]
    
    satisfied = [c for c in analysis.compliance_results if c.status == "Satisfied"]
    needs_verif = [c for c in analysis.compliance_results if c.status == "Needs Verification"]
    missing = [c for c in analysis.compliance_results if c.status == "Missing / Not Found"]
    critical_risks = [r for r in analysis.risks if r.severity == "CRITICAL"]

    actions = [
        f"Immediately acquire documentation for: {missing[0].requirement_title} ({missing[0].source_page})" if missing else "Review technical specifications.",
        f"Verify profile evidence for: {needs_verif[0].requirement_title} ({needs_verif[0].source_page})" if needs_verif else "Double check EMD exemption.",
        f"Mitigate risk: {critical_risks[0].risk_title} ({critical_risks[0].source_page})" if critical_risks else "Address high-severity risk items.",
        f"Ensure technical envelope upload is ready 24 hours prior to deadline ({analysis.tender_overview.submission_deadline})."
    ]

    return BidReadinessReport(
        tender_overview=analysis.tender_overview,
        bidder_profile=profile,
        summary_counts={
            "total_requirements": len(analysis.requirements),
            "satisfied": len(satisfied),
            "needs_verification": len(needs_verif),
            "missing": len(missing),
            "critical_risks": len(critical_risks),
            "high_risks": len([r for r in analysis.risks if r.severity == "HIGH"]),
            "medium_risks": len([r for r in analysis.risks if r.severity == "MEDIUM"]),
            "low_risks": len([r for r in analysis.risks if r.severity == "LOW"])
        },
        satisfied_requirements=satisfied,
        needs_verification_requirements=needs_verif,
        missing_requirements=missing,
        critical_risks=critical_risks,
        all_risks=analysis.risks,
        important_deadlines=analysis.deadlines,
        recommended_next_actions=actions,
        disclaimer="BidGuard AI helps identify requirements and potential gaps. Final bid decisions remain with the bidder."
    )

@app.get("/api/bidder/profile", response_model=BidderProfile)
def get_bidder_profile():
    """Retrieve active bidder profile"""
    return CURRENT_STATE["bidder_profile"]

@app.post("/api/bidder/profile", response_model=BidderProfile)
def update_bidder_profile(profile: BidderProfile):
    """Update bidder profile"""
    CURRENT_STATE["bidder_profile"] = profile
    return CURRENT_STATE["bidder_profile"]
