import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import logoBlue from "@/assets/logo-blue.png";
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
  const isServicesPage = location.pathname === "/services";
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 lg:px-16 ${
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border"
        }`}
        role="banner"
      >
        <div className="container-max !py-4">
        <div className="flex items-center justify-between">
          {/* Logo - scroll to top when on current page (home); otherwise navigate to home */}
          <Link
            to="/"
            className="flex items-center"
            aria-label="Go to homepage"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img 
              src={isTransparent ? logoDark : logoBlue} 
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
                    onMouseEnter={() => !isServicesPage && setIsMegaMenuOpen(true)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-0.5 font-medium transition-colors duration-200 ${
                        isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                      }`}
                      onClick={(e) => {
                        if (location.pathname === link.href) {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isMegaMenuOpen && !isServicesPage ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </Link>
                    {!isServicesPage && (
                      <ServicesMegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
                    )}
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
                  onClick={(e) => {
                    if (location.pathname === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA - transparent: white border/text + white phone; sticky: DoQ blue #04548C */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18185847389"
              className={`flex items-center gap-2 font-semibold transition-colors ${
                isTransparent ? "text-white hover:text-white" : "text-foreground hover:opacity-90"
              }`}
              style={!isTransparent ? { color: '#04548C' } : undefined}
            >
              <Phone className={`w-5 h-5 ${isTransparent ? "text-white" : ""}`} style={!isTransparent ? { color: '#04548C' } : undefined} />
              (818) 584-7389
            </a>
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              size="default"
              className={isTransparent
                ? "bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white"
                : "text-white hover:opacity-90"
              }
              style={!isTransparent ? { backgroundColor: '#04548C' } : undefined}
            >
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
                onClick={(e) => {
                  if (location.pathname === "/services") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Services
              </Link>
              <Link
                to="/faqs"
                className={`font-medium transition-colors duration-200 py-2 ${isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}
                onClick={(e) => {
                  if (location.pathname === "/faqs") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
              >
                FAQs
              </Link>
              <Link
                to="/join-as-pro"
                className={`font-medium transition-colors duration-200 py-2 ${isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}
                onClick={(e) => {
                  if (location.pathname === "/join-as-pro") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setIsMenuOpen(false);
                }}
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
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                size="default"
                className={`w-full ${isTransparent ? "bg-transparent border-2 border-white text-white hover:bg-white/10" : "text-white"}`}
                style={!isTransparent ? { backgroundColor: '#04548C' } : undefined}
              >
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
