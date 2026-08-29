// Default config (fallback if no saved data)
const defaultConfig = {
  name: "Frank Uzezi",
  role: "CEO • Web Developer & Digital Experience Designer",

  contact: {
    whatsappPrimary: "+2348161889155",
    whatsappSecondary: "+2347079443515",
    email: "marouzezi14@gmail.com",
  },

  social: {
    instagram: "",
    linkedin: "",
    tiktok: "https://vm.tiktok.com/ZS9BANYVRqsX6-V952f/",
    twitter: "https://x.com/Frankuzezi",
  },

  admin: {
    username: "Frank12",
    password: "134679",
  },

  availability: "Available for New Projects",
  copyright: "© 2026 Frank Uzezi. All rights reserved.",

  // Add projectLinks to default config
  projectLinks: {},
};

// Function to load saved config from localStorage
export function getSiteConfig() {
  if (typeof window === "undefined") return defaultConfig;
  
  try {
    const saved = localStorage.getItem("frank_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultConfig,
        contact: {
          ...defaultConfig.contact,
          whatsappPrimary: parsed.whatsapp1 || defaultConfig.contact.whatsappPrimary,
          whatsappSecondary: parsed.whatsapp2 || defaultConfig.contact.whatsappSecondary,
          email: parsed.email || defaultConfig.contact.email,
        },
        social: {
          ...defaultConfig.social,
          instagram: parsed.instagram || defaultConfig.social.instagram,
          tiktok: parsed.tiktok || defaultConfig.social.tiktok,
          twitter: parsed.twitter || defaultConfig.social.twitter,
          linkedin: parsed.linkedin || defaultConfig.social.linkedin,
        },
        projectLinks: parsed.projectLinks || {}, // Now this exists
      };
    }
  } catch (error) {
    console.error("Error loading config:", error);
  }
  
  return defaultConfig;
}

// Keep default export for backward compatibility
export const siteConfig = defaultConfig;