import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const MobileBookingFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const popularServicesSection = document.getElementById("popular-services");
      if (popularServicesSection) {
        const rect = popularServicesSection.getBoundingClientRect();
        // Show buttons once user has scrolled to or past the Popular Services section
        setShowButtons(rect.top <= window.innerHeight);
      }
    };

    // Check on mount
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButtons) return null;

  return (
    <>
      {/* Sticky footer - only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden z-50 shadow-lg">
        <div className="flex gap-3">
          <a
            href="tel:+18185847389"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border border-border bg-background text-foreground font-semibold text-sm"
            aria-label="Call us at (818) 584-7389"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call Now
          </a>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm"
            aria-label="Get a free quote for your project"
          >
            Get Free Quote
          </Button>
        </div>
      </div>

      {/* Add padding to body on mobile to account for sticky footer */}
      <div className="h-20 md:hidden" />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStep={1}
        mode="quote"
      />
    </>
  );
};

export default MobileBookingFooter;
