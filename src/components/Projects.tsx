import React, { useEffect, useState, useMemo } from "react";
import { ExternalLink, Github, Star, X, Filter } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  category:
    | "e-commerce"
    | "health"
    | "logistics"
    | "community"
    | "portfolio"
    | "other";
  imageGradient: string;
  link: string;
  github?: string;
  featured?: boolean;
  impact?: string[];
  status?: string;
}

const ALL_PROJECTS: Project[] = [
  {
    title: "Roomie",
    description:
      "Roomee is an accommodation booking platform that allows students and landlords to upload,find and rent rooms, apartments, and shared spaces.",
    tech: ["React","Vite","Shadcn-ui","TypeScript", "Tailwind CSS"],
    category: "community",
    imageGradient: "from-amber-500/20 to-yellow-600/20",
    link: "https://github.com/Kim-Haruno/Roomee",
  },
  {
    title: "Praedico",
    description:
      "Praedico is a job marketplace platform that connects job seekers with employers, providing a seamless experience for finding and posting job opportunities.",
    tech: ["React","Vite","Shadcn-ui","TypeScript", "Tailwind CSS"],
    category: "e-commerce",
    imageGradient: "from-orange-500/20 to-red-600/20",
    link: "https://github.com/Kim-Haruno/Praedico",
  },
  {
    title: "Ubuntu-Air-Solutions",
    description:
      "Online retail storefront supporting general product catalog and digital checkout.",
    tech: ["ASP.NET Core","C#","Bootstrap", "Entity Framework"],
    category: "e-commerce",
    imageGradient: "from-emerald-500/20 to-teal-600/20",
    link: "https://github.com/Kim-Haruno/Ubuntu-Air-Solutions",
  },
  {
    title: "BitLaps-TutorPlatform",
    description:
      "BitLaps is a comprehensive online tutoring platform that connects students with qualified tutors, providing a seamless experience for scheduling and conducting virtual lessons.",
    tech: ["JavaScript"],
    category: "community",
    imageGradient: "from-rose-500/20 to-red-600/20",
    link: "https://github.com/BitLaps/BitLaps-TutorPlatform",
  },
  {
    title: "CCTV-security-Face-Recognition-App",
    description:
      "CCTV-security-Face-Recognition-App is a cutting-edge security solution that utilizes facial recognition technology to enhance surveillance capabilities and improve safety measures.",
    tech: ["Python", "OpenCV", "TensorFlow"],
    category: "other",
    imageGradient: "from-green-500/20 to-emerald-600/20",
    link: "https://github.com/Kim-Haruno/CCTV-security-Face-Recognition-App",
  }

];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "e-commerce", label: "E-Commerce" },
  { id: "health", label: "Healthcare" },
  { id: "logistics", label: "Logistics & Transport" },
  { id: "community", label: "Community & Social" },
  { id: "portfolio", label: "Portfolios" },
  { id: "other", label: "Services & Other" },
];

const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  // Handle escape key for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Title Block */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            My <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            A comprehensive showcase of commercial systems, client web
            applications, and live products built by me.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <Filter size={16} className="text-gray-400 mr-2 hidden sm:block" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className={`relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 group ${
                project.featured ? "ring-1 ring-blue-500/50" : ""
              }`}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {project.featured && (
                  <span className="flex items-center bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                    <Star size={12} className="mr-1 fill-white" /> Featured
                  </span>
                )}
                {project.status && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {project.status}
                  </span>
                )}
              </div>

              {/* Header Visual */}
              <div
                className={`h-40 bg-gradient-to-br ${project.imageGradient} relative p-6 flex items-end overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <h3 className="text-xl font-bold text-white z-10 tracking-wide group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] bg-blue-500/10 text-blue-400 rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => setSelected(project)}
                      className="text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                      View Details
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors gap-1 group/link"
                    >
                      Visit Site
                      <ExternalLink
                        size={14}
                        className="group-hover/link:translate-x-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelected(null)}
          />
          <div className="relative glass border border-white/10 p-6 md:p-8 rounded-2xl max-w-2xl w-full z-10 bg-slate-900/90 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {selected.title}
                </h3>
                {selected.status && (
                  <span className="inline-block mt-1 text-xs text-amber-400 font-medium">
                    Status: {selected.status}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
              {selected.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20"
              >
                <span>Visit Live Platform</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="#contact"
                onClick={() => setSelected(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl font-semibold text-sm transition-colors"
              >
                Inquire About Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
