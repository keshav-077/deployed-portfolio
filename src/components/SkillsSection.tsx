import { Code, Brain, Layers, Cloud, Wrench, Zap, Cpu, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "R", "SQL", "C", "C++"],
  },
  {
    title: "Gen AI & CV, NLP",
    icon: Brain,
    skills: ["LLMs", "LangChain", "RAG", "LangGraph", "AutoGen", "Hugging Face Transformers", "GANs", "Diffusion Models", "VAEs", "MLOps", "OCR", "VLM", "RLHF"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "OpenCV", "Seaborn", "NLTK", "SpaCy", "Gensim", "Flask", "Keras", "TensorFlow", "PyTorch", "FastAPI", "React JS", "Django", "Spark", "Hadoop", "MXNet", "Caffe", "ROS", "Streamlit", "Gradio", "RESTful API", "Node.js", "HTML", "CSS", "JavaScript", "GraphQL", "Postgres", "Kubernetes"],
  },
  {
    title: "Cloud & Databases",
    icon: Cloud,
    skills: ["AWS", "Azure", "Google Cloud Platform (GCP)", "MySQL", "XAMPP", "VectorDB"],
  },
  {
    title: "Developer Tools",
    icon: Wrench,
    skills: ["Git/GitHub", "VS Code", "Jupyter Notebook", "Power BI", "Google Dialogflow", "Kaggle API", "Linux", "MATLAB", "CI/CD", "Docker", "Redis"],
  },
  {
    title: "AI Dev & Automation",
    icon: Zap,
    skills: ["Workato", "n8n", "Cursor", "Windsurf", "Copilot", "Kiro", "Antigravity"],
  },
  {
    title: "GPU / Accelerated Computing",
    icon: Cpu,
    skills: ["CUDA (Python)", "CUDA (C/C++)", "Parallel Computing", "OpenMP", "MPI"],
  },
];

const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading title="Skills &" highlight="Expertise" subtitle="Tech Stack" isVisible={isVisible} />

        {/* Stats bar */}
        <div
          className={`flex justify-center gap-8 sm:gap-16 mb-14 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-semibold text-foreground">{skillCategories.length}</span>
            <p className="text-xs text-muted-foreground mt-1">Categories</p>
          </div>
          <div className="w-px bg-foreground/10" />
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-semibold text-foreground">{totalSkills}+</span>
            <p className="text-xs text-muted-foreground mt-1">Technologies</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const isExpanded = expandedIndex === i;
            const visibleSkills = isExpanded ? cat.skills : cat.skills.slice(0, 8);
            const hasMore = cat.skills.length > 8;

            return (
              <div
                key={cat.title}
                className={`group relative rounded-2xl border border-border/40 overflow-hidden transition-all duration-500 hover:border-foreground/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${i === 2 ? "lg:col-span-2" : ""}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="absolute inset-0 bg-card/60" />

                {/* Top accent line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-foreground/5 border border-foreground/10">
                      <cat.icon className="text-foreground/50" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-foreground/90">{cat.title}</h3>
                      <span className="text-xs text-muted-foreground">{cat.skills.length} skills</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/5 text-foreground/60 border border-foreground/10 hover:border-foreground/25 hover:text-foreground/80 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                    {hasMore && !isExpanded && (
                      <button
                        onClick={() => setExpandedIndex(i)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground/70 flex items-center gap-1 hover:bg-foreground/15 transition-all"
                      >
                        +{cat.skills.length - 8} more <ChevronRight size={12} />
                      </button>
                    )}
                    {hasMore && isExpanded && (
                      <button
                        onClick={() => setExpandedIndex(null)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-foreground/10 text-muted-foreground hover:text-foreground/70 transition-colors"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
