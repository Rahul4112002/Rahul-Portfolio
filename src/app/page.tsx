import ContactMeForm from "@/components/contact-me-form";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { ProjectsSection } from "@/components/projects-section";
import { DATA } from "@/data/resume";
import { Notebook } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <TracingBeam className="px-4 sm:px-6">
      <main className="flex items-center justify-center flex-col min-h-[100dvh] space-y-8 sm:space-y-10">
        <section id="hero" className="w-full">
          <div className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8">
            <div className="gap-2 sm:gap-4 flex flex-row justify-between items-center">
              <div className="flex-col flex flex-1 space-y-2 sm:space-y-1.5 text-left">
                <h1>
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY}
                    className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none"
                    yOffset={8}
                    text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                  />
                </h1>
                <BlurFadeText
                  className="max-w-[600px] text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="relative shrink-0 sm:-translate-y-2 ml-2 sm:ml-4">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
                  <Avatar className="size-20 sm:size-28 md:size-32 relative bg-background hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 ease-in-out">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="rounded-full" />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
        <section id="about" className="w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-lg sm:text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose prose-sm sm:prose-base max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
            <div className="flex items-center justify-center sm:justify-end mt-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size={`sm`} variant={`outline`} className="text-xs sm:text-sm">
                  Download Resume
                  <Notebook className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </a>
            </div>
          </BlurFade>
        </section>
        <section id="work" className="w-full">
          <div className="flex min-h-0 max-w-2xl flex-col gap-y-3 w-full">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-lg sm:text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                  links={work.links}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="education" className="w-full">
          <div className="flex min-h-0 max-w-2xl min-w-0 w-full flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-lg sm:text-xl font-bold">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="skills" className="w-full">
          <div className="flex min-h-0 flex-col gap-y-3 w-full">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-lg sm:text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center justify-center">
              {DATA.skills.map((skill, id) => (
                <BlurFade
                  key={skill.name}
                  delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                >
                  <Badge
                    key={skill.name}
                    className="hover:cursor-default"
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="w-full">
          <div className="space-y-8 sm:space-y-12 w-full py-8 sm:py-12">
            <ProjectsSection delay={BLUR_FADE_DELAY * 11} />
          </div>
        </section>
        <section id="positions" className="w-full">
          <div className="space-y-8 sm:space-y-12 w-full py-8 sm:py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center px-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                    Certifications
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg lg:text-xl max-w-[700px]">
                    Continuously upskilling through industry-recognized certifications in{" "}
                    <span className="font-bold">Data Science</span>,{" "}
                    <span className="font-bold">Machine Learning</span>, and{" "}
                    <span className="font-bold">Web Development</span>. These certifications demonstrate my commitment to staying current with the latest technologies.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="mb-4 ml-2 sm:ml-4 divide-y divide-dashed border-l px-2">
                {DATA.positions.map((position, id) => (
                  <BlurFade
                    key={position.title + position.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <HackathonCard
                      title={position.title}
                      description={position.description}
                      location={position.location}
                      dates={position.dates}
                      image={position.image}
                      links={position.links}
                    />
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>
        <section id="achievements" className="w-full">
          <div className="space-y-8 sm:space-y-12 w-full py-8 sm:py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 16}>
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center px-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                    Achievements
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg lg:text-xl max-w-[600px]">
                    Winning hackathons and attending workshops, I like
                    to keep exploring and learning new things.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <Marquee>
                {[...DATA.achievements].sort(() => Math.random() - 0.5).map((achievement, id) => (
                  <div key={`${achievement.title}-${achievement.image}-${id}`}>
                    <div>
                      <img
                        className="w-56 h-40 sm:w-64 sm:h-44 md:w-72 md:h-48 object-cover rounded-lg"
                        src={achievement.image}
                        alt={achievement.title}
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background"></div>
            </BlurFade>
          </div>
        </section>
        <section id="contact" className="w-full">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-8 sm:py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 18}>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Get in Touch
                </h2>
                <ContactMeForm />
                <p className="mx-auto max-w-[600px] text-muted-foreground text-xs sm:text-sm md:text-base px-4">
                  Or just want to have a casual chat? you can just shoot me a dm
                  on{" "}
                  <a
                    href={DATA.contact.social.X.url}
                    className="text-foreground hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>{" "}
                  or{" "}
                  <a
                    href={DATA.contact.social.X.url}
                    className="text-foreground hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
    </TracingBeam>
  );
}
