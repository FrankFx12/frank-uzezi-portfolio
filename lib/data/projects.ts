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
    image: "/images/projects/prime-land.jpg",
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
    image: "/images/projects/edo-youth.jpg",
    link: "edoyouthimpactforum.com",
    tech: ["React", "Node.js"],
  },
  {
    id: 3,
    title: "Health Career Boost",
    category: "Healthcare Education",
    description: "Platform for career guidance and education in the health sector.",
    image: "/images/projects/health-career.jpg",
    link: "healthcareerboost.co.uk",
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 4,
    title: "HeatFlow Experts",
    category: "HVAC Services",
    description: "Service-oriented website for heating and cooling specialists.",
    image: "/images/projects/heatflow.jpg",
    link: "", // Will be added via admin panel
    tech: ["React", "CSS"],
  },
  {
    id: 5,
    title: "Izoduwa Asemota",
    category: "Personal Brand",
    description: "Elegant portfolio for a creative professional.",
    image: "/images/projects/izoduwa.jpg",
    link: "", // Will be added via admin panel
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 6,
    title: "Kiid Africa",
    category: "Non-Profit",
    description: "Website for a children's charity with donation and awareness.",
    image: "/images/projects/kiid-africa.jpg",
    link: "kiid.africa",
    tech: ["React", "Node.js"],
  },
  {
    id: 7,
    title: "Migrants Welfare",
    category: "Support Platform",
    description: "Resource portal for migrant assistance and integration.",
    image: "/images/projects/migrants.jpg",
    link: "", // Will be added via admin panel
    tech: ["Next.js"],
  },
  {
    id: 8,
    title: "Tech Scholar",
    category: "Education",
    description: "Online learning platform for technology skills.",
    image: "/images/projects/tech-scholar.jpg",
    link: "usetechscholar.com",
    tech: ["React", "Tailwind"],
  },
  {
    id: 9,
    title: "SiC Africa",
    category: "Organization",
    description: "Corporate and informational site for an African organisation.",
    image: "/images/projects/sic-africa.jpg",
    link: "sic.africa",
    tech: ["Next.js", "CSS"],
  },
  {
    id: 10,
    title: "TriFRM",
    category: "Business Platform",
    description: "Multi-purpose business management tool.",
    image: "/images/projects/trifrm.jpg",
    link: "trifrm.org",
    tech: ["React", "Node.js"],
  },
  {
    id: 11,
    title: "Vine Interiors",
    category: "Interior Design",
    description: "Showcase for an interior design studio.",
    image: "/images/projects/vine.jpg",
    link: "", // Will be added via admin panel
    tech: ["Next.js", "Tailwind"],
  },
  {
    id: 12,
    title: "Cyan University",
    category: "Education",
    description: "University website with courses, admissions, and campus info.",
    image: "/images/projects/cyan-university.jpg",
    link: "cyan.university",
    tech: ["React", "Next.js"],
  },
];