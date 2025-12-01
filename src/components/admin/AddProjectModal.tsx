"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

interface AddProjectModalProps {
  repo: GitHubRepo;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProjectModal({ repo, onClose, onSuccess }: AddProjectModalProps) {
  const [title, setTitle] = useState(repo.name);
  const [description, setDescription] = useState(repo.description || "");
  const [liveLink, setLiveLink] = useState("");
  const [sourceLink, setSourceLink] = useState(repo.html_url);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: "Only JPG, PNG, and WebP images are allowed" }));
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: "Image size must be less than 10MB" }));
      return;
    }

    setErrors(prev => ({ ...prev, image: "" }));
    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!sourceLink.trim()) {
      newErrors.sourceLink = "Source code link is required";
    } else {
      try {
        new URL(sourceLink);
      } catch {
        newErrors.sourceLink = "Please enter a valid URL";
      }
    }

    if (liveLink.trim()) {
      try {
        new URL(liveLink);
      } catch {
        newErrors.liveLink = "Please enter a valid URL";
      }
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("live_link", liveLink.trim());
      formData.append("source_link", sourceLink.trim());
      formData.append("category", category);
      formData.append("github_repo_id", repo.id.toString());
      
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        onSuccess();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to add project");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border bg-background shadow-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
          <h2 className="text-xl font-semibold">Add Project to Portfolio</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-muted"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Project Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
              className={`w-full rounded-md border ${errors.category ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category}</p>
            )}
          </div>

          {/* Live Link */}
          <div className="space-y-2">
            <Label htmlFor="liveLink">Live Link (Optional)</Label>
            <Input
              id="liveLink"
              type="url"
              placeholder="https://example.com"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              disabled={isLoading}
              className={errors.liveLink ? "border-destructive" : ""}
            />
            {errors.liveLink && (
              <p className="text-xs text-destructive">{errors.liveLink}</p>
            )}
          </div>

          {/* Source Code Link */}
          <div className="space-y-2">
            <Label htmlFor="sourceLink">
              Source Code Link <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sourceLink"
              type="url"
              placeholder="https://github.com/..."
              value={sourceLink}
              onChange={(e) => setSourceLink(e.target.value)}
              disabled={isLoading}
              className={errors.sourceLink ? "border-destructive" : ""}
            />
            {errors.sourceLink && (
              <p className="text-xs text-destructive">{errors.sourceLink}</p>
            )}
          </div>

          {/* Project Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Project Image (Optional)</Label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 rounded-md bg-background/80 p-1 hover:bg-background"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-2 text-sm text-muted-foreground">
                    Click to upload image
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG, WebP (max 5MB)
                  </span>
                </label>
              )}
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={isLoading}
                className="hidden"
              />
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
