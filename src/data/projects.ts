import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'sentinel-guard',
    title: 'SentinelGuard: Zero-Trust API Security & Rate-Limiting Gateway',
    slug: 'sentinel-guard',
    tagline: 'High-throughput reverse proxy with distributed token-bucket rate limiting & JWT revocation',
    description:
      'A low-latency API gateway built to enforce zero-trust policies, cryptographically verify signatures, mitigate DDoS bursts via distributed Redis token buckets, and log audit trails.',
    category: 'Cybersecurity',
    featured: true,
    status: 'Completed',
    tags: ['Java 21', 'Spring Boot 3', 'Redis', 'JWT / RS256', 'Docker', 'Rate Limiting'],
    githubUrl: 'https://github.com/rishi-code/sentinel-guard', // TODO: Update with your repo link
    liveDemoUrl: 'https://sentinelguard-demo.vercel.app', // TODO: Optional live demo or demo sandbox
    hasLiveDemo: true,
    architecture: {
      title: 'SentinelGuard Request Flow & Security Perimeter',
      overview:
        'Client requests hit the non-blocking edge gateway where mTLS and CORS are terminated before running through the rate-limiter, JWT cryptographer, and downstream routing.',
      nodes: [
        {
          id: 'client-edge',
          label: 'Client / API Consumer',
          type: 'client',
          tech: 'HTTPS / HTTP2',
          description: 'Web clients, mobile SDKs, and third-party microservices making authenticated API requests.',
          whyChosen: 'Standardized on HTTP/2 multiplexing to reduce handshake overhead on high-frequency mobile connections.',
          tradeOffs: 'Higher memory footprint per connection compared to raw TCP, but essential for zero-trust mTLS context.',
        },
        {
          id: 'gateway-core',
          label: 'Edge Gateway & Filter Chain',
          type: 'gateway',
          tech: 'Java 21 & Spring Cloud Gateway',
          description: 'Non-blocking Netty reactive filter pipeline that parses headers, validates origins, and assigns unique correlation trace IDs.',
          whyChosen: 'Reactive Netty threads achieve 14,000+ RPS on a single dual-core container without thread starvation.',
          tradeOffs: 'Debugging reactive async stack traces is harder than traditional thread-per-request Spring MVC.',
        },
        {
          id: 'auth-validator',
          label: 'Zero-Trust JWT Engine',
          type: 'service',
          tech: 'Nimbus JOSE + Ed25519 Keys',
          description: 'Performs asymmetric public key validation without calling identity provider on every hop, maintaining sub-millisecond overhead.',
          whyChosen: 'Asymmetric Ed25519 signature checks provide high throughput and tamper resistance with minimal CPU penalty.',
          tradeOffs: 'Requires local cached public key rotation logic in case of upstream key compromise.',
        },
        {
          id: 'rate-limiter',
          label: 'Distributed Token Bucket',
          type: 'cache',
          tech: 'Redis 7 & Lua Atomic Scripts',
          description: 'Evaluates tier limits (100 req/min free, 5000 req/min enterprise) atomically using Redis in-memory Lua execution.',
          whyChosen: 'Atomic Lua scripts guarantee zero race conditions between concurrent worker threads without distributed locks.',
          tradeOffs: 'Network hop to Redis introduces ~0.6ms latency; mitigated using Redis connection pooling and local short-lived fallback buckets.',
        },
        {
          id: 'audit-log',
          label: 'Security Audit & Metrics Store',
          type: 'database',
          tech: 'PostgreSQL 16 & TimescaleDB',
          description: 'Asynchronous event consumer storing access logs, IP anomaly bursts, and failed authorization attempts.',
          whyChosen: 'ACID guarantees and time-series partition pruning keep analytical queries on millions of audit records instantaneous.',
          tradeOffs: 'Higher storage requirements than flat files; handled via retention policies and automated archive rotation.',
        },
        {
          id: 'downstream-api',
          label: 'Internal Microservices',
          type: 'service',
          tech: 'Internal Private VPC / Docker Network',
          description: 'Protected business services (Billing, User Management, Data Ingestion) receiving sanitized, validated requests.',
          whyChosen: 'Isolated private subnet prevents bypass of security checks and zero-trust perimeter.',
          tradeOffs: 'Requires service discovery and health checks to avoid routing into degraded instances.',
        },
      ],
      edges: [
        { from: 'client-edge', to: 'gateway-core', protocol: 'HTTPS / mTLS' },
        { from: 'gateway-core', to: 'auth-validator', protocol: 'Internal Reactive Hook' },
        { from: 'gateway-core', to: 'rate-limiter', protocol: 'Redis RESP (Atomic Lua)' },
        { from: 'gateway-core', to: 'downstream-api', protocol: 'HTTP/1.1 Private Proxy' },
        { from: 'gateway-core', to: 'audit-log', protocol: 'Async Batch Worker / JDBC' },
      ],
    },
    caseStudy: {
      problem:
        'Standard monolithic reverse proxies often choke under concurrent brute-force attacks or distributed credential-stuffing. Typical solutions either rely on centralized auth round-trips that introduce 50ms+ latency or use naive memory counters that break across multi-instance clusters.',
      approach:
        'Engineered an event-driven, non-blocking gateway in Java 21 using reactive Spring Cloud Gateway and Netty. Integrated a token-bucket rate limiter implemented in atomic Redis Lua to eliminate race conditions without database locks. Leveraged asymmetric JWT verification (Ed25519) so worker nodes validate identity locally in <0.2ms.',
      tradeOffs: [
        'Redis Lua vs Local Guava Cache: Local in-memory caching is faster (zero network overhead) but creates inconsistent enforcement across cluster nodes. Opted for Redis with a local fail-open buffer to prioritize consistency and prevent cluster bypass.',
        'Asymmetric Ed25519 vs Symmetric HMAC-SHA256: HMAC requires sharing the secret key with every gateway node (high risk if compromised). Asymmetric verification keeps the private key strictly in the Auth server while gateway nodes hold only the public key.',
        'Asynchronous Audit Logging vs Synchronous Block: Opted for bounded in-memory ring buffer (Disruptor pattern) to decouple user request latency from database disk flush.',
      ],
      whatIdImprove: [
        'Implement eBPF / XDP layer at the Linux kernel for packet filtering of known blocked CIDR blocks before hitting the JVM.',
        'Add distributed anomaly detection using moving Z-score frequency analysis to flag credential stuffing automatically.',
        'Support dynamic rate limit adjustment via machine learning baselines during high-traffic flash events.',
      ],
      metricsOrOutcome:
        'Sustained 12,500 requests/sec with p99 latency under 2.8ms in synthetic k6 load benchmarks with zero false-positive token drops.',
    },
  },
  {
    id: 'core-kv',
    title: 'CoreKV: LSM-Tree Key-Value Engine from Scratch',
    slug: 'core-kv',
    tagline: 'Log-Structured Merge-Tree storage engine with write-ahead log, Bloom filters, and SSTable compaction',
    description:
      'A persistent embedded key-value storage engine engineered in Java. Built from first principles to study database internals, disk I/O optimization, byte serialization, and crash recovery.',
    category: 'Backend & Systems',
    featured: true,
    status: 'Completed',
    tags: ['Java', 'DBMS Internals', 'LSM-Tree', 'Bloom Filters', 'FileChannel', 'Concurrency'],
    githubUrl: 'https://github.com/rishi-code/core-kv-engine', // TODO: Update with your repo link
    hasLiveDemo: false,
    architecture: {
      title: 'CoreKV LSM-Tree Read/Write Lifecycle',
      overview:
        'Writes are appended sequentially to a Write-Ahead Log (WAL) and inserted into an in-memory concurrent SkipList. When full, MemTables flush to immutable on-disk SSTables with Bloom filters and sparse indexes.',
      nodes: [
        {
          id: 'kv-client',
          label: 'Application Client',
          type: 'client',
          tech: 'Java API / TCP Protocol',
          description: 'Client issuing GET, PUT, and DELETE operations with arbitrary byte array keys and values.',
          whyChosen: 'Direct in-process Java API with zero network serialization overhead for benchmark fidelity.',
          tradeOffs: 'Embedded library model rather than standalone network daemon, simplifying memory tuning.',
        },
        {
          id: 'wal-log',
          label: 'Write-Ahead Log (WAL)',
          type: 'database',
          tech: 'Append-Only Disk FileChannel',
          description: 'Sequential log ensuring durability (WAL) before updating volatile memory structures.',
          whyChosen: 'Sequential disk writes maximize disk IOPS and provide crash recovery guarantees.',
          tradeOffs: 'Periodic fsync calls can bottleneck write throughput; tuned with group commit batching.',
        },
        {
          id: 'memtable',
          label: 'Active MemTable',
          type: 'cache',
          tech: 'ConcurrentSkipListMap',
          description: 'Lock-free, ordered in-memory store that provides O(log N) point queries and range scan capability.',
          whyChosen: 'SkipLists support high concurrent write throughput without global read-write locks.',
          tradeOffs: 'Higher pointer overhead per entry compared to dense arrays, balanced by 64MB flush threshold.',
        },
        {
          id: 'bloom-filter',
          label: 'Probabilistic Bloom Filter',
          type: 'service',
          tech: 'Custom Murmur3 64-bit BitSet',
          description: 'Fast negative-membership test that eliminates ~98% of unnecessary disk seeks for non-existent keys.',
          whyChosen: 'Keeps read latency low when dozens of SSTable files accumulate across tiers.',
          tradeOffs: 'Small memory overhead (~10 bits per key) and a configured 1% false positive probability.',
        },
        {
          id: 'sstable-storage',
          label: 'SSTables (Sorted String Tables)',
          type: 'database',
          tech: 'Immutable Binary Blocks + Sparse Index',
          description: 'On-disk sorted chunks organized in tiered levels (L0 to L2) with two-level binary sparse index.',
          whyChosen: 'Immutability eliminates complex on-disk locking and enables efficient background compaction.',
          tradeOffs: 'Reads must check multiple SSTable levels if the key is not in active MemTable (read amplification).',
        },
        {
          id: 'compactor',
          label: 'Background Compaction Worker',
          type: 'worker',
          tech: 'Multi-way Merge Sort Thread',
          description: 'Merges overlapping SSTables, removes tombstoned keys, and pushes data down from Level 0 to Level 1.',
          whyChosen: 'Controls disk space explosion and bounds read amplification over long-running write workloads.',
          tradeOffs: 'Compaction creates background write amplification and transient disk I/O spikes.',
        },
      ],
      edges: [
        { from: 'kv-client', to: 'wal-log', protocol: 'Sequential FileChannel Write' },
        { from: 'kv-client', to: 'memtable', protocol: 'Concurrent Memory Insert' },
        { from: 'memtable', to: 'sstable-storage', protocol: 'Async Flush on Threshold' },
        { from: 'kv-client', to: 'bloom-filter', protocol: 'In-Memory BitSet Probe' },
        { from: 'bloom-filter', to: 'sstable-storage', protocol: 'Sparse Index Binary Search' },
        { from: 'sstable-storage', to: 'compactor', protocol: 'Background Tiered Compaction' },
      ],
    },
    caseStudy: {
      problem:
        'Standard B-Tree storage engines suffer from random disk writes during heavy insert workloads, leading to severe disk head thrashing and page fragmentation. The goal was to understand how modern distributed databases (Cassandra, RocksDB, BigTable) achieve high write throughput via Log-Structured Merge-Trees.',
      approach:
        'Built an end-to-end LSM storage engine in Java 21 from scratch. Incoming writes are synchronously committed to an append-only WAL before insertion into a ConcurrentSkipList MemTable. Once a 64MB memory threshold is hit, the table becomes immutable and an asynchronous thread flushes it to disk as a sorted SSTable with embedded Murmur3 Bloom filters and sparse index offsets.',
      tradeOffs: [
        'LSM-Tree vs B+ Tree: Chose LSM for 5x faster write throughput at the cost of higher read amplification and periodic compaction overhead.',
        'Size-Tiered vs Leveled Compaction: Implemented size-tiered compaction for simplicity and minimal write amplification on L0, accepting slightly higher temporary disk footprint.',
        'Memory Mapped Files (mmap) vs FileChannel: Used standard FileChannel with explicit buffer management to avoid JVM crash risks associated with unmapping DirectByteBuffers in older Java runtimes.',
      ],
      whatIdImprove: [
        'Implement Leveled Compaction (RocksDB style) to bound total disk overhead to within 10% of live data.',
        'Add block compression (Snappy or ZSTD) to reduce disk footprint by ~40-60%.',
        'Add range-scan iterators with min-heap multi-cursor priority queue across all active SSTables and MemTables.',
      ],
      metricsOrOutcome:
        'Achieved 82,000 sequential writes/second and sub-0.8ms point-read latency on SSD storage with a 1.2% Bloom filter false positive rate.',
    },
  },
  {
    id: 'neural-flow-rag',
    title: 'NeuralFlow: Hybrid RAG Pipeline with Hallucination Guardrails',
    slug: 'neural-flow-rag',
    tagline: 'Enterprise knowledge retrieval with BM25 + dense embedding re-ranking and citation verification',
    description:
      'A production-style Retrieval-Augmented Generation (RAG) system combining vector similarity search with BM25 keyword matching, cross-encoder re-ranking, and cryptographic source citation checks.',
    category: 'AI & Data',
    featured: true,
    status: 'Completed',
    tags: ['Python 3.11', 'FastAPI', 'PostgreSQL / pgvector', 'Sentence-Transformers', 'LangChain', 'Docker'],
    githubUrl: 'https://github.com/rishi-code/neuralflow-rag', // TODO: Update with your repo link
    liveDemoUrl: 'https://neuralflow-demo.vercel.app', // TODO: Optional live demo
    hasLiveDemo: true,
    architecture: {
      title: 'NeuralFlow Hybrid Retrieval & Validation Architecture',
      overview:
        'User prompts pass through query expansion, parallel sparse (BM25) and dense (pgvector) retrieval, cross-encoder re-ranking, and strict factual attribution evaluation.',
      nodes: [
        {
          id: 'query-interface',
          label: 'Client / Search UI',
          type: 'client',
          tech: 'Next.js & SSE Streaming',
          description: 'Frontend sending natural language queries and streaming verified token responses with highlighted citations.',
          whyChosen: 'Server-Sent Events (SSE) provide low-latency token streaming with minimal client complexity compared to WebSockets.',
          tradeOffs: 'Unidirectional streaming only; query re-prompting requires new HTTP requests.',
        },
        {
          id: 'orchestrator-api',
          label: 'FastAPI Query Orchestrator',
          type: 'gateway',
          tech: 'Python 3.11 & AsyncIO',
          description: 'Handles query rewriting, deduplication, semantic routing, and coordinates retrieval pipelines.',
          whyChosen: 'AsyncIO concurrency allows overlapping vector search, keyword search, and LLM streaming without blocking.',
          tradeOffs: 'Python GIL requires process-based scaling (Gunicorn workers) for heavy CPU embeddings.',
        },
        {
          id: 'vector-db',
          label: 'Dense Vector Store',
          type: 'database',
          tech: 'PostgreSQL + pgvector (HNSW Index)',
          description: 'Stores chunk embeddings (all-MiniLM-L6-v2, 384 dims) using Hierarchical Navigable Small World graphs.',
          whyChosen: 'Running pgvector inside relational Postgres preserves transactional ACID joins with metadata and access control lists.',
          tradeOffs: 'HNSW index construction requires dedicated RAM; higher memory footprint than raw inverted files.',
        },
        {
          id: 'lexical-search',
          label: 'Sparse Lexical Index',
          type: 'database',
          tech: 'PostgreSQL Full-Text Search (BM25)',
          description: 'Captures exact part numbers, acronyms, and alphanumeric codes that pure semantic vector embeddings often miss.',
          whyChosen: 'Guarantees 100% recall on technical identifiers and exact keyword strings without external Lucene clusters.',
          tradeOffs: 'Lacks semantic understanding of synonyms; addressed by hybrid fusion with dense vectors.',
        },
        {
          id: 'reranker-service',
          label: 'Cross-Encoder Re-Ranker',
          type: 'service',
          tech: 'BGE-Reranker-Base & ONNX Runtime',
          description: 'Scores top-50 combined candidates using joint query-passage cross-attention to produce top-5 high-relevance chunks.',
          whyChosen: 'Cross-encoders dramatically boost MRR@5 (Mean Reciprocal Rank) by ~24% compared to bi-encoder cosine similarity.',
          tradeOffs: 'Higher computational cost per candidate (~15ms for 50 chunks), optimized via ONNX Runtime quantization.',
        },
        {
          id: 'guardrail-verifier',
          label: 'Hallucination & Citation Checker',
          type: 'service',
          tech: 'Rule-Based NLI Entailment Model',
          description: 'Validates that every claim generated by the LLM maps to a grounded span in the retrieved document context.',
          whyChosen: 'Stops hallucinations and ungrounded fabrications before responses reach the user interface.',
          tradeOffs: 'Adds ~120ms to final response output; bypassed on low-risk conversational queries.',
        },
      ],
      edges: [
        { from: 'query-interface', to: 'orchestrator-api', protocol: 'HTTPS / SSE Streaming' },
        { from: 'orchestrator-api', to: 'vector-db', protocol: 'pgvector SQL (HNSW Cosine)' },
        { from: 'orchestrator-api', to: 'lexical-search', protocol: 'PostgreSQL tsvector / GIN' },
        { from: 'orchestrator-api', to: 'reranker-service', protocol: 'In-Process ONNX Inference' },
        { from: 'reranker-service', to: 'guardrail-verifier', protocol: 'Context Extraction Pipeline' },
        { from: 'guardrail-verifier', to: 'query-interface', protocol: 'Validated Markdown Stream' },
      ],
    },
    caseStudy: {
      problem:
        'Standard RAG applications relying solely on naive vector embeddings fail on technical documentation containing specific version numbers, acronyms, or error codes. Furthermore, LLMs frequently extrapolate and hallucinate answers not present in the retrieved passages, making them risky for enterprise knowledge.',
      approach:
        'Architected a hybrid retrieval pipeline combining PostgreSQL pgvector (HNSW) for dense semantic recall with PostgreSQL full-text search for exact sparse matching, fused via Reciprocal Rank Fusion (RRF). Added an ONNX-quantized cross-encoder re-ranker and a factual citation validation step that scores Natural Language Inference (NLI) entailment.',
      tradeOffs: [
        'Single Postgres DB vs Pinecone/Milvus: Using pgvector allowed unified relational metadata filtering, transaction safety, and reduced operational complexity for the project stage.',
        'Hybrid RRF vs Vector-Only: Hybrid fusion increased p95 retrieval latency by ~14ms but reduced keyword omission errors by 41% on technical queries.',
        'Cross-Encoder vs Bi-Encoder: Bi-encoders are fast (independent embeddings) but miss subtle cross-token nuances. Re-ranking top-30 candidates with a cross-encoder provided the optimal speed-accuracy sweet spot.',
      ],
      whatIdImprove: [
        'Implement dynamic chunking based on semantic sentence boundaries rather than fixed token sliding windows.',
        'Add GraphRAG entity knowledge graph extraction to answer multi-hop synthesis queries.',
        'Deploy vLLM self-hosted inference on GPU instances for predictable throughput and zero external API dependencies.',
      ],
      metricsOrOutcome:
        'Boosted retrieval Hit Rate@5 from 68% to 91% on benchmark technical Q&A datasets while maintaining end-to-end response latency under 650ms.',
    },
  },
  {
    id: 'cyber-tracer',
    title: 'ByteTrace: Network Packet Analyzer & Port Scanner',
    slug: 'cyber-tracer',
    tagline: 'Multithreaded SYN/ACK port scanner, banner grabber, and raw packet inspector with vulnerability matching',
    description:
      'A systems-level network reconnaissance and security utility built in Python and C to inspect TCP/UDP packets, analyze handshake states, detect open ports via raw sockets, and match service banners against CVE vulnerability databases.',
    category: 'Cybersecurity',
    featured: false,
    status: 'Completed',
    tags: ['Python', 'Raw Sockets', 'TCP/IP Stack', 'Multithreading', 'Network Security', 'CVE DB'],
    githubUrl: 'https://github.com/rishi-code/bytetrace-scanner', // TODO: Update with your repo link
    hasLiveDemo: false,
    architecture: {
      title: 'ByteTrace Packet Capture & Banner Analysis Architecture',
      overview:
        'Sends crafted TCP SYN packets using raw sockets, listens asynchronously for SYN-ACK replies, grabs service banners, and queries local CVE hashes for known security flaws.',
      nodes: [
        {
          id: 'cli-controller',
          label: 'CLI Target & Scope Controller',
          type: 'client',
          tech: 'Python Argparse & Rich Terminal UI',
          description: 'Takes CIDR ranges, port lists, thread limits, and timeout thresholds with interactive terminal progress bars.',
          whyChosen: 'Clean CLI interface with zero heavy GUI dependencies, ideal for headless Linux servers.',
          tradeOffs: 'Terminal only; web visualizer planned for future releases.',
        },
        {
          id: 'raw-socket-engine',
          label: 'Raw Socket SYN Crafting Engine',
          type: 'service',
          tech: 'Python socket & struct / Scapy',
          description: 'Constructs custom IP/TCP headers with random sequence numbers and SYN flags to perform stealthy half-open scans.',
          whyChosen: 'SYN stealth scans avoid establishing full TCP connections, saving network bandwidth and target log spam.',
          tradeOffs: 'Requires elevated root/administrator privileges to bind raw network sockets.',
        },
        {
          id: 'thread-pool',
          label: 'Concurrent Worker Pool',
          type: 'worker',
          tech: 'ThreadPoolExecutor & Semaphore Queues',
          description: 'Distributes thousands of port probes concurrently with adaptive rate limiting to avoid triggering local network firewalls.',
          whyChosen: 'Bounds memory usage while maximizing socket descriptor utilization on multicore processors.',
          tradeOffs: 'High thread counts can overwhelm consumer WiFi routers if burst rates are unthrottled.',
        },
        {
          id: 'banner-grabber',
          label: 'Service Banner & Protocol Fingerprinter',
          type: 'service',
          tech: 'Regex Heuristics & Protocol Probes',
          description: 'Sends minimal HTTP, SSH, FTP, and SMTP probes to open ports to extract service daemon names and versions.',
          whyChosen: 'Accurately identifies vulnerable running daemons beyond default port assumptions (e.g. SSH on port 2222).',
          tradeOffs: 'Full handshake required for banner grabbing, leaving log entries on target servers.',
        },
        {
          id: 'cve-database',
          label: 'Local CVE Matcher Cache',
          type: 'database',
          tech: 'SQLite 3 with Inverted Search Index',
          description: 'Offline database of Common Vulnerabilities and Exposures (CVEs) mapped against Common Platform Enumeration (CPE) strings.',
          whyChosen: 'Zero external network lookups during scans; guarantees instant offline CVE vulnerability warnings.',
          tradeOffs: 'Requires periodic manual database updates to maintain current vulnerability definitions.',
        },
      ],
      edges: [
        { from: 'cli-controller', to: 'thread-pool', protocol: 'Queue Task Dispatch' },
        { from: 'thread-pool', to: 'raw-socket-engine', protocol: 'Raw Socket TX' },
        { from: 'raw-socket-engine', to: 'banner-grabber', protocol: 'On SYN-ACK Trigger' },
        { from: 'banner-grabber', to: 'cve-database', protocol: 'SQLite Query Match' },
        { from: 'cve-database', to: 'cli-controller', protocol: 'Structured JSON / Rich Output' },
      ],
    },
    caseStudy: {
      problem:
        'Understanding how network attacks unfold requires mastering the underlying TCP/IP handshake and operating system socket layer. Off-the-shelf tools like Nmap are powerful, but building a scanner from scratch demystifies raw packet headers, fragmentation, checksum calculations, and protocol state machines.',
      approach:
        'Engineered a multi-threaded network scanner implementing raw TCP SYN packets with manually computed pseudo-header checksums. Added an asynchronous response sniffer, service banner fingerprinter, and an embedded SQLite CVE vulnerability correlation engine.',
      tradeOffs: [
        'Raw Sockets vs High-Level Sockets: High-level `connect()` is portable across unprivileged OS users, but completes the 3-way handshake and is 10x slower. Raw sockets allow stealth SYN scans and precise timing control at the cost of requiring root privileges.',
        'Multithreading vs AsyncIO: Used multithreading with a bounded semaphore queue to maintain simplicity when interacting with blocking OS socket calls and raw packet captures.',
        'Offline SQLite CVE DB vs Cloud API: Offline database guarantees zero telemetry leakage and high search speed during scanning.',
      ],
      whatIdImprove: [
        'Port the core raw packet crafting and capture engine to C or Rust with libpcap for 10x packet transmission rates.',
        'Add OS fingerprinting via TCP window size, initial TTL, and TCP options order analysis.',
        'Build an export pipeline for standard SARIF and PDF security audit reports.',
      ],
      metricsOrOutcome:
        'Scans a full 1,000 standard ports on a local subnet in under 2.4 seconds with a 99.4% banner detection accuracy compared against Nmap baseline.',
    },
  },
];
