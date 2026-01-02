import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingModal from "@/components/BookingModal";

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
];

const HeroNew = () => {
  const [selectedService, setSelectedService] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userCity, setUserCity] = useState("Your Area");
  const [availablePros, setAvailablePros] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // IP-based location detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.city) {
          setUserCity(data.city);
          // Randomize available pros between 8-18 for realism
          setAvailablePros(Math.floor(Math.random() * 11) + 8);
        }
      } catch (error) {
        // Fallback to default
        setUserCity("Your Area");
      } finally {
        setIsLoading(false);
      }
    };
    detectLocation();
  }, []);

  const handleFindPro = () => {
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
              Premium Home Services in{" "}
              <span className="text-accent">{userCity}</span>
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
                {/* Service Dropdown */}
                <div className="flex-1">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full h-14 border-0 bg-transparent text-base px-4 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="What service do you need?" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border">
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
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-border my-2" />

                {/* Zip Code Input */}
                <div className="flex items-center gap-2 px-4 border-t md:border-t-0 border-border md:border-none">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="w-28 py-4 text-foreground placeholder:text-muted-foreground bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
                  />
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleFindPro}
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 h-14 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Find a Pro
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
        initialService={selectedService}
        initialZip={zipCode}
      />
    </>
  );
};

export default HeroNew;
