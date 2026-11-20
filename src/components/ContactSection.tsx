'use client';

import { useState } from 'react';
import { profileData } from '@/data/profile';
import {
  Mail,
  Copy,
  Check,
  FileDown,
  Send,
  MessageSquare,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Internship Opportunity');

  const email = profileData.socials.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Contact] ${selectedTopic} - From Website`);
    const body = encodeURIComponent(
      `Hi Rishi,\n\nI came across your developer portfolio and your work on systems and AI pipelines.\n\nI'd like to connect regarding: ${selectedTopic}.\n\nBest regards,\n[Your Name]`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-[#08090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Socials (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
                Let's Build Something Resilient
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                I am actively seeking software engineering and AI engineering internship opportunities, technical collaborations, and open-source contributions.
              </p>
            </div>

            {/* Email Copier Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0e111a] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Direct Contact Email:
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-200 truncate">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer shrink-0 border border-white/10"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Link Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-200 block">
                      GitHub
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Code repositories & PRs
                    </span>
                  </div>
                </div>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0e111a] border border-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-white">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-200 block">
                      LinkedIn
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Professional profile
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Resume Download Box */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-semibold text-cyan-300 block">
                  Official Resume Document
                </span>
                <span className="font-sans text-xs text-slate-400">
                  Updated with Sem 1 (9.45 CGPA) & recent project architectures.
                </span>
              </div>
              <a
                href="/resume.pdf"
                download="Rishi_Patra_Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.25)]"
              >
                <FileDown className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Dispatcher (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0d0f17] p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Send className="w-4 h-4" />
                <span>QUICK MESSAGE DISPATCHER</span>
              </div>
              <h3 className="text-lg font-mono font-bold text-slate-100">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Select your inquiry topic to open a pre-formatted message in your default mail client.
              </p>
            </div>

            {/* Topic Selectors */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Inquiry Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Internship Opportunity',
                  'Technical Collaboration',
                  'System Architecture Chat',
                ].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-2.5 rounded-lg border text-xs font-mono text-center transition-all cursor-pointer ${
                      selectedTopic === topic
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block">
                PREVIEW:
              </span>
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px]">
                To: {email}
                <br />
                Subject: [Portfolio Contact] {selectedTopic} - From Website
                <br />
                Body: Hi Rishi, I came across your portfolio...
              </div>
            </div>

            {/* Submit Action */}
            <a
              href={getMailtoUrl()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-[0_0_18px_rgba(0,229,255,0.25)]"
            >
              <Mail className="w-4 h-4 fill-black" />
              <span>Compose Email in Mail Client</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
