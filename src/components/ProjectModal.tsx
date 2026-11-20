'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import ArchitectureDiagram from './ArchitectureDiagram';
import {
  X,
  Play,
  CheckCircle,
  AlertOctagon,
  Sparkles,
  GitBranch,
  TrendingUp,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: (url: string, title: string) => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onOpenDemo,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'casestudy'>('architecture');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#090b10] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-[#0e111a] border-b border-white/10 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">
                  {project.status}
                </span>
                {project.caseStudy.metricsOrOutcome && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/40 border border-purple-500/20 text-purple-300">
                    <TrendingUp className="w-3 h-3" />
                    Verified Performance
                  </span>
                )}
              </div>
              <h3 id="case-study-title" className="text-lg sm:text-2xl font-mono font-bold text-slate-100">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                {project.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action CTAs & View Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            {/* View Switcher */}
            <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Architecture Diagram</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('casestudy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'casestudy'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Case Study & Trade-offs</span>
              </button>
            </div>

            {/* Links */}
            <div className="flex items-center gap-2">
              {project.hasLiveDemo && project.liveDemoUrl && (
                <button
                  type="button"
                  onClick={() => onOpenDemo(project.liveDemoUrl!, project.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-semibold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Launch Live Demo</span>
                </button>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'architecture' ? (
            /* Architecture Diagram View */
            <div className="space-y-6">
              <ArchitectureDiagram data={project.architecture} projectTitle={project.title} />

              {/* Quick Summary of Outcomes */}
              {project.caseStudy.metricsOrOutcome && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
                      Validated Empirical Benchmark
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans">
                      {project.caseStudy.metricsOrOutcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Detailed Case Study View */
            <div className="space-y-6 max-w-4xl">
              {/* Problem Statement */}
              <div className="p-4 sm:p-5 rounded-xl bg-red-950/15 border border-red-500/20 space-y-2">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertOctagon className="w-4 h-4" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    The Problem & Bottleneck
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Architectural Approach */}
              <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/15 border border-cyan-500/20 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    Architectural Approach
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {project.caseStudy.approach}
                </p>
              </div>

              {/* Trade-Offs Evaluated */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0f121d] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sliders className="w-4 h-4" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    Trade-offs Analyzed
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Every engineering decision sacrifices one dimension to optimize another.
                </p>
                <div className="space-y-2.5 pt-1">
                  {project.caseStudy.tradeOffs.map((tradeoff, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5 text-xs font-sans text-slate-200 leading-relaxed"
                    >
                      <span className="font-mono text-cyan-400 font-bold shrink-0">
                        [{idx + 1}]
                      </span>
                      <span>{tradeoff}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What I'd Improve */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0f121d] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    What I'd Improve in Future Iterations
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-slate-300 list-disc list-inside">
                  {project.caseStudy.whatIdImprove.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
