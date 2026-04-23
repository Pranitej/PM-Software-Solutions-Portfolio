import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TrendingUp, Sparkles } from "lucide-react";

export default function AnimatedStat({
  value,
  label,
  icon: Icon = TrendingUp,
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse numeric value (handles "10K+", "99%", etc.)
  const parseValue = (val) => {
    const numeric = parseFloat(val.replace(/[^0-9.]/g, ""));
    const suffix = val.replace(/[0-9.]/g, "");
    return { numeric: isNaN(numeric) ? 0 : numeric, suffix };
  };

  const { numeric: targetValue, suffix } = parseValue(value);

  // Counter animation
  useEffect(() => {
    if (!hasAnimated) return;

    let startTime = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutQuart)
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * targetValue);

      setDisplayValue(current.toString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue.toString());
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      onAnimationComplete={() => setHasAnimated(true)}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-4 rounded-2xl bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"
      />

      {/* Main stat container */}
      <div className="relative text-center">
        {/* Animated ring indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-24 w-24 rounded-full border border-indigo-400/20"
          />
          <motion.div
            animate={{
              rotate: isHovered ? -360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 h-24 w-24 rounded-full border border-purple-400/10"
          />
        </div>

        {/* Value display */}
        <div className="relative">
          <motion.div
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-1"
          >
            <span className="bg-linear-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              {hasAnimated ? displayValue : "0"}
            </span>
            {suffix && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
              >
                {suffix}
              </motion.span>
            )}
          </motion.div>

          {/* Animated sparkle effect */}
          <motion.div
            animate={{
              opacity: isHovered ? [0, 1, 0] : 0,
              scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5,
            }}
            className="absolute -right-4 -top-2"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </motion.div>
        </div>

        {/* Label with icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-3"
        >
          {/* Icon above label */}
          <motion.div
            animate={{
              y: isHovered ? -2 : 0,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-2 flex justify-center"
          >
            <div className="rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 p-2 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-indigo-300" />
            </div>
          </motion.div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
            {label}
          </p>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-2 h-0.5 w-8 bg-linear-to-r from-indigo-400/0 via-indigo-400/50 to-indigo-400/0"
            style={{ transformOrigin: "center" }}
          />
        </motion.div>

        {/* Particle effects on hover */}
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: -20 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3 }}
              className="absolute -left-2 top-0 h-1 w-1 rounded-full bg-cyan-400"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: -30 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.2,
              }}
              className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-purple-400"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: 20 }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                repeatDelay: 0.4,
                delay: 0.4,
              }}
              className="absolute left-4 top-4 h-1 w-1 rounded-full bg-indigo-400"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
