import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Navigation, Loader2, FileCheck, ShieldCheck, DollarSign, Clock, Star, CheckCircle2, BadgeCheck } from "lucide-react";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import BookingModal from "@/components/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";
import heroProfessional from "@/assets/hero-professional.jpg";

// Validate US ZIP code (5 digits, range 00501-99950)
const isValidUSZipCode = (zip: string): boolean => {
  if (!zip || zip.length !== 5) return false;
  const zipNum = parseInt(zip, 10);
  return zipNum >= 501 && zipNum <= 99950 && !isNaN(zipNum);
};

// All services from Services page for autosuggest
const allServices = [
  // Home Services
  { value: "handyman-services", label: "Handyman Services", route: "/handyman-services" },
  { value: "painting", label: "Painting", route: "/painting" },
  { value: "flooring-installation", label: "Flooring Installation", route: "/flooring-installation" },
  { value: "drywall-installation", label: "Drywall Installation", route: "/drywall-installation" },
  { value: "cabinet-installation", label: "Cabinet Installation", route: "/cabinet-installation" },
  { value: "tile-work", label: "Tile Work", route: "/tile-work" },
  { value: "window-door-replacement", label: "Window and Door Replacement", route: "/window-door-replacement" },
  { value: "deck-patio-building", label: "Deck and Patio Building", route: "/deck-patio-building" },
  { value: "fence-installation", label: "Fence Installation", route: "/fence-installation" },
  { value: "bathroom-remodeling", label: "Bathroom Remodeling", route: "/bathroom-remodeling" },
  { value: "kitchen-remodeling", label: "Kitchen Remodeling", route: "/kitchen-remodeling" },
  { value: "plumbing", label: "Plumbing", route: "/plumbing" },
  { value: "electrical", label: "Electrical", route: "/electrical" },
  { value: "hvac", label: "HVAC", route: "/hvac" },
  { value: "roofing", label: "Roofing", route: "/roofing" },
  { value: "appliance-repair", label: "Appliance Repair", route: "/appliance-repair" },
  { value: "water-heater-installation", label: "Water Heater Installation", route: "/water-heater-installation" },
  { value: "gutter-installation", label: "Gutter Installation", route: "/gutter-installation" },
  { value: "siding-installation", label: "Siding Installation", route: "/siding-installation" },
  { value: "garage-door-installation", label: "Garage Door Installation", route: "/garage-door-installation" },
  { value: "solar-panel-installation", label: "Solar Panel Installation", route: "/solar-panel-installation" },
  { value: "house-cleaning", label: "House Cleaning", route: "/house-cleaning" },
  { value: "carpet-cleaning", label: "Carpet Cleaning", route: "/carpet-cleaning" },
  { value: "junk-removal", label: "Junk Removal", route: "/junk-removal" },
  { value: "pressure-washing", label: "Pressure Washing", route: "/pressure-washing" },
  { value: "gutter-cleaning", label: "Gutter Cleaning", route: "/gutter-cleaning" },
  { value: "pest-control", label: "Pest Control", route: "/pest-control" },
  { value: "organization-services", label: "Organization Services", route: "/organization-services" },
  { value: "landscaping", label: "Landscaping", route: "/landscaping" },
  { value: "snow-removal", label: "Snow Removal", route: "/snow-removal" },
  // TV Mounting
  { value: "tv-mounting-up-to-50", label: "TV Mounting (Up to 50\")", route: "/tv-mounting-up-to-50" },
  { value: "tv-mounting-51-to-65", label: "TV Mounting (51\"-65\")", route: "/tv-mounting-51-to-65" },
  { value: "tv-mounting-over-65", label: "TV Mounting (Over 65\")", route: "/tv-mounting-over-65" },
  { value: "tv-cable-concealment", label: "TV Cable Concealment", route: "/tv-cable-concealment" },
  { value: "soundbar-installation", label: "Soundbar Installation", route: "/soundbar-installation" },
  { value: "tv-dismount-remount", label: "TV Dismount/Remount", route: "/tv-dismount-remount" },
  // Smart Home
  { value: "smart-thermostats", label: "Smart Thermostats", route: "/smart-thermostats" },
  { value: "video-doorbells", label: "Video Doorbells", route: "/video-doorbells" },
  { value: "smart-locks", label: "Smart Locks", route: "/smart-locks" },
  { value: "smart-home-integration", label: "Smart Home Integration", route: "/smart-home-integration" },
  // Audio & Video
  { value: "home-theater", label: "Home Theater", route: "/home-theater" },
  { value: "surround-sound", label: "Surround Sound", route: "/surround-sound" },
  { value: "streaming-setup", label: "Streaming Setup", route: "/streaming-setup" },
  { value: "gaming-setup", label: "Gaming Setup", route: "/gaming-setup" },
  // WiFi & Network
  { value: "router-setup", label: "Router Setup", route: "/router-setup" },
  { value: "network-optimization", label: "Network Optimization", route: "/network-optimization" },
  { value: "dead-zone-elimination", label: "Dead Zone Elimination", route: "/dead-zone-elimination" },
  { value: "business-networks", label: "Business Networks", route: "/business-networks" },
  // Home Security
  { value: "security-cameras", label: "Security Cameras", route: "/security-cameras" },
  { value: "motion-sensors", label: "Motion Sensors", route: "/motion-sensors" },
  // Computers & Printers
  { value: "computer-repair", label: "Computer Repair", route: "/computer-repair" },
  { value: "virus-removal", label: "Virus Removal", route: "/virus-removal" },
  { value: "printer-setup", label: "Printer Setup", route: "/printer-setup" },
  { value: "data-backup", label: "Data Backup", route: "/data-backup" },
  // Business Services
  { value: "website-design", label: "Website Design", route: "/website-design" },
  { value: "remote-support-service", label: "Remote Support", route: "/remote-support-service" },
  { value: "business-it-solutions", label: "Business IT Solutions", route: "/business-it-solutions" },
  { value: "custom-solutions", label: "Custom Solutions", route: "/custom-solutions" },
];

const HeroNew = () => {
  const isMobile = useIsMobile();
  const zipInputRef = useRef<HTMLInputElement>(null);
  const otherServiceInputRef = useRef<HTMLInputElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  
  const [selectedService, setSelectedService] = useState("");
  const [customServiceText, setCustomServiceText] = useState("");
  const [serviceInputValue, setServiceInputValue] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeFocused, setZipCodeFocused] = useState(false);
  const [zipCodeError, setZipCodeError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [availablePros] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Determine if "Other" is selected or if user typed a custom service
  const isOther = selectedService === "other" || (serviceInputValue.length > 0 && !allServices.find(s => s.label.toLowerCase() === serviceInputValue.toLowerCase()));
  
  // Get the actual service value (either selected or custom)
  const serviceValue = isOther ? (customServiceText || serviceInputValue) : selectedService;
  
  // Validate zip code
  const isZipValid = zipCode.length === 5 && isValidUSZipCode(zipCode);
  
  // Button enabled state: service must be selected/typed AND zip must be valid US zip code
  const isButtonEnabled = (serviceValue.length > 0) && isZipValid;

  // Track if service was selected via click (not typing)
  const [serviceSelectedViaClick, setServiceSelectedViaClick] = useState(false);

  // Sequential highlight logic: Glow zip code when service is selected (only when a service is actually selected via click, not while typing)
  useEffect(() => {
    // Only highlight zip code when a service is actually selected from dropdown via click, not while user is typing
    if (serviceSelectedViaClick && selectedService && selectedService.length > 0 && !zipCodeFocused) {
      setZipCodeFocused(true);
      const timer = setTimeout(() => {
        setZipCodeFocused(false);
        setServiceSelectedViaClick(false); // Reset flag after highlighting
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [serviceSelectedViaClick, selectedService, zipCodeFocused]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(target) &&
        otherServiceInputRef.current &&
        !otherServiceInputRef.current.contains(target)
      ) {
        setIsServiceDropdownOpen(false);
      }
    };
    if (isServiceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isServiceDropdownOpen]);

  // Handle service selection from autosuggest (only called when user clicks a suggestion)
  const handleServiceSelect = (service: typeof allServices[0]) => {
    setServiceInputValue(service.label);
    setSelectedService(service.value);
    setCustomServiceText("");
    setIsServiceDropdownOpen(false);
    setServiceSelectedViaClick(true); // Mark that this was a click selection
    setZipCodeFocused(true);
    // Only auto-focus zip code on mobile when a service is explicitly selected from dropdown
    if (isMobile && zipInputRef.current) {
      setTimeout(() => {
        zipInputRef.current?.focus();
      }, 100);
    }
    setTimeout(() => {
      setZipCodeFocused(false);
    }, 3000);
  };

  // Filter services based on input for autosuggest
  const filteredServices = useMemo(() => {
    if (serviceInputValue.length === 0) return [];
    const query = serviceInputValue.toLowerCase();
    return allServices
      .filter(s => s.label.toLowerCase().includes(query))
      .slice(0, 8);
  }, [serviceInputValue]);

  // Handle service input change with autosuggest
  // IMPORTANT: This function should NEVER trigger focus changes - only typing logic
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServiceInputValue(value);
    setServiceSelectedViaClick(false); // Reset click flag when user types
    
    if (value.length > 0) {
      setIsServiceDropdownOpen(true);
    } else {
      setIsServiceDropdownOpen(false);
      setSelectedService("");
      setCustomServiceText("");
      return;
    }
    
    // Find exact match for autocomplete, but don't trigger focus
    const exactMatch = allServices.find(s => s.label.toLowerCase() === value.toLowerCase().trim());
    if (exactMatch) {
      setSelectedService(exactMatch.value);
      setCustomServiceText("");
    } else {
      setCustomServiceText(value);
      const currentFiltered = allServices
        .filter(s => s.label.toLowerCase().includes(value.toLowerCase().trim()))
        .slice(0, 8);
      if (currentFiltered.length === 0 && value.trim().length > 0) {
        setSelectedService("other");
      } else {
        setSelectedService("");
      }
    }
  };

  // Handle zip code change with validation
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    
    if (value.length === 5) {
      if (isValidUSZipCode(value)) {
        setZipCodeError("");
      } else {
        setZipCodeError("Please enter a valid US ZIP code (00501-99950)");
      }
    } else {
      setZipCodeError("");
    }
  };

  // Geolocation handler
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await response.json();
            
            if (data.postcode) {
              const zip = data.postcode.replace(/\D/g, '').slice(0, 5);
              if (zip.length === 5 && isValidUSZipCode(zip)) {
                setZipCode(zip);
                setZipCodeError("");
                setIsLocating(false);
                return;
              }
            }
          } catch (e) {
            console.log("BigDataCloud failed, trying alternative...");
          }
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
            );
            const data = await response.json();
            
            if (data.address?.postcode) {
              const zip = data.address.postcode.replace(/\D/g, '').slice(0, 5);
              if (zip.length === 5 && isValidUSZipCode(zip)) {
                setZipCode(zip);
                setZipCodeError("");
                setIsLocating(false);
                return;
              }
            }
          } catch (e) {
            console.log("Nominatim failed");
          }
          
          alert("Could not determine your zip code automatically. Please enter it manually.");
        } catch (error) {
          console.error("Error getting zip code:", error);
          alert("Could not determine your zip code. Please enter it manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        let message = "Could not get your location. ";
        if (error.code === error.PERMISSION_DENIED) {
          message += "Please allow location access or enter your zip code manually.";
        } else {
          message += "Please enter your zip code manually.";
        }
        alert(message);
      }
    );
  };

  const handleFindPro = () => {
    setValidationError("");
    
    if (!serviceValue || serviceValue.length === 0) {
      setValidationError("Please enter your service need and location");
      return;
    }
    
    if (!isZipValid) {
      setValidationError("Please enter your service need and location");
      return;
    }
    
    setIsModalOpen(true);
  };

  return (
    <>
      <section 
        ref={heroSectionRef} 
        className="relative overflow-hidden" 
        aria-label="Hero section - Find local professionals"
      >
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <img
            src={heroProfessional}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            aria-hidden="true"
          />
          {/* Gradient overlay - darker on left for text, clear on right */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/20 lg:via-foreground/50 lg:to-transparent" 
            aria-hidden="true" 
          />
        </div>
        
        <div className="container-max px-4 relative z-10 pt-28 pb-8 md:pt-36 md:pb-12 lg:pt-40 lg:pb-16">
          {/* Content - Centered on mobile, left aligned on desktop */}
          <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
            {/* Social Proof Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in border border-white/20 w-fit mx-auto lg:mx-0">
              <Star className="w-4 h-4 fill-current text-cta" />
              <span>Trusted by 10,000+ homeowners</span>
            </div>
            
            {/* Headline - Two lines only, always on separate lines */}
            <h1 className="font-display text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-bold text-white leading-tight mb-4 animate-fade-in animation-delay-100 tracking-tight text-center lg:text-left">
              <span className="block whitespace-nowrap">Trusted Local Pros for Any Project</span>
              <span className="block text-cta mt-1 whitespace-nowrap">Get a Quote in Minutes</span>
            </h1>

            {/* Subtext - 17px */}
            <p className="text-[17px] text-white/80 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in-up animation-delay-200 text-center lg:text-left">
              Fast, reliable, and vetted professionals for essential home and business services.
            </p>

            {/* Search Widget Card */}
            <div className="animate-fade-in-up animation-delay-300">
              <form onSubmit={(e) => { e.preventDefault(); handleFindPro(); }} className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col gap-3 max-w-2xl mx-auto lg:mx-0" role="search" aria-label="Service search form">
                {/* Service Input with Autosuggest */}
                <div className="relative w-full" ref={serviceDropdownRef}>
                  <div className="relative">
                    <Input
                      ref={otherServiceInputRef}
                      type="text"
                      placeholder="What service do you need?"
                      value={serviceInputValue}
                      onChange={(e) => {
                        handleServiceInputChange(e);
                        if (validationError) setValidationError("");
                      }}
                      role="combobox"
                      aria-label="Service type"
                      aria-autocomplete="list"
                      aria-controls="service-suggestions"
                      aria-expanded={isServiceDropdownOpen && filteredServices.length > 0}
                      aria-haspopup="listbox"
                      onFocus={() => {
                        if (serviceInputValue.length > 0) {
                          setIsServiceDropdownOpen(true);
                        }
                      }}
                      className={`w-full h-12 md:h-14 border-0 bg-transparent text-base px-4 focus:ring-0 focus:ring-offset-0 text-foreground ${
                        validationError && !serviceValue ? "placeholder:text-destructive text-destructive" : "placeholder:text-muted-foreground"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsServiceDropdownOpen(false);
                        }
                      }}
                    />
                    {isServiceDropdownOpen && filteredServices.length > 0 && (
                      <div id="service-suggestions" className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto" role="listbox" aria-label="Service suggestions">
                        {filteredServices.map((service) => (
                          <button
                            key={service.value}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleServiceSelect(service);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-accent/10 transition-colors text-base"
                          >
                            {service.label}
                          </button>
                        ))}
                        {serviceInputValue.length > 0 && filteredServices.length === 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedService("other");
                              setCustomServiceText(serviceInputValue);
                              setIsServiceDropdownOpen(false);
                              setServiceSelectedViaClick(true); // Mark that this was a click selection
                              setZipCodeFocused(true);
                              // Only auto-focus zip code on mobile when "Use" button is clicked
                              if (isMobile && zipInputRef.current) {
                                setTimeout(() => {
                                  zipInputRef.current?.focus();
                                }, 100);
                              }
                              setTimeout(() => {
                                setZipCodeFocused(false);
                              }, 3000);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-accent/10 transition-colors text-base border-t border-border font-medium"
                          >
                            Use "{serviceInputValue}"
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Zip Code Input with Locate Me */}
                <div className="flex flex-col w-full">
                  <div 
                    className={`flex items-center gap-2 px-4 border-t border-border relative transition-all duration-300 ${
                      zipCodeFocused ? "ring-2 ring-accent/50 rounded-md" : ""
                    } ${
                      zipCodeError ? "ring-2 ring-destructive/50 rounded-md" : ""
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                      ref={zipInputRef}
                      type="tel"
                      inputMode="numeric"
                      placeholder={zipCodeFocused ? "e.g. 90210" : "ZIP Code"}
                      value={zipCode}
                      onChange={(e) => {
                        handleZipChange(e);
                        if (validationError) setValidationError("");
                      }}
                      maxLength={5}
                      className={`flex-1 py-3 md:py-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-[15px] ${
                        validationError && !isZipValid ? "text-destructive placeholder:text-destructive" : "text-foreground placeholder:text-muted-foreground"
                      }`}
                      aria-label="ZIP Code"
                      aria-invalid={zipCodeError ? "true" : "false"}
                      aria-describedby={zipCodeError ? "zip-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={handleLocateMe}
                      disabled={isLocating}
                      className="flex-shrink-0 text-muted-foreground hover:text-accent transition-colors disabled:opacity-50"
                      aria-label="Use my location"
                      title="Use my location"
                    >
                      {isLocating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Navigation className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {zipCodeError && (
                    <p id="zip-error" className="text-xs text-destructive mt-1 px-4" role="alert">{zipCodeError}</p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all w-full"
                >
                  Get a Free Quote
                </Button>
              </form>
              
              {/* Validation Error Message */}
              {validationError && (
                <div className="mt-3 text-white bg-destructive/80 px-3 py-2 rounded-md text-sm font-medium animate-fade-in text-center lg:text-left" role="alert">
                  {validationError}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Trust Badges - Centered below hero content */}
        <div className="relative z-10 bg-foreground/95 backdrop-blur-sm border-t border-white/10">
          <div className="container-max px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-3">
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-cta flex-shrink-0" />
                <span className="text-white/90 font-medium whitespace-nowrap">Background Checked</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <FileCheck className="w-3 h-3 md:w-4 md:h-4 text-cta flex-shrink-0" />
                <span className="text-white/90 font-medium whitespace-nowrap">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-cta flex-shrink-0" />
                <span className="text-white/90 font-medium whitespace-nowrap">Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-cta flex-shrink-0" />
                <span className="text-white/90 font-medium whitespace-nowrap">Same-Day Service Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progressive Booking Modal - Skip to step 3 (Project Details) */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={isOther ? "other" : selectedService}
        initialZip={zipCode}
        customServiceText={isOther ? customServiceText : ""}
        initialStep={4}
        skipToProjectDetails={true}
        mode="quote"
      />
      
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA
        onGetQuote={handleFindPro}
        heroRef={heroSectionRef}
      />
    </>
  );
};

export default HeroNew;
