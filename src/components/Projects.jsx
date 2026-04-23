import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
  TrendingUp,
  Eye,
  ExternalLink,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Projects() {
  const { ref, controls } = useScrollAnimation();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(siteConfig.projects.map((p) => p.category)),
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === selectedCategory);

  // Category color mapping
  const categoryColors = {
    All: "from-cyan-400 to-blue-500",
    "Web App": "from-blue-400 to-indigo-500",
    Mobile: "from-indigo-400 to-purple-500",
    "E-commerce": "from-purple-400 to-pink-500",
    SaaS: "from-cyan-400 to-teal-500",
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 py-32 sm:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M40%200L80%2040L40%2080L0%2040L40%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.015%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-30" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-8xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/15 blur-8xl"
        />
      </div>

      <div className="container-main relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="relative inline-block">
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-400/30 to-purple-500/30 blur-md" />
              <SectionBadge
                icon={Layers}
                label={siteConfig.sections.projects.badge}
                className="relative border-cyan-400/30 bg-indigo-950/50 text-cyan-200 backdrop-blur-sm"
              />
            </div>

            <h2 className="mt-8 bg-linear-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              {siteConfig.sections.projects.heading}
            </h2>

            <p className="mt-4 text-lg text-indigo-200/70">
              Transforming ideas into exceptional digital experiences
            </p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-indigo-300/70 hover:text-indigo-200"
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 bg-linear-to-r ${categoryColors[category] || "from-cyan-400 to-blue-500"}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="mt-16 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                variants={staggerItem}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredProject === index ? 1 : 0,
                    scale: hoveredProject === index ? 1.05 : 1,
                  }}
                  className={`absolute -inset-2 rounded-3xl bg-linear-to-r ${
                    categoryColors[project.category] ||
                    "from-cyan-400/30 to-purple-500/30"
                  } blur-xl transition-all duration-500`}
                />

                {/* Main Card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30">
                  {/* Project Image/Icon Area */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-indigo-600/20 to-purple-600/20">
                    {/* Abstract background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent_70%)]" />
                      <svg
                        className="absolute inset-0 h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id={`grid-${index}`}
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 40 0 L 0 0 0 40"
                              fill="none"
                              stroke="rgba(6,182,212,0.1)"
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#grid-${index})`}
                        />
                      </svg>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-4 top-4"
                    >
                      <div
                        className={`rounded-lg bg-linear-to-br ${categoryColors[project.category] || "from-cyan-400 to-blue-500"} p-2 shadow-lg`}
                      >
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>

                    {/* Project stats preview */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                          <Eye className="h-3.5 w-3.5 text-cyan-300" />
                          <span className="text-xs font-medium text-white">
                            2.4k views
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                          <Zap className="h-3.5 w-3.5 text-yellow-400" />
                          <span className="text-xs font-medium text-white">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full bg-linear-to-r ${
                          categoryColors[project.category] ||
                          "from-cyan-400/20 to-blue-500/20"
                        } px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur-sm`}
                      >
                        <Sparkles className="h-3 w-3" />
                        {project.category}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-200">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-indigo-200/80">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                      {project.metrics.map((metric, i) => (
                        <motion.div
                          key={metric}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={`rounded-full bg-linear-to-r ${categoryColors[project.category] || "from-cyan-400/20 to-blue-500/20"} p-0.5`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
                          </div>
                          <span className="text-sm text-indigo-200/70">
                            {metric}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <motion.a
                      href="#contact"
                      whileHover={{ x: 4 }}
                      className="group/btn mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300"
                    >
                      View Project
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </motion.a>
                  </div>

                  {/* Hover Overlay Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
                  />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group relative inline-flex overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 p-px shadow-2xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50"
          >
            <div className="relative flex items-center gap-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-4 transition-all group-hover:from-indigo-500 group-hover:to-purple-500">
              <span className="text-base font-semibold text-white">
                {siteConfig.sections.projects.ctaLabel}
              </span>
              <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.a>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {siteConfig.projects.length}+
            </div>
            <div className="mt-1 text-sm text-indigo-300/60">
              Projects Delivered
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="mt-1 text-sm text-indigo-300/60">
              Client Satisfaction
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">15+</div>
            <div className="mt-1 text-sm text-indigo-300/60">
              Industries Served
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="mt-1 text-sm text-indigo-300/60">
              Support Available
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
