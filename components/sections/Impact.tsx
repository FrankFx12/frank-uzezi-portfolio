"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data/impact";

// Custom hook to animate numbers when in view
function useCountUp(target: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, target, duration]);

  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative text-center p-8 bg-navy-800/50 border border-white/10 rounded-2xl hover:border-accent-blue/50 hover:shadow-glow transition-all duration-500"
    >
      {/* Number */}
      <div className="text-5xl lg:text-6xl font-bold text-gradient mb-2">
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-white mb-2">
        {stat.label}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm">
        {stat.description}
      </p>
    </motion.div>
  );
}

export function Impact() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-accent-blue font-medium text-sm uppercase tracking-widest mb-3 block">
            Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            By The <span className="text-gradient">Numbers</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}