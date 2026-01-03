import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const services = [
  { value: "tv-mounting", label: "TV Mounting" },
  { value: "smart-home", label: "Smart Home Installation" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "handyman", label: "Handyman Services" },
  { value: "wifi-network", label: "WiFi & Network Setup" },
  { value: "home-theater", label: "Home Theater" },
  { value: "security", label: "Security Cameras" },
  { value: "computer-repair", label: "Computer Repair" },
  { value: "hvac", label: "HVAC" },
  { value: "other", label: "Other" },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialZip?: string;
  customServiceText?: string; // For "Other" service custom text
}

const BookingModal = ({ isOpen, onClose, initialService = "", initialZip = "", customServiceText = "" }: BookingModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prosFound, setProsFound] = useState(0);

  // Form state
  const [service, setService] = useState(initialService);
  const [zipCode, setZipCode] = useState(initialZip);
  const [projectDetails, setProjectDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const simulateSearch = () => {
    setIsSearching(true);
    setProsFound(0);

    // Labor illusion - simulate searching through pros
    const intervals = [500, 1000, 1500, 2000, 2500];
    let found = 0;

    intervals.forEach((delay, index) => {
      setTimeout(() => {
        found += Math.floor(Math.random() * 12) + 5;
        setProsFound(found);
        
        if (index === intervals.length - 1) {
          setTimeout(() => {
            setIsSearching(false);
            setStep(4);
          }, 800);
        }
      }, delay);
    });
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      // If service and zip are already provided (from Hero), show step 3 (searching animation) then go to step 4
      if (initialService && initialZip && initialZip.length === 5) {
        setService(initialService);
        setZipCode(initialZip);
        // If custom service text was provided (for "Other"), populate projectDetails textarea
        if (customServiceText) {
          setProjectDetails(customServiceText);
        }
        // Start at step 3 (searching animation) - simulateSearch will automatically move to step 4
        setStep(3);
        // Don't set isSearching to false here - let simulateSearch handle it
        simulateSearch();
      } else {
        setStep(1);
        setService(initialService);
        setZipCode(initialZip);
        // If custom service text was provided, populate projectDetails
        if (customServiceText) {
          setProjectDetails(customServiceText);
        }
        setIsSearching(false);
      }
    }
  }, [isOpen, initialService, initialZip, customServiceText]);

  const handleStep1Next = () => {
    if (!service) {
      toast({ title: "Please select a service", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!zipCode || zipCode.length < 5) {
      toast({ title: "Please enter a valid ZIP code", variant: "destructive" });
      return;
    }
    setStep(3);
    simulateSearch();
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine service label - if it's "other", use the custom text, otherwise use the service label
      const isOtherService = service === "other" || !services.find(s => s.value === service);
      const serviceLabel = isOtherService 
        ? (customServiceText || projectDetails || "Custom Service")
        : (services.find(s => s.value === service)?.label || service);
      
      // Combine projectDetails with custom service text if "Other" was selected
      const finalProjectDetails = isOtherService && customServiceText && !projectDetails.includes(customServiceText)
        ? `${customServiceText}${projectDetails ? ` - ${projectDetails}` : ''}`
        : projectDetails;

      const { error } = await supabase.from("form_submissions").insert({
        form_type: "booking",
        name,
        email,
        phone,
        zip: zipCode,
        service_category: serviceLabel,
        message: finalProjectDetails,
      });

      if (error) throw error;
      
      // Navigate to success page with query params
      // Don't include "Other" in the service name - use the custom text or "Service"
      const displayServiceName = isOtherService 
        ? (customServiceText || "Service")
        : serviceLabel;
      
      onClose();
      navigate(`/success?service=${encodeURIComponent(displayServiceName)}&zip=${encodeURIComponent(zipCode)}`);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressValue = (step / 4) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Progress bar */}
        <div className="p-4 border-b border-border">
          <Progress value={progressValue} className="h-1.5" />
        </div>

        <div className="p-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  What do you need help with?
                </h3>
                <p className="text-muted-foreground">
                  Select a service to get matched with the right pro
                </p>
              </div>

              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="Select a service..." />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="py-3">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleStep1Next} className="w-full h-12 text-base bg-cta hover:bg-cta/90">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Where is the project located?
                </h3>
                <p className="text-muted-foreground">
                  Enter your ZIP code to find local pros
                </p>
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className="h-14 text-base pl-12"
                  maxLength={5}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleStep2Next} className="flex-1 h-12 bg-cta hover:bg-cta/90">
                  Find Pros
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Searching (Labor Illusion) */}
          {step === 3 && (
            <div className="space-y-6 py-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Searching {prosFound}+ Vetted Pros...
                </h3>
                <p className="text-muted-foreground">
                  Finding the best matches in your area
                </p>
              </div>

              <div className="space-y-3 max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Checking availability...</span>
                </div>
                {prosFound > 15 && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Verifying licenses...</span>
                  </div>
                )}
                {prosFound > 30 && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Reviewing ratings...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Great news! We found {prosFound}+ pros
                </h3>
                <p className="text-muted-foreground">
                  Complete your details to get matched
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                />
                <Textarea
                  placeholder="Tell us more about your project (optional)"
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-cta hover:bg-cta/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get Matched"
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
