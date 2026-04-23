import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Advanced Page Transition Component with Multiple Variants
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} [props.variant="slide"] - Transition style: "fade", "slide", "scale", "glitch", "liquid", "door", "flip", "none"
 * @param {number} [props.duration=0.6] - Animation duration in seconds
 * @param {number} [props.delay=0] - Delay before animation starts
 * @param {string} [props.direction="up"] - Direction for slide variant: "up", "down", "left", "right"
 * @param {boolean} [props.loading=false] - Show loading state during transition
 * @param {string} [props.className] - Additional wrapper classes
 */
export default function PageTransition({
  children,
  variant = "slide",
  duration = 0.6,
  delay = 0,
  direction = "up",
  loading = false,
  className = "",
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    if (loading) {
      setIsTransitioning(true);
      const timer = setTimeout(
        () => {
          setCurrentChildren(children);
          setIsTransitioning(false);
        },
        duration * 1000 + delay * 1000,
      );
      return () => clearTimeout(timer);
    } else {
      setCurrentChildren(children);
    }
  }, [children, loading, duration, delay]);

  // Direction-based animations
  const directionVariants = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const initialDirection = directionVariants[direction] || directionVariants.up;
  const exitDirection = {
    up: { y: -40 },
    down: { y: 40 },
    left: { x: -40 },
    right: { x: 40 },
  }[direction] || { y: -40 };

  // Transition variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, ...initialDirection },
      animate: { opacity: 1, y: 0, x: 0 },
      exit: { opacity: 0, ...exitDirection },
    },
    scale: {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
    },
    glitch: {
      initial: {
        opacity: 0,
        x: 0,
        filter: "blur(0px)",
      },
      animate: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
          opacity: { duration: duration * 0.3 },
          x: {
            duration: duration * 0.5,
            repeat: 2,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            values: [0, -5, 3, -2, 1, 0],
          },
          filter: {
            duration: duration * 0.3,
            times: [0, 0.5, 1],
            values: ["blur(0px)", "blur(2px)", "blur(0px)"],
          },
        },
      },
      exit: {
        opacity: 0,
        x: 0,
        filter: "blur(2px)",
        transition: {
          opacity: { duration: duration * 0.3 },
          filter: { duration: duration * 0.2 },
        },
      },
    },
    liquid: {
      initial: {
        opacity: 0,
        scale: 0.8,
        rotate: -2,
        borderRadius: "40% 60% 30% 70% / 50% 40% 60% 50%",
      },
      animate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        borderRadius: "0%",
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
        },
      },
      exit: {
        opacity: 0,
        scale: 1.2,
        rotate: 3,
        borderRadius: "60% 40% 70% 30% / 40% 50% 50% 60%",
      },
    },
    door: {
      initial: {
        opacity: 0,
        clipPath: "inset(0 50% 0 50%)",
      },
      animate: {
        opacity: 1,
        clipPath: "inset(0 0% 0 0%)",
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 120,
        },
      },
      exit: {
        opacity: 0,
        clipPath: "inset(0 50% 0 50%)",
      },
    },
    flip: {
      initial: {
        opacity: 0,
        rotateX: 90,
        transformPerspective: 1000,
      },
      animate: {
        opacity: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
        },
      },
      exit: {
        opacity: 0,
        rotateX: -90,
      },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  const selectedVariant = variants[variant] || variants.slide;

  // Custom easing functions
  const easings = {
    smooth: [0.22, 1, 0.36, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.68, -0.6, 0.32, 1.6],
    linear: [0, 0, 1, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  };

  // Loading overlay
  if (isTransitioning) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mx-auto mb-6 h-12 w-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-linear-to-r from-cyan-200 to-indigo-200 bg-clip-text text-sm font-medium text-transparent"
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
        transition={{
          duration: duration,
          delay: delay,
          ease: easings.smooth,
        }}
        className={className}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {currentChildren}

        {/* Overlay effects for certain variants */}
        {variant === "glitch" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                x: [0, 3, -2, 0],
              }}
              transition={{
                duration: duration,
                times: [0, 0.3, 0.6, 1],
              }}
              className="pointer-events-none fixed inset-0 z-40 bg-linear-to-r from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-screen"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.2, 0],
                x: [0, -2, 3, 0],
              }}
              transition={{
                duration: duration,
                times: [0, 0.3, 0.6, 1],
              }}
              className="pointer-events-none fixed inset-0 z-40 bg-linear-to-r from-purple-500/20 via-transparent to-cyan-500/20 mix-blend-screen"
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Usage Examples:

/*
// 1. Basic fade transition
<PageTransition variant="fade">
  <YourComponent />
</PageTransition>

// 2. Slide transition with custom direction
<PageTransition variant="slide" direction="left" duration={0.5}>
  <YourComponent />
</PageTransition>

// 3. Glitch effect for tech pages
<PageTransition variant="glitch" duration={0.8}>
  <YourComponent />
</PageTransition>

// 4. Liquid morphing transition
<PageTransition variant="liquid">
  <YourComponent />
</PageTransition>

// 5. Door opening effect
<PageTransition variant="door" duration={0.7}>
  <YourComponent />
</PageTransition>

// 6. 3D flip transition
<PageTransition variant="flip">
  <YourComponent />
</PageTransition>

// 7. With loading state
<PageTransition loading={isLoading} variant="slide">
  <YourComponent />
</PageTransition>

// 8. No animation (instant)
<PageTransition variant="none">
  <YourComponent />
</PageTransition>
*/

// Advanced Usage with Router Integration:
/*
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Dynamic variant based on route
  const getTransitionVariant = (pathname) => {
    if (pathname === "/") return "scale";
    if (pathname.includes("work")) return "glitch";
    if (pathname.includes("about")) return "liquid";
    return "slide";
  };

  return (
    <PageTransition 
      variant={getTransitionVariant(router.pathname)}
      duration={0.6}
    >
      <Component {...pageProps} />
    </PageTransition>
  );
}
*/
