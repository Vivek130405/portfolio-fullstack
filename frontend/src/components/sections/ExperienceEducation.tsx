"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experience = [
  {
    type: "work",
    title: "Software Development Intern",
    organization: "Scrembler Company",
    period: "oct 2024 – Apr 2025",
    duration: "6 Months",
    description: "Developed and maintained full-stack web applications. Worked on Java Spring Boot APIs, React frontend components, and database design. Collaborated with cross-functional teams in an agile environment.",
    skills: ["Java", "Spring Boot", "React", "MySQL", "REST APIs", "Agile"],
  },
];

const education = [
  {
    type: "education",
    title: "Bachelor of Enginnering — Computer Science Engineering",
    organization: "Sppu University",
    period: "2022 – 2026",
    description: "Graduated with honors. Core subjects included Data Structures, Algorithms, Database Management, Operating Systems, Software Engineering, and Machine Learning.",
    skills: ["DSA", "DBMS", "OS", "Software Engineering", "ML"],
  },
  {
    type: "education",
    title: "Higher Secondary (12th Grade)",
    organization: "Shinde School",
    period: "2021 – 2022",
    description: "Physics, Chemistry, Mathematics, and Computer Science. Scored 80%.",
    skills: ["Physics", "Mathematics", "Computer Science"],
  },
];

type TimelineItem = {
  type: string;
  title: string;
  organization: string;
  period: string;
  duration?: string;
  description: string;
  skills: string[];
};

function TimelineItem({ item, index, total }: { item: TimelineItem; index: number; total: number }) {
  const isEven = index % 2 === 0;
  const isWork = item.type === "work";
  const color = isWork ? "#00f0ff" : "#8a2be2";
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div className={`relative flex items-start gap-8 mb-12 ${isEven ? "flex-row" : "flex-row-reverse md:flex-row"}`}>
      {/* Left space (hidden on mobile) */}
      <div className="hidden md:block flex-1" />

      {/* Center dot */}
      <div className="relative flex flex-col items-center z-10 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
          className="w-12 h-12 rounded-full flex items-center justify-center border-2"
          style={{ background: `${color}20`, borderColor: color, boxShadow: `0 0 20px ${color}40` }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            className="w-px flex-1 min-h-[60px] origin-top"
            style={{ background: `linear-gradient(180deg, ${color}60, transparent)` }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
        className="flex-1 bg-glass border border-glass-border backdrop-blur-xl rounded-2xl p-6 group hover:border-opacity-60 transition-all duration-300"
        style={{
          // @ts-ignore
          "--hover-border-color": color,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="font-semibold" style={{ color }}>{item.organization}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar size={12} />
              {item.period}
            </div>
            {item.duration && (
              <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: `${color}20`, color }}>
                {item.duration}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceEducation() {
  const allItems = [...experience, ...education];

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[calc(50%-0.5px)] md:left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue/30 via-neon-purple/30 to-transparent pointer-events-none hidden md:block" />

          {allItems.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} total={allItems.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
