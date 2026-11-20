import { GitHubStatsData, LeetCodeStatsData } from '@/types';

// Fallback snapshot data for GitHub: will be displayed if GitHub API is unreachable or rate-limited
export const fallbackGitHubStats: GitHubStatsData = {
  publicRepos: 14,
  followers: 28,
  following: 34,
  totalStars: 42,
  recentCommits: 184,
  topLanguages: [
    { name: 'Java', percentage: 46, color: '#b07219' },
    { name: 'Python', percentage: 32, color: '#3572A5' },
    { name: 'TypeScript', percentage: 14, color: '#3178c6' },
    { name: 'C / C++', percentage: 8, color: '#f34b7d' },
  ],
  lastUpdated: 'Snapshot (Cached)',
  isFallback: true,
};

// Fallback snapshot data for LeetCode: will be displayed if LeetCode GraphQL is blocked/down
export const fallbackLeetCodeStats: LeetCodeStatsData = {
  username: 'rishi_patra', // TODO: Update with your exact LeetCode handle
  totalSolved: 184,
  easySolved: 78,
  mediumSolved: 94,
  hardSolved: 12,
  totalQuestions: 3300,
  ranking: 184200,
  contestRating: 1620,
  lastUpdated: 'Snapshot (Cached)',
  isFallback: true,
};
