import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  desc: string;
  gradient: string;
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
    gradient: 'from-violet-500/10 via-blue-500/5 to-transparent',
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
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    challenge: 'Создать сайт, который передаёт технологическую экспертизу продукта и конвертирует посетителей в клиентов.',
    approach: 'Глубокое исследование аудитории, создание уникальной визуальной системы и контент-стратегии, ориентированной на ценности.',
    design: 'Тёмная тема с акцентными градиентами, плавные анимации при скролле, интерактивные элементы, демонстрирующие продукт.',
    technology: 'Next.js, Framer Motion, Tailwind CSS, Vercel для деплоя.',
    ai: 'AI-генерация контента для A/B тестирования, динамическая персоназация лендинга на основе сегмента посетителя.',
    result: 'Конверсия увеличена на 120%. Время загрузки — 0.8s. Core Web Vitals в зелёной зоне.',
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    category: 'AI business assistant',
    desc: 'Внутренний AI-ассистент для автоматизации операционных задач компании.',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    challenge: 'Компания тратила более 40 часов в неделю на рутинные задачи: обработка документов, ответы на FAQ, координация между отделами.',
    approach: 'Создание единого AI-ассистента, интегрированного во внутренние системы компании с доступом к базам знаний.',
    design: 'Чат-интерфейс с контекстными подсказками, быстрый доступ к функциям через команды, минимальный визуальный шум.',
    technology: 'Python, FastAPI, LangChain, Pinecone для vector search, React для интерфейса.',
    ai: 'RAG-система с доступом к внутренним документам, автоматическая классификация задач, интеграция с Slack и email.',
    result: 'Экономия 35+ часов в неделю. Сокращение времени на поиск информации на 60%. Автоматизация 85% рутинных процессов.',
  },
];

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { title: 'Challenge', content: project.challenge },
    { title: 'Approach', content: project.approach },
    { title: 'Design', content: project.design },
    { title: 'Technology', content: project.technology },
    { title: 'AI', content: project.ai },
    { title: 'Result', content: project.result },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#070707]/95 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-4xl bg-[#0D0D0D] border border-white/[0.06] rounded-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative p-8 md:p-16 bg-gradient-to-br ${project.gradient}`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/[0.1] hover:bg-white/[0.05] transition-colors"
          >
            <X size={18} />
          </button>
          <span className="text-xs text-[#8A8A8A] tracking-widest uppercase mb-4 block">
            {project.category}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-4">
            {project.name}
          </h2>
          <p className="text-lg text-[#8A8A8A] max-w-xl">{project.desc}</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-16 space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm tracking-widest uppercase text-[#8A8A8A] mb-3">
                {section.title}
              </h3>
              <p className="text-lg leading-relaxed">{section.content}</p>
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-6">
            Selected work.
          </h2>
          <p className="text-lg text-[#8A8A8A]">
            A few things we've built.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative rounded-2xl border border-white/[0.06] bg-[#111111] overflow-hidden card-hover"
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <span className="text-xs text-[#8A8A8A] tracking-widest uppercase mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-3 group-hover:tracking-[-0.01em] transition-all duration-500">
                    {project.name}
                  </h3>
                  <p className="text-[#8A8A8A] max-w-lg">{project.desc}</p>
                </div>
                
                {/* Visual mockup */}
                <div className="hidden md:block w-48 h-32 rounded-lg border border-white/[0.06] bg-[#0D0D0D] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="flex gap-1 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="w-3/4 h-1.5 bg-white/[0.06] rounded" />
                      <div className="w-1/2 h-1.5 bg-white/[0.04] rounded" />
                      <div className="w-2/3 h-1.5 bg-white/[0.03] rounded" />
                      <div className="mt-3 w-16 h-4 bg-white/[0.06] rounded" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#8A8A8A] group-hover:text-[#F5F5F5] transition-colors">
                  <span>View case</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-[#8A8A8A] mt-12"
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
