"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />

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
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            What I <span className="text-gradient">Build</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Premium digital solutions tailored to help your business stand out and grow online.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative bg-navy-800/50 border border-white/10 rounded-2xl p-8 hover:border-accent-blue/50 hover:shadow-glow transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Large Number */}
              <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                {service.number}
              </span>

              {/* Icon */}
              <service.icon className="w-12 h-12 text-accent-blue mb-6 group-hover:text-accent-violet transition-colors duration-300" />

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}