import React, { useState, useEffect } from "react";
import { NewsItem } from "../types";
import {
  Flame,
  Globe,
  ExternalLink,
  RefreshCw,
  Search,
  AlertCircle,
} from "lucide-react";

export const NewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.news) {
        setNewsList(data.news);
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Income Tax", "GST", "Companies Act", "Statutory Audit"];

  const filteredNews = newsList.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-24 font-sans">
      {/* Compliance Ticker (static digest, not a live feed) */}
      <div className="w-full liquid-glass border-y border-white/10 py-3 overflow-hidden relative">
        <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[11px] font-mono font-extrabold uppercase tracking-wider shrink-0 border border-amber-500/20">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            Compliance Ticker
          </span>

          <span className="text-xs text-slate-300 font-mono font-medium">
            • CBDT: Section 143(1) Intimation processing turnaround capped at 30 days.
          </span>
          <span className="text-xs text-slate-300 font-mono font-medium">
            • GSTN: E-Invoicing mandatory 30-day reporting window for turnover &gt; ₹5 Cr.
          </span>
          <span className="text-xs text-slate-300 font-mono font-medium">
            • MCA: SPICe+ Portal 48-Hour Pvt Ltd & LLP fast-track routine updated for Tamil Nadu.
          </span>
          <span className="text-xs text-slate-300 font-mono font-medium">
            • ICAI: SA 230 Audit Working Papers Electronic Verification Advisory published.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 space-y-10">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Statutory Digest</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              Statutory News & Circulars
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-2">
              Periodic digest of updates from TaxGuru, ICAI, Income Tax Dept, MCA, and GSTN portals.
            </p>
          </div>

          <button
            id="news-refresh-btn"
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass hover:bg-white/10 border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Feed</span>
          </button>
        </div>

        {/* Category Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl liquid-glass border border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars & rules..."
              className="liquid-glass-input w-full rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl liquid-glass border border-white/10 space-y-4 animate-pulse">
                <div className="h-4 w-24 rounded-full bg-white/10" />
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-2/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 liquid-glass-card rounded-3xl border border-white/10 space-y-4">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-sm text-slate-300 font-medium">
              Couldn't load the statutory digest right now.
            </p>
            <button
              onClick={fetchNews}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Feed Cards Dashboard */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl liquid-glass-card border border-white/10 hover:border-cyan-400/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>

                    {item.isHot && (
                      <span className="flex items-center gap-1 text-amber-400 font-extrabold uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        Hot Circular
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white uppercase tracking-wider leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                  <span>{item.source} • {item.date}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-bold"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {filteredNews.length === 0 && (
              <div className="md:col-span-2 text-center py-16 liquid-glass-card rounded-3xl border border-white/10 space-y-4">
                <p className="text-sm text-slate-300 font-medium">
                  No circulars found matching "{searchQuery || selectedCategory}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
