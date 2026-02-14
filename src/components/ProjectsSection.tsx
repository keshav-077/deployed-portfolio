import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          A showcase of AI systems built across research and production environments
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 gradient-border group hover:glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg leading-tight">{p.title}</h3>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors shrink-0 ml-2"
                  aria-label={`GitHub repo for ${p.title}`}
                >
                  <Github size={20} />
                </a>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
