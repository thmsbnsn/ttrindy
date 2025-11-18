import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/pagesImages/index/hero.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Home restoration transformation - from fire damage to fully restored room"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-3xl backdrop-blur-sm bg-black/10 rounded-lg p-6 md:p-8">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              24/7 Emergency Response Available
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-hero uppercase drop-shadow-2xl">
              Restore Your Home to{" "}
              <span className="text-primary">Top Tier</span> Condition
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              Professional restoration services for water damage, fire damage, storm damage,
              and complete remodeling. We bring your home back to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="tel:5551234567">
                  <Phone className="w-5 h-5" />
                  Call for Emergency Service
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/services">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <dl className="flex flex-wrap gap-8 pt-8 text-white">
              <div className="min-w-[120px]">
                <dt className="sr-only">Years of Experience</dt>
                <dd className="text-4xl font-bold text-primary drop-shadow-lg">15+</dd>
                <dd className="text-sm text-gray-200 font-medium mt-1">Years Experience</dd>
              </div>
              <div className="min-w-[120px]">
                <dt className="sr-only">Homes Restored</dt>
                <dd className="text-4xl font-bold text-primary drop-shadow-lg">1000+</dd>
                <dd className="text-sm text-gray-200 font-medium mt-1">Homes Restored</dd>
              </div>
              <div className="min-w-[120px]">
                <dt className="sr-only">Emergency Service Availability</dt>
                <dd className="text-4xl font-bold text-primary drop-shadow-lg">24/7</dd>
                <dd className="text-sm text-gray-200 font-medium mt-1">Emergency Service</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
