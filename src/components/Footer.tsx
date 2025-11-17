import { Link } from "react-router-dom";
import topTierIcon from "@/assets/brand/toptiericon.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src={topTierIcon}
                  alt="Top Tier Restoration Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-none">Top Tier</span>
                <span className="text-xs opacity-70">Restoration</span>
              </div>
            </div>

            <div className="text-sm text-center md:text-left opacity-80">
              © {new Date().getFullYear()} Top Tier Restoration. All rights reserved.
            </div>

            <div className="text-sm opacity-80">
              Licensed & Insured
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80 border-t border-background/20 pt-6">
            <Link to="/privacy-policy" className="hover:text-background/100 transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-50">•</span>
            <Link to="/terms-of-service" className="hover:text-background/100 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
