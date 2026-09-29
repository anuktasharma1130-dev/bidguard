from typing import List, Optional, Literal
from pydantic import BaseModel, Field

StatusType = Literal["Satisfied", "Needs Verification", "Missing / Not Found", "Informational"]
SeverityType = Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]
RequirementCategory = Literal[
    "Eligibility Requirements",
    "Technical Requirements",
    "Financial Requirements",
    "Required Documents",
    "Important Dates",
    "Key Clauses"
]

class TenderRequirement(BaseModel):
    id: str
    category: RequirementCategory
    title: str
    description: str
    source_page: str = Field(description="Page reference in the tender document, e.g., 'Page 12'")
    mandatory: bool = True

class BidderProfile(BaseModel):
    company_name: str = "NovaTech Solutions Pvt. Ltd."
    experience_years: int = 5
    annual_turnover: str = "₹8 Cr"
    gst_status: str = "Verified"
    govt_projects: str = "2 completed projects with Central/State PSU"
    iso_certification: str = "ISO 9001:2015 Available"
    technical_certifications: str = "OEM Tier-1 System Integrator (Pending C-DAC test cert)"
    emd_prepared: bool = False
    additional_notes: Optional[str] = "Registered MSME enterprise; active GeM seller profile"

class ComplianceResult(BaseModel):
    id: str
    requirement_id: str
    requirement_title: str
    category: RequirementCategory
    source_page: str
    bidder_evidence: str
    status: StatusType
    reasoning: Optional[str] = None

class RiskItem(BaseModel):
    id: str
    severity: SeverityType
    risk_title: str
    why_it_matters: str
    source_page: str
    recommended_action: str

class TenderDeadline(BaseModel):
    event: str
    date_time: str
    source_page: str
    is_critical: bool = True

class TenderOverview(BaseModel):
    tender_id: str
    tender_title: str
    authority: str
    tender_ref: str
    estimated_value: str
    submission_deadline: str
    pre_bid_meeting: Optional[str] = None
    opening_date: Optional[str] = None
    pages_count: int = 24
    file_name: str = "GeM_Network_Security_Tender_2026.pdf"
    file_size: str = "3.8 MB"

class TenderQAItem(BaseModel):
    question: str
    answer: str
    source_page: str

class TenderAnalysisResponse(BaseModel):
    tender_overview: TenderOverview
    bidder_profile: BidderProfile
    requirements: List[TenderRequirement]
    compliance_results: List[ComplianceResult]
    risks: List[RiskItem]
    deadlines: List[TenderDeadline]
    suggested_questions: List[str]
    is_demo: bool = False

class BidReadinessReport(BaseModel):
    tender_overview: TenderOverview
    bidder_profile: BidderProfile
    summary_counts: dict
    satisfied_requirements: List[ComplianceResult]
    needs_verification_requirements: List[ComplianceResult]
    missing_requirements: List[ComplianceResult]
    critical_risks: List[RiskItem]
    all_risks: List[RiskItem]
    important_deadlines: List[TenderDeadline]
    recommended_next_actions: List[str]
    disclaimer: str = "BidGuard AI helps identify requirements and potential gaps. Final bid decisions remain with the bidder."

class AskRequest(BaseModel):
    question: str
    tender_id: Optional[str] = "gem-netsec-2026"

class ComplianceUpdateRequest(BaseModel):
    compliance_id: str
    status: StatusType
    bidder_evidence: str
