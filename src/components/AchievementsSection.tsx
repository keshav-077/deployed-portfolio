import { Trophy, Gamepad2, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const achievements = [
  {
    icon: Trophy,
    title: "Hackbyte 3.0",
    badge: "Top 5 Finish",
    desc: "Achieved a Top 5 position among hundreds of teams in this competitive national-level hackathon.",
    color: "primary" as const,
  },
  {
    icon: Gamepad2,
    title: "Esports Tournaments",
    badge: "Multiple Wins",
    desc: "Won multiple competitive esports tournaments showcasing strategic thinking and teamwork.",
    color: "accent" as const,
  },
];

const AchievementsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="achievements" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeading title="" highlight="Achievements" subtitle="Highlights" isVisible={isVisible} />

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden text-center transition-all duration-700 hover:border-${a.color}/30 hover:shadow-[0_0_40px_-10px_hsl(250_80%_65%/0.2)] ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              {/* Decorative stars */}
              <Star size={12} className="absolute top-6 right-6 text-accent/20 group-hover:text-accent/40 transition-colors" />
              <Star size={8} className="absolute top-10 right-12 text-primary/20 group-hover:text-primary/40 transition-colors" />

              <div className="relative z-10">
                <div
                  className={`mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    a.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  }`}
                >
                  <a.icon className={a.color === "primary" ? "text-primary" : "text-accent"} size={30} />
                </div>
                <h3 className="font-semibold text-xl mb-2">{a.title}</h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    a.color === "primary"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-accent/10 text-accent border border-accent/20"
                  }`}
                >
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
