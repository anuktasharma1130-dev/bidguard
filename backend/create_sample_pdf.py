import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors

def generate_sample_gem_tender(output_path: str):
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    story = []
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#0f172a'),
        alignment=1, # Center
        spaceAfter=10
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=15
    )
    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1e40af'),
        spaceBefore=12,
        spaceAfter=6
    )
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )
    clause_style = ParagraphStyle(
        'DocClause',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=4,
        spaceAfter=2
    )

    # PAGE 1: GeM Header & Bid Details
    story.append(Paragraph("GOVERNMENT e-MARKETPLACE (GeM)", title_style))
    story.append(Paragraph("BID DOCUMENT — INVITATION FOR BIDS (IFB)<br/><b>Bid Number: GEM/2026/B/8941203 | Dated: 22-09-2026</b>", subtitle_style))
    story.append(Spacer(1, 10))

    meta_data = [
        ["Bid Details", "Specifications"],
        ["Bid Item Category", "Enterprise Network Security Equipment & Next-Gen Firewalls"],
        ["Procuring Ministry / Department", "Ministry of Heavy Industries / PSU Central Infrastructure Division"],
        ["Estimated Tender Value", "INR 4,25,00,000/- (₹ 4.25 Crores)"],
        ["Bid Validity Period", "120 Days from Technical Bid Opening"],
        ["Bid Submission End Date / Time", "14-10-2026, 15:00:00 hrs IST"],
        ["Bid Opening Date / Time", "14-10-2026, 15:30:00 hrs IST"],
        ["Pre-Bid Conference Date / Time", "02-10-2026, 11:00:00 hrs IST (Virtual Video Conference)"],
        ["Pre-Bid Query Cutoff Date", "30-09-2026, 17:00:00 hrs IST via GeM Portal"],
        ["Earnest Money Deposit (EMD)", "INR 8,50,000/- (Exemption eligible for registered MSEs / DPIIT Startups)"],
        ["Performance Bank Guarantee (PBG)", "5.0% of total Contract Value within 15 days of Award"]
    ]
    t1 = Table(meta_data, colWidths=[200, 330])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f8fafc')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t1)
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>Notice Inviting Bid (NIB):</b> Tenders are invited through GeM portal under two-envelope bidding system (Technical and Financial) from eligible, authorized, and financially sound Original Equipment Manufacturers (OEMs) or their authorized system integrators.", body_style))
    story.append(PageBreak())

    # PAGE 2: Section I & Financial Terms
    story.append(Paragraph("SECTION I: FINANCIAL CRITERIA & EARNEST MONEY DEPOSIT", section_style))
    story.append(Paragraph("Clause 6.1 — Minimum Annual Turnover Requirement (Page 2 / Page 12):", clause_style))
    story.append(Paragraph("The average annual financial turnover of the Bidder during the last three consecutive financial years (FY 2023-24, FY 2024-25, FY 2025-26) must not be less than INR 5,00,00,000/- (Rupees Five Crores Only). Bidders must submit copies of audited Balance Sheets and Profit & Loss accounts certified by an independent practicing Chartered Accountant with a valid Unique Document Identification Number (UDIN).", body_style))
    
    story.append(Paragraph("Clause 6.3 — Earnest Money Deposit (EMD) (Page 2 / Page 13):", clause_style))
    story.append(Paragraph("Bidders shall furnish an EMD of INR 8,50,000/- in the form of a Bank Guarantee from a Scheduled Commercial Bank or online transfer via GeM gateway. Micro and Small Enterprises (MSEs) registered with Udyam Registration are exempted from EMD subject to producing valid registration certificate matching the relevant NIC code for computer networking and security appliances.", body_style))

    story.append(Paragraph("Clause 6.7 — Performance Security / Bank Guarantee (Page 2 / Page 14):", clause_style))
    story.append(Paragraph("The successful contractor shall submit Performance Security of 5% of the total awarded value within 15 calendar days from the date of Notification of Award, valid for sixty (60) days beyond the date of completion of all contractual obligations including warranty.", body_style))

    story.append(Paragraph("Clause 6.9 — Bank Solvency Certificate (Page 2 / Page 14):", clause_style))
    story.append(Paragraph("The Bidder shall submit a fresh Solvency Certificate of minimum INR 2,00,00,000/- (Rupees Two Crores Only) issued by a Scheduled Commercial Bank not earlier than ninety (90) days prior to the original bid submission deadline.", body_style))
    story.append(PageBreak())

    # PAGE 3: Section II: Eligibility Criteria
    story.append(Paragraph("SECTION II: BIDDER ELIGIBILITY CRITERIA", section_style))
    story.append(Paragraph("Clause 3.1 — Minimum Experience Criteria (Page 3 / Page 4):", clause_style))
    story.append(Paragraph("The Bidder must have at least three (3) completed years of active commercial existence in supplying, configuring, and maintaining enterprise network security appliances to Central / State Government ministries, departments, or Public Sector Undertakings (PSUs) as on bid publish date.", body_style))

    story.append(Paragraph("Clause 3.2 — Legal Entity & Registration (Page 3 / Page 4):", clause_style))
    story.append(Paragraph("The Bidder must be a company incorporated in India under the Companies Act 1956 / 2013 or a Limited Liability Partnership (LLP). Certificate of Incorporation, Memorandum of Association (MoA), and Articles of Association (AoA) must be submitted.", body_style))

    story.append(Paragraph("Clause 3.4 — Past Performance Track Record (Page 3 / Page 5):", clause_style))
    story.append(Paragraph("The Bidder must have successfully executed and commissioned at least two (2) separate single purchase orders of value not less than INR 1,50,00,000/- (Rupees One Crore Fifty Lakhs) each for enterprise firewall or network security projects in Central/State Govt or PSUs during the last 3 financial years.", body_style))

    story.append(Paragraph("Clause 3.9 — Non-Debarment / Non-Blacklisting Undertaking (Page 3 / Page 6):", clause_style))
    story.append(Paragraph("The Bidder must provide an affidavit declaring that the firm has not been blacklisted, banned, or put on holiday list by any government authority, PSU, or GeM. This undertaking must be executed on a non-judicial stamp paper of INR 100/- and duly notarized by a notary public.", body_style))
    story.append(PageBreak())

    # PAGE 4: Section III: Technical Specifications
    story.append(Paragraph("SECTION III: TECHNICAL REQUIREMENTS & SPECIFICATIONS", section_style))
    story.append(Paragraph("Clause 1.2 — Next-Gen Firewall (NGFW) Hardware & Throughput (Page 4 / Page 8):", clause_style))
    story.append(Paragraph("The offered firewall appliances must deliver a minimum of 40 Gbps stateful firewall throughput, 12 Gbps SSL/TLS deep decryption throughput, and minimum 10 million concurrent sessions. Must include dual redundant hot-swappable AC power supplies and high-availability (HA) active-active clustering.", body_style))

    story.append(Paragraph("Clause 2.4 — Security Certification Standards (Page 4 / Page 9):", clause_style))
    story.append(Paragraph("The firewall operating system and hardware cryptographic module must be certified under Common Criteria (CC) EAL4+ (or higher) or NIST FIPS 140-3 Level 2/3. Supporting certification documents from accredited national or international agencies must be provided.", body_style))

    story.append(Paragraph("Clause 5.1 — 5-Year Comprehensive OEM Warranty & Support SLA (Page 4 / Page 11):", clause_style))
    story.append(Paragraph("The Bidder and OEM must provide a five (5) year comprehensive 24x7x365 on-site warranty covering all hardware, software updates, security signature subscriptions, and component replacements. Strict 4-hour Mean Time to Resolution (MTTR) SLA applies to all major hardware failures.", body_style))

    story.append(Paragraph("Clause 5.3 — Manufacturer Authorization Form (MAF) (Page 4 / Page 11):", clause_style))
    story.append(Paragraph("If the Bidder is an authorized partner, a specific Manufacturer Authorization Form (MAF) in the format provided in Annexure III must be executed by the OEM Country Head, explicitly mentioning Tender Bid Number GEM/2026/B/8941203 and guaranteeing spare parts supply for 7 years.", body_style))

    story.append(Paragraph("Clause 9.6 — Mandatory STQC / CERT-In Security Evaluation (Page 4 / Page 18):", clause_style))
    story.append(Paragraph("In accordance with National Cyber Security Policy guidelines, the proposed firewall firmware and management software version must carry a formal security evaluation and zero-backdoor test report issued by an STQC laboratory or CERT-In empanelled auditing agency. Failure to provide this report shall result in immediate technical disqualification.", body_style))
    story.append(PageBreak())

    # PAGE 5: Section IV: Checklist of Required Documents
    story.append(Paragraph("SECTION IV: MANDATORY DOCUMENT CHECKLIST (Page 5 / Page 15-16)", section_style))
    story.append(Paragraph("The following documents must be uploaded in the Technical Envelope. Bids without any mandatory document are liable to summary rejection:", body_style))

    doc_rows = [
        ["No.", "Document Description", "Source Clause", "Mandatory"],
        ["1", "Certificate of Incorporation, MoA & AoA", "Clause 3.2 (Page 4)", "YES"],
        ["2", "GST Registration Certificate & Latest GSTR-3B Return", "Clause 3.3 (Page 4)", "YES"],
        ["3", "Audited Financial Statements with CA UDIN for 3 FYs", "Clause 6.1 (Page 12)", "YES"],
        ["4", "Proof of Past Government Supply Orders (> ₹1.5 Cr each)", "Clause 3.4 (Page 5)", "YES"],
        ["5", "Tender-Specific OEM Authorization Form (MAF)", "Clause 5.3 (Page 11)", "YES"],
        ["6", "STQC / CERT-In Lab Security Evaluation Certificate", "Clause 9.6 (Page 18)", "YES"],
        ["7", "ISO 9001:2015 & ISO 27001 Certification Copies", "Clause 4.1 (Page 16)", "YES"],
        ["8", "Non-Blacklisting Declaration on ₹100 Stamp Paper", "Clause 3.9 (Page 6)", "YES"],
        ["9", "Bank Solvency Certificate of ₹2.0 Cr (within 90 days)", "Clause 6.9 (Page 14)", "YES"],
        ["10", "Signed Technical Compliance Sheet with OEM Datasheets", "Clause 1.8 (Page 16)", "YES"]
    ]
    t2 = Table(doc_rows, colWidths=[25, 270, 150, 85])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t2)
    story.append(PageBreak())

    # PAGE 6: Section V: Penalties, Liquidated Damages & PPP-MII
    story.append(Paragraph("SECTION V: PENALTIES & SPECIAL CONTRACT CLAUSES", section_style))
    story.append(Paragraph("Clause 12.1 — Liquidated Damages (LD) (Page 6 / Page 20):", clause_style))
    story.append(Paragraph("If the contractor fails to deliver or commission the network security systems within the stipulated timeframe, the Buyer shall recover liquidated damages at the rate of 0.5% of the total contract value per week of delay or part thereof, subject to a maximum ceiling limit of 10% of total contract value. Beyond 10%, the Buyer reserves the right to terminate the contract and invoke the Performance Bank Guarantee.", body_style))

    story.append(Paragraph("Clause 13.4 — SLA Downtime Penalty (Page 6 / Page 21):", clause_style))
    story.append(Paragraph("During the 5-year warranty period, any hardware or security gateway outage exceeding the 4-hour resolution window shall attract a financial penalty of INR 5,000/- per hour of unresolved downtime per location. The penalty will be deducted from quarterly maintenance payouts or PBG.", body_style))

    story.append(Paragraph("Clause 15.1 — Public Procurement Make in India (PPP-MII) Order (Page 6 / Page 22):", clause_style))
    story.append(Paragraph("Purchase preference shall be granted to Class-I Local Suppliers (minimum 50% local content) as per revised Public Procurement Order 2017. Bidders must submit a local content declaration indicating the percentage of local value addition in accordance with Make in India guidelines.", body_style))

    story.append(Spacer(1, 20))
    story.append(Paragraph("<b>End of Bid Document GEM/2026/B/8941203</b><br/>Ministry of Heavy Industries & PSU Infrastructure Unit", subtitle_style))

    doc.build(story)
    print(f"Sample PDF generated successfully at: {output_path}")

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    generate_sample_gem_tender(os.path.join(out_dir, "sample_gem_tender.pdf"))
