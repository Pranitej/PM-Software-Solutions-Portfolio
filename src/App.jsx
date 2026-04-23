import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Sparkles, ArrowUp } from "lucide-react";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Advantages from "./components/Advantages";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Add hover detection for interactive elements
    const handleLinkHover = () => setCursorVariant("hover");
    const handleLinkLeave = () => setCursorVariant("default");
    const handleButtonHover = () => setCursorVariant("button");
    const handleCardHover = () => setCursorVariant("card");

    const links = document.querySelectorAll('a, button, [role="button"]');
    const cards = document.querySelectorAll('.group, [data-hover="card"]');

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleCardHover);
      card.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });

      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleCardHover);
        card.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [isVisible]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: isVisible ? 1 : 0,
      mixBlendMode: "difference",
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      opacity: isVisible ? 1 : 0,
    },
    card: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 2.5,
      opacity: isVisible ? 0.15 : 0,
    },
    clicking: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
      opacity: isVisible ? 1 : 0,
    },
  };

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mousePosition.x - 16, springConfig);
  const cursorY = useSpring(mousePosition.y - 16, springConfig);

  const currentVariant = isClicking ? "clicking" : cursorVariant;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9999 h-8 w-8 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={variants}
        animate={currentVariant}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />

      {/* Cursor ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9998 h-8 w-8 rounded-full border-2 border-cyan-400/50"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={variants}
        animate={currentVariant}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      />
    </>
  );
};

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-10000 flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-8 h-16 w-16"
        >
          <Sparkles className="h-full w-full text-cyan-400" />
        </motion.div>

        <div className="relative h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 font-mono text-sm text-cyan-300">
          Loading experience... {progress}%
        </p>
      </div>
    </motion.div>
  );
};

// Progress Bar Component
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-100 h-0.5 origin-left bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500"
      style={{ scaleX }}
    />
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 rounded-full border border-white/20 bg-linear-to-br from-indigo-600 to-purple-700 p-3 shadow-2xl shadow-indigo-500/30 backdrop-blur-sm transition-all hover:shadow-indigo-500/50"
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-400/20 to-purple-500/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
          <ArrowUp className="relative h-5 w-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomCursor, setIsCustomCursor] = useState(true);
  const mainRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsCustomCursor(false);
    }

    const handleChange = (e) => {
      setIsCustomCursor(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <PageTransition>
            <div className="relative min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 antialiased">
              {/* Progress Bar */}
              <ProgressBar />

              {/* Custom Cursor (respects reduced motion) */}
              {isCustomCursor && <CustomCursor />}

              {/* Header */}
              <Header />

              {/* Main Content */}
              <main ref={mainRef} className="relative">
                <Hero />
                <Services />
                <Projects />
                <Advantages />
                <Process />
                <Testimonials />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />

              {/* Scroll to Top */}
              <ScrollToTop />

              {/* Decorative Elements */}
              <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M50%200L100%2050L50%20100L0%2050L50%200Z%22%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-opacity%3D%220.01%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-20" />
              </div>

              {/* Corner Accents */}
              <div className="pointer-events-none fixed left-0 top-0 z-50 h-32 w-32 bg-linear-to-br from-cyan-500/10 to-transparent blur-3xl" />
              <div className="pointer-events-none fixed bottom-0 right-0 z-50 h-32 w-32 bg-linear-to-tl from-purple-500/10 to-transparent blur-3xl" />
            </div>
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}
