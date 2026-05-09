"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Java Programming Masterclass",
    issuer: "Udemy / Oracle",
    date: "2023",
    icon: "☕",
    color: "#00f0ff",
    link: "#",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Coursera / Meta",
    date: "2023",
    icon: "🌐",
    color: "#8a2be2",
    link: "#",
  },
  {
    title: "Spring Boot & Microservices",
    issuer: "Udemy",
    date: "2024",
    icon: "🍃",
    color: "#00f0ff",
    link: "#",
  },
  {
    title: "Machine Learning with Python",
    issuer: "Coursera / DeepLearning.AI",
    date: "2023",
    icon: "🤖",
    color: "#8a2be2",
    link: "#",
  },
  {
    title: "MongoDB Developer Path",
    issuer: "MongoDB University",
    date: "2024",
    icon: "🍃",
    color: "#00f0ff",
    link: "#",
  },
  {
    title: "React Developer Certification",
    issuer: "Meta / Coursera",
    date: "2024",
    icon: "⚛️",
    color: "#8a2be2",
    link: "#",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Senior Engineer @ Scrembler",
    quote: "An exceptional intern who consistently delivered quality code. Their understanding of Java Spring Boot is impressive for someone at their experience level.",
    avatar: "R",
  },
  {
    name: "Priya Mehta",
    role: "Project Manager @ Scrembler",
    quote: "Highly self-motivated and proactive. Always met deadlines and communicated effectively. A great team player with strong problem-solving skills.",
    avatar: "P",
  },
  {
    name: "Amit Joshi",
    role: "Tech Lead @ Scrembler",
    quote: "Excellent grasp of full-stack concepts. Quickly adapted to our codebase and contributed meaningfully within the first week. Very promising developer.",
    avatar: "A",
  },
];

function CertificationCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + certifications.length) % certifications.length);
  const next = () => setCurrent((c) => (c + 1) % certifications.length);

  // Show 3 cards at a time on desktop
  const visible = [
    certifications[(current) % certifications.length],
    certifications[(current + 1) % certifications.length],
    certifications[(current + 2) % certifications.length],
  ];

  return (
    <div>
      <div className="relative flex gap-6 overflow-hidden">
        {visible.map((cert, i) => (
          <motion.div
            key={`${cert.title}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 bg-glass border border-glass-border backdrop-blur-xl rounded-2xl p-6 text-center group hover:border-neon-blue/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] transition-all duration-300"
          >
            <div className="text-5xl mb-4">{cert.icon}</div>
            <Award className="mx-auto mb-2" style={{ color: cert.color }} size={24} />
            <h4 className="font-bold text-white text-sm mb-1">{cert.title}</h4>
            <p className="text-gray-400 text-xs mb-2">{cert.issuer}</p>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${cert.color}20`, color: cert.color }}>
              {cert.date}
            </span>
            <div className="mt-4">
              <a href={cert.link} className="text-xs text-gray-500 hover:text-neon-blue flex items-center justify-center gap-1 transition-colors">
                <ExternalLink size={10} /> View Certificate
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {certifications.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i === current ? "#00f0ff" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <div className="relative overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-glass border border-glass-border backdrop-blur-xl rounded-2xl p-8"
        >
          <p className="text-gray-300 leading-relaxed text-lg italic mb-6">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 border border-neon-blue/40 flex items-center justify-center text-white font-bold">
              {testimonials[current].avatar}
            </div>
            <div>
              <p className="text-white font-semibold">{testimonials[current].name}</p>
              <p className="text-gray-400 text-sm">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-3 h-3 rounded-full transition-all"
            style={{ background: i === current ? "#00f0ff" : "rgba(255,255,255,0.2)", transform: i === current ? "scale(1.3)" : "scale(1)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CertificationsTestimonials() {
  return (
    <>
      {/* Certifications Section */}
      <section id="certifications" className="py-24 px-6 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">Credentials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
          </motion.div>
          <CertificationCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-neon-purple font-mono text-sm tracking-[0.3em] uppercase mb-3">What Others Say</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Testimonials</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
          </motion.div>
          <TestimonialsSlider />
        </div>
      </section>
    </>
  );
}
