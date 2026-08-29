"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/data/industries";

export function Industries() {
  return (
    <section id="industries" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-accent-blue font-medium text-sm uppercase tracking-widest mb-3 block">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built For <span className="text-gradient">Different Businesses</span>
          </h2>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-navy-800/50 border border-white/10 rounded-2xl p-6 hover:border-accent-violet/50 hover:shadow-glow transition-all duration-300 overflow-hidden"
            >
              {/* Hover Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <industry.icon className="w-10 h-10 text-accent-blue mb-4 group-hover:text-accent-violet transition-colors duration-300" />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {industry.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}