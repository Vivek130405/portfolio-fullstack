"use client";

import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const skillCategories = [
  {
    title: "Frontend",
    color: "neon-blue",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "Bootstrap", level: 85 },
      { name: "React", level: 82 },
    ],
  },
  {
    title: "Backend",
    color: "neon-purple",
    skills: [
      { name: "Java", level: 92 },
      { name: "Spring Framework", level: 85 },
      { name: "Spring Boot", level: 83 },
      { name: "Node.js", level: 78 },
    ],
  },
  {
    title: "Database",
    color: "neon-blue",
    skills: [
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Data Science",
    color: "neon-purple",
    skills: [
      { name: "Python", level: 80 },
      { name: "Pandas", level: 72 },
      { name: "Machine Learning", level: 65 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-sm font-mono" style={{ color: color === "neon-blue" ? "#00f0ff" : "#8a2be2" }}>
          {level}%
        </span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: color === "neon-blue"
              ? "linear-gradient(90deg, #00f0ff, #0080ff)"
              : "linear-gradient(90deg, #8a2be2, #ff00ff)",
            boxShadow: color === "neon-blue"
              ? "0 0 10px rgba(0,240,255,0.5)"
              : "0 0 10px rgba(138,43,226,0.5)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/3 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <GlassCard
              key={category.title}
              delay={categoryIndex * 0.1}
              className="group hover:border-neon-blue/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)] transition-all duration-500"
            >
              <h3
                className="text-xl font-bold mb-6 flex items-center gap-3"
                style={{ color: category.color === "neon-blue" ? "#00f0ff" : "#8a2be2" }}
              >
                <span
                  className="w-2 h-6 rounded-full"
                  style={{
                    background: category.color === "neon-blue"
                      ? "linear-gradient(180deg, #00f0ff, #0080ff)"
                      : "linear-gradient(180deg, #8a2be2, #ff00ff)",
                  }}
                />
                {category.title}
              </h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={categoryIndex * 0.1 + skillIndex * 0.1}
                />
              ))}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
