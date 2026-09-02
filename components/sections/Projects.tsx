"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";
import { getSiteConfig } from "@/content/site.config";
import { useRef } from "react";

function formatLink(link: string) {
  if (!link) return "";
  try {
    return new URL(link).toString();
  } catch {
    return `https://${link}`;
  }
}

// ProjectCard with auto-scroll + parallax
function ProjectCard({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax touch handling
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const relativeX = (touch.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (touch.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleTouchEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-navy-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-violet/50 hover:shadow-glow transition-all duration-500 ${
        isFeatured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      {/* Image Container with Auto-Scroll */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 ${isFeatured ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}>
        {/* Full page image that scrolls */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/0 transition-colors duration-500" />
        
        {project.demo && (
          <span className="absolute top-4 left-4 bg-amber-500/90 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Demo
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-accent-blue text-xs font-medium mb-2 block">
          {project.category}
        </span>
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[10px] font-medium text-text-secondary bg-white/5 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.link ? (
          <a
            href={formatLink(project.link)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-violet transition-colors"
          >
            View Project
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-text-tertiary text-sm">Link coming soon</span>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const siteConfig = getSiteConfig();
  const adminLinks = siteConfig.projectLinks || {};

  const mergedProjects = projects.map((p) => {
    if (adminLinks[p.title]) return { ...p, link: adminLinks[p.title] };
    return p;
  });

  const featured = mergedProjects.find((p) => p.featured);
  const otherProjects = mergedProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (keep same) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-accent-blue font-medium text-sm uppercase tracking-widest mb-3 block">Selected Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-text-secondary max-w-2xl">Showcase of modern websites and digital experiences across different industries.</p>
        </motion.div>

        {/* Featured Project (Prime Land) */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <ProjectCard project={featured} isFeatured={true} />
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}