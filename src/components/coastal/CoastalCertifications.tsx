import { useScrollReveal } from "@/hooks/useScrollReveal";
import { certifications } from "@/data/certifications";

const CoastalCertifications = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE]">
      <div className="max-w-7xl mx-auto">
        <h2 className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] mb-16 reveal-text ${isVisible ? 'is-in' : ''}`}>
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {certifications.map((cert, i) => (
            <div 
              key={i} 
              className={`flex justify-between items-center py-6 border-b border-[#1C2B36]/10 stagger-in ${isVisible ? 'is-in' : ''}`}
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <h3 className="font-display font-semibold italic text-lg md:text-xl text-[#1C2B36] max-w-[70%] leading-tight">
                {cert.title}
              </h3>
              <span className="font-mono text-[10px] tracking-widest text-accent-2 uppercase bg-accent-2/5 px-3 py-1.5 rounded">
                {cert.issuer}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoastalCertifications;
