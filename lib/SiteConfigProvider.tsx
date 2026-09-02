"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/utils/tracking";

const defaultConfig = {
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
  availability: "Available for New Projects",
  // Add copyright here
  copyright: "© 2026 Frank Uzezi. All rights reserved.",
  projectLinks: {} as Record<string, string>,
};

interface SiteConfigContextType {
  config: typeof defaultConfig;
  loading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: defaultConfig,
  loading: true,
});

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data: siteConfig, error: configError } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 1)
          .single();

        const { data: projectLinksData, error: linksError } = await supabase
          .from('project_links')
          .select('*');

        if (!configError && siteConfig) {
          setConfig((prev) => ({
            ...prev,
            contact: {
              whatsappPrimary: siteConfig.whatsapp_primary || prev.contact.whatsappPrimary,
              whatsappSecondary: siteConfig.whatsapp_secondary || prev.contact.whatsappSecondary,
              email: siteConfig.email || prev.contact.email,
            },
            social: {
              ...prev.social,
              instagram: siteConfig.instagram || prev.social.instagram,
              tiktok: siteConfig.tiktok || prev.social.tiktok,
              twitter: siteConfig.twitter || prev.social.twitter,
              linkedin: siteConfig.linkedin || prev.social.linkedin,
            },
          }));
        }

        if (!linksError && projectLinksData) {
          const links: Record<string, string> = {};
          projectLinksData.forEach((item: any) => {
            if (item.link) links[item.project_name] = item.link;
          });
          setConfig((prev) => ({ ...prev, projectLinks: links }));
        }
      } catch (error) {
        console.error("Error fetching config from Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}