"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/data/technologies";
import { Monitor, Server } from "lucide-react";

export function Technologies() {
  return (
    <section id="technologies" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />

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
            Technologies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Technology & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            I use a modern, production-ready stack to build fast, scalable, and maintainable digital products.
          </p>
        </motion.div>

        {/* Frontend Group */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Monitor className="w-6 h-6 text-accent-blue" />
            <h3 className="text-xl font-semibold">Frontend</h3>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {technologies.frontend.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="px-6 py-3 bg-navy-800/50 border border-white/10 rounded-full text-white font-medium hover:border-accent-blue/50 hover:shadow-glow transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend Group */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Server className="w-6 h-6 text-accent-violet" />
            <h3 className="text-xl font-semibold">Backend</h3>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {technologies.backend.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="px-6 py-3 bg-navy-800/50 border border-white/10 rounded-full text-white font-medium hover:border-accent-violet/50 hover:shadow-glow transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note about future expansion */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-text-tertiary text-sm mt-12"
        >
          * This list is continuously expanding as I learn and adopt new technologies.
        </motion.p>
      </div>
    </section>
  );
}