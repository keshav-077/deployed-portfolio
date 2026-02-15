import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    role: "Artificial Intelligence Intern",
    company: "C5i",
    location: "Mumbai",
    period: "Oct 2025 – Apr 2026",
    bullets: [
      "Built production multi-agent systems using LangChain/LangGraph, RAG pipelines, and MLOps",
      "Developed an agentic planner platform for visual workflow creation using GPT-based models",
      "Integrated vector databases and semantic search for enterprise knowledge retrieval",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Infoteck Solutions",
    location: "Remote",
    period: "Oct 2024 – Mar 2025",
    bullets: [
      "Created automated XML-to-JSON pipeline using fine-tuned LLMs (Mistral, LLaMA, LoRA, QLoRA)",
      "Built AI automation integrations using Workato and n8n platforms",
      "Tested and benchmarked models with SambaNova Cloud for production deployment",
    ],
  },
  {
    role: "ML Research Intern",
    company: "IIIT Nagpur",
    location: "Nagpur",
    period: "May 2024 – Jul 2024",
    bullets: [
      "Designed diffusion-GAN hybrid generative architecture for high-quality image generation",
      "Published research on multimodal deep learning for medical image classification",
      "Experimented with novel training strategies for stabilizing diffusion model outputs",
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeading title="Work" highlight="Experience" subtitle="My Career" isVisible={isVisible} />

        <div className="relative">
          {/* Timeline line with animated glow */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary/20" />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary/20 blur-sm transition-opacity duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot with pulse */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-8 z-10">
                <div className="w-3 h-3 rounded-full bg-accent glow-sm" />
                <div
                  className={`absolute inset-[-4px] rounded-full border border-accent/30 transition-all duration-700 ${
                    isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 200 + 300}ms` }}
                />
              </div>

              {/* Card */}
              <div
                className={`ml-10 md:ml-0 md:w-[45%] ${
                  i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                } transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 200 + 200}ms` }}
              >
                <div className="group relative glass rounded-2xl p-6 border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(250_80%_65%/0.15)]">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                  {/* Company badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3">
                    <Briefcase size={12} /> {exp.company}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{exp.role}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
