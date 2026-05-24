"""Generate AssetCentral lead-magnet PDFs.

Run from the project root:
    python scripts/build_lead_magnets.py

Produces:
    public/downloads/portfolio-health-checklist.pdf
    public/downloads/off-plan-handover-decision-tree.pdf
"""
import os
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

NAVY = HexColor("#1A1A2E")
NAVY_LIGHT = HexColor("#252545")
ACCENT = HexColor("#4F6EF7")
POSITIVE = HexColor("#16A34A")
WARNING = HexColor("#D97706")
NEGATIVE = HexColor("#DC2626")
INK = HexColor("#0F172A")
MUTED = HexColor("#64748B")
BORDER = HexColor("#E2E8F0")
SURFACE = HexColor("#F8FAFC")

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "downloads")
os.makedirs(OUT_DIR, exist_ok=True)


def make_styles():
    base = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        textColor=INK,
        spaceAfter=8,
    )
    eyebrow = ParagraphStyle(
        "Eyebrow",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=10,
        textColor=ACCENT,
        spaceAfter=4,
        spaceBefore=0,
    )
    title = ParagraphStyle(
        "Title",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=28,
        leading=32,
        textColor=NAVY,
        spaceAfter=10,
        alignment=TA_LEFT,
    )
    h2 = ParagraphStyle(
        "H2",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=19,
        textColor=NAVY,
        spaceBefore=16,
        spaceAfter=6,
    )
    h3 = ParagraphStyle(
        "H3",
        parent=base["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=14,
        textColor=NAVY,
        spaceBefore=10,
        spaceAfter=4,
    )
    intro = ParagraphStyle(
        "Intro",
        parent=body,
        fontSize=11.5,
        leading=16,
        textColor=MUTED,
        spaceAfter=10,
    )
    item = ParagraphStyle(
        "Item",
        parent=body,
        leftIndent=14,
        firstLineIndent=-14,
        bulletIndent=0,
        spaceAfter=6,
    )
    muted = ParagraphStyle(
        "Muted",
        parent=body,
        fontSize=9,
        leading=12,
        textColor=MUTED,
        spaceAfter=4,
    )
    callout = ParagraphStyle(
        "Callout",
        parent=body,
        fontName="Helvetica",
        fontSize=10.5,
        leading=15,
        textColor=INK,
        leftIndent=12,
        rightIndent=12,
        spaceBefore=8,
        spaceAfter=12,
        borderPadding=10,
        borderColor=ACCENT,
        borderWidth=0,
    )
    return {
        "body": body,
        "title": title,
        "eyebrow": eyebrow,
        "h2": h2,
        "h3": h3,
        "intro": intro,
        "item": item,
        "muted": muted,
        "callout": callout,
    }


def header_footer(canvas, doc):
    width, height = A4
    canvas.saveState()
    # Top brand bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 8 * mm, width, 8 * mm, fill=1, stroke=0)
    # Logo / brand name top-left within the bar
    canvas.setFillColor(HexColor("#FFFFFF"))
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(18 * mm, height - 5.5 * mm, "AssetCentral")
    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(HexColor("#B8BAD0"))
    canvas.drawRightString(width - 18 * mm, height - 5.5 * mm, "assetcentral.ai")
    # Footer
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        18 * mm,
        12 * mm,
        "© assetcentral.ai · Not financial, tax, legal, or investment advice.",
    )
    canvas.drawRightString(width - 18 * mm, 12 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_doc(filename: str, title: str):
    path = os.path.join(OUT_DIR, filename)
    doc = BaseDocTemplate(
        path,
        pagesize=A4,
        title=title,
        author="AssetCentral",
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=24 * mm,
        bottomMargin=22 * mm,
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="normal",
        showBoundary=0,
    )
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=header_footer)])
    return doc, path


def checklist_row(label: str, hint: str = "") -> Table:
    """A checkbox + label + hint row."""
    box = Table(
        [[""]], colWidths=[4.2 * mm], rowHeights=[4.2 * mm]
    )
    box.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, INK),
                ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FFFFFF")),
            ]
        )
    )
    styles = make_styles()
    label_p = Paragraph(f"<b>{label}</b>", styles["body"])
    parts = [label_p]
    if hint:
        parts.append(Paragraph(hint, styles["muted"]))
    t = Table(
        [[box, parts]],
        colWidths=[7 * mm, None],
    )
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return t


def section_band(title: str, sub: str, color=NAVY):
    """A coloured band intro for a checklist section."""
    s = make_styles()
    p1 = Paragraph(f"<b>{title}</b>", ParagraphStyle("band_title", parent=s["body"], fontName="Helvetica-Bold", fontSize=12.5, leading=15, textColor=HexColor("#FFFFFF")))
    p2 = Paragraph(sub, ParagraphStyle("band_sub", parent=s["muted"], fontSize=9, leading=12, textColor=HexColor("#D9DCEA")))
    t = Table([[[p1, p2]]], colWidths=[None])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return t


# ============================================================
# PDF 1: Portfolio Health Checklist
# ============================================================

def build_portfolio_checklist():
    doc, path = make_doc(
        "portfolio-health-checklist.pdf",
        "Portfolio Health Checklist · AssetCentral",
    )
    s = make_styles()
    story = []

    # Cover
    story.append(Paragraph("Quarterly review", s["eyebrow"]))
    story.append(Paragraph("Portfolio Health Checklist", s["title"]))
    story.append(
        Paragraph(
            "The 24 things every private landlord with 2–50 properties should review every quarter. "
            "Most people skip half of them. The half they skip is usually where the money is.",
            s["intro"],
        )
    )
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8))
    story.append(
        Paragraph(
            "Use this once a quarter. Run it asset-by-asset for the first three checks, then "
            "step back and run the portfolio-wide section. Each item takes 1–5 minutes if your "
            "records are in order. If something takes longer, that's a signal worth noting.",
            s["body"],
        )
    )

    # SECTION 1
    story.append(Spacer(1, 8))
    story.append(section_band("01 · Per-asset checks", "Run for every property in your portfolio. ~5 min per asset."))
    story.append(Spacer(1, 8))
    story.append(checklist_row(
        "Real net yield, recomputed",
        "Annual rent minus vacancy, management fees, service charge, repairs, mortgage interest, and applicable tax — divided by current value. Compare to last quarter and to local market median.",
    ))
    story.append(checklist_row(
        "Cashflow this quarter, actual vs expected",
        "Rent collected vs rent due. Any gap = a question for your agent or tenant. A 5%+ gap unexplained is a flag.",
    ))
    story.append(checklist_row(
        "Operator statement reconciled (STR only)",
        "Compare gross bookings on the statement against your platform calendar (Airbnb, Booking.com). Check commission % and cleaning per-stay. Off by more than 3%? Ask why.",
    ))
    story.append(checklist_row(
        "Tenancy / lease status",
        "End date, renewal probability, market rent vs current rent. If a renewal is within 90 days, start the conversation now.",
    ))
    story.append(checklist_row(
        "Loan status and rate reversion date",
        "Days until your fixed rate reverts. Below 90 days = start refinancing research. Below 60 days = lock in or accept the SVR jump.",
    ))
    story.append(checklist_row(
        "Insurance expiry",
        "Renewal date, premium movement vs last year. Rising premiums (above local CPI) usually mean a claim history elsewhere in your provider's book — shop around.",
    ))
    story.append(checklist_row(
        "Service charge / HOA fees",
        "Statement received this quarter? Any line item up >10% vs prior period? Reserve fund still funded for the next major work?",
    ))
    story.append(checklist_row(
        "Capex pipeline (next 12 months)",
        "Known repairs, replacements, upgrades. Each with an estimated cost and a month. If none, you probably haven't looked.",
    ))

    story.append(PageBreak())

    # SECTION 2
    story.append(section_band("02 · Portfolio-wide checks", "Run once across the portfolio. ~20 minutes."))
    story.append(Spacer(1, 8))
    story.append(checklist_row(
        "Blended net yield",
        "Weighted by current value. Trending up, flat, or down vs last quarter? Why? A single underperformer can drag a portfolio yield meaningfully.",
    ))
    story.append(checklist_row(
        "12-month rolling cashflow",
        "Project the next 12 months including known stage payments, capex, and mortgage payments. Any month negative? Plan now, not in month 11.",
    ))
    story.append(checklist_row(
        "Currency exposure",
        "What % of your equity sits in each currency? Is it where you want it to be? Currency drift adds risk that compounds silently.",
    ))
    story.append(checklist_row(
        "Geographic concentration",
        "Largest country exposure as % of portfolio value. Above 50% is normal for accumulators; above 80% is a single-jurisdiction risk that deserves a deliberate decision.",
    ))
    story.append(checklist_row(
        "Leverage profile",
        "Total LTV across the portfolio. Each asset's LTV. Any above 80%? Refinance options narrow quickly past that line.",
    ))
    story.append(checklist_row(
        "Off-plan handover dates",
        "Within 12 months: full action plan written down. Within 6 months: financing locked in or sale path defined. See the off-plan handover guide if uncertain.",
    ))
    story.append(checklist_row(
        "Documents up to date",
        "Title deeds, leases, mortgage docs, valuations, insurance certificates — all in one place, current versions, accessible from anywhere. Loss of any of these costs days to recover.",
    ))
    story.append(checklist_row(
        "Tax records reconciled",
        "Income, expenses, capital movements logged for the year-to-date. Don't make your accountant your bookkeeper.",
    ))

    story.append(PageBreak())

    # SECTION 3
    story.append(section_band("03 · Action priority", "What to do with the results."))
    story.append(Spacer(1, 8))
    story.append(Paragraph("The output of this checklist is a written list of issues. Triage:", s["body"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Red — act within 7 days.</b> Cashflow gone or going negative within 3 months. Loan reversion inside 60 days. Asset underperforming market by 15%+ with no plan.", s["body"]))
    story.append(Paragraph("<b>Amber — act within 30 days.</b> Operator statement variance unexplained. Service charge anomaly. Capex item now overdue.", s["body"]))
    story.append(Paragraph("<b>Yellow — action within the quarter.</b> Slow yield drift, lease end within 6–12 months, documents incomplete.", s["body"]))
    story.append(Paragraph("<b>Green — record and move on.</b> Performance in line with expectation, no near-term events.", s["body"]))

    story.append(Spacer(1, 16))
    story.append(section_band("04 · How to use this with AssetCentral", "If you use the product, much of the above is automated.", color=NAVY_LIGHT))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "AssetCentral's portfolio workspace runs items 01.1, 01.2, 01.3, 01.5, 01.6, 02.1, 02.2, 02.3, "
        "02.4, 02.5, and 02.6 automatically — calculating, flagging, and surfacing them in your "
        "dashboard. Items 01.4, 01.7, 01.8, and 02.7 are partially automated (document vault, alert "
        "engine) and partially still on you. Item 02.8 is intentionally not automated; reconciling "
        "your tax records is your accountant's territory.",
        s["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        '<font color="#4F6EF7"><b>Start your free 14-day trial at assetcentral.ai/signup</b></font> — no credit card required. Add your first '
        "property in 5 minutes; the workspace runs the checks above on every quarterly cadence and "
        "alerts you when a red or amber item appears.",
        s["body"],
    ))

    doc.build(story)
    print(f"wrote {path}")


# ============================================================
# PDF 2: Off-plan Handover Decision Tree
# ============================================================

def build_offplan_tree():
    doc, path = make_doc(
        "off-plan-handover-decision-tree.pdf",
        "Off-plan Handover Decision Tree · AssetCentral",
    )
    s = make_styles()
    story = []

    # Cover
    story.append(Paragraph("Decision tree", s["eyebrow"]))
    story.append(Paragraph("Off-plan handover: which option is yours?", s["title"]))
    story.append(
        Paragraph(
            "Stage payment due. Cash tight. Four options, three decision questions, and the documents "
            "each path requires. Built for landlords with one or more off-plan units approaching handover "
            "in 6–12 months.",
            s["intro"],
        )
    )
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8))

    story.append(Paragraph("The three questions", s["h2"]))
    story.append(Paragraph(
        "Before choosing a path, answer all three. The combination of answers points to the right option.",
        s["body"],
    ))

    story.append(Paragraph("Question 1 — How much time until handover?", s["h3"]))
    story.append(Paragraph("≥ 6 months: all four options remain open.", s["body"]))
    story.append(Paragraph("3–6 months: refinancing and developer renegotiation still feasible if you start today.", s["body"]))
    story.append(Paragraph("&lt; 3 months: secondary-market sale or own-cash completion are the only realistic options.", s["body"]))

    story.append(Paragraph("Question 2 — Would you buy this property today at contract price?", s["h3"]))
    story.append(Paragraph("Yes, with conviction: completing (own funds or refinancing) is the right path.", s["body"]))
    story.append(Paragraph("Yes, but reluctantly: refinancing is the cleanest exit if you can support the mortgage cashflow.", s["body"]))
    story.append(Paragraph("No: secondary-market sale, even at a discount, is preferable to completing into a loss.", s["body"]))

    story.append(Paragraph("Question 3 — Do you have non-property capital you'd otherwise invest at &lt;8% return?", s["h3"]))
    story.append(Paragraph("Yes: completing with your own funds is rational if the asset will earn &gt;8% IRR over your hold.", s["body"]))
    story.append(Paragraph("No: refinancing is the path. Don't liquidate productive assets to complete.", s["body"]))

    story.append(PageBreak())

    # Options
    story.append(section_band("The four options", "Pick one based on your three answers above."))
    story.append(Spacer(1, 10))

    options = [
        {
            "n": "01",
            "name": "Complete with your own funds",
            "when": "Time: any. Conviction: high. Alt-capital return: <8%.",
            "process": "Release cash, transfer to developer escrow on the schedule in your SPA, attend handover.",
            "timing": "2–6 weeks from cash availability.",
            "docs": "SPA + signed addenda · stage payment receipts to date · proof of source of funds (UAE: bank statements + AML disclosure)",
            "risks": "Opportunity cost: capital tied up. If market softens post-handover, you absorb the move.",
        },
        {
            "n": "02",
            "name": "Refinance — secure handover finance",
            "when": "Time: ≥3 months. Conviction: yes (with or without enthusiasm). Cashflow supports a mortgage.",
            "process": "Apply 8–12 weeks before handover. Bank does valuation, processes income docs, issues offer, draws down at handover.",
            "timing": "8–12 weeks application to drawdown. Start now if handover is in 90+ days.",
            "docs": "SPA · stage payments to date · panel-valuer valuation · 6 months bank statements · employment letter / business income proof · global asset declaration · developer NOC · existing mortgage statements (if any)",
            "risks": "Valuation below contract price means you fund the gap in cash. Mortgage rates on off-plan handover finance run 30–60bps higher than completed-unit rates.",
        },
        {
            "n": "03",
            "name": "Sell on the secondary market pre-handover",
            "when": "Time: any but ideally 60–120 days before handover. Conviction: low or absent. Cashflow won't support a mortgage.",
            "process": "List with an agent specialising in off-plan resales, agree price with buyer, transfer at developer-issued NOC + relevant land registry step.",
            "timing": "8–12 weeks listing to settlement in most markets.",
            "docs": "SPA · stage payment receipts · developer NOC · seller-side agency engagement letter · land department forms (varies by market)",
            "risks": "In soft markets, expect 5–20% below contract price. Selling 4–6 months out usually nets less than waiting until 60 days out, when value acceleration is steepest.",
        },
        {
            "n": "04",
            "name": "Negotiate with the developer",
            "when": "Time: anytime. Used to buy more time, not as a primary exit.",
            "process": "Direct call to the developer's in-house finance or senior sales team. Request: stage-payment extension, payment schedule restructuring, or stage waiver against a small premium.",
            "timing": "2–6 weeks to a written agreement.",
            "docs": "Original SPA · current account statement with developer · any prior correspondence · proposed revised payment schedule",
            "risks": "Verbal agreements vanish when sales staff turn over. Get everything on developer letterhead, signed by an authorised signatory.",
        },
    ]

    for opt in options:
        story.append(Paragraph(f"{opt['n']} — {opt['name']}", s["h3"]))
        story.append(Paragraph(f"<b>When:</b> {opt['when']}", s["body"]))
        story.append(Paragraph(f"<b>Process:</b> {opt['process']}", s["body"]))
        story.append(Paragraph(f"<b>Timing:</b> {opt['timing']}", s["body"]))
        story.append(Paragraph(f"<b>Documents needed:</b> {opt['docs']}", s["body"]))
        story.append(Paragraph(f"<b>Risks:</b> {opt['risks']}", s["body"]))
        story.append(Spacer(1, 6))

    story.append(PageBreak())

    story.append(section_band("Common mistakes", "What we see when landlords get stuck.", color=NEGATIVE))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Waiting.</b> Hoping the market recovers in the 60 days before handover. It sometimes does. Usually it doesn't. The cost of starting refinancing 12 weeks before handover is small. The cost of not having an option at handover is unbounded.", s["body"]))
    story.append(Paragraph("<b>Single-path planning.</b> Picking one option and ignoring the others. Always model all four. The exercise of writing them out forces clarity.", s["body"]))
    story.append(Paragraph("<b>Counting on the developer's flexibility without confirming.</b> Renegotiation is real but inconsistent. Make the call early, get the answer in writing, and have option 1, 2, or 3 ready as a backup.", s["body"]))
    story.append(Paragraph("<b>Underestimating the bank valuation gap.</b> In a soft market, off-plan units often value below contract. Get a desktop valuation 4 months out so you know what cash gap you're funding.", s["body"]))

    story.append(Spacer(1, 14))
    story.append(section_band("How AssetCentral helps", "What's modelled in the product.", color=NAVY_LIGHT))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "The off-plan handover module models all four options in parallel: cashflow impact under each path, "
        "NPV at the discount rate you set, document checklists that auto-generate based on your asset's "
        "jurisdiction, and alerts triggered 90 and 60 days before handover. If you have multiple off-plan "
        "units, it sequences them by handover date and highlights months where two stage payments collide.",
        s["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        '<font color="#4F6EF7"><b>Start your free 14-day trial at assetcentral.ai/signup</b></font> — no credit card required. Add your '
        "off-plan unit in 3 minutes; the planner gives you a costed action list within 60 seconds.",
        s["body"],
    ))

    doc.build(story)
    print(f"wrote {path}")


if __name__ == "__main__":
    build_portfolio_checklist()
    build_offplan_tree()
    print("done")
