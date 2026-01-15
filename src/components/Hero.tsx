import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ClipboardList, BadgeCheck, ShieldCheck } from "lucide-react";

// Service list for auto-complete
const serviceList = [
  "Handyman Services",
  "Painting",
  "Flooring Installation",
  "Drywall Installation",
  "Cabinet Installation",
  "Tile Work",
  "Window and Door Replacement",
  "Deck and Patio Building",
  "Fence Installation",
  "Bathroom Remodeling",
  "Kitchen Remodeling",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Roofing",
  "Appliance Repair",
  "Water Heater Installation",
  "Gutter Installation",
  "Siding Installation",
  "Garage Door Installation",
  "Solar Panel Installation",
  "House Cleaning",
  "Carpet Cleaning",
  "Junk Removal",
  "Pressure Washing",
  "Gutter Cleaning",
  "Pest Control",
  "Organization Services",
  "Landscaping",
  "Snow Removal",
  "TV Mounting",
  "Smart Thermostats",
  "Video Doorbells",
  "Smart Locks",
  "Smart Home Integration",
  "Home Theater",
  "Surround Sound",
  "Streaming Setup",
  "Gaming Setup",
  "Router Setup",
  "Network Optimization",
  "Dead Zone Elimination",
  "Security Cameras",
  "Motion Sensors",
  "Computer Repair",
  "Virus Removal",
  "Printer Setup",
  "Data Backup",
  "Website Design",
  "Remote Support",
  "Business IT Solutions",
];

// Map service names to routes
const serviceToRoute: Record<string, string> = {
  "Handyman Services": "/handyman-services",
  "Painting": "/painting",
  "Flooring Installation": "/flooring-installation",
  "Drywall Installation": "/drywall-installation",
  "Cabinet Installation": "/cabinet-installation",
  "Tile Work": "/tile-work",
  "Window and Door Replacement": "/window-door-replacement",
  "Deck and Patio Building": "/deck-patio-building",
  "Fence Installation": "/fence-installation",
  "Bathroom Remodeling": "/bathroom-remodeling",
  "Kitchen Remodeling": "/kitchen-remodeling",
  "Plumbing": "/plumbing",
  "Electrical": "/electrical",
  "HVAC": "/hvac",
  "Roofing": "/roofing",
  "Appliance Repair": "/appliance-repair",
  "Water Heater Installation": "/water-heater-installation",
  "Gutter Installation": "/gutter-installation",
  "Siding Installation": "/siding-installation",
  "Garage Door Installation": "/garage-door-installation",
  "Solar Panel Installation": "/solar-panel-installation",
  "House Cleaning": "/house-cleaning",
  "Carpet Cleaning": "/carpet-cleaning",
  "Junk Removal": "/junk-removal",
  "Pressure Washing": "/pressure-washing",
  "Gutter Cleaning": "/gutter-cleaning",
  "Pest Control": "/pest-control",
  "Organization Services": "/organization-services",
  "Landscaping": "/landscaping",
  "Snow Removal": "/snow-removal",
  "TV Mounting": "/tv-mounting-up-to-50",
  "Smart Thermostats": "/smart-thermostats",
  "Video Doorbells": "/video-doorbells",
  "Smart Locks": "/smart-locks",
  "Smart Home Integration": "/smart-home-integration",
  "Home Theater": "/home-theater",
  "Surround Sound": "/surround-sound",
  "Streaming Setup": "/streaming-setup",
  "Gaming Setup": "/gaming-setup",
  "Router Setup": "/router-setup",
  "Network Optimization": "/network-optimization",
  "Dead Zone Elimination": "/dead-zone-elimination",
  "Security Cameras": "/security-cameras",
  "Motion Sensors": "/motion-sensors",
  "Computer Repair": "/computer-repair",
  "Virus Removal": "/virus-removal",
  "Printer Setup": "/printer-setup",
  "Data Backup": "/data-backup",
  "Website Design": "/website-design",
  "Remote Support": "/remote-support-service",
  "Business IT Solutions": "/business-it-solutions",
};

const Hero = () => {
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const trustPoints = [{
    icon: ClipboardList,
    label: "FREE ESTIMATE"
  }, {
    icon: BadgeCheck,
    label: "100% VERIFIED PROFESSIONALS"
  }, {
    icon: ShieldCheck,
    label: "100% SATISFACTION GUARANTEE"
  }];

  useEffect(() => {
    if (projectDescription.trim().length > 0) {
      const filtered = serviceList.filter(service =>
        service.toLowerCase().includes(projectDescription.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [projectDescription]);

  const handleSearch = () => {
    if (projectDescription.trim()) {
      // Check if the input matches a service exactly
      const exactMatch = serviceList.find(
        s => s.toLowerCase() === projectDescription.trim().toLowerCase()
      );
      
      if (exactMatch && serviceToRoute[exactMatch]) {
        navigate(serviceToRoute[exactMatch]);
      } else {
        // Otherwise navigate to services page
        navigate("/services");
      }
    } else {
      navigate("/services");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // If suggestions are shown and a suggestion is selected, use that
      if (showSuggestions && selectedIndex >= 0 && suggestions[selectedIndex]) {
        const selectedService = suggestions[selectedIndex];
        setProjectDescription(selectedService);
        setShowSuggestions(false);
        if (serviceToRoute[selectedService]) {
          navigate(serviceToRoute[selectedService]);
        }
      } else {
        // Otherwise, trigger regular search
        handleSearch();
      }
      return;
    }

    // Arrow keys and Escape only work when suggestions are shown
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (service: string) => {
    setProjectDescription(service);
    setShowSuggestions(false);
    if (serviceToRoute[service]) {
      navigate(serviceToRoute[service]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
    }
  };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return <section className="relative pt-32 pb-32 md:pt-40 md:pb-28 mb-8 md:mb-0">
      {/* Light gray background */}
      <div className="absolute inset-0 bg-secondary/50" />

      <div className="container-max px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
            Hire the best pros for{" "}
            <span className="block text-accent">any home project.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">Carefully vetted, local professionals for homeowners who demand quality service.</p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200 mb-8 md:mb-4">
            <div className="bg-background rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2 relative z-40">
              {/* Project Description Input with Auto-complete */}
              <div className="flex-1 relative" role="combobox" aria-expanded={showSuggestions} aria-haspopup="listbox" aria-owns="service-suggestions">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Describe your project or problem in detail"
                  aria-label="Service type"
                  aria-autocomplete="list"
                  aria-controls="service-suggestions"
                  value={projectDescription} 
                  onChange={e => setProjectDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => projectDescription.trim().length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full px-4 py-4 text-foreground placeholder:text-muted-foreground bg-transparent border-0 focus:outline-none focus:ring-0 text-base" 
                />
                {/* Auto-complete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul 
                    ref={suggestionsRef}
                    id="service-suggestions"
                    role="listbox"
                    className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion}
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`w-full text-left px-4 py-3 hover:bg-accent/10 transition-colors ${
                            index === selectedIndex ? "bg-accent/20" : ""
                          } ${index < suggestions.length - 1 ? "border-b border-border" : ""}`}
                        >
                          <span className="text-foreground">{suggestion}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden md:block w-px bg-border my-2" />

              {/* Zip Code Input */}
              <div className="flex items-center gap-2 px-4 py-2 md:py-0 border-t md:border-t-0 border-border md:border-none">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input type="text" placeholder="ZIP code" value={zipCode} onChange={e => setZipCode(e.target.value)} className="w-24 py-2 text-foreground placeholder:text-muted-foreground bg-transparent border-0 focus:outline-none focus:ring-0 text-base" />
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch} 
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 h-auto text-base font-semibold rounded-md"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-4">
        <div className="container-max px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustPoints.map(({
            icon: Icon,
            label
          }) => <div key={label} className="flex items-center gap-2 text-primary-foreground">
                <Icon className="w-5 h-5" style={{ color: '#f97415' }} />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  {label}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;