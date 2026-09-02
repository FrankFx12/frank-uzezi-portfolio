"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";
import { getSiteConfig } from "@/content/site.config";

function formatLink(link: string) {
  if (!link) return "";
  try {
    return new URL(link).toString();
  } catch {
    return `https://${link}`;
  }
}

export function Projects() {
  const siteConfig = getSiteConfig();
  const adminLinks = siteConfig.projectLinks || {};

  const mergedProjects: Project[] = projects.map((p) => {
    if (adminLinks[p.title]) return { ...p, link: adminLinks[p.title] };
    return p;
  });

  const featured = mergedProjects.find((p) => p.featured);
  const otherProjects = mergedProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
            className="group relative bg-navy-800/50 border border-accent-blue/30 rounded-3xl overflow-hidden mb-20 hover:shadow-glow transition-all duration-500"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image Side - VISIBLE BY DEFAULT */}
              <div className="relative aspect-square lg:aspect-auto lg:h-full overflow-hidden bg-navy-900">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/0 transition-colors duration-500" />
                {featured.demo && (
                  <span className="absolute top-6 left-6 z-20 bg-amber-500/90 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Demo</span>
                )}
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-accent-blue text-sm font-medium mb-2">{featured.category}</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">{featured.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{featured.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium text-accent-blue bg-accent-blue/10 rounded-full border border-accent-blue/20">{tech}</span>
                  ))}
                </div>

                {featured.link ? (
                  <a href={formatLink(featured.link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-blue transition-colors group/btn">
                    Live Demo <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-text-tertiary text-sm">Link coming soon</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid - VISIBLE BY DEFAULT */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative bg-navy-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-violet/50 hover:shadow-glow transition-all duration-500"
            >
              {/* Image Container - Real image shows immediately */}
              <div className="relative aspect-video overflow-hidden bg-navy-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              <div className="p-6">
                <span className="text-accent-blue text-xs font-medium mb-2 block">{project.category}</span>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>

                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-medium text-text-secondary bg-white/5 rounded">{tech}</span>
                    ))}
                  </div>
                )}

                {project.link ? (
                  <a href={formatLink(project.link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-violet transition-colors">
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-text-tertiary text-sm">Link coming soon</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}