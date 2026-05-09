"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";
import { Download, Mail, ChevronRight } from "lucide-react";

// Generate random particles
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create 5000 random points within a sphere
  const [positions] = useState(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 20;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      // Calculate random position in sphere
      const x = radius * Math.random() * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.random() * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.random() * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Frontend Engineer",
    "Problem Solver"
  ];
  
  const [currentRole, setCurrentRole] = useState(0);

  // Rotate roles every 3 seconds — must be useEffect, not useMemo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative inline-block"
        >
          {/* Profile Image Wrapper */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-glass-border relative overflow-hidden bg-background mx-auto shadow-[0_0_30px_rgba(0,240,255,0.3)]">
             {/* Using generic gradient/shape for now. User can swap later. */}
            <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Vp</span>
            </div>
          </div>
          {/* Glowing Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] rounded-full border-[2px] border-dashed border-neon-blue/50 pointer-events-none"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Vivek Patil</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 mb-8"
        >
          <p className="text-xl md:text-3xl text-gray-400 font-mono flex items-center justify-center gap-2">
            <ChevronRight className="text-neon-blue" />
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="inline-block"
            >
              {roles[currentRole]}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="w-[2px] h-8 bg-neon-blue inline-block ml-1"
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <NeonButton variant="primary" href="#contact">
            Hire Me <ChevronRight size={18} />
          </NeonButton>
          <NeonButton variant="secondary" href="/resume.pdf">
            Download Resume <Download size={18} />
          </NeonButton>
          <a
            href="#contact"
            className="text-gray-300 hover:text-neon-blue transition-colors flex items-center gap-2 group"
          >
            Contact Me <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-500 mb-2 font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-neon-blue rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
