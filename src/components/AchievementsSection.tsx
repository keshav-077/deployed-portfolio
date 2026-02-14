import { Trophy, Gamepad2, Medal } from "lucide-react";

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Achievements</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Highlights from hackathons and competitive gaming
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8 gradient-border hover:glow transition-shadow duration-300 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Trophy className="text-primary" size={32} />
            </div>
            <h3 className="font-semibold text-xl mb-2">Hackbyte 3.0</h3>
            <p className="text-accent font-medium mb-2">Top 5 Finish</p>
            <p className="text-sm text-muted-foreground">
              Achieved a Top 5 position among hundreds of teams in this competitive national-level hackathon.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 gradient-border hover:glow transition-shadow duration-300 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Gamepad2 className="text-accent" size={32} />
            </div>
            <h3 className="font-semibold text-xl mb-2">Esports Tournaments</h3>
            <p className="text-accent font-medium mb-2">Multiple Wins</p>
            <p className="text-sm text-muted-foreground">
              Won multiple competitive esports tournaments showcasing strategic thinking and teamwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
