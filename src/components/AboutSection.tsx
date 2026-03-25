import { GraduationCap, Target, Sparkles, TrendingUp, ExternalLink, Calendar, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const stats = [
  { label: "Projects Built", value: "10+", icon: Sparkles },
  { label: "Internships", value: "3", icon: TrendingUp },
  { label: "Publications", value: "1", icon: Target },
];

const education = [
  {
    degree: "Master of Business Administration (MBA)",
    program: "Post Graduate Programme in Management for Career Influencers (PGPMCI)",
    school: "Indian Institute of Management Visakhapatnam (IIM Visakhapatnam)",
    shortName: "IIM Visakhapatnam",
    location: "Visakhapatnam, Andhra Pradesh",
    period: "2026 – 2028",
    desc: "Incoming MBA student, bridging AI expertise with business strategy, leadership, and innovation management.",
    link: "https://www.iimv.ac.in/",
    color: "accent" as const,
  },
  {
    degree: "Bachelor of Technology (B.Tech)",
    program: "Computer Science & Engineering — Specialization in Artificial Intelligence & Machine Learning",
    school: "Indian Institute of Information Technology, Nagpur (IIIT Nagpur)",
    shortName: "IIIT Nagpur",
    location: "Nagpur, Maharashtra",
    period: "2022 – 2026",
    desc: "Specialized in AI & ML with hands-on research experience in generative models, computer vision, and multi-agent systems.",
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="About" highlight="Me" subtitle="Who I Am" isVisible={isVisible} />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Bio */}
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

          {/* Stats */}
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

        {/* Education — stacked cards */}
        <div className="space-y-5 mb-4">
          {education.map((edu, i) => (
            <div
              key={edu.degree}
              className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden transition-all duration-700 hover:border-${edu.color}/30 hover:shadow-[0_0_40px_-8px_hsl(${edu.color === "primary" ? "250_80%_65%" : "190_90%_50%"}/0.18)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${500 + i * 150}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              {/* Decorative corner glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${edu.color === "primary" ? "bg-primary/10" : "bg-accent/10"}`} />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-5">
                <div className={`p-4 rounded-2xl shrink-0 ${edu.color === "primary" ? "bg-primary/10 group-hover:bg-primary/20" : "bg-accent/10 group-hover:bg-accent/20"} transition-colors`}>
                  <GraduationCap className={edu.color === "primary" ? "text-primary" : "text-accent"} size={28} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl mb-1">{edu.degree}</h3>
                  <p className={`text-sm font-semibold mb-2 ${edu.color === "primary" ? "text-primary" : "text-accent"}`}>
                    {edu.program}
                  </p>

                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 font-medium mb-3 transition-colors ${edu.color === "primary" ? "text-primary hover:text-primary/80" : "text-accent hover:text-accent/80"}`}
                  >
                    {edu.school} <ExternalLink size={14} />
                  </a>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} /> {edu.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{edu.desc}</p>
                </div>
              </div>
            </div>
          ))}
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
