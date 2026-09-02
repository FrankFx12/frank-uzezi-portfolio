"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSiteConfig } from "@/lib/SiteConfigProvider";
import { trackClick } from "@/lib/utils/tracking";

const navLinks = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Services", href: "#services" },
  { number: "03", label: "Industries", href: "#industries" },
  { number: "04", label: "Projects", href: "#projects" },
  { number: "05", label: "Technologies", href: "#technologies" },
  { number: "06", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { config: siteConfig } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Build WhatsApp link inside component (so it updates when admin changes it)
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappPrimary.replace("+", "")}?text=Hi%20Frank%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20working%20with%20you%20on%20a%20project.`;

  // Track "Let's Talk" clicks
  const handleTalkClick = () => {
    trackClick("Navbar_Lets_Talk");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-navy-950/80 backdrop-blur-md py-4 shadow-lg shadow-navy-950/50"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <Logo size={32} showText={false} />
            <span className="text-white font-bold tracking-wide text-lg hidden sm:block">
              FRANK UZEZI
            </span>
          </a>

          {/* Center/Right: Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.number}
                href={link.href}
                className="text-sm text-text-secondary hover:text-white transition-colors duration-300 group"
              >
                <span className="text-accent-blue font-medium mr-1 group-hover:text-accent-violet">
                  {link.number}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Desktop CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTalkClick}
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-violet text-white text-sm font-medium hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
          >
            Let's Talk →
          </a>

          {/* Right: Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-navy-900 border-l border-white/10 flex flex-col p-6"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8">
                <Logo size={28} showText={false} />
                <span className="text-white font-bold">FRANK UZEZI</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white p-2"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-4 flex-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.number}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="text-2xl font-semibold text-text-secondary hover:text-white transition-colors"
                  >
                    <span className="text-accent-blue text-sm font-medium mr-2">
                      {link.number}
                    </span>
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Drawer CTA */}
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleTalkClick();
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium"
              >
                Let's Talk →
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}