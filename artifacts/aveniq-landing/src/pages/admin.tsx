import { useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Globe, FileText, ArrowRight } from "lucide-react";
import { useProjects, COLOR_PRESETS, Project } from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { projects, addProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const reduce = useReducedMotion();

  // Form State
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const activePreset = COLOR_PRESETS[selectedColorIndex];

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a project title.",
        variant: "destructive",
      });
      return;
    }

    if (!tag.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a tag or category.",
        variant: "destructive",
      });
      return;
    }

    if (!desc.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a project description.",
        variant: "destructive",
      });
      return;
    }

    addProject({
      title,
      tag,
      desc,
      gradient: activePreset.gradient,
      accentColor: activePreset.accentColor,
      imageUrl: imageUrl.trim() || undefined,
      link: link.trim() || undefined,
    });

    toast({
      title: "Success",
      description: `Project "${title}" has been added successfully.`,
    });

    // Reset Form
    setTitle("");
    setTag("");
    setDesc("");
    setImageUrl("");
    setLink("");
    setSelectedColorIndex(0);
  };

  const handleDeleteProject = (id: string, name: string) => {
    deleteProject(id);
    toast({
      title: "Deleted",
      description: `Project "${name}" has been removed.`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 md:py-16 selection:bg-[#6750A4]">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#6750A4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-10 md:mb-16">
          <Link href="/" className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 outline-none">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9C89D9]" style={{ boxShadow: "0 0 6px #9C89D9" }} />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50 font-mono">CMS Dashboard</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-12 text-white">Manage Work</h1>

        {/* Content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left Panel: Form */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
              <Plus className="w-5 h-5 text-[#9C89D9]" /> Add New Project
            </h2>

            <form onSubmit={handleAddProject} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Project Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/20 premium-input text-sm"
                  placeholder="e.g. Nexora CRM"
                />
              </div>

              <div>
                <label htmlFor="tag" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Tag / Category</label>
                <input
                  type="text"
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/20 premium-input text-sm"
                  placeholder="e.g. SaaS · AI"
                />
              </div>

              <div>
                <label htmlFor="desc" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Description</label>
                <textarea
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/20 premium-input text-sm"
                  placeholder="Explain the project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="imageUrl" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Image URL (Optional)</label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/20 premium-input text-sm"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label htmlFor="link" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Website Link (Optional)</label>
                  <input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#9C89D9] focus:border-transparent text-white placeholder:text-white/20 premium-input text-sm"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Curated Color Preset Picker */}
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">Theme Color Preset</span>
                <div className="flex gap-4">
                  {COLOR_PRESETS.map((preset, i) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(i)}
                      className={`relative w-8 h-8 rounded-full cursor-pointer focus:outline-none active:scale-90 transition-transform duration-200`}
                      style={{
                        background: preset.name === "Violet" ? "#6750A4" : preset.name === "Blue" ? "#3B82F6" : preset.name === "Emerald" ? "#10B981" : preset.name === "Rose" ? "#F43F5E" : "#F59E0B"
                      }}
                    >
                      {selectedColorIndex === i && (
                        <span className="absolute inset-0 rounded-full border-2 border-white scale-125 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6750A4] to-[#9C89D9] text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(103,80,164,0.3)]"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Panel: Live Visual Card Mockup Preview */}
          <div className="sticky top-28 flex flex-col gap-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">Real-Time Mockup Preview</h2>
            
            {/* Project Card Render */}
            <div
              className={`relative h-[340px] sm:h-[400px] rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b ${activePreset.gradient} transition-[border-color,transform] duration-500 hover:border-white/20 select-none shadow-[0_12px_40px_rgba(0,0,0,0.5)]`}
            >
              {/* Optional Background Image */}
              {imageUrl.trim() && (
                <img
                  src={imageUrl.trim()}
                  alt="Preview Image"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
                  onError={(e) => {
                    // Suppress broken image symbol
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}

              {/* Glow orb */}
              <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-40 z-0"
                style={{ background: activePreset.accentColor }}
              />

              {/* Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-white/50 border border-white/10 px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-sm">
                  {tag.trim() || "Tag · Category"}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <h3 className="text-xl font-semibold mb-2.5 text-white">{title.trim() || "Project Title"}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6 font-light">{desc.trim() || "Write a project description. It will appear here dynamically as you type..."}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#9C89D9]">
                  {link.trim() ? "Visit Website" : "View Case Study"} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Work List Section */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-16"
        >
          <h2 className="font-serif text-3xl mb-8 text-white">Existing Work ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-white/40 text-sm">
              No projects added yet. Use the form above to build one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative bg-white/[0.01] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors duration-200"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1.5 text-base">{proj.title}</h3>
                        <span className="text-[9px] font-semibold tracking-wider uppercase text-[#9C89D9] border border-[#9C89D9]/20 px-2.5 py-1 rounded-full bg-[#9C89D9]/5">
                          {proj.tag}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="text-white/30 hover:text-rose-500 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-90"
                        title="Delete project"
                        aria-label={`Delete ${proj.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed font-light mb-6 line-clamp-3">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Resource badges */}
                  <div className="flex gap-4 border-t border-white/5 pt-4 text-[10px] text-white/40">
                    {proj.imageUrl && (
                      <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Has Image</span>
                    )}
                    {proj.link && (
                      <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Has Website</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
