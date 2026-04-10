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
    title: "Progressive GAN Implementation",
    desc: "Progressive Growing GAN for high-resolution image synthesis with smooth layer transitions, scaling from 4×4 to 256×256 resolution through incremental network growth.",
    tags: ["PyTorch", "GANs", "Progressive Training", "CNN"],
    category: "GenAI",
    github: "https://github.com/keshav-077/Progressive-GAN-Implementation",
  },
  {
    title: "Wasserstein GAN (WGAN)",
    desc: "Wasserstein GAN implementation leveraging Earth Mover's distance for stable adversarial training and high-quality image generation with improved convergence.",
    tags: ["WGAN", "PyTorch", "GANs", "Optimization"],
    category: "GenAI",
    github: "https://github.com/keshav-077/WGAN-GAN-Implementation",
  },
  {
    title: "Super-Resolution GAN (SRGAN)",
    desc: "Photo-realistic single image super-resolution using perceptual loss and adversarial training, achieving 4× upscaling with sharp, natural detail recovery.",
    tags: ["SRGAN", "PyTorch", "Super-Resolution", "CNN"],
    category: "GenAI",
    github: "https://github.com/keshav-077/Super-Resolution-GAN-SRGAN",
  },
  {
    title: "CycleGAN Image Translation",
    desc: "Unpaired image-to-image translation using Cycle-Consistent Adversarial Networks for seamless domain transformation without paired training data.",
    tags: ["CycleGAN", "PyTorch", "Image Translation", "GANs"],
    category: "GenAI",
    github: "https://github.com/keshav-077/CycleGAN-Image-Translation",
  },
  {
    title: "Diffusion Models (DDPM)",
    desc: "State-of-the-art image generation using Denoising Diffusion Probabilistic Models with TensorFlow, implementing iterative noise removal for high-fidelity synthesis.",
    tags: ["DDPM", "TensorFlow", "Diffusion", "Generative"],
    category: "GenAI",
    github: "https://github.com/keshav-077/Diffusion-Models-Implementation",
  },
  {
    title: "CloudStack Messenger",
    desc: "Modern cloud-native messaging platform built with React, Go, PostgreSQL, Redis & Nginx — full-stack microservices architecture with Docker containerized deployment.",
    tags: ["React", "Go", "Docker", "Microservices"],
    category: "Other",
    github: "https://github.com/keshav-077/cloudstack-messenger",
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
  {
    title: "Clothes Inpainting with SAM",
    desc: "AI-powered clothes replacement pipeline combining Meta's Segment Anything Model for precise garment segmentation with Stable Diffusion for photorealistic inpainting and outfit generation.",
    tags: ["SAM", "Stable Diffusion", "Inpainting", "Python"],
    category: "GenAI",
    github: "https://github.com/keshav-077/clothes-inpainting-sam",
  },
  {
    title: "Multimodal Generation AI",
    desc: "Multimodal AI image generation system leveraging CLIP for semantic text-image alignment and VQGAN for high-fidelity visual synthesis from natural language prompts.",
    tags: ["CLIP", "VQGAN", "PyTorch", "Multimodal"],
    category: "GenAI",
    github: "https://github.com/keshav-077/multimodal-generation-ai",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const { ref, isVisible } = useScrollReveal();
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
                  ? "bg-foreground text-background"
                  : "bg-card/60 text-muted-foreground hover:text-foreground border border-border/40 hover:border-foreground/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className={`group relative rounded-2xl p-6 bg-card/60 border border-border/40 overflow-hidden transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 60}ms` }}
            >
              <span className="absolute top-4 right-4 text-5xl font-semibold text-foreground/[0.03] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between mb-3 relative z-10">
                <h3 className="font-medium text-base leading-tight pr-8 text-foreground/90">{p.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                {p.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-foreground/5 text-foreground/50 border-foreground/10 hover:bg-foreground/10 transition-colors"
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
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={16} /> Code
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
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
