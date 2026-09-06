import { useState } from "react";
import {
  Share2,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload,
  X,
  Check,
  ExternalLink,
  Copy,
  Trash2,
  Edit3,
  Globe,
  Sparkles,
  Layers,
  Eye,
} from "lucide-react";
import { useLinkPreviews, LinkPreviewItem } from "@/hooks/use-link-previews";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const PRESET_ROUTES = [
  { label: "QR Menu", url: "https://www.theaveniq.site/qr-menu", title: "Aveniq QR Menu — Beautiful Digital Menus for Modern Cafés" },
  { label: "Homepage", url: "https://www.theaveniq.site/", title: "Aveniq — AI Software Development & Custom SaaS" },
  { label: "Portfolio", url: "https://www.theaveniq.site/portfolio", title: "Aveniq Portfolio — Featured Client Case Studies" },
  { label: "Start Project", url: "https://www.theaveniq.site/start-project", title: "Start Your Project — Aveniq Enterprise Estimation" },
  { label: "SaaS Development", url: "https://www.theaveniq.site/saas-development", title: "Custom SaaS Development Company — Aveniq" },
  { label: "AI Automation", url: "https://www.theaveniq.site/ai-automation-development", title: "AI Automation & AI Agents — Aveniq" },
];

export function LinkImagePreviewManager() {
  const { previews, addOrUpdatePreview, deletePreview } = useLinkPreviews();
  const { toast } = useToast();

  const [url, setUrl] = useState("https://www.theaveniq.site/qr-menu");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("Aveniq QR Menu — Beautiful Digital Menus for Modern Cafés");
  const [description, setDescription] = useState("Turn your café printed menu into a warm, modern digital experience with seamless table ordering.");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeSimulator, setActiveSimulator] = useState<"whatsapp" | "twitter" | "linkedin" | "discord">("twitter");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSelectPreset = (preset: typeof PRESET_ROUTES[0]) => {
    setUrl(preset.url);
    setTitle(preset.title);
    const existing = previews.find((p) => p.url === preset.url || p.url.endsWith(preset.url));
    if (existing) {
      setImageUrl(existing.imageUrl);
      setDescription(existing.description || description);
      setEditingId(existing.id);
    } else {
      setEditingId(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `og-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadErr) throw uploadErr;

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(fileName);

      setImageUrl(publicUrl);
      toast({
        title: "Image Uploaded",
        description: "Preview image uploaded successfully.",
      });
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image. Paste direct image URL instead.");
      toast({
        title: "Upload Notice",
        description: "Storage unavailable. You can paste the direct image URL directly.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({ title: "Validation Error", description: "Please enter a target link / URL.", variant: "destructive" });
      return;
    }
    if (!imageUrl.trim()) {
      toast({ title: "Validation Error", description: "Please provide a preview image URL.", variant: "destructive" });
      return;
    }

    await addOrUpdatePreview({
      id: editingId || undefined,
      url: url.trim(),
      imageUrl: imageUrl.trim(),
      title: title.trim() || "Aveniq",
      description: description.trim(),
    });

    toast({
      title: "Link Preview Saved",
      description: `Preview image assigned to ${url.trim()}.`,
    });

    setEditingId(null);
  };

  const handleEdit = (item: LinkPreviewItem) => {
    setEditingId(item.id);
    setUrl(item.url);
    setImageUrl(item.imageUrl);
    setTitle(item.title);
    setDescription(item.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied", description: "Link copied to clipboard." });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cleanDomain = url ? url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || "theaveniq.site" : "theaveniq.site";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                <Share2 className="w-4 h-4" />
              </span>
              <h2 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Link Image Preview Manager (Open Graph & Social Share)
              </h2>
            </div>
            <p className="text-xs text-[#a1a1aa] max-w-2xl font-light leading-relaxed">
              Assign high-resolution preview images to your links (e.g.{" "}
              <span className="text-[#10b981] font-mono">https://www.theaveniq.site/qr-menu</span>). When shared on WhatsApp, Twitter/X, Discord, LinkedIn, Slack or iMessage, the link will render this rich preview.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-[#08080a] border border-[#1a1a22] text-xs font-mono text-white">
              {previews.length} Previews Configured
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Form & Live Multi-Platform Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── LEFT: Link & Image Configurator ── */}
        <div className="lg:col-span-6 bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1a1a22] pb-3">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-[#10b981]" />
              {editingId ? "Edit Link Preview" : "Assign Image to Link"}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setImageUrl("");
                }}
                className="text-[10px] font-mono text-[#a1a1aa] hover:text-white"
              >
                + New Assignment
              </button>
            )}
          </div>

          {/* Quick Route Presets */}
          <div>
            <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2 font-mono">
              Quick Preset Links
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_ROUTES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    url === preset.url
                      ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/50 shadow-xs"
                      : "bg-[#08080a] hover:bg-[#1a1a22] text-[#a1a1aa] hover:text-white border border-[#1a1a22]"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            {/* Target URL */}
            <div>
              <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5 font-mono">
                Target Link / Page URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="https://www.theaveniq.site/qr-menu"
                className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#10b981]"
              />
            </div>

            {/* Preview Image Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] font-mono">
                  Preview Image URL (OG:Image) <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center gap-1 p-0.5 rounded bg-[#08080a] border border-[#1a1a22]">
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      imageMode === "url"
                        ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40"
                        : "text-[#a1a1aa] hover:text-white"
                    }`}
                  >
                    Image Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      imageMode === "upload"
                        ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40"
                        : "text-[#a1a1aa] hover:text-white"
                    }`}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              {imageMode === "url" ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                      placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                      className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3.5 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-[#10b981]"
                    />
                    {imageUrl && (
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#a1a1aa] hover:text-white rounded-lg text-xs"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-[#a1a1aa]/70 font-mono">
                    Paste any hosted direct image URL (Cloudinary, Supabase, Unsplash, CDN).
                  </p>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-[#1a1a22] hover:border-[#10b981]/40 bg-[#08080a] rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center py-2">
                      <div className="w-5 h-5 rounded-full border-2 border-white/5 border-t-[#10b981] animate-spin mb-1" />
                      <span className="text-[10px] text-[#a1a1aa]">Uploading preview image...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-1">
                      <Upload className="w-4 h-4 text-[#10b981] mb-1" />
                      <span className="text-[11px] text-white">Click or drag image here</span>
                      <span className="text-[9px] text-[#a1a1aa]/60 font-mono mt-0.5">1200 × 630 px recommended</span>
                    </div>
                  )}
                  {uploadError && <span className="block text-xs text-rose-400 mt-1">{uploadError}</span>}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">
                  Link Preview Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Aveniq QR Menu — Beautiful Digital Menus for Modern Cafés"
                  className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3.5 py-2 text-white text-xs focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1 font-mono">
                  Link Preview Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Turn your printed menu into a warm, modern digital experience..."
                  className="w-full bg-[#08080a] border border-[#1a1a22] rounded-lg px-3.5 py-2 text-white text-xs resize-none focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-[#059669] text-black font-semibold py-3 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Check className="w-4 h-4" />
                {editingId ? "Update Link Preview Image" : "Save & Assign Preview Image"}
              </button>
            </div>
          </form>
        </div>

        {/* ── RIGHT: Real-Time Live Social Platform Simulator ── */}
        <div className="lg:col-span-6 bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1a1a22] pb-3">
            <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#10b981]" />
              Live Link Preview Simulator
            </h3>
            <span className="text-[10px] font-mono text-[#10b981]">Real-Time Render</span>
          </div>

          {/* Social Platform Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#08080a] border border-[#1a1a22]">
            {(
              [
                { id: "twitter", label: "Twitter / X" },
                { id: "whatsapp", label: "WhatsApp" },
                { id: "linkedin", label: "LinkedIn / FB" },
                { id: "discord", label: "Discord" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSimulator(tab.id)}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                  activeSimulator === tab.id
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Simulator Container */}
          <div className="p-4 rounded-xl bg-[#08080a] border border-[#1a1a22] flex items-center justify-center min-h-[300px]">
            {activeSimulator === "twitter" && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-black overflow-hidden shadow-xl text-left">
                <div className="h-44 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  {imageUrl.trim() ? (
                    <img src={imageUrl.trim()} alt="OG Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-zinc-500 text-xs">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-30" />
                      No preview image assigned yet
                    </div>
                  )}
                </div>
                <div className="p-3 bg-black/95 border-t border-zinc-800">
                  <div className="text-[11px] text-zinc-500 font-mono truncate">{cleanDomain}</div>
                  <div className="text-xs font-semibold text-white truncate mt-0.5">{title || "Aveniq"}</div>
                  <div className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 font-light">{description}</div>
                </div>
              </div>
            )}

            {activeSimulator === "whatsapp" && (
              <div className="w-full max-w-xs rounded-xl bg-[#1f2c34] p-2.5 shadow-xl text-left border border-white/5 space-y-2">
                <div className="rounded-lg overflow-hidden bg-[#121b22]">
                  <div className="h-36 bg-[#2a3942] relative overflow-hidden flex items-center justify-center">
                    {imageUrl.trim() ? (
                      <img src={imageUrl.trim()} alt="WhatsApp Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-3 text-zinc-400 text-xs">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
                        No preview image
                      </div>
                    )}
                  </div>
                  <div className="p-2.5 space-y-0.5">
                    <div className="text-xs font-medium text-white truncate">{title || "Aveniq"}</div>
                    <div className="text-[10px] text-zinc-400 line-clamp-2">{description}</div>
                    <div className="text-[9px] text-zinc-500 font-mono truncate pt-0.5">{cleanDomain}</div>
                  </div>
                </div>
                <div className="text-[11px] text-[#53bdeb] underline font-mono truncate px-1">{url}</div>
              </div>
            )}

            {activeSimulator === "linkedin" && (
              <div className="w-full max-w-sm rounded-lg border border-zinc-700/60 bg-[#1d2226] overflow-hidden shadow-xl text-left">
                <div className="h-40 bg-[#121619] relative overflow-hidden flex items-center justify-center">
                  {imageUrl.trim() ? (
                    <img src={imageUrl.trim()} alt="LinkedIn Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-zinc-500 text-xs">No preview image assigned</div>
                  )}
                </div>
                <div className="p-3 bg-[#1d2226] border-t border-zinc-700/50">
                  <div className="text-xs font-semibold text-white truncate">{title || "Aveniq"}</div>
                  <div className="text-[10px] text-zinc-400 font-mono truncate mt-0.5">{cleanDomain} • 2 min read</div>
                </div>
              </div>
            )}

            {activeSimulator === "discord" && (
              <div className="w-full max-w-sm rounded-lg bg-[#2b2d31] p-3 shadow-xl text-left border-l-4 border-l-[#5865f2] space-y-1.5">
                <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Aveniq</div>
                <div className="text-xs font-semibold text-[#00a8fc] hover:underline cursor-pointer truncate">{title}</div>
                <div className="text-[11px] text-zinc-300 font-light line-clamp-2">{description}</div>
                <div className="h-32 rounded bg-black/40 overflow-hidden mt-2 relative">
                  {imageUrl.trim() ? (
                    <img src={imageUrl.trim()} alt="Discord Embed" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No image</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Configured Links Table ── */}
      <div className="bg-[#0e0e11] border border-[#1a1a22] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1a1a22] pb-3">
          <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#10b981]" />
            Active Link Preview Configurations ({previews.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1a1a22] text-[#a1a1aa] font-mono text-[9px] uppercase tracking-wider">
                <th className="py-3 px-3">Preview Image</th>
                <th className="py-3 px-3">Target Link</th>
                <th className="py-3 px-3">Social Title & Description</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a22]">
              {previews.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Image Thumbnail */}
                  <td className="py-3 px-3">
                    <div className="w-20 h-12 rounded-lg bg-black/60 border border-[#1a1a22] overflow-hidden flex items-center justify-center shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[9px] text-[#a1a1aa]">No image</span>
                      )}
                    </div>
                  </td>

                  {/* URL */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-white text-xs truncate max-w-[200px]">{item.url}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#a1a1aa] hover:text-[#10b981]"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>

                  {/* Title & Description */}
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-medium text-white truncate">{item.title}</div>
                    <div className="text-[11px] text-[#a1a1aa] truncate font-light mt-0.5">{item.description}</div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleCopyLink(item.url, item.id)}
                        className="p-1.5 rounded hover:bg-white/5 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 rounded hover:bg-white/5 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        title="Edit Preview"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deletePreview(item.id)}
                        className="p-1.5 rounded hover:bg-rose-950/40 text-[#a1a1aa] hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
