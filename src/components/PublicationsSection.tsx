import { FileText, ExternalLink, BookOpen, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const PublicationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeading title="Research" highlight="Publications" subtitle="Published Work" isVisible={isVisible} />

        <div
          className={`group relative rounded-2xl p-8 md:p-10 bg-card/60 border border-border/40 overflow-hidden transition-all duration-700 delay-200 hover:border-foreground/20 ${
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
      </div>
    </section>
  );
};

export default PublicationsSection;
