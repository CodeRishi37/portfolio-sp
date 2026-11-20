import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import AchievementsSection from '@/components/AchievementsSection';
import BuildLogSection from '@/components/BuildLogSection';
import StatsSection from '@/components/StatsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <AchievementsSection />
      <BuildLogSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
