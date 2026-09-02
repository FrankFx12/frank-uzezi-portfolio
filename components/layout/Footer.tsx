"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Send, Mail } from "lucide-react";
import { useSiteConfig } from "@/lib/SiteConfigProvider";
import { trackClick } from "@/lib/utils/tracking";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Projects", href: "#projects" },
  { label: "Technologies", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { config: siteConfig } = useSiteConfig();
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappPrimary.replace("+", "")}?text=Hi%20Frank%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20working%20with%20you%20on%20a%20project.`;

  // Track footer social clicks
  const handleSocialClick = (platform: string) => {
    trackClick(`Footer_${platform}`);
  };

  return (
    <footer className="relative border-t border-white/10 bg-navy-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left: Brand */}
          <div className="flex flex-col items-start">
            <Logo size={32} showText={false} />
            <span className="text-white font-bold text-lg mt-3">FRANK UZEZI</span>
            <p className="text-text-secondary text-sm mt-2">
              CEO • Web Developer & Digital Experience Designer
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("WhatsApp")}
                className="text-text-secondary hover:text-accent-blue transition-colors"
                aria-label="WhatsApp"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                onClick={() => handleSocialClick("Email")}
                className="text-text-secondary hover:text-accent-blue transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("Instagram")}
                className="text-text-secondary hover:text-accent-blue transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("Twitter")}
                className="text-text-secondary hover:text-accent-blue transition-colors"
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("TikTok")}
                className="text-text-secondary hover:text-accent-blue transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-text-tertiary text-sm">{siteConfig.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}