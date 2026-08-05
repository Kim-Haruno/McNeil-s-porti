import React, { useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin } from "lucide-react";

const socialLinks = {
  github: "https://github.com/Kim-Haruno/",
  linkedin: "https://www.linkedin.com/in/mcneil-maseko-586716201",
};

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[20%] w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full bg-space-accent/5 blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full bg-space-accent/5 blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="glass p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl max-w-3xl w-full">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 transition-all duration-700 ease-out ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              McNeil Nigel <span className="text-space-accent">Maseko</span>
            </h1>

            <div
              className={`mb-3 sm:mb-4 transition-all duration-700 ease-out delay-200 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="inline-block text-[10px] sm:text-xs text-space-accent font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-space-accent/10">
                Full-stack Web Systems Engineer
              </span>
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-5 sm:mb-6 px-2 sm:px-0 transition-all duration-700 ease-out delay-[400ms] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              I help startups and product teams build secure, scalable web
              platforms that increase revenue and reduce operational overhead.
            </p>

            <div
              className={`mt-6 sm:mt-8 transition-all duration-700 ease-out delay-[600ms] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                <a
                  href="#contact"
                  className="cosmic-border glass inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white rounded-xl bg-space-accent hover:bg-space-accent/90 focus:ring-2 focus:ring-space-accent focus:ring-offset-2 focus:ring-offset-space-dark transition-all duration-300 font-semibold w-full sm:w-auto"
                >
                  Book a free consultation
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white/90 rounded-xl border border-white/10 hover:bg-white/5 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-space-dark transition-all duration-300 w-full sm:w-auto"
                >
                  View my work
                </a>
              </div>

              <div className="mt-5 sm:mt-6 flex items-center justify-center gap-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="text-white/70 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded transition-colors p-1"
                >
                  <Github size={18} className="sm:w-5 sm:h-5" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-white/70 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded transition-colors p-1"
                >
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="text-white/60 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded-full p-1 transition-colors duration-300"
        >
          <ChevronDown size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
