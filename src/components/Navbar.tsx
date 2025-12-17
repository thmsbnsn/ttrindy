import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import topTierIcon from "@/assets/brand/toptiericon.png";
import { CONTACT_INFO } from "@/config/contact";
import { getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

// Fallback navigation links if CMS data is not available
const fallbackNavLinks = [
  { to: "/", label: "Home", openInNewTab: false },
  { to: "/services", label: "Services", openInNewTab: false },
  { to: "/gallery", label: "Gallery", openInNewTab: false },
  { to: "/blog", label: "Blog", openInNewTab: false },
  { to: "/about", label: "About", openInNewTab: false },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch site settings from CMS
  useEffect(() => {
    getSiteSettings()
      .then((settings) => {
        if (settings) {
          setSiteSettings(settings);
        }
      })
      .catch((error) => {
        console.error("Error fetching site settings:", error);
      });
  }, []);

  // Get navigation links from CMS or fallback
  const navLinks = siteSettings?.navigation?.mainMenu?.length
    ? siteSettings.navigation.mainMenu.map((item) => ({
        to: item.url,
        label: item.title,
        openInNewTab: item.openInNewTab || false,
      }))
    : fallbackNavLinks;

  // Contact button now links to contact form instead of phone
  const contactFormUrl = CONTACT_INFO.contactFormUrl;

  // Get CTA button from CMS or fallback
  const ctaButton = siteSettings?.navigation?.ctaButton || {
    text: "Get a Free Quote",
    url: "/about#contact",
  };

  // Get logo from CMS or fallback
  const logoUrl = siteSettings?.branding?.logo?.asset
    ? urlFor(siteSettings.branding.logo).width(44).height(44).url()
    : topTierIcon;
  const logoAlt = siteSettings?.branding?.logo?.alt || "Top Tier Restoration Logo";

  // ARIA attribute value for mobile menu button
  const mobileMenuExpanded = mobileMenuOpen;

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
                src={logoUrl}
                alt={logoAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-logo text-xs leading-none text-primary tracking-tight">
                {(() => {
                  const siteName = siteSettings?.branding?.siteName;
                  if (!siteName) return "TOP TIER";
                  const words = siteName.split(" ");
                  return words.slice(0, 2).join(" ").toUpperCase();
                })()}
              </span>
              <span className="font-logo text-xs text-primary mt-0.5">
                {(() => {
                  const siteName = siteSettings?.branding?.siteName;
                  if (!siteName) return "RESTORATION";
                  const words = siteName.split(" ");
                  return words.slice(2).join(" ").toUpperCase() || "RESTORATION";
                })()}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to ||
                (link.to !== "/" && location.pathname.startsWith(link.to));

              // Handle external links
              if (link.openInNewTab || link.to.startsWith("http")) {
                return (
                  <a
                    key={index}
                    href={link.to}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium transition-colors relative group text-foreground hover:text-primary"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left scale-x-0 group-hover:scale-x-100" />
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  to={link.to}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Button variant="default" size="sm" className="btn-micro-animate gap-2 font-semibold" asChild>
              <Link to={contactFormUrl}>
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </Button>
            {ctaButton && (
              <Button variant="outline" size="sm" className="btn-micro-animate gap-2 font-semibold" asChild>
                {ctaButton.url.startsWith("http") ? (
                  <a href={ctaButton.url} target="_blank" rel="noopener noreferrer">
                    {ctaButton.text}
                  </a>
                ) : (
                  <Link to={ctaButton.url}>{ctaButton.text}</Link>
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            {...{ "aria-expanded": mobileMenuOpen }}
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
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to ||
                (link.to !== "/" && location.pathname.startsWith(link.to));

              // Handle external links
              if (link.openInNewTab || link.to.startsWith("http")) {
                return (
                  <a
                    key={index}
                    href={link.to}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`block text-sm font-medium transition-colors py-2 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  to={link.to}
                  className={`block text-sm font-medium transition-colors py-2 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button variant="default" size="sm" className="btn-micro-animate w-full gap-2 font-semibold" asChild>
              <Link to={contactFormUrl}>
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>
            </Button>
            {ctaButton && (
              <Button variant="outline" size="sm" className="btn-micro-animate w-full gap-2 font-semibold" asChild>
                {ctaButton.url.startsWith("http") ? (
                  <a href={ctaButton.url} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                    {ctaButton.text}
                  </a>
                ) : (
                  <Link to={ctaButton.url} onClick={() => setMobileMenuOpen(false)}>
                    {ctaButton.text}
                  </Link>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;


