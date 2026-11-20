'use client';

import { useState } from 'react';
import { skillsData } from '@/data/skills';
import {
  Code2,
  Server,
  Database,
  Wrench,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Code2,
  Server,
  Database,
  Wrench,
  GraduationCap,
};

const levelBadge: Record<string, { bg: string; text: string; border: string }> = {
  Core: {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
  },
  Proficient: {
    bg: 'bg-sky-950/40',
    text: 'text-sky-300',
    border: 'border-sky-500/30',
  },
  Exploring: {
    bg: 'bg-amber-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
  },
};

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const activeCategory = skillsData[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 bg-[#06070a] border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Technical Proficiency & Tooling</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
            Skills & Architectural Practice
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Grouped by architectural domain. I focus on core foundational mastery rather than surface-level framework hopping.
          </p>
        </div>

        {/* Layout: Left category list, Right active skills cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Selectors (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            {skillsData.map((cat, idx) => {
              const Icon = iconMap[cat.iconName] || Layers;
              const isActive = activeCategoryIndex === idx;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-cyan-500/40 bg-cyan-950/20 text-slate-100 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      : 'border-white/5 bg-[#0b0d14] text-slate-400 hover:text-slate-200 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs sm:text-sm font-semibold block">
                        {cat.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {cat.skills.length} competencies
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Skills Grid (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#0b0d14] p-6 space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h3 className="font-mono text-lg font-bold text-slate-100">
                {activeCategory.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.skills.map((skill) => {
                const badge = levelBadge[skill.level] || levelBadge.Core;

                return (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-[#0f121d] border border-white/5 hover:border-cyan-500/30 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-mono text-sm font-bold text-slate-100">
                        {skill.name}
                      </h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {skill.description}
                      </p>
                    )}

                    {skill.projectsUsedIn && skill.projectsUsedIn.length > 0 && (
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span className="text-slate-500">Applied in:</span>
                        {skill.projectsUsedIn.map((p) => (
                          <span
                            key={p}
                            className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-cyan-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
