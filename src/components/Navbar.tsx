import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

const socialLinks = {
  github: "https://github.com/Kim-Haruno",
  linkedin: "https://linkedin.com/in/mcneil-maseko-586716201",
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const memoizedNavLinks = useMemo(() => navLinks, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 sm:py-3 glass shadow-lg"
          : "py-3 sm:py-4 md:py-6 bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center min-w-0">
          <a
            href="#home"
            className="text-lg sm:text-xl md:text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded whitespace-nowrap"
          >
            <span className="text-space-accent">M</span>cNeil <span className="text-space-accent">N</span>igel <span className="text-space-accent">M</span>aseko
            <span className="text-space-accent">.</span>
          </a>
          <span className="hidden lg:inline-block text-[10px] sm:text-xs ml-2 sm:ml-3 text-gray-400 truncate max-w-[120px] sm:max-w-[150px]">
            Full-stack Web Systems Engineer
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {memoizedNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs lg:text-sm text-gray-300 hover:text-space-accent focus:text-space-accent focus:outline-none focus:ring-2 focus:ring-space-accent rounded px-1 transition-colors duration-300 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-2 lg:space-x-3 ml-3 lg:ml-4 pl-3 lg:pl-4 border-l border-white/10">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} className="lg:w-[18px] lg:h-[18px]" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className="lg:w-[18px] lg:h-[18px]" />
            </a>
            <a
              href="#contact"
              className="hidden xl:inline-block ml-2 cosmic-border glass px-3 lg:px-4 py-1.5 lg:py-2 rounded-md text-white text-xs lg:text-sm hover:bg-space-accent/90 focus:outline-none focus:ring-2 focus:ring-space-accent focus:ring-offset-2 focus:ring-offset-space-dark transition whitespace-nowrap"
            >
              Book a free consultation
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded p-1 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={22} className="sm:w-6 sm:h-6" />
            ) : (
              <Menu size={22} className="sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 glass border-t border-white/5 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-3 sm:px-4 py-4 sm:py-6 space-y-0.5">
          {memoizedNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-gray-300 hover:text-white hover:bg-white/5 focus:text-white focus:bg-white/5 focus:outline-none rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 sm:pt-6 mt-3 sm:mt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-center sm:justify-start space-x-5 sm:space-x-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded p-1 transition-colors"
              >
                <Github size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-space-accent rounded p-1 transition-colors"
              >
                <Linkedin size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={closeMenu}
              className="cosmic-border glass px-4 py-2.5 sm:py-2 rounded-md text-white text-sm sm:text-base text-center hover:bg-space-accent/90 transition"
            >
              Book a free consultation
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
