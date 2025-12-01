import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions } from "@/lib/sessions";
import { readFile, writeFile, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (!sessionToken || !sessions.has(sessionToken)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const projectId = parseInt(params.id);
    const projectsFile = join(process.cwd(), "data", "admin-projects.json");

    // Read existing projects
    let projects = [];
    try {
      const fileContent = await readFile(projectsFile, "utf-8");
      projects = JSON.parse(fileContent);
    } catch {
      return NextResponse.json(
        { error: "Projects file not found" },
        { status: 404 }
      );
    }

    // Find the project to delete
    const projectIndex = projects.findIndex((p: any) => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = projects[projectIndex];

    // Delete image file if exists
    if (project.image_url) {
      const imagePath = join(process.cwd(), "public", project.image_url);
      if (existsSync(imagePath)) {
        try {
          await unlink(imagePath);
        } catch (error) {
          console.error("Failed to delete image:", error);
        }
      }
    }

    // Remove project from array
    projects.splice(projectIndex, 1);

    // Save updated projects
    await writeFile(projectsFile, JSON.stringify(projects, null, 2));

    // Log the action
    const session = sessions.get(sessionToken);
    console.log(`[Admin Action] ${session?.username} removed project: ${project.title} at ${new Date().toISOString()}`);

    return NextResponse.json(
      { 
        success: true,
        message: "Project removed successfully" 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
