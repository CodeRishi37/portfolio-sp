'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { projectsData } from '@/data/projects';
import ProjectModal from './ProjectModal';
import LiveDemoModal from './LiveDemoModal';
import {
  GitBranch,
  Play,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from './Icons';

const categories = ['All', 'Backend & Systems', 'Cybersecurity', 'AI & Data'] as const;

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [demoState, setDemoState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const filteredProjects = projectsData.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  const handleOpenCaseStudy = (project: Project) => {
    setActiveProject(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenDemo = (url: string, title: string) => {
    setDemoState({ isOpen: true, url, title });
  };

  return (
    <section id="projects" className="py-20 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Engineered Systems & Pipelines</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
              Featured Projects & Architectures
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
              Each project includes a full interactive system diagram, analysis of technical trade-offs, and empirical benchmark write-ups.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#10131d] p-1.5 rounded-xl border border-white/10 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-white/10 bg-[#0d0f17] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_24px_rgba(0,229,255,0.08)]"
            >
              {/* Card Header & Content */}
              <div className="p-6 space-y-4">
                {/* Meta Top: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-mono">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Architecture Topology Preview */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Topology: {project.architecture.nodes.length} Components</span>
                    </span>
                    <span className="text-slate-500">
                      {project.architecture.edges.length} Protocols
                    </span>
                  </div>

                  {/* Node Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.architecture.nodes.slice(0, 4).map((node) => (
                      <span
                        key={node.id}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-slate-300"
                      >
                        {node.label.split('/')[0]}
                      </span>
                    ))}
                    {project.architecture.nodes.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-400">
                        +{project.architecture.nodes.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-[#10131e] border-t border-white/5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenCaseStudy(project)}
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer group/btn"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.hasLiveDemo && project.liveDemoUrl && (
                    <button
                      type="button"
                      onClick={() => handleOpenDemo(project.liveDemoUrl!, project.title)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors cursor-pointer"
                      title="Launch sandboxed live demo"
                    >
                      <Play className="w-3 h-3 fill-cyan-400" />
                      <span>Live Demo</span>
                    </button>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="View GitHub repository"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study & Architecture Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onOpenDemo={handleOpenDemo}
      />

      {/* Embedded Live Demo Modal */}
      <LiveDemoModal
        isOpen={demoState.isOpen}
        onClose={() => setDemoState({ isOpen: false, url: '', title: '' })}
        demoUrl={demoState.url}
        projectTitle={demoState.title}
      />
    </section>
  );
}
