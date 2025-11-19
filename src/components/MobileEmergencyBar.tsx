import { Phone, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MobileEmergencyBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Drawer Content */}
      <div
        className={`bg-accent text-accent-foreground shadow-lg border-t-2 border-accent/20 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <Button
            className="w-full btn-micro-animate gap-2 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
            asChild
          >
            <a href="tel:3175551234" className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>24/7 Emergency Response — CALL NOW</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-accent text-accent-foreground py-2 px-4 flex items-center justify-center gap-2 font-semibold shadow-lg border-t-2 border-accent/20"
        aria-label={isOpen ? "Close emergency bar" : "Open emergency bar"}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm">Emergency Service</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 ml-auto" />
        ) : (
          <ChevronUp className="w-4 h-4 ml-auto" />
        )}
      </button>
    </div>
  );
};

export default MobileEmergencyBar;

