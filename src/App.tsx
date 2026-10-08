import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, MotionValue, animate, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
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

function Header({ lang, setLang, scrolled }: { lang: Lang; setLang: (l: Lang) => void; scrolled: boolean }) {
  const [open, setOpen] = useState(false); const c = T[lang];
  const ids = ['#work', '#studio', '#process', '#contact'];
  return (
    <header className={`hd ${scrolled ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <a href="#" className="logo" onClick={() => setOpen(false)}><span className="logo-mark" />NEURA</a>
      <nav>{c.nav.map((n, i) => <a key={n} className="roll" href={ids[i]} onClick={() => setOpen(false)}><span data-t={n}>{n}</span></a>)}</nav>
      <div className="hd-r">
        <div className="langs">{(['en', 'ru', 'zh'] as Lang[]).map(l => <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}>{l === 'zh' ? '中文' : l.toUpperCase()}</button>)}</div>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  );
}

function HLine({ l, i, ready, sp }: { l: string; i: number; ready: boolean; sp: MotionValue<number> }) {
  const x = useTransform(sp, [-0.5, 0.5], [(i - 1) * 24, (1 - i) * 24]);
  return <span className="mask"><motion.span className="hl" style={{ x }}><motion.span className="hl" initial={{ y: '115%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.3, delay: 0.15 + i * 0.13, ease }}>{l}</motion.span></motion.span></span>;
}
function Hero({ lang, ready }: { lang: Lang; ready: boolean }) {
  const c = T[lang]; const px = useMotionValue(0), sp = useSpring(px, { stiffness: 60, damping: 20 });
  useEffect(() => { const m = (e: PointerEvent) => px.set(e.clientX / innerWidth - 0.5); addEventListener('pointermove', m); return () => removeEventListener('pointermove', m); }, []);
  const rise = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 1.1, delay: d, ease } });
  return (
    <section className="hero"><div className="wrap">
      <h1 key={lang}>{c.title.map((l, i) => <HLine key={l} l={l} i={i} ready={ready} sp={sp} />)}</h1>
      <div className="hero-foot">
        <motion.p {...rise(0.8)}>{c.lead}</motion.p>
        <motion.div className="hero-cta" {...rise(1)}><Magnetic><a className="btn" href="#contact">{c.cta}<Arrow /></a></Magnetic><a className="link" href="#work">{c.more}</a></motion.div>
      </div>
      <div className="svc">{c.marquee.map(m => <span key={m}>{m}</span>)}</div>
    </div></section>
  );
}

function Binhai({ c }: { c: typeof T.en }) {
  const r = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: r, offset: ['start end', 'start 0.2'] });
  const scale = useTransform(p, [0, 1], [0.72, 1]), rad = useTransform(p, [0, 1], [56, 14]);
  return (
    <article className="case">
      <div className="case-copy"><div><span className="tag">{c.real}</span><h3>{c.binhai[0]}</h3></div><div><p>{c.binhai[1]}</p><a className="link" href={BINHAI_URL} target="_blank" rel="noreferrer">{c.open}<Arrow /></a></div></div>
      <div ref={r}><motion.a className="frame" style={{ scale, borderRadius: rad }} href={BINHAI_URL} target="_blank" rel="noreferrer" data-cursor={c.open} aria-label="binhaiauto.ru">
        <div className="bar"><i /><i /><i /><span>binhaiauto.ru</span></div><Img k="site" alt="binhaiauto.ru" />
      </motion.a></div>
    </article>
  );
}

function Cursor() {
  const x = useMotionValue(-99), y = useMotionValue(-99); const [t, setT] = useState(''); const [hot, setHot] = useState(false);
  useEffect(() => {
    const m = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); const el = (e.target as HTMLElement).closest('[data-cursor],a,button'); setT(el?.getAttribute('data-cursor') || ''); setHot(!!el); };
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m);
  }, []);
  return <motion.div className={`cur ${hot ? 'hot' : ''} ${t ? 'lbl' : ''}`} style={{ x, y }}><i /><span>{t}</span></motion.div>;
}

function Round({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  const r = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: r, offset: ['start end', 'start 0.4'] });
  const rad = useTransform(p, [0, 1], [110, 0]);
  return <motion.section id={id} ref={r} className={className} style={{ borderTopLeftRadius: rad, borderTopRightRadius: rad }}>{children}</motion.section>;
}

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
  const [sent, setSent] = useState(false); const [qr, setQr] = useState(false);
  useEffect(() => { const i = new Image(); i.onload = () => setQr(true); i.src = '/images/wechat-qr.webp'; }, []);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const body = `${f.get('msg')}\n\n— ${f.get('name')} (${f.get('how')})`;
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('NEURA — ' + f.get('name'))}&body=${encodeURIComponent(body)}`; setSent(true);
  };
  return (
    <Round id="contact" className="contact dark"><div className="wrap cgrid">
      <div>
        <h2>{c.contactTitle.map(l => <span key={l} className="mask"><motion.span initial={{ y: '115%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>{l}</motion.span></span>)}</h2>
        <p className="cbody">{c.contactBody}</p>
        <div className="clinks"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><a href={CONTACT.telegram} target="_blank" rel="noreferrer">{CONTACT.telegramLabel}</a></div>
        {qr && <div className="qr"><img src="/images/wechat-qr.webp" alt="WeChat" width="132" height="132" /><span>{c.wechat}{CONTACT.wechatId && <b>{CONTACT.wechatId}</b>}</span></div>}
      </div>
      <form onSubmit={submit}>
        <input name="name" placeholder={c.name} required /><input name="how" placeholder={c.how} required />
        <textarea name="msg" placeholder={c.msg} rows={3} required />
        <Magnetic><button className="btn gold">{c.send}<Arrow /></button></Magnetic>
        {sent && <p className="sent">{c.sent}</p>}
      </form>
    </div></Round>
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
        <Cursor /><AnimatePresence>{!ready && <Preloader done={() => setReady(true)} />}</AnimatePresence>
        <Header lang={lang} setLang={setLang} scrolled={scrolled} />
        <main>
          <Hero lang={lang} ready={ready} />
          <Round id="work" className="work dark"><div className="wrap">
            <div className="head"><h2>{c.workTitle}</h2><p>{c.workIntro}</p></div>
            <Binhai c={c} />
            <a className="next" href="#contact"><h3>{c.nextTitle}</h3><span className="link dark">{c.cta}<Arrow /></span></a>
          </div></Round>
          <section id="studio" className="studio"><div className="wrap">
            <Statement key={lang} text={c.statement} zh={lang === 'zh'} />
            <div className="facts">{c.facts.map(([t, d]) => <div key={t}><h4>{t}</h4><p>{d}</p></div>)}</div>
          </div></section>
          <section id="process" className="process"><div className="wrap">
            <h2>{c.processTitle}</h2>
            <div className="steps">{c.steps.map(([t, d], i) => <div key={t} className="step" style={{ top: `${96 + i * 24}px` }}><span className="n">{i + 1}</span><div><h4>{t}</h4><p>{d}</p></div></div>)}</div>
          </div></section>
          <Contact c={c} />
        </main>
        <footer className="dark"><div className="wrap"><span className="logo"><span className="logo-mark" />NEURA</span><span>{c.footer} · 2026</span></div></footer>
      </div>
    </MotionConfig>
  );
}
