"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "./GlassCard";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  href?: string;
}

export default function NeonButton({ children, onClick, className, variant = "primary", href }: NeonButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white transition-all duration-300 rounded-full group overflow-hidden";
  
  const variants = {
    primary: "bg-neon-blue/10 border border-neon-blue hover:bg-neon-blue/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
    secondary: "bg-neon-purple/10 border border-neon-purple hover:bg-neon-purple/20 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)]",
  };

  const Content = (
    <>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        className={cn(baseStyles, variants[variant], className)}
      >
        {Content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {Content}
    </motion.button>
  );
}
