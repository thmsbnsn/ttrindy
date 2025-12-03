// src/pages/Construction.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Construction, Users } from "lucide-react";
import { getConstructionPage, getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import PasswordModal from "@/components/PasswordModal";
import type { ConstructionPage, SiteSettings } from "@/types/sanity";
import topTierIcon from "@/assets/brand/toptiericon.png";

const Construction = () => {
  const [constructionPage, setConstructionPage] = useState<ConstructionPage | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    // Fetch construction page settings
    getConstructionPage()
      .then((page) => {
        if (page) {
          setConstructionPage(page);
        }
      })
      .catch((error) => {
        console.error("Error fetching construction page:", error);
      });

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
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
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
            <Construction className="w-24 h-24 md:w-32 md:h-32 text-primary animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
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
        <div className="pt-4">
          <p className="text-sm md:text-base text-muted-foreground font-logo uppercase tracking-wider">
            {siteName}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
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
        <div className="pt-12 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
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

export default Construction;

