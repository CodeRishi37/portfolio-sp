'use client';

import { useState } from 'react';
import { buildLogData } from '@/data/buildlog';
import {
  GitCommit,
  Tag,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const tags = ['All', 'Shipped', 'Architecture', 'Milestone', 'Learning'] as const;

const tagStyles: Record<string, { bg: string; text: string; border: string }> = {
  Shipped: {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
  },
  Architecture: {
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
  },
  Milestone: {
    bg: 'bg-purple-950/40',
    text: 'text-purple-300',
    border: 'border-purple-500/30',
  },
  Learning: {
    bg: 'bg-amber-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
  },
};

export default function BuildLogSection() {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredLogs = buildLogData.filter((entry) =>
    selectedTag === 'All' ? true : entry.tag === selectedTag
  );

  return (
    <section id="build-log" className="py-20 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Public Engineering Journal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
              Build Log & Engineering Timeline
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
              A transparent, dated record of what I shipped, architectural decisions made, and empirical lessons learned.
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#10131d] p-1.5 rounded-xl border border-white/10 text-xs font-mono">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {filteredLogs.map((log) => {
            const badge = tagStyles[log.tag] || tagStyles.Shipped;

            return (
              <div key={log.id} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#08090c] border-2 border-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#00e5ff]" />

                {/* Entry Card */}
                <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#0d0f17] group-hover:border-cyan-500/30 transition-all space-y-3">
                  {/* Top Bar: Date & Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {log.tag}
                      </span>
                      {log.relatedProject && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                          proj: {log.relatedProject}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{log.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {log.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {log.summary}
                  </p>

                  {/* Key Learning Box */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Technical Takeaway / What I Learned:</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {log.learnings}
                    </p>
                  </div>

                  {/* Link / Commit */}
                  {log.link && (
                    <div className="pt-1">
                      <a
                        href={log.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        <span>Inspect commit / pull request</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
