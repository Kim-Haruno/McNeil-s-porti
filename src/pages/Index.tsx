import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Process from "../components/Process";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index: React.FC = () => {
  // Initialize intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the appear-animation class
    document.querySelectorAll(".appear-animation").forEach((el) => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-space-dark text-white">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
