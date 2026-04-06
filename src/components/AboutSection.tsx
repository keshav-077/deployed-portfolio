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
  },
  {
    degree: "Bachelor of Technology (B.Tech)",
    program: "Computer Science & Engineering — Specialization in Artificial Intelligence & Machine Learning",
    school: "Indian Institute of Information Technology, Nagpur (IIIT Nagpur)",
    location: "Nagpur, Maharashtra, India",
    period: "2022 – 2026",
    desc: "Specialized in AI & Machine Learning with hands-on research in generative models, computer vision, multi-agent systems, and NLP. Published IEEE research and completed multiple industry internships.",
    link: "https://iiitn.ac.in/",
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeading title="About" highlight="Me" subtitle="Who I Am" isVisible={isVisible} />

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div
            className={`md:col-span-2 group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden transition-all duration-700 delay-100 hover:border-foreground/20 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground/90">
              <Sparkles size={16} className="text-foreground/40" /> My Journey
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              I'm an AI Engineer with deep expertise in Large Language Models, multi-agent systems,
              Retrieval-Augmented Generation (RAG), and computer vision. My journey in AI began during
              my B.Tech at IIIT Nagpur, where I developed a passion for building intelligent systems
              that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
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
                className={`group relative rounded-2xl p-5 bg-card/60 border border-border/40 overflow-hidden flex items-center gap-4 transition-all duration-700 hover:border-foreground/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="p-2.5 rounded-xl bg-foreground/5 shrink-0">
                  <s.icon className="text-foreground/50" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education timeline */}
        <div className="relative mb-8">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent" />

          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={edu.degree}
                className={`group relative pl-16 md:pl-20 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${500 + i * 200}ms` }}
              >
                <div className="absolute left-3.5 md:left-5.5 top-8 w-5 h-5 rounded-full border border-foreground/30 bg-foreground/10 transition-all duration-500 group-hover:scale-125 group-hover:bg-foreground/20" />

                <div className="rounded-2xl p-6 md:p-8 bg-card/60 border border-border/40 overflow-hidden hover:border-foreground/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10">
                      <Calendar size={12} /> {edu.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} /> {edu.location}
                    </span>
                  </div>

                  <h3 className="font-medium text-xl md:text-2xl mb-2 text-foreground/90">{edu.degree}</h3>
                  <p className="text-sm font-medium mb-3 text-foreground/50">{edu.program}</p>

                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-sm mb-4 text-foreground/60 hover:text-foreground/90 transition-colors"
                  >
                    <GraduationCap size={16} />
                    {edu.school}
                    <ExternalLink size={12} />
                  </a>

                  <p className="text-muted-foreground text-sm leading-relaxed">{edu.desc}</p>

                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-foreground/40 hover:text-foreground/70 transition-colors"
                  >
                    Visit Website <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div
          className={`group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden text-center transition-all duration-700 delay-[800ms] hover:border-foreground/20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-foreground/5">
              <Target className="text-foreground/50" size={24} />
            </div>
          </div>
          <h3 className="font-medium text-lg mb-2 text-foreground/90">Career Vision</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            To bridge advanced AI research with real-world scalable products, leading innovation at
            the intersection of generative AI, multi-agent systems, and enterprise intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
