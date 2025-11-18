import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import topTierIcon from "@/assets/brand/toptiericon.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto pb-20 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand & Contact Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm p-1.5">
                  <img
                    src={topTierIcon}
                    alt="Top Tier Restoration Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-logo text-lg leading-none text-white/90 uppercase tracking-tight">
                    TOP TIER
                  </span>
                  <span className="font-logo text-xs text-white/70 font-normal mt-0.5">
                    Restoration
                  </span>
                </div>
              </div>

              {/* NAP Information */}
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="tel:3175551234" className="hover:text-white transition-colors">
                    (317) XXX-XXXX
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@toptierrestoration.com" className="hover:text-white transition-colors">
                    info@toptierrestoration.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Indianapolis, IN</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hours:</p>
                    <p>Mon - Fri: 8am - 5pm</p>
                    <p className="text-accent font-semibold">24/7 Emergency Service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-lg">Service Areas</h3>
              <p className="text-sm text-white/80">
                Serving Indianapolis, Carmel, Noblesville, Greenwood, Mooresville, Avon, Brownsburg, and surrounding Indiana areas.
              </p>
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white/90 font-medium">Licensed & Insured</span>
                </div>
                <p className="text-xs text-white/60">Indiana License #: IN-12345-PLACEHOLDER</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-white text-lg">Quick Links</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link to="/services" className="text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
                <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                  Gallery
                </Link>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/about#contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Legal Links & Copyright */}
          <div className="border-t border-background/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-center md:text-left text-white/80">
                © {new Date().getFullYear()} Top Tier Restoration. All rights reserved.
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
