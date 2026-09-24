import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-10 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {/* Left Section - Brand & Info */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-bold text-white inline-block"
            >
              <span className="text-space-accent">M</span>cNeil
              <span className="text-space-accent">.</span>
            </a>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 sm:mt-2 font-semibold">
              Full-stack Web Systems Engineer
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 max-w-xs mx-auto md:mx-0">
              Other interests: Gamer · Technophile · Cybersecurity ·
              Electronics Repair Technician
            </p>
            <div className="flex items-center justify-center md:justify-start mt-2.5 sm:mt-3 space-x-3">
              <a
                href="https://github.com/Kim-Haruno"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mcneil-maseko-586716201"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Right Section - Copyright & Contact */}
          <div className="text-center md:text-right">
            <p className="text-xs sm:text-sm text-gray-400">
              © {currentYear} McNeil Maseko. All rights reserved.
            </p>
            <div className="mt-1.5 sm:mt-2 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
              <a
                href="tel:+27715231720"
                className="hover:text-white transition-colors duration-300"
              >
                +27 71 523 1720
              </a>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="sm:hidden text-gray-600">·</span>
              <a
                href="mailto:mcneal0745516650@gmail.com"
                className="hover:text-white transition-colors duration-300 break-all sm:break-normal"
              >
                mcneal0745516650@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
