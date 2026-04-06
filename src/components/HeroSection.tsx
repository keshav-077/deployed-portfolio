const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          type="video/mp4"
        />
      </video>

      {/* 50% black overlay */}
      <div className="absolute inset-0 bg-background/50" />

      {/* Content */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: 200, paddingBottom: 102 }}
      >
        <div className="flex flex-col items-center" style={{ gap: 40 }}>
          {/* Badge pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-sm"
            style={{ padding: "8px 18px", borderRadius: 20 }}
          >
            <span className="w-1 h-1 rounded-full bg-foreground" />
            <span className="font-medium" style={{ fontSize: 13 }}>
              <span className="text-foreground/60">AI Engineer available from</span>{" "}
              <span className="text-foreground">May 1, 2026</span>
            </span>
          </div>

          {/* Heading */}
          <h1
            className="gradient-text font-medium max-w-[613px]"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.28 }}
          >
            KESHAVARDHAN MAKIREDDI
          </h1>

          {/* Subtitle */}
          <p
            className="text-foreground/70 font-normal max-w-[680px]"
            style={{ fontSize: 15, marginTop: -16 }}
          >
            AI Engineer specializing in Generative AI, Multi-Agent Systems, Computer Vision, 
            and LLM applications. Building intelligent systems that solve real-world problems 
            with resilience, speed, and scale.
          </p>

          {/* CTA Button */}
          <a
            href="#projects"
            className="relative rounded-full"
            style={{ padding: "0.6px" }}
          >
            <span className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-foreground/60 to-transparent blur-[1px] pointer-events-none" />
            <span
              className="block rounded-full bg-foreground text-background font-medium"
              style={{ fontSize: 14, paddingLeft: 29, paddingRight: 29, paddingTop: 11, paddingBottom: 11 }}
            >
              View Projects
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
