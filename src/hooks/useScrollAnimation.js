import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function useScrollAnimation(threshold = 0.2) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    threshold,
    triggerOnce: true,
    margin: "-50px 0px",
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls };
}
