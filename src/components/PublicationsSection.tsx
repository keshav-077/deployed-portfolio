import { FileText, Award, ExternalLink, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const certifications = [
  { title: "Building Transformers-Based NLP Applications", issuer: "NVIDIA" },
  { title: "Accelerated Computing with CUDA Python", issuer: "NVIDIA" },
  { title: "Accelerated Computing with CUDA C/C++", issuer: "NVIDIA" },
  { title: "Certified Deep Learning", issuer: "NVIDIA" },
  { title: "Certified Data Analysis", issuer: "IBM" },
  { title: "Deep Learning Image Generation with GANs and Diffusion Models", issuer: "Udemy" },
  { title: "Generative AI, from GANs to CLIP, with Python and PyTorch", issuer: "Udemy" },
  { title: "Prompt Engineering PRO", issuer: "Udemy" },
];

const PublicationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeading title="Publications &" highlight="Certifications" subtitle="Credentials" isVisible={isVisible} />

        {/* Publication card */}
        <div
          className={`group relative rounded-2xl p-8 md:p-10 bg-card/60 border border-border/40 overflow-hidden mb-10 transition-all duration-700 delay-200 hover:border-foreground/20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-foreground/5 border border-foreground/10">
                <BookOpen className="text-foreground/50" size={28} />
              </div>
              <div>
                <h3 className="font-medium text-2xl text-foreground/90">Research Publication</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-foreground/5 text-foreground/60 border border-foreground/10">
                    <Sparkles size={12} /> Peer-Reviewed
                  </span>
                  <span className="text-xs text-muted-foreground">IEEE International Conference</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-secondary/60 border border-border/40">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-foreground/40" />
                <span className="text-sm font-medium text-foreground/40 tracking-wide uppercase">IEEE Conference Paper</span>
              </div>
              <h4 className="font-medium text-xl md:text-2xl mb-4 leading-tight text-foreground/90">
                Skin Disease Classification Using Multimodal Deep Learning
              </h4>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                A novel multimodal approach combining dermatological image features with patient metadata
                for accurate skin disease classification. The model leverages fusion architectures to achieve
                superior diagnostic accuracy. Published and presented at an IEEE international conference.
              </p>
              <a
                href="https://ieeexplore.ieee.org/abstract/document/11413574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all duration-300"
              >
                Read Paper on IEEE Xplore <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className={`group relative rounded-2xl p-8 md:p-10 bg-card/60 border border-border/40 overflow-hidden transition-all duration-700 delay-400 hover:border-foreground/20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-foreground/5 border border-foreground/10">
                <Award className="text-foreground/50" size={28} />
              </div>
              <div>
                <h3 className="font-medium text-2xl text-foreground/90">Professional Certifications</h3>
                <p className="text-sm text-muted-foreground mt-1">Industry-recognized credentials & specializations</p>
              </div>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`flex items-center gap-4 p-5 rounded-xl bg-secondary/60 border border-border/40 hover:border-foreground/15 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className="p-2 rounded-lg bg-foreground/5 shrink-0">
                    <ShieldCheck size={18} className="text-foreground/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm md:text-base leading-snug text-foreground/80">{cert.title}</h4>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full shrink-0 bg-foreground/5 text-foreground/50 border border-foreground/10">
                    {cert.issuer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
