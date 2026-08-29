"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/process";

export function Process() {
  return (
    <section id="process" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-blue/5 rounded-full blur-[150px]" />

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
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How I <span className="text-gradient">Work</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A clear, structured process that ensures every project is delivered on time and exceeds expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center lg:text-left"
            >
              {/* Number Circle */}
              <div className="relative z-10 w-20 h-20 mx-auto lg:mx-0 rounded-2xl bg-navy-800 border border-white/10 flex items-center justify-center mb-6 hover:border-accent-blue/50 transition-colors duration-300 shadow-glow">
                <span className="text-2xl font-bold text-gradient">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}