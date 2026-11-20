'use client';

import { educationData } from '@/data/education';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Binary,
} from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="academics" className="py-20 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Academic Rigor & Foundational CS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
            Education & Academic Track Record
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Committed to strong algorithmic foundations, discrete mathematics, and computer systems architecture alongside independent software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Institution Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {educationData.currentSemester}
                </span>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-slate-100 pt-2">
                  {educationData.institution}
                </h3>
                <p className="text-sm font-sans text-cyan-400/90 font-medium">
                  {educationData.university}
                </p>
              </div>

              {/* CGPA Badge Display */}
              <div className="p-4 rounded-xl bg-[#121624] border border-cyan-500/30 text-center space-y-1 shadow-[0_0_20px_rgba(0,229,255,0.12)]">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  YEAR 1 CGPA
                </span>
                <span className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-400">
                  {educationData.cgpa.split('/')[0].trim()}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                  Top Percentile
                </span>
              </div>
            </div>

            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-b border-white/5 py-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{educationData.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{educationData.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>B.Tech in Computer Science & Engineering</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Academic Key Highlights:
              </span>
              <div className="space-y-2">
                {educationData.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-sans text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Pill */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
                <BrainCircuit className="w-4 h-4" />
                <span>My Learning Philosophy</span>
              </div>
              <p className="leading-relaxed">
                "Computer science is an experimental discipline backed by mathematical rigor. I anchor my learning in college coursework (Discrete Math, DSA, OS, DBMS) and immediately put it to the test by building real storage engines, proxies, and multi-threaded systems."
              </p>
            </div>
          </div>

          {/* Right Coursework Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#0d0f17] p-6 space-y-5">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-100">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Curriculum & Coursework</span>
              </div>

              <div className="space-y-4">
                {educationData.coursework.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider block font-semibold">
                      {group.category}
                    </span>
                    <ul className="space-y-1.5">
                      {group.courses.map((course, cIdx) => (
                        <li
                          key={cIdx}
                          className="p-2.5 rounded-lg bg-black/30 border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2"
                        >
                          <Binary className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
