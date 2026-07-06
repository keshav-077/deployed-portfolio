import { useScrollReveal } from "@/hooks/useScrollReveal";
import { achievements } from "@/data/achievements";

const CoastalAchievements = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="achievements" ref={ref} className="py-24 px-8 md:px-20 bg-[#1C2B36] text-[#F6F2EE]">
      <div className="max-w-7xl mx-auto">
        <h2 className={`font-display italic font-bold text-4xl md:text-6xl mb-16 reveal-text ${isVisible ? 'is-in' : ''}`}>
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {achievements.map((a, i) => (
            <div 
              key={i} 
              className={`group border border-white/10 p-12 hover:bg-white/5 transition-all duration-500 stagger-in ${isVisible ? 'is-in' : ''}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-6 block">
                {a.badge}
              </span>
              <h3 className="font-display font-black italic text-4xl md:text-5xl mb-6 tracking-tighter">
                {a.title}
              </h3>
              {a.description && (
                <p className="text-sm text-[#F6F2EE]/60 leading-relaxed max-w-sm">
                  {a.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoastalAchievements;
