import { Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const categories = ["All", "AI/ML", "Computer Vision", "NLP", "Other"];

const projects = [
  {
    title: "AI-Driven Border Security System",
    desc: "Real-time weapon detection and face recognition system for enhanced border security using deep learning.",
    tags: ["YOLOv8", "OSNet", "OpenCV", "Python"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "DeepFake Detection",
    desc: "High-accuracy deepfake video detection combining EfficientNet-B0 with BiLSTM temporal analysis.",
    tags: ["EfficientNet", "BiLSTM", "PyTorch", "CNN"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Language Translation & Summarization",
    desc: "Multi-language translation and summarization pipeline leveraging mBART and Pegasus transformer models.",
    tags: ["mBART", "Pegasus", "HuggingFace", "NLP"],
    category: "NLP",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Source Code Analysis Chatbot",
    desc: "RAG-based semantic search tool for analyzing and querying codebases using LangChain and vector stores.",
    tags: ["LangChain", "RAG", "FAISS", "GPT"],
    category: "NLP",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Sign Language Detection",
    desc: "Real-time sign language gesture recognition system using MediaPipe and custom CNN architectures.",
    tags: ["MediaPipe", "CNN", "TensorFlow", "OpenCV"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "RL Music Recommendation",
    desc: "Reinforcement learning-based music recommendation engine adapting to user preferences in real-time.",
    tags: ["RL", "Python", "Gym", "PyTorch"],
    category: "AI/ML",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Earthquake Prediction",
    desc: "Machine learning model for seismic activity prediction using historical geological data and deep learning.",
    tags: ["LSTM", "Scikit-learn", "TensorFlow", "Pandas"],
    category: "AI/ML",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Crop Disease Detection",
    desc: "CNN-based crop disease classification from leaf images to aid precision agriculture and farming decisions.",
    tags: ["CNN", "TensorFlow", "OpenCV", "Agriculture"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const { ref, isVisible } = useScrollReveal();
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="Featured" highlight="Projects" subtitle="My Work" isVisible={isVisible} />

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_-5px_hsl(250_80%_65%/0.4)]"
                  : "glass text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className={`group relative glass rounded-2xl p-6 border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_-10px_hsl(250_80%_65%/0.2)] hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              {/* Spotlight */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />

              {/* Number badge */}
              <span className="absolute top-4 right-4 text-5xl font-black text-foreground/[0.03] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between mb-3 relative z-10">
                <h3 className="font-semibold text-lg leading-tight pr-8">{p.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                {p.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action row */}
              <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-border/30">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <Github size={16} /> Code
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors ml-auto"
                >
                  View <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
