import { GraduationCap, Target } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          A passionate AI Engineer dedicated to pushing the boundaries of artificial intelligence
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bio */}
          <div className="glass rounded-2xl p-8 gradient-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm an AI Engineer with deep expertise in Large Language Models, multi-agent systems,
              Retrieval-Augmented Generation (RAG), and computer vision. My journey in AI began during
              my B.Tech at IIIT Nagpur, where I developed a passion for building intelligent systems
              that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From designing diffusion-GAN hybrid architectures to building production multi-agent
              platforms, I thrive at the intersection of research and engineering. I've worked across
              diverse domains — border security, healthcare, NLP, and automation — always focused on
              creating scalable, impactful solutions.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 gradient-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">B.Tech in CSE (AI & ML)</h3>
                  <p className="text-accent text-sm font-medium">IIIT Nagpur</p>
                  <p className="text-muted-foreground text-sm mt-1">2022 – 2026</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Specializing in Artificial Intelligence & Machine Learning with hands-on research
                    experience in generative models and computer vision.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 gradient-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <GraduationCap className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">MBA (PGPMCI)</h3>
                  <p className="text-accent text-sm font-medium">IIM Visakhapatnam</p>
                  <p className="text-muted-foreground text-sm mt-1">2026 – 2028</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Incoming MBA student, bridging AI expertise with business strategy and leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="glass rounded-2xl p-8 gradient-border text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="text-primary" size={24} />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Career Vision</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            To bridge advanced AI research with real-world scalable products, leading innovation at
            the intersection of generative AI, multi-agent systems, and enterprise intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
