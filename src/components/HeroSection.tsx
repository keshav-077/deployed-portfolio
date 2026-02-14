import { ArrowDown, FileText, Mail } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Projects", value: 10 },
  { label: "Internships", value: 3 },
  { label: "Publications", value: 1 },
];

const Counter = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [target, inView]);
  return <span>{count}+</span>;
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] animate-pulse-glow" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] animate-grid-move"
          style={{
            backgroundImage: `linear-gradient(hsl(250 80% 65% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(250 80% 65% / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Profile photo */}
        <div className="mx-auto mb-8 w-36 h-36 rounded-full gradient-border p-1 glow">
          <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-4xl font-bold gradient-text">
            KM
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          <span className="gradient-text">Keshavardhan Makireddi</span>
        </h1>

        <p className="text-lg sm:text-xl text-accent font-medium mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          AI Engineer | Generative AI | Multi-Agent Systems | ML Researcher
        </p>

        <p className="max-w-2xl mx-auto text-muted-foreground mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Building production-grade AI systems, multi-agent workflows, and intelligent automation
          solutions. Passionate about bridging cutting-edge research with scalable real-world applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowDown size={18} /> View Projects
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass gradient-border text-foreground font-medium hover:bg-secondary/60 transition-colors"
          >
            <FileText size={18} /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass gradient-border text-foreground font-medium hover:bg-secondary/60 transition-colors"
          >
            <Mail size={18} /> Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                <Counter target={s.value} inView={inView} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
