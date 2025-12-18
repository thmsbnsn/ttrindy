import { Link } from "react-router-dom";
import { Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import topTierIcon from "@/assets/brand/toptiericon.png";
import { CONTACT_INFO } from "@/config/contact";
import { getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

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

  // Get logo from CMS or fallback
  const logoUrl = siteSettings?.branding?.logo?.asset
    ? urlFor(siteSettings.branding.logo).width(44).height(44).url()
    : topTierIcon;
  const logoAlt = siteSettings?.branding?.logo?.alt || "Top Tier Restoration Logo";

  // Get contact info from CMS or fallback
  const contactFormUrl = CONTACT_INFO.contactFormUrl;
  const email = siteSettings?.contact?.email || CONTACT_INFO.email.display;
  const emailHref = siteSettings?.contact?.email
    ? `mailto:${siteSettings.contact.email}`
    : CONTACT_INFO.email.href;
  const address = siteSettings?.contact?.address
    ? `${siteSettings.contact.address.city}, ${siteSettings.contact.address.state}`
    : CONTACT_INFO.address.full;
  const serviceArea = siteSettings?.contact?.serviceArea || `Greater ${CONTACT_INFO.address.city} Metro Area`;

  // Get footer links from CMS or fallback
  const quickLinks = siteSettings?.footer?.quickLinks || [
    { title: "Services", url: "/services", openInNewTab: false },
    { title: "Gallery", url: "/gallery", openInNewTab: false },
    { title: "Blog", url: "/blog", openInNewTab: false },
    { title: "About Us", url: "/about", openInNewTab: false },
    { title: "Contact", url: "/about#contact", openInNewTab: false },
  ];

  // Get copyright text
  const copyrightText = siteSettings?.footer?.copyrightText
    ? siteSettings.footer.copyrightText.replace("{year}", new Date().getFullYear().toString())
    : `© ${new Date().getFullYear()} Top Tier Restoration. All rights reserved.`;

  // Social media icons mapping
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  return (
    <footer className="bg-foreground text-background py-12 mt-auto pb-20 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand & Contact Info */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm p-1.5">
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
              </div>

              {/* About Text */}
              {siteSettings?.footer?.aboutText && (
                <p className="text-sm text-white/80 text-center md:text-left">
                  {siteSettings.footer.aboutText}
                </p>
              )}

              {/* NAP Information */}
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href={emailHref} className="hover:text-white transition-colors">
                    Email Us Today
                  </a>
                </div>
                {siteSettings?.contact?.address && (
                  <div className="flex items-start justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      {siteSettings.contact.address.street && `${siteSettings.contact.address.street}, `}
                      {address}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hours:</p>
                    <p>{CONTACT_INFO.hours.regular}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {siteSettings?.socialMedia && (
                <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                  {Object.entries(siteSettings.socialMedia).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = socialIcons[platform as keyof typeof socialIcons];
                    if (!Icon) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label={`Visit our ${platform} page`}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Service Areas */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-white text-lg">Service Areas</h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/80 font-medium">Serving:</p>
                <p className="text-sm text-white/80">
                  {serviceArea}
                </p>
                {CONTACT_INFO.serviceAreas.length > 0 && (
                  <>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {CONTACT_INFO.serviceAreas.map((city) => (
                        <span
                          key={city}
                          className="px-3 py-1.5 text-xs font-medium bg-white/10 text-white/90 rounded-md hover:bg-white/15 transition-colors"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/60 italic">and surrounding Indiana areas</p>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center md:items-start gap-2 mt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white/90 font-medium">Licensed | Bonded | Insured</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-white text-lg">Quick Links</h3>
              <nav className="flex flex-col gap-2 text-sm">
                {quickLinks.map((link, index) => {
                  if (link.url.startsWith("http")) {
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target={link.openInNewTab ? "_blank" : undefined}
                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      to={link.url}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Legal Links & Copyright */}
          <div className="border-t border-background/20 pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-center text-white/80">
                {copyrightText}
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                <Link to="/privacy-policy" className="hover:text-white transition-colors font-medium">
                  Privacy Policy
                </Link>
                <span className="text-white/30">•</span>
                <Link to="/terms-of-service" className="hover:text-white transition-colors font-medium">
                  Terms of Service
                </Link>
                <span className="text-white/30">•</span>
                <Link to="/accessibility" className="hover:text-white transition-colors font-medium">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
