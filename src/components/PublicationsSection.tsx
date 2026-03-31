import { FileText, Award, ExternalLink, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const certifications = [
  { title: "Building Transformers-Based NLP Applications", issuer: "NVIDIA", color: "primary" as const },
  { title: "Accelerated Computing with CUDA Python", issuer: "NVIDIA", color: "primary" as const },
  { title: "Accelerated Computing with CUDA C/C++", issuer: "NVIDIA", color: "primary" as const },
  { title: "Certified Deep Learning", issuer: "NVIDIA", color: "primary" as const },
  { title: "Certified Data Analysis", issuer: "IBM", color: "accent" as const },
  { title: "Deep Learning Image Generation with GANs and Diffusion Models", issuer: "Udemy", color: "accent" as const },
  { title: "Generative AI, from GANs to CLIP, with Python and PyTorch", issuer: "Udemy", color: "accent" as const },
  { title: "Prompt Engineering PRO", issuer: "Udemy", color: "accent" as const },
];

const issuerColors: Record<string, string> = {
  NVIDIA: "from-[hsl(120,60%,40%)] to-[hsl(150,70%,45%)]",
  IBM: "from-[hsl(210,90%,55%)] to-[hsl(230,80%,60%)]",
  Udemy: "from-[hsl(280,70%,55%)] to-[hsl(310,60%,50%)]",
};

const PublicationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <SectionHeading title="Publications &" highlight="Certifications" subtitle="Credentials" isVisible={isVisible} />

        {/* Publication — highlighted hero card */}
        <div
          className={`group relative glass rounded-2xl p-8 md:p-10 border border-border/50 overflow-hidden mb-10 transition-all duration-700 delay-200 hover:border-primary/40 hover:shadow-[0_0_50px_-8px_hsl(250_80%_65%/0.25)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-accent/8 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500 shadow-[0_0_30px_-5px_hsl(250_80%_65%/0.2)]">
                <BookOpen className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-2xl">Research Publication</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Sparkles size={12} /> Peer-Reviewed
                  </span>
                  <span className="text-xs text-muted-foreground">IEEE International Conference</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-secondary/40 border border-border/50 group-hover:border-primary/20 transition-all duration-500">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-accent" />
                <span className="text-sm font-bold text-accent tracking-wide uppercase">IEEE Conference Paper</span>
              </div>
              <h4 className="font-bold text-xl md:text-2xl mb-4 leading-tight">
                Skin Disease Classification Using Multimodal Deep Learning
              </h4>
              <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                A novel multimodal approach combining dermatological image features with patient metadata
                for accurate skin disease classification. The model leverages fusion architectures to achieve
                superior diagnostic accuracy. Published and presented at an IEEE international conference.
              </p>
              <a
                href="https://ieeexplore.ieee.org/abstract/document/11413574"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-[0_0_25px_-5px_hsl(250_80%_65%/0.4)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Read Paper on IEEE Xplore <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications — vertical list with issuer grouping */}
        <div
          className={`group relative glass rounded-2xl p-8 md:p-10 border border-border/50 overflow-hidden transition-all duration-700 delay-400 hover:border-accent/30 hover:shadow-[0_0_40px_-8px_hsl(190_90%_50%/0.15)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 group-hover:from-accent/30 group-hover:to-primary/20 transition-all duration-500">
                <Award className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-2xl">Professional Certifications</h3>
                <p className="text-sm text-muted-foreground mt-1">Industry-recognized credentials & specializations</p>
              </div>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`flex items-center gap-4 p-5 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/20 transition-all duration-500 hover:bg-secondary/60 hover:-translate-x-1 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${issuerColors[cert.issuer]} shrink-0`}>
                    <ShieldCheck size={18} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base leading-snug">{cert.title}</h4>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 bg-gradient-to-r ${issuerColors[cert.issuer]} text-primary-foreground`}>
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
