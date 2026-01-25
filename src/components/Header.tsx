import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import BookingModal from "@/components/BookingModal";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import { useIsMobile } from "@/hooks/use-mobile";

const SCROLL_THRESHOLD = 100;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "FAQs", href: "/faqs" },
    { label: "Join As A Pro", href: "/join-as-pro" },
  ];

  const mobileServiceCategories = [
    { label: "TV Mounting", href: "/services/tv-mounting" },
    { label: "Smart Home", href: "/services/smart-home" },
    { label: "Audio & Video", href: "/services/audio-video" },
    { label: "WiFi & Network", href: "/services/wifi-network" },
    { label: "Home Security", href: "/services/home-security" },
    { label: "Computers & Printers", href: "/services/computers-printers" },
    { label: "Business Services", href: "/services/business" },
  ];

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border"
        }`}
        role="banner"
      >
        <div className="container-max section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
            <img 
              src={isTransparent ? logoDark : logo} 
              alt="Deals Of Quality - Premium Home Services" 
              className="h-10 md:h-12 w-auto" 
              width="150" 
              height="48"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 relative">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <Link
                      to={link.href}
                      className={`font-medium transition-colors duration-200 ${
                        isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <ServicesMegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-medium transition-colors duration-200 ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18185847389"
              className={`flex items-center gap-2 font-semibold transition-colors ${
                isTransparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"
              }`}
            >
              <Phone className={`w-5 h-5 ${isTransparent ? "text-cta" : "text-accent"}`} />
              (818) 584-7389
            </a>
            <Button onClick={() => setIsBookingModalOpen(true)} size="default" className="bg-cta hover:bg-cta/90 text-cta-foreground">
              Find a Pro
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`lg:hidden mt-4 pb-4 pt-4 animate-fade-in ${isTransparent ? "border-t border-white/20 bg-foreground/95 backdrop-blur-sm" : "border-t border-border"}`}>
            <div className="flex flex-col gap-4">
              <Link
                to="/services"
                className={`font-medium transition-colors duration-200 py-2 ${isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/faqs"
                className={`font-medium transition-colors duration-200 py-2 ${isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link
                to="/join-as-pro"
                className={`font-medium transition-colors duration-200 py-2 ${isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Join As A Pro
              </Link>
              <a
                href="tel:+18185847389"
                className={`flex items-center gap-2 font-semibold py-2 ${isTransparent ? "text-white/90" : "text-foreground"}`}
              >
                <Phone className="w-5 h-5 text-accent" />
                (818) 584-7389
              </a>
              <Button onClick={() => setIsBookingModalOpen(true)} size="default" className="w-full bg-cta hover:bg-cta/90 text-cta-foreground">
                Find a Pro
              </Button>
            </div>
          </nav>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService=""
        initialZip=""
        mode="booking"
      />
    </header>
    </>
  );
};

export default Header;
