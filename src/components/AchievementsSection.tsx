'use client';

import { achievementsData } from '@/data/achievements';
import {
  Trophy,
  Award,
  Lightbulb,
  ExternalLink,
  Calendar,
  Sparkles,
  Tag,
} from 'lucide-react';

const typeIcons: Record<string, any> = {
  Academic: Award,
  Ideathon: Lightbulb,
  Competitive: Trophy,
  Certification: Sparkles,
};

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-[#06070a] border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Honors, Competitions & Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
            Achievements & Ideathons
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Recognitions across academic performance, campus ideathons, open source, and competitive coding sprints.
          </p>
        </div>

        {/* Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((item) => {
            const Icon = typeIcons[item.type] || Trophy;

            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0c0e16] hover:border-cyan-500/30 transition-all duration-200 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="font-mono text-base sm:text-lg font-bold text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 font-medium">
                      {item.organization}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  {item.badgeText ? (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 font-semibold">
                      {item.badgeText}
                    </span>
                  ) : <span />}

                  {item.isPlaceholder && (
                    <span className="text-[10px] font-mono text-amber-400/90 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                      [TODO: Add event certificate/link]
                    </span>
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
