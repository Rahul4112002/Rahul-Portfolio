"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import GitHubRepoCard from "./GitHubRepoCard";
import AddProjectModal from "./AddProjectModal";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface AdminProject {
  id: number;
  title: string;
  github_repo_id: number | null;
  source_link: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [addedProjects, setAddedProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  useEffect(() => {
    fetchGitHubRepos();
    fetchAddedProjects();
  }, []);

  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    console.log('[AdminDashboard] Starting to fetch GitHub repos...');
    
    const attemptFetch = async (retryCount = 0): Promise<boolean> => {
      try {
        console.log(`[AdminDashboard] Fetch attempt ${retryCount + 1}/4`);
        const response = await fetch("/api/admin/github-repos", {
          credentials: "include",
        });

        console.log(`[AdminDashboard] Response status: ${response.status}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`[AdminDashboard] Successfully fetched ${data.repos?.length || 0} repos`);
          setRepos(data.repos || []);
          return true;
        } else if (response.status === 401 && retryCount < 3) {
          // Session not ready yet, retry with exponential backoff
          const delay = 300 * (retryCount + 1);
          console.log(`[AdminDashboard] Got 401, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptFetch(retryCount + 1);
        } else {
          console.error('[AdminDashboard] Failed to fetch repos:', response.status);
          toast.error("Failed to fetch GitHub repositories");
          return false;
        }
      } catch (error) {
        console.error('[AdminDashboard] Network error:', error);
        if (retryCount < 3) {
          const delay = 300 * (retryCount + 1);
          console.log(`[AdminDashboard] Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptFetch(retryCount + 1);
        }
        toast.error("Network error while fetching repositories");
        return false;
      }
    };
    
    await attemptFetch();
    setIsLoading(false);
  };

  const fetchAddedProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setAddedProjects(data.projects || []);
      }
    } catch (error) {
      console.error('[AdminDashboard] Failed to fetch added projects:', error);
    }
  };

  const isRepoAdded = (repoId: number): boolean => {
    return addedProjects.some(project => project.github_repo_id === repoId);
  };

  const handleRemoveProject = async (repoId: number) => {
    const project = addedProjects.find(p => p.github_repo_id === repoId);
    if (!project) return;

    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Project removed from portfolio!");
        fetchAddedProjects(); // Refresh the list
      } else {
        toast.error("Failed to remove project");
      }
    } catch (error) {
      toast.error("Error removing project");
    }
  };

  const handleAddProject = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRepo(null);
  };

  const handleProjectAdded = () => {
    toast.success("Project added to portfolio successfully!");
    setIsModalOpen(false);
    setSelectedRepo(null);
    fetchAddedProjects(); // Refresh the list
  };

  // Get unique languages for filter
  const uniqueLanguages = Array.from(
    new Set(repos.map(repo => repo.language).filter(Boolean))
  ) as string[];

  // Filter repos
  const filteredRepos = repos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesLanguage = languageFilter === "all" || repo.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your portfolio projects
            </p>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Languages</option>
            {uniqueLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Repositories</p>
            <p className="text-2xl font-bold">{repos.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Filtered Results</p>
            <p className="text-2xl font-bold">{filteredRepos.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Languages</p>
            <p className="text-2xl font-bold">{uniqueLanguages.length}</p>
          </div>
        </div>

        {/* Repository Grid */}
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading repositories...</p>
            </div>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium">No repositories found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredRepos.map((repo) => (
              <GitHubRepoCard
                key={repo.id}
                repo={repo}
                isAdded={isRepoAdded(repo.id)}
                onAddProject={handleAddProject}
                onRemoveProject={handleRemoveProject}
              />
            ))}
          </div>
        )}
        </div>
      </main>

      {/* Add Project Modal */}
      {isModalOpen && selectedRepo && (
        <AddProjectModal
          repo={selectedRepo}
          onClose={handleModalClose}
          onSuccess={handleProjectAdded}
        />
      )}
    </div>
  );
}
