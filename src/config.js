// ─────────────────────────────────────────────
// PM Software Solutions — Site Configuration
// Change data here to update the entire site.
// ─────────────────────────────────────────────

export const siteConfig = {
  // ── Brand ──────────────────────────────────
  brand: {
    name: "PM Software Solutions",
    shortName: "PMSS",
    logo: "PM",
    tagline: "Software that works for your business.",
    description:
      "We design and engineer websites, web applications, mobile apps, cloud platforms, and automation tools — built to launch fast and scale smart.",
    email: "hello@pmsoftwaresolutions.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    copyright: `© ${new Date().getFullYear()} PM Software Solutions. All rights reserved.`,
  },

  // ── SEO / Meta ─────────────────────────────
  meta: {
    title: "PM Software Solutions | Portfolio",
    description:
      "PM Software Solutions builds modern websites, web applications, mobile apps, cloud systems, ecommerce platforms, and automation solutions for growing businesses.",
    ogTitle: "PM Software Solutions",
    ogDescription:
      "Professional software development, web design, mobile apps, cloud solutions, and digital transformation services.",
    themeColor: "#09090b",
  },

  // ── Navigation ─────────────────────────────
  navItems: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  // ── Hero Section ───────────────────────────
  hero: {
    badge: "Trusted by 30+ businesses",
    headline: "We build software\nthat drives growth.",
    subheadline:
      "From pixel-perfect websites to complex enterprise platforms — we handle the full product lifecycle so you can focus on what matters.",
    primaryCta: { label: "Start a Project", href: "#contact" },
    secondaryCta: { label: "See Our Work", href: "#work" },
  },

  // ── Stats ──────────────────────────────────
  stats: [
    { value: "30+", label: "Projects delivered" },
    { value: "12+", label: "Industries served" },
    { value: "99%", label: "Client satisfaction" },
    { value: "24/7", label: "Ongoing support" },
  ],

  // ── Services ───────────────────────────────
  services: [
    {
      title: "Web Design & Development",
      description:
        "Responsive, SEO-optimized websites — from marketing pages and portfolios to complex multi-page corporate sites.",
      tags: ["React", "Next.js", "SEO"],
    },
    {
      title: "Web Applications",
      description:
        "Custom dashboards, portals, CRMs, booking platforms, and internal tools with secure, role-based workflows.",
      tags: ["SaaS", "Dashboards", "APIs"],
    },
    {
      title: "Mobile Development",
      description:
        "Cross-platform mobile apps for customers, field teams, and service operations — built with React Native & Flutter.",
      tags: ["Android", "iOS", "PWA"],
    },
    {
      title: "Ecommerce Solutions",
      description:
        "Online stores with seamless checkout, payment integrations, inventory management, and order tracking systems.",
      tags: ["Payments", "Inventory", "Catalog"],
    },
    {
      title: "Cloud & API Engineering",
      description:
        "Scalable backends, third-party integrations, databases, CI/CD pipelines, and production-grade infrastructure.",
      tags: ["AWS", "DevOps", "REST"],
    },
    {
      title: "AI & Automation",
      description:
        "Workflow automation, AI-powered assistants, report generation, lead routing, and smart operations tooling.",
      tags: ["AI", "Automation", "GPT"],
    },
  ],

  // ── Projects ───────────────────────────────
  projects: [
    {
      name: "RetailOps Commerce",
      category: "Ecommerce",
      description:
        "Full-stack storefront with catalog management, real-time inventory, payment processing, and customer dashboards.",
      metrics: ["42% faster checkout", "Real-time stock sync"],
    },
    {
      name: "ClinicFlow Portal",
      category: "Healthcare",
      description:
        "Patient scheduling, doctor availability, automated reminders, and staff management for daily clinic operations.",
      metrics: ["24/7 online booking", "Staff workload analytics"],
    },
    {
      name: "LearnHub LMS",
      category: "Education",
      description:
        "Learning platform with course management, student progress tracking, assessments, and certificate generation.",
      metrics: ["Course analytics", "Automated certificates"],
    },
    {
      name: "ServiceTrack CRM",
      category: "Automation",
      description:
        "Lead capture, service tickets, automated follow-ups, quotations, and team assignment workflows.",
      metrics: ["Lead pipeline view", "Automated follow-ups"],
    },
    {
      name: "PropertyDesk",
      category: "Real Estate",
      description:
        "Property listings with advanced filters, agent profiles, inquiry routing, and campaign-ready landing pages.",
      metrics: ["Smart search filters", "Inquiry routing"],
    },
    {
      name: "InsightBoard",
      category: "Analytics",
      description:
        "Executive dashboards combining operations, sales, finance, and support KPIs into a single decision-ready view.",
      metrics: ["KPI snapshots", "Exportable reports"],
    },
  ],

  // ── Process ────────────────────────────────
  process: [
    {
      step: "01",
      title: "Discover",
      description:
        "We map your goals, audience, workflows, and success metrics before a single line of code is written.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "We shape the experience with clear UX flows, modern interfaces, and responsive, production-ready layouts.",
    },
    {
      step: "03",
      title: "Develop",
      description:
        "We build scalable systems — clean components, secure APIs, tested logic, and maintainable architecture.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "We deploy, monitor, optimize, and provide ongoing support to keep your product performing after release.",
    },
  ],

  // ── Advantages ─────────────────────────────
  advantages: [
    {
      title: "Performance first",
      description:
        "Optimized assets, lean code, and responsive layouts keep your product fast on every device.",
    },
    {
      title: "Secure by design",
      description:
        "Authentication, data access controls, encrypted APIs, and practical security safeguards — built in from day one.",
    },
    {
      title: "Easy to maintain",
      description:
        "Modular components and clean architecture make future updates simple for any development team.",
    },
    {
      title: "Ongoing support",
      description:
        "Monitoring, bug fixes, feature expansion, hosting, and analytics — we stay with you after launch.",
    },
  ],

  // ── Testimonials ───────────────────────────
  testimonials: [
    {
      quote:
        "PM Software Solutions turned our manual operations into a clean digital workflow. The team was sharp, responsive, and deeply focused on our needs.",
      name: "Arjun Mehta",
      role: "Operations Lead",
      company: "LogiServe India",
    },
    {
      quote:
        "They delivered a modern website with the speed and polish we needed. The final experience felt premium and was incredibly easy for our team to manage.",
      name: "Priya Sharma",
      role: "Founder",
      company: "UrbanCraft Studio",
    },
    {
      quote:
        "The analytics dashboard gave our leadership team a single place to understand performance — no more chasing spreadsheets every morning.",
      name: "Vikram Rao",
      role: "Managing Partner",
      company: "Vertex Consulting",
    },
  ],

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

  // ── Contact Form Config ────────────────────
  contactForm: {
    heading: "Let's build something great.",
    subheading:
      "Tell us about your project — goals, timeline, and must-have features. We'll get back to you within 24 hours.",
    submitLabel: "Send Message",
    successMessage: "Opening your email client with the project details.",
  },

  // ── Footer ─────────────────────────────────
  footer: {
    tagline: "Websites · Apps · Cloud · Automation",
    socialLinks: [
      // Add social links here when ready
      // { label: "LinkedIn", href: "https://linkedin.com/..." },
      // { label: "Twitter", href: "https://twitter.com/..." },
    ],
  },
};
