import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Get Started", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-6 sm:px-10 lg:px-[120px]" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-foreground font-semibold text-xl tracking-tight" style={{ width: 187 }}>
            KESHAVARDHAN
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center" style={{ gap: 30 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center text-foreground/80 hover:text-foreground transition-colors"
                style={{ fontSize: 14, gap: 6 }}
              >
                <span className="font-medium">{link.label}</span>
                <ChevronDown size={14} className="text-foreground/60" />
              </a>
            ))}
          </div>

          {/* Join Waitlist / Hire Me button */}
          <a
            href="#contact"
            className="hidden md:block relative rounded-full"
            style={{ padding: "0.6px" }}
          >
            <span className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-foreground/60 to-transparent blur-[1px] pointer-events-none" />
            <span
              className="block rounded-full bg-background text-foreground font-medium border border-foreground/10"
              style={{ fontSize: 14, paddingLeft: 29, paddingRight: 29, paddingTop: 11, paddingBottom: 11 }}
            >
              Hire Me
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 animate-fade-in">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-4 text-center rounded-full bg-foreground text-background font-medium text-sm py-3"
              onClick={() => setMobileOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
