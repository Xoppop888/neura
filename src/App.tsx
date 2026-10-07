import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { lqip } from './lqip';
import { BINHAI_URL, CONTACT, Lang, T } from './copy';

const ease = [0.16, 1, 0.3, 1] as const;
const IMG = { site: '/images/binhai/site.webp', tiggo3: '/images/binhai/tiggo3.webp', monza: '/images/binhai/monza.webp', tiggo5: '/images/binhai/tiggo5.webp' };
type ImgKey = keyof typeof IMG;
const Arrow = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 11 11 3M4.5 3H11v6.5" /></svg>;

function Preloader({ done }: { done: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t0 = performance.now(); let got = 0, shown = 0, id = 0;
    const jobs = Object.values(IMG).map(src => new Promise<void>(r => { const i = new Image(); i.src = src; (i.decode ? i.decode() : Promise.reject()).then(r, r); }));
    jobs.forEach(j => j.then(() => got++)); const total = jobs.length + 1;
    document.fonts.ready.then(() => got++);
    const tick = () => {
      const el = performance.now() - t0, target = Math.min(got / total, el / 1100);
      shown += (target - shown) * 0.12; setP(Math.round(shown * 100));
      if (shown > 0.995 || el > 3500) return done();
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick); return () => cancelAnimationFrame(id);
  }, []);
  return (
    <motion.div className="pre" exit={{ y: '-100%' }} transition={{ duration: 1.1, ease }}>
      <div className="pre-word">{'NEURA'.split('').map((c, i) => <motion.span key={i} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}>{c}</motion.span>)}</div>
      <div className="pre-bar"><i style={{ transform: `scaleX(${p / 100})` }} /></div>
      <span className="pre-n">{p}</span>
    </motion.div>
  );
}

function Magnetic({ children }: { children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.2 }), sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.2 });
  return <motion.div ref={r} className="mag" style={{ x: sx, y: sy }}
    onPointerMove={e => { const b = r.current!.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * 0.28); y.set((e.clientY - b.top - b.height / 2) * 0.28); }}
    onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}

function Img({ k, alt }: { k: ImgKey; alt: string }) {
  const [ok, setOk] = useState(false); const r = useRef<HTMLImageElement>(null);
  useEffect(() => { if (r.current?.complete && r.current.naturalWidth) setOk(true); }, []);
  return <span className="img" style={{ backgroundImage: `url(${lqip[k]})` }}><img ref={r} src={IMG[k]} alt={alt} decoding="async" className={ok ? 'in' : ''} onLoad={() => setOk(true)} /></span>;
}

function Emblem() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 18 }), sy = useSpring(y, { stiffness: 50, damping: 18 });
  useEffect(() => {
    const m = (e: PointerEvent) => { x.set((e.clientX / innerWidth - 0.5) * 36); y.set((e.clientY / innerHeight - 0.5) * 36); };
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m);
  }, []);
  return (
    <motion.div className="emblem" style={{ x: sx, y: sy }} aria-hidden>
      <svg viewBox="-200 -200 400 400">
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f0dcae" /><stop offset=".55" stopColor="#b89a5e" /><stop offset="1" stopColor="#6b5832" /></linearGradient>
          <radialGradient id="core"><stop offset="0" stopColor="#f0dcae" /><stop offset=".6" stopColor="#b89a5e" /><stop offset="1" stopColor="#b89a5e" stopOpacity="0" /></radialGradient>
        </defs>
        {[0, 1, 2, 3, 4].map(i => {
          const rx = 192 - i * 34, ry = rx * (0.36 + i * 0.1);
          return <g key={i} className="ring" style={{ animationDuration: `${46 + i * 20}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}>
            <g transform={`rotate(${i * 34})`}><ellipse rx={rx} ry={ry} fill="none" stroke="url(#gold)" strokeWidth={i === 2 ? 1.5 : 0.7} opacity={0.95 - i * 0.13} /><circle cx={rx} r={i === 2 ? 4.5 : 2.6} fill="#f0dcae" /></g>
          </g>;
        })}
        <circle r="56" fill="url(#core)" opacity=".55" /><circle r="17" fill="url(#gold)" />
      </svg>
    </motion.div>
  );
}

function Header({ lang, setLang, scrolled }: { lang: Lang; setLang: (l: Lang) => void; scrolled: boolean }) {
  const [open, setOpen] = useState(false); const c = T[lang];
  const ids = ['#work', '#studio', '#process', '#contact'];
  return (
    <header className={`hd ${scrolled ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <a href="#" className="logo" onClick={() => setOpen(false)}><span className="logo-mark" />NEURA</a>
      <nav>{c.nav.map((n, i) => <a key={n} href={ids[i]} onClick={() => setOpen(false)}>{n}</a>)}</nav>
      <div className="hd-r">
        <div className="langs">{(['en', 'ru', 'zh'] as Lang[]).map(l => <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}>{l === 'zh' ? '中文' : l.toUpperCase()}</button>)}</div>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  );
}

function Hero({ lang, ready }: { lang: Lang; ready: boolean }) {
  const c = T[lang], r = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = r.current!; const m = (e: PointerEvent) => { const b = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - b.left}px`); el.style.setProperty('--my', `${e.clientY - b.top}px`); };
    el.addEventListener('pointermove', m); return () => el.removeEventListener('pointermove', m);
  }, []);
  const rise = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 1.1, delay: d, ease } });
  return (
    <section className="hero" ref={r}>
      <div className="orb o1" /><div className="orb o2" />
      <div className="hero-in">
        <div className="hero-copy">
          <h1 key={lang}>{c.title.map((l, i) => <span className="mask" key={l}><motion.span initial={{ y: '115%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.3, delay: 0.15 + i * 0.13, ease }}>{l}</motion.span></span>)}</h1>
          <motion.p {...rise(0.7)}>{c.lead}</motion.p>
          <motion.div className="hero-cta" {...rise(0.9)}>
            <Magnetic><a className="btn" href="#contact">{c.cta}<Arrow /></a></Magnetic>
            <a className="link" href="#work">{c.more}</a>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.92 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.8, delay: 0.3, ease }}><Emblem /></motion.div>
      </div>
      <div className="marquee" aria-hidden><div className="track">{[0, 1].map(k => <div key={k}>{c.marquee.map(m => <span key={m + k}>{m}</span>)}{c.marquee.map(m => <span key={m + k + 'b'}>{m}</span>)}</div>)}</div></div>
    </section>
  );
}

function Binhai({ c }: { c: typeof T.en }) {
  const r = useRef<HTMLElement>(null); const [miss, setMiss] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: r, offset: ['start end', 'end start'] });
  const y = useTransform(p, [0, 1], [50, -50]);
  useEffect(() => { const i = new Image(); i.onerror = () => setMiss(true); i.src = IMG.site; }, []);
  return (
    <article className="case" ref={r}>
      <div className="case-copy">
        <span className="tag">{c.real}</span>
        <h3>{c.binhai[0]}</h3><p>{c.binhai[1]}</p>
        <a className="link dark" href={BINHAI_URL} target="_blank" rel="noreferrer">{c.open}<Arrow /></a>
      </div>
      <motion.a className="frame" style={{ y }} href={BINHAI_URL} target="_blank" rel="noreferrer" aria-label="binhaiauto.ru">
        <div className="bar"><i /><i /><i /><span>binhaiauto.ru</span></div>
        {miss ? <div className="m-row m-in">{(['tiggo3', 'monza', 'tiggo5'] as ImgKey[]).map(k => <Img key={k} k={k} alt="" />)}</div> : <Img k="site" alt="binhaiauto.ru" />}
      </motion.a>
    </article>
  );
}

const Concept = ({ kind, name, text, tag }: { kind: string; name: string; text: string; tag: string }) => (
  <article className="concept"><div className={`art art-${kind}`} /><div className="concept-t"><span className="tag">{tag}</span><h3>{name}</h3><p>{text}</p></div></article>
);

function Word({ children, p, a, b }: { children: ReactNode; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.16, 1]); return <motion.span style={{ opacity: o }}>{children}</motion.span>;
}
function Statement({ text, zh }: { text: string; zh: boolean }) {
  const r = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: p } = useScroll({ target: r, offset: ['start 0.85', 'end 0.55'] });
  const w = zh ? [...text] : text.split(' ');
  return <p className="statement" ref={r}>{w.map((x, i) => <Word key={i} p={p} a={i / w.length} b={(i + 1) / w.length}>{x}{zh ? '' : ' '}</Word>)}</p>;
}

function Contact({ c }: { c: typeof T.en }) {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const body = `${f.get('msg')}\n\n— ${f.get('name')} (${f.get('how')})`;
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('NEURA — ' + f.get('name'))}&body=${encodeURIComponent(body)}`; setSent(true);
  };
  return (
    <section id="contact" className="contact"><div className="wrap cgrid">
      <div>
        <h2>{c.contactTitle.map(l => <span key={l} className="mask"><motion.span initial={{ y: '115%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>{l}</motion.span></span>)}</h2>
        <p className="cbody">{c.contactBody}</p>
        <div className="clinks"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><a href={CONTACT.telegram} target="_blank" rel="noreferrer">{CONTACT.telegramLabel}</a></div>
      </div>
      <form onSubmit={submit}>
        <input name="name" placeholder={c.name} required /><input name="how" placeholder={c.how} required />
        <textarea name="msg" placeholder={c.msg} rows={3} required />
        <Magnetic><button className="btn gold">{c.send}<Arrow /></button></Magnetic>
        {sent && <p className="sent">{c.sent}</p>}
      </form>
    </div></section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => ((localStorage.getItem('lang') as Lang) || (navigator.language.startsWith('zh') ? 'zh' : navigator.language.startsWith('ru') ? 'ru' : 'en')));
  const [ready, setReady] = useState(false); const [scrolled, setScrolled] = useState(false);
  const lenis = useRef<Lenis>(); const c = T[lang];
  useEffect(() => {
    const l = new Lenis({ lerp: 0.085, smoothWheel: !matchMedia('(prefers-reduced-motion: reduce)').matches }); lenis.current = l; l.stop();
    let id = 0; const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); }; id = requestAnimationFrame(raf);
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]'); if (!a) return;
      e.preventDefault(); const h = a.getAttribute('href')!; l.scrollTo(h === '#' ? 0 : h, { duration: 1.5 });
    };
    const sc = () => setScrolled(scrollY > 40);
    document.addEventListener('click', click); addEventListener('scroll', sc, { passive: true });
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', click); removeEventListener('scroll', sc); l.destroy(); };
  }, []);
  useEffect(() => { ready ? lenis.current?.start() : lenis.current?.stop(); }, [ready]);
  useEffect(() => {
    localStorage.setItem('lang', lang); document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang; document.title = c.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.seoDesc);
  }, [lang, c]);
  return (
    <MotionConfig reducedMotion="user">
      <div className={`site ${lang}`}>
        <AnimatePresence>{!ready && <Preloader done={() => setReady(true)} />}</AnimatePresence>
        <Header lang={lang} setLang={setLang} scrolled={scrolled} />
        <main>
          <Hero lang={lang} ready={ready} />
          <section id="work" className="work"><div className="wrap">
            <div className="head"><h2>{c.workTitle}</h2><p>{c.workIntro}</p></div>
            <Binhai c={c} />
            <div className="concepts">
              <Concept kind="orbit" name={c.orbit[0]} text={c.orbit[1]} tag={c.concept} />
              <Concept kind="atlas" name={c.atlas[0]} text={c.atlas[1]} tag={c.concept} />
            </div>
          </div></section>
          <section id="studio" className="studio"><div className="wrap">
            <Statement key={lang} text={c.statement} zh={lang === 'zh'} />
            <div className="facts">{c.facts.map(([t, d]) => <div key={t}><h4>{t}</h4><p>{d}</p></div>)}</div>
          </div></section>
          <section id="process" className="process"><div className="wrap">
            <h2>{c.processTitle}</h2>
            <div className="steps">{c.steps.map(([t, d], i) => (
              <div key={t}><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.5, delay: i * 0.18, ease }} />
                <span className="n">{i + 1}</span><h4>{t}</h4><p>{d}</p></div>
            ))}</div>
          </div></section>
          <Contact c={c} />
        </main>
        <footer><div className="wrap"><span className="logo"><span className="logo-mark" />NEURA</span><span>{c.footer} · 2026</span></div></footer>
      </div>
    </MotionConfig>
  );
}
