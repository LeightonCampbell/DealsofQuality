import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import BookingModal from "@/components/BookingModal";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border" role="banner">
        <div className="container-max section-padding !py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
            <img 
              src={logo} 
              alt="Deals Of Quality - Premium Home Services" 
              className="h-10 md:h-12 w-auto" 
              width="150" 
              height="48"
              loading="eager"
              fetchpriority="high"
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
                      className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
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
                  className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
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
              className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-accent" />
              (818) 584-7389
            </a>
            <Button onClick={() => setIsBookingModalOpen(true)} size="default">
              Find a Pro
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {/* Mobile Services - Direct Link (No Mega Menu on Mobile) */}
              <Link
                to="/services"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>

              <Link
                to="/faqs"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>

              <Link
                to="/join-as-pro"
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Join As A Pro
              </Link>

              <a
                href="tel:+18185847389"
                className="flex items-center gap-2 text-foreground font-semibold py-2"
              >
                <Phone className="w-5 h-5 text-accent" />
                (818) 584-7389
              </a>
              <Button onClick={() => setIsBookingModalOpen(true)} size="default" className="w-full">
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
      />
    </header>
    </>
  );
};

export default Header;
