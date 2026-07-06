import { useScrollReveal } from "@/hooks/useScrollReveal";
import { publications } from "@/data/publications";

const CoastalPublications = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE]">
      <div className="max-w-7xl mx-auto text-right">
        <h2 className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] mb-16 reveal-text ${isVisible ? 'is-in' : ''}`}>
          Publications
        </h2>
        
        <div className="space-y-16">
          {publications.map((p, i) => (
            <div 
              key={i} 
              className={`stagger-in ${isVisible ? 'is-in' : ''}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <h3 className="font-display font-semibold italic text-3xl md:text-5xl text-accent-1 mb-4">{p.title}</h3>
              <p className="font-mono text-[12px] text-accent-2 uppercase mb-8 tracking-widest">
                {p.venue}
                {p.year ? ` · ${p.year}` : ''}
              </p>
              {p.url && (
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center border-b border-accent-1 pb-1 text-accent-1 font-mono text-[11px] tracking-widest uppercase hover:text-accent-2 hover:border-accent-2 transition-all outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-1"
                >
                  Read on IEEE Xplore →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoastalPublications;
