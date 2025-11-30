"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { allProjects, projectCategories, ProjectCategory } from "@/data/projects";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = selectedCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category.includes(selectedCategory));

  return (
    <section className="mx-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-3xl font-semibold mb-8 tracking-tighter">
          My Projects
        </h1>
        <p className="mb-8 text-muted-foreground text-sm">
          Explore my portfolio of AI, Machine Learning, and Full Stack projects. 
          Filter by category to see specific types of work.
        </p>
      </BlurFade>

      {/* Category Filters */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </BlurFade>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto">
        {filteredProjects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 3 + id * 0.05}
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="text-center text-muted-foreground my-12">
            No projects found in this category.
          </p>
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 3 + filteredProjects.length * 0.05}>
        <p className="text-center my-8 text-sm text-muted-foreground">
          Check out more on{" "}
          <a
            className="underline text-foreground"
            href="https://github.com/Rahul4112002"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </BlurFade>
    </section>
  );
}
