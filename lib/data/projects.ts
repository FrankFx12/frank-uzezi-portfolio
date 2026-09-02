export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
  featured?: boolean;
  demo?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Prime Land",
    category: "Real Estate Platform",
    description: "A modern property discovery platform with advanced search, listing filtering, and enquiry workflows.",
    image: "https://s.wordpress.com/mshots/v1/prime-land-sales.onrender.com?w=800",
    link: "https://prime-land-sales.onrender.com/",
    tech: ["React", "Next.js", "Tailwind CSS"],
    featured: true,
    demo: true,
  },
  {
    id: 2,
    title: "Edo Youth Impact Forum",
    category: "Community Platform",
    description: "A digital hub for youth engagement, events, and resources.",
    image: "https://s.wordpress.com/mshots/v1/edoyouthimpactforum.com?w=800",
    link: "edoyouthimpactforum.com",
    tech: ["React", "Node.js"],
  },
  {
    id: 3,
    title: "Health Career Boost",
    category: "Healthcare Education",
    description: "Platform for career guidance and education in the health sector.",
    image: "https://s.wordpress.com/mshots/v1/healthcareerboost.co.uk?w=800",
    link: "healthcareerboost.co.uk",
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 4,
    title: "HeatFlow Experts",
    category: "HVAC Services",
    description: "Service-oriented website for heating and cooling specialists.",
    image: "https://s.wordpress.com/mshots/v1/heatflowexperts.co.u?w=800",
    link: "",
    tech: ["React", "CSS"],
  },
  {
    id: 5,
    title: "Izoduwa Asemota",
    category: "Personal Brand",
    description: "Elegant portfolio for a creative professional.",
    image: "https://s.wordpress.com/mshots/v1/izoduwaasemota.com?w=800",
    link: "",
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 6,
    title: "Kiid Africa",
    category: "Non-Profit",
    description: "Website for a children's charity with donation and awareness.",
    image: "https://s.wordpress.com/mshots/v1/kiid.africa?w=800",
    link: "kiid.africa",
    tech: ["React", "Node.js"],
  },
  {
    id: 7,
    title: "Migrants Welfare",
    category: "Support Platform",
    description: "Resource portal for migrant assistance and integration.",
    image: "https://s.wordpress.com/mshots/v1/migrantswelfare.org?w=800",
    link: "",
    tech: ["Next.js"],
  },
  {
    id: 8,
    title: "Tech Scholar",
    category: "Education",
    description: "Online learning platform for technology skills.",
    image: "https://s.wordpress.com/mshots/v1/usetechscholar.com?w=800",
    link: "usetechscholar.com",
    tech: ["React", "Tailwind"],
  },
  {
    id: 9,
    title: "SiC Africa",
    category: "Organization",
    description: "Corporate and informational site for an African organisation.",
    image: "https://s.wordpress.com/mshots/v1/sic.africa?w=800",
    link: "sic.africa",
    tech: ["Next.js", "CSS"],
  },
  {
    id: 10,
    title: "TriFRM",
    category: "Business Platform",
    description: "Multi-purpose business management tool.",
    image: "https://s.wordpress.com/mshots/v1/trifrm.org?w=800",
    link: "trifrm.org",
    tech: ["React", "Node.js"],
  },
  {
    id: 11,
    title: "Vine Interiors",
    category: "Interior Design",
    description: "Showcase for an interior design studio.",
    image: "https://s.wordpress.com/mshots/v1/vineinteriors.com?w=800",
    link: "",
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 12,
    title: "Cyan University",
    category: "Education",
    description: "University website with courses, admissions, and campus info.",
    image: "https://s.wordpress.com/mshots/v1/cyan.university?w=800",
    link: "cyan.university",
    tech: ["React", "Next.js"],
  },
];