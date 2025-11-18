import { Link } from "react-router-dom";
import topTierIcon from "@/assets/brand/toptiericon.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center bg-white rounded-md shadow-sm p-1.5">
                <img
                  src={topTierIcon}
                  alt="Top Tier Restoration Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-lg leading-none text-white/90 uppercase tracking-tight">
                  TOP TIER
                </span>
                <span className="font-heading text-xs text-white/70 font-normal mt-0.5">
                  Restoration
                </span>
              </div>
            </div>

            <div className="text-sm text-center md:text-left text-white/80">
              © {new Date().getFullYear()} Top Tier Restoration. All rights reserved.
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm text-white/90 font-medium">Licensed & Insured</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70 border-t border-background/20 pt-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors font-medium">
              Privacy Policy
            </Link>
            <span className="text-white/30">•</span>
            <Link to="/terms-of-service" className="hover:text-white transition-colors font-medium">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
