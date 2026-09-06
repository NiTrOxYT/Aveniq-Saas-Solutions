import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface LinkPreviewItem {
  id: string;
  url: string;
  imageUrl: string;
  title: string;
  description: string;
  updatedAt: string;
}

const STORAGE_KEY = "aveniq_link_previews_v1";

const DEFAULT_PREVIEWS: LinkPreviewItem[] = [
  {
    id: "default-qr-menu",
    url: "https://www.theaveniq.site/qr-menu",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80",
    title: "Aveniq QR Menu — Digital Menus for Modern Cafés",
    description: "Turn your café printed menu into a warm, beautiful digital experience. Guests browse and order from their phones.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "default-home",
    url: "https://www.theaveniq.site/",
    imageUrl: "https://theaveniq.site/preview-og.jpg",
    title: "Aveniq — AI Software Development & Custom SaaS",
    description: "Enterprise AI software development company specializing in custom SaaS solutions, AI agents, and digital transformation.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "default-portfolio",
    url: "https://www.theaveniq.site/portfolio",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    title: "Aveniq Portfolio — Featured SaaS & AI Case Studies",
    description: "Explore enterprise client software, AI automation pipelines, and high-conversion web applications built by Aveniq.",
    updatedAt: new Date().toISOString(),
  },
];

export function getStoredLinkPreviews(): LinkPreviewItem[] {
  if (typeof window === "undefined") return DEFAULT_PREVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREVIEWS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PREVIEWS;
  } catch {
    return DEFAULT_PREVIEWS;
  }
}

export function useLinkPreviews() {
  const [previews, setPreviews] = useState<LinkPreviewItem[]>(() => getStoredLinkPreviews());
  const [loading, setLoading] = useState(false);

  const saveToLocal = (items: LinkPreviewItem[]) => {
    setPreviews(items);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to persist to localStorage", e);
      }
    }
  };

  const loadPreviews = async () => {
    setLoading(true);
    try {
      // Try fetching from supabase table if available
      const { data, error } = await supabase
        .from("link_previews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: LinkPreviewItem[] = data.map((d: any) => ({
          id: d.id,
          url: d.url,
          imageUrl: d.image_url || d.imageUrl,
          title: d.title || "",
          description: d.description || "",
          updatedAt: d.updated_at || d.created_at || new Date().toISOString(),
        }));
        saveToLocal(mapped);
      } else {
        // Fallback to localStorage
        const stored = getStoredLinkPreviews();
        setPreviews(stored);
      }
    } catch {
      const stored = getStoredLinkPreviews();
      setPreviews(stored);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreviews();
  }, []);

  const addOrUpdatePreview = async (item: Omit<LinkPreviewItem, "id" | "updatedAt"> & { id?: string }) => {
    const now = new Date().toISOString();
    const existingIndex = previews.findIndex(
      (p) =>
        (item.id && p.id === item.id) ||
        normalizeUrl(p.url) === normalizeUrl(item.url)
    );

    let updatedList: LinkPreviewItem[];
    if (existingIndex >= 0) {
      updatedList = previews.map((p, idx) =>
        idx === existingIndex
          ? {
              ...p,
              ...item,
              id: p.id,
              updatedAt: now,
            }
          : p
      );
    } else {
      const newItem: LinkPreviewItem = {
        id: item.id || `preview-${Date.now()}`,
        url: item.url,
        imageUrl: item.imageUrl,
        title: item.title,
        description: item.description,
        updatedAt: now,
      };
      updatedList = [newItem, ...previews];
    }

    saveToLocal(updatedList);

    // Try syncing to Supabase in background
    try {
      await supabase.from("link_previews").upsert(
        {
          url: item.url,
          image_url: item.imageUrl,
          title: item.title,
          description: item.description,
          updated_at: now,
        },
        { onConflict: "url" }
      );
    } catch {
      // Ignored if table doesn't exist yet
    }
  };

  const deletePreview = async (id: string) => {
    const target = previews.find((p) => p.id === id);
    const filtered = previews.filter((p) => p.id !== id);
    saveToLocal(filtered);

    if (target) {
      try {
        await supabase.from("link_previews").delete().eq("url", target.url);
      } catch {
        // Ignored
      }
    }
  };

  return {
    previews,
    loading,
    addOrUpdatePreview,
    deletePreview,
    refresh: loadPreviews,
  };
}

export function normalizeUrl(url: string): string {
  if (!url) return "";
  let clean = url.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, "").replace(/^www\./, "");
  clean = clean.replace(/\/$/, "");
  return clean;
}

export function findPreviewForUrl(url: string, previews?: LinkPreviewItem[]): LinkPreviewItem | null {
  const list = previews || getStoredLinkPreviews();
  const normalized = normalizeUrl(url);
  return (
    list.find((p) => {
      const pNorm = normalizeUrl(p.url);
      return pNorm === normalized || pNorm.endsWith(normalized) || normalized.endsWith(pNorm);
    }) || null
  );
}
