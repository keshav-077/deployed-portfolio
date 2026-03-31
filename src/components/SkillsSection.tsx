import { Code, Brain, Layers, Cloud, Wrench, Zap, Cpu, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    gradient: "from-[hsl(250,80%,65%)] to-[hsl(280,70%,55%)]",
    glowColor: "hsl(250 80% 65% / 0.15)",
    skills: ["Python", "R", "SQL", "C", "C++"],
  },
  {
    title: "Gen AI & CV, NLP",
    icon: Brain,
    gradient: "from-[hsl(190,90%,50%)] to-[hsl(220,90%,60%)]",
    glowColor: "hsl(190 90% 50% / 0.15)",
    skills: ["LLMs", "LangChain", "RAG", "LangGraph", "AutoGen", "Hugging Face Transformers", "GANs", "Diffusion Models", "VAEs", "MLOps", "OCR", "VLM", "RLHF"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    gradient: "from-[hsl(280,70%,55%)] to-[hsl(310,60%,50%)]",
    glowColor: "hsl(280 70% 55% / 0.15)",
    skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "OpenCV", "Seaborn", "NLTK", "SpaCy", "Gensim", "Flask", "Keras", "TensorFlow", "PyTorch", "FastAPI", "React JS", "Django", "Spark", "Hadoop", "MXNet", "Caffe", "ROS", "Streamlit", "Gradio", "RESTful API", "Node.js", "HTML", "CSS", "JavaScript", "GraphQL", "Postgres", "Kubernetes"],
  },
  {
    title: "Cloud & Databases",
    icon: Cloud,
    gradient: "from-[hsl(210,90%,55%)] to-[hsl(190,90%,50%)]",
    glowColor: "hsl(210 90% 55% / 0.15)",
    skills: ["AWS", "Azure", "Google Cloud Platform (GCP)", "MySQL", "XAMPP", "VectorDB"],
  },
  {
    title: "Developer Tools",
    icon: Wrench,
    gradient: "from-[hsl(45,90%,55%)] to-[hsl(25,85%,55%)]",
    glowColor: "hsl(45 90% 55% / 0.12)",
    skills: ["Git/GitHub", "VS Code", "Jupyter Notebook", "Power BI", "Google Dialogflow", "Kaggle API", "Linux", "MATLAB", "CI/CD", "Docker", "Redis"],
  },
  {
    title: "AI Dev & Automation",
    icon: Zap,
    gradient: "from-[hsl(150,70%,45%)] to-[hsl(180,70%,40%)]",
    glowColor: "hsl(150 70% 45% / 0.12)",
    skills: ["Workato", "n8n", "Cursor", "Windsurf", "Copilot", "Kiro", "Antigravity"],
  },
  {
    title: "GPU / Accelerated Computing",
    icon: Cpu,
    gradient: "from-[hsl(0,75%,55%)] to-[hsl(330,70%,50%)]",
    glowColor: "hsl(0 75% 55% / 0.12)",
    skills: ["CUDA (Python)", "CUDA (C/C++)", "Parallel Computing", "OpenMP", "MPI"],
  },
];

const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="Skills &" highlight="Expertise" subtitle="Tech Stack" isVisible={isVisible} />

        {/* Stats bar */}
        <div
          className={`flex justify-center gap-8 sm:gap-16 mb-14 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-black gradient-text">{skillCategories.length}</span>
            <p className="text-xs text-muted-foreground mt-1">Categories</p>
          </div>
          <div className="w-px bg-border/50" />
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-black gradient-text">{totalSkills}+</span>
            <p className="text-xs text-muted-foreground mt-1">Technologies</p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const isExpanded = expandedIndex === i;
            const visibleSkills = isExpanded ? cat.skills : cat.skills.slice(0, 8);
            const hasMore = cat.skills.length > 8;

            return (
              <div
                key={cat.title}
                className={`group relative rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 cursor-default ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${
                  // Make Frameworks span 2 cols on lg
                  i === 2 ? "lg:col-span-2" : ""
                }`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                {/* Card background with gradient border on hover */}
                <div className="absolute inset-0 bg-card/60 backdrop-blur-xl" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cat.glowColor}, transparent 40%)` }}
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cat.gradient} pointer-events-none`} style={{ opacity: 0 }} />

                {/* Gradient top accent line */}
                <div className={`h-[2px] bg-gradient-to-r ${cat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient} shadow-lg`}>
                      <cat.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{cat.title}</h3>
                      <span className="text-xs text-muted-foreground">{cat.skills.length} skills</span>
                    </div>
                  </div>

                  {/* Skills as pills */}
                  <div className="flex flex-wrap gap-2">
                    {visibleSkills.map((skill, si) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/80 text-foreground border border-border/40 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_12px_-3px_hsl(250_80%_65%/0.3)] transition-all duration-300 cursor-default"
                        style={{
                          animationDelay: `${si * 30}ms`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {hasMore && !isExpanded && (
                      <button
                        onClick={() => setExpandedIndex(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${cat.gradient} text-white flex items-center gap-1 hover:opacity-80 transition-opacity`}
                      >
                        +{cat.skills.length - 8} more <ChevronRight size={12} />
                      </button>
                    )}
                    {hasMore && isExpanded && (
                      <button
                        onClick={() => setExpandedIndex(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
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
