import { motion, useInView } from 'framer-motion';
import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { Globe, Bot, Zap, Code2 } from 'lucide-react';

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return { pos, handleMouseMove };
}

function AnimatedSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Trust() {
  const traits = [
    { label: 'AI-first', color: 'violet' },
    { label: 'Fast execution', color: 'cyan' },
    { label: 'Premium UI/UX', color: 'blue' },
    { label: 'Custom solutions', color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    violet: 'border-violet-500/20 text-violet-300/80 bg-violet-500/[0.03]',
    cyan: 'border-cyan-500/20 text-cyan-300/80 bg-cyan-500/[0.03]',
    blue: 'border-blue-500/20 text-blue-300/80 bg-blue-500/[0.03]',
  };

  return (
    <section className="py-20 md:py-32 px-6 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-8 leading-[0.9]">
            Design. Technology.<br />
            <span className="gradient-text-blue">Intelligence.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#737373] max-w-2xl leading-relaxed mb-16 font-light">
            We create digital products that look premium, work fast, and solve real business problems.
          </p>
          <div className="flex flex-wrap gap-3">
            {traits.map((trait, i) => (
              <motion.span
                key={trait.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`px-5 py-2.5 rounded-full border text-sm ${colorMap[trait.color]}`}
              >
                {trait.label}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, glowColors, iconColors }: {
  service: { num: string; title: string; desc: string; icon: typeof Globe; glow: string };
  index: number;
  glowColors: Record<string, string>;
  iconColors: Record<string, string>;
}) {
  const { pos, handleMouseMove } = useMousePosition();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      className={`group card-neon p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-[#0A0A0A] relative overflow-hidden transition-all duration-500 ${glowColors[service.glow]}`}
      style={{ '--mouse-x': `${pos.x}px`, '--mouse-y': `${pos.y}px` } as React.CSSProperties}
    >
      {/* Mouse tracking glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.04), transparent 40%)`,
        }}
      />
      
      {/* Corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <span className="text-[11px] text-[#737373] tracking-[0.2em] font-mono">{service.num}</span>
          <service.icon className={`w-5 h-5 transition-all duration-500 ${iconColors[service.glow]}`} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.01em] mb-4 transition-all duration-500">
          {service.title}
        </h3>
        <p className="text-[#737373] leading-relaxed font-light">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Services() {
  const services = [
    {
      num: '01',
      title: 'Premium Websites',
      desc: 'Marketing sites, landing pages, and corporate platforms with strong design, UX, and high performance.',
      icon: Globe,
      glow: 'violet',
    },
    {
      num: '02',
      title: 'AI Agents',
      desc: 'AI bots and intelligent assistants for sales, support, consulting, and internal processes.',
      icon: Bot,
      glow: 'cyan',
    },
    {
      num: '03',
      title: 'AI Automation',
      desc: 'Automation of repetitive tasks and business processes powered by AI.',
      icon: Zap,
      glow: 'blue',
    },
    {
      num: '04',
      title: 'Custom Products',
      desc: 'Web applications, internal tools, MVPs, and custom digital solutions.',
      icon: Code2,
      glow: 'violet',
    },
  ];

  const glowColors: Record<string, string> = {
    violet: 'group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] group-hover:border-violet-500/20',
    cyan: 'group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/20',
    blue: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] group-hover:border-blue-500/20',
  };

  const iconColors: Record<string, string> = {
    violet: 'text-violet-400/60 group-hover:text-violet-400',
    cyan: 'text-cyan-400/60 group-hover:text-cyan-400',
    blue: 'text-blue-400/60 group-hover:text-blue-400',
  };

  return (
    <section id="services" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-20">
            <span className="text-[11px] tracking-[0.3em] uppercase text-violet-400/60 mb-4 block">Services</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 leading-[0.9]">
              What we build.
            </h2>
            <p className="text-lg text-[#737373] max-w-xl font-light">
              From first prototype to a full digital product.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} glowColors={glowColors} iconColors={iconColors} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AIFirst() {
  const advantages = [
    { title: 'Faster iteration', desc: 'Validate ideas and ship working versions faster.', color: 'violet' },
    { title: 'More experimentation', desc: 'Quickly test different solutions and UX concepts.', color: 'cyan' },
    { title: 'Lower overhead', desc: 'Less friction between idea and result.', color: 'blue' },
    { title: 'Human direction', desc: 'AI accelerates development, but product, design, and decisions stay in human hands.', color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500/10 border-violet-500/20',
    cyan: 'bg-cyan-500/10 border-cyan-500/20',
    blue: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <section className="py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/[0.03] rounded-full blur-[200px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-6 block">Our approach</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-10 leading-[0.9]">
              Built differently.
            </h2>
            <p className="text-2xl md:text-4xl font-light text-[#737373] leading-tight max-w-3xl mx-auto">
              AI is not the product.<br />
              <span className="gradient-text-blue">It's how we build it.</span>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto text-center mb-20 leading-relaxed font-light">
            We use AI as part of the development process itself — from research and prototyping to interfaces, code, integrations, and optimization.
          </p>
        </AnimatedSection>

        {/* Advantages grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-white/[0.06] bg-[#0A0A0A] hover:border-white/[0.1] transition-all duration-500"
            >
              <div className={`w-8 h-8 rounded-lg ${colorMap[adv.color]} border flex items-center justify-center mb-4`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
              <h4 className="text-base font-medium mb-2">{adv.title}</h4>
              <p className="text-sm text-[#737373] leading-relaxed font-light">{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vibe coding block */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-[#0A0A0A] relative overflow-hidden group hover:border-violet-500/10 transition-all duration-500">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-400/60 mt-2 animate-pulse" />
                <div>
                  <h4 className="text-[11px] font-mono text-violet-400/60 tracking-[0.2em] uppercase mb-2">
                    AI-assisted development
                  </h4>
                  <p className="text-[#F5F5F5] leading-relaxed font-light">
                    We use modern AI tools and a vibe coding approach for rapid prototyping, development, and iteration — turning ideas into working products significantly faster.
                  </p>
                </div>
              </div>

              {/* Flow visualization */}
              <div className="mt-8 flex items-center gap-2 flex-wrap">
                {['Idea', 'AI', 'Code', 'Product'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className={`px-4 py-2 rounded-lg border text-sm font-light ${
                      i === 1 ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' :
                      i === 3 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
                      'bg-white/[0.02] border-white/[0.06] text-[#737373]'
                    }`}>
                      {step}
                    </span>
                    {i < 3 && <span className="text-[#737373] text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { num: '01', title: 'DISCOVER', desc: 'Understand the problem, business, audience, and goals.', color: 'violet' },
    { num: '02', title: 'CONCEPT', desc: 'Define product concept, structure, and visual direction.', color: 'cyan' },
    { num: '03', title: 'BUILD', desc: 'Create interface, functionality, and AI integrations using AI-first development.', color: 'blue' },
    { num: '04', title: 'REFINE', desc: 'Test, improve UX, performance, and details.', color: 'violet' },
    { num: '05', title: 'LAUNCH', desc: 'Ship the finished product.', color: 'cyan' },
  ];

  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500/20 border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
    cyan: 'bg-cyan-500/20 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    blue: 'bg-blue-500/20 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  };

  return (
    <section id="process" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-20">
            <span className="text-[11px] tracking-[0.3em] uppercase text-blue-400/60 mb-4 block">Process</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9]">
              From idea to launch.
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative flex gap-6"
              >
                {/* Dot & Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border shrink-0 ${colorMap[step.color]}`} />
                  {i < steps.length - 1 && (
                    <div className="w-[1px] flex-1 bg-gradient-to-b from-white/[0.08] to-transparent mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <span className="text-[11px] text-[#737373] tracking-[0.2em] mb-2 block font-mono">{step.num}</span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] mb-2">{step.title}</h3>
                  <p className="text-[#737373] leading-relaxed font-light">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
