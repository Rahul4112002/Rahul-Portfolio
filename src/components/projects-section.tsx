"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { allProjects, type Project } from "@/data/projects";
import BlurFade from "@/components/magicui/blur-fade";

const categories = [
  { id: "all", label: "All" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "generative-ai", label: "Generative AI" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "python", label: "Python" },
];

function filterProjects(categoryId: string): Project[] {
  if (categoryId === "all") return allProjects;

  return allProjects.filter((project) => {
    const techs = project.technologies.map((t) => t.toLowerCase());
    const desc = project.description.toLowerCase();
    const title = project.title.toLowerCase();
    const cats = project.category.map((c) => c.toLowerCase());

    switch (categoryId) {
      case "ai-agents":
        return (
          techs.some((t) => t.includes("langgraph") || t.includes("agent")) ||
          title.includes("agent") ||
          desc.includes("agent")
        );
      case "generative-ai":
        return (
          cats.includes("gen ai") ||
          techs.some(
            (t) =>
              t.includes("langchain") ||
              t.includes("gemini") ||
              t.includes("rag") ||
              t.includes("genai") ||
              t.includes("llm") ||
              t.includes("groq")
          )
        );
      case "machine-learning":
        return (
          cats.includes("machine learning") ||
          techs.some(
            (t) =>
              t.includes("machine learning") ||
              t.includes("random forest") ||
              t.includes("classification") ||
              t.includes("prediction") ||
              t.includes("lstm")
          )
        );
      case "python":
        return techs.some(
          (t) =>
            t.includes("python") ||
            t.includes("django") ||
            t.includes("flask") ||
            t.includes("fastapi") ||
            t.includes("streamlit")
        );
      default:
        return true;
    }
  });
}

interface ProjectsSectionProps {
  delay?: number;
}

export function ProjectsSection({ delay = 0 }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setFilteredProjects(filterProjects(activeCategory));
    // Reset scroll position when category changes
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCategory]);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [filteredProjects]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Responsive scroll amount
      const scrollAmount = window.innerWidth < 640 ? 260 : 320;
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Header */}
      <BlurFade delay={delay}>
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center px-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              Projects
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground md:text-lg lg:text-xl max-w-[600px]">
              Explore my work across different domains of AI and software development.
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Category Filter Buttons */}
      <BlurFade delay={delay + 0.05}>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center px-2 sm:px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                "border hover:scale-105 active:scale-95",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-background/80 text-foreground border-border hover:bg-accent hover:border-primary/50"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </BlurFade>

      {/* Projects Slider */}
      <BlurFade delay={delay + 0.1}>
        <div className="relative">
          {/* Left Gradient */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 sm:px-4 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))
            ) : (
              <div className="w-full text-center py-12 text-muted-foreground">
                No projects found in this category.
              </div>
            )}
          </div>

          {/* Right Gradient */}
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </BlurFade>

      {/* Navigation Buttons */}
      <BlurFade delay={delay + 0.2}>
        <div className="flex justify-center gap-2 sm:gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "p-2 sm:p-2.5 rounded-full border bg-background/80 backdrop-blur-sm transition-all duration-200",
              canScrollLeft
                ? "hover:bg-accent hover:scale-105 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "p-2 sm:p-2.5 rounded-full border bg-background/80 backdrop-blur-sm transition-all duration-200",
              canScrollRight
                ? "hover:bg-accent hover:scale-105 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>
      </BlurFade>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 snap-start w-[240px] sm:w-[280px] md:w-[300px]"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50 h-full">
        {/* Image Container */}
        <div className="relative h-32 sm:h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
              <span className="text-4xl font-bold text-white/80">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <h4 className="font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          {project.description && (
            <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5 sm:pt-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-muted text-muted-foreground">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
