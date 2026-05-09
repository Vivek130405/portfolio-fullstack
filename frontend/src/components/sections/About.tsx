"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GlassCard from "../ui/GlassCard";
import { Code2, Coffee, Briefcase, BookOpen } from "lucide-react";

const stats = [
  { icon: Code2, label: "Projects Completed", value: 15, suffix: "+" },
  { icon: BookOpen, label: "Technologies Learned", value: 20, suffix: "+" },
  { icon: Briefcase, label: "Internship Months", value: 6, suffix: "" },
  { icon: Coffee, label: "Coding Hours", value: 2000, suffix: "+" },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = Math.ceil(value / 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">Get to Know</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Passionate Full Stack Developer & Problem Solver
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm a dedicated software engineer with a strong foundation in full-stack development. 
              I specialize in building scalable, high-performance web applications using modern 
              technologies like React, Next.js, Spring Boot, and Node.js.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My journey in engineering started with a fascination for problem-solving. I love 
              turning complex challenges into elegant, user-friendly solutions. I have hands-on 
              experience from my internship at <span className="text-neon-blue font-semibold">Scrembler Company</span>,
              where I built real-world applications and collaborated with agile teams.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Beyond coding, I'm passionate about data science, machine learning, and exploring 
              the intersection of technology and human experience.
            </p>
          </motion.div>

          {/* Image / Info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="space-y-4">
              {[
                ["🎓", "B.Tech Computer Science Engineering"],
                ["💼", "Intern @ Scrembler Company (6 months)"],
                ["📍", "India"],
                ["🔭", "Currently building full-stack projects"],
                ["⚡", "Java | Spring Boot | React | Node.js"],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </GlassCard>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix }, i) => (
            <GlassCard key={label} delay={i * 0.1} className="text-center hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300">
              <Icon className="mx-auto mb-3 text-neon-blue" size={28} />
              <Counter value={value} suffix={suffix} inView={inView} />
              <p className="text-sm text-gray-500 mt-2">{label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
