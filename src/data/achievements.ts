import { Achievement } from '@/types';

export const achievementsData: Achievement[] = [
  {
    id: 'academic-year1',
    title: 'Top Academic Distinction: 9.55 CGPA (Year 1)',
    organization: "ITER, Siksha 'O' Anusandhan University",
    date: '2025',
    type: 'Academic',
    description:
      'Secured a 9.55 CGPA across theoretical and laboratory examinations in the first year of B.Tech CSE, ranking in the top cohort of the university.',
    badgeText: '9.55 CGPA',
    isPlaceholder: false,
  },
  {
    id: 'ideathon-soa-2026',
    title: 'Team Leader — SOA Ideathon 2026 (Team CodeSicks)',
    organization: "Siksha 'O' Anusandhan University Ideathon",
    date: '2026',
    type: 'Ideathon',
    description:
      'Led Team CodeSicks in conceptualizing and architecting LearnTwin: a cognitive digital twin adaptive learning platform personalizing study paths. Designed multi-stack UI documentation (Vue/Nuxt and React/Next.js) and produced the competition pitch deck.',
    badgeText: 'SOA Ideathon 2026',
    isPlaceholder: false,
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
