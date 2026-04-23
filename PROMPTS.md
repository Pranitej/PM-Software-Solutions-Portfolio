# UI Generation Prompts — Syntrix-Inspired Agency Site

Independent, copy-pasteable prompts for use with any AI UI generator (v0, Lovable, Bolt, Cursor, etc.). Each component prompt is self-contained — prepend the **Shared Design System** block, then paste the specific component block.

- Reference site: https://agency-main-seven.vercel.app/
- Build order recommendation: 1 → 2 → 3 → 4 → 7 → 5 → 8 → 9 → 10 → 11 → 12 → 6 → 13
- Assembly order on final page: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13

---

## Shared Design System (prepend to every component prompt)

```
DESIGN SYSTEM — use consistently across every component.

Stack: React + Tailwind CSS (use utility classes; optionally shadcn/ui for primitives). Icon library: lucide-react. Animations: Framer Motion where appropriate.

Fonts (load from Google Fonts):
- Manrope (400,500,600,700,800) — primary UI font, apply to body
- Caveat (400,600) — cursive accent used ONLY for short taglines and one highlighted word in the hero

Color tokens (treat as the entire palette — do not invent others):
- --ink        #0B0B1F   (primary text, dark pill button, logo)
- --ink-soft   #404040   (nav links, secondary text)
- --muted      #525252   (body paragraphs)
- --surface    #F0EFEC   (page background — warm near-white, slightly warm gray)
- --surface-2  #FFFFFF   (card/container surface)
- --border     #E1E7EF   (0.8px hairline borders everywhere)
- --orange     #FF5B1F   (primary CTA fill, brand accent)
- --orange-2   #F1592A   (alternate orange)
- --orange-dk  #D84D1C   (hover / gradient stop)
- --peach      #D67856   (Caveat script text)

Shape & spacing:
- All buttons: pill (border-radius 9999px), padding ~10px 20–24px, font-weight 600, 14–15px.
- All cards: radius 1rem–1.25rem, 0.8px border in --border, white --surface-2.
- Container max-width ~1200px, horizontal padding 24–40px.
- Generous vertical rhythm: 120–160px padding between sections.

Tone/vibe: premium minimal digital agency. Warm neutral background, big bold typography, single vivid orange accent used sparingly, near-black ink text. Subtle square grid pattern overlay on background. Soft peach-colored blurred radial orbs (blur ~120px, opacity ~0.35) floating at section corners.

Motion defaults:
- Fade + translateY(28px→0) reveal on scroll, cubic-bezier(0.16, 1, 0.3, 1), 700ms.
- Text reveals word-by-word where indicated.
- All hover transitions 250ms ease.
- Buttons scale 1.02 on hover, slight shadow lift.
- Respect prefers-reduced-motion.

Accessibility: WCAG AA contrast, visible focus ring (orange 2px offset 2px), semantic HTML, aria-labels on icon-only buttons, all interactive elements keyboard navigable.
```

---

## 1. Navigation (floating pill header)

```
Build a NAVIGATION component.

Layout: Floating pill-shaped top bar, ~72px tall, centered horizontally, 24px from top. Max width ~1200px. Background rgba(255,255,255,0.75) with backdrop-blur(16px) and 0.8px border in --border. Border-radius: 9999px. Subtle shadow on scroll (0 4px 20px rgba(11,11,31,0.05)).

Structure (single row, padding 12px 28px):
- LEFT: "Syntrix" wordmark, Manrope 700, 18px, color --ink.
- CENTER: nav links — Home · About · Services · Projects. Each is a text link, Manrope 500, 14px, color --ink-soft. Active link (Home) shows a small 6px orange dot (--orange) before the label.
- RIGHT: "Contact" pill — outlined pill, 0.8px border in --ink, padding 6px 16px, Manrope 600, 14px, color --ink-soft, small orange dot before "Contact".

Behaviors:
- On scroll past 20px, background opacity increases to 0.9 and shadow appears.
- Links fade color from --ink-soft to --ink on hover (200ms).
- Mobile (<768px): collapse center links into a hamburger icon button; drawer slides down with links stacked and the Contact pill at bottom.

Acceptance:
- Pill shape, floating with clear margin from viewport edges.
- Grid background of the page should be visible behind the translucent bar.
- Keyboard-focusable; focus ring orange.
```

---

## 2. Hero

```
Build the HERO section.

Layout: Full-width, min-height ~90vh, centered. Background --surface with a subtle 72px square grid pattern (rgba(11,11,31,0.025) 1px lines) masked with a radial gradient so it fades at edges. Two soft peach radial blurs: one top-right (~500px, opacity 0.35, --orange at 8% alpha, blur 120px), one bottom-left (~380px). Content vertically centered.

Content stack (all centered, max-width 900px):
1. Badge chip above headline: small pill, border 0.8px --border, white bg, padding 6px 16px, uppercase letter-spacing 0.2em, 11px, Manrope 600, color --ink-soft. Label: "DIGITAL AGENCY". Small orange dot on the left.
2. H1 headline, two lines, Manrope 800, ~88px desktop / 48px mobile, line-height 1.05, color --ink, text balanced:
   "We build systems that drive"
   "sales"   ← this single word uses Caveat cursive, same size or slightly larger, color --orange, with a blinking text-cursor "|" after it.
3. Subheadline paragraph, max-width 620px, Manrope 400, 16px, color --muted, line-height 1.6: "We help businesses grow with high-performance websites, automated systems, and scalable digital solutions."
4. CTA row, 12px gap, centered:
   - Primary: "Discuss your ideas" — orange pill, bg --orange, text white, Manrope 600 14px, padding 10px 22px, lucide ArrowRight icon 16px after text. Hover: bg --orange-dk, scale 1.02.
   - Secondary: "View services" — dark pill, bg --ink, text white, Manrope 600 14px, padding 10px 22px. Hover: slight lift.
5. Tagline under the CTAs, Caveat 19px, color --peach: "Schedule a free call now".

Motion:
- Badge, H1, subhead, CTAs, tagline each reveal with 80ms staggered fade+rise.
- The word "sales" types in after the rest lands (character-by-character, 60ms per char), then a cursor blinks.

Acceptance:
- Grid pattern visible but subtle.
- Peach orbs gently float (slow 18s loop, ~12px travel).
- Everything responsive: headline wraps gracefully on mobile.
```

---

## 3. About (word-by-word reveal)

```
Build the ABOUT section.

Layout: Two-column at desktop. Left column: small label only (flex 1). Right column: long paragraph (flex 3). Stack on mobile. Section padding 120px vertical.

Left column:
- Small label "• ABOUT" (orange dot + "ABOUT"), Manrope 600 13px, uppercase, letter-spacing 0.2em, color --ink.

Right column:
- One long paragraph, Manrope 600, ~44px desktop / 28px mobile, line-height 1.2, color --ink, max-width ~900px:
  "We're UI/UX designers focused on creating user-centered digital products that are functional, accessible, and visually engaging. From mobile apps to complex dashboards, we turn ideas into intuitive, enjoyable experiences."

Motion — the key feature:
- Split the paragraph into individual words.
- Each word starts at opacity 0.15, color rgba(11,11,31,0.2).
- As the section scrolls into view, words illuminate one at a time (stagger ~40ms each) to opacity 1, color --ink.
- Use Framer Motion useScroll + useTransform OR IntersectionObserver with staggered setTimeout.

Below the paragraph: a horizontal marquee strip (next component references this — see #4).

Acceptance:
- Word illumination tied to scroll progress of the section.
- Words preserve whitespace and wrap naturally.
- Works with prefers-reduced-motion (falls back to instant reveal).
```

---

## 4. Services Marquee (infinite ticker)

```
Build a SERVICES MARQUEE — an infinitely looping horizontal strip of service pill chips. Goes immediately below the About paragraph (section #3).

Layout: Full-width strip, height ~72px. Top and bottom 0.8px hairlines in --border. Edges fade to transparent via mask-image gradient (left and right 120px fade).

Content — duplicate twice for seamless loop:
Chips (in order): "UI/UX Design", "Web Development", "Website & Store Development", "App Development", "Automation & AI Solutions", "SEO & Organic Growth", "Creative & Media Services", "Branding & Identity", "Sales Growth Services".

Each chip: pill, 0.8px border --border, bg white, padding 10px 22px, Manrope 500 15px, color --ink-soft. Gap 16px between chips.

Motion:
- Continuous leftward scroll, ~40s per full cycle, linear easing.
- On hover over the strip: pause animation.
- Use CSS @keyframes translateX(0 → -50%) with two copies of the chip list side-by-side.

Acceptance:
- Perfectly seamless — no visible jump.
- Respects prefers-reduced-motion (static list with manual scroll).
```

---

## 5. Work Process (3 steps)

```
Build the WORK PROCESS section.

Header row (flex, space-between, align-items-end):
- Left: H2 "Process" — Manrope 800, ~96px desktop / 56px mobile, uppercase, color --ink, letter-spacing -0.04em. (Just the single word "PROCESS" at huge size.)
- Right: supporting paragraph, max-width 340px, Manrope 400, 14px, color --muted: "See how our proven process transforms your brand with custom design solutions that deliver measurable impact from day one."

Under the header: a thin horizontal line (full width of container), 1px, rgba(11,11,31,0.1), with an animated orange segment: absolute-positioned gradient strip (width ~40%, bg linear-gradient(90deg, transparent, --orange, transparent)) that sweeps left-to-right in a 3s loop.

Below: 3-column grid (mobile: 1 column), 24px gap, each step is a card:
- Card: white bg, 0.8px border --border, radius 20px, padding 32px.
- Top: small square chip 40×40, white bg, border 0.8px --border, radius 8px, containing the step number "01", "02", "03" — Manrope 700 13px, color --ink.
- 40px spacer.
- H3 uppercase title: Manrope 800, 18px, color --ink, letter-spacing 0.02em.
- Body paragraph: Manrope 400, 14px, color --muted, line-height 1.6.

Content:
1. RESEARCH & DEFINE — "We begin by understanding the problem, the users, and the business goals from start to finish."
2. IDEATE & DESIGN — "We craft clear, user-friendly flows and high-fidelity interfaces."
3. TEST & IMPLEMENT — "Refining the final solution, testing usability, and handing off assets for development."

Motion:
- Cards fade-up stagger (120ms each) as section enters view.
- Orange sweep on divider loops infinitely.
- Cards lift slightly on hover (translateY -4px, box-shadow 0 20px 40px rgba(11,11,31,0.06)).
```

---

## 6. Comparison (Other agencies vs Us)

```
Build a COMPARISON section.

Outer container: rounded 24px, 0.8px border --border, white bg, padding 48px, subtle radial highlight in top-right corner.

Top block (centered, max-width 900px):
- H3 Manrope 700, 36px desktop / 24px mobile, color --ink, line-height 1.25:
  "We know choosing the right agency is hard because few truly deliver."
  The words "truly deliver" are colored --orange.
- Subheading below, Manrope 500, 22px, color --ink:
  "So we made it simple to compare how we work versus what you usually get in the market."
  The phrases "to compare" and "in the market" are colored --orange.

Below: a 2-column comparison table (grid-cols-2, 1px divider line between columns in rgba(11,11,31,0.08)). No gap.

LEFT column ("Other agencies"):
- bg white.
- Heading at top: "Other agencies" — Manrope 700, 28px, color --ink, padding 24px.
- 5 rows, each 64px tall, 0.8px top border --border, Manrope 500 18px color --ink, padding 20px 24px. Prefix each row with a small chevron "›" in --muted, then the text:
  - Slow, unclear timelines
  - Extra charges for changes
  - No clear process
  - Designs break in dev
  - Complex, hard builds

RIGHT column ("Syntrix agency"):
- bg linear-gradient(135deg, #FFB48A 0%, #FF7A3E 60%, #FF5B1F 100%).
- Heading: "Syntrix agency" (or your brand name) — Manrope 700, 28px, color --ink (stays dark for contrast).
- Same 5 rows format, white-ish top borders rgba(255,255,255,0.2), Manrope 500 18px color --ink:
  - Clear weekly updates
  - Transparent pricing
  - Documented workflow
  - Design-dev alignment
  - Clean, scalable builds

Acceptance:
- The orange gradient column pops against the white left column.
- Outer card has a soft shadow 0 20px 60px rgba(11,11,31,0.06).
- Fully responsive: on mobile, columns stack with a visual label between them.
```

---

## 7. Services Grid (intro + service cards)

```
Build the SERVICES section.

Two-column layout (desktop). Left column sticky on scroll. Stack on mobile.

LEFT column (sticky, top: 120px):
- Small chip above heading: "› WHAT WE DO ‹" with chevrons in --orange, text in --ink-soft, Manrope 600 13px uppercase letter-spacing 0.2em.
- H2: "Services built to drive impact" — Manrope 800, ~64px desktop / 40px mobile, line-height 1.05, color --ink. Break after "built" so it's two lines.
- Orange pill CTA "Discuss your ideas" — bg --orange, white text, Manrope 600 16px, padding 12px 26px, border-radius 9999px. Hover scale 1.02.
- Below CTA: Caveat 16px color --peach: "Let's get started".

RIGHT column: vertical stack of service cards (16px gap).

Each CARD:
- bg white, 0.8px border --border, radius 20px, padding 32px.
- Header row (flex, space-between, align-items-start):
  - Left: H3 title, Manrope 700, 22px, color --ink (can wrap to 2 lines).
  - Right: square icon tile 44×44, bg white, border 0.8px --border, radius 10px, contains a lucide icon at 20px in color --ink.
- 1px divider line (--border) with 20px margin top/bottom.
- Paragraph: Manrope 400, 14px, color --muted, line-height 1.6.
- Tag pills (wrap, 8px gap): uppercase Manrope 600 11px, padding 6px 14px, border 0.8px --border, bg white, color --ink-soft, letter-spacing 0.1em.

Services data (use these exact titles, tags, and icons):
1. "UI/UX Design" — icon: PenTool — desc: "Crafting intuitive, user-centered interfaces that blend clarity, beauty, and effortless interaction." — tags: Web, Product, App.
2. "Web Development, Website & Store Development" — icon: Code2 — desc: "We build fast, scalable and fully responsive websites, online stores, and landing pages that perform beautifully across every device." — tags: Business Sites, Shopify/Woo, Landing Pages, Web Apps, Maintenance.
3. "App development" — icon: Smartphone — desc: "We design and develop native and cross-platform mobile applications that are fast, reliable, and built for excellent user experience." — tags: iOS, Android, Cross Platform, App UX.
4. "Automation & AI Solutions" — icon: Bot — desc: "We automate repetitive workflows and implement AI-powered tools so your team can save time, respond faster, and scale operations efficiently." — tags: AI Chatbots, Zapier/Make/n8n, CRM Automation, Auto Reports, Custom AI.
5. "SEO & Organic Growth" — icon: TrendingUp — desc: "We improve search visibility and sustainable inbound growth with technical optimization, content strategy, and performance tracking." — tags: On-Page SEO, Technical SEO, Keywords, Blog Strategy, Analytics.
6. "Creative & Media Services" — icon: Clapperboard — desc: "We produce visual assets that elevate your brand experience across digital campaigns, product showcases, and social content." — tags: Graphic Design, Video Editing, Motion Graphics, Product Photos.
7. "Branding & Identity" — icon: Palette — desc: "From concept to prototype, we create user-centered interfaces that balance beauty with performance, ensuring every interaction feels effortless." — tags: Identity, Positioning, Voice.
8. "Sales Growth Services" — icon: LineChart — desc: "We build complete sales systems to help you generate qualified leads, nurture prospects, and increase conversions across paid and owned channels." — tags: Paid Ads, Lead Gen, Funnels, Email/SMS, CRM Automation.

Motion:
- Each card fades up with 80ms stagger as it enters viewport.
- On hover: border turns --orange at 40% opacity, icon tile bg turns --orange (icon white).
```

---

## 8. Stats / Impact in numbers

```
Build a STATS section.

Header (left-aligned):
- Small eyebrow "STATS" — Manrope 600 13px uppercase letter-spacing 0.2em color --ink-soft.
- H2 "Impact in numbers" — Manrope 800, ~80px desktop / 44px mobile, color --ink.

Below: 3-column card grid (stack on mobile), 24px gap, wrapped inside a single rounded outer container (radius 24px, 0.8px border --border, padding 16px).

Each STAT CARD:
- bg white, radius 16px, padding 32px, height ~280px.
- Top: H3 title Manrope 700, 22px, color --ink.
- Description: Manrope 400, 14px, color --muted.
- 1px divider (--border) with 32px margin.
- Below divider, row (flex, space-between, align-items-end):
  - HUGE number: Manrope 800, 72px, color --ink, no margin.
  - Right: small progress dots — 3 circles (6px), colored [--orange, rgba(11,11,31,0.15), rgba(11,11,31,0.15)] on card 1; [muted, --orange, muted] on card 2; [muted, muted, --orange] on card 3.

Stats data:
1. "Client Satisfaction" — "Recognized for reliable, scalable, and impactful digital work." — 98%
2. "Successful Projects" — "Driven by clarity, quality, and a strong execution process." — 25+
3. "Years of Experience" — "Built on years of refined skills and proven industry knowledge." — 5+

Motion:
- Numbers count up from 0 to target when in view (duration 1.5s, easeOutQuart).
- Cards stagger-fade in.
```

---

## 9. Latest Projects (full-width case study cards)

```
Build the PROJECTS section.

Header row (flex space-between, align-items-end):
- Left: H2 "Latest Projects" (break between "Latest" and "Projects") — Manrope 800, ~96px desktop / 56px mobile, uppercase, color --ink, letter-spacing -0.04em, line-height 0.95.
- Right: paragraph max-width 320px, italic, Manrope 400, 15px, color --muted: "A thoughtfully curated portfolio demonstrating our commitment to simplicity and purposeful design."

Below: vertical stack of 4 FULL-WIDTH project cards, 24px vertical gap. Each card is an interactive block.

Each PROJECT CARD:
- Container: full container width, radius 20px, overflow hidden, height ~520px desktop / 320px mobile.
- Background: a vivid gradient image (use placeholder colorful gradients — different for each card). E.g. card 1 blue→pink→teal, card 2 purple-to-magenta glitch, card 3 green spectrum, card 4 multicolor blobs. Slight grain overlay (optional).
- TOP-LEFT: white pill label 10px 14px, Manrope 700 11px, uppercase color --ink (e.g. "BRANDING").
- TOP-RIGHT: year in italic white, Manrope 500, 14px (e.g. "//2025").
- CENTER: project name HUGE — Manrope 800, 96px desktop / 56px mobile, uppercase white, letter-spacing -0.03em (e.g. "VERTEX").
- BOTTOM-LEFT: short descriptor, Manrope 500, 14px, color rgba(255,255,255,0.85) (e.g. "Brand Identity & Visual System").

Data:
1. Category BRANDING, year //2025, title VERTEX, sub "Brand Identity & Visual System" — gradient bg blues-to-pinks.
2. Category DEVELOPMENT, year //2025, title NUVORA, sub "E-Commerce Platform Redesign" — gradient bg purple-pink glitch.
3. Category UI/UX DESIGN, year //2024, title ECLIPSO, sub "SaaS Dashboard & Analytics" — gradient bg green-teal.
4. Category APP DESIGN, year //2024, title LUMINO, sub "Mobile Fitness Application" — gradient bg dark with magenta+cyan orbs.

Motion:
- On hover: entire card scales 1.01, overlay darkens slightly, title letter-spacing opens up slightly.
- Fade-up reveal on scroll.
- Cursor shows "view →" pill follower on hover (optional).

Acceptance:
- No photo required — use pure CSS gradients for imagery.
- All 4 visually distinct, all readable (white text over dark enough gradient stops).
```

---

## 10. Testimonials (3-up with controls)

```
Build a TESTIMONIALS section.

Header (centered):
- Eyebrow "TESTIMONIALS" — Manrope 600 13px uppercase letter-spacing 0.2em color --ink-soft.
- H2 "What clients say" — Manrope 800, ~72px desktop / 40px mobile, color --ink.

Below: 3-column carousel/grid of testimonial cards (on mobile, one per view with swipe). Center card is slightly elevated (subtle shadow 0 10px 40px rgba(11,11,31,0.08)) to draw focus.

Each TESTIMONIAL CARD:
- bg white, 0.8px border --border, radius 20px, padding 32px, min-height 320px, flex column between.
- Top: blockquote text — Manrope 500, 17px, color --ink, line-height 1.55. (No quote marks — just the quote text.)
- Bottom row (flex align-items-center space-between):
  - Left: avatar circle 40×40 (use a placeholder person image or initials circle) + text stack (Manrope 700 14px color --ink name with a dash, Manrope 500 13px color --muted role).
  - Right: 5 lucide Star icons, filled --orange, 14px each, 4px gap.

Content:
1. Sophia Reed — Product Lead — "The team delivered a polished result with clear communication throughout. Every milestone felt controlled, intentional, and quality-driven."
2. Jackson Carter — Founder — "It was easy working with them; they understood our vision immediately and delivered a digital experience that represents our brand perfectly."
3. Olivia Bennett — Manager — "From concept to execution, they made everything effortless and created a digital experience that genuinely aligns with who we are."

Below cards (centered, 16px gap):
- Two circular nav buttons: 44×44, white bg, 0.8px border --border, with lucide ChevronLeft / ChevronRight. Hover: bg --ink, icon white.

Motion:
- Carousel slides with 400ms ease on prev/next click.
- Aria-labels "Previous testimonial" / "Next testimonial".
```

---

## 11. Contact Form

```
Build a CONTACT section.

Outer card: centered, max-width 1100px, radius 24px, 0.8px border --border, bg white, overflow hidden. Grid 2 columns (40/60 split on desktop; stack on mobile).

LEFT column (padding 48px):
- H3 "Start a Conversation" — Manrope 800, 40px, color --ink.
- 24px spacer.
- Contact rows, each a two-column mini-row (label + value, vertically aligned, 16px row-gap):
  - "CALL ON:" (Manrope 600 12px uppercase color --ink-soft letter-spacing 0.2em) — "+1 (234) 567-89-01" (Manrope 500 15px color --ink).
  - "EMAIL ON:" — "support@example.com".
  - "ADDRESS:" — "1238 Echo Ridge Blvd, Suite 400, San Francisco, CA 94103, United States".
- Spacer + thin divider --border.
- Small testimonial block at bottom: italic paragraph Manrope 400 14px color --muted: "Their attention to detail and commitment to quality set them apart. The new dashboard improved both usability and client satisfaction." Below in Manrope 600 13px color --ink-soft: "ETHAN LEWIS — FOUNDER, URBANPAY" (uppercase).

RIGHT column (padding 48px, bg --surface):
- Form fields, all with this spec: label above input — label Manrope 600 12px uppercase color --ink-soft letter-spacing 0.2em; input 100% width, height 48px, bg white, 0.8px border --border, radius 12px, padding 0 16px, Manrope 400 15px color --ink, placeholder color rgba(11,11,31,0.35). Focus: border --orange, box-shadow 0 0 0 3px rgba(255,91,31,0.15).
- Rows:
  - Name* (single full-width)
  - Email* (single full-width)
  - Row: Phone* + Company (50/50)
  - Message (textarea, height 120px, radius 12px)
- Submit button: orange pill, bg --orange, white text, Manrope 600 15px, padding 12px 28px, "Send a message". Hover: bg --orange-dk, scale 1.02. Disabled state: opacity 0.5.

Behaviors:
- Client-side validation (required where starred, valid email).
- On submit: show a success message inline (Manrope 500 14px color --ink-soft: "Thanks — we'll be in touch within 24 hours.").

Acceptance:
- Responsive: columns stack on mobile (contact info above form).
- Labels are semantically linked to inputs.
- Autocomplete attributes set correctly (name, email, tel, organization).
```

---

## 12. Mega-email CTA (between form and footer)

```
Build the MEGA-EMAIL CTA block — sits between the contact form and the footer.

Layout: Full container width, centered column, padding 120px vertical, bg --surface.

Content:
1. Small italic paragraph (centered), Manrope 400 italic, 16px, color --muted: "Reach out if you're ready to make something amazing together."
2. 32px spacer.
3. The huge email as a link: "INFO@SYNTRIX.COM" — Manrope 800, clamp(48px, 10vw, 140px), uppercase, color --ink, letter-spacing -0.04em. Entire string is an <a href="mailto:info@syntrix.com">.

Behavior:
- On hover: letters gently shimmer — apply a background-clip gradient that animates orange→ink→orange left-to-right across the text (3s linear infinite). OR simpler: on hover, text color transitions to --orange (300ms).
- Underline on focus only.

Acceptance:
- Email text scales fluidly across viewport widths without overflowing.
- Clear tap target on mobile.
```

---

## 13. Footer

```
Build the FOOTER.

Layout: Full-width, bg --surface, padding 80px top / 40px bottom. Single container. 3-column grid on desktop (1fr 1fr 1fr, 48px gap); stack on mobile.

COLUMN 1 — Socials:
- 4 vertically stacked links: Facebook, Instagram, LinkedIn, Twitter.
- Each link: Manrope 700 13px uppercase letter-spacing 0.2em color --ink, paired with a small lucide ArrowUpRight icon (14px) to the right. 24px gap between rows.
- Hover: color --orange, icon translates 2px up-right.

COLUMN 2 — Nav links:
- Vertical stack of 4 links: Home, About, Services, Projects.
- Same style as socials minus the arrow.

COLUMN 3 — Newsletter:
- Small italic paragraph, Manrope 400 italic, 14px, color --muted: "Sign up for our newsletter to get latest insights and updates".
- 24px spacer.
- Input row: pill-shaped text input "Enter email address" (no visible box — just a 1px bottom border --border, Manrope 400 14px, color --ink, placeholder italic muted) alongside a dark pill button: bg --ink, white text with small orange dot before "Subscribe", Manrope 500 12px, padding 8px 18px, border-radius 9999px.

Bottom bar (below the 3 columns, with 48px spacer and a thin --border top line):
- Row, space-between: left "© 2025 Syntrix Technologies. All rights reserved." Manrope 400 12px color --muted. Right: "Privacy · Terms" links, same style.

Floating "Scroll to top" button (fixed bottom-right, 48×48 circle, bg --ink, white ArrowUp icon, with a tiny orange outer ring visible. Visible after user scrolls past 600px).

Acceptance:
- Fully keyboard-navigable.
- No horizontal overflow on mobile.
- Subscribe button shows inline success toast on valid email.
```

---

# Optional Extras

These aren't in the reference site but complete a full agency offering. Same design system applies.

## 14. FAQ (accordion)

```
Build an FAQ section.

Header (left-aligned):
- Eyebrow "FAQ" — Manrope 600 13px uppercase letter-spacing 0.2em color --ink-soft.
- H2 "Questions, answered" — Manrope 800, ~64px desktop / 36px mobile, color --ink.
- Subheading Manrope 400 16px color --muted: "Everything you need to know before we start working together. Missing something? Get in touch."

Below: accordion list, max-width 900px centered. Each row:
- Row: padding 24px 0, 0.8px bottom border --border. Flex row space-between, cursor pointer.
  - Left: question text, Manrope 700 18px color --ink.
  - Right: circular toggle button 32×32, bg --surface, border 0.8px --border. Shows lucide Plus when closed, Minus when open. Rotates 90deg on expand.
- Expanded panel: Manrope 400 15px color --muted, line-height 1.7, padding-top 16px, max-width 720px. Animate height+opacity 300ms.

Questions:
1. How long does a typical project take? — "Most engagements run 4–10 weeks depending on scope. We share a detailed timeline in the first week so milestones are clear from day one."
2. Do you offer ongoing support after launch? — "Yes — retainers for maintenance, performance monitoring, and iterative improvements are available. Clients choose monthly or quarterly cadence."
3. How does pricing work? — "We quote fixed-price per project based on scope. No hourly bills, no surprise changes. Retainers are billed monthly."
4. Do you work with small businesses or only large clients? — "Both. We tailor process and scope to the team size — a solo founder and a 500-person company need different systems, and we have templates for each."
5. What's your tech stack? — "React / Next.js, Tailwind, TypeScript, Node, Postgres/Supabase, and Vercel for deployment. For automation: Zapier, Make, n8n, and custom Python/Node services."
6. Can you take over an existing project? — "Often yes. We start with a code audit and a 1-week discovery before committing — this keeps hand-offs clean and sets accurate expectations."

Motion:
- First row auto-expanded on load.
- Only one row open at a time by default.
- Fade-up stagger on initial reveal.

Acceptance:
- Keyboard-accessible (Enter/Space to toggle, Up/Down to navigate).
- aria-expanded + aria-controls wired correctly.
```

---

## 15. Logo Wall (social proof)

```
Build a LOGO WALL section — sits under the hero as trust proof.

Layout: Full container width, padding 80px vertical.

Content:
- Small centered eyebrow, Manrope 500 13px color --muted: "Trusted by teams that ship"
- 32px spacer.
- Row of 6 grayscale logos (use monochrome wordmarks in color rgba(11,11,31,0.45)). Evenly distributed (flex space-between), each logo max-height 32px, opacity 0.7. Hover individual logo: opacity 1, color --ink.
- Mobile: wrap to 2 rows of 3.

Use placeholder brand names: NORTHWIND · VERTEX · LUMA · ATLAS · KEPLER · PRISM. Render each as a simple Manrope 700 letter-spacing 0.05em uppercase label (no images needed).

Acceptance:
- Logos sit on --surface bg, no borders.
- Gap between logos remains visually balanced as viewport shrinks.
```

---

## 16. Pricing (3 tiers)

```
Build a PRICING section.

Header (centered, max-width 720px):
- Eyebrow "PRICING" — Manrope 600 13px uppercase letter-spacing 0.2em color --ink-soft.
- H2 "Simple pricing, no surprises" — Manrope 800, ~64px desktop / 36px mobile, color --ink.
- Subheading Manrope 400 16px color --muted: "Fixed-price engagements. Scope defined upfront. Pay in milestones."

Below: 3-column card grid (stack on mobile), 24px gap. Middle card is highlighted.

Each PRICING CARD:
- bg white, 0.8px border --border, radius 20px, padding 40px.
- Top: tier name — Manrope 700 18px color --ink.
- 4px spacer. Tier blurb — Manrope 400 14px color --muted.
- 24px spacer. Price block:
  - Amount Manrope 800 56px color --ink, e.g. "$4,800"
  - Unit Manrope 500 14px color --muted, e.g. "/ project" on the same baseline.
- Divider --border.
- Features list: 6 items, each row: lucide Check 14px in --orange + Manrope 500 14px color --ink.
- CTA at bottom: outlined pill "Get started" (border 0.8px --ink, text --ink, Manrope 600 14px, padding 10px 24px, full-width button).

Middle card ("Growth") highlighted:
- bg --ink instead of white.
- All text white, eyebrow and muted text rgba(255,255,255,0.7).
- Check icons still --orange.
- CTA pill becomes solid --orange with white text.
- Small badge at top-right: "MOST POPULAR" — Manrope 700 10px uppercase letter-spacing 0.2em, orange pill, padding 4px 10px.

Tiers:
1. Starter — "For landing pages and simple sites" — $2,400 / project
   Features: 5-page website, Responsive design, Basic SEO setup, Contact form, 2 rounds of revisions, 2-week delivery.
2. Growth (HIGHLIGHTED) — "For scaling businesses" — $6,800 / project
   Features: Up to 15 pages, Custom design system, Advanced SEO + analytics, CMS integration, Blog setup, 3 rounds of revisions, 4-week delivery, 30-day post-launch support.
3. Scale — "For platforms and apps" — "Custom" / quote
   Features: Web app / platform build, Custom backend & APIs, Authentication & payments, Performance optimization, Dedicated engineering lead, Unlimited revisions during build, Ongoing retainer available.

Motion:
- Middle card scales 1.03 by default.
- Cards stagger-fade in on scroll.
```

---

## 17. 404 Page

```
Build a 404 NOT FOUND page.

Layout: Full viewport height, centered content, bg --surface with subtle grid pattern (same as hero) and two soft peach orbs in corners.

Content stack (centered, max-width 720px):
1. HUGE "404" headline — Manrope 800, clamp(120px, 22vw, 280px), color --ink, letter-spacing -0.05em, line-height 0.9.
2. Below (14px margin): accent word in Caveat 32px color --orange: "oops —"
3. 24px spacer.
4. H2 Manrope 700 28px color --ink: "This page wandered off."
5. Paragraph Manrope 400 16px color --muted max-width 480px: "The link may be broken, or the page might have moved. Let's get you back on track."
6. 32px spacer.
7. CTA row, centered, 12px gap:
   - Primary orange pill "Back to home" — bg --orange white text, lucide Home icon before text.
   - Secondary dark pill "Contact us" — bg --ink white text, lucide Mail icon before text.

Include a small Syntrix wordmark at top-left of viewport (position: fixed, padding 24px).

Acceptance:
- Page is self-contained — no header/footer needed.
- Fully responsive.
- One of the orbs slowly floats across viewport for ambient motion.
```

---

# Assembly prompt (optional final step)

After all components are generated, use this prompt to compose the full page:

```
Compose the full landing page using the components I've already built. Render them in this exact order within <main>, with no extra wrappers that break the grid background:

<Navigation /> (fixed at top)
<Hero />
<About />
<ServicesMarquee />
<Process />
<Comparison />
<Services />
<Stats />
<Projects />
<Testimonials />
<Contact />
<MegaEmailCta />
<Footer />

Global body styles:
- font-family: 'Manrope', sans-serif
- bg: --surface (#F0EFEC)
- color: --ink (#0B0B1F)
- Scroll smooth.

Include a ScrollToTop floating button (see footer spec).
Add scroll-linked section anchors: #about, #services, #projects, #contact.
Verify: no horizontal overflow at any viewport; keyboard navigation works top to bottom; every interactive element has a visible focus ring.
```
