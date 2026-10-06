import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Bot, Zap, Code2 } from 'lucide-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Trust() {
  const traits = ['AI-first', 'Fast execution', 'Premium UI/UX', 'Custom solutions'];

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] mb-8">
            Design. Technology.<br />
            <span className="text-[#8A8A8A]">Intelligence.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#8A8A8A] max-w-2xl leading-relaxed mb-16">
            Создаём цифровые продукты, которые выглядят премиально, работают быстро и решают реальные задачи бизнеса.
          </p>
          <div className="flex flex-wrap gap-4">
            {traits.map((trait, i) => (
              <motion.span
                key={trait}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-[#8A8A8A]"
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function Services() {
  const services = [
    {
      num: '01',
      title: 'PREMIUM WEBSITES',
      desc: 'Маркетинговые сайты, лендинги и корпоративные платформы с сильным дизайном, UX и высокой скоростью.',
      icon: Globe,
    },
    {
      num: '02',
      title: 'AI AGENTS',
      desc: 'AI-боты и интеллектуальные ассистенты для продаж, поддержки, консультаций и внутренних процессов.',
      icon: Bot,
    },
    {
      num: '03',
      title: 'AI AUTOMATION',
      desc: 'Автоматизация повторяющихся задач и бизнес-процессов с помощью AI.',
      icon: Zap,
    },
    {
      num: '04',
      title: 'CUSTOM PRODUCTS',
      desc: 'Веб-приложения, внутренние инструменты, MVP и нестандартные цифровые продукты.',
      icon: Code2,
    },
  ];

  return (
    <section id="services" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-6">
              What we build.
            </h2>
            <p className="text-lg text-[#8A8A8A] max-w-xl">
              От первого прототипа до полноценного цифрового продукта.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group card-hover p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-[#111111] relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs text-[#8A8A8A] tracking-widest">{service.num}</span>
                  <service.icon className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#F5F5F5] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 group-hover:tracking-[-0.01em] transition-all duration-500">
                  {service.title}
                </h3>
                <p className="text-[#8A8A8A] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AIFirst() {
  const advantages = [
    { title: 'Faster iteration', desc: 'Быстрее проверяем идеи и запускаем рабочие версии.' },
    { title: 'More experimentation', desc: 'Можем быстро тестировать разные решения и UX-концепции.' },
    { title: 'Lower overhead', desc: 'Меньше лишних процессов между идеей и результатом.' },
    { title: 'Human direction', desc: 'AI ускоряет разработку, но продукт, дизайн и решения остаются под контролем человека.' },
  ];

  return (
    <section className="py-32 md:py-48 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.01] to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] mb-8">
              Built differently.
            </h2>
            <p className="text-2xl md:text-4xl font-light text-[#8A8A8A] leading-tight max-w-3xl mx-auto">
              AI is not the product.<br />
              <span className="text-[#F5F5F5]">It's how we build it.</span>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-lg text-[#8A8A8A] max-w-2xl mx-auto text-center mb-20 leading-relaxed">
            Мы используем AI как часть самого процесса разработки — от исследования и прототипирования до интерфейсов, кода, интеграций и оптимизации.
          </p>
        </AnimatedSection>

        {/* Advantages grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/[0.06] bg-[#0D0D0D]"
            >
              <h4 className="text-lg font-medium mb-2">{adv.title}</h4>
              <p className="text-sm text-[#8A8A8A] leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vibe coding block */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl border border-white/[0.06] bg-[#111111] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400/60 mt-2" />
              <div>
                <h4 className="text-sm font-mono text-[#8A8A8A] tracking-wider uppercase mb-1">
                  AI-assisted development
                </h4>
                <p className="text-[#F5F5F5] leading-relaxed">
                  Используем современные AI-инструменты и vibe coding подход для быстрого прототипирования, разработки и итераций — превращая идеи в работающие продукты значительно быстрее.
                </p>
              </div>
            </div>

            {/* Flow visualization */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              {['Idea', 'AI', 'Code', 'Product'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-[#8A8A8A]">
                    {step}
                  </span>
                  {i < 3 && <span className="text-[#8A8A8A] text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { num: '01', title: 'DISCOVER', desc: 'Разбираемся в задаче, бизнесе, аудитории и целях.' },
    { num: '02', title: 'CONCEPT', desc: 'Формируем концепцию продукта, структуру и визуальное направление.' },
    { num: '03', title: 'BUILD', desc: 'Создаём интерфейс, функциональность и AI-интеграции с использованием AI-first development.' },
    { num: '04', title: 'REFINE', desc: 'Тестируем, улучшаем UX, производительность и детали.' },
    { num: '05', title: 'LAUNCH', desc: 'Запускаем готовый продукт.' },
  ];

  return (
    <section id="process" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-6">
              From idea to launch.
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/[0.06] via-white/[0.04] to-transparent sm:block" />
          
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative md:flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`md:w-1/2 pl-12 sm:pl-16 ${i % 2 === 0 ? 'md:pr-16 md:text-right md:pl-0' : 'md:pl-16 md:pl-16'}`}>
                  <span className="text-xs text-[#8A8A8A] tracking-widest mb-2 block font-mono">{step.num}</span>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{step.title}</h3>
                  <p className="text-[#8A8A8A] leading-relaxed">{step.desc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#070707] border border-white/[0.15] hidden sm:block">
                  <div className="absolute inset-0 rounded-full bg-white/[0.05] animate-pulse" />
                </div>

                {/* Empty space for other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
