import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import topTierIcon from "@/assets/brand/toptiericon.png";
import { CONTACT_INFO } from "@/config/contact";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll and focus trap when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      // Focus trap for accessibility
      const focusableElements = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])'
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        firstElement?.focus();

        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        };

        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setMobileMenuOpen(false);
          }
        };

        document.addEventListener('keydown', handleTab);
        document.addEventListener('keydown', handleEscape);

        return () => {
          document.removeEventListener('keydown', handleTab);
          document.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = "unset";
        };
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border ${
          scrolled
            ? "bg-background/98 backdrop-blur-md shadow-lg"
            : "bg-background/95 backdrop-blur-sm"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm group-hover:shadow-md transition-shadow p-1.5">
              <img
                src={topTierIcon}
                alt="Top Tier Restoration Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-logo text-lg leading-none text-foreground tracking-tight">
                TOP TIER
              </span>
              <span className="font-logo text-xs text-muted-foreground mt-0.5">
                RESTORATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                    location.pathname === link.to
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <Button variant="default" size="sm" className="btn-micro-animate gap-2 font-semibold" asChild>
              <a href={CONTACT_INFO.phone.href}>
                <Phone className="w-4 h-4" />
                <span>{CONTACT_INFO.phone.display} — {CONTACT_INFO.hours.emergency}</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-sm font-medium transition-colors py-2 ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" size="sm" className="btn-micro-animate w-full gap-2 font-semibold" asChild>
              <a href={CONTACT_INFO.phone.href}>
                <Phone className="w-4 h-4" />
                <span>{CONTACT_INFO.phone.display} — 24/7 Emergency</span>
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
