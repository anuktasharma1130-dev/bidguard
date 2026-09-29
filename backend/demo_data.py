from backend.schemas import (
    TenderOverview,
    BidderProfile,
    TenderRequirement,
    ComplianceResult,
    RiskItem,
    TenderDeadline,
    TenderAnalysisResponse,
    BidReadinessReport
)

DEMO_TENDER_OVERVIEW = TenderOverview(
    tender_id="gem-netsec-2026",
    tender_title="Procurement of Enterprise Network Security Equipment & Managed Firewalls",
    authority="Ministry of Heavy Industries & PSU Infrastructure Unit",
    tender_ref="GEM/2026/B/8941203",
    estimated_value="₹ 4.25 Crores",
    submission_deadline="October 14, 2026, 15:00 hrs IST",
    pre_bid_meeting="October 02, 2026, 11:00 hrs IST (Video Conference)",
    opening_date="October 14, 2026, 15:30 hrs IST",
    pages_count=24,
    file_name="GeM_Network_Security_Tender_GEM2026.pdf",
    file_size="3.8 MB"
)

DEMO_BIDDER_PROFILE = BidderProfile(
    company_name="NovaTech Solutions Pvt. Ltd.",
    experience_years=5,
    annual_turnover="₹8 Cr",
    gst_status="Verified",
    govt_projects="2 completed projects with Central/State PSU (RailTel ₹2.1 Cr, PowerGrid ₹1.8 Cr)",
    iso_certification="ISO 9001:2015 Available",
    technical_certifications="Tier-1 OEM Enterprise Partner (Pending C-DAC evaluation cert)",
    emd_prepared=False,
    additional_notes="Registered MSME Enterprise (Udyam: UDYAM-MH-01-002931)"
)

DEMO_REQUIREMENTS = [
    # Eligibility
    TenderRequirement(
        id="REQ-ELIG-01",
        category="Eligibility Requirements",
        title="Minimum 3 years relevant commercial experience",
        description="Bidder must have at least three (3) consecutive years of experience in supply, installation, and commissioning of enterprise network security hardware to Government / PSU / Autonomous bodies.",
        source_page="Page 4, Clause 3.1",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-ELIG-02",
        category="Eligibility Requirements",
        title="Valid Company Registration & Legal Incorporation",
        description="Bidder must be a legal entity registered under the Companies Act 2013 / LLP Act with valid certificate of incorporation.",
        source_page="Page 4, Clause 3.2",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-ELIG-03",
        category="Eligibility Requirements",
        title="Past Government / PSU project supply credentials",
        description="Bidder must have successfully executed at least 2 similar orders of value not less than ₹ 1.5 Cr each for Central/State Govt or PSUs in the last 3 financial years.",
        source_page="Page 5, Clause 3.4",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-ELIG-04",
        category="Eligibility Requirements",
        title="Non-Blacklisting Undertaking",
        description="The bidder must not be debarred, blacklisted, or put on holiday list by GeM, Central/State Governments, or any Public Sector Undertaking.",
        source_page="Page 6, Clause 3.9",
        mandatory=True
    ),

    # Technical
    TenderRequirement(
        id="REQ-TECH-01",
        category="Technical Requirements",
        title="Next-Gen Firewall (NGFW) Throughput & Architecture",
        description="Firewall appliances must offer minimum 40 Gbps firewall throughput, 12 Gbps SSL/TLS deep inspection, with redundant hot-swappable AC power supplies.",
        source_page="Page 8, Clause 1.2",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-TECH-02",
        category="Technical Requirements",
        title="Common Criteria EAL4+ or FIPS 140-3 Validation",
        description="The offered security operating system / cryptographic hardware must possess active Common Criteria EAL4+ or NIST FIPS 140-3 Level 2/3 certification.",
        source_page="Page 9, Clause 2.4",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-TECH-03",
        category="Technical Requirements",
        title="5-Year Comprehensive OEM Warranty & Support SLA",
        description="Comprehensive 24x7x365 on-site OEM warranty for 5 years with mandatory 4-hour Mean Time to Resolution (MTTR) SLA.",
        source_page="Page 11, Clause 5.1",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-TECH-04",
        category="Technical Requirements",
        title="Tender-Specific Manufacturer Authorization Form (MAF)",
        description="Direct OEM authorization addressed specifically to this tender bid number committing to guarantee 7 years spares availability and technical backing.",
        source_page="Page 11, Clause 5.3",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-TECH-05",
        category="Technical Requirements",
        title="STQC / CERT-In Lab Security Evaluation Certificate",
        description="Firmware and operating system must carry a clean security evaluation and zero-backdoor test report from an STQC or CERT-In empanelled laboratory.",
        source_page="Page 18, Clause 9.6",
        mandatory=True
    ),

    # Financial
    TenderRequirement(
        id="REQ-FIN-01",
        category="Financial Requirements",
        title="Minimum Annual Turnover Requirement (₹ 5.0 Crores)",
        description="Average annual financial turnover of the bidder during the last 3 financial years must be at least ₹ 5.0 Crores, duly certified by a Chartered Accountant with valid UDIN.",
        source_page="Page 12, Clause 6.1",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-FIN-02",
        category="Financial Requirements",
        title="Earnest Money Deposit (EMD) Requirement (₹ 8.5 Lakhs)",
        description="EMD of ₹ 8,50,000/- must be submitted via Bank Guarantee or online payment on GeM portal. Valid MSME / Startup exemptions applicable as per GeM GTC.",
        source_page="Page 13, Clause 6.3",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-FIN-03",
        category="Financial Requirements",
        title="Performance Bank Guarantee (5% Contract Value)",
        description="The successful bidder must furnish a Performance Security of 5% of total contract value within 15 calendar days from issuance of Notification of Award.",
        source_page="Page 14, Clause 6.7",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-FIN-04",
        category="Financial Requirements",
        title="Bank Solvency Certificate (₹ 2.0 Crores)",
        description="Current Solvency Certificate issued by a Scheduled Commercial Bank for an amount not less than ₹ 2.0 Crores dated within last 90 days.",
        source_page="Page 14, Clause 6.9",
        mandatory=True
    ),

    # Required Documents
    TenderRequirement(
        id="REQ-DOC-01",
        category="Required Documents",
        title="Company Registration & Certificate of Incorporation",
        description="Scanned copy of Certificate of Incorporation, Memorandum of Association (MoA) and Articles of Association (AoA).",
        source_page="Page 15, Checklist Item 1",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-DOC-02",
        category="Required Documents",
        title="GST Certificate & Latest GSTR-3B Return Acknowledgment",
        description="Valid GSTIN certificate with proof of tax filing for the preceding quarter.",
        source_page="Page 15, Checklist Item 2",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-DOC-03",
        category="Required Documents",
        title="Audited Balance Sheets with CA UDIN",
        description="Audited profit and loss accounts and balance sheets for FY 2023-24, 2024-25, and 2025-26 with CA seal, signature and UDIN.",
        source_page="Page 15, Checklist Item 3",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-DOC-04",
        category="Required Documents",
        title="Past Performance & Client Completion Certificates",
        description="Certified copies of Work Orders and Client Satisfactory Completion Certificates for past government PSU supplies.",
        source_page="Page 16, Checklist Item 5",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-DOC-05",
        category="Required Documents",
        title="Signed Technical Compliance Sheet with OEM Datasheets",
        description="Line-by-line compliance statement signed on bidder letterhead along with highlighted original OEM technical datasheets.",
        source_page="Page 16, Checklist Item 6",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-DOC-06",
        category="Required Documents",
        title="ISO 9001 and ISO 27001 Certifications",
        description="Valid ISO 9001:2015 Quality Management and ISO/IEC 27001 Information Security Management certifications.",
        source_page="Page 16, Checklist Item 8",
        mandatory=True
    ),

    # Important Dates
    TenderRequirement(
        id="REQ-DATE-01",
        category="Important Dates",
        title="Pre-Bid Query Submission Cutoff",
        description="All bidder clarifications and pre-bid questions must be submitted via GeM portal before September 30, 2026, 17:00 hrs IST.",
        source_page="Page 2, Bid Schedule",
        mandatory=False
    ),
    TenderRequirement(
        id="REQ-DATE-02",
        category="Important Dates",
        title="Pre-Bid Conference",
        description="Virtual pre-bid conference scheduled for October 02, 2026 at 11:00 hrs IST.",
        source_page="Page 2, Bid Schedule",
        mandatory=False
    ),
    TenderRequirement(
        id="REQ-DATE-03",
        category="Important Dates",
        title="Bid Submission Deadline",
        description="Final electronic submission of technical and financial bids on GeM portal by October 14, 2026, 15:00 hrs IST.",
        source_page="Page 2, Bid Schedule",
        mandatory=True
    ),

    # Key Clauses
    TenderRequirement(
        id="REQ-CLAUSE-01",
        category="Key Clauses",
        title="Liquidated Damages (LD) Penalty Clause",
        description="Late deliveries or commissioning delay will attract liquidated damages of 0.5% per week of delay subject to a maximum ceiling of 10% of total contract value.",
        source_page="Page 20, Clause 12.1",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-CLAUSE-02",
        category="Key Clauses",
        title="SLA Downtime Penalty Clause",
        description="Downtime exceeding the 4-hour resolution SLA window will incur a penalty of ₹ 5,000 per hour per site, deductible from invoice or performance bank guarantee.",
        source_page="Page 21, Clause 13.4",
        mandatory=True
    ),
    TenderRequirement(
        id="REQ-CLAUSE-03",
        category="Key Clauses",
        title="Public Procurement Make in India (PPP-MII) Preference",
        description="Class-I Local Supplier (minimum 50% local content) shall be given purchase preference over Class-II and Non-local suppliers as per Government guidelines.",
        source_page="Page 22, Clause 15.1",
        mandatory=False
    )
]

DEMO_COMPLIANCE_RESULTS = [
    ComplianceResult(
        id="CMP-01",
        requirement_id="REQ-ELIG-01",
        requirement_title="3+ years relevant commercial experience",
        category="Eligibility Requirements",
        source_page="Page 4, Clause 3.1",
        bidder_evidence="5 years active business operations (Incorporated in 2021)",
        status="Satisfied",
        reasoning="Bidder has 5 verified years of operations in system integration and IT infrastructure, exceeding the 3-year threshold."
    ),
    ComplianceResult(
        id="CMP-02",
        requirement_id="REQ-FIN-01",
        requirement_title="Minimum annual turnover ₹5 Cr",
        category="Financial Requirements",
        source_page="Page 12, Clause 6.1",
        bidder_evidence="₹8 Cr certified average annual turnover across last 3 FYs",
        status="Satisfied",
        reasoning="Audited financial figures confirm ₹8.2 Cr (FY24), ₹7.9 Cr (FY25), ₹8.4 Cr (FY26), comfortably meeting ₹5.0 Cr requirement."
    ),
    ComplianceResult(
        id="CMP-03",
        requirement_id="REQ-ELIG-02",
        requirement_title="Valid company registration & incorporation",
        category="Eligibility Requirements",
        source_page="Page 4, Clause 3.2",
        bidder_evidence="Certificate of Incorporation (CIN: U72900MH2021PTC361284)",
        status="Satisfied",
        reasoning="Verified active status on Ministry of Corporate Affairs (MCA) portal."
    ),
    ComplianceResult(
        id="CMP-04",
        requirement_id="REQ-ELIG-03",
        requirement_title="Required previous government project (>₹1.5 Cr)",
        category="Eligibility Requirements",
        source_page="Page 5, Clause 3.4",
        bidder_evidence="2 completed PSU projects: RailTel (₹2.1 Cr) & PowerGrid (₹1.8 Cr)",
        status="Satisfied",
        reasoning="Work completion certificates and final invoice payment proofs verified."
    ),
    ComplianceResult(
        id="CMP-05",
        requirement_id="REQ-DOC-02",
        category="Required Documents",
        requirement_title="GST Certificate & latest GSTR-3B",
        source_page="Page 15, Checklist Item 2",
        bidder_evidence="GSTIN 27AABCN1234F1Z8 active with latest filing acknowledged",
        status="Satisfied",
        reasoning="Verified on GST common portal with zero tax arrears."
    ),
    ComplianceResult(
        id="CMP-06",
        requirement_id="REQ-DOC-06",
        requirement_title="ISO Certification (ISO 9001 & ISO 27001)",
        category="Required Documents",
        source_page="Page 16, Checklist Item 8",
        bidder_evidence="ISO 9001:2015 available; ISO 27001 certificate not uploaded",
        status="Needs Verification",
        reasoning="Tender lists both ISO 9001 and ISO 27001. Bidder has ISO 9001 but missing ISO 27001. Clarification needed if OEM's ISO 27001 can be submitted."
    ),
    ComplianceResult(
        id="CMP-07",
        requirement_id="REQ-FIN-02",
        requirement_title="Earnest Money Deposit (EMD) ₹8,50,000",
        category="Financial Requirements",
        source_page="Page 13, Clause 6.3",
        bidder_evidence="Not found in bidder profile; Udyam MSME certificate available",
        status="Needs Verification",
        reasoning="Under GeM GTC, registered MSMEs are eligible for EMD exemption. Must verify if bidder's NIC code on Udyam registration covers network security hardware supply."
    ),
    ComplianceResult(
        id="CMP-08",
        requirement_id="REQ-FIN-04",
        requirement_title="Bank Solvency Certificate ₹2.0 Cr",
        category="Financial Requirements",
        source_page="Page 14, Clause 6.9",
        bidder_evidence="Previous solvency certificate dated November 2025 (older than 90 days)",
        status="Needs Verification",
        reasoning="Tender requires solvency letter dated within 90 days of bid release. Current certificate has expired; fresh bank certificate must be generated."
    ),
    ComplianceResult(
        id="CMP-09",
        requirement_id="REQ-TECH-04",
        requirement_title="Tender-Specific Manufacturer Authorization (MAF)",
        category="Technical Requirements",
        source_page="Page 11, Clause 5.3",
        bidder_evidence="General distributor authorization letter on file; tender-specific MAF pending",
        status="Needs Verification",
        reasoning="Tender explicitly rejects generic distributor letters. Formal MAF with bid reference GEM/2026/B/8941203 must be signed by OEM."
    ),
    ComplianceResult(
        id="CMP-10",
        requirement_id="REQ-TECH-05",
        requirement_title="STQC / CERT-In Lab Security Evaluation Certificate",
        category="Technical Requirements",
        source_page="Page 18, Clause 9.6",
        bidder_evidence="Not available in bidder repository",
        status="Missing / Not Found",
        reasoning="Mandatory security evaluation report for firewall firmware is not present in bidder documents. Critical failure risk if omitted."
    ),
    ComplianceResult(
        id="CMP-11",
        requirement_id="REQ-ELIG-04",
        requirement_title="Non-Blacklisting Undertaking on Stamp Paper",
        category="Eligibility Requirements",
        source_page="Page 6, Clause 3.9",
        bidder_evidence="Draft text exists; notarized ₹100 non-judicial stamp paper missing",
        status="Missing / Not Found",
        reasoning="Document must be executed on ₹100 non-judicial stamp paper, notarized, and uploaded as part of technical envelope."
    ),
    ComplianceResult(
        id="CMP-12",
        requirement_id="REQ-TECH-03",
        requirement_title="5-Year Comprehensive Warranty & 4-Hr MTTR SLA",
        category="Technical Requirements",
        source_page="Page 11, Clause 5.1",
        bidder_evidence="Standard 3-year warranty provided by OEM distributor",
        status="Needs Verification",
        reasoning="Need written back-to-back OEM warranty extension confirmation for years 4 and 5, including 4-hour SLA penalty indemnification."
    ),
    ComplianceResult(
        id="CMP-13",
        requirement_id="REQ-CLAUSE-01",
        requirement_title="Liquidated damages clause (0.5%/week up to 10%)",
        category="Key Clauses",
        source_page="Page 20, Clause 12.1",
        bidder_evidence="Standard commercial term acknowledged",
        status="Informational",
        reasoning="Legal and commercial terms noted. Delivery timelines must be strictly mapped against inventory dispatch."
    ),
    ComplianceResult(
        id="CMP-14",
        requirement_id="REQ-CLAUSE-03",
        requirement_title="Make in India (PPP-MII) Local Content Preference",
        category="Key Clauses",
        source_page="Page 22, Clause 15.1",
        bidder_evidence="Self-declaration template prepared (calculating BOM local content)",
        status="Informational",
        reasoning="Class-I supplier status confers purchase preference. Verifying local assembly content percentage."
    )
]

DEMO_RISKS = [
    RiskItem(
        id="RSK-01",
        severity="CRITICAL",
        risk_title="Missing mandatory STQC / CERT-In security evaluation certificate",
        why_it_matters="Requirement appears in the technical eligibility section (Clause 9.6) and is classified as non-waivable mandatory criteria. Bids lacking this evaluation are subject to immediate technical disqualification before financial opening.",
        source_page="Page 18, Clause 9.6",
        recommended_action="Contact OEM technical compliance desk immediately to retrieve the CERT-In empanelled lab certificate for the exact firewall firmware model."
    ),
    RiskItem(
        id="RSK-02",
        severity="HIGH",
        risk_title="EMD exemption documentation unverified for GeM bid",
        why_it_matters="Tender requires ₹ 8,50,000 EMD. If claiming MSME exemption, the registered Udyam NIC code must specifically encompass enterprise security appliances; otherwise GeM automated checks will flag the bid.",
        source_page="Page 13, Clause 6.3",
        recommended_action="Confirm Udyam registration NIC codes (Computer Hardware / Security Systems) or arrange Bank Guarantee for ₹ 8.5 Lakhs 4 days before bid submission."
    ),
    RiskItem(
        id="RSK-03",
        severity="HIGH",
        risk_title="Liquidated damages cap of 10% coupled with ₹ 5,000/hr SLA penalty",
        why_it_matters="Clause 13.4 imposes steep liquidated penalties if on-site engineer does not resolve hardware faults within 4 hours. Without OEM back-to-back commitment, the bidder absorbs all financial liability.",
        source_page="Page 21, Clause 13.4",
        recommended_action="Execute a binding back-to-back SLA contract with OEM distributor ensuring 4-hour on-site spare replacement across all tender locations."
    ),
    RiskItem(
        id="RSK-04",
        severity="MEDIUM",
        risk_title="Expired Bank Solvency Certificate",
        why_it_matters="Bidder's existing solvency certificate is dated November 2025. Tender specifies solvency certificate must be issued within 90 days of bid publish date.",
        source_page="Page 14, Clause 6.9",
        recommended_action="Submit formal request to bank branch for an updated Solvency Certificate of ₹ 2.0 Cr issued in current month."
    ),
    RiskItem(
        id="RSK-05",
        severity="MEDIUM",
        risk_title="Partial ISO compliance (Missing ISO 27001)",
        why_it_matters="Tender checklist mentions ISO 9001 and ISO 27001. Submitting only ISO 9001 might lead to technical query or deduction during evaluation.",
        source_page="Page 16, Checklist Item 8",
        recommended_action="Raise query in Pre-Bid meeting on October 02 asking if OEM's ISO 27001 certificate is acceptable in lieu of bidder's certification."
    ),
    RiskItem(
        id="RSK-06",
        severity="LOW",
        risk_title="Non-blacklisting declaration notarization requirement",
        why_it_matters="Self-declaration must be printed on ₹ 100 non-judicial stamp paper and notarized. A simple letterhead print will be rejected.",
        source_page="Page 6, Clause 3.9",
        recommended_action="Purchase ₹ 100 stamp paper and notarize with authorized signatory seal."
    )
]

DEMO_DEADLINES = [
    TenderDeadline(
        event="Bid Publish Date on GeM Portal",
        date_time="September 22, 2026, 10:00 hrs IST",
        source_page="Page 2, Bid Notice",
        is_critical=False
    ),
    TenderDeadline(
        event="Pre-Bid Query Submission Cutoff",
        date_time="September 30, 2026, 17:00 hrs IST",
        source_page="Page 2, Bid Notice",
        is_critical=True
    ),
    TenderDeadline(
        event="Pre-Bid Conference (Virtual VC)",
        date_time="October 02, 2026, 11:00 hrs IST",
        source_page="Page 2, Bid Notice",
        is_critical=False
    ),
    TenderDeadline(
        event="Bid Submission End Date (Technical & Financial)",
        date_time="October 14, 2026, 15:00 hrs IST",
        source_page="Page 2, Bid Notice",
        is_critical=True
    ),
    TenderDeadline(
        event="Technical Bid Opening",
        date_time="October 14, 2026, 15:30 hrs IST",
        source_page="Page 2, Bid Notice",
        is_critical=True
    )
]

DEMO_SUGGESTED_QUESTIONS = [
    "What documents are mandatory?",
    "What is the bid submission deadline?",
    "What is the minimum turnover requirement?",
    "What are the technical eligibility conditions?",
    "What penalties are mentioned?",
    "What are the EMD requirements and exemptions?"
]

DEMO_QA_DATABASE = {
    "what documents are mandatory?": {
        "answer": "According to the tender checklist, mandatory documents include: 1) Company Registration / Incorporation Certificate; 2) Valid GST Certificate with latest GSTR-3B; 3) Audited Balance Sheets for last 3 financial years with CA UDIN; 4) Satisfactory Performance / Client Completion Certificates from PSU/Govt clients; 5) Signed and stamped Technical Compliance Sheet with OEM datasheets; 6) Tender-specific OEM Authorization Form (MAF); 7) Non-blacklisting declaration on ₹ 100 stamp paper; 8) EMD guarantee or valid MSME Udyam registration certificate.",
        "source_page": "Page 15-16, Section V Checklist"
    },
    "what is the bid submission deadline?": {
        "answer": "The final bid submission deadline for both Technical and Financial envelopes is October 14, 2026, at 15:00 hrs IST through the GeM portal. Technical bids will be opened on the same day at 15:30 hrs IST. Note that the pre-bid query cutoff is September 30, 2026 at 17:00 hrs.",
        "source_page": "Page 2, Notice Inviting Bid"
    },
    "what is the minimum turnover requirement?": {
        "answer": "The bidder must have an Average Annual Financial Turnover of at least ₹ 5.0 Crores across the preceding three financial years (FY 2023-24, FY 2024-25, and FY 2025-26). This must be substantiated by audited Profit & Loss statements certified by a practicing Chartered Accountant with a valid UDIN.",
        "source_page": "Page 12, Clause 6.1"
    },
    "what are the technical eligibility conditions?": {
        "answer": "Key technical conditions include: 1) Enterprise Next-Gen Firewall (NGFW) with minimum 40 Gbps firewall throughput and 12 Gbps SSL/TLS inspection; 2) Common Criteria EAL4+ or FIPS 140-3 validation for the cryptographic architecture; 3) Mandatory 5-year comprehensive on-site OEM warranty with 4-hour MTTR SLA; 4) Tender-specific Manufacturer Authorization Form (MAF) from the OEM; 5) Firmware evaluation certificate from an STQC or CERT-In empanelled lab.",
        "source_page": "Page 8-11 & Page 18, Section IV"
    },
    "what penalties are mentioned?": {
        "answer": "The tender specifies two major penalty provisions: 1) Liquidated Damages (LD) of 0.5% of total contract value per week of delay in delivery or commissioning, capped at a maximum of 10% (Page 20, Clause 12.1); 2) Service Level Agreement (SLA) penalty of ₹ 5,000 per hour per site for equipment downtime exceeding the 4-hour resolution window, directly deductible from performance security or pending invoices (Page 21, Clause 13.4).",
        "source_page": "Page 20-21, Clauses 12.1 & 13.4"
    },
    "what are the emd requirements and exemptions?": {
        "answer": "The Earnest Money Deposit (EMD) is fixed at ₹ 8,50,000/- payable through Bank Guarantee from a scheduled commercial bank or via online transfer on the GeM portal. Micro and Small Enterprises (MSEs) registered with Udyam Registration and DPIIT-recognized Startups are eligible for 100% EMD exemption, provided the registered enterprise category matches the relevant NIC codes for IT/Security hardware.",
        "source_page": "Page 13, Clause 6.3"
    }
}

def get_demo_analysis_response() -> TenderAnalysisResponse:
    return TenderAnalysisResponse(
        tender_overview=DEMO_TENDER_OVERVIEW,
        bidder_profile=DEMO_BIDDER_PROFILE,
        requirements=DEMO_REQUIREMENTS,
        compliance_results=DEMO_COMPLIANCE_RESULTS,
        risks=DEMO_RISKS,
        deadlines=DEMO_DEADLINES,
        suggested_questions=DEMO_SUGGESTED_QUESTIONS,
        is_demo=True
    )

def get_demo_report() -> BidReadinessReport:
    satisfied = [c for c in DEMO_COMPLIANCE_RESULTS if c.status == "Satisfied"]
    needs_verif = [c for c in DEMO_COMPLIANCE_RESULTS if c.status == "Needs Verification"]
    missing = [c for c in DEMO_COMPLIANCE_RESULTS if c.status == "Missing / Not Found"]
    critical_risks = [r for r in DEMO_RISKS if r.severity == "CRITICAL"]

    return BidReadinessReport(
        tender_overview=DEMO_TENDER_OVERVIEW,
        bidder_profile=DEMO_BIDDER_PROFILE,
        summary_counts={
            "total_requirements": len(DEMO_REQUIREMENTS),
            "satisfied": len(satisfied),
            "needs_verification": len(needs_verif),
            "missing": len(missing),
            "critical_risks": len(critical_risks),
            "high_risks": len([r for r in DEMO_RISKS if r.severity == "HIGH"]),
            "medium_risks": len([r for r in DEMO_RISKS if r.severity == "MEDIUM"]),
            "low_risks": len([r for r in DEMO_RISKS if r.severity == "LOW"])
        },
        satisfied_requirements=satisfied,
        needs_verification_requirements=needs_verif,
        missing_requirements=missing,
        critical_risks=critical_risks,
        all_risks=DEMO_RISKS,
        important_deadlines=DEMO_DEADLINES,
        recommended_next_actions=[
            "Immediately contact OEM compliance team to acquire the STQC / CERT-In firmware test certificate (Page 18, Clause 9.6).",
            "Verify Udyam NIC classification for ₹ 8.5 Lakhs EMD exemption; initiate Bank Guarantee contingency if codes do not cover security hardware.",
            "Request updated Bank Solvency Certificate of ₹ 2.0 Cr from your relationship manager dated within 90 days.",
            "Draft Pre-Bid clarification regarding ISO 27001 requirement prior to the September 30 cutoff.",
            "Obtain tender-specific Manufacturer Authorization Form (MAF) referencing GEM/2026/B/8941203 with 5-year warranty endorsement."
        ],
        disclaimer="BidGuard AI helps identify requirements and potential gaps. Final bid decisions remain with the bidder."
    )
