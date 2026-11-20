export interface ProfileData {
  name: string;
  shortName: string;
  tagline: string;
  roles: string[];
  bio: string;
  location: string;
  university: string;
  college: string;
  cgpa: string;
  status: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    leetcode: string;
    twitter?: string;
  };
  statsSummary: {
    cgpa: string;
    semestersCompleted: number;
    primaryLanguages: string[];
    leetCodeSolvedSnapshot: number;
  };
}

export type ArchitectureNodeType = 'client' | 'gateway' | 'service' | 'database' | 'cache' | 'external' | 'worker';

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  tech: string;
  description: string;
  whyChosen: string;
  tradeOffs: string;
  x?: number; // relative grid column or percentage for visual diagram
  y?: number; // relative grid row or percentage
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  protocol: string; // e.g. "HTTPS / REST", "gRPC", "TCP / JDBC", "PubSub"
  description?: string;
}

export interface ArchitectureDiagramData {
  title: string;
  overview: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  tradeOffs: string[];
  whatIdImprove: string[];
  metricsOrOutcome?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Backend & Systems' | 'AI & Data' | 'Cybersecurity' | 'Full Stack';
  featured: boolean;
  status: 'Completed' | 'In Active Development' | 'Prototype';
  tags: string[];
  githubUrl: string;
  liveDemoUrl?: string; // Optional: embedded live demo
  hasLiveDemo: boolean;
  architecture: ArchitectureDiagramData;
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  name: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Core' | 'Proficient' | 'Exploring';
    description?: string;
    projectsUsedIn?: string[];
  }[];
}

export interface EducationData {
  degree: string;
  institution: string;
  university: string;
  location: string;
  duration: string;
  cgpa: string;
  currentSemester: string;
  highlights: string[];
  coursework: {
    category: string;
    courses: string[];
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'Ideathon' | 'Academic' | 'Competitive' | 'Certification';
  description: string;
  badgeText?: string;
  proofUrl?: string;
  isPlaceholder?: boolean;
}

export interface BuildLogEntry {
  id: string;
  date: string;
  title: string;
  tag: 'Shipped' | 'Learning' | 'Architecture' | 'Milestone';
  summary: string;
  learnings: string;
  relatedProject?: string;
  link?: string;
}

export interface GitHubStatsData {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  recentCommits: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  lastUpdated: string;
  isFallback: boolean;
}

export interface LeetCodeStatsData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  ranking?: number;
  contestRating?: number;
  lastUpdated: string;
  isFallback: boolean;
}
