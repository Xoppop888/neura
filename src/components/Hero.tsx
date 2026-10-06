import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouse);

    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      color: string;
    }

    const nodes: Node[] = [];
    const colors = ['rgba(139, 92, 246,', 'rgba(6, 182, 212,', 'rgba(59, 130, 246,'];
    const numNodes = 50;

    for (let i = 0; i < numNodes; i++) {
      const x = Math.random() * canvas.offsetWidth;
      const y = Math.random() * canvas.offsetHeight;
      nodes.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((node, i) => {
        // Floating motion
        node.x = node.baseX + Math.sin(time + node.pulse) * 20;
        node.y = node.baseY + Math.cos(time * 0.7 + node.pulse) * 15;

        // Mouse interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let glowIntensity = 0.3;
        if (dist < 200) {
          const force = (200 - dist) / 200;
          node.x += dx * force * 0.02;
          node.y += dy * force * 0.02;
          glowIntensity = 0.3 + force * 0.7;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 8);
        gradient.addColorStop(0, `${node.color} ${glowIntensity * 0.5})`);
        gradient.addColorStop(1, `${node.color} 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color} ${glowIntensity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const d = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (d < 150) {
            const alpha = 0.08 * (1 - d / 150);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 w-[600px] h-[600px] rounded-full transition-all duration-1000 ease-out"
      style={{
        left: pos.x - 300,
        top: pos.y - 300,
        background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, rgba(6,182,212,0.02) 30%, transparent 70%)',
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Mesh gradient */}
        <div className="absolute inset-0 mesh-gradient" />
        
        {/* Neural network canvas */}
        <NeuralCanvas />
        
        {/* Large glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.02] rounded-full blur-[200px]" />
      </div>

      <CursorGlow />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[0.4em] uppercase text-[#737373] font-medium">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-violet-500/50" />
            <span className="text-violet-400/70">AI</span>
            <span className="text-[#737373]">•</span>
            <span className="text-cyan-400/70">WEB</span>
            <span className="text-[#737373]">•</span>
            <span className="text-blue-400/70">AUTOMATION</span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] font-bold tracking-[-0.05em] leading-[0.85] mb-10"
        >
          <span className="block">Ideas into</span>
          <span className="block gradient-text text-glow">digital products.</span>
          <span className="block text-[#737373]">Faster.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-[#737373] max-w-2xl mx-auto mb-14 leading-relaxed font-light"
        >
          Premium websites, AI agents and custom digital solutions — built with an <span className="text-[#F5F5F5]">AI-first approach</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full text-sm font-medium transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>
          <a
            href="#work"
            className="group px-8 py-4 border border-white/[0.1] rounded-full text-sm font-medium hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-500"
          >
            View selected work
            <span className="inline-block ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
          </a>
        </motion.div>

        {/* Micro copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center gap-6 text-[11px] text-[#737373] tracking-wide"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-violet-500/50" />
            AI-first development
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
            Design-led
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500/50" />
            Built for business
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-[#737373] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-violet-500/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
