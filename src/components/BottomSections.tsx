import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-6">
            What can AI do<br />for your business?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat Interface */}
          <div ref={ref} className="rounded-2xl border border-white/[0.06] bg-[#111111] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
              <span className="text-sm text-[#8A8A8A]">AI Assistant</span>
            </div>
            
            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[300px]">
              {messages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-white/[0.06] text-[#F5F5F5]'
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
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <p className="text-sm text-[#8A8A8A] tracking-widest uppercase mb-6">
              AI can handle:
            </p>
            <div className="space-y-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-[#0D0D0D]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-[#F5F5F5]">{cap}</span>
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
    { title: 'Speed', desc: 'Быстрые итерации и запуск.' },
    { title: 'Design', desc: 'Сильный визуальный и UX-фокус.' },
    { title: 'Flexibility', desc: 'Можно быстро менять направление продукта.' },
    { title: 'AI-native', desc: 'AI встроен в процесс разработки с самого начала.' },
  ];

  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-8">
            Why AI-first?
          </h2>
          <p className="text-2xl md:text-4xl font-light text-[#8A8A8A] leading-tight max-w-3xl">
            Less time building.<br />
            <span className="text-[#F5F5F5]">More time creating.</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/[0.06] bg-[#111111] card-hover"
            >
              <h4 className="text-xl font-semibold mb-2">{b.title}</h4>
              <p className="text-sm text-[#8A8A8A]">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const tags = ['AI-first', 'Independent', 'Remote', 'Global'];

  return (
    <section id="about" className="py-32 md:py-48 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.005] to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/[0.06] bg-[#111111]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <span className="text-xs text-[#8A8A8A]">Available for new projects</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] mb-8">
            Small studio.<br />
            <span className="text-[#8A8A8A]">Big digital ambition.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#8A8A8A] leading-relaxed max-w-2xl mx-auto mb-12">
            Мы создаём сайты, AI-продукты и автоматизацию для компаний, которые хотят использовать современные технологии не ради тренда, а ради реального результата.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-[#8A8A8A]"
              >
                {tag}
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
    <section className="py-32 md:py-48 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-8">
            Have an idea?<br />
            <span className="gradient-text">Let's build it.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#8A8A8A] max-w-xl mx-auto mb-12">
            Расскажите, что хотите создать. Мы поможем превратить идею в работающий цифровой продукт.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5F5F5] text-[#070707] rounded-full text-sm font-medium hover:bg-white transition-all duration-300 hover:scale-[1.02]"
          >
            Start a project →
          </a>
          <p className="mt-6 text-sm text-[#8A8A8A]">
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-12 text-center">
            Let's talk.
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.1] focus:border-white/[0.3] text-[#F5F5F5] placeholder-[#8A8A8A] outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.1] focus:border-white/[0.3] text-[#F5F5F5] placeholder-[#8A8A8A] outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-0 py-4 bg-transparent border-b border-white/[0.1] focus:border-white/[0.3] text-[#F5F5F5] placeholder-[#8A8A8A] outline-none transition-colors resize-none"
              />
            </div>

            {/* Type selector */}
            <div>
              <p className="text-sm text-[#8A8A8A] mb-3">What are you looking for?</p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                      formData.type === type
                        ? 'border-white/[0.2] bg-white/[0.05] text-[#F5F5F5]'
                        : 'border-white/[0.06] text-[#8A8A8A] hover:border-white/[0.1]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#F5F5F5] text-[#070707] rounded-full text-sm font-medium hover:bg-white transition-all duration-300 mt-8"
            >
              Send inquiry →
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
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
              Build something<br />intelligent.
            </h3>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm text-[#8A8A8A] tracking-widest uppercase mb-4">Navigation</p>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-[#F5F5F5] hover:text-[#8A8A8A] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm text-[#8A8A8A] tracking-widest uppercase mb-4">Connect</p>
            <div className="space-y-2">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="block text-[#F5F5F5] hover:text-[#8A8A8A] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8A8A8A]">
            © 2026 NEURA. AI-first digital studio.
          </p>
          <p className="text-xs text-[#8A8A8A]">
            Designed & built with AI-first approach.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { AIDemo, WhyUs, About, FinalCTA, Contact, Footer };
