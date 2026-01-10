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
  { id: "gen-ai", label: "Gen AI" },
  { id: "full-stack", label: "Full Stack" },
  { id: "deep-learning", label: "Deep Learning" },
  { id: "nlp", label: "NLP" },
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
          cats.includes("ai agents") ||
          techs.some((t) => t.includes("langgraph") || t.includes("agent")) ||
          title.includes("agent") ||
          desc.includes("agent")
        );
      case "generative-ai":
        return (
          cats.includes("generative ai") ||
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
        return (
          cats.includes("python") ||
          techs.some(
            (t) =>
              t.includes("python") ||
              t.includes("django") ||
              t.includes("flask") ||
              t.includes("fastapi") ||
              t.includes("streamlit")
          )
        );
      case "gen-ai":
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
      case "full-stack":
        return (
          cats.includes("full stack") ||
          techs.some(
            (t) =>
              t.includes("react") ||
              t.includes("next") ||
              t.includes("django") ||
              t.includes("flask") ||
              t.includes("fastapi") ||
              t.includes("node")
          )
        );
      case "deep-learning":
        return (
          cats.includes("deep learning") ||
          techs.some(
            (t) =>
              t.includes("deep learning") ||
              t.includes("neural") ||
              t.includes("cnn") ||
              t.includes("rnn") ||
              t.includes("lstm") ||
              t.includes("tensorflow") ||
              t.includes("pytorch")
          )
        );
      case "nlp":
        return (
          cats.includes("nlp") ||
          techs.some(
            (t) =>
              t.includes("nlp") ||
              t.includes("natural language") ||
              t.includes("text") ||
              t.includes("sentiment") ||
              t.includes("chatbot")
          )
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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFilteredProjects(filterProjects(activeCategory));
    setCurrentIndex(0);
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

      // Calculate current index based on scroll position
      const cardWidth = window.innerWidth < 640 ? 276 : 356;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, filteredProjects.length - 1));
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [filteredProjects]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && !isPaused && filteredProjects.length > 1) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;

          if (isAtEnd) {
            // Reset to beginning with smooth scroll
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll to next card
            const scrollAmount = window.innerWidth < 640 ? 276 : 356;
            scrollRef.current.scrollTo({
              left: scrollLeft + scrollAmount,
              behavior: "smooth",
            });
          }
        }
      }, 4000); // Auto-scroll every 4 seconds
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, isPaused, filteredProjects.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Responsive scroll amount
      const scrollAmount = window.innerWidth < 640 ? 276 : 356;
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

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 640 ? 276 : 356;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
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
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
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
          {categories.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                "border hover:scale-105 active:scale-95",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
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
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Navigation Button - Floating */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20",
              "p-2.5 sm:p-3 rounded-full transition-all duration-200",
              "bg-background/95 backdrop-blur-sm border shadow-md",
              canScrollLeft
                ? "opacity-100 hover:scale-110 hover:bg-accent hover:shadow-lg cursor-pointer"
                : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>

          {/* Left Gradient */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-6 px-4 sm:px-8 scroll-smooth snap-x snap-mandatory"
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
              "absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Right Navigation Button - Floating */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20",
              "p-2.5 sm:p-3 rounded-full transition-all duration-200",
              "bg-background/95 backdrop-blur-sm border shadow-md",
              canScrollRight
                ? "opacity-100 hover:scale-110 hover:bg-accent hover:shadow-lg cursor-pointer"
                : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>
      </BlurFade>

      {/* Progress Dots & Counter */}
      <BlurFade delay={delay + 0.2}>
        <div className="flex flex-col items-center gap-4">
          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {filteredProjects.slice(0, Math.min(filteredProjects.length, 8)).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  currentIndex === idx
                    ? "w-6 sm:w-8 h-2 bg-primary shadow-sm"
                    : "w-2 h-2 bg-border hover:bg-muted-foreground/50 hover:scale-110"
                )}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
            {filteredProjects.length > 8 && (
              <span className="text-xs text-muted-foreground ml-2">+{filteredProjects.length - 8}</span>
            )}
          </div>

          {/* Project Counter & Auto-scroll Toggle */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium">
              <span className="text-foreground">{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{filteredProjects.length}</span>
              <span className="ml-1">projects</span>
            </span>
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-200",
                isAutoScrolling
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border hover:border-primary/30 hover:bg-accent"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                isAutoScrolling ? "bg-primary animate-pulse" : "bg-muted-foreground"
              )} />
              {isAutoScrolling ? "Auto" : "Manual"}
            </button>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

// Project Card Component with 3D Tilt Animation
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;

  return (
    <a
      href={project.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 snap-start w-[260px] sm:w-[300px] md:w-[340px] perspective-1000"
      style={{
        animationDelay: `${index * 100}ms`,
        perspective: "1000px",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0.5, y: 0.5 });
        }}
        className="relative h-full transform-gpu transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Glowing Border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-xy" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-gradient-xy" />

        {/* Card Content */}
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card backdrop-blur-xl h-full transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-purple-500/20">
          {/* Shine Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background: isHovered
                ? `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1), transparent 40%)`
                : 'none',
            }}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animation: `float-particle ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* Image Container */}
          <div className="relative h-36 sm:h-44 overflow-hidden">
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse" />
                </div>
                <span className="text-5xl font-bold text-white/90 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-90" />

            {/* Glowing Orb Effect */}
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary/40 via-purple-500/30 to-pink-500/40 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />

            {/* Category Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-lg">
                {project.category[0]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 relative z-10">
            <h4 className="font-bold text-base sm:text-lg line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500">
              {project.title}
            </h4>
            {project.description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                {project.description}
              </p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] sm:text-[11px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 text-foreground font-medium border border-primary/20 group-hover:border-primary/40 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${techIndex * 50}ms`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2.5 py-1 text-[10px] sm:text-[11px] rounded-full bg-muted/50 text-muted-foreground font-medium border border-border/50">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* View Project Link */}
            <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-xs font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                View Project
              </span>
              <svg className="w-3 h-3 text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
