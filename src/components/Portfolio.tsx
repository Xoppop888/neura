import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  desc: string;
  accent: string;
  challenge: string;
  approach: string;
  design: string;
  technology: string;
  ai: string;
  result: string;
}

const projects: Project[] = [
  {
    id: 'nova',
    name: 'NOVA',
    category: 'AI-powered customer platform',
    desc: 'Интеллектуальная платформа для управления клиентским опытом с AI-ассистентом.',
    accent: 'violet',
    challenge: 'Клиенту нужна была платформа, способная обрабатывать тысячи запросов одновременно, сохраняя персонализированный подход к каждому пользователю.',
    approach: 'Мы создали модульную архитектуру с AI-ядром, которое адаптируется к паттернам поведения пользователей и автоматически оптимизирует ответы.',
    design: 'Минималистичный интерфейс с акцентом на скорость взаимодействия. Каждая кнопка и элемент продуманы для минимального количества кликов.',
    technology: 'React, Node.js, PostgreSQL, Redis, WebSocket для real-time обновлений.',
    ai: 'GPT-4 интеграция для генерации ответов, ML-модель для классификации запросов, система рекомендаций на основе поведения.',
    result: 'Сокращение времени ответа на 73%. Увеличение удовлетворённости клиентов на 45%. Автоматизация 80% типовых запросов.',
  },
  {
    id: 'orbit',
    name: 'ORBIT',
    category: 'Premium SaaS website',
    desc: 'Премиальный маркетинговый сайт для SaaS-продукта с высокой конверсией.',
    accent: 'cyan',
    challenge: 'Создать сайт, который передаёт технологическую экспертизу продукта и конвертирует посетителей в клиентов.',
    approach: 'Глубокое исследование аудитории, создание уникальной визуальной системы и контент-стратегии, ориентированной на ценности.',
    design: 'Тёмная тема с акцентными градиентами, плавные анимации при скролле, интерактивные элементы, демонстрирующие продукт.',
    technology: 'Next.js, Framer Motion, Tailwind CSS, Vercel для деплоя.',
    ai: 'AI-генерация контента для A/B тестирования, динамическая персонализация лендинга на основе сегмента посетителя.',
    result: 'Конверсия увеличена на 120%. Время загрузки — 0.8s. Core Web Vitals в зелёной зоне.',
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    category: 'AI business assistant',
    desc: 'Внутренний AI-ассистент для автоматизации операционных задач компании.',
    accent: 'blue',
    challenge: 'Компания тратила более 40 часов в неделю на рутинные задачи: обработка документов, ответы на FAQ, координация между отделами.',
    approach: 'Создание единого AI-ассистента, интегрированного во внутренние системы компании с доступом к базам знаний.',
    design: 'Чат-интерфейс с контекстными подсказками, быстрый доступ к функциям через команды, минимальный визуальный шум.',
    technology: 'Python, FastAPI, LangChain, Pinecone для vector search, React для интерфейса.',
    ai: 'RAG-система с доступом к внутренним документам, автоматическая классификация задач, интеграция с Slack и email.',
    result: 'Экономия 35+ часов в неделю. Сокращение времени на поиск информации на 60%. Автоматизация 85% рутинных процессов.',
  },
];

const accentStyles: Record<string, { gradient: string; glow: string; text: string; border: string }> = {
  violet: {
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    glow: 'shadow-[0_0_60px_-15px_rgba(139,92,246,0.3)]',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    glow: 'shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)]',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
  },
  blue: {
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    glow: 'shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
};

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { title: 'Challenge', content: project.challenge },
    { title: 'Approach', content: project.approach },
    { title: 'Design', content: project.design },
    { title: 'Technology', content: project.technology },
    { title: 'AI', content: project.ai },
    { title: 'Result', content: project.result },
  ];

  const style = accentStyles[project.accent];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#050505]/95 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-[#0A0A0A] border border-white/[0.06] rounded-3xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative p-8 md:p-16 bg-gradient-to-br ${style.gradient}`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full border border-white/[0.1] hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-300"
          >
            <X size={16} />
          </button>
          <span className={`text-[11px] tracking-[0.3em] uppercase ${style.text} mb-4 block font-medium`}>
            {project.category}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-4">
            {project.name}
          </h2>
          <p className="text-lg text-[#737373] max-w-xl font-light">{project.desc}</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-16 space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#737373] mb-4 font-medium">
                {section.title}
              </h3>
              <p className="text-lg leading-relaxed font-light">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-violet-400/60 mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 leading-[0.9]">
            Selected work.
          </h2>
          <p className="text-lg text-[#737373] font-light">
            A few things we've built.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-4">
          {projects.map((project, i) => {
            const style = accentStyles[project.accent];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer relative rounded-3xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden transition-all duration-700 hover:${style.border} hover:${style.glow}`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <span className={`text-[11px] tracking-[0.3em] uppercase ${style.text} mb-4 block font-medium`}>
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-4 transition-all duration-500">
                      {project.name}
                    </h3>
                    <p className="text-[#737373] max-w-lg font-light">{project.desc}</p>
                  </div>
                  
                  {/* Visual mockup */}
                  <div className="hidden md:block w-56 h-36 rounded-xl border border-white/[0.06] bg-[#050505] overflow-hidden relative group-hover:scale-[1.02] group-hover:border-white/[0.1] transition-all duration-700">
                    <div className="absolute inset-0 flex flex-col p-4">
                      <div className="flex gap-1.5 mb-3">
                        <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                        <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                        <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className={`w-3/4 h-2 rounded bg-gradient-to-r ${style.gradient}`} />
                        <div className="w-1/2 h-2 bg-white/[0.04] rounded" />
                        <div className="w-2/3 h-2 bg-white/[0.03] rounded" />
                        <div className="mt-4 flex gap-2">
                          <div className={`w-12 h-5 rounded bg-gradient-to-r ${style.gradient}`} />
                          <div className="w-12 h-5 rounded bg-white/[0.04]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 text-sm ${style.text} opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                    <span>View case</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#737373] mt-12 font-light"
        >
          Selected concepts — showcasing our approach and capabilities.
        </motion.p>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
