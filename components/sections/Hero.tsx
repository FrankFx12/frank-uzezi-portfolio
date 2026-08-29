"use client";

import { motion } from "framer-motion";
import { Send, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSiteConfig } from "@/content/site.config";

export function Hero() {
  const siteConfig = getSiteConfig();
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappPrimary.replace("+", "")}?text=Hi%20Frank%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20working%20with%20you%20on%20a%20project.`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text */}
          <div>
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-accent-blue/30 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-text-secondary">{siteConfig.availability}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
            >
              Building Modern <span className="text-gradient">Digital Experiences</span> That Help Businesses Grow.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-text-secondary mb-4 font-medium"
            >
              CEO • Web Developer & Digital Experience Designer
            </motion.p>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-text-secondary mb-8 max-w-xl leading-relaxed"
            >
              I create modern business websites, real-estate platforms, restaurant sites, portfolio showcases, high-converting landing pages, and custom web applications — designed to turn visitors into customers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button href="#projects" variant="primary" trackName="Hero_View_Work">View My Work</Button>
              <Button href={whatsappHref} variant="outline" trackName="Hero_WhatsApp">Let's Work Together</Button>
            </motion.div>

            {/* Quick Contact Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <span className="text-text-tertiary text-sm uppercase tracking-wider">Follow:</span>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-blue transition-colors" aria-label="WhatsApp">
                <Send className="w-5 h-5" />
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-text-secondary hover:text-accent-blue transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-blue transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-blue transition-colors" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Visual/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-[400px] h-[400px] bg-accent-blue/20 rounded-full blur-[100px]" />
            
            <div className="relative w-full max-w-[400px] rounded-3xl overflow-hidden border-2 border-accent-blue/30 shadow-glow">
              <img src="https://i.postimg.cc/1zFWgL8j/5801197251831992584.jpg" alt="Frank Uzezi" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent pointer-events-none" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-navy-800 px-4 py-2 rounded-xl border border-accent-blue/30 shadow-lg"
            >
              <span className="text-accent-blue font-bold text-xl">10+</span>
              <span className="text-text-secondary text-xs ml-1">Years Exp.</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}