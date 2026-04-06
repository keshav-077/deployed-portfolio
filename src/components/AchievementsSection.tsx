import { Trophy, Gamepad2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const achievements = [
  {
    icon: Trophy,
    title: "Hackbyte 3.0",
    badge: "Top 5 Finish",
    desc: "Achieved a Top 5 position among hundreds of teams in this competitive national-level hackathon.",
  },
  {
    icon: Gamepad2,
    title: "Esports Tournaments",
    badge: "Multiple Wins",
    desc: "Won multiple competitive esports tournaments showcasing strategic thinking and teamwork.",
  },
];

const AchievementsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="achievements" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeading title="" highlight="Achievements" subtitle="Highlights" isVisible={isVisible} />

        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className={`group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden text-center transition-all duration-700 hover:border-foreground/20 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="relative z-10">
                <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center bg-foreground/5 border border-foreground/10 transition-transform duration-300 group-hover:scale-110">
                  <a.icon className="text-foreground/50" size={30} />
                </div>
                <h3 className="font-medium text-xl mb-2 text-foreground/90">{a.title}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-foreground/5 text-foreground/50 border border-foreground/10">
                  {a.badge}
                </span>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
