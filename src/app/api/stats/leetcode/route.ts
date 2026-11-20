import { NextResponse } from 'next/server';
import { fallbackLeetCodeStats } from '@/data/stats';
import { profileData } from '@/data/profile';
import { LeetCodeStatsData } from '@/types';

export async function GET() {
  try {
    const leetCodeUrl = profileData.socials.leetcode;
    const parts = leetCodeUrl.split('/').filter(Boolean);
    const username = process.env.LEETCODE_USERNAME || (parts.length > 0 ? parts[parts.length - 1] : fallbackLeetCodeStats.username);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(fallbackLeetCodeStats, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;

    if (!matchedUser) {
      return NextResponse.json(fallbackLeetCodeStats, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const acSubmissionNum = matchedUser.submitStats?.acSubmissionNum || [];
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    for (const item of acSubmissionNum) {
      if (item.difficulty === 'All') totalSolved = item.count;
      else if (item.difficulty === 'Easy') easySolved = item.count;
      else if (item.difficulty === 'Medium') mediumSolved = item.count;
      else if (item.difficulty === 'Hard') hardSolved = item.count;
    }

    const ranking = matchedUser.profile?.ranking ?? fallbackLeetCodeStats.ranking;
    const contestRating = Math.round(json?.data?.userContestRanking?.rating || fallbackLeetCodeStats.contestRating || 0);

    const stats: LeetCodeStatsData = {
      username,
      totalSolved: totalSolved || fallbackLeetCodeStats.totalSolved,
      easySolved: easySolved || fallbackLeetCodeStats.easySolved,
      mediumSolved: mediumSolved || fallbackLeetCodeStats.mediumSolved,
      hardSolved: hardSolved || fallbackLeetCodeStats.hardSolved,
      totalQuestions: fallbackLeetCodeStats.totalQuestions,
      ranking: ranking || fallbackLeetCodeStats.ranking,
      contestRating: contestRating || fallbackLeetCodeStats.contestRating,
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(fallbackLeetCodeStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
}
