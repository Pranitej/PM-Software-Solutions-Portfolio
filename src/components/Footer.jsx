// Add this import at the top
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowUp,
  Sparkles,
  Mail,
  Globe,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "../config";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Footer() {
  const { ref, controls } = useScrollAnimation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social links (you can move these to siteConfig)
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="relative overflow-hidden border-t border-white/10 bg-linear-to-b from-slate-900 to-indigo-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M50%200L100%2050L50%20100L0%2050L50%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.02%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-7xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-7xl" />

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]"
          >
            {/* Brand Column */}
            <motion.div variants={staggerItem} className="space-y-6">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative flex h-12 w-12 items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-400 to-purple-500 opacity-30 blur-md" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-700 shadow-lg shadow-indigo-500/30">
                    <span className="text-lg font-bold text-white">
                      {siteConfig.brand.logo}
                    </span>
                  </div>
                </motion.div>
                <div>
                  <h3 className="bg-linear-to-r from-white to-indigo-200 bg-clip-text text-lg font-bold text-transparent">
                    {siteConfig.brand.name}
                  </h3>
                  <p className="text-xs text-indigo-300/70">
                    {siteConfig.footer.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-indigo-200/70">
                Building the future of digital experiences with cutting-edge
                technology and innovative design solutions.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      <Icon className="h-4 w-4 text-indigo-300 transition-colors group-hover:text-cyan-300" />
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                <Zap className="h-3.5 w-3.5" />
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {siteConfig.navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    onHoverStart={() => setHoveredLink(item.href)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <a
                      href={item.href}
                      className="group relative flex items-center gap-2 text-sm text-indigo-200/80 transition-all hover:text-cyan-300"
                    >
                      <motion.span
                        animate={{
                          x: hoveredLink === item.href ? 4 : 0,
                          opacity: hoveredLink === item.href ? 1 : 0,
                        }}
                        className="absolute -left-4 h-1 w-1 rounded-full bg-cyan-400"
                      />
                      <span className="relative">
                        {item.label}
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{
                            scaleX: hoveredLink === item.href ? 1 : 0,
                          }}
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-linear-to-r from-cyan-400 to-transparent"
                        />
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-0 transition-all group-hover:opacity-60" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Services
              </h4>
              <ul className="space-y-2.5">
                {siteConfig.services.slice(0, 4).map((service, index) => (
                  <motion.li
                    key={service.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href="#services"
                      className="group flex items-center gap-2 text-sm text-indigo-200/80 transition-all hover:text-cyan-300"
                    >
                      <span className="h-1 w-1 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 transition-all group-hover:scale-150 group-hover:bg-cyan-400" />
                      {service.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                <Mail className="h-3.5 w-3.5" />
                Connect
              </h4>

              <div className="space-y-3">
                <a
                  href={`mailto:${siteConfig.brand.email}`}
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-indigo-200/90">
                    {siteConfig.brand.email}
                  </span>
                </a>

                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-indigo-200/90">
                    {siteConfig.brand.location}
                  </span>
                </div>
              </div>

              {/* Newsletter signup hint */}
              <div className="relative mt-4">
                <div className="absolute -inset-0.5 rounded-lg bg-linear-to-r from-cyan-400/20 to-purple-500/20 blur" />
                <div className="relative flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                  <input
                    type="email"
                    placeholder="Subscribe to updates"
                    className="flex-1 bg-transparent px-3 py-1.5 text-sm text-white outline-none placeholder:text-indigo-300/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-md bg-linear-to-r from-cyan-500 to-blue-500 p-1.5 text-white shadow-lg shadow-cyan-500/25"
                  >
                    <ArrowUp className="h-3.5 w-3.5 rotate-45" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row"
        >
          <div className="flex items-center gap-4 text-xs text-indigo-300/60">
            <span>
              © {currentYear} {siteConfig.brand.name}. All rights reserved.
            </span>
            <span className="h-1 w-1 rounded-full bg-indigo-400/30" />
            <a href="#" className="hover:text-cyan-300 transition-colors">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-indigo-400/30" />
            <a href="#" className="hover:text-cyan-300 transition-colors">
              Terms
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-indigo-300/60">
                All systems operational
              </span>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1.5 text-xs text-indigo-300/60">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-400"
              >
                ❤
              </motion.span>
              <span>by {siteConfig.brand.name}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="group fixed bottom-8 right-8 z-50 rounded-full border border-white/20 bg-linear-to-br from-indigo-600 to-purple-700 p-3 shadow-lg shadow-indigo-500/30 backdrop-blur-sm transition-all hover:shadow-indigo-500/50"
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-400/20 to-purple-500/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
            <ArrowUp className="relative h-5 w-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}
