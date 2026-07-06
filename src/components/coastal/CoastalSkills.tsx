import { useScrollReveal } from "@/hooks/useScrollReveal";
import { skills } from "@/data/skills";

const CoastalSkills = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" ref={ref} className="py-24 px-8 md:px-20 bg-[#1C2B36] text-[#F6F2EE]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-16">
          <h2 className={`font-display italic font-bold text-4xl md:text-6xl reveal-text ${isVisible ? 'is-in' : ''}`}>
            Expertise
          </h2>
          <span className={`font-mono text-[11px] tracking-widest text-muted uppercase stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '300ms' }}>
            Technical Stack
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {skills.map((cat, i) => (
            <div 
              key={cat.title} 
              className={`stagger-in ${isVisible ? 'is-in' : ''}`}
              style={{ transitionDelay: `${400 + (i % 4) * 100}ms` }}
            >
              <h3 className="font-mono text-[12px] tracking-[0.2em] text-accent-2 uppercase mb-8 border-b border-white/10 pb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {cat.skills.map((skill, j) => (
                  <span key={j} className="font-display italic text-lg md:text-xl text-[#F6F2EE]/70 hover:text-accent-1 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoastalSkills;
