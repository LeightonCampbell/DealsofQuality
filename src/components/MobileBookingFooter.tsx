import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const MobileBookingFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Sticky footer - only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden z-50 shadow-lg">
        <div className="flex gap-3">
          <a
            href="tel:+18185847389"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border border-border bg-background text-foreground font-semibold"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-12 bg-cta hover:bg-cta/90 text-cta-foreground font-semibold"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Add padding to body on mobile to account for sticky footer */}
      <div className="h-20 md:hidden" />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MobileBookingFooter;
