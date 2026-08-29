"use client";
import { Logo } from "@/components/brand/Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500); // Short pause before exit
          return 100;
        }
        // Random smooth increments
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
          exit={{ opacity: 0, y: -80, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Ambient Glow Background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-blue/10 blur-[120px]" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-accent-violet/10 blur-[100px] translate-x-40" />

          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-6"
          >
            <Logo size={80} showText={false} />
          </motion.div>

          {/* Text Reveal */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.15em" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-2xl font-bold text-white mb-8"
          >
            FRANK UZEZI
          </motion.h1>

          {/* Progress Bar */}
          <div className="relative z-10 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-violet"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="relative z-10 mt-4 text-sm text-text-secondary font-medium">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}