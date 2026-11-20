import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { profileData } from '@/data/profile';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08090c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${profileData.name} (${profileData.shortName}) | Software & Systems Portfolio`,
  description: `${profileData.tagline}. First-year B.Tech CSE student at ITER/SOA (9.45 CGPA) specializing in Java, Python, low-latency backend architectures, LSM-Tree storage engines, and RAG pipelines.`,
  keywords: [
    'Saptarshi Patra',
    'Rishi',
    'ITER SOA Bhubaneswar',
    'Software Engineer',
    'Systems Engineering',
    'Backend Developer',
    'Java Developer',
    'Python Developer',
    'LSM-Tree',
    'FastAPI',
    'Spring Boot',
    'Cybersecurity',
    'AI Engineering',
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    title: `${profileData.name} - Systems & Software Engineering Portfolio`,
    description: `${profileData.tagline}. ITER/SOA CSE Undergrad (9.45 CGPA). Interactive system architectures and case studies.`,
    url: 'https://rishi-portfolio.vercel.app',
    siteName: `${profileData.name} Portfolio`,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} | Developer Portfolio`,
    description: `${profileData.tagline}. 9.45 CGPA at ITER/SOA.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090c] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
