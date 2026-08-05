import React, { useEffect, useRef } from "react";
import {
  Calendar,
  FileText,
  Layout,
  Code,
  Rocket,
  ArrowRight,
} from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

// Declared outside component instance - no need to wrap in useMemo!
const STEPS: ProcessStep[] = [
  {
    title: "Consultation",
    description:
      "We start with a short call or Text to learn about your goals, timeline, and constraints.",
    icon: Calendar,
  },
  {
    title: "Discovery & Proposal",
    description:
      "I propose a scoped plan with priorities, timelines, and pricing aligned with your goals.",
    icon: FileText,
  },
  {
    title: "Design & Architecture",
    description:
      "User-first design and resilient system architecture built to support scale and security.",
    icon: Layout,
  },
  {
    title: "Build & QA",
    description:
      "Iterative development with tests, code reviews, and continuous deployment for predictability.",
    icon: Code,
  },
  {
    title: "Launch & Support",
    description:
      "A smooth launch and seamless handoff to your team, plus optional ongoing maintenance.",
    icon: Rocket,
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Force all reveal elements visible immediately if user prefers reduced motion
      const elements =
        sectionRef.current?.querySelectorAll(".reveal-on-scroll");
      elements?.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      aria-label="My working process"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="reveal-on-scroll">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              My <span className="text-space-accent">Process</span>
            </h2>
            <div className="h-1 w-16 bg-space-accent rounded-full mx-auto mt-4 shadow-sm shadow-space-accent/50" />
          </div>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mt-4 reveal-on-scroll">
            A simple, predictable workflow designed to reduce risk, maintain
            clarity, and deliver value fast.
          </p>
        </div>

        {/* Steps Grid */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 relative list-none p-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;

            return (
              <li
                key={step.title}
                className="reveal-on-scroll relative group flex flex-col h-full"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Desktop Connector Arrow */}
                {!isLast && (
                  <div
                    className="hidden lg:flex absolute -right-6 top-12 z-20 items-center justify-center text-white/20 group-hover:text-space-accent/70 transition-colors duration-300 pointer-events-none"
                    aria-hidden="true"
                  >
                    <ArrowRight size={18} />
                  </div>
                )}

                {/* Card Container */}
                <div className="glass p-5 md:p-6 rounded-2xl h-full flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-space-accent/10 border border-white/10 hover:border-space-accent/30">
                  <div>
                    {/* Header Row: Icon & Step Counter */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="rounded-xl bg-space-accent/10 p-3 text-space-accent group-hover:bg-space-accent/20 group-hover:scale-105 transition-all duration-300 border border-space-accent/20">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <span className="text-3xl font-extrabold text-white/10 group-hover:text-space-accent/30 transition-colors duration-300 select-none font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Step Title & Details */}
                    <h3 className="font-semibold text-white mb-2 text-base md:text-lg tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Subtle step progress line at bottom of card */}
                  <div className="w-full bg-white/5 h-0.5 rounded-full mt-6 overflow-hidden">
                    <div className="bg-space-accent/40 h-full w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center reveal-on-scroll">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 cosmic-border glass px-6 py-3.5 rounded-xl text-white bg-space-accent/20 hover:bg-space-accent hover:text-black focus:outline-none focus:ring-2 focus:ring-space-accent focus:ring-offset-2 focus:ring-offset-space-dark transition-all duration-300 text-sm font-semibold shadow-lg shadow-space-accent/10"
          >
            <Calendar size={18} />
            <span>Start with a free consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
