import { Code, Brain, Layers, Cloud, Wrench, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "R", "SQL", "JavaScript", "TypeScript", "C++"],
  },
  {
    title: "AI/ML & Gen AI",
    icon: Brain,
    skills: ["LLMs", "RAG", "LangChain", "LangGraph", "GANs", "Diffusion Models", "Fine-tuning", "LoRA/QLoRA"],
  },
  {
    title: "Frameworks",
    icon: Layers,
    skills: ["PyTorch", "TensorFlow", "OpenCV", "FastAPI", "React", "Django", "HuggingFace", "Scikit-learn"],
  },
  {
    title: "Data & Cloud",
    icon: Cloud,
    skills: ["AWS", "Azure", "GCP", "Spark", "Hadoop", "Vector Databases", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Docker", "Linux", "Power BI", "Kaggle API", "Jupyter", "VS Code"],
  },
  {
    title: "AI Automation",
    icon: Zap,
    skills: ["Workato", "n8n", "MLOps", "CI/CD", "SambaNova Cloud"],
  },
];

// Marquee row for all skills combined
const allSkills = skillCategories.flatMap((c) => c.skills);

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  const skills = reverse ? [...allSkills].reverse() : allSkills;
  const doubled = [...skills, ...skills];

  return (
    <div className="overflow-hidden relative py-2">
      <div
        className={`flex gap-3 whitespace-nowrap ${
          reverse ? "animate-[marquee-reverse_40s_linear_infinite]" : "animate-[marquee_40s_linear_infinite]"
        }`}
      >
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="inline-flex px-4 py-2 rounded-full text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:border-primary/40 hover:bg-primary/10 transition-colors cursor-default shrink-0"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="Skills &" highlight="Expertise" subtitle="Tech Stack" isVisible={isVisible} />

        {/* Marquee showcase */}
        <div
          className={`mb-14 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative glass rounded-2xl p-6 border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(250_80%_65%/0.15)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <cat.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-semibold text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/80 text-foreground border border-border/50 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
