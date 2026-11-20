import { SkillCategory } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    name: 'Programming Languages',
    description: 'Core languages used for systems programming, backend architectures, algorithms, and data modeling.',
    iconName: 'Code2',
    skills: [
      {
        name: 'Java (Java 17/21)',
        level: 'Core',
        description: 'Object-oriented programming, concurrency, multithreading, collections framework, JVM memory model.',
        projectsUsedIn: ['SentinelGuard', 'CoreKV'],
      },
      {
        name: 'Python (3.10+)',
        level: 'Core',
        description: 'FastAPI, AsyncIO, socket programming, data pipelines, script automation, sentence-transformers.',
        projectsUsedIn: ['NeuralFlow-RAG', 'ByteTrace'],
      },
      {
        name: 'C / C++',
        level: 'Proficient',
        description: 'Low-level memory management, pointers, system calls, data structures implementation from scratch.',
        projectsUsedIn: ['DSA Implementations', 'Systems Lab'],
      },
      {
        name: 'SQL',
        level: 'Core',
        description: 'Complex joins, indexing strategies (B-Tree, HNSW, GIN), window functions, query execution plan analysis.',
        projectsUsedIn: ['CoreKV', 'NeuralFlow-RAG', 'Academic DBMS'],
      },
      {
        name: 'TypeScript / JavaScript',
        level: 'Proficient',
        description: 'Next.js App Router, modern ES6+, async/await patterns, typed component architectures.',
        projectsUsedIn: ['Portfolio', 'Dashboard UIs'],
      },
      {
        name: 'Bash / Shell',
        level: 'Proficient',
        description: 'Linux process automation, cron jobs, network diagnostics, stream redirection, deployment scripts.',
        projectsUsedIn: ['Docker Deployments', 'CI/CD workflows'],
      },
    ],
  },
  {
    name: 'Backend & Systems Architecture',
    description: 'Building resilient, low-latency web services, API gateways, and distributed components.',
    iconName: 'Server',
    skills: [
      {
        name: 'Spring Boot 3',
        level: 'Core',
        description: 'Spring Security, Spring Data JPA, reactive Netty gateways, dependency injection, RESTful controllers.',
        projectsUsedIn: ['SentinelGuard'],
      },
      {
        name: 'FastAPI',
        level: 'Core',
        description: 'Asynchronous REST APIs, Pydantic data schemas, dependency injection, OpenAPI documentation.',
        projectsUsedIn: ['NeuralFlow-RAG'],
      },
      {
        name: 'RESTful API Design & Zero-Trust Auth',
        level: 'Core',
        description: 'Idempotency keys, JWT (RS256/Ed25519) verification, rate-limiting algorithms (token bucket, sliding window).',
        projectsUsedIn: ['SentinelGuard', 'NeuralFlow-RAG'],
      },
      {
        name: 'Concurrency & Threading',
        level: 'Proficient',
        description: 'Thread pools, race-condition prevention, atomics, lock-free data structures, synchronization primitives.',
        projectsUsedIn: ['CoreKV', 'ByteTrace'],
      },
      {
        name: 'Node.js / Express',
        level: 'Proficient',
        description: 'Event-driven I/O, middleware pipelines, microservice communication, lightweight REST endpoints.',
        projectsUsedIn: ['Full Stack Prototypes'],
      },
    ],
  },
  {
    name: 'Databases & Storage Internals',
    description: 'Relational databases, in-memory caches, vector search indexes, and custom storage engines.',
    iconName: 'Database',
    skills: [
      {
        name: 'PostgreSQL & pgvector',
        level: 'Core',
        description: 'Relational normalization, ACID transactions, HNSW index tuning, full-text search (tsvector).',
        projectsUsedIn: ['NeuralFlow-RAG', 'SentinelGuard'],
      },
      {
        name: 'Redis',
        level: 'Core',
        description: 'In-memory caching, atomic Lua scripting, Pub/Sub channels, distributed token buckets.',
        projectsUsedIn: ['SentinelGuard'],
      },
      {
        name: 'MySQL',
        level: 'Proficient',
        description: 'Relational schema design, foreign key constraints, InnoDB storage engine basics, query optimization.',
        projectsUsedIn: ['Academic DBMS Lab'],
      },
      {
        name: 'LSM-Tree Internals & Disk I/O',
        level: 'Proficient',
        description: 'Append-Only WAL, MemTable skip lists, SSTables, Bloom filter probings, compaction strategies.',
        projectsUsedIn: ['CoreKV'],
      },
      {
        name: 'SQLite',
        level: 'Proficient',
        description: 'Zero-configuration embedded database, lightweight indexing, offline vulnerability caching.',
        projectsUsedIn: ['ByteTrace'],
      },
    ],
  },
  {
    name: 'Tools & DevOps',
    description: 'Developer tooling, containerization, version control, and production deployment environments.',
    iconName: 'Wrench',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Core',
        description: 'Branching models, atomic commits, interactive rebasing, merge conflict resolution, pull request workflows.',
        projectsUsedIn: ['All Projects'],
      },
      {
        name: 'Docker & Containers',
        level: 'Core',
        description: 'Multi-stage Dockerfiles, Docker Compose multi-service networks, volume persistence, container hardening.',
        projectsUsedIn: ['SentinelGuard', 'NeuralFlow-RAG'],
      },
      {
        name: 'Linux & POSIX Systems',
        level: 'Core',
        description: 'File descriptors, system calls, permissions, process monitoring (htop, ps, strace), networking (netstat, curl).',
        projectsUsedIn: ['ByteTrace', 'CoreKV'],
      },
      {
        name: 'Vercel & Cloud Deployments',
        level: 'Proficient',
        description: 'Serverless functions, Edge routing, continuous deployment pipelines, environment variable management.',
        projectsUsedIn: ['Portfolio', 'Live Demos'],
      },
      {
        name: 'Postman & API Testing',
        level: 'Core',
        description: 'Automated test assertions, environment variables, collection runners, load-test mock servers.',
        projectsUsedIn: ['SentinelGuard', 'FastAPI APIs'],
      },
    ],
  },
  {
    name: 'Currently Learning & Deep Dives',
    description: 'Active areas of study, systems exploration, and upcoming architectural mastery.',
    iconName: 'GraduationCap',
    skills: [
      {
        name: 'Distributed Systems & Consensus (Raft/Paxos)',
        level: 'Exploring',
        description: 'Studying leader election, log replication, split-brain mitigation, and Byzantine fault tolerance.',
        projectsUsedIn: ['Future CoreKV-Cluster'],
      },
      {
        name: 'AI Agent Architecture & Multi-Agent Swarms',
        level: 'Exploring',
        description: 'Tool use, state machines, autonomous evaluation loops, latency-conscious prompt engineering.',
        projectsUsedIn: ['Agentic Experiments'],
      },
      {
        name: 'Offensive Security & Network Protocol Fuzzing',
        level: 'Exploring',
        description: 'Packet manipulation, memory-safety vulnerabilities, buffer overflows, Wireshark packet dissection.',
        projectsUsedIn: ['Cybersecurity Research'],
      },
      {
        name: 'Advanced LeetCode & Algorithmic Problem Solving',
        level: 'Exploring',
        description: 'Dynamic programming, graph algorithms (Dijkstra, Tarjan, MST), segment trees, bit manipulation.',
        projectsUsedIn: ['Daily LeetCode Practice'],
      },
    ],
  },
];
