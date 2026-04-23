# Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add premium typography, wire all section copy through `siteConfig`, and replace broken CSS-reveal animations with framer-motion across six components.

**Architecture:** Three passes — (1) typography via Google Fonts + Tailwind v4 `@theme`, (2) config extension with a `sections` block, (3) component-by-component motion conversion using the existing `useScrollAnimation` hook and `utils/animations.js` variants.

**Tech Stack:** React 18, Vite 6, Tailwind 4, framer-motion 12, Google Fonts (Inter + Instrument Serif).

**Notes on process:**
- Project has no test suite and is not a git repository — so no TDD steps and no `git commit` steps. Verification is visual (via `npm run dev`) plus `npm run build` for syntax integrity.
- Each task ends with a mental visual-check in the browser before moving on.

---

### Task 1: Add Inter + Instrument Serif fonts

**Files:**
- Modify: `index.html` (add Google Fonts stylesheet link)
- Modify: `src/index.css` (register font families in `@theme`)

- [ ] **Step 1: Add Google Fonts stylesheet link to index.html**

Replace the existing `<link rel="preconnect">` pair in `index.html` head with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Register fonts in index.css via Tailwind v4 @theme**

At the top of `src/index.css`, immediately after `@import "tailwindcss";`, add:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Instrument Serif", ui-serif, Georgia, serif;
}

html {
  font-family: var(--font-sans);
  font-feature-settings: "cv11", "ss01", "ss03";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

This gives `font-sans` (default) and `font-display` (for the Hero headline) as Tailwind utilities. The OpenType features `cv11`/`ss01`/`ss03` activate Inter's refined single-storey `a`, alternate `l`, and curved-tail lowercase letters — this is the subtle detail that separates "Inter loaded with defaults" from "Inter tuned like Linear/Stripe".

- [ ] **Step 3: Verify fonts load**

Run: `npm run dev`
Expected: open http://localhost:5173, DevTools → Network → filter "font" — should show Inter and Instrument Serif woff2 files loading. Page text should visibly be Inter (tighter, more geometric than default Arial/Helvetica).

---

### Task 2: Extend config.js with sections block

**Files:**
- Modify: `src/config.js`

- [ ] **Step 1: Add `sections` key to siteConfig**

Append this block inside the `siteConfig` object, after the `testimonials` array and before `contactForm`:

```js
  // ── Section Headings ───────────────────────
  sections: {
    services: {
      badge: "Services",
      heading: "Everything you need to go digital",
      subheading:
        "We cover the full product lifecycle — from design to deployment and ongoing support.",
    },
    projects: {
      badge: "Selected Work",
      heading: "Projects built for real businesses",
      ctaLabel: "Discuss a project",
    },
    advantages: {
      badge: "Why PM Software",
      heading: "Built to perform.\nDesigned to last.",
      description:
        "We don't just build — we engineer for longevity. Every line of code is written with performance, security, and maintainability in mind.",
      features: ["SEO-ready", "Mobile-first", "Admin-friendly", "Cloud-native"],
    },
    process: {
      badge: "Process",
      heading: "From idea to launch, clearly",
      subheading:
        "Every project follows a structured, transparent workflow so you always know what's happening next.",
    },
    testimonials: {
      badge: "Testimonials",
      heading: "Trusted by growing teams",
    },
    contact: {
      badge: "Contact",
    },
  },
```

- [ ] **Step 2: Verify syntax**

Run: `npm run build`
Expected: build succeeds with no parse errors.

---

### Task 3: Wire Services.jsx to config

**Files:**
- Modify: `src/components/Services.jsx:32-39`

- [ ] **Step 1: Replace hardcoded heading/subheading**

Change the `SectionBadge` + heading + paragraph block to:

```jsx
<SectionBadge icon={Code2} label={siteConfig.sections.services.badge} />
<h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
  {siteConfig.sections.services.heading}
</h2>
<p className="mt-4 text-base leading-7 text-gray-600">
  {siteConfig.sections.services.subheading}
</p>
```

- [ ] **Step 2: Verify**

Visual check — Services section renders identically to before.

---

### Task 4: Convert Projects.jsx to framer-motion + config

**Files:**
- Modify: `src/components/Projects.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

Full contents:

```jsx
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Projects() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <SectionBadge icon={Layers} label={siteConfig.sections.projects.badge} />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              {siteConfig.sections.projects.heading}
            </h2>
          </div>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 hover:text-gray-900"
          >
            {siteConfig.sections.projects.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.projects.map((project) => (
            <motion.article
              key={project.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
                  {project.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                  {project.description}
                </p>
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                  {project.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gray-700" />
                      <span className="text-sm text-gray-600">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — scroll to Projects section, cards should now stagger-fade-in from bottom as the section enters the viewport, and lift 4px on hover. CTA button should scale on hover.

---

### Task 5: Convert Process.jsx to framer-motion + config

**Files:**
- Modify: `src/components/Process.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```jsx
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Process() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="process" className="relative bg-white py-24 sm:py-28">
      <div className="container-main mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionBadge icon={Rocket} label={siteConfig.sections.process.badge} />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {siteConfig.sections.process.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {siteConfig.sections.process.subheading}
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {siteConfig.process.map((step) => (
              <motion.article
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:border-gray-300 hover:bg-white"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
                  {step.step}
                </span>
                <h3 className="mt-5 text-base font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — Process steps stagger in and lift on hover.

---

### Task 6: Convert Testimonials.jsx to framer-motion + config

**Files:**
- Modify: `src/components/Testimonials.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```jsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Testimonials() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionBadge icon={Star} label={siteConfig.sections.testimonials.badge} />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {siteConfig.sections.testimonials.heading}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {siteConfig.testimonials.map((t) => (
            <motion.article
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-7 text-gray-600">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — Testimonials stagger in on scroll.

---

### Task 7: Wire Advantages.jsx features/copy to config

**Files:**
- Modify: `src/components/Advantages.jsx:29-53`

- [ ] **Step 1: Replace hardcoded header block**

Replace the `SectionBadge` + heading + paragraph with:

```jsx
<SectionBadge icon={Shield} label={siteConfig.sections.advantages.badge} />

<h2 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
  {siteConfig.sections.advantages.heading.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      {i === 0 && <br />}
    </span>
  ))}
</h2>

<p className="mt-4 text-base leading-7 text-gray-600 max-w-lg">
  {siteConfig.sections.advantages.description}
</p>
```

- [ ] **Step 2: Replace the inline features array**

Change the `.map()` source from the inline array to config — replace:

```jsx
{[
  "SEO-ready",
  "Mobile-first",
  "Admin-friendly",
  "Cloud-native",
].map((item, index) => (
```

with:

```jsx
{siteConfig.sections.advantages.features.map((item) => (
```

And delete the now-unused `index` parameter.

- [ ] **Step 3: Verify**

Visual check — Advantages section renders identically (same heading, paragraph, 4 feature pills).

---

### Task 8: Convert Contact.jsx to framer-motion + config

**Files:**
- Modify: `src/components/Contact.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```jsx
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useCallback, useState } from "react";
import { siteConfig } from "../config";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp } from "../utils/animations";

export default function Contact() {
  const { ref, controls } = useScrollAnimation();
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = [
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Service: ${fd.get("service")}`,
      "",
      "Details:",
      fd.get("message"),
    ].join("\n");
    window.location.href = `mailto:${siteConfig.brand.email}?subject=${encodeURIComponent(
      "New project request — " + siteConfig.brand.name,
    )}&body=${encodeURIComponent(body)}`;
    setFormStatus(siteConfig.contactForm.successMessage);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="relative overflow-hidden bg-gray-900 p-8 sm:p-10">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-300">
                  {siteConfig.sections.contact.badge}
                </span>

                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {siteConfig.contactForm.heading}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {siteConfig.contactForm.subheading}
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${siteConfig.brand.email}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-800/30 p-3.5 text-sm font-medium text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-800/50 hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                    {siteConfig.brand.email}
                  </a>

                  <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-800/30 p-3.5 text-sm font-medium text-gray-300">
                    <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                    {siteConfig.brand.location}
                  </div>
                </div>
              </div>
            </div>

            <form
              className="grid gap-5 bg-white p-8 sm:p-10"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-gray-700">Name</span>
                  <input
                    className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input
                    className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-gray-700">Service</span>
                <select
                  className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-all focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  name="service"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {siteConfig.services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-gray-700">Message</span>
                <textarea
                  className="min-h-30 resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  name="message"
                  placeholder="Tell us about your project — goals, timeline, features."
                  required
                />
              </label>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-medium text-white transition-all hover:bg-black hover:shadow-sm"
              >
                {siteConfig.contactForm.submitLabel}
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              {formStatus && (
                <p className="text-sm font-medium text-gray-600" role="status">
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — Contact card fades up on scroll-in, submit button scales on hover/tap. Form still submits via mailto.

---

### Task 9: Add framer-motion to Footer.jsx

**Files:**
- Modify: `src/components/Footer.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```jsx
import { motion } from "framer-motion";
import { siteConfig } from "../config";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp } from "../utils/animations";

export default function Footer() {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="border-t border-gray-200 bg-white py-12"
    >
      <div className="container-main mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
              {siteConfig.brand.logo}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {siteConfig.brand.name}
              </p>
              <p className="text-xs text-gray-500">
                {siteConfig.footer.tagline}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-8">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-gray-500">{siteConfig.brand.copyright}</p>
        </div>
      </div>
    </motion.footer>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — Footer fades up gently when you scroll to the bottom.

---

### Task 10: Convert AnimatedStat.jsx to framer-motion

**Files:**
- Modify: `src/components/AnimatedStat.jsx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

```jsx
import { motion } from "framer-motion";

export default function AnimatedStat({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        {value}
      </p>
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify**

Visual check — Hero stats fade in smoothly when Hero loads.

---

### Task 11: Apply display font to Hero headline

**Files:**
- Modify: `src/components/Hero.jsx:32-42`

- [ ] **Step 1: Change h1 classes**

Modify the Hero headline `<motion.h1>` className from:

```
"mt-8 text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
```

to:

```
"mt-8 font-display text-5xl leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
```

This applies Instrument Serif to the display headline, bumps the size one tier (serifs read smaller than sans at equal px), and tightens leading for the editorial feel. `font-semibold` is removed because Instrument Serif is a regular-weight display serif — adding bold would coarsen it.

- [ ] **Step 2: Verify**

Visual check — Hero H1 now reads in Instrument Serif, larger and airier. All other headings remain Inter.

---

### Task 12: Delete useReveal hook + dead CSS

**Files:**
- Delete: `src/hooks/useReveal.js`
- Modify: `src/index.css` (remove unused `.stagger-children` rules — there never was a `.reveal` CSS class, but the stagger-children helper is also now unused)

- [ ] **Step 1: Verify no remaining imports of useReveal**

Search the codebase for `useReveal` — should return zero matches after Tasks 4–8. If any file still imports it, do not delete yet; surface the miss.

- [ ] **Step 2: Delete the hook file**

Delete: `src/hooks/useReveal.js`

- [ ] **Step 3: Clean index.css**

Remove these blocks from `src/index.css`:
- The `.stagger-children > *` rules (lines 47–69 in the current file) — all 7 rules covering `:nth-child(1)` through `:nth-child(6)` plus the base `.stagger-children > *` rule.

Keep the `@keyframes float`, `@keyframes pulse-subtle`, `@keyframes slide-in` and their `.float-animation` / `.pulse-subtle` / `.slide-in` utility classes — those might be used by future components and are small.

Actually — also grep for `float-animation`, `pulse-subtle`, `slide-in` usage in `src/`. If zero matches, remove those blocks too. Keep only the `@theme` block and `html` rule from Task 1.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build completes with no errors.

---

### Task 13: Final verification

- [ ] **Step 1: Run build**

Run: `npm run build`
Expected: clean exit, dist output generated.

- [ ] **Step 2: Run dev server and walk the page**

Run: `npm run dev`

Scroll through the full page in the browser. Verify:
- Hero headline renders in Instrument Serif (serif with elegant italic-style letterforms).
- All body text renders in Inter (cleaner, more geometric than browser default).
- Hero stats fade in on load.
- Services, Projects, Advantages, Process, Testimonials, Contact, Footer each animate in (fade-up + stagger on cards) as the section scrolls into view.
- Cards have a subtle lift on hover.
- No console errors.
- All section headings match the values in `config.js` (change one in config, see it reflect in browser — optional sanity check).
