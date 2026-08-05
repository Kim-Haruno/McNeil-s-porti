import React, { useEffect, useRef } from "react";
import { Code2, Database, Brain, Rocket } from "lucide-react";

const expertise = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "End-to-end web applications with modern frameworks and robust architecture.",
  },
  {
    icon: Database,
    title: "Systems & Infrastructure",
    desc: "Scalable backends, APIs, and databases built for real-world pressure.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Intelligent features and automation that reduce manual overhead.",
  },
  {
    icon: Rocket,
    title: "Product Strategy",
    desc: "Turning ambitious ideas into production-ready, maintainable products.",
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32"
      aria-label="About me"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Text Content */}
          <div className="lg:w-3/5 w-full">
            <div className="reveal-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 inline-block">
                About <span className="text-space-accent">Me</span>
              </h2>
              <div className="h-1 w-20 bg-space-accent rounded-full mb-6 sm:mb-8" />
            </div>

            <div className="reveal-on-scroll space-y-4 sm:space-y-5 md:space-y-6 text-gray-300 leading-relaxed">
              <p className="text-base sm:text-lg text-white/90">
                Technology has always been more than programming to me — it's a
                way to solve meaningful problems.
              </p>

              <p className="text-sm sm:text-base">
                I'm{" "}
                <strong className="text-white">McNeil Maseko</strong>,
                a software engineer specializing in full-stack development,
                intelligent software systems, and modern digital experiences. I
                build applications that combine clean design, robust
                engineering, and practical functionality to help businesses and
                organizations operate more efficiently.
              </p>

              <p className="text-sm sm:text-base">
                Over the years, I've worked across web development, backend
                systems, automation, databases, AI integration, and software
                architecture. I enjoy taking ambitious ideas from concept to
                production, ensuring every solution is scalable, maintainable,
                and built with users in mind.
              </p>

              <p className="text-sm sm:text-base">
                What motivates me most is creating technology that makes a
                measurable difference — whether that's streamlining business
                operations, improving educational systems, supporting
                agriculture through digital innovation, or developing software
                that enables people to work smarter.
              </p>

              <p className="text-sm sm:text-base text-white/80 italic border-l-2 border-space-accent/50 pl-3 sm:pl-4">
                "The best software isn't defined by the technologies behind it,
                but by the impact it creates."
              </p>
            </div>
          </div>

          {/* Visual / Expertise Cards */}
          <div className="lg:w-2/5 w-full">
            <div className="reveal-on-scroll relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-8 sm:mb-10">
              <div className="absolute inset-0 rounded-full bg-space-accent/10 animate-pulse-glow" />
              <div className="absolute inset-2 rounded-full glass cosmic-border overflow-hidden flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-space-dark flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-space-accent">
                  MNM
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {expertise.map((item, index) => (
                <div
                  key={item.title}
                  className="glass p-3 sm:p-4 rounded-xl cosmic-border hover:bg-white/5 transition-colors duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-space-accent/10 text-space-accent mt-0.5 flex-shrink-0">
                      <item.icon
                        size={16}
                        className="sm:w-[18px] sm:h-[18px]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
