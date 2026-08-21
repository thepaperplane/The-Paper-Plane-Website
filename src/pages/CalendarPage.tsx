import React, { useState } from "react";
import { COMPLIANCE_DEADLINES, TURNAROUND_TIMES } from "../data/calendarData";
import { ComplianceEvent } from "../types";
import {
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  Download,
  Search,
} from "lucide-react";

const MONTH_INDEX: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const CalendarPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentMonthName = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const categories = ["All", "Income Tax", "GST", "Payroll", "Audit", "MCA Compliance"];

  const filteredEvents = COMPLIANCE_DEADLINES.filter((ev) => {
    const matchesCat = selectedCategory === "All" || ev.category === selectedCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.statute.toLowerCase().includes(q)
    );
  });

  const handleDownloadIcs = (event: ComplianceEvent) => {
    const monthIndex = event.month !== undefined ? MONTH_INDEX[event.month] : new Date().getMonth();
    const dateStr = `${currentYear}${String(monthIndex + 1).padStart(2, "0")}${String(event.day).padStart(2, "0")}`;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Paper Plane//Compliance Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} - ${event.statute}
DTSTART:${dateStr}T090000Z
DTEND:${dateStr}T180000Z
LOCATION:India
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}-compliance-reminder.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Interactive Compliance Radar</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            Dynamic Statutory Calendar
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Mapped for {currentMonthName} {currentYear} & annual filing milestones. Track 7th, 11th, 15th, 20th, July 31st, August 31st, and October 31st deadlines with standard turnaround reference benchmarks.
          </p>
        </div>

        {/* Standard Turnaround Benchmarks Banner */}
        <div className="p-8 rounded-2xl liquid-glass border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Standard Turnaround Benchmarks
              </h2>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                Guaranteed execution turnaround windows at The Paper Plane Desk
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {TURNAROUND_TIMES.map((time, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">{time.section}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase font-bold whitespace-nowrap">
                    {time.duration}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{time.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
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
              placeholder="Search deadlines, statutes..."
              className="liquid-glass-input w-full rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Calendar Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-8 rounded-2xl liquid-glass-card border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col items-center justify-center text-cyan-400 font-mono">
                      <span className="text-sm leading-none font-bold">
                        {event.specificDateLabel ? event.specificDateLabel.split(" ")[1] || event.day : event.day}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider opacity-90 mt-0.5 font-sans font-bold">
                        {event.month || "Monthly"}
                      </span>
                    </div>

                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-1">
                        {event.category}
                      </span>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {event.description}
                </p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-bold">Statute & Authority:</span>
                  <span className="text-slate-200 font-bold">{event.statute}</span>
                </div>

                {event.penaltyWarning && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{event.penaltyWarning}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end text-xs">
                <button
                  id={`ics-download-${event.id}`}
                  onClick={() => handleDownloadIcs(event)}
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar (.ICS)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
