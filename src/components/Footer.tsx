import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative py-12 border-t border-border/30">
    <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <a href="#home" className="text-xl font-bold gradient-text">
            KM
          </a>
          <p className="text-sm text-muted-foreground mt-1">
            Building the future with AI.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/keshav-077", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "mailto:keshavardhan777@gmail.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-secondary/50 border border-border/40 hover:border-primary/30 hover:shadow-[0_0_12px_-3px_hsl(250_80%_65%/0.2)] transition-all duration-300"
              aria-label={s.label}
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/20 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Keshavardhan Makireddi. Crafted with passion for AI.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
