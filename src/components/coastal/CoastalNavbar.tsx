import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Real in-page section anchors, matching the `id`s rendered by the Coastal
// section components composed in `src/pages/Index.tsx` (R5.4).
// `primary` items are shown inline on desktop; every item is revealed in the
// mobile disclosure (R11.5).
type NavItem = { id: string; label: string; primary?: boolean };

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "manifesto", label: "About", primary: true },
  { id: "experience", label: "Experience", primary: true },
  { id: "education", label: "Education" },
  { id: "cases", label: "Projects", primary: true },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact", primary: true },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

// Owner wordmark derived from the profile name (e.g. "Kesavardhan Makireddi" -> "KM").
const initials = profile.name
  .split(/\s+/)
  .filter(Boolean)
  .map((part) => part[0]?.toUpperCase() ?? "")
  .join("");

const CoastalNavbar = () => {
  const activeId = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track whether user has scrolled past the hero so the navbar gets a solid
  // dark background over cream sections. On the hero it stays transparent.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopItems = NAV_ITEMS.filter((item) => item.primary);

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-20 py-[28px] transition-colors duration-300 ${
        scrolled ? "bg-[#1C2B36]" : "bg-transparent"
      }`}
    >
      {/* Owner wordmark */}
      <a
        href="#home"
        aria-label={`${profile.name} — back to top`}
        className="font-display italic font-black text-[22px] text-[#F6F2EE] tracking-[-0.01em] rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
      >
        {initials}
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none font-mono text-[12px] tracking-[0.1em] text-[rgba(246,242,238,0.75)] uppercase">
        {desktopItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-sm outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-1 after:absolute after:-bottom-1.5 after:left-0 after:h-[1.5px] after:bg-accent-1 after:transition-all after:duration-300 ${
                  isActive
                    ? "text-[#F6F2EE] after:w-full"
                    : "text-[rgba(246,242,238,0.75)] hover:text-[#F6F2EE] after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Mobile disclosure — touch target >= 44px (R11.4/R11.5) */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open navigation menu"
            className="flex h-11 w-11 items-center justify-center text-[#F6F2EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-1"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-l border-white/10 bg-[#1C2B36] text-[#F6F2EE]"
          >
            <SheetHeader>
              <SheetTitle className="font-display italic font-black text-[22px] text-[#F6F2EE]">
                {profile.name}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Primary navigation links to each section of the portfolio.
              </SheetDescription>
            </SheetHeader>
            <ul className="mt-8 flex flex-col list-none font-mono text-[13px] tracking-[0.1em] uppercase">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <SheetClose asChild>
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex min-h-[44px] items-center border-b border-white/10 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-1 ${
                          isActive
                            ? "text-accent-1"
                            : "text-[rgba(246,242,238,0.75)] hover:text-[#F6F2EE]"
                        }`}
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default CoastalNavbar;
