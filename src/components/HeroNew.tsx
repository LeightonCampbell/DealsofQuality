import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Navigation, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingModal from "@/components/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";

// Priority services for dropdown
const priorityServices = [
  { value: "tv-mounting", label: "TV Mounting", route: "/tv-mounting-up-to-50" },
  { value: "smart-home", label: "Smart Home", route: "/smart-home-integration" },
  { value: "plumbing", label: "Plumbing", route: "/plumbing" },
  { value: "electrical", label: "Electrical", route: "/electrical" },
  { value: "handyman", label: "Handyman", route: "/handyman-services" },
  { value: "wifi-network", label: "WiFi & Network", route: "/router-setup" },
  { value: "home-theater", label: "Home Theater", route: "/home-theater" },
  { value: "security", label: "Security Cameras", route: "/security-cameras" },
  { value: "computer-repair", label: "Computer Repair", route: "/computer-repair" },
  { value: "hvac", label: "HVAC", route: "/hvac" },
  { value: "other", label: "Other", route: "" },
];

const HeroNew = () => {
  const isMobile = useIsMobile();
  const zipInputRef = useRef<HTMLInputElement>(null);
  const otherServiceInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedService, setSelectedService] = useState("");
  const [customServiceText, setCustomServiceText] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeFocused, setZipCodeFocused] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [userCity, setUserCity] = useState("Los Angeles");
  const [availablePros, setAvailablePros] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if "Other" is selected
  const isOther = selectedService === "other";
  
  // Get the actual service value (either selected or custom)
  const serviceValue = isOther ? customServiceText : selectedService;
  
  // Button enabled state: service must be selected/typed AND zip must be 5 digits
  const isButtonEnabled = (serviceValue.length > 0) && (zipCode.length === 5);

  // IP-based location detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.city && data.country_code === "US") {
          // Use detected US city
          setUserCity(data.city);
          // Randomize available pros between 8-18 for realism
          setAvailablePros(Math.floor(Math.random() * 11) + 8);
        } else if (data.city) {
          // If outside US, still use the city
          setUserCity(data.city);
          setAvailablePros(Math.floor(Math.random() * 11) + 8);
        } else {
          // Fallback to default US city
          setUserCity("Los Angeles");
        }
      } catch (error) {
        // Fallback to default US city
        setUserCity("Los Angeles");
      } finally {
        setIsLoading(false);
      }
    };
    detectLocation();
  }, []);

  // Sequential highlight logic: Glow zip code when service is selected
  useEffect(() => {
    if (selectedService && selectedService !== "other" && !zipCodeFocused) {
      setZipCodeFocused(true);
      // Auto-focus zip code on mobile when service is selected
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
  }, [selectedService, isMobile]);

  // Auto-focus other service input when "Other" is selected
  useEffect(() => {
    if (isOther && otherServiceInputRef.current) {
      setTimeout(() => {
        otherServiceInputRef.current?.focus();
      }, 100);
    }
  }, [isOther]);

  // Handle service selection change
  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    // Reset custom text if switching away from "Other"
    if (value !== "other") {
      setCustomServiceText("");
    }
  };

  // Handle zip code change with validation
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
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
              if (zip.length === 5) {
                setZipCode(zip);
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
              if (zip.length === 5) {
                setZipCode(zip);
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
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-background">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
        
        <div className="container-max px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Availability Signal */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {isLoading ? (
                  "Finding pros near you..."
                ) : (
                  <>
                    <span className="text-success font-semibold">{availablePros} Verified Pros</span> available in {userCity} today
                  </>
                )}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 animate-fade-in animation-delay-100">
              Premium Home Services
              <span className="block">
                {" "}in <span className="text-accent">{userCity}</span>
              </span>
            </h1>

            {/* Subheadline */}
            <h2 className="font-display text-xl md:text-2xl font-medium text-foreground/80 mb-3 animate-fade-in-up animation-delay-100">
              Hand-Picked Pros. Ready Today.
            </h2>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              From smart home installs to emergency repairs, get expert help with upfront pricing and our 100% Satisfaction Guarantee.
            </p>

            {/* Dual Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              <div className="bg-card rounded-xl border border-border shadow-lg p-2 flex flex-col md:flex-row gap-2">
                {/* Service Dropdown or Custom Input */}
                <div className="flex-1 relative">
                  {isOther ? (
                    <div className="animate-fade-in">
                      <Input
                        ref={otherServiceInputRef}
                        type="text"
                        placeholder="What do you need help with? (e.g. Attic cleaning...)"
                        value={customServiceText}
                        onChange={(e) => setCustomServiceText(e.target.value)}
                        className="w-full h-14 border-0 bg-transparent text-base px-4 focus:ring-0 focus:ring-offset-0"
                        onKeyDown={(e) => {
                          // Allow user to press Escape or Backspace when empty to go back to dropdown
                          if (e.key === "Escape" || (e.key === "Backspace" && customServiceText === "")) {
                            setSelectedService("");
                            setCustomServiceText("");
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          setSelectedService("");
                          setCustomServiceText("");
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Back to service list"
                      >
                        <ChevronDown className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  ) : (
                    <Select value={selectedService} onValueChange={handleServiceChange}>
                      <SelectTrigger className="w-full h-14 border-0 bg-transparent text-base px-4 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="What service do you need?" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        {priorityServices.map((service) => (
                          <SelectItem 
                            key={service.value} 
                            value={service.value}
                            className="text-base py-3 cursor-pointer hover:bg-accent/10"
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-border my-2" />

                {/* Zip Code Input with Locate Me */}
                <div 
                  className={`flex items-center gap-2 px-4 border-t md:border-t-0 border-border md:border-none relative transition-all duration-300 ${
                    zipCodeFocused ? "ring-2 ring-blue-400/50 rounded-md" : ""
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

                {/* CTA Button */}
                <Button
                  onClick={handleFindPro}
                  disabled={!isButtonEnabled}
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 h-14 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Find a Pro
                  <span className="relative ml-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                </Button>
              </div>
            </div>

            {/* Social proof micro-text */}
            <p className="text-sm text-muted-foreground mt-6 animate-fade-in-up animation-delay-400">
              Trusted by 10,000+ homeowners · Same-day availability
            </p>
          </div>
        </div>
      </section>

      {/* Progressive Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={serviceValue}
        initialZip={zipCode}
      />
    </>
  );
};

export default HeroNew;
