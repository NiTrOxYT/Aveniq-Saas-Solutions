import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadProjects = async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });
        if (error) {
            console.error("Failed to load projects:", error);
            return;
        }
        setProjects((data || []).map((p) => ({
            id: p.id,
            title: p.title,
            desc: p.description,
            tag: p.tag,
            imageUrl: p.image_url,
            link: p.link,
            status: (p.status || "Published"),
            sortOrder: p.sort_order || 0,
            updatedAt: p.updated_at || p.created_at || new Date().toISOString(),
        })));
        setLoading(false);
    };
    useEffect(() => {
        loadProjects();
    }, []);
    const addProject = async (project) => {
        // Determine the next sort order
        const nextOrder = projects.length > 0 ? Math.max(...projects.map(p => p.sortOrder)) + 1 : 0;
        const { error } = await supabase.from("projects").insert({
            title: project.title,
            description: project.desc,
            tag: project.tag,
            image_url: project.imageUrl,
            link: project.link,
            status: project.status || "Published",
            sort_order: nextOrder,
            updated_at: new Date().toISOString(),
        });
        if (error) {
            console.error(error);
            throw error;
        }
        await loadProjects();
    };
    const updateProject = async (id, updates) => {
        const dbUpdates = {};
        if (updates.title !== undefined)
            dbUpdates.title = updates.title;
        if (updates.desc !== undefined)
            dbUpdates.description = updates.desc;
        if (updates.tag !== undefined)
            dbUpdates.tag = updates.tag;
        if (updates.imageUrl !== undefined)
            dbUpdates.image_url = updates.imageUrl;
        if (updates.link !== undefined)
            dbUpdates.link = updates.link;
        if (updates.status !== undefined)
            dbUpdates.status = updates.status;
        if (updates.sortOrder !== undefined)
            dbUpdates.sort_order = updates.sortOrder;
        dbUpdates.updated_at = new Date().toISOString();
        const { error } = await supabase
            .from("projects")
            .update(dbUpdates)
            .eq("id", id);
        if (error) {
            console.error("Failed to update project:", error);
            throw error;
        }
        await loadProjects();
    };
    const deleteProject = async (id) => {
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
    const reorderProjects = async (newOrder) => {
        // 1. Update state immediately for visual responsiveness
        setProjects(newOrder);
        // 2. Persist order changes to database in background
        try {
            const promises = newOrder.map((proj, idx) => supabase
                .from("projects")
                .update({ sort_order: idx, updated_at: new Date().toISOString() })
                .eq("id", proj.id));
            await Promise.all(promises);
        }
        catch (err) {
            console.error("Failed to save project order:", err);
        }
    };
    return {
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
    };
}
