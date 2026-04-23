import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Globe,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { siteConfig } from "../config";
import AnimatedStat from "./AnimatedStat";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Parallax effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const gradientX = useTransform(springX, [-300, 300], [0, 100]);
  const gradientY = useTransform(springY, [-300, 300], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M40%200L80%2040L40%2080L0%2040L40%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.02%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />

        {/* Animated gradient orbs */}
        <motion.div
          style={{
            x: useTransform(springX, [-300, 300], [-20, 20]),
            y: useTransform(springY, [-300, 300], [-20, 20]),
          }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-8xl"
        />
        <motion.div
          style={{
            x: useTransform(springX, [-300, 300], [20, -20]),
            y: useTransform(springY, [-300, 300], [20, -20]),
          }}
          className="absolute top-1/2 -right-40 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-500/20 blur-8xl"
        />
        <motion.div
          style={{
            x: useTransform(springX, [-300, 300], [-10, 30]),
            y: useTransform(springY, [-300, 300], [30, -10]),
          }}
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-500/15 blur-8xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Enhanced Badge */}
          <motion.div variants={fadeInUp} className="relative inline-flex">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-400/50 via-indigo-500/50 to-purple-500/50 blur-md" />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
              <span className="bg-linear-to-r from-cyan-200 to-indigo-200 bg-clip-text text-xs font-semibold uppercase tracking-wider text-transparent">
                {siteConfig.hero.badge}
              </span>
              <Zap className="h-3.5 w-3.5 text-yellow-400" />
            </div>
          </motion.div>

          {/* Animated Headline */}
          <motion.h1
            variants={fadeInUp}
            className="relative mt-10 font-display"
          >
            <div className="relative">
              {/* Glow effect behind text */}
              <div className="absolute -inset-x-20 -top-10 -bottom-10 bg-linear-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />

              <span className="relative block text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                <span className="bg-linear-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
                  {siteConfig.hero.headline.split("\n")[0]}
                </span>
                <br />
                <span className="bg-linear-to-r from-indigo-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  {siteConfig.hero.headline.split("\n")[1]}
                </span>
              </span>

              {/* Animated cursor effect */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2 inline-block h-16 w-1 bg-linear-to-b from-cyan-400 to-purple-500 lg:h-20"
              />
            </div>
          </motion.h1>

          {/* Enhanced Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-indigo-200/80 sm:text-xl"
          >
            {siteConfig.hero.subheadline}
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-indigo-200/60">
                Trusted by 1000+ companies
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-indigo-400/30" />
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-300" />
              <span className="text-sm text-indigo-200/60">Global reach</span>
            </div>
          </motion.div>

          {/* Enhanced CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.hero.primaryCta.href}
              className="group relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 p-px shadow-2xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50"
            >
              <div className="relative flex items-center gap-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-4 transition-all group-hover:from-indigo-500 group-hover:to-purple-500">
                <span className="text-base font-semibold text-white">
                  {siteConfig.hero.primaryCta.label}
                </span>
                <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.hero.secondaryCta.href}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:from-cyan-400/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 group-hover:opacity-100" />
              <div className="relative flex items-center gap-3">
                <span className="text-base font-medium text-indigo-200">
                  {siteConfig.hero.secondaryCta.label}
                </span>
                <ChevronRight className="h-5 w-5 text-indigo-300 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          </motion.div>

          {/* Enhanced Divider */}
          <motion.div variants={fadeInUp} className="relative mx-auto mt-20">
            <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="relative flex justify-center">
              <div className="rounded-full border border-cyan-400/30 bg-indigo-950/50 px-4 py-1 backdrop-blur-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-cyan-300">
                  Trusted Partners
                </span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4"
          >
            {siteConfig.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="relative"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-4 rounded-2xl bg-linear-to-r from-cyan-400/0 via-indigo-500/0 to-purple-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-cyan-400/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 group-hover:opacity-100" />

                <div className="relative">
                  <AnimatedStat value={stat.value} label={stat.label} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider text-indigo-300/50">
            Scroll
          </span>
          <div className="h-12 w-6 rounded-full border border-indigo-400/30">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mt-2 h-2 w-1 rounded-full bg-linear-to-b from-cyan-400 to-purple-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
