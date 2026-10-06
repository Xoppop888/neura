import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';

function AIDemo() {
  const messages = [
    { role: 'user', text: 'Мне нужно забронировать консультацию.' },
    { role: 'ai', text: 'Конечно. Я могу подобрать свободное время и записать вас. Какой день вам удобнее?' },
    { role: 'user', text: 'Завтра, после обеда.' },
    { role: 'ai', text: 'Есть свободные слоты на 14:00 и 16:30. Какой вам подходит?' },
  ];

  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    const showNext = () => {
      if (visibleMessages < messages.length) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setVisibleMessages(prev => prev + 1);
        }, 1500);
      }
    };

    const timer = setTimeout(showNext, 1000);
    return () => clearTimeout(timer);
  }, [isInView, visibleMessages]);

  const capabilities = [
    'Customer support',
    'Lead qualification',
    'FAQ',
    'Sales assistance',
    'Internal knowledge',
    'Automation',
  ];

  return (
    <section className="py-32 md:py-48 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-6 block">AI Demo</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9]">
            What can AI do<br />
            <span className="gradient-text-blue">for your business?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat Interface */}
          <div ref={ref} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden neon-glow-cyan">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                <span className="text-sm text-[#737373]">AI Assistant</span>
              </div>
              <span className="text-[10px] text-[#737373] font-mono">online</span>
            </div>
            
            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[320px]">
              {messages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-light ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/10 text-[#F5F5F5]'
                      : 'bg-white/[0.03] border border-white/[0.06] text-[#F5F5F5]'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#737373] mb-6 font-medium">
              AI can handle:
            </p>
            <div className="space-y-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all duration-500"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400/80 transition-colors" />
                  <span className="text-[#F5F5F5] font-light">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const benefits = [
    { title: 'Speed', desc: 'Быстрые итерации и запуск.', color: 'violet' },
    { title: 'Design', desc: 'Сильный визуальный и UX-фокус.', color: 'cyan' },
    { title: 'Flexibility', desc: 'Можно быстро менять направление продукта.', color: 'blue' },
    { title: 'AI-native', desc: 'AI встроен в процесс разработки с самого начала.', color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    violet: 'hover:border-violet-500/20 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.2)]',
    cyan: 'hover:border-cyan-500/20 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)]',
    blue: 'hover:border-blue-500/20 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]',
  };

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-violet-400/60 mb-4 block">Why us</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-10 leading-[0.9]">
            Why AI-first?
          </h2>
          <p className="text-2xl md:text-4xl font-light text-[#737373] leading-tight max-w-3xl">
            Less time building.<br />
            <span className="gradient-text-blue">More time creating.</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group p-6 rounded-xl border border-white/[0.06] bg-[#0A0A0A] transition-all duration-500 ${colorMap[b.color]}`}
            >
              <h4 className="text-xl font-semibold mb-3">{b.title}</h4>
              <p className="text-sm text-[#737373] font-light">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const tags = [
    { label: 'AI-first', color: 'violet' },
    { label: 'Independent', color: 'cyan' },
    { label: 'Remote', color: 'blue' },
    { label: 'Global', color: 'violet' },
  ];

  const colorMap: Record<string, string> = {
    violet: 'border-violet-500/20 text-violet-300/80',
    cyan: 'border-cyan-500/20 text-cyan-300/80',
    blue: 'border-blue-500/20 text-blue-300/80',
  };

  return (
    <section id="about" className="py-32 md:py-48 px-6 relative">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/[0.03]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            <span className="text-[11px] text-green-400/80 tracking-wider">Available for new projects</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-10 leading-[0.9]">
            Small studio.<br />
            <span className="gradient-text-blue">Big digital ambition.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#737373] leading-relaxed max-w-2xl mx-auto mb-14 font-light">
            Мы создаём сайты, AI-продукты и автоматизацию для компаний, которые хотят использовать современные технологии не ради тренда, а ради реального результата.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tags.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`px-5 py-2.5 rounded-full border text-sm ${colorMap[tag.color]}`}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 md:py-48 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-violet-600/[0.04] rounded-full blur-[250px]" />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[200px]" />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.85] mb-10">
            Have an idea?<br />
            <span className="gradient-text">Let's build it.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#737373] max-w-xl mx-auto mb-14 font-light">
            Расскажите, что хотите создать. Мы поможем превратить идею в работающий цифровой продукт.
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full text-base font-medium transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-8 text-sm text-[#737373] font-light">
            Usually reply within 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: '',
  });

  const types = ['Website', 'AI Agent', 'Automation', 'Web App', 'Not sure yet'];

  return (
    <section id="contact" className="py-32 md:py-48 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.3em] uppercase text-violet-400/60 mb-4 block">Contact</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.9]">
              Let's talk.
            </h2>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] focus:border-violet-500/30 text-[#F5F5F5] placeholder-[#737373] outline-none transition-all duration-500 font-light text-lg"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] focus:border-violet-500/30 text-[#F5F5F5] placeholder-[#737373] outline-none transition-all duration-500 font-light text-lg"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.08] focus:border-violet-500/30 text-[#F5F5F5] placeholder-[#737373] outline-none transition-all duration-500 resize-none font-light text-lg"
              />
            </div>

            {/* Type selector */}
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#737373] mb-4 font-medium">What are you looking for?</p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-500 ${
                      formData.type === type
                        ? 'border-violet-500/30 bg-violet-500/[0.05] text-violet-300'
                        : 'border-white/[0.06] text-[#737373] hover:border-white/[0.1] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="group w-full py-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full text-sm font-medium transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Send inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const links = ['Work', 'Services', 'Process', 'About', 'Contact'];
  const socials = ['Telegram', 'Instagram', 'LinkedIn'];

  return (
    <footer className="border-t border-white/[0.04] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6 leading-[0.9]">
              Build something<br />
              <span className="gradient-text-blue">intelligent.</span>
            </h3>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#737373] mb-6 font-medium">Navigation</p>
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-[#F5F5F5] hover:text-violet-400 transition-colors duration-300 font-light"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#737373] mb-6 font-medium">Connect</p>
            <div className="space-y-3">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="block text-[#F5F5F5] hover:text-cyan-400 transition-colors duration-300 font-light"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#737373] font-light">
            © 2026 NEURA. AI-first digital studio.
          </p>
          <p className="text-xs text-[#737373] font-light">
            Designed & built with AI-first approach.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { AIDemo, WhyUs, About, FinalCTA, Contact, Footer };
