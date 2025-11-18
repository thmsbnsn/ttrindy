import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileEmergencyBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent text-accent-foreground shadow-lg border-t-2 border-accent/20">
      <div className="container mx-auto px-4 py-3">
        <Button
          className="w-full btn-micro-animate gap-2 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
          asChild
        >
          <a href="tel:3175551234" className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <span>📞 24/7 Emergency Response — CALL NOW</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default MobileEmergencyBar;

