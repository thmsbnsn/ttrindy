import { Phone, ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CONTACT_INFO } from "@/config/contact";

const MobileEmergencyBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-accent text-accent-foreground py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-lg border-t-2 border-accent/20 safe-area-inset-bottom"
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

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content - Slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent text-accent-foreground shadow-2xl border-t-2 border-accent/20 transition-transform duration-300 ease-out rounded-t-2xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">24/7 Emergency Service</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent/80 rounded-full transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Call Button */}
          <Button
            className="w-full btn-micro-animate gap-2 font-semibold bg-white hover:bg-white/90 text-accent shadow-lg"
            size="lg"
            asChild
          >
            <a href={CONTACT_INFO.phone.href} className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call Now: {CONTACT_INFO.phone.display}</span>
            </a>
          </Button>
          <p className="text-center text-sm mt-3 text-accent-foreground/80">
            Available 24/7 for immediate assistance
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileEmergencyBar;

