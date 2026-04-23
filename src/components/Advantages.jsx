import { motion } from "framer-motion";
import {
  CheckCircle2,
  Layers,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
} from "../utils/animations";

export default function Advantages() {
  const { ref, controls } = useScrollAnimation(0.2);
  const icons = [Rocket, Shield, Layers, Phone];

  // Enhanced gradient mapping for each card
  const cardGradients = [
    "from-indigo-500/20 via-purple-500/10 to-transparent",
    "from-cyan-500/20 via-blue-500/10 to-transparent",
    "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    "from-blue-500/20 via-cyan-500/10 to-transparent",
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 py-24 sm:py-32">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030L30%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.03%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-40" />

      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start"
        >
          {/* Left Column - Content */}
          <motion.div variants={slideInLeft} className="space-y-8">
            <div className="space-y-6">
              <SectionBadge
                icon={Shield}
                label={siteConfig.sections.advantages.badge}
                className="border-indigo-400/30 bg-indigo-500/10 text-indigo-200 backdrop-blur-sm"
              />

              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="bg-linear-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                  {siteConfig.sections.advantages.heading.split("\n")[0]}
                </span>
                <br />
                <span className="bg-linear-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  {siteConfig.sections.advantages.heading.split("\n")[1]}
                </span>
              </h2>

              <p className="text-lg leading-relaxed text-indigo-100/80 max-w-xl backdrop-blur-sm">
                {siteConfig.sections.advantages.description}
              </p>
            </div>

            {/* Features Grid - Glassmorphic Style */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 max-w-lg"
            >
              {siteConfig.sections.advantages.features.map((item, index) => (
                <motion.div
                  key={item}
                  variants={staggerItem}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-indigo-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-indigo-100/90">
                      {item}
                    </span>
                    <Sparkles className="absolute right-3 h-3 w-3 text-indigo-400/0 transition-all duration-300 group-hover:text-indigo-400/60" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="h-px w-12 bg-linear-to-r from-indigo-400/50 to-transparent" />
              <span className="text-sm font-medium uppercase tracking-wider text-indigo-300/70">
                Future-ready solutions
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Futuristic Cards */}
          <motion.div variants={slideInRight} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {siteConfig.advantages.map((adv, i) => {
                const Icon = icons[i] || Rocket;
                return (
                  <motion.article
                    key={adv.title}
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    className="group relative"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 blur transition-all duration-300 group-hover:opacity-40" />

                    {/* Main card */}
                    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/90 via-indigo-950/80 to-slate-900/90 backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/30">
                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${cardGradients[i]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                      />

                      {/* Content */}
                      <div className="relative p-6">
                        {/* Icon container with futuristic design */}
                        <motion.div
                          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="relative mb-5 flex h-12 w-12 items-center justify-center"
                        >
                          <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 opacity-20 blur-md transition-all duration-300 group-hover:opacity-40" />
                          <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-indigo-500/90 to-purple-600/90 shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-500/50">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          {/* Animated ring */}
                          <div className="absolute -inset-1 rounded-xl border border-indigo-400/30 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
                        </motion.div>

                        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-indigo-200">
                          {adv.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-indigo-100/70 transition-colors duration-300 group-hover:text-indigo-100/90">
                          {adv.description}
                        </p>

                        {/* Subtle arrow indicator */}
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-indigo-400/0 transition-all duration-300 group-hover:text-indigo-400/80">
                          <span>Learn more</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>

                        {/* Corner accent */}
                        <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Stats/Trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-6 rounded-xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-indigo-300/60">Uptime</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-indigo-300/60">Support</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-indigo-300/60">Secure</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />
    </section>
  );
}
