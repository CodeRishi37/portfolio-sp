import { NextResponse } from 'next/server';
import { fallbackGitHubStats } from '@/data/stats';
import { profileData } from '@/data/profile';
import { GitHubStatsData } from '@/types';

export async function GET() {
  try {
    const githubUrl = profileData.socials.github;
    const parts = githubUrl.split('/').filter(Boolean);
    const username = process.env.GITHUB_USERNAME || (parts.length > 0 ? parts[parts.length - 1] : 'rishi-code');

    const headers: Record<string, string> = {
      'User-Agent': 'Rishi-Portfolio-App',
      Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        signal: controller.signal,
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
        headers,
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(fallbackGitHubStats, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const userData = await userRes.json();
    const reposData: any[] = await reposRes.json();

    if (!Array.isArray(reposData)) {
      return NextResponse.json(fallbackGitHubStats);
    }

    let totalStars = 0;
    const langCounts: Record<string, number> = {};

    for (const repo of reposData) {
      if (!repo.fork) {
        totalStars += repo.stargazers_count || 0;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      }
    }

    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const colorMap: Record<string, string> = {
      Java: '#b07219',
      Python: '#3572A5',
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      C: '#555555',
      'C++': '#f34b7d',
      HTML: '#e34c26',
      CSS: '#563d7c',
    };

    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangRepos) * 100),
        color: colorMap[name] || '#00e5ff',
      }));

    const stats: GitHubStatsData = {
      publicRepos: userData.public_repos ?? fallbackGitHubStats.publicRepos,
      followers: userData.followers ?? fallbackGitHubStats.followers,
      following: userData.following ?? fallbackGitHubStats.following,
      totalStars: totalStars || fallbackGitHubStats.totalStars,
      recentCommits: fallbackGitHubStats.recentCommits,
      topLanguages: topLanguages.length > 0 ? topLanguages : fallbackGitHubStats.topLanguages,
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(fallbackGitHubStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
}
