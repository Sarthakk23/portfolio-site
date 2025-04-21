import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = ["Frontend Developer", "Graphic Designer", "App Developer"];

export default function SubtitleAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 3000); // Reduced interval to 3s for better visibility
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="subtitle-wrapper">
      <AnimatePresence mode="wait">
        <motion.p
          key={titles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-subtitle"
        >
          {titles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}