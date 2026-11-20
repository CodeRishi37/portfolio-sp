import { EducationData } from '@/types';

export const educationData: EducationData = {
  degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
  institution: "Institute of Technical Education and Research (ITER)",
  university: "Siksha 'O' Anusandhan University (SOA)",
  location: 'Bhubaneswar, Odisha, India',
  duration: '2024 — 2028',
  currentSemester: 'First Year (Entering Semester 2)',
  cgpa: '9.45 / 10.0',
  highlights: [
    'Achieved 9.45 CGPA in Semester 1, placing in the top academic percentile of the CSE cohort.',
    'Focus on deep foundational CS: clean code architecture, asymptotic algorithmic efficiency, and memory structures.',
    'Active participant in coding competitions, ideathons, and peer technical study groups on campus.',
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
