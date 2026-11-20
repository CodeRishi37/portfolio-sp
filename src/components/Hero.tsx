'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  ArrowRight,
  FileDown,
  Mail,
  Code2,
  Cpu,
  Layers,
  Database,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '@/data/profile';

const terminalCommands = [
  {
    id: 'whoami',
    cmd: '$ whoami',
    output:
      'Saptarshi Patra (Rishi) — 1st Year B.Tech CSE @ ITER/SOA, Bhubaneswar. 9.45 CGPA.',
  },
  {
    id: 'stack',
    cmd: '$ cat core_stack.json',
    output:
      '{\n  "languages": ["Java 21", "Python 3.11", "SQL", "C/C++"],\n  "systems": ["Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker"],\n  "focus": ["Backend Architecture", "DBMS Internals", "RAG Pipelines"]\n}',
  },
  {
    id: 'ethos',
    cmd: '$ cat learning_ethos.md',
    output:
      'I don’t just clone tutorial code. I build storage engines, benchmark Redis Lua race conditions, measure p99 latency, and verify cryptographic zero-trust perimeters.',
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden tech-grid-bg border-b border-white/[0.06]">
      {/* Subtle top spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Identity & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121622] border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>First-Year B.Tech CSE @ ITER/SOA • 9.45 CGPA (Sem 1)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-slate-100">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-cyan-400">
                  {profileData.shortName}
                </span>
                .
              </h1>
              <p className="text-lg sm:text-xl font-mono text-cyan-400 font-medium">
                {profileData.tagline}
              </p>
            </div>

            {/* Bio paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
              {profileData.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-[0_0_18px_rgba(0,229,255,0.25)] hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
              >
                <span>View Architecture & Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/resume.pdf"
                download="Rishi_Patra_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs sm:text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            {/* Social Links & Handles */}
            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href={profileData.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>LeetCode (180+)</span>
              </a>
              <span className="text-white/20">•</span>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Engineering Terminal & Storytelling (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Terminal Window */}
            <div className="rounded-xl border border-white/10 bg-[#0a0c12] shadow-2xl overflow-hidden">
              {/* Terminal Titlebar */}
              <div className="px-4 py-2.5 terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-400 ml-2">
                    rishi@soa-iter: ~/kernel
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>bash</span>
                </div>
              </div>

              {/* Terminal Tab Switchers */}
              <div className="flex border-b border-white/10 bg-black/40 text-[11px] font-mono">
                {terminalCommands.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-3 py-1.5 border-r border-white/10 transition-colors cursor-pointer ${
                      activeTab === index
                        ? 'bg-[#121622] text-cyan-300 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    tab_{index + 1}
                  </button>
                ))}
              </div>

              {/* Terminal Screen Body */}
              <div className="p-4 font-mono text-xs space-y-2 min-h-[160px] bg-[#090b10]">
                <div className="text-cyan-400 font-semibold flex items-center gap-1">
                  {terminalCommands[activeTab].cmd}
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] font-mono">
                  {terminalCommands[activeTab].output}
                </pre>
                <div className="flex items-center gap-1 text-slate-500 pt-2">
                  <span className="text-cyan-400">$</span>
                  <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            {/* Pinned Storytelling Triad */}
            <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d1018] space-y-2 text-xs font-mono">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                HOW I THINK & BUILD (3 PRINCIPLES):
              </span>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">01.</span>
                  <span>Deconstruct the problem & evaluate architectural trade-offs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">02.</span>
                  <span>Build low-overhead services from scratch without blind abstraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">03.</span>
                  <span>Verify empirically with load testing, p99 latency & crash resilience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
