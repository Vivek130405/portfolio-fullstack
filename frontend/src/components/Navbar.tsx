"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[9990] bg-background/70 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-neon-blue font-bold text-xl tracking-wider">
          <Code2 size={24} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Portfolio</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-400 hover:text-neon-blue transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            href="/admin"
            className="text-xs px-4 py-1.5 bg-neon-purple/10 border border-neon-purple/40 rounded-full text-neon-purple hover:bg-neon-purple/20 transition-all"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 px-6 py-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-neon-blue transition-colors py-2 border-b border-white/5"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
