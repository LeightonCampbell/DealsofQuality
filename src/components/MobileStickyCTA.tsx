import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileStickyCTAProps {
  onGetQuote: () => void;
  heroRef?: React.RefObject<HTMLElement>;
}

const MobileStickyCTA = ({ onGetQuote, heroRef }: MobileStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      if (!heroRef?.current) {
        // Fallback: show after scrolling 400px
        setIsVisible(window.scrollY > 400);
        return;
      }

      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      setIsVisible(window.scrollY > heroBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, heroRef]);

  const handleClick = () => {
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Small delay to ensure scroll completes, then trigger quote
    setTimeout(() => {
      onGetQuote();
      
      // After modal opens, try to focus the service input
      setTimeout(() => {
        const serviceInput = document.querySelector('input[placeholder*="service"], input[placeholder*="What kind"]') as HTMLInputElement;
        if (serviceInput) {
          serviceInput.focus();
          serviceInput.click(); // Also click to ensure it's active
        }
      }, 800);
    }, 300);
  };

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-accent text-accent-foreground shadow-2xl animate-slide-up">
      <div className="container-max px-4 py-3">
        <Button
          onClick={handleClick}
          className="w-full h-12 text-base font-semibold bg-accent-foreground text-accent hover:bg-accent-foreground/90"
          size="lg"
        >
          Get a Free Quote
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
