const fs = require("fs");
const path = require("path");

const getLocalProjects = () => {
  const projectsPath = path.join(__dirname, "../src/data/projects.tsx");
  const projectsContent = fs.readFileSync(projectsPath, "utf8");

  const projectsMatch = projectsContent.match(/export const allProjects: Project\[\] = \[([\s\S]*?)\];/);
  if (!projectsMatch) {
    throw new Error("Could not parse projects.tsx");
  }

  const projectsArrayContent = projectsMatch[1];

  const projectRegex = /\{\s*title:\s*"([^"]+)",/g;
  const projects = [];
  let match;
  let index = 0;

  while ((match = projectRegex.exec(projectsArrayContent)) !== null) {
    projects.push({
      title: match[1],
      slug: `project-${index}`,
    });
    index++;
  }

  return projects;
};

const cleanMdxContent = (content) => {
  content = content.replace(/^import .+;$/gm, "");

  content = content.replace(/<[^>]+>/g, "");

  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
  content = content.trim();

  return content;
};

const generateLlmsTxt = () => {
  try {
    console.log("🚀 Starting llms-full.txt generation...");

    const projects = getLocalProjects();
    console.log(`📄 Found ${projects.length} projects`);

    let llmsContent = `# Rahul Chauhan's Projects

This file contains all projects from Rahul Chauhan's portfolio.
Generated automatically during build.

---

`;

    let processedCount = 0;

    for (const project of projects) {
      try {
        llmsContent += `## ${project.title}\n\n`;
        llmsContent += `**Slug:** ${project.slug}\n\n`;
        llmsContent += `Project available at https://rahul4112.me\n\n`;
        llmsContent += `---\n\n`;

        processedCount++;
      } catch (error) {
        console.error(`❌ Error processing ${project.slug}:`, error.message);
      }
    }

    const outputPath = path.join(__dirname, "../public/llms-full.txt");
    fs.writeFileSync(outputPath, llmsContent, "utf8");

    console.log(
      `✅ Successfully generated llms-full.txt with ${processedCount} projects`,
    );
    console.log(`📍 File location: ${outputPath}\n`);
  } catch (error) {
    console.error("💥 Error generating llms-full.txt:", error);
    process.exit(1);
  }
};

generateLlmsTxt();
