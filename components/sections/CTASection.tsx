"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteConfig } from "@/lib/SiteConfigProvider";

export function CTASection() {
  const { config: siteConfig } = useSiteConfig();
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappPrimary.replace("+", "")}?text=Hi%20Frank%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20working%20with%20you%20on%20a%20project.`;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent-violet/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Have A Project <span className="text-gradient">In Mind?</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Let's build a digital experience that gives your business the presence it deserves.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button href="#contact" variant="primary" className="px-8 py-4 text-lg" trackName="CTA_Start_Project">
            Start a Project <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href={whatsappHref} variant="outline" className="px-8 py-4 text-lg" trackName="CTA_WhatsApp">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}