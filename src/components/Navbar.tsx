'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileDown, Terminal, Sparkles } from 'lucide-react';
import { profileData } from '@/data/profile';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Academics', href: '#academics' },
  { label: 'Build Log', href: '#build-log' },
  { label: 'Live Stats', href: '#live-stats' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#08090c]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          href="#"
          className="flex items-center gap-2.5 text-slate-100 hover:text-cyan-400 transition-colors group focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md p-1"
          aria-label="Rishi Portfolio Home"
        >
          <div className="w-8 h-8 rounded border border-cyan-500/30 bg-cyan-950/30 flex items-center justify-center font-mono text-xs font-semibold text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
            RP
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold tracking-tight leading-none text-slate-100">
              {profileData.shortName}
              <span className="text-cyan-400">.dev</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 tracking-wider">
              CSE @ ITER/SOA
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#10131d]/70 px-3 py-1.5 rounded-full border border-white/[0.07] text-xs font-mono">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1 rounded-full text-slate-300 hover:text-cyan-300 hover:bg-white/[0.05] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Action: Status Pill & Resume Download */}
        <div className="hidden sm:flex items-center gap-3">
          {/* CGPA Status Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profileData.cgpa}</span>
          </div>

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            download="Rishi_Patra_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
            title="Download PDF Resume"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/resume.pdf"
            download="Rishi_Patra_Resume.pdf"
            className="p-2 rounded-md bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Download Resume"
          >
            <FileDown className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-300 hover:text-white bg-white/5 border border-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0e15] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>First Year B.Tech CSE • {profileData.cgpa}</span>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="/resume.pdf"
              download="Rishi_Patra_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-semibold"
            >
              <FileDown className="w-4 h-4" />
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
