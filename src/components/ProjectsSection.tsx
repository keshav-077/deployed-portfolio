import { Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const categories = ["All", "AI/ML", "Computer Vision", "NLP", "GenAI", "Other"];

const projects = [
  {
    title: "AI-Driven Border Security System",
    desc: "Real-time weapon detection and face recognition pipeline for border security, combining YOLOv8 object detection with OSNet re-identification for high-accuracy threat monitoring.",
    tags: ["YOLOv8", "OSNet", "OpenCV", "Python"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "DeepFake Detection System",
    desc: "Robust deepfake video detection framework fusing EfficientNet-B0 spatial features with BiLSTM temporal modeling to identify manipulated media with high accuracy.",
    tags: ["EfficientNet", "BiLSTM", "PyTorch", "CNN"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "DontCaught — Stealth AI Assistant",
    desc: "Lightweight desktop AI assistant built with Tauri and React, featuring a translucent overlay invisible to video calls and screen recordings while providing real-time AI-powered assistance.",
    tags: ["Tauri", "React", "AI", "Desktop"],
    category: "Other",
    github: "https://github.com/keshav-077/Dontcaught-AI-assistant",
  },
  {
    title: "Language Translation & Summarization",
    desc: "End-to-end multi-language translation and text summarization pipeline leveraging mBART for translation and Pegasus for abstractive summarization of long documents.",
    tags: ["mBART", "Pegasus", "HuggingFace", "NLP"],
    category: "NLP",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Source Code Analysis Chatbot",
    desc: "RAG-powered semantic search tool for querying and analyzing large codebases, using LangChain orchestration with FAISS vector stores for contextual code understanding.",
    tags: ["LangChain", "RAG", "FAISS", "GPT"],
    category: "NLP",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Job Application Assistant",
    desc: "Intelligent job hunting automation tool that scrapes listings, auto-generates tailored cover letters, and sends personalized cold emails — eliminating repetitive application workflows.",
    tags: ["Automation", "NLP", "Python", "LLM"],
    category: "Other",
    github: "https://github.com/keshav-077/Job-Application-Assistant-HackByte3.0",
  },
  {
    title: "Object Detection — HackByte",
    desc: "Optimized lightweight object detection pipeline built on YOLOv8s with advanced augmentation strategies and tuned hyperparameters for the HackByte competition dataset.",
    tags: ["YOLOv8s", "Augmentation", "Python", "CV"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077/Duality-HackByte-Object-Detection-using-YOLOv8s",
  },
  {
    title: "Sentiment Analysis Engine",
    desc: "NLP-based sentiment classifier detecting toxic and aggressive language patterns in digital communications, enabling safer online interactions through real-time content moderation.",
    tags: ["NLP", "Classification", "Python", "ML"],
    category: "NLP",
    github: "https://github.com/keshav-077/Sentiment_analysis",
  },
  {
    title: "Image Generation with DCGAN",
    desc: "Deep Convolutional GAN implementation for high-quality image synthesis, utilizing convolutional-transpose layers with progressive training for realistic output generation.",
    tags: ["DCGAN", "PyTorch", "GANs", "CNN"],
    category: "GenAI",
    github: "https://github.com/keshav-077/1mage-Generation-using-DCGAN",
  },
  {
    title: "Digit Generation with VAE",
    desc: "Variational Autoencoder built with TensorFlow/Keras for generating novel MNIST-style digit images through learned latent space representations and probabilistic decoding.",
    tags: ["VAE", "TensorFlow", "Keras", "Generative"],
    category: "GenAI",
    github: "https://github.com/keshav-077/Digit-Generation-Using-VAE",
  },
  {
    title: "Sign Language Detection",
    desc: "Real-time sign language gesture recognition using MediaPipe hand tracking combined with custom CNN architectures for accessible communication assistance.",
    tags: ["MediaPipe", "CNN", "TensorFlow", "OpenCV"],
    category: "Computer Vision",
    github: "https://github.com/keshav-077",
  },
  {
    title: "RL Music Recommendation",
    desc: "Reinforcement learning-based music recommendation engine that dynamically adapts to user listening patterns using reward-driven preference optimization.",
    tags: ["RL", "Python", "Gym", "PyTorch"],
    category: "AI/ML",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Earthquake Prediction Model",
    desc: "Deep learning model for seismic activity forecasting using LSTM networks trained on historical geological data with feature engineering for temporal pattern recognition.",
    tags: ["LSTM", "Scikit-learn", "TensorFlow", "Pandas"],
    category: "AI/ML",
    github: "https://github.com/keshav-077",
  },
  {
    title: "Crop Disease Detection",
    desc: "CNN-based precision agriculture tool for automated crop disease classification from leaf images, enabling early disease intervention and improved farming outcomes.",
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />

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
