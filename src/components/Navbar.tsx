import { useState, useEffect } from "react";
import { Home, User, Code, FolderOpen, Trophy, Mail, Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Fixed right-side vertical nav (desktop) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`group relative flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 ${
                isActive
                  ? "border-primary bg-primary/10 shadow-[0_0_15px_hsl(174_100%_50%/0.4)]"
                  : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5"
              }`}
              aria-label={item.label}
            >
              <Icon className={`h-4 w-4 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
              {/* Tooltip */}
              <span className="absolute right-14 px-2 py-1 rounded text-xs font-mono bg-card border border-border text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute right-0 w-1 h-4 rounded-l-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Top bar mobile */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-mono text-primary font-semibold text-sm">ZA<span className="text-foreground">.</span></span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="bg-card/95 backdrop-blur-md border-b border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-3 w-full px-6 py-3 text-sm font-medium transition-colors ${
                    isActive ? "text-primary border-l-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  <ChevronRight className="h-3 w-3 ml-auto" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
