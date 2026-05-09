"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const projects = [
  {
    id: 1,
    title: "Hospital Management System",
    description: "Full-stack web application for managing hospital operations including patient records, appointments, billing, and staff management.",
    image: "🏥",
    gradient: "from-blue-600/30 to-cyan-600/30",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: ["Patient & Doctor portals", "Appointment scheduling", "Billing & invoices", "Medical records management"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 2,
    title: "Gym Management System",
    description: "Comprehensive system for gym administration — member management, attendance tracking, payment processing, and workout plans.",
    image: "💪",
    gradient: "from-purple-600/30 to-pink-600/30",
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    features: ["Member registration", "Attendance & check-in", "Payment tracking", "Workout plan builder"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 3,
    title: "Student Attendance System",
    description: "Automated attendance management system for educational institutions with real-time tracking and reporting.",
    image: "🎓",
    gradient: "from-green-600/30 to-teal-600/30",
    tech: ["Java", "Spring Boot", "MySQL", "Bootstrap"],
    features: ["QR code attendance", "Real-time dashboards", "Email reports", "Analytics & insights"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 4,
    title: "Crop Recommendation System",
    description: "AI-powered system that recommends the best crops for farmers based on soil composition, climate, and historical data.",
    image: "🌾",
    gradient: "from-yellow-600/30 to-orange-600/30",
    tech: ["Python", "Machine Learning", "Flask", "Pandas"],
    features: ["Soil analysis input", "ML-based predictions", "Weather data integration", "Crop insights dashboard"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    id: 5,
    title: "Personal Fitness Tracker",
    description: "Smart fitness tracking application to monitor workouts, nutrition, goals, and progress with visual analytics.",
    image: "❤️",
    gradient: "from-red-600/30 to-rose-600/30",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    features: ["Workout logging", "Calorie tracking", "Goal setting", "Progress charts"],
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  tech: string[];
  features: string[];
  github: string;
  demo: string;
}

function ProjectCard({ project, onOpenCase }: { project: Project; onOpenCase: (p: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.1s ease-out" }}
      className={`bg-gradient-to-br ${project.gradient} border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden group cursor-pointer`}
    >
      {/* Card Image/Icon Area */}
      <div className="h-48 bg-black/30 flex items-center justify-center relative">
        <span className="text-7xl">{project.image}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-neon-blue/10 border border-neon-blue/50 rounded-full text-neon-blue text-sm hover:bg-neon-blue/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/20 rounded-full text-gray-300 text-sm hover:bg-white/10 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon /> GitHub
          </a>
          <button
            onClick={() => onOpenCase(project)}
            className="py-2 px-3 bg-neon-purple/10 border border-neon-purple/50 rounded-full text-neon-purple text-sm hover:bg-neon-purple/20 transition-all"
            title="Case Study"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9995] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-br ${project.gradient} border border-white/20 backdrop-blur-2xl rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl`}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{project.image}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm">Case Study</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              <h4 className="text-neon-blue font-semibold mb-3">Key Features</h4>
              <ul className="space-y-2 mb-6">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <ChevronRight size={14} className="text-neon-blue shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <h4 className="text-neon-purple font-semibold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white">{t}</span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-neon-blue/10 border border-neon-blue rounded-full text-neon-blue hover:bg-neon-blue/20 transition-all">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/20 rounded-full text-gray-300 hover:bg-white/10 transition-all">
                <GithubIcon /> View Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenCase={setSelectedProject} />
          ))}
        </div>
      </div>

      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
