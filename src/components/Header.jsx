import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Zap,
  Command,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { siteConfig } from "../config";
import { smoothScroll } from "../utils/smoothScroll";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    smoothScroll(href);
    setActiveItem(href);
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Animated border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div
          className={`relative transition-all duration-500 ${
            isScrolled
              ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-500/10"
              : "bg-transparent"
          }`}
        >
          <nav className="container-main mx-auto flex h-16 items-center justify-between px-6 lg:px-8 max-w-7xl lg:h-20">
            {/* Logo with futuristic animation */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group relative flex items-center gap-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 rounded-xl bg-linear-to-r from-cyan-400/0 via-indigo-500/0 to-purple-500/0 opacity-0 blur transition-all duration-500 group-hover:from-cyan-400/20 group-hover:via-indigo-500/20 group-hover:to-purple-500/20 group-hover:opacity-100" />

              <div className="relative flex h-10 w-10 items-center justify-center lg:h-11 lg:w-11">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-70 blur-sm"
                />
                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-700 shadow-lg shadow-indigo-500/30 transition-all group-hover:shadow-indigo-500/50">
                  <span className="text-sm font-bold text-white lg:text-base">
                    {siteConfig.brand.logo}
                  </span>
                  <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>

              <div className="relative">
                <span
                  className={`text-sm font-semibold transition-colors lg:text-base ${
                    isScrolled ? "text-white" : "text-white/90"
                  }`}
                >
                  {siteConfig.brand.shortName}
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === "brand" ? 1 : 0 }}
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-linear-to-r from-cyan-400 to-purple-500"
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {siteConfig.navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="group relative px-4 py-2"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-400/0 via-indigo-500/0 to-purple-500/0 opacity-0 blur transition-all duration-300 group-hover:from-cyan-400/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 group-hover:opacity-100" />

                  <span
                    className={`relative text-sm font-medium transition-colors ${
                      isScrolled
                        ? "text-indigo-200/80 group-hover:text-cyan-300"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX:
                        activeItem === item.href || hoveredItem === item.href
                          ? 1
                          : 0,
                    }}
                    className="absolute bottom-0 left-4 right-4 h-0.5 origin-left bg-linear-to-r from-cyan-400 to-purple-500"
                  />

                  {/* Active indicator dot */}
                  {activeItem === item.href && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400"
                    />
                  )}
                </motion.a>
              ))}

              {/* CTA Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="group relative ml-4 overflow-hidden rounded-lg bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 p-px shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40"
              >
                <div className="relative flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-2.5 transition-all group-hover:from-indigo-500 group-hover:to-purple-500">
                  <span className="text-sm font-medium text-white">
                    Get in Touch
                  </span>
                  <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                  <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10 md:hidden"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Backdrop with gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-linear-to-br from-slate-900/95 via-indigo-950/95 to-slate-900/95 backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 md:hidden"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-cyan-400/30 via-indigo-500/30 to-purple-500/30 blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
                {/* Decorative header */}
                <div className="border-b border-white/10 bg-linear-to-r from-indigo-600/20 to-purple-600/20 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Command className="h-4 w-4 text-cyan-300" />
                    <span className="text-xs font-medium uppercase tracking-wider text-cyan-300">
                      Navigation
                    </span>
                    <Zap className="ml-auto h-3 w-3 text-yellow-400" />
                  </div>
                </div>

                <div className="flex flex-col p-4">
                  {siteConfig.navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium text-indigo-200/80 transition-all hover:bg-white/10 hover:text-cyan-300"
                    >
                      <ChevronRight className="h-4 w-4 text-indigo-400/50 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                      <span>{item.label}</span>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: activeItem === item.href ? 1 : 0 }}
                        className="absolute bottom-0 left-4 right-4 h-px bg-linear-to-r from-cyan-400/50 to-transparent"
                      />
                    </motion.a>
                  ))}

                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group relative mt-4 overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 p-px"
                  >
                    <div className="relative flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-4 transition-all group-hover:from-indigo-500 group-hover:to-purple-500">
                      <span className="text-base font-semibold text-white">
                        Get in Touch
                      </span>
                      <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-cyan-300" />
                    </div>
                  </motion.a>
                </div>

                {/* Footer hint */}
                <div className="border-t border-white/10 bg-white/5 px-6 py-3">
                  <p className="text-center text-xs text-indigo-300/50">
                    Press{" "}
                    <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono">
                      ESC
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
