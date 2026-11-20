import { EducationData } from '@/types';

export const educationData: EducationData = {
  degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
  institution: "Institute of Technical Education and Research (ITER)",
  university: "Siksha 'O' Anusandhan University (SOA)",
  location: 'Bhubaneswar, Odisha, India',
  duration: '2024 — 2028',
  currentSemester: 'First Year (Completed Year 1, Entering Year 2)',
  cgpa: '9.55 / 10.0',
  highlights: [
    'Achieved 9.55 CGPA in Year 1, placing in the top academic percentile of the CSE cohort.',
    'Focus on deep foundational CS: clean code architecture, asymptotic algorithmic efficiency, and memory structures.',
    'Leader of SOA Ideathon 2026 Team (CodeSicks) designing the LearnTwin cognitive digital twin learning platform.',
  ],
  coursework: [
    {
      category: 'Computer Science Core',
      courses: [
        'Programming in C & Data Structures Foundations',
        'Object-Oriented Programming (Java)',
        'Discrete Mathematical Structures & Graph Theory',
        'Digital Logic & Computer Organization Foundations',
      ],
    },
    {
      category: 'Engineering & Mathematics Foundations',
      courses: [
        'Engineering Mathematics I (Linear Algebra & Calculus)',
        'Engineering Physics & Semiconductor Physics',
        'Problem Solving & Algorithmic Thinking',
      ],
    },
    {
      category: 'Upcoming Semester Focus',
      courses: [
        'Design and Analysis of Algorithms (DAA)',
        'Database Management Systems (DBMS)',
        'Operating Systems & Kernel Concepts',
        'Theory of Computation (TOC)',
      ],
    },
  ],
};
