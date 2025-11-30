const fs = require("fs");
const path = require("path");

const getLocalProjects = () => {
  const projectsPath = path.join(__dirname, "../src/data/projects.tsx");
  const projectsContent = fs.readFileSync(projectsPath, "utf8");

  const projectsMatch = projectsContent.match(/export const projects = \[([\s\S]*?)\];/);
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
    console.log("🚀 Starting llms.txt generation...");

    const projects = getLocalProjects();
    console.log(`📄 Found ${projects.length} projects`);

    // Create llms directory in public/
    const llmsDir = path.join(__dirname, "../public/projects");
    if (!fs.existsSync(llmsDir)) {
      fs.mkdirSync(llmsDir, { recursive: true });
    }

    // Start building the main llms.txt content
    let llmsContent = `# Rahul Chauhan's Projects

`;

    let processedCount = 0;

    for (const project of projects) {
      try {
        // Generate individual .txt file for this project
        const projectTxtPath = path.join(llmsDir, `${project.slug}.txt`);
        const projectContent = `# ${project.title}

Project details available at https://rahul4112.me`;

        fs.writeFileSync(projectTxtPath, projectContent, "utf8");

        // Add entry to main llms.txt
        llmsContent += `- [${project.title}](https://rahul4112.me/projects/${project.slug}.txt)\n`;

        processedCount++;
      } catch (error) {
        console.error(`❌ Error processing ${project.slug}:`, error.message);
      }
    }

    // Write the main llms.txt file
    const outputPath = path.join(__dirname, "../public/llms.txt");
    fs.writeFileSync(outputPath, llmsContent, "utf8");

    console.log(
      `✅ Successfully generated llms.txt with ${processedCount} projects`,
    );
    console.log(`📍 Main file location: ${outputPath}`);
    console.log(`📍 Individual files location: ${llmsDir}\n`);
  } catch (error) {
    console.error("💥 Error generating llms.txt:", error);
    process.exit(1);
  }
};

generateLlmsTxt();
