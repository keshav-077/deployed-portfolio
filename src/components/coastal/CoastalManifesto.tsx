import { useScrollReveal } from "@/hooks/useScrollReveal";
import { profile } from "@/data/profile";

const CoastalManifesto = () => {
  const { ref, isVisible } = useScrollReveal();

  // Resume-derived professional summary (R2.1), split into sentence lines so the
  // existing line-reveal motion is preserved. Trailing punctuation is retained.
  const lines = profile.summary
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <section id="manifesto" ref={ref} className={`py-32 md:py-48 px-8 transition-colors duration-1000 ease-custom ${isVisible ? 'bg-[#1C2B36] text-[#F6F2EE]' : 'bg-[#F6F2EE] text-[#1C2B36]'}`}>
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <span 
              className={`block font-display italic font-black text-3xl md:text-5xl leading-[1.16] transition-transform duration-800 ease-custom ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoastalManifesto;
