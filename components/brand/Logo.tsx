import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 32, showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Geometric FU Monogram */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B7FFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {/* F shape */}
        <path d="M5 5 H20 V11 H11 V16 H20 V22 H11 V35 H5 V5 Z" fill="url(#fuGradient)" />
        {/* U shape */}
        <path d="M25 5 H31 V25 C31 30 28 35 25 35 C22 35 19 30 19 25 V5 H25 V25 C25 27 26 29 27 29 V5 Z" fill="url(#fuGradient)" opacity="0.8" />
      </svg>
      
      {showText && (
        <span className="font-bold tracking-wide text-white text-lg">
          FRANK UZEZI
        </span>
      )}
    </div>
  );
}