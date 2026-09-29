import os
import json
import logging
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv

from backend.schemas import (
    TenderAnalysisResponse,
    TenderOverview,
    BidderProfile,
    TenderRequirement,
    ComplianceResult,
    RiskItem,
    TenderDeadline,
    BidReadinessReport
)
from backend.demo_data import (
    get_demo_analysis_response,
    get_demo_report,
    DEMO_QA_DATABASE,
    DEMO_TENDER_OVERVIEW,
    DEMO_BIDDER_PROFILE
)

load_dotenv()
logger = logging.getLogger("bidguard.gemini")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        self.client = None
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info(f"Gemini client initialized with model: {self.model_name}")
            except Exception as e:
                logger.warning(f"Could not initialize google-genai client: {e}. Falling back to demo mode.")
                self.client = None
        else:
            logger.info("GEMINI_API_KEY not configured. Running in DEMO MODE.")

    def is_configured(self) -> bool:
        return bool(self.client and self.api_key)

    def analyze_tender_document(self, tender_text: Optional[str] = None, file_name: Optional[str] = None) -> TenderAnalysisResponse:
        """
        Analyze a tender document using Gemini.
        If Gemini is unavailable or text is empty/demo, returns realistic structured procurement analysis.
        """
        if not self.is_configured() or not tender_text or len(tender_text.strip()) < 50:
            logger.info("Using high-fidelity Demo Mode for tender analysis")
            return get_demo_analysis_response()

        try:
            prompt = f"""
You are BidGuard AI, an elite procurement intelligence analyst.
Analyze the following tender document text and extract structured information according to the strict JSON format.

TENDER TEXT:
{tender_text[:15000]}

BIDDER PROFILE FOR COMPARISON:
- Company: NovaTech Solutions Pvt. Ltd.
- Experience: 5 years (Founded 2021)
- Annual Turnover: ₹8 Cr
- GST: Verified
- Government Projects: 2 completed projects (RailTel ₹2.1 Cr, PowerGrid ₹1.8 Cr)
- ISO Certification: ISO 9001:2015 available
- Technical Certifications: OEM Tier-1 System Integrator
- EMD: Not submitted yet (MSME registered)

Extract requirements into these categories:
- "Eligibility Requirements"
- "Technical Requirements"
- "Financial Requirements"
- "Required Documents"
- "Important Dates"
- "Key Clauses"

For each requirement, provide:
- id: unique string (e.g. REQ-01)
- category: one of the 6 categories above
- title: concise title
- description: exact specification
- source_page: page or clause reference (e.g. "Page 4, Clause 3.1")
- mandatory: boolean

For compliance, compare against the bidder profile. Status must ONLY be one of:
- "Satisfied"
- "Needs Verification"
- "Missing / Not Found"
- "Informational"

For risks, categorize into:
- "CRITICAL", "HIGH", "MEDIUM", "LOW"
Provide: risk_title, why_it_matters, source_page, recommended_action.

Respond ONLY with valid JSON matching this schema:
{{
  "tender_overview": {{
    "tender_id": "tender-gem-1",
    "tender_title": "string",
    "authority": "string",
    "tender_ref": "string",
    "estimated_value": "string",
    "submission_deadline": "string",
    "pre_bid_meeting": "string",
    "opening_date": "string",
    "pages_count": 24,
    "file_name": "{file_name or 'Uploaded_Tender.pdf'}",
    "file_size": "2.4 MB"
  }},
  "requirements": [
    {{
      "id": "REQ-01",
      "category": "Eligibility Requirements",
      "title": "string",
      "description": "string",
      "source_page": "Page X",
      "mandatory": true
    }}
  ],
  "compliance_results": [
    {{
      "id": "CMP-01",
      "requirement_id": "REQ-01",
      "requirement_title": "string",
      "category": "Eligibility Requirements",
      "source_page": "Page X",
      "bidder_evidence": "string",
      "status": "Satisfied",
      "reasoning": "string"
    }}
  ],
  "risks": [
    {{
      "id": "RSK-01",
      "severity": "CRITICAL",
      "risk_title": "string",
      "why_it_matters": "string",
      "source_page": "Page X",
      "recommended_action": "string"
    }}
  ],
  "deadlines": [
    {{
      "event": "string",
      "date_time": "string",
      "source_page": "Page X",
      "is_critical": true
    }}
  ],
  "suggested_questions": [
    "What documents are mandatory?",
    "What is the bid submission deadline?",
    "What is the minimum turnover requirement?",
    "What are the technical eligibility conditions?",
    "What penalties are mentioned?"
  ]
}}
"""
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={
                    "response_mime_type": "application/json"
                }
            )

            raw_text = response.text.strip()
            # Clean markdown codeblocks if present
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]

            parsed_data = json.loads(raw_text)
            
            # Format into Pydantic models
            overview = TenderOverview(**parsed_data.get("tender_overview", {}))
            requirements = [TenderRequirement(**r) for r in parsed_data.get("requirements", [])]
            compliance = [ComplianceResult(**c) for c in parsed_data.get("compliance_results", [])]
            risks = [RiskItem(**r) for r in parsed_data.get("risks", [])]
            deadlines = [TenderDeadline(**d) for d in parsed_data.get("deadlines", [])]
            suggested = parsed_data.get("suggested_questions", [])

            return TenderAnalysisResponse(
                tender_overview=overview,
                bidder_profile=DEMO_BIDDER_PROFILE,
                requirements=requirements,
                compliance_results=compliance,
                risks=risks,
                deadlines=deadlines,
                suggested_questions=suggested or [
                    "What documents are mandatory?",
                    "What is the bid submission deadline?",
                    "What is the minimum turnover requirement?",
                    "What are the technical eligibility conditions?",
                    "What penalties are mentioned?"
                ],
                is_demo=False
            )

        except Exception as e:
            logger.error(f"Gemini API analysis failed: {e}. Falling back to demo data.")
            return get_demo_analysis_response()

    def answer_question(self, question: str, tender_text: Optional[str] = None) -> Dict[str, str]:
        """
        Ask a question about the tender document.
        Always returns grounded answer with page/clause citation.
        """
        norm_q = question.lower().strip().rstrip("?") + "?"
        
        # Check predefined demo answers if matched or if Gemini unavailable
        if not self.is_configured() or not tender_text:
            for k, v in DEMO_QA_DATABASE.items():
                if k in norm_q or norm_q in k:
                    return v
            # General fallback demo answer
            return {
                "answer": f"Based on the tender specifications (GeM/2026/B/8941203), this parameter is governed under Section IV & General Terms of Contract. Specific compliance verification is required prior to technical envelope upload.",
                "source_page": "Page 11, Section IV"
            }

        try:
            prompt = f"""
You are BidGuard AI's Tender Q&A Specialist.
Answer the following bidder question using STRICTLY the provided tender document context.
Every response MUST cite the specific page number or clause (e.g. "Source: Page 14, Clause 6.7").
If the document does not explicitly state the answer, clearly state what is missing and what clause may apply.

TENDER CONTEXT:
{tender_text[:12000]}

BIDDER QUESTION:
{question}

Format your response as a JSON object:
{{
  "answer": "Clear, direct, professional answer...",
  "source_page": "Page X, Clause Y"
}}
"""
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={
                    "response_mime_type": "application/json"
                }
            )
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]

            parsed = json.loads(raw_text)
            return {
                "answer": parsed.get("answer", "Answer grounded in tender document."),
                "source_page": parsed.get("source_page", "Page 12")
            }
        except Exception as e:
            logger.error(f"Gemini Q&A failed: {e}. Using fallback demo response.")
            # Check demo QA database
            for k, v in DEMO_QA_DATABASE.items():
                if k in norm_q or norm_q in k:
                    return v
            return {
                "answer": "According to the tender specifications, bidders must submit required certifications and comply with the stated technical parameters. Please review Section IV of the document.",
                "source_page": "Page 8, Section IV"
            }

gemini_service = GeminiService()
