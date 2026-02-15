import { GraduationCap, Target, Sparkles, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const stats = [
  { label: "Projects Built", value: "10+", icon: Sparkles },
  { label: "Internships", value: "3", icon: TrendingUp },
  { label: "Publications", value: "1", icon: Target },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="About" highlight="Me" subtitle="Who I Am" isVisible={isVisible} />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Bio - spans 2 cols */}
          <div
            className={`md:col-span-2 group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Spotlight hover effect */}
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

          {/* Stats column */}
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

        {/* Education row */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            {
              degree: "B.Tech in CSE (AI & ML)",
              school: "IIIT Nagpur",
              period: "2022 – 2026",
              desc: "Specializing in Artificial Intelligence & Machine Learning with hands-on research experience in generative models and computer vision.",
              color: "primary" as const,
            },
            {
              degree: "MBA (PGPMCI)",
              school: "IIM Visakhapatnam",
              period: "2026 – 2028",
              desc: "Incoming MBA student, bridging AI expertise with business strategy and leadership.",
              color: "accent" as const,
            },
          ].map((edu, i) => (
            <div
              key={edu.degree}
              className={`group relative glass rounded-2xl p-6 border border-border/50 overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${500 + i * 100}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${edu.color === "primary" ? "bg-primary/10" : "bg-accent/10"}`}>
                  <GraduationCap className={edu.color === "primary" ? "text-primary" : "text-accent"} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-accent text-sm font-medium">{edu.school}</p>
                  <p className="text-muted-foreground text-sm mt-1">{edu.period}</p>
                  <p className="text-muted-foreground text-sm mt-2">{edu.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vision banner */}
        <div
          className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden text-center transition-all duration-700 delay-[700ms] ${
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
