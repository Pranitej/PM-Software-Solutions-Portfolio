import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Verified,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "../config";
import SectionBadge from "./SectionBadge";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Testimonials() {
  const { ref, controls } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % siteConfig.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Gradient colors for each testimonial
  const gradients = [
    "from-cyan-400 to-blue-500",
    "from-blue-400 to-indigo-500",
    "from-indigo-400 to-purple-500",
    "from-purple-400 to-pink-500",
    "from-cyan-400 to-teal-500",
    "from-blue-400 to-cyan-500",
  ];

  // Enhanced testimonials with additional data
  const enhancedTestimonials = siteConfig.testimonials.map((t, index) => ({
    ...t,
    gradient: gradients[index % gradients.length],
    verified: true,
    project: [
      "E-commerce Platform",
      "Mobile App",
      "SaaS Dashboard",
      "Web Application",
      "Enterprise Solution",
    ][index % 5],
    result: [
      "+150% ROI",
      "2x Conversion",
      "98% Satisfaction",
      "50% Faster",
      "3x Growth",
    ][index % 5],
  }));

  // Stats for social proof
  const stats = [
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Award, value: "4.9", label: "Average Rating" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % enhancedTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + enhancedTestimonials.length) % enhancedTestimonials.length,
    );
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 py-32 sm:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030L30%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.02%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-20" />

        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-8xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/15 blur-8xl"
        />
      </div>

      {/* Floating quote marks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Quote className="h-12 w-12" />
          </motion.div>
        ))}
      </div>

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
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-yellow-400/30 to-orange-500/30 blur-md" />
            <SectionBadge
              icon={Star}
              label={siteConfig.sections.testimonials.badge}
              variant="glow"
              withSparkle
              className="relative border-yellow-400/30 bg-indigo-950/50 text-yellow-200 backdrop-blur-sm"
            />
          </div>

          <h2 className="mt-8 bg-linear-to-r from-white via-yellow-100 py-5 to-amber-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
            {siteConfig.sections.testimonials.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-200/80">
            Join hundreds of satisfied clients who've transformed their
            businesses with our solutions
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="text-center"
              >
                <div className="inline-flex rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 p-3 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="mt-3 text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-indigo-300/60">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="relative mt-16">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="pointer-events-auto rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-cyan-400/30"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="pointer-events-auto rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-cyan-400/30"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </motion.button>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {enhancedTestimonials.map((testimonial, index) => (
                <div key={testimonial.name} className="w-full shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.5,
                      scale: activeIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative mx-auto max-w-4xl"
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-4 rounded-3xl bg-linear-to-r ${testimonial.gradient} opacity-20 blur-2xl`}
                    />

                    {/* Main Card */}
                    <div className="relative rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 p-8 backdrop-blur-xl sm:p-12">
                      {/* Quote Icon */}
                      <div className="absolute -left-4 -top-4">
                        <div
                          className={`rounded-2xl bg-linear-to-br ${testimonial.gradient} p-3 shadow-xl`}
                        >
                          <Quote className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-6 flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                        <span className="ml-2 text-sm font-medium text-indigo-300/80">
                          5.0 Rating
                        </span>
                      </div>

                      {/* Quote */}
                      <blockquote className="relative">
                        <p className="text-xl leading-relaxed text-indigo-100 sm:text-2xl">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>

                      {/* Author Info */}
                      <div className="mt-8 flex items-center gap-4">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-full bg-linear-to-r ${testimonial.gradient} blur-md`}
                          />
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-purple-700 text-base font-semibold text-white ring-2 ring-white/20">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-white">
                              {testimonial.name}
                            </p>
                            {testimonial.verified && (
                              <Verified className="h-4 w-4 text-cyan-400" />
                            )}
                          </div>
                          <p className="text-sm text-indigo-300/70">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-sm font-semibold text-cyan-300">
                            {testimonial.project}
                          </div>
                          <div className="text-xs text-indigo-300/60">
                            {testimonial.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {enhancedTestimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? `w-8 bg-linear-to-r ${enhancedTestimonials[index].gradient}`
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-indigo-300/70 backdrop-blur-sm transition-all hover:border-cyan-400/30"
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
            />
            {isAutoPlaying ? "Auto-play on" : "Auto-play off"}
          </motion.button>
        </div>

        {/* Testimonials Grid (Alternative View) */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="mt-20 grid gap-6 lg:grid-cols-3"
        >
          {enhancedTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              variants={staggerItem}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: hoveredCard === index ? 1 : 0,
                  scale: hoveredCard === index ? 1.05 : 1,
                }}
                className={`absolute -inset-2 rounded-3xl bg-linear-to-r ${testimonial.gradient} blur-xl transition-all duration-500 opacity-0`}
              />

              {/* Card */}
              <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/30">
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-indigo-200/80">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${testimonial.gradient} text-xs font-medium text-white`}
                  >
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <Verified className="h-3 w-3 text-cyan-400" />
                    </div>
                    <p className="text-xs text-indigo-300/60">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Message Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0,
                    scale: hoveredCard === index ? 1 : 0,
                  }}
                  className="absolute -right-2 -top-2"
                >
                  <div
                    className={`rounded-full bg-linear-to-r ${testimonial.gradient} p-1.5 shadow-lg`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-yellow-400/30 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-indigo-200">
              Ready to be our next success story?
            </span>
            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-sm font-medium text-yellow-300"
            >
              Start your project
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
