import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * Reusable futuristic section badge with multiple variants and animations
 *
 * @param {Object} props
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} props.label - Badge text label
 * @param {string} [props.variant="default"] - Visual style variant: "default", "glow", "gradient", "minimal", "outline"
 * @param {string} [props.size="md"] - Size variant: "sm", "md", "lg"
 * @param {boolean} [props.animated=true] - Enable entrance and hover animations
 * @param {string} [props.className] - Additional custom classes
 * @param {boolean} [props.withSparkle=false] - Add sparkle animation effect
 */
export default function SectionBadge({
  icon: Icon,
  label,
  variant = "default",
  size = "md",
  animated = true,
  className = "",
  withSparkle = false,
}) {
  // Size configurations
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[10px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
    lg: "px-4 py-1.5 text-sm gap-2.5",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  // Variant configurations
  const variantClasses = {
    default: `
      border-cyan-400/30 
      bg-linear-to-r from-indigo-950/50 to-slate-900/50 
      text-cyan-200 
      backdrop-blur-sm
      hover:border-cyan-400/50
      hover:from-indigo-900/50
      hover:to-slate-800/50
    `,
    glow: `
      border-cyan-400/40 
      bg-indigo-950/60 
      text-cyan-100 
      backdrop-blur-md
      shadow-lg shadow-cyan-500/20
      hover:shadow-cyan-500/40
      hover:border-cyan-400/60
    `,
    gradient: `
      border-transparent
      bg-linear-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20
      text-transparent bg-clip-text
      backdrop-blur-sm
      relative
      before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-r before:from-cyan-400 before:via-indigo-500 before:to-purple-500 before:-z-10
      after:absolute after:inset-0 after:rounded-full after:bg-slate-900/90 after:-z-10
    `,
    minimal: `
      border-white/10
      bg-transparent
      text-indigo-300
      backdrop-blur-sm
      hover:border-cyan-400/30
      hover:text-cyan-300
    `,
    outline: `
      border-cyan-400/20
      bg-transparent
      text-cyan-300
      hover:border-cyan-400/50
      hover:bg-cyan-400/5
    `,
  };

  // Icon color variants
  const iconColors = {
    default: "text-cyan-400",
    glow: "text-cyan-300",
    gradient: "text-cyan-400",
    minimal: "text-indigo-400",
    outline: "text-cyan-400",
  };

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.1,
      },
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconAnimation = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const sparkleAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  const BadgeContent = () => (
    <>
      {/* Main Icon */}
      <motion.div
        variants={iconAnimation}
        initial="initial"
        whileHover="hover"
        className="relative"
      >
        <Icon className={`${iconSizes[size]} ${iconColors[variant]}`} />

        {/* Icon glow effect */}
        {variant === "glow" && (
          <div
            className={`absolute inset-0 ${iconSizes[size]} bg-cyan-400/30 blur-md -z-10`}
          />
        )}
      </motion.div>

      {/* Label */}
      <span
        className={`font-semibold tracking-wider ${variant === "gradient" ? "bg-linear-to-r from-cyan-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent" : ""}`}
      >
        {label}
      </span>

      {/* Optional Sparkle */}
      {withSparkle && (
        <motion.div
          variants={sparkleAnimation}
          initial="initial"
          animate="animate"
          className="ml-1"
        >
          <Sparkles className={`${iconSizes[size]} text-yellow-400`} />
        </motion.div>
      )}

      {/* Decorative elements for gradient variant */}
      {variant === "gradient" && (
        <>
          <div className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400/50 blur-sm" />
          <div className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-purple-400/50 blur-sm" />
        </>
      )}
    </>
  );

  // Base classes
  const baseClasses = `
    relative
    inline-flex 
    items-center 
    rounded-full 
    border 
    font-medium 
    uppercase 
    tracking-wider
    transition-all 
    duration-300
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  // Return with or without animations
  if (!animated) {
    return (
      <span className={baseClasses}>
        <Icon className={`${iconSizes[size]} ${iconColors[variant]}`} />
        <span>{label}</span>
        {withSparkle && (
          <Sparkles className={`${iconSizes[size]} text-yellow-400`} />
        )}
      </span>
    );
  }

  return (
    <motion.span
      className={baseClasses}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover="hover"
      whileTap="tap"
    >
      {/* Animated border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, #06B6D4, #6366F1, #A855F7)",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <BadgeContent />
    </motion.span>
  );
}

// Usage Examples:
/*
// Default style with animation
<SectionBadge icon={Rocket} label="Our Process" />

// Glow variant with sparkle
<SectionBadge 
  icon={Sparkles} 
  label="Featured" 
  variant="glow" 
  withSparkle 
/>

// Gradient variant (large size)
<SectionBadge 
  icon={Zap} 
  label="Premium Feature" 
  variant="gradient" 
  size="lg" 
/>

// Minimal variant without animation
<SectionBadge 
  icon={Target} 
  label="Step 1" 
  variant="minimal" 
  animated={false} 
/>

// Outline variant (small)
<SectionBadge 
  icon={CheckCircle} 
  label="Completed" 
  variant="outline" 
  size="sm" 
/>
*/
