import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "@/assets/pagesImages/index/hero.webp";
import { CONTACT_INFO } from "@/config/contact";
import { getHomePage } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { HomePage, StatCard } from "@/types/sanity";

const Hero = () => {
  const [homePage, setHomePage] = useState<HomePage | null>(null);

  useEffect(() => {
    getHomePage()
      .then((page) => {
        if (page) {
          setHomePage(page);
        }
      })
      .catch((error) => {
        console.error("Error fetching home page:", error);
      });
  }, []);

  // Get hero data from CMS or use fallback
  const hero = homePage?.hero;
  const headline = hero?.headline || "Restore Your Home to Top Tier Condition";
  const subheadline = hero?.subheadline || "Professional restoration for water, fire, storm, and structural damage. When disaster strikes, we bring your property back to life with fast response, licensed professionals, and proven results.";
  const backgroundImage = hero?.backgroundImage?.asset
    ? urlFor(hero.backgroundImage).width(1920).height(1080).url()
    : heroImage;
  const backgroundImageAlt = hero?.backgroundImage?.alt || "Home restoration transformation - from fire damage to fully restored room";
  const primaryCta = hero?.primaryCta || { text: "Contact Us", url: CONTACT_INFO.contactFormUrl };
  const secondaryCta = hero?.secondaryCta || { text: "Learn More", url: "/services" };
  
  // Get stats - use fallback for now (HomePage doesn't have statsSection yet)
  const stats: StatCard[] = [
    { number: "20+", label: "Years Experience" },
    { number: "1000+", label: "Homes Restored" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={backgroundImageAlt}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-2xl ml-0 md:ml-4 lg:ml-8 xl:ml-12 backdrop-blur-sm bg-black/10 rounded-lg p-6 md:p-8">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-hero uppercase drop-shadow-2xl">
              {headline ? (
                headline.split(" ").map((word, i, arr) => {
                  const isPrimary = word.toLowerCase().includes("tier") || word.toLowerCase().includes("top");
                  return (
                    <span key={i}>
                      {isPrimary ? (
                        <span className="text-primary">{word}</span>
                      ) : (
                        word
                      )}
                      {i < arr.length - 1 && " "}
                    </span>
                  );
                })
              ) : (
                <>
                  Restore Your Home to <span className="text-primary">Top Tier</span> Condition
                </>
              )}
            </h1>

            {subheadline && (
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                className="btn-micro-animate gap-2 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                {primaryCta.url.startsWith("http") ? (
                  <a href={primaryCta.url} target="_blank" rel="noopener noreferrer">
                    {primaryCta.text}
                  </a>
                ) : (
                  <Link to={primaryCta.url}>
                    {primaryCta.text}
                  </Link>
                )}
              </Button>
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-micro-animate btn-micro-animate-outline gap-2 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  asChild
                >
                  {secondaryCta.url.startsWith("http") ? (
                    <a href={secondaryCta.url} target="_blank" rel="noopener noreferrer">
                      {secondaryCta.text}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  ) : (
                    <Link to={secondaryCta.url}>
                      {secondaryCta.text}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                </Button>
              )}
            </div>

            {/* Trust Indicators - Improved Styling */}
            <div className="pt-6 border-t border-white/20">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="flex items-center gap-0.5">
                    <span className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</span>
                  </div>
                  <span className="text-xs text-white font-semibold">5.0 Google Rating</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-xs text-white font-semibold">Licensed • Bonded • Insured</span>
                </div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-xs text-white font-semibold">Locally Owned in Indianapolis</span>
                </div>
              </div>

              {/* Stats Grid */}
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-3xl md:text-4xl font-bold text-primary drop-shadow-lg mb-1">
                      {stat.number}
                    </dd>
                    <dd className="text-xs md:text-sm text-gray-200 font-medium">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
