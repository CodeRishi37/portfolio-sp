# Saptarshi Patra (Rishi) — Systems & Developer Portfolio

A fast, engineered, dark-aesthetic personal developer portfolio designed to showcase **HOW you think and build**, not just screenshots. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Lucide React. Zero-config deployment on Vercel.

---

## ⚡ Quickstart (Run Locally)

Run the project with a single command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build locally:

```bash
npm run build
npm start
```

---

## 🏗 Architecture & Key Features

### Tier 1: Core Systems Engineering
- **Interactive Architecture Diagrams**: Each project case study features an interactive system graph (Client, API Ingress, Core Logic, Storage, Cache, and Workers). Clicking any node displays:
  - Technical component role & responsibility
  - Why the specific technology was selected
  - Concrete trade-offs considered (Latency vs Consistency, Memory vs Disk IOPS, Asymmetric vs Symmetric cryptography)
  - Detailed case study write-up: Problem, Approach, Trade-Offs, and "What I'd Improve"
  - *All diagrams are generated from typed data files (`src/data/projects.ts`)*.
- **Scroll-Driven Storytelling**:
  - Non-intrusive reading progress bar pinned to the top of the viewport
  - Pinned storytelling sequence in the Hero section
  - CSS/Intersection-based reveals using `transform` and `opacity` only (no scroll-jacking)
  - Full respect for `prefers-reduced-motion`

### Tier 2: Data-Driven Telemetry
- **Build Log Timeline**:
  - Chronological engineering journal (newest first)
  - Filterable by tags: `Shipped`, `Architecture`, `Milestone`, `Learning`
  - Records concrete technical lessons and commit/PR links
- **Live Stats Engine (GitHub + LeetCode)**:
  - Serverless route handlers (`/api/stats/github` and `/api/stats/leetcode`) with Edge caching (`s-maxage=3600`)
  - **Zero-Failure Architecture**: Automatic fallback to static snapshots if network fails, APIs are blocked, or rate limits are reached. The widgets never show broken UI.
  - Zero client-side secrets.

### Tier 3: Live Sandboxed Demos
- **Embedded Demos**:
  - Project cards feature a live demo viewer (`sandbox="allow-scripts allow-same-origin allow-forms"`)
  - Lazy-loaded **only on user interaction** (zero upfront bundle or performance penalty)
  - Graceful fallback for external sites blocking iframe embedding via `X-Frame-Options`

---

## 📂 Data File Structure (Edit Without Touching Components)

All portfolio data lives in `src/data/`. You can edit your content safely in TypeScript with full autocompletion:

| File | What It Controls |
| :--- | :--- |
| `src/data/profile.ts` | Your name, tagline, bio, university, CGPA, email, and social profile links |
| `src/data/projects.ts` | Project cards, interactive architecture diagrams (nodes, edges, protocols), case studies, trade-offs, and demo URLs |
| `src/data/skills.ts` | Grouped skills (Languages, Backend, Databases, Tools, Currently Learning), proficiency levels (`Core`, `Proficient`, `Exploring`), and projects applied |
| `src/data/education.ts` | ITER / SOA details, 9.45 CGPA showcase, semester coursework, and engineering philosophy |
| `src/data/achievements.ts` | Ideathon and hackathon recognitions, competitive milestones, and honors |
| `src/data/buildlog.ts` | Dated engineering entries with summaries, key learnings, and commit links |
| `src/data/stats.ts` | Fallback snapshots for GitHub and LeetCode stats when APIs are unavailable |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory (optional for local development, recommended for high-volume GitHub API calls):

```bash
# Optional: Authenticated GitHub token to avoid 60 requests/hr unauthenticated rate limit
GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere

# Optional: Override GitHub username (default extracted from src/data/profile.ts)
GITHUB_USERNAME=your-github-username

# Optional: Override LeetCode username (default extracted from src/data/profile.ts)
LEETCODE_USERNAME=your-leetcode-username
```

---

## 🚀 Deploying to Vercel (Zero Config)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial developer portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Next.js 16 will be automatically detected with **zero build configuration needed**.
4. (Optional) In the Vercel project settings under **Environment Variables**, add `GITHUB_TOKEN` to unlock 5,000 requests/hour for your live GitHub stats.
5. Click **Deploy**. Your portfolio will be live at `https://<your-project>.vercel.app`.

---

## 📝 TODO Placeholders to Replace

Every placeholder in this codebase is realistic and marked with `TODO`. Update these items with your exact URLs and documents:

1. **`public/resume.pdf`**:
   - Replace the starter PDF placeholder at `public/resume.pdf` with your actual exported resume PDF.
2. **`src/data/profile.ts`**:
   - `socials.github`: Update with your exact GitHub profile URL (e.g., `https://github.com/rishi-code`).
   - `socials.linkedin`: Update with your exact LinkedIn profile URL (e.g., `https://linkedin.com/in/saptarshi-patra`).
   - `socials.email`: Update with your primary email address (e.g., `rishi.patra.dev@gmail.com`).
   - `socials.leetcode`: Update with your exact LeetCode handle URL (e.g., `https://leetcode.com/u/rishi_patra`).
3. **`src/data/projects.ts`**:
   - Replace the placeholder GitHub repo URLs (`https://github.com/rishi-code/...`) with your actual repository links.
   - For SentinelGuard and NeuralFlow, update or keep the `liveDemoUrl` links when you deploy live sandboxes.
4. **`src/data/achievements.ts`**:
   - Update the `ideathon-campus` entry with your exact tech fest name, project pitch, and award date.
5. **`src/data/stats.ts`**:
   - Update `fallbackLeetCodeStats.username` with your exact LeetCode handle.
   - Update `fallbackGitHubStats` and `fallbackLeetCodeStats` values if your baseline solved count or star count changes.
