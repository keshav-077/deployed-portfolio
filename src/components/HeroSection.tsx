import { useEffect, useRef, useState, useCallback } from "react";

// Neural network canvas animation
const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number; pulse: number; pulseSpeed: number }[]>([]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const nodes = nodesRef.current;

    ctx.clearRect(0, 0, w, h);

    // Update & draw connections
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      a.pulse += a.pulseSpeed;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const alpha = (1 - dist / 200) * 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          gradient.addColorStop(0, `hsla(250, 80%, 65%, ${alpha})`);
          gradient.addColorStop(1, `hsla(190, 90%, 50%, ${alpha})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      const glow = 0.5 + 0.5 * Math.sin(node.pulse);
      const r = node.radius * (1 + glow * 0.3);

      // Outer glow
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
      grad.addColorStop(0, `hsla(250, 80%, 65%, ${0.15 * glow})`);
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(220, 90%, ${60 + glow * 20}%, ${0.6 + glow * 0.4})`;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    // Create nodes
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const count = Math.min(60, Math.floor((w * h) / 8000));
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 2 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.03,
    }));

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};

// Floating AI head silhouette built with CSS
const AIEngineerVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Neural network animation */}
    <NeuralNetworkCanvas />

    {/* Central brain/chip icon */}
    <div className="relative z-10 flex flex-col items-center gap-4">
      {/* Glowing circuit brain */}
      <div className="relative">
        <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full border border-primary/30 flex items-center justify-center relative">
          {/* Orbiting rings */}
          <div className="absolute inset-[-20px] rounded-full border border-accent/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-40px] rounded-full border border-primary/10 animate-[spin_30s_linear_infinite_reverse]" />
          <div className="absolute inset-[-60px] rounded-full border border-accent/5 animate-[spin_40s_linear_infinite]" />

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-glow" />

          {/* AI chip icon */}
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36" fill="none">
            {/* Central processor */}
            <rect x="30" y="30" width="40" height="40" rx="6" stroke="url(#grad)" strokeWidth="1.5" opacity="0.8" />
            <rect x="38" y="38" width="24" height="24" rx="3" stroke="url(#grad)" strokeWidth="1" opacity="0.6" />
            {/* Connection pins */}
            {[35, 50, 65].map((pos) => (
              <g key={pos}>
                <line x1={pos} y1="30" x2={pos} y2="18" stroke="url(#grad)" strokeWidth="1" opacity="0.5" />
                <line x1={pos} y1="70" x2={pos} y2="82" stroke="url(#grad)" strokeWidth="1" opacity="0.5" />
                <line x1="30" y1={pos} x2="18" y2={pos} stroke="url(#grad)" strokeWidth="1" opacity="0.5" />
                <line x1="70" y1={pos} x2="82" y2={pos} stroke="url(#grad)" strokeWidth="1" opacity="0.5" />
                {/* Pin dots */}
                <circle cx={pos} cy="16" r="1.5" fill="hsl(190, 90%, 50%)" opacity="0.6" />
                <circle cx={pos} cy="84" r="1.5" fill="hsl(250, 80%, 65%)" opacity="0.6" />
                <circle cx="16" cy={pos} r="1.5" fill="hsl(190, 90%, 50%)" opacity="0.6" />
                <circle cx="84" cy={pos} r="1.5" fill="hsl(250, 80%, 65%)" opacity="0.6" />
              </g>
            ))}
            {/* Brain pattern inside */}
            <path d="M42 45 Q50 40 58 45 Q55 50 50 48 Q45 50 42 45Z" stroke="url(#grad)" strokeWidth="0.8" opacity="0.5" />
            <path d="M42 55 Q50 60 58 55 Q55 50 50 52 Q45 50 42 55Z" stroke="url(#grad)" strokeWidth="0.8" opacity="0.5" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(250, 80%, 65%)" />
                <stop offset="100%" stopColor="hsl(190, 90%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating data particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/60"
            style={{
              top: `${20 + Math.sin(i * 1.05) * 40}%`,
              left: `${20 + Math.cos(i * 1.05) * 40}%`,
              animation: `float ${4 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [, setInView] = useState(false);

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
      className="relative h-screen flex flex-col overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2] pointer-events-none" />

      {/* AI Animation - fills the hero */}
      <div className="absolute inset-0 z-0">
        <AIEngineerVisual />
      </div>

      {/* Social links - right side */}
      <div className="hidden md:flex flex-col gap-5 fixed right-8 top-1/2 -translate-y-1/2 z-20 text-xs tracking-widest text-muted-foreground">
        <a href="https://github.com/keshav-077" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GH</a>
        <a href="#" className="hover:text-accent transition-colors">LI</a>
        <a href="mailto:keshavardhan777@gmail.com" className="hover:text-accent transition-colors">EM</a>
      </div>

      {/* "PORTFOLIO" vertical text - left side */}
      <div className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-20">
        <span className="text-xs tracking-[0.3em] text-muted-foreground/60 [writing-mode:vertical-lr] rotate-180">
          PORTFOLIO
        </span>
      </div>

      {/* Bottom content overlay */}
      <div className="relative z-10 mt-auto px-6 sm:px-10 pb-10 sm:pb-16">
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light tracking-wide mb-2 sm:mb-4 animate-fade-in-up">
          AI Engineer &amp; Generative AI | Multi-Agent Systems | ML Researcher
        </p>

        {/* Giant name */}
        <h1 className="text-[clamp(2.5rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter text-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          KESHAVARDHAN
          <br />
          <span className="gradient-text">MAKIREDDI</span>
        </h1>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 mt-6 sm:mt-8 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <a
            href="#projects"
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="#"
            className="px-5 py-2.5 text-sm font-medium rounded-lg glass gradient-border text-foreground hover:bg-secondary/60 transition-colors"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-sm font-medium rounded-lg glass gradient-border text-foreground hover:bg-secondary/60 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
