import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Trust, Services, AIFirst, Process } from './components/Sections';
import Portfolio from './components/Portfolio';
import { AIDemo, WhyUs, About, FinalCTA, Contact, Footer } from './components/BottomSections';

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

function TechMarquee() {
  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Python', 'OpenAI', 'LangChain',
    'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Supabase'
  ];

  return (
    <div className="py-16 overflow-hidden border-y border-white/[0.04]">
      <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, i) => (
          <span key={i} className="text-sm text-[#8A8A8A]/40 tracking-wider uppercase">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-[#F5F5F5]">
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
