import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Database,
  Server,
  GitBranch,
  Layers,
  Terminal,
  Zap,
} from "lucide-react";

type TechCategory = "language" | "frontend" | "backend" | "database" | "tool";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  category: TechCategory;
  ring: number; // 0–5
  size: "sm" | "md";
}

const techItems: TechItem[] = [
  {
    name: "Python",
    icon: <span className="text-lg">🐍</span>,
    category: "language",
    ring: 0,
    size: "md",
  },
  {
    name: "JavaScript",
    icon: <span className="text-sm font-bold">JS</span>,
    category: "language",
    ring: 0,
    size: "sm",
  },
  {
    name: "TypeScript",
    icon: <span className="text-sm font-bold">TS</span>,
    category: "language",
    ring: 1,
    size: "sm",
  },
  {
    name: "C++",
    icon: <span className="text-sm font-bold">C++</span>,
    category: "language",
    ring: 1,
    size: "md",
  },
  {
    name: "C#",
    icon: <span className="text-sm font-bold">C#</span>,
    category: "language",
    ring: 2,
    size: "sm",
  },
  {
    name: "SQL",
    icon: <Database size={20} aria-hidden="true" />,
    category: "database",
    ring: 2,
    size: "sm",
  },
  {
    name: "React",
    icon: <span aria-hidden="true">⚛️</span>,
    category: "frontend",
    ring: 3,
    size: "md",
  },
  {
    name: "Node.js",
    icon: <Server size={20} aria-hidden="true" />,
    category: "backend",
    ring: 3,
    size: "sm",
  },
  {
    name: "Flask",
    icon: <span aria-hidden="true">🧪</span>,
    category: "backend",
    ring: 4,
    size: "sm",
  },
  {
    name: "Django",
    icon: <Layers size={20} aria-hidden="true" />,
    category: "backend",
    ring: 4,
    size: "sm",
  },
  {
    name: "Git",
    icon: <GitBranch size={20} aria-hidden="true" />,
    category: "tool",
    ring: 5,
    size: "sm",
  },
  {
    name: "Java",
    icon: <Terminal size={20} aria-hidden="true" />,
    category: "tool",
    ring: 5,
    size: "sm",
  },
  {
    name: "Kotlin",
    icon: <span className="text-sm font-bold">K</span>,
    category: "language",
    ring: 5,
    size: "sm",
  },
];

const categoryConfig: Record<
  TechCategory,
  { color: string; label: string; textColor: string; dotColor: string }
> = {
  language: {
    color: "bg-blue-500/20 border-blue-500/50",
    label: "Language",
    textColor: "text-blue-400",
    dotColor: "bg-blue-400",
  },
  frontend: {
    color: "bg-rose-500/20 border-rose-500/50",
    label: "Frontend",
    textColor: "text-rose-400",
    dotColor: "bg-rose-400",
  },
  backend: {
    color: "bg-green-500/20 border-green-500/50",
    label: "Backend",
    textColor: "text-green-400",
    dotColor: "bg-green-400",
  },
  database: {
    color: "bg-orange-500/20 border-orange-500/50",
    label: "Database",
    textColor: "text-orange-400",
    dotColor: "bg-orange-400",
  },
  tool: {
    color: "bg-red-500/20 border-red-500/50",
    label: "Tool",
    textColor: "text-red-400",
    dotColor: "bg-red-400",
  },
};

const sizeClasses = {
  sm: "w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm",
  md: "w-12 h-12 sm:w-14 sm:h-14 text-sm sm:text-base",
};

// Ring definitions: orbit radius (px) and base rotation duration (s)
const rings = [
  { radius: 55, duration: 20 },
  { radius: 95, duration: 25 },
  { radius: 135, duration: 30 },
  { radius: 175, duration: 35 },
  { radius: 215, duration: 40 },
  { radius: 255, duration: 45 },
];

const TechStack: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleSpeedDown = useCallback(() => {
    setOrbitSpeed((s) => Math.max(0.5, +(s - 0.5).toFixed(1)));
  }, []);

  const handleSpeedUp = useCallback(() => {
    setOrbitSpeed((s) => Math.min(3, +(s + 0.5).toFixed(1)));
  }, []);

  const activeTechData = useMemo(
    () => techItems.find((t) => t.name === activeTech),
    [activeTech],
  );

  // Compute orbit parameters: radius, duration, and staggered delay
  const techsWithOrbit = useMemo(() => {
    const ringCounts = new Map<number, number>();
    return techItems.map((tech) => {
      const ring = rings[tech.ring];
      const count = ringCounts.get(tech.ring) || 0;
      ringCounts.set(tech.ring, count + 1);
      return {
        ...tech,
        orbitRadius: ring.radius,
        orbitDuration: ring.duration / orbitSpeed,
        orbitDelay: count * (ring.duration / 2), // 180° apart
      };
    });
  }, [orbitSpeed]);

  /* ────────────── Reduced Motion Fallback ────────────── */
  if (prefersReducedMotion) {
    return (
      <section
        id="skills"
        className="py-16 sm:py-20 md:py-24 overflow-hidden"
        aria-label="Technical skills"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Technical <span className="text-space-accent">Skills</span>
            </h2>
            <div className="h-1 w-20 bg-space-accent rounded-full mx-auto mt-3 sm:mt-4" />
            <p className="text-gray-300 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base">
              Technologies and tools I use to build scalable, reliable systems.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {techItems.map((tech) => {
              const cfg = categoryConfig[tech.category];
              return (
                <div
                  key={tech.name}
                  className={`glass p-3 sm:p-4 rounded-xl border ${cfg.color} flex flex-col items-center gap-2 sm:gap-3 hover:bg-white/5 transition-colors focus-within:ring-2 focus-within:ring-space-accent`}
                  tabIndex={0}
                >
                  <div
                    className={`${sizeClasses[tech.size]} rounded-full flex items-center justify-center bg-white/5 text-white`}
                  >
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {tech.name}
                  </span>
                  <span className={`text-[10px] sm:text-xs ${cfg.textColor}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ────────────── Orbit Visualization ────────────── */
  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden"
      aria-label="Technical skills orbit"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-rose-600 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Technical <span className="text-space-accent">Universe</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-space-accent rounded-full mx-auto mt-3 sm:mt-4" />
          <p className="text-gray-300 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Explore my orbiting skills — each planet represents a technology
            I've mastered.
          </p>
        </div>

        {/* Speed controls */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="glass p-1.5 sm:p-2 rounded-full flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleSpeedDown}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-space-accent flex items-center justify-center text-white transition text-sm sm:text-base"
              aria-label="Decrease orbit speed"
            >
              −
            </button>
            <span className="text-xs sm:text-sm w-12 sm:w-16 text-center tabular-nums text-white">
              {orbitSpeed.toFixed(1)}×
            </span>
            <button
              onClick={handleSpeedUp}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-space-accent flex items-center justify-center text-white transition text-sm sm:text-base"
              aria-label="Increase orbit speed"
            >
              +
            </button>
          </div>
        </div>

        {/* Orbit stage */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[480px] lg:h-[600px] xl:h-[720px] flex items-center justify-center overflow-visible">
          {/* Keyframes */}
          <style>{`
            @keyframes orbit {
              from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
              to   { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.3s ease-out both;
            }
          `}</style>

          {/* Scaled orbit system */}
          <div className="absolute inset-0 flex items-center justify-center scale-[0.45] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.9] xl:scale-100 transition-transform duration-500">
            {/* Core planet */}
            <div
              className="relative z-20 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-space-accent to-rose-600 rounded-full flex items-center justify-center shadow-xl shadow-space-accent/30 cursor-pointer animate-pulse"
              onMouseEnter={() => setActiveTech("CORE")}
              onMouseLeave={() => setActiveTech(null)}
              onFocus={() => setActiveTech("CORE")}
              onBlur={() => setActiveTech(null)}
              tabIndex={0}
              role="button"
              aria-label="Core strengths"
            >
              <Zap
                size={18}
                className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                aria-hidden="true"
              />
            </div>

            {/* Orbit rings */}
            {rings.map((ring, i) => (
              <div
                key={`ring-${i}`}
                className="absolute rounded-full border border-white/10 opacity-30"
                style={{
                  width: `${ring.radius * 2}px`,
                  height: `${ring.radius * 2}px`,
                  animation: `spin ${ring.duration / orbitSpeed}s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}

            {/* Orbiting planets */}
            {isMounted &&
              techsWithOrbit.map((tech) => {
                const cfg = categoryConfig[tech.category];
                return (
                  <div
                    key={tech.name}
                    className="absolute top-1/2 left-1/2"
                    style={
                      {
                        "--orbit-radius": `${tech.orbitRadius}px`,
                        animation: `orbit ${tech.orbitDuration}s linear infinite`,
                        animationDelay: `${tech.orbitDelay}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${sizeClasses[tech.size]} rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-xl border ${cfg.color} text-white focus:outline-none focus:ring-2 focus:ring-white/50`}
                      onMouseEnter={() => setActiveTech(tech.name)}
                      onMouseLeave={() => setActiveTech(null)}
                      onFocus={() => setActiveTech(tech.name)}
                      onBlur={() => setActiveTech(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${tech.name} — ${cfg.label}`}
                    >
                      {tech.icon}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Active tech info panel */}
          <div
            className="absolute bottom-0 sm:bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[280px] sm:max-w-sm z-30"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeTech && (
              <div className="glass cosmic-border p-3 sm:p-4 rounded-xl mx-3 sm:mx-4 animate-fade-in-up">
                {activeTech === "CORE" ? (
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-bold text-space-accent mb-0.5 sm:mb-1">
                      Core Strengths
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Systems architecture, security, and scalable engineering
                    </p>
                  </div>
                ) : activeTechData ? (
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`${sizeClasses[activeTechData.size]} rounded-full flex items-center justify-center border ${categoryConfig[activeTechData.category].color} text-white flex-shrink-0`}
                    >
                      {activeTechData.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">
                        {activeTechData.name}
                      </h3>
                      <span
                        className={`text-xs sm:text-sm ${categoryConfig[activeTechData.category].textColor}`}
                      >
                        {categoryConfig[activeTechData.category].label}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {(Object.keys(categoryConfig) as TechCategory[]).map((cat) => (
            <div key={cat} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${categoryConfig[cat].dotColor}`}
              />
              <span className="text-[10px] sm:text-sm text-gray-300 capitalize">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
