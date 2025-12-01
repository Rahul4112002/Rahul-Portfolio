import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions } from "@/lib/sessions";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
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

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const live_link = formData.get("live_link") as string;
    const source_link = formData.get("source_link") as string;
    const category = formData.get("category") as string;
    const github_repo_id = formData.get("github_repo_id") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !description || !source_link || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate URLs
    try {
      new URL(source_link);
      if (live_link) {
        new URL(live_link);
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: "Invalid image type. Only JPG, PNG, and WebP are allowed" },
          { status: 400 }
        );
      }

      // Validate file size (10MB)
      if (imageFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image size must be less than 10MB" },
          { status: 400 }
        );
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), "public", "uploads", "projects");
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = imageFile.name.split(".").pop();
      const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${timestamp}.${ext}`;
      const filepath = join(uploadsDir, filename);

      // Save file
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      imageUrl = `/uploads/projects/${filename}`;
    }

    // Create project object
    const project = {
      id: Date.now(), // In production, use database auto-increment
      title,
      description,
      live_link: live_link || null,
      source_link,
      image_url: imageUrl || null,
      category,
      github_repo_id: github_repo_id ? parseInt(github_repo_id) : null,
      created_at: new Date().toISOString(),
    };

    // In production, save to database
    // For now, we'll append to a JSON file or keep in memory
    // You should implement database integration here

    // Log the action
    const session = sessions.get(sessionToken);
    console.log(`[Admin Action] ${session?.username} added project: ${title} at ${new Date().toISOString()}`);

    // Save project to file system (temporary solution)
    const projectsFile = join(process.cwd(), "data", "admin-projects.json");
    const dataDir = join(process.cwd(), "data");
    
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    let projects = [];
    try {
      const { readFile } = await import("fs/promises");
      const fileContent = await readFile(projectsFile, "utf-8");
      projects = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    projects.push(project);
    await writeFile(projectsFile, JSON.stringify(projects, null, 2));

    return NextResponse.json(
      { 
        success: true,
        project,
        message: "Project added successfully" 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add project" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all admin-added projects
export async function GET(req: NextRequest) {
  try {
    const { readFile } = await import("fs/promises");
    const projectsFile = join(process.cwd(), "data", "admin-projects.json");
    
    let projects = [];
    try {
      const fileContent = await readFile(projectsFile, "utf-8");
      projects = JSON.parse(fileContent);
    } catch {
      // File doesn't exist, return empty array
    }

    return NextResponse.json(
      { projects },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
