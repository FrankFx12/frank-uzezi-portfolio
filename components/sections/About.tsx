"use client";

import { motion } from "framer-motion";
import { philosophy } from "@/lib/data/about";

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[150px]" />

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
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Building With <span className="text-gradient">Purpose</span>
          </h2>
        </motion.div>

        {/* Main Content: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              I'm Frank Uzezi — a web developer and digital experience designer with over a decade of hands-on experience building production-grade systems. I partner with businesses to transform ideas into fast, responsive, and visually striking digital products.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              My focus is on clean code, intuitive interfaces, and measurable business results. Whether it's a corporate website, a property listing platform, or a full-scale web application, I build with purpose and precision.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              I believe every business deserves a digital presence that not only looks premium but also drives real growth.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div className="absolute w-[300px] h-[300px] bg-accent-violet/10 rounded-full blur-[80px]" />
            <div className="relative w-full max-w-[400px] rounded-3xl overflow-hidden border border-accent-violet/30 shadow-glow">
              <img
                src="https://i.postimg.cc/1zFWgL8j/5801197251831992584.jpg"
                alt="Frank Uzezi"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophy.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="bg-navy-800/50 border border-white/10 rounded-2xl p-6 hover:border-accent-blue/50 hover:shadow-glow transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-accent-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}