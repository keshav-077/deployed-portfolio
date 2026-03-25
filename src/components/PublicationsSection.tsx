import { FileText, Award, ExternalLink, BookOpen, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const certifications = [
  { title: "Building Transformers-Based NLP Applications", issuer: "NVIDIA" },
  { title: "Accelerated Computing with CUDA Python", issuer: "NVIDIA" },
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
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <SectionHeading title="Publications &" highlight="Certifications" subtitle="Credentials" isVisible={isVisible} />

        {/* Publication — full width highlighted card */}
        <div
          className={`group relative glass rounded-2xl p-8 md:p-10 border border-border/50 overflow-hidden mb-8 transition-all duration-700 delay-200 hover:border-primary/30 hover:shadow-[0_0_40px_-8px_hsl(250_80%_65%/0.18)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/8 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">Research Publication</h3>
                <p className="text-xs text-muted-foreground">Peer-reviewed • IEEE Conference</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-accent" />
                <span className="text-sm font-semibold text-accent">IEEE International Conference</span>
              </div>
              <h4 className="font-semibold text-lg mb-3">
                Skin Disease Classification Using Multimodal Deep Learning
              </h4>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                A novel multimodal approach combining image and metadata features
                for accurate dermatological disease classification. Published and presented at an IEEE conference.
              </p>
              <a
                href="https://ieeexplore.ieee.org/abstract/document/11413574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                Read Paper on IEEE Xplore <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications — full width */}
        <div
          className={`group relative glass rounded-2xl p-8 md:p-10 border border-border/50 overflow-hidden transition-all duration-700 delay-400 hover:border-accent/30 hover:shadow-[0_0_40px_-8px_hsl(190_90%_50%/0.15)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Award className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">Certifications</h3>
                <p className="text-xs text-muted-foreground">Professional credentials & specializations</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-accent/20 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + i * 80}ms` }}
                >
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm leading-snug">{cert.title}</h4>
                      <p className="text-xs text-accent/80 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
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
