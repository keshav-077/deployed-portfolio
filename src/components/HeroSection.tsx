import { useState } from "react";
import { ArrowRight, Play, Compass, Monitor, Cpu, MapPin, X } from "lucide-react";

const HeroSection = () => {
  const [isPlayingPortVideo, setIsPlayingPortVideo] = useState(false);
  const [isPlayingCollegeVideo, setIsPlayingCollegeVideo] = useState(false);

  return (
    <section id="home" className="relative min-h-screen bg-[#050505] text-[#f4f1ea] overflow-hidden flex flex-col justify-between pt-24 pb-12">
      {/* Fonts and Custom Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Roboto+Mono:wght@200;400;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        .font-editorial {
          font-family: 'Cinzel', serif;
        }
        .font-serif-body {
          font-family: 'Playfair Display', serif;
        }
        .font-mono-ind {
          font-family: 'Roboto Mono', monospace;
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Container Red Ambient Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#a93226] opacity-[0.06] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#a93226] opacity-[0.03] blur-[120px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Editorial Content */}
          <div className="lg:col-span-5 flex flex-col space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5">
              <span className="text-[10px] font-mono-ind text-[#a93226] uppercase tracking-[0.25em] bg-[#a93226]/5 px-2.5 py-1 border border-[#a93226]/20">
                [ INDEX 01A_HERO ]
              </span>
              <div className="h-[1px] w-8 bg-neutral-800" />
              <span className="text-[9px] font-mono-ind text-neutral-400 uppercase tracking-widest">SF_BAY_PORTAL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white font-editorial leading-[1.12]">
              A PRECISE <br />
              DISCIPLINE OF <br />
              <span className="italic font-serif-body font-normal text-[#f4f1ea]/80 block mt-2">
                Surrealist Flow.
              </span>
            </h1>

            <div className="h-[2px] w-16 bg-[#a93226]" />

            <p className="text-neutral-400 text-sm font-light font-serif-body leading-relaxed max-w-sm">
              Fusing heavy-duty supply chain geometry with cinematic clouds, Golden Gate bridge mist, and sophisticated interactive redirections. Designed for collectors of high-end frontend architecture.
            </p>

            {/* Technical Metadata Widgets */}
            <div className="space-y-3 font-mono-ind text-[10px] text-neutral-500 max-w-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-2">
                  <Cpu size={12} className="text-[#a93226]" />
                  <span>ENGINE STATUS</span>
                </span>
                <span className="text-emerald-500 font-semibold">3D WEBGL ACCELERATED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-2">
                  <Monitor size={12} className="text-[#a93226]" />
                  <span>INTERACTIVE SCROLL</span>
                </span>
                <span className="text-white">ACTIVE ROTATION & PIVOT</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#a93226]" />
                  <span>CAMPUS SPECTRA</span>
                </span>
                <a href="#education" className="text-[#a93226] hover:underline transition-all">
                  PREVIEW BLOCK 02
                </a>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-3 px-8 py-4 border border-[#a93226] bg-[#a93226]/5 hover:bg-[#a93226] text-white font-semibold text-xs tracking-[0.2em] font-mono-ind uppercase transition-all duration-300"
              >
                <span>EXPLORE DECK</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
              </a>
              <button 
                onClick={() => setIsPlayingPortVideo(true)}
                className="inline-flex items-center gap-2.5 px-6 py-4 border border-white/10 hover:border-white/30 hover:bg-white/5 text-neutral-300 hover:text-white font-mono-ind text-xs tracking-wider uppercase transition-all duration-200"
              >
                <Play size={12} className="text-[#a93226] fill-[#a93226]" />
                <span>Play Port Tour</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Overlapping Layout */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center relative min-h-[450px] pt-12 lg:pt-0">
            
            {/* Primary Cinematic Container Image Frame */}
            <div className="relative w-full max-w-[560px] aspect-[16/10] bg-[#0c0c0c] border-4 border-[#121212] shadow-2xl p-2 group hover:border-[#a93226]/40 transition-colors duration-500">
              
              {/* Decorative Geometric Corner Indicators */}
              <div className="absolute -top-1.5 -left-1.5 w-4.5 h-4.5 border-t-2 border-l-2 border-[#a93226]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4.5 h-4.5 border-b-2 border-r-2 border-[#a93226]" />

              <div className="relative w-full h-full overflow-hidden bg-black">
                <img 
                  src="/screenshot-1.png" 
                  alt="HappyRobot Golden Gate Bridge theme in clouds" 
                  decoding="async" 
                  loading="lazy" 
                  className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.05] brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Interactive HUD element */}
                <button 
                  onClick={() => setIsPlayingPortVideo(true)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full border border-white/15 bg-black/70 backdrop-blur-md flex items-center justify-center cursor-pointer hover:border-[#a93226] transition-colors"
                >
                  <Compass size={16} className="text-[#a93226] animate-rotate-slow" />
                </button>

                {/* Absolute overlay labels */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="text-left">
                    <p className="text-[9px] font-mono-ind text-[#a93226] uppercase tracking-wider font-semibold">VIEWPORT_3D_LIVE</p>
                    <h3 className="text-sm font-editorial text-white font-semibold">THE GOLDEN GATE GATEWAY</h3>
                  </div>
                  <div className="px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-[8px] font-mono-ind text-neutral-400 rounded">
                    SEC_01_HERO
                  </div>
                </div>
              </div>
            </div>

            {/* Overlap Floating Video Card - College Infrastructure (Representing Section 02 connection) */}
            <div className="absolute -bottom-12 sm:bottom-[-20px] lg:bottom-[-40px] right-2 sm:right-6 w-[250px] bg-[#0d0d0d] border border-white/10 p-3 shadow-2xl rounded-sm transform rotate-1 hover:rotate-0 transition-all duration-300 z-20 group/card">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                <span className="text-[8px] font-mono-ind text-neutral-500">ACADEMIC_PORT // 02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#a93226] animate-pulse" />
              </div>
              
              {/* Embedded video preview block */}
              <div 
                onClick={() => setIsPlayingCollegeVideo(true)}
                className="relative w-full h-[115px] bg-black rounded-sm overflow-hidden mb-2 cursor-pointer group-hover/card:border-[#a93226]/50 border border-transparent transition-colors"
              >
                <video 
                  src="https://videos.pexels.com/video-files/10472331/10472331-hd_1920_1080_25fps.mp4" 
                  poster="https://images.pexels.com/videos/10472331/pexels-photo-10472331.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="metadata" 
                  className="w-full h-full object-cover filter brightness-75 group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#a93226]/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center group-hover/card:scale-110 group-hover/card:border-[#a93226] transition-all">
                    <Play size={10} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-editorial text-white font-semibold">COLLEGE INFRASTRUCTURE</div>
              <p className="text-[9px] text-neutral-400 font-sans leading-relaxed mt-0.5">3D cinematic tour of campus terminals & active lab spaces.</p>
            </div>

          </div>

        </div>
      </div>

      {/* Editorial Footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 border-t border-white/5 pt-6 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono-ind text-neutral-500">
          <div>
            <span>COORDINATES: SF_BAY_37.77</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors animate-bounce mt-2 sm:mt-0">
            <span>ENGAGE SCROLL SEQUENCE</span>
            <ArrowRight size={10} className="rotate-90 text-[#a93226]" />
          </div>
          <div>
            <span>THE HAPPY ROBOT EXPERIENCE © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* Cinematic Modal for Port Video */}
      {isPlayingPortVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black border border-white/10 rounded overflow-hidden">
            <button 
              onClick={() => setIsPlayingPortVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/25 flex items-center justify-center text-white hover:border-[#a93226] transition-colors"
            >
              <X size={18} />
            </button>
            <video 
              src="https://videos.pexels.com/video-files/26893767/12028834_640_360_24fps.mp4"
              autoPlay 
              controls 
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Cinematic Modal for College Video */}
      {isPlayingCollegeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black border border-white/10 rounded overflow-hidden">
            <button 
              onClick={() => setIsPlayingCollegeVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/25 flex items-center justify-center text-white hover:border-[#a93226] transition-colors"
            >
              <X size={18} />
            </button>
            <video 
              src="https://videos.pexels.com/video-files/10472331/10472331-hd_1920_1080_25fps.mp4"
              autoPlay 
              controls 
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
