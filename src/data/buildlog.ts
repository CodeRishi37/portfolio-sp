import { BuildLogEntry } from '@/types';

export const buildLogData: BuildLogEntry[] = [
  {
    id: 'log-06',
    date: '2025-02-18',
    title: 'Shipped SentinelGuard Redis Lua Rate Limiter',
    tag: 'Shipped',
    summary:
      'Replaced distributed Java locks with atomic Redis Lua scripts to execute token bucket replenishment in a single network round-trip.',
    learnings:
      'Learned that Redis single-threaded execution guarantees atomicity without multi-node lock contention. Running evaluation logic inside Lua shaved ~4ms off high-throughput burst evaluation.',
    relatedProject: 'SentinelGuard',
    link: 'https://github.com/rishi-code/sentinel-guard',
  },
  {
    id: 'log-05',
    date: '2025-02-04',
    title: 'Benchmarked LSM-Tree Compaction vs B-Tree Random I/O',
    tag: 'Architecture',
    summary:
      'Profiled disk write amplification and random vs sequential I/O patterns when developing CoreKV in Java.',
    learnings:
      'Sequential disk appends using FileChannel achieve nearly 90 MB/s on modest SSDs, while random B-Tree in-place overwrites stalled around 14 MB/s due to OS page cache misses and fsync thrashing.',
    relatedProject: 'CoreKV',
    link: 'https://github.com/rishi-code/core-kv-engine',
  },
  {
    id: 'log-04',
    date: '2025-01-22',
    title: 'Completed Semester 1 with 9.45 CGPA at ITER/SOA',
    tag: 'Milestone',
    summary:
      'Wrapped up first semester examinations across foundational engineering and computer science courses with top academic distinction.',
    learnings:
      'Balancing rigorous academic exams with deep independent systems building is all about time-blocking: dedicated morning blocks for DSA and deep evening blocks for backend architectures.',
    relatedProject: 'Academics',
  },
  {
    id: 'log-03',
    date: '2025-01-10',
    title: 'Integrated Cross-Encoder Re-Ranking into NeuralFlow RAG',
    tag: 'Shipped',
    summary:
      'Upgraded from purely dense vector cosine similarity to a two-stage pipeline: fast top-50 vector retrieval + ONNX-quantized cross-encoder scoring.',
    learnings:
      'Cross-encoders jointly calculate attention across both question and candidate passage, which eliminates false positive matches that fool standard cosine distance.',
    relatedProject: 'NeuralFlow-RAG',
    link: 'https://github.com/rishi-code/neuralflow-rag',
  },
  {
    id: 'log-02',
    date: '2024-12-19',
    title: 'Deep Dive: TCP SYN Handshake & Raw Socket Crafting',
    tag: 'Learning',
    summary:
      'Explored IP and TCP header binary layout, sequence numbers, and manually computing pseudo-header checksums for ByteTrace.',
    learnings:
      'Understanding packet flags (SYN, ACK, RST, FIN) at the binary level removed the magic behind network firewalls, port scanners, and NAT traversal.',
    relatedProject: 'ByteTrace',
  },
  {
    id: 'log-01',
    date: '2024-11-28',
    title: '150+ LeetCode Milestone & Graph Algorithm Mastery',
    tag: 'Milestone',
    summary:
      'Completed a focused 45-day sprint on Graph traversals (BFS, DFS), Union-Find, and Topological Sort.',
    learnings:
      'Representing graph problems with adjacency lists rather than matrices saves memory, and using Kahn’s Algorithm for cycle detection simplifies dependency resolution.',
    relatedProject: 'DSA Practice',
  },
];
