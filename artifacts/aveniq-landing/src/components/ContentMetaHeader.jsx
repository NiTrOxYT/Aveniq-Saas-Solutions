import { ShieldCheck, Clock, Calendar, UserCheck, Code2 } from "lucide-react";
export default function ContentMetaHeader({ title, subtitle, author = "Aveniq Engineering Team", reviewer = "Principal AI Architect", lastUpdated = "August 2026", version = "v2.4.0", readTime = "12 min read", category = "Technical Knowledge", }) {
    return (<div className="mb-12 border-b border-white/10 pb-8">
      {category && (<span className="inline-block text-[#9C89D9] text-xs font-semibold uppercase tracking-widest mb-3 bg-[#6750A4]/15 px-3 py-1 rounded-full border border-[#9C89D9]/20">
          {category}
        </span>)}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.1] tracking-tight">
        {title}
      </h1>
      {subtitle && (<p className="text-white/60 text-lg md:text-xl max-w-3xl font-light leading-relaxed mb-6">
          {subtitle}
        </p>)}

      {/* Meta Grid */}
      <div className="flex flex-wrap gap-y-3 gap-x-6 text-xs text-white/50 border-t border-white/5 pt-4">
        <div className="flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-[#9C89D9]"/>
          <span>Author: <strong className="text-white/80 font-medium">{author}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400"/>
          <span>Reviewed by: <strong className="text-white/80 font-medium">{reviewer}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-white/40"/>
          <span>Updated: <strong className="text-white/80 font-medium">{lastUpdated}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-amber-400"/>
          <span>Version: <strong className="text-white/80 font-medium">{version}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-white/40"/>
          <span>{readTime}</span>
        </div>
      </div>
    </div>);
}
