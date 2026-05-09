"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import ExperienceEducation from "@/components/sections/ExperienceEducation";
import CertificationsTestimonials from "@/components/sections/CertificationsTestimonials";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

// Dynamically import heavy components (Three.js) to avoid SSR issues
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const PageLoader = dynamic(() => import("@/components/ui/PageLoader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <CertificationsTestimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
