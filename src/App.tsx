import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Trust, Services, AIFirst, Process } from './components/Sections';
import Portfolio from './components/Portfolio';
import { AIDemo, WhyUs, About, FinalCTA, Contact, Footer } from './components/BottomSections';

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}

function TechMarquee() {
  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Python', 'OpenAI', 'LangChain',
    'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Supabase'
  ];

  return (
    <div className="py-20 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap">
        {[...technologies, ...technologies, ...technologies].map((tech, i) => (
          <span key={i} className="text-sm text-[#737373]/30 tracking-[0.2em] uppercase font-light flex items-center gap-12">
            {tech}
            <span className="w-1 h-1 rounded-full bg-violet-500/20" />
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5]">
      {/* Noise overlay */}
      <div className="noise-bg" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <SectionDivider />
        <Trust />
        <TechMarquee />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <AIFirst />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <AIDemo />
        <SectionDivider />
        <WhyUs />
        <SectionDivider />
        <About />
        <FinalCTA />
        <SectionDivider />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
