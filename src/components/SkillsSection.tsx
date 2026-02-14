import { Code, Brain, Layers, Cloud, Wrench, Zap } from "lucide-react";

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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Skills & <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Technologies and tools I work with daily
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 gradient-border hover:glow transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <cat.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-semibold text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/80 text-foreground border border-border/50 hover:border-primary/40 transition-colors"
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
