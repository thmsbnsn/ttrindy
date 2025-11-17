import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import topTierIcon from "@/assets/brand/toptiericon.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={topTierIcon}
                alt="Top Tier Restoration Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">Top Tier</span>
              <span className="text-xs text-muted-foreground">Restoration</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Button variant="default" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">24/7 Emergency</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/blog"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button variant="default" size="sm" className="w-full gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">24/7 Emergency</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
