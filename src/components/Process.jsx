import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Process() {
  const { ref, controls } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  // Icon mapping for each step (customize as needed)
  const stepIcons = [Target, Sparkles, Zap, Rocket];

  // Gradient colors for each step
  const stepGradients = [
    "from-cyan-400 to-blue-500",
    "from-blue-400 to-indigo-500",
    "from-indigo-400 to-purple-500",
    "from-purple-400 to-pink-500",
  ];

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 py-32 sm:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030L30%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.02%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-20" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-linear-to-b from-transparent via-cyan-400/20 to-transparent" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-8xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-8xl animate-pulse delay-1000" />

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-400/30 to-purple-500/30 blur-md" />
            <SectionBadge
              icon={Rocket}
              label={siteConfig.sections.process.badge}
              className="relative border-cyan-400/30 bg-indigo-950/50 text-cyan-200 backdrop-blur-sm"
            />
          </div>

          <h2 className="mt-8 bg-linear-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
            {siteConfig.sections.process.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200/80">
            {siteConfig.sections.process.subheading}
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative mx-auto mt-24 max-w-6xl">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 lg:hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={controls}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full bg-linear-to-b from-cyan-400 via-indigo-500 to-purple-500"
            />
          </div>

          {/* Desktop Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={controls}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full origin-left bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500"
            />
          </div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="relative grid gap-8 lg:grid-cols-4 lg:gap-4"
          >
            {siteConfig.process.map((step, index) => {
              const Icon = stepIcons[index];
              const isActive = activeStep === index;
              const isHovered = hoveredStep === index;

              return (
                <motion.article
                  key={step.title}
                  variants={staggerItem}
                  onHoverStart={() => setHoveredStep(index)}
                  onHoverEnd={() => setHoveredStep(null)}
                  onClick={() => setActiveStep(isActive ? null : index)}
                  className="group relative cursor-pointer lg:cursor-default"
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered || isActive ? 1 : 0,
                      scale: isHovered || isActive ? 1.1 : 1,
                    }}
                    className={`absolute -inset-4 rounded-3xl bg-linear-to-r ${stepGradients[index]} opacity-0 blur-xl transition-all duration-500`}
                  />

                  {/* Card */}
                  <div className="relative">
                    {/* Step Number with Connection Point */}
                    <div className="relative mb-8 flex justify-center">
                      {/* Connection Point */}
                      <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 lg:hidden">
                        <div className="absolute left-0 right-0 h-full bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        {/* Rotating Ring */}
                        <motion.div
                          animate={{ rotate: isHovered ? 360 : 0 }}
                          transition={{ duration: 2, ease: "linear" }}
                          className="absolute -inset-2 rounded-full border border-cyan-400/30"
                        />

                        {/* Step Number Circle */}
                        <div
                          className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${stepGradients[index]} shadow-2xl shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-500/50`}
                        >
                          <span className="text-2xl font-bold text-white">
                            {step.step}
                          </span>

                          {/* Completion Check */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: isActive ? 1 : 0 }}
                            className="absolute -right-1 -top-1 rounded-full bg-green-500 p-0.5"
                          >
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <motion.div
                      animate={{
                        y: isHovered ? -4 : 0,
                        borderColor: isHovered
                          ? "rgba(6, 182, 212, 0.3)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/90 via-indigo-950/80 to-slate-900/90 p-8 backdrop-blur-xl transition-all duration-300"
                    >
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${stepGradients[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                      />

                      {/* Icon */}
                      <div className="relative mb-5">
                        <div
                          className={`inline-flex rounded-xl bg-linear-to-br ${stepGradients[index]} p-3 shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="relative text-xl font-bold text-white transition-colors group-hover:text-cyan-200">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="relative mt-3 text-sm leading-relaxed text-indigo-200/80 transition-colors group-hover:text-indigo-100">
                        {step.description}
                      </p>

                      {/* Expand Indicator */}
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        className="absolute bottom-4 right-4 lg:hidden"
                      >
                        <ChevronRight className="h-5 w-5 text-cyan-400/50" />
                      </motion.div>

                      {/* Arrow Connector (Desktop) */}
                      {index < siteConfig.process.length - 1 && (
                        <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 lg:block">
                          <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="h-5 w-5 text-cyan-400/50" />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Expanded Details (Mobile) */}
          <AnimatePresence>
            {activeStep !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden lg:hidden"
              >
                <div className="rounded-2xl border border-cyan-400/30 bg-linear-to-br from-slate-900/95 to-indigo-950/95 p-6 backdrop-blur-xl">
                  <h4 className="font-semibold text-cyan-300">
                    Step {siteConfig.process[activeStep].step} Details
                  </h4>
                  <p className="mt-2 text-indigo-200/80">
                    {siteConfig.process[activeStep].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-cyan-400/30 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-indigo-200">
              Ready to start your journey? Let's build something amazing
              together.
            </span>
            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-sm font-medium text-cyan-300"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
