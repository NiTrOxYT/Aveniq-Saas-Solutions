import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load projects:", error);
      return;
    }

    setProjects(
      (data || []).map((p) => ({
        id: p.id,
        title: p.title,
        desc: p.description,
        tag: p.tag,
        gradient: p.gradient,
        accentColor: p.accent_color,
        imageUrl: p.image_url,
        link: p.link,
      }))
    );

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (project: Omit<Project, "id">) => {
    const { error } = await supabase.from("projects").insert({
      title: project.title,
      description: project.desc,
      tag: project.tag,
      gradient: project.gradient,
      accent_color: project.accentColor,
      image_url: project.imageUrl,
      link: project.link,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    await loadProjects();
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    await loadProjects();
  };

  return {
    projects,
    loading,
    addProject,
    deleteProject,
  };
}