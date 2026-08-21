import React, { useState } from "react";
import { KNOWLEDGE_ARTICLES } from "../data/knowledgeData";
import { getDecoderEntry } from "../data/decoderData";
import { ArticleItem } from "../types";
import { Modal } from "../components/Modal";
import {
  BookOpen,
  Search,
  Clock,
  User,
  SearchCode,
  ArrowRight,
} from "lucide-react";

export const KnowledgePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Section Decoder State
  const [lookupSection, setLookupSection] = useState<string>("148");
  const currentDecoded = getDecoderEntry(lookupSection);

  const allTags = ["All", "Income Tax", "GST", "Corporate Law", "Digital Tech"];

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesTag = selectedTag === "All" || art.category === selectedTag;
    if (!matchesTag) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 lg:px-12 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Corner</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            Decoding Provisions, Sections & Notices
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
            In-depth legal analyses, statutory interpretations, and procedural defense manuals authored by The Paper Plane advisory team.
          </p>
        </div>

        {/* Interactive Section Decoder Tool */}
        <div className="p-8 rounded-2xl liquid-glass border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                <SearchCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interactive Section & Provision Decoder
                </h3>
                <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                  Select or type a section number to inspect statutory obligations, defense remedies & deadlines.
                </p>
              </div>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2">
              {["148", "143(1)", "143(2)", "270A", "44AB", "GSTR-3B"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setLookupSection(sec)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-colors ${
                    lookupSection.toLowerCase() === sec.toLowerCase()
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 text-slate-300 hover:text-cyan-400 border border-white/10"
                  }`}
                >
                  Sec {sec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">
                Provision Title
              </span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{currentDecoded.title}</h4>
              <p className="text-cyan-400 text-[11px] font-mono uppercase tracking-wider font-bold">{currentDecoded.act}</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">
                Statutory Summary
              </span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">{currentDecoded.summary}</p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-extrabold">
                Recommended Defense Action
              </span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">{currentDecoded.action}</p>
              <span className="text-[10px] font-mono text-slate-400 block pt-1 uppercase tracking-wider font-bold">
                Timeline: {currentDecoded.timeline}
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl liquid-glass border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge papers..."
              className="liquid-glass-input w-full rounded-2xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-8 rounded-3xl liquid-glass-card border border-white/10 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold">
                    {article.category}
                  </span>

                  <span className="flex items-center gap-1 text-slate-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {article.readingTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-sans leading-snug group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 font-semibold">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{article.author}</span>
                </div>

                <span className="text-cyan-400 font-bold group-hover:underline flex items-center gap-1 uppercase tracking-wider">
                  Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <Modal
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        labelledBy="article-modal-title"
        maxWidthClassName="max-w-3xl"
      >
        {selectedArticle && (
          <>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono font-bold">
                {selectedArticle.category}
              </span>
              <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-sans uppercase tracking-tight pt-2">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 font-semibold pt-2 border-b border-white/10 pb-4">
                <span>By {selectedArticle.author} ({selectedArticle.authorRole})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readingTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-mono font-bold">
                Official Publication • The Paper Plane Advisory Desk
              </span>
              <a
                href={`https://wa.me/919025565526?text=${encodeURIComponent(
                  `Hello The Paper Plane, I read your article on "${selectedArticle.title}" and need legal consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold transition-colors shadow-lg shadow-emerald-500/20"
              >
                Discuss Article with Tax Counsel
              </a>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
