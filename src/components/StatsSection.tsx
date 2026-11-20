'use client';

import { useState, useEffect } from 'react';
import { GitHubStatsData, LeetCodeStatsData } from '@/types';
import { fallbackGitHubStats, fallbackLeetCodeStats } from '@/data/stats';
import { profileData } from '@/data/profile';
import {
  Code2,
  GitCommit,
  Star,
  Users,
  FolderGit2,
  Trophy,
  Activity,
  Flame,
  CheckCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function StatsSection() {
  const [githubStats, setGithubStats] = useState<GitHubStatsData>(fallbackGitHubStats);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStatsData>(fallbackLeetCodeStats);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      setIsLoading(true);
      try {
        const [ghRes, lcRes] = await Promise.allSettled([
          fetch('/api/stats/github').then((r) => r.json()),
          fetch('/api/stats/leetcode').then((r) => r.json()),
        ]);

        if (isMounted) {
          if (ghRes.status === 'fulfilled' && ghRes.value) {
            setGithubStats(ghRes.value);
          }
          if (lcRes.status === 'fulfilled' && lcRes.value) {
            setLeetCodeStats(lcRes.value);
          }
        }
      } catch {
        // Keeps fallback snapshots smoothly
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="live-stats" className="py-20 bg-[#06070a] border-t border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Telemetry & Public Activity</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
            Live Development & Algorithmic Stats
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Real-time activity telemetry synchronized via serverless cached endpoints with resilient fallback snapshots.
          </p>
        </div>

        {/* Stats 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. GitHub Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0e16] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-slate-100 border border-white/10">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base sm:text-lg font-bold text-slate-100">
                      GitHub Activity Stream
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      @{profileData.socials.github.split('/').pop()}
                    </span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      githubStats.isFallback ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <span className="text-slate-400">
                    {githubStats.isFallback ? 'Cached Snapshot' : 'Live Synced'}
                  </span>
                </div>
              </div>

              {/* 4-Stat Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Public Repos
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-300">
                    {githubStats.publicRepos}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Total Stars
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-amber-300">
                    {githubStats.totalStars}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Recent Commits
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-300">
                    {githubStats.recentCommits}+
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Followers
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-slate-200">
                    {githubStats.followers}
                  </span>
                </div>
              </div>

              {/* Top Languages Stack Breakdown */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Primary Repository Languages:
                </span>

                {/* Segmented language bar */}
                <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden flex gap-0.5 p-0.5">
                  {githubStats.topLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      className="h-full rounded-sm transition-all"
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>

                {/* Legend items */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                  {githubStats.topLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-slate-500">({lang.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Profile CTA */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Data refreshed every 60 min via Edge cache
              </span>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. LeetCode Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0e16] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base sm:text-lg font-bold text-slate-100">
                      LeetCode & DSA Metrics
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      @{leetCodeStats.username}
                    </span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      leetCodeStats.isFallback ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <span className="text-slate-400">
                    {leetCodeStats.isFallback ? 'Snapshot Cache' : 'Live Synced'}
                  </span>
                </div>
              </div>

              {/* Total Solved Hero Bar */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    TOTAL ALGORITHMIC PROBLEMS SOLVED
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-100">
                      {leetCodeStats.totalSolved}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      / {leetCodeStats.totalQuestions} questions
                    </span>
                  </div>
                </div>

                {leetCodeStats.contestRating ? (
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      CONTEST RATING
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">
                      {leetCodeStats.contestRating}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Problem Difficulty Tier Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Difficulty Distribution:
                </span>

                {/* Easy */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-medium">Easy</span>
                    <span className="text-slate-300 font-bold">{leetCodeStats.easySolved}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (leetCodeStats.easySolved / (leetCodeStats.totalSolved || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-medium">Medium (Core Focus)</span>
                    <span className="text-slate-300 font-bold">{leetCodeStats.mediumSolved}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (leetCodeStats.mediumSolved / (leetCodeStats.totalSolved || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-medium">Hard</span>
                    <span className="text-slate-300 font-bold">{leetCodeStats.hardSolved}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (leetCodeStats.hardSolved / (leetCodeStats.totalSolved || 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Profile CTA */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Focus: Binary Search, Trees, Graphs, DP
              </span>
              <a
                href={profileData.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
