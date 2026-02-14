import { Briefcase, MapPin, Calendar } from "lucide-react";

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
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Building AI systems across research labs and industry
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 mt-8 glow-sm z-10" />

              {/* Card */}
              <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass rounded-2xl p-6 gradient-border hover:glow transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={16} className="text-primary" />
                    <span className="text-accent text-sm font-medium">{exp.company}</span>
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
                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
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
