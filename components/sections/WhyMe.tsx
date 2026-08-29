"use client";

import { motion } from "framer-motion";
import { whyMe } from "@/lib/data/whyMe";

export function WhyMe() {
  return (
    <section id="why-me" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[120px]" />

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
            The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Work <span className="text-gradient">With Frank</span>
          </h2>
          <p className="text-text-secondary max-w-2xl">
            I combine technical expertise with a deep understanding of business goals to deliver digital products that perform.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyMe.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-navy-800/50 border border-white/10 rounded-2xl p-8 hover:border-accent-blue/50 hover:shadow-glow transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 flex items-center justify-center mb-6 group-hover:from-accent-blue group-hover:to-accent-violet transition-all duration-500">
                <item.icon className="w-7 h-7 text-accent-blue group-hover:text-white transition-colors duration-500" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}