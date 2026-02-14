import { FileText, Award, ExternalLink } from "lucide-react";

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Publications & <span className="gradient-text">Certifications</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Research contributions and professional credentials
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Publication */}
          <div className="glass rounded-2xl p-8 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-xl">Publications</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                <h4 className="font-medium mb-2">
                  Skin Disease Classification Using Multimodal Deep Learning
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Published in IEEE — a novel multimodal approach combining image and metadata features
                  for accurate dermatological disease classification.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  View Paper <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass rounded-2xl p-8 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Award className="text-accent" size={24} />
              </div>
              <h3 className="font-semibold text-xl">Certifications</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                <h4 className="font-medium mb-1">NVIDIA Deep Learning Certification</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Advanced deep learning techniques and GPU-accelerated computing.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  Verify <ExternalLink size={14} />
                </a>
              </div>
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                <h4 className="font-medium mb-1">IBM AI Engineering Certification</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Machine learning, deep learning, and AI application development.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  Verify <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
