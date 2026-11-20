import { Achievement } from '@/types';

export const achievementsData: Achievement[] = [
  {
    id: 'academic-sem1',
    title: 'Top Academic Honor: 9.45 CGPA (First Semester)',
    organization: "ITER, Siksha 'O' Anusandhan University",
    date: 'Jan 2025',
    type: 'Academic',
    description:
      'Secured a 9.45 CGPA across all theoretical and laboratory examinations in the first semester of B.Tech CSE, ranking in the top cohort.',
    badgeText: '9.45 CGPA',
    isPlaceholder: false,
  },
  {
    id: 'ideathon-campus',
    title: 'Campus Ideathon / Hackathon Finalist',
    organization: 'ITER SOA University Tech Fest / Innovation Cell',
    date: 'Late 2024 / Early 2025',
    type: 'Ideathon',
    description:
      'Pitched and prototyped an automated system architecture for secure identity management and real-time campus notifications. Evaluated on technical viability, scalability, and impact.',
    badgeText: 'Finalist / Merit',
    isPlaceholder: true, // Marked as placeholder for Rishi to update details
  },
  {
    id: 'leetcode-consistency',
    title: 'Consistent Algorithmic Problem Solving',
    organization: 'LeetCode & Competitive Coding',
    date: '2024 — Present',
    type: 'Competitive',
    description:
      'Solved 180+ problems across Arrays, Strings, Trees, Linked Lists, Binary Search, and Dynamic Programming with an emphasis on optimal O(1) auxiliary space and O(N) time complexities.',
    badgeText: '180+ Solved',
    isPlaceholder: false,
  },
  {
    id: 'open-source-builds',
    title: 'Systems & Tools Open-Source Contributor',
    organization: 'GitHub Community',
    date: 'Ongoing',
    type: 'Competitive',
    description:
      'Independently engineered and documented open-source systems implementations including an LSM-Tree storage engine (CoreKV) and a zero-trust API rate limiter (SentinelGuard).',
    badgeText: 'Open Source',
    isPlaceholder: false,
  },
];
