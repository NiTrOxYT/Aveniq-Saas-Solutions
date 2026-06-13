import { useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  desc: string;
  gradient: string;
  accentColor: string;
  tag: string;
  imageUrl?: string;
  link?: string;
}

export const COLOR_PRESETS = [
  {
    name: "Violet",
    gradient: "from-[#6750A4]/30 via-black/60 to-black",
    accentColor: "rgba(103,80,164,0.6)",
  },
  {
    name: "Blue",
    gradient: "from-blue-900/30 via-black/60 to-black",
    accentColor: "rgba(59,130,246,0.5)",
  },
  {
    name: "Emerald",
    gradient: "from-emerald-900/30 via-black/60 to-black",
    accentColor: "rgba(16,185,129,0.5)",
  },
  {
    name: "Rose",
    gradient: "from-rose-900/30 via-black/60 to-black",
    accentColor: "rgba(244,63,94,0.5)",
  },
  {
    name: "Amber",
    gradient: "from-amber-900/30 via-black/60 to-black",
    accentColor: "rgba(245,158,11,0.5)",
  },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "default-nexora",
    title: "Nexora CRM",
    desc: "AI-powered customer relationship management built for modern high-performance sales teams.",
    gradient: "from-[#6750A4]/30 via-black/60 to-black",
    accentColor: "rgba(103,80,164,0.6)",
    tag: "SaaS · AI",
  },
  {
    id: "default-flowsync",
    title: "FlowSync",
    desc: "Workflow automation platform connecting 200+ microservices and data pipelines seamlessly.",
    gradient: "from-blue-900/30 via-black/60 to-black",
    accentColor: "rgba(59,130,246,0.5)",
    tag: "Automation",
  },
  {
    id: "default-beacon",
    title: "Beacon Analytics",
    desc: "Real-time stream processing and visualization dashboard for web-scale businesses.",
    gradient: "from-emerald-900/30 via-black/60 to-black",
    accentColor: "rgba(16,185,129,0.5)",
    tag: "Analytics",
  },
];

const STORAGE_KEY = "aveniq_landing_projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }

    // Sync across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProjects(JSON.parse(e.newValue));
        } catch {
          // ignore parsing error
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };
    const updated = [...projects, newProject];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProjects(updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProjects(updated);
  };

  return {
    projects,
    addProject,
    deleteProject,
  };
}
