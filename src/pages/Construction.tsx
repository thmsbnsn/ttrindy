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

  // If no initialData, return null (App.tsx should handle loading state)
  if (!constructionPage) {
    return null;
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
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Image - use img tag for better performance */}
      <img
        src="/Construction.png"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          backgroundLoaded ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ willChange: 'opacity' }}
        loading="eager"
        fetchpriority="high"
        onLoad={() => setBackgroundLoaded(true)}
        onError={() => setBackgroundLoaded(true)}
      />

      {/* Fallback background - always show for seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="max-w-2xl w-full text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 animate-fade-in relative z-10 overflow-y-auto max-h-full">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-lg shadow-lg p-2 sm:p-3 md:p-4">
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
            <Construction className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-hero font-bold text-foreground uppercase tracking-tight leading-tight">
            {heading}
          </h1>

          {subheading && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed px-2">
              {subheading}
            </p>
          )}
        </div>

        {/* Site Name */}
        <div>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-logo uppercase tracking-wider">
            {siteName}
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Button
            size="lg"
            className="btn-micro-animate gap-2 font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
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

