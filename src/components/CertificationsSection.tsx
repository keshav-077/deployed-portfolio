import { Award, ShieldCheck } from "lucide-react";
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

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeading title="Professional" highlight="Certifications" subtitle="Credentials" isVisible={isVisible} />

        <div
          className={`group relative rounded-2xl p-8 md:p-10 bg-card/60 border border-border/40 overflow-hidden transition-all duration-700 delay-200 hover:border-foreground/20 ${
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
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
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

export default CertificationsSection;
