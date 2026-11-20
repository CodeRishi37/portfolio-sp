import { ProfileData } from '@/types';

export const profileData: ProfileData = {
  name: 'Saptarshi Patra',
  shortName: 'Rishi',
  tagline: 'First-Year CS Undergrad Engineering Resilient Systems & AI Pipelines',
  roles: ['Software Engineering', 'AI Engineering', 'Cybersecurity Researcher'],
  bio: "First-year B.Tech CSE student at ITER, Siksha 'O' Anusandhan University (SOA), Bhubaneswar with a 9.45 CGPA in semester 1. I focus on core computer science foundations — Data Structures, Algorithms, low-overhead backend systems, and database internals. Rather than superficial demos, I learn by building production-grade services from scratch, analyzing architectural bottlenecks, and testing system trade-offs.",
  location: 'Bhubaneswar, Odisha, India',
  university: "Siksha 'O' Anusandhan University (SOA)",
  college: "Institute of Technical Education and Research (ITER)",
  cgpa: '9.45 (Sem 1)',
  status: 'Open to Software & AI Engineering Internships (2025/2026)',
  socials: {
    github: 'https://github.com/rishi-code', // TODO: Replace with your exact GitHub username
    linkedin: 'https://linkedin.com/in/saptarshi-patra', // TODO: Replace with your exact LinkedIn profile
    email: 'rishi.patra.dev@gmail.com', // TODO: Replace with your preferred contact email
    leetcode: 'https://leetcode.com/u/rishi_patra', // TODO: Replace with your exact LeetCode handle
    twitter: 'https://x.com/rishi_builds', // TODO: Optional X / Twitter handle
  },
  statsSummary: {
    cgpa: '9.45',
    semestersCompleted: 1,
    primaryLanguages: ['Java', 'Python', 'SQL', 'C/C++'],
    leetCodeSolvedSnapshot: 180, // Fallback snapshot
  },
};
