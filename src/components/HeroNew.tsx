import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Navigation, Loader2, FileCheck, ShieldCheck, DollarSign, Clock } from "lucide-react";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingModal from "@/components/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";

// Validate US ZIP code (5 digits, range 00501-99950)
const isValidUSZipCode = (zip: string): boolean => {
  if (!zip || zip.length !== 5) return false;
  const zipNum = parseInt(zip, 10);
  // Valid US ZIP codes range from 00501 to 99950
  // Some ranges are invalid, but this covers the vast majority
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

  // Determine if "Other" is selected or if user typed a custom service
  const isOther = selectedService === "other" || (serviceInputValue.length > 0 && !allServices.find(s => s.label.toLowerCase() === serviceInputValue.toLowerCase()));
  
  // Get the actual service value (either selected or custom)
  const serviceValue = isOther ? (customServiceText || serviceInputValue) : selectedService;
  
  // Validate zip code
  const isZipValid = zipCode.length === 5 && isValidUSZipCode(zipCode);
  
  // Button enabled state: service must be selected/typed AND zip must be valid US zip code
  const isButtonEnabled = (serviceValue.length > 0) && isZipValid;

  // Sequential highlight logic: Glow zip code when service is selected
  useEffect(() => {
    if (serviceInputValue && serviceInputValue.length > 0 && !zipCodeFocused) {
      setZipCodeFocused(true);
      // Auto-focus zip code on mobile when service is typed
      if (isMobile && zipInputRef.current) {
        setTimeout(() => {
          zipInputRef.current?.focus();
        }, 100);
      }
      // Remove glow after 3 seconds
      const timer = setTimeout(() => {
        setZipCodeFocused(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [serviceInputValue, isMobile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both the input and the dropdown
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

  // Handle service selection from autosuggest
  const handleServiceSelect = (service: typeof allServices[0]) => {
    setServiceInputValue(service.label);
    setSelectedService(service.value);
    setCustomServiceText("");
    setIsServiceDropdownOpen(false);
    // Trigger glow effect on zip code field
    setZipCodeFocused(true);
    // Auto-focus zip code on mobile when service is selected
    if (isMobile && zipInputRef.current) {
      setTimeout(() => {
        zipInputRef.current?.focus();
      }, 100);
    }
    // Remove glow after 3 seconds
    setTimeout(() => {
      setZipCodeFocused(false);
    }, 3000);
    // Don't blur the input - allow user to continue editing if needed
  };

  // Filter services based on input for autosuggest
  const filteredServices = useMemo(() => {
    if (serviceInputValue.length === 0) return [];
    const query = serviceInputValue.toLowerCase();
    return allServices
      .filter(s => s.label.toLowerCase().includes(query))
      .slice(0, 8); // Limit to 8 suggestions
  }, [serviceInputValue]);

  // Handle service input change with autosuggest
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Always update the input value - allow all normal text input including spaces
    setServiceInputValue(value);
    
    // Show dropdown when user types
    if (value.length > 0) {
      setIsServiceDropdownOpen(true);
    } else {
      setIsServiceDropdownOpen(false);
      setSelectedService("");
      setCustomServiceText("");
      return;
    }
    
    // Check if the input matches a service exactly (trimmed for comparison)
    const exactMatch = allServices.find(s => s.label.toLowerCase() === value.toLowerCase().trim());
    if (exactMatch) {
      setSelectedService(exactMatch.value);
      setCustomServiceText("");
    } else {
      // User is typing a custom service - store the text
      setCustomServiceText(value);
      // Check if there are any matching suggestions (allow partial matches)
      const currentFiltered = allServices
        .filter(s => s.label.toLowerCase().includes(value.toLowerCase().trim()))
        .slice(0, 8);
      // Only set to "other" if there are no matching suggestions
      if (currentFiltered.length === 0 && value.trim().length > 0) {
        setSelectedService("other");
      } else {
        // Clear selected service if there are suggestions - let user choose
        setSelectedService("");
      }
    }
  };

  // Handle zip code change with validation
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    
    // Validate when user has entered 5 digits
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
          // Use reverse geocoding to get zip code
          // Try multiple services for better reliability
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Try BigDataCloud first (free, no API key needed)
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
          
          // Fallback: Use OpenStreetMap Nominatim (free, no API key)
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
          
          // If both fail, show message
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
    if (!isButtonEnabled) return;
    // Skip steps 1-2, go directly to step 3 (Project Details)
    setIsModalOpen(true);
  };

  return (
    <>
      <section ref={heroSectionRef} className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-background border-b border-border" aria-label="Hero section - Find local professionals">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" aria-hidden="true" />
        
        <div className="container-max px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Centered alignment */}
            <div className="text-center">
              {/* Headline */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 animate-fade-in animation-delay-100 tracking-tight">
                Trusted Local Pros for Any Project
                <span className="block text-accent mt-2">Get a Quote in Minutes</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                Fast, reliable, and vetted professionals for essential home and business services — all backed by quality standards you can rely on.
              </p>

              {/* Dual Search Bar */}
              <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              <form onSubmit={(e) => { e.preventDefault(); handleFindPro(); }} className="bg-card rounded-xl border border-border shadow-lg p-2 flex flex-col md:flex-row gap-2" role="search" aria-label="Service search form">
                {/* Service Input with Autosuggest */}
                <div className="flex-1 relative" ref={serviceDropdownRef}>
                  <div className="relative">
                    <Input
                      ref={otherServiceInputRef}
                      type="text"
                      placeholder="What kind of service do you need?"
                      value={serviceInputValue}
                      onChange={handleServiceInputChange}
                      aria-label="Service type"
                      aria-autocomplete="list"
                      aria-controls="service-suggestions"
                      aria-expanded={isServiceDropdownOpen && filteredServices.length > 0}
                      onFocus={() => {
                        // Only show dropdown if there's text to filter
                        if (serviceInputValue.length > 0) {
                          setIsServiceDropdownOpen(true);
                        }
                      }}
                      className="w-full h-14 border-0 bg-transparent text-base px-4 focus:ring-0 focus:ring-offset-0"
                      onKeyDown={(e) => {
                        // Only handle Escape key - allow all other keys (spaces, arrows, etc.) to work normally
                        if (e.key === "Escape") {
                          setIsServiceDropdownOpen(false);
                        }
                        // Don't prevent default for any other keys - allow normal text editing
                      }}
                    />
                    {isServiceDropdownOpen && filteredServices.length > 0 && (
                      <div id="service-suggestions" className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto" role="listbox" aria-label="Service suggestions">
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
                              // Trigger glow effect
                              setZipCodeFocused(true);
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

                {/* Divider */}
                <div className="hidden md:block w-px bg-border my-2" />

                {/* Zip Code Input with Locate Me */}
                <div className="flex flex-col">
                  <div 
                    className={`flex items-center gap-2 px-4 border-t md:border-t-0 border-border md:border-none relative transition-all duration-300 ${
                      zipCodeFocused ? "ring-2 ring-blue-400/50 rounded-md" : ""
                    } ${
                      zipCodeError ? "ring-2 ring-red-400/50 rounded-md" : ""
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                      ref={zipInputRef}
                      type="tel"
                      inputMode="numeric"
                      placeholder={zipCodeFocused ? "12345 or e.g. 90210" : "ZIP Code"}
                      value={zipCode}
                      onChange={handleZipChange}
                      maxLength={5}
                      className="w-28 py-4 text-foreground placeholder:text-muted-foreground bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
                      aria-label="ZIP Code"
                      aria-invalid={zipCodeError ? "true" : "false"}
                      aria-describedby={zipCodeError ? "zip-error" : undefined}
                    />
                    <button
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
                    <p id="zip-error" className="text-xs text-red-500 mt-1 px-4" role="alert">{zipCodeError}</p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleFindPro}
                  disabled={!isButtonEnabled}
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 h-14 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  Get My Free Quote
                  <span className="relative ml-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                </Button>
              </form>
              </div>
              
              {/* Trust Badges Row */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-6 animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileCheck className="w-4 h-4 text-success" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Background-Checked Pros</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span>Upfront Pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-success" />
                  <span>Same-Day Service Available</span>
                </div>
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
