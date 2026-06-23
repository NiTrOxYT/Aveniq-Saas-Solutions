import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  desc: string;
  tag: string;
  imageUrl?: string;
  link?: string;
}

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