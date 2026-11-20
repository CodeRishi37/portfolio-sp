'use client';

import { profileData } from '@/data/profile';
import { ArrowUp, Terminal, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-center text-cyan-400 font-mono text-xs font-semibold">
              RP
            </div>
            <div>
              <span className="text-slate-200 font-semibold block">
                {profileData.name} ({profileData.shortName})
              </span>
              <span className="text-[11px] text-slate-500">
                CSE Undergrad @ ITER/SOA, Bhubaneswar • {profileData.cgpa}
              </span>
            </div>
          </div>

          {/* System Status & Stack */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Vercel Serverless Ready</span>
            </div>
            <span>•</span>
            <span>Next.js 16 + Tailwind</span>
            <span>•</span>
            <span>Engineered with Zero Bloat</span>
          </div>

          {/* Scroll to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © 2025–2026 {profileData.name}. All architecture diagrams and case studies are licensed under MIT.
          </p>
          <div className="flex items-center gap-2">
            <span>Designed for speed, accessibility & engineering depth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
