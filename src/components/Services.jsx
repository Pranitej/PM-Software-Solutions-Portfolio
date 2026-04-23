import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Layers,
  Monitor,
  Smartphone,
  Store,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

const serviceIcons = [Globe, Monitor, Smartphone, Store, Layers, Zap];

// Enhanced service data with additional properties
const enhancedServices = siteConfig.services.map((service, index) => ({
  ...service,
  icon: serviceIcons[index] || Code2,
  gradient:
    [
      "from-cyan-400 to-blue-500",
      "from-blue-400 to-indigo-500",
      "from-indigo-400 to-purple-500",
      "from-purple-400 to-pink-500",
      "from-cyan-400 to-teal-500",
      "from-blue-400 to-cyan-500",
    ][index] || "from-cyan-400 to-blue-500",
  stats: [
    { icon: TrendingUp, value: "+150%", label: "Growth" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Clock, value: "24/7", label: "Support" },
  ][index % 3],
}));

export default function Services() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 py-32 sm:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M40%200L80%2040L40%2080L0%2040L40%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.015%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 h-150 w-150 rounded-full bg-cyan-500/10 blur-8xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 h-150 w-150 rounded-full bg-purple-500/10 blur-8xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-cyan-400/30"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
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
              icon={Code2}
              label={siteConfig.sections.services.badge}
              variant="glow"
              className="relative border-cyan-400/30 bg-indigo-950/50 text-cyan-200 backdrop-blur-sm"
            />
          </div>

          <h2 className="mt-8 bg-linear-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
            {siteConfig.sections.services.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200/80">
            {siteConfig.sections.services.subheading}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          {enhancedServices.map((service, index) => {
            const StatIcon = service.stats.icon;

            return (
              <motion.article
                key={service.title}
                variants={staggerItem}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                onClick={() =>
                  setSelectedService(selectedService === index ? null : index)
                }
                className="group relative cursor-pointer"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredService === index ? 1 : 0,
                    scale: hoveredService === index ? 1.05 : 1,
                  }}
                  className={`absolute -inset-3 rounded-3xl bg-linear-to-r ${service.gradient} blur-xl transition-all duration-500 opacity-0`}
                />

                {/* Main Card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                      className="relative flex h-14 w-14 items-center justify-center"
                    >
                      {/* Rotating ring */}
                      <motion.div
                        animate={{ rotate: hoveredService === index ? 360 : 0 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-2 rounded-xl border border-cyan-400/20"
                      />

                      {/* Icon background */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-linear-to-br ${service.gradient} opacity-20 blur-md transition-all duration-300 group-hover:opacity-40`}
                      />

                      {/* Icon */}
                      <div
                        className={`relative flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br ${service.gradient} shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:shadow-indigo-500/50`}
                      >
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Featured badge */}
                    {index === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -right-2 -top-2"
                      >
                        <div className="rounded-full bg-linear-to-r from-yellow-400 to-orange-500 p-1 shadow-lg">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-xl font-bold text-white transition-colors group-hover:text-cyan-200">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-indigo-200/80">
                    {service.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="relative mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <div
                      className={`rounded-lg bg-linear-to-br ${service.gradient} p-1.5`}
                    >
                      <StatIcon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {service.stats.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-indigo-300/60">
                        {service.stats.label}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {service.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: tagIndex * 0.05 }}
                        className={`rounded-full border border-white/10 bg-linear-to-r ${service.gradient} bg-opacity-10 px-3 py-1 text-[10px] font-medium text-cyan-200 backdrop-blur-sm transition-all hover:border-cyan-400/30`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                    {service.tags.length > 3 && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-indigo-300/60">
                        +{service.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Learn More Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredService === index ? 1 : 0 }}
                    className="relative mt-4 flex items-center gap-1 text-xs font-medium text-cyan-300"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3" />
                  </motion.div>

                  {/* Corner accent */}
                  <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Expanded Service Details */}
        <AnimatePresence>
          {selectedService !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="rounded-2xl border border-cyan-400/30 bg-linear-to-br from-slate-900/95 to-indigo-950/95 p-8 backdrop-blur-xl">
                <div className="flex items-start gap-6">
                  <div
                    className={`rounded-xl bg-linear-to-br ${enhancedServices[selectedService].gradient} p-4`}
                  >
                    {(() => {
                      const Icon = enhancedServices[selectedService].icon;
                      return <Icon className="h-8 w-8 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white">
                      {enhancedServices[selectedService].title}
                    </h4>
                    <p className="mt-2 text-indigo-200/80">
                      {enhancedServices[selectedService].description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {enhancedServices[selectedService].tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-2 text-sm font-medium text-white"
                      onClick={() => setSelectedService(null)}
                    >
                      Close Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-cyan-400/30 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-indigo-200">
              Need a custom solution? We've got you covered.
            </span>
            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-sm font-medium text-cyan-300"
            >
              Let's talk
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
