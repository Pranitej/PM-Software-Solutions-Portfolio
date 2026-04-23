# Portfolio Polish — Design

Three tightly-scoped fixes across the PM Software Solutions portfolio.

## 1. Premium fonts

**Pairing:** Inter (body/UI) + Instrument Serif (display headlines).

- Load from Google Fonts in `index.html` via stylesheet link (the `preconnect` hints are already there).
- Register in `src/index.css` using Tailwind v4's `@theme` block so `font-sans` and a new `font-display` utility map to the two families. Set `font-feature-settings: 'cv11', 'ss01', 'ss03'` on Inter for the refined character set Linear/Stripe use.
- Apply `font-display` to the Hero H1 only (for the editorial serif moment). All other headings stay in Inter at 600/650 weight — a single serif accent reads as premium; multiple serif headings cheapen it.

## 2. Framer-motion coverage

Convert these 6 components off the broken CSS-`.reveal` path (the hook adds `.visible` but no CSS styles that class — so elements render instantly, no animation):

- `Projects.jsx`, `Process.jsx`, `Testimonials.jsx`, `Contact.jsx` → adopt `useScrollAnimation` + `staggerContainer`/`staggerItem`/`fadeInUp` variants already defined in `utils/animations.js` (same pattern as `Services.jsx`).
- `Footer.jsx` → single `fadeInUp` on the whole block.
- `AnimatedStat.jsx` → replace the `useState` + Tailwind transition classes with `motion.div` + `whileInView` fade-up.

Delete `src/hooks/useReveal.js` once nothing imports it. The `.reveal` / `.stagger-children` CSS stays harmless but unused — remove to keep `index.css` clean.

## 3. Config-driven section copy

Add a `sections` key to `siteConfig`:

```js
sections: {
  services:     { badge: "Services",       heading: "…",  subheading: "…" },
  projects:     { badge: "Selected Work",  heading: "…",  ctaLabel: "Discuss a project" },
  advantages:   { badge: "Why PM Software", heading: "…", description: "…",
                  features: ["SEO-ready", "Mobile-first", "Admin-friendly", "Cloud-native"] },
  process:      { badge: "Process",        heading: "…",  subheading: "…" },
  testimonials: { badge: "Testimonials",   heading: "…" },
  contact:      { badge: "Contact" },
}
```

Replace hardcoded strings in the 6 components with reads from this block. Existing values in the components become the defaults written into config.

## Out of scope

- No new animations beyond what existing files already do.
- No restructuring of components or file layout.
- No CSS cleanup beyond removing the dead `.reveal` / `.stagger-children` rules.
