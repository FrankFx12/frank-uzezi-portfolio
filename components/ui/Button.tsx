"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackClick } from "@/lib/utils/tracking";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  trackName?: string;
}

export function Button({ children, variant = "primary", href, className, onClick, type = "button", trackName }: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:shadow-glow hover:scale-[1.02]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
    outline: "border border-accent-blue/50 text-white hover:bg-accent-blue/10",
  };

  const handleClick = () => {
    if (trackName) {
      trackClick(trackName);
    }
    onClick?.();
  };

  const content = (
    <>
      {children}
      {href && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(baseClasses, variantClasses[variant], className)}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={cn(baseClasses, variantClasses[variant], className)}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
}