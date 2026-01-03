"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

interface CategorySliderProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function CategorySlider({
  title,
  icon,
  children,
  className,
  delay = 0,
}: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
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
    <BlurFade delay={delay}>
      <div className={cn("w-full space-y-4", className)}>
        {/* Category Header */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h3>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "p-2 rounded-full border bg-background/80 backdrop-blur-sm transition-all duration-200",
                canScrollLeft
                  ? "hover:bg-accent hover:scale-105 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "p-2 rounded-full border bg-background/80 backdrop-blur-sm transition-all duration-200",
                canScrollRight
                  ? "hover:bg-accent hover:scale-105 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Gradient */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {children}
          </div>

          {/* Right Gradient */}
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </BlurFade>
  );
}

// Circular Card for the slider
interface CircularProjectCardProps {
  title: string;
  href?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  className?: string;
}

export function CircularProjectCard({
  title,
  href,
  description,
  image,
  technologies,
  className,
}: CircularProjectCardProps) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex-shrink-0 snap-start w-[280px] sm:w-[300px]",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50">
        {/* Image Container with Circular Gradient */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
              <span className="text-4xl font-bold text-white/80">
                {title.charAt(0)}
              </span>
            </div>
          )}
          {/* Circular Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h4 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-muted text-muted-foreground">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
