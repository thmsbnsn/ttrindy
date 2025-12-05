// src/pages/Construction.tsx
import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { Construction, Users } from "lucide-react";
import { getConstructionPage, getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import PasswordModal from "@/components/PasswordModal";
import type { ConstructionPage, SiteSettings } from "@/types/sanity";
import topTierIcon from "@/assets/brand/toptiericon.png";

interface ConstructionProps {
  initialData?: ConstructionPage | null;
}

const Construction = ({ initialData }: ConstructionProps) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Use initialData directly - don't store in state to avoid re-renders
  const constructionPage = initialData;

  // Preload background image with timeout
  useEffect(() => {
    const img = new Image();
    let timeoutId: NodeJS.Timeout;

    const handleLoad = () => {
      clearTimeout(timeoutId);
      setBackgroundLoaded(true);
    };

    const handleError = () => {
      clearTimeout(timeoutId);
      // If image fails to load, still show the page with fallback
      setBackgroundLoaded(true);
    };

    // Timeout after 3 seconds - show page even if image is still loading
    timeoutId = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 3000);

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = '/Construction.png';

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("ttr_auth_token");
    const timestamp = localStorage.getItem("ttr_auth_timestamp");

    if (token && timestamp) {
      // Check if token is still valid (24 hours)
      const tokenAge = Date.now() - parseInt(timestamp, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (tokenAge < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Token expired, clear it
        localStorage.removeItem("ttr_auth_token");
        localStorage.removeItem("ttr_auth_timestamp");
      }
    }

    // Fetch site settings for branding
    getSiteSettings()
      .then((settings) => {
        if (settings) {
          setSiteSettings(settings);
        }
      })
      .catch((error) => {
        console.error("Error fetching site settings:", error);
      });
  }, []); // Empty dependency array - only run once

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setIsPasswordModalOpen(false);
    // Reload the page to access the site
    window.location.href = "/";
  };

  // If authenticated, don't show construction page (should redirect in App.tsx)
  if (isAuthenticated) {
    return null;
  }

  // Safety check - if no initialData, show minimal fallback
  if (!constructionPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const heading = constructionPage?.heading || "We're Under Construction";
  const subheading = constructionPage?.subheading || "We're working hard to bring you an amazing experience. Check back soon!";
  const password = constructionPage?.password || "";

  // Get logo from site settings or fallback
  const logoUrl = siteSettings?.branding?.logo?.asset
    ? urlFor(siteSettings.branding.logo).width(120).height(120).url()
    : topTierIcon;
  const logoAlt = siteSettings?.branding?.logo?.alt || "Top Tier Restoration Logo";
  const siteName = siteSettings?.branding?.siteName || "Top Tier Restoration";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Image - use img tag for better performance */}
      <img
        src="/Construction.png"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          backgroundLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'opacity' }}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setBackgroundLoaded(true)}
        onError={() => setBackgroundLoaded(true)}
      />

      {/* Fallback background while image loads */}
      {!backgroundLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="max-w-2xl w-full text-center space-y-12 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-lg p-4">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Construction Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Construction className="w-24 h-24 md:w-32 md:h-32 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-foreground uppercase tracking-tight">
            {heading}
          </h1>

          {subheading && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Site Name */}
        <div>
          <p className="text-sm md:text-base text-muted-foreground font-logo uppercase tracking-wider">
            {siteName}
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Button
            size="lg"
            className="btn-micro-animate gap-2 font-semibold text-lg px-8 py-6"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <Users className="w-5 h-5" />
            Part of the team?
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>
      </div>

      {/* Password Modal */}
      {password && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handlePasswordSuccess}
          correctPassword={password}
        />
      )}
    </div>
  );
};

export default memo(Construction);

