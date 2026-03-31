import { GraduationCap, Target, Sparkles, TrendingUp, ExternalLink, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const stats = [
  { label: "Projects Built", value: "20+", icon: Sparkles },
  { label: "Internships", value: "3", icon: TrendingUp },
  { label: "Publications", value: "1", icon: Target },
];

const education = [
  {
    degree: "Master of Business Administration (MBA)",
    program: "Post Graduate Programme in Management for Career Influencers (PGPMCI)",
    school: "Indian Institute of Management Visakhapatnam (IIM Visakhapatnam)",
    location: "Visakhapatnam, Andhra Pradesh, India",
    period: "2026 – 2028",
    desc: "Incoming MBA student at one of India's premier management institutes, bridging deep AI/ML expertise with business strategy, leadership, and innovation management to drive technology-driven enterprise transformation.",
    link: "https://www.iimv.ac.in/",
    color: "accent" as const,
  },
  {
    degree: "Bachelor of Technology (B.Tech)",
    program: "Computer Science & Engineering — Specialization in Artificial Intelligence & Machine Learning",
    school: "Indian Institute of Information Technology, Nagpur (IIIT Nagpur)",
    location: "Nagpur, Maharashtra, India",
    period: "2022 – 2026",
    desc: "Specialized in AI & Machine Learning with hands-on research in generative models, computer vision, multi-agent systems, and NLP. Published IEEE research and completed multiple industry internships.",
    link: "https://iiitn.ac.in/",
    color: "primary" as const,
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <SectionHeading title="About" highlight="Me" subtitle="Who I Am" isVisible={isVisible} />

        {/* Bio + Stats bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div
            className={`md:col-span-2 group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-accent" /> My Journey
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm an AI Engineer with deep expertise in Large Language Models, multi-agent systems,
              Retrieval-Augmented Generation (RAG), and computer vision. My journey in AI began during
              my B.Tech at IIIT Nagpur, where I developed a passion for building intelligent systems
              that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From designing diffusion-GAN hybrid architectures to building production multi-agent
              platforms, I thrive at the intersection of research and engineering. I've worked across
              diverse domains — border security, healthcare, NLP, and automation — always focused on
              creating scalable, impactful solutions.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`group relative glass rounded-2xl p-5 border border-border/50 overflow-hidden flex items-center gap-4 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <s.icon className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education — vertical timeline */}
        <div className="relative mb-8">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-primary/50 to-transparent" />

          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={edu.degree}
                className={`group relative pl-16 md:pl-20 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${500 + i * 200}ms` }}
              >
                {/* Timeline node */}
                <div className={`absolute left-3.5 md:left-5.5 top-8 w-5 h-5 rounded-full border-2 ${edu.color === "accent" ? "border-accent bg-accent/20" : "border-primary bg-primary/20"} shadow-[0_0_15px_2px] ${edu.color === "accent" ? "shadow-accent/30" : "shadow-primary/30"} transition-all duration-500 group-hover:scale-125`} />

                <div className={`glass rounded-2xl p-6 md:p-8 border border-border/50 overflow-hidden hover:border-${edu.color}/30 transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(${edu.color === "primary" ? "250_80%_65%" : "190_90%_50%"}/0.2)] hover:-translate-y-1`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Period badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${edu.color === "accent" ? "bg-accent/10 text-accent border border-accent/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                        <Calendar size={12} /> {edu.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} /> {edu.location}
                      </span>
                    </div>

                    {/* Degree */}
                    <h3 className="font-bold text-xl md:text-2xl mb-2">{edu.degree}</h3>

                    {/* Program */}
                    <p className={`text-sm font-semibold mb-3 ${edu.color === "primary" ? "text-primary" : "text-accent"}`}>
                      {edu.program}
                    </p>

                    {/* School with link */}
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 font-semibold text-base mb-4 transition-all duration-300 hover:-translate-x-[-4px] ${edu.color === "primary" ? "text-primary hover:text-primary/80" : "text-accent hover:text-accent/80"}`}
                    >
                      <GraduationCap size={18} />
                      {edu.school}
                      <ExternalLink size={14} />
                    </a>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">{edu.desc}</p>

                    {/* Visit link */}
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-colors ${edu.color === "primary" ? "text-primary/70 hover:text-primary" : "text-accent/70 hover:text-accent"}`}
                    >
                      Visit Website <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision banner */}
        <div
          className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden text-center transition-all duration-700 delay-[800ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="text-primary" size={24} />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Career Vision</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            To bridge advanced AI research with real-world scalable products, leading innovation at
            the intersection of generative AI, multi-agent systems, and enterprise intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
