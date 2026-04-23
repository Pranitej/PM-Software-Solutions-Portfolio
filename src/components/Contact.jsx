import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Clock,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { useCallback, useState, useRef } from "react";
import { siteConfig } from "../config";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp } from "../utils/animations";

export default function Contact() {
  const { ref, controls } = useScrollAnimation();
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const body = [
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Service: ${fd.get("service")}`,
      "",
      "Details:",
      fd.get("message"),
    ].join("\n");

    // Simulate sending delay for animation effect
    setTimeout(() => {
      window.location.href = `mailto:${siteConfig.brand.email}?subject=${encodeURIComponent(
        "New project request — " + siteConfig.brand.name,
      )}&body=${encodeURIComponent(body)}`;
      setFormStatus(siteConfig.contactForm.successMessage);
      setIsSubmitting(false);
    }, 800);
  }, []);

  // Floating labels animation variants
  const labelVariants = {
    unfocused: { y: 0, scale: 1 },
    focused: { y: -24, scale: 0.85, color: "#60A5FA" },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 py-32 sm:py-36"
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M40%200L80%2040L40%2080L0%2040L40%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.02%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />

      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/15 blur-7xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/15 blur-7xl animate-pulse delay-1000" />
      <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-6xl" />
      <div className="absolute right-1/4 bottom-1/2 h-64 w-64 translate-y-1/2 rounded-full bg-blue-500/10 blur-6xl" />

      {/* Grid lines for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,transparent_0),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_0)] bg-size-[40px_40px]" />

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mx-auto max-w-6xl"
        >
          {/* Glowing card container */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl" />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-xl">
              <div className="grid lg:grid-cols-[1.1fr_1fr]">
                {/* Left Column - Contact Info with immersive design */}
                <div className="relative overflow-hidden p-10 sm:p-12">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-600/90 via-purple-600/80 to-cyan-600/90">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030L30%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                  </div>

                  {/* Floating particles */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/5 blur-2xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      x: [0, -15, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"
                  />

                  <div className="relative z-10">
                    {/* Futuristic badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
                    >
                      <Zap className="h-3.5 w-3.5 text-cyan-300" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                        {siteConfig.sections.contact.badge}
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                    >
                      {siteConfig.contactForm.heading}
                      <span className="ml-2 inline-block animate-pulse text-cyan-300">
                        ✦
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-base leading-relaxed text-white/80"
                    >
                      {siteConfig.contactForm.subheading}
                    </motion.p>

                    {/* Contact cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-10 space-y-4"
                    >
                      {/* Email card */}
                      <motion.a
                        href={`mailto:${siteConfig.brand.email}`}
                        whileHover={{ x: 6, scale: 1.02 }}
                        className="group relative block overflow-hidden rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/15"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                            <Mail className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                              Email us
                            </p>
                            <p className="text-sm font-semibold text-white">
                              {siteConfig.brand.email}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
                        </div>
                      </motion.a>

                      {/* Location card */}
                      <motion.div
                        whileHover={{ x: 6 }}
                        className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/15"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-purple-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                              Visit us
                            </p>
                            <p className="text-sm font-semibold text-white">
                              {siteConfig.brand.location}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-10 flex items-center gap-6 border-t border-white/15 pt-8"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs text-white/70">
                          24/7 Support
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs text-white/70">
                          Secure & Private
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs text-white/70">
                          Global Team
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column - Futuristic Form */}
                <form
                  ref={formRef}
                  className="relative bg-linear-to-br from-slate-900/80 via-indigo-950/60 to-slate-900/80 p-10 sm:p-12 backdrop-blur-md"
                  onSubmit={handleSubmit}
                >
                  {/* Form header */}
                  <div className="mb-8 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-linear-to-b from-cyan-400 to-purple-500" />
                    <h3 className="text-lg font-semibold text-white">
                      Start your project
                    </h3>
                    <Sparkles className="ml-auto h-4 w-4 text-cyan-400" />
                  </div>

                  <div className="space-y-6">
                    {/* Name and Email row */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <motion.label
                          animate={
                            focusedField === "name" ? "focused" : "unfocused"
                          }
                          variants={labelVariants}
                          className="pointer-events-none absolute left-4 top-3.5 text-sm font-medium text-indigo-300/70"
                        >
                          Full Name
                        </motion.label>
                        <input
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-4 text-sm text-white outline-none backdrop-blur-sm transition-all placeholder:text-transparent focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                          type="text"
                          name="name"
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-focus-within:w-full" />
                      </div>

                      <div className="relative">
                        <motion.label
                          animate={
                            focusedField === "email" ? "focused" : "unfocused"
                          }
                          variants={labelVariants}
                          className="pointer-events-none absolute left-4 top-3.5 text-sm font-medium text-indigo-300/70"
                        >
                          Email Address
                        </motion.label>
                        <input
                          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-4 text-sm text-white outline-none backdrop-blur-sm transition-all placeholder:text-transparent focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                          type="email"
                          name="email"
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                      </div>
                    </div>

                    {/* Service select with custom styling */}
                    <div className="relative">
                      <motion.label
                        animate={
                          focusedField === "service" ? "focused" : "unfocused"
                        }
                        variants={labelVariants}
                        className="pointer-events-none absolute left-4 top-3.5 z-10 text-sm font-medium text-indigo-300/70"
                      >
                        Select Service
                      </motion.label>
                      <select
                        className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 pt-4 text-sm text-white outline-none backdrop-blur-sm transition-all focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                        name="service"
                        defaultValue=""
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        required
                      >
                        <option value="" disabled className="bg-slate-900">
                          Choose a service package
                        </option>
                        {siteConfig.services.map((s) => (
                          <option key={s.title} className="bg-slate-900">
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="h-1.5 w-1.5 rotate-45 border-b-2 border-r-2 border-indigo-300/50" />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="relative">
                      <motion.label
                        animate={
                          focusedField === "message" ? "focused" : "unfocused"
                        }
                        variants={labelVariants}
                        className="pointer-events-none absolute left-4 top-4 z-10 text-sm font-medium text-indigo-300/70"
                      >
                        Project Details
                      </motion.label>
                      <textarea
                        className="min-h-36 w-full resize-y rounded-xl border border-white/10 bg-white/5 p-4 pt-6 text-sm text-white outline-none backdrop-blur-sm transition-all placeholder:text-transparent focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                        name="message"
                        placeholder="Tell us about your vision, goals, timeline..."
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>

                    {/* Submit button with loading state */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative h-12 w-full overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 p-px font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 disabled:opacity-70"
                    >
                      <div className="relative flex h-full w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 transition-all group-hover:from-indigo-500 group-hover:to-purple-500">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>{siteConfig.contactForm.submitLabel}</span>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Success message */}
                    <AnimatePresence>
                      {formStatus && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm font-medium text-cyan-300"
                          role="status"
                        >
                          <Sparkles className="h-4 w-4" />
                          {formStatus}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
    </section>
  );
}
