import { FileText, Award, ExternalLink, BookOpen, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const PublicationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="Publications &" highlight="Certifications" subtitle="Credentials" isVisible={isVisible} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Publication */}
          <div
            className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden transition-all duration-700 delay-200 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(250_80%_65%/0.15)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Publications</h3>
                <p className="text-xs text-muted-foreground">Peer-reviewed research</p>
              </div>
            </div>

            <div className="relative z-10 p-5 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent">IEEE Conference</span>
              </div>
              <h4 className="font-medium mb-2">
                Skin Disease Classification Using Multimodal Deep Learning
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                A novel multimodal approach combining image and metadata features
                for accurate dermatological disease classification.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Read Paper <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden transition-all duration-700 delay-300 hover:border-accent/30 hover:shadow-[0_0_30px_-5px_hsl(190_90%_50%/0.15)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Award className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Certifications</h3>
                <p className="text-xs text-muted-foreground">Professional credentials</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                {
                  title: "NVIDIA Deep Learning Certification",
                  desc: "Advanced deep learning techniques and GPU-accelerated computing.",
                  icon: ShieldCheck,
                },
                {
                  title: "IBM AI Engineering Certification",
                  desc: "Machine learning, deep learning, and AI application development.",
                  icon: ShieldCheck,
                },
              ].map((cert) => (
                <div
                  key={cert.title}
                  className="p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-accent/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <cert.icon size={14} className="text-accent" />
                    <h4 className="font-medium">{cert.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{cert.desc}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    Verify <ExternalLink size={14} />
                  </a>
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
