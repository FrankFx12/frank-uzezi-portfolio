"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Phone, User, Building2, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteConfig } from "@/lib/SiteConfigProvider";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  business: z.string().min(1, "Business/Company is required"),
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { config: siteConfig } = useSiteConfig();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission by opening email client with pre-filled details
  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Project Inquiry - ${data.business}`);
    const body = encodeURIComponent(
      `Hi Frank,\n\nI'm interested in working with you on a project.\n\nMy name: ${data.name}\nBusiness: ${data.business}\nProject type: ${data.projectType}\n\nMessage:\n${data.message}\n\nThank you.`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-accent-blue font-medium text-sm uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-text-secondary max-w-2xl">
            I'm always open to discussing new projects, business ideas, and digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <div>
              <h3 className="text-2xl font-bold mb-1">Frank Uzezi</h3>
              <p className="text-text-secondary">CEO</p>
            </div>

            {/* Direct Contacts */}
            <div className="space-y-4">
              {/* WhatsApp Primary */}
              <a href={`https://wa.me/${siteConfig.contact.whatsappPrimary.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/10 flex items-center justify-center group-hover:border-accent-blue/50 transition-colors">
                  <Phone className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">WhatsApp (Primary)</p>
                  <p className="font-medium">{siteConfig.contact.whatsappPrimary}</p>
                </div>
              </a>

              {/* WhatsApp Secondary */}
              <a href={`https://wa.me/${siteConfig.contact.whatsappSecondary.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/10 flex items-center justify-center group-hover:border-accent-violet/50 transition-colors">
                  <Phone className="w-5 h-5 text-accent-violet" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">WhatsApp (Secondary)</p>
                  <p className="font-medium">{siteConfig.contact.whatsappSecondary}</p>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/10 flex items-center justify-center group-hover:border-accent-violet/50 transition-colors">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="font-medium">{siteConfig.contact.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-navy-800/50 border border-white/10 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <User className="w-4 h-4" /> Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none transition-colors"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none transition-colors"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Business */}
              <div>
                <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <Building2 className="w-4 h-4" /> Business/Company
                </label>
                <input
                  {...register("business")}
                  placeholder="Your company or business name"
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none transition-colors"
                />
                {errors.business && <p className="text-red-500 text-xs mt-1">{errors.business.message}</p>}
              </div>

              {/* Project Type */}
              <div>
                <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <Briefcase className="w-4 h-4" /> Project Type
                </label>
                <select
                  {...register("projectType")}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none transition-colors"
                >
                  <option value="">Select a type...</option>
                  <option value="Business Website">Business Website</option>
                  <option value="Real Estate Website">Real Estate Website</option>
                  <option value="Restaurant Website">Restaurant Website</option>
                  <option value="Portfolio Website">Portfolio Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Other">Other</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none transition-colors resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" className="w-full justify-center" trackName="Contact_Form_Submit">
                Send Project Request <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}