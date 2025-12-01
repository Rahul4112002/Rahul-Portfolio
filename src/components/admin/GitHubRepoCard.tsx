"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Star, Trash2 } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface GitHubRepoCardProps {
  repo: GitHubRepo;
  isAdded: boolean;
  onAddProject: (repo: GitHubRepo) => void;
  onRemoveProject: (repoId: number) => void;
}

export default function GitHubRepoCard({ repo, isAdded, onAddProject, onRemoveProject }: GitHubRepoCardProps) {
  return (
    <div className="group relative flex h-full flex-col rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight line-clamp-1">{repo.name}</h3>
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {repo.description || "No description provided"}
        </p>

        <div className="flex items-center gap-2">
          {repo.language && (
            <Badge variant="secondary" className="text-xs">
              {repo.language}
            </Badge>
          )}
          {isAdded && (
            <Badge variant="default" className="text-xs">
              In Portfolio
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Updated: {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() => window.open(repo.html_url, "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View on GitHub
        </Button>
        {isAdded ? (
          <Button
            size="sm"
            variant="destructive"
            className="w-full"
            onClick={() => onRemoveProject(repo.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove from Portfolio
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full"
            onClick={() => onAddProject(repo)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add to Portfolio
          </Button>
        )}
      </div>
    </div>
  );
}
