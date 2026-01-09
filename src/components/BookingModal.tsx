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
import { MapPin, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Zap, Calendar, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Validate US ZIP code (5 digits, range 00501-99950)
const isValidUSZipCode = (zip: string): boolean => {
  if (!zip || zip.length !== 5) return false;
  const zipNum = parseInt(zip, 10);
  // Valid US ZIP codes range from 00501 to 99950
  // Some ranges are invalid, but this covers the vast majority
  return zipNum >= 501 && zipNum <= 99950 && !isNaN(zipNum);
};

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
  initialStep?: number; // Optional: start at a specific step (1-4)
  skipToProjectDetails?: boolean; // Skip steps 1-2 and go directly to step 3
  mode?: 'quote' | 'booking'; // Dual-mode: 'quote' for quotes, 'booking' for appointments
}

const BookingModal = ({ isOpen, onClose, initialService = "", initialZip = "", customServiceText = "", initialStep, skipToProjectDetails = false, mode = 'quote' }: BookingModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(initialStep || 1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prosFound, setProsFound] = useState(0);
  const [isPersonalizing, setIsPersonalizing] = useState(false);

  // Form state
  const [service, setService] = useState(initialService);
  const [zipCode, setZipCode] = useState(initialZip);
  const [zipCodeError, setZipCodeError] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [urgency, setUrgency] = useState<"asap" | "week" | "flexible">("week"); // Default to "Within a week"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherServiceDescription, setOtherServiceDescription] = useState("");
  const [submitError, setSubmitError] = useState("");

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
      // Show "Personalizing your request..." overlay for 0.5s when skipToProjectDetails is true
      if (skipToProjectDetails) {
        setIsPersonalizing(true);
        setTimeout(() => {
          setIsPersonalizing(false);
        }, 500);
      }

      // If skipToProjectDetails is true, go directly to step 3 (Project Details)
      if (skipToProjectDetails) {
        setStep(3);
        setService(initialService || "other");
        setZipCode(initialZip);
        if (customServiceText) {
          setOtherServiceDescription(customServiceText);
          setProjectDetails(customServiceText);
        }
      } else if (initialStep !== undefined) {
        // If initialStep is provided, use it
        setStep(initialStep);
        setService(initialService);
        setZipCode(initialZip);
        if (customServiceText) {
          setOtherServiceDescription(customServiceText);
          setProjectDetails(customServiceText);
        }
        // If starting at step 4, trigger search animation (only if zip is provided)
        if (initialStep === 4 && initialZip && initialZip.length === 5) {
          simulateSearch();
        } else {
          setIsSearching(false);
        }
      } else if (initialService && initialZip && initialZip.length === 5) {
        // If service and zip are already provided (from Hero), go to step 3 (Project Details)
        setService(initialService);
        setZipCode(initialZip);
        // If custom service text was provided (for "Other"), populate otherServiceDescription and projectDetails
        if (customServiceText) {
          setOtherServiceDescription(customServiceText);
          setProjectDetails(customServiceText);
        }
        // Start at step 3 (Project Details)
        setStep(3);
      } else {
        setStep(initialStep || 1);
        setService(initialService);
        setZipCode(initialZip);
        // If custom service text was provided, populate otherServiceDescription and projectDetails
        if (customServiceText) {
          setOtherServiceDescription(customServiceText);
          setProjectDetails(customServiceText);
        }
        setIsSearching(false);
      }
    } else {
      // Reset personalizing state when modal closes
      setIsPersonalizing(false);
    }
  }, [isOpen, initialService, initialZip, customServiceText, initialStep, skipToProjectDetails]);

  const handleStep1Next = () => {
    if (!service) {
      toast({ title: "Please select a service", variant: "destructive" });
      return;
    }
    // If "Other" is selected, ensure description is provided
    if (service === "other" && !otherServiceDescription.trim()) {
      toast({ title: "Please describe your service", variant: "destructive" });
      return;
    }
    // If "Other" is selected, populate projectDetails with the description
    if (service === "other" && otherServiceDescription) {
      setProjectDetails(otherServiceDescription);
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!zipCode || zipCode.length !== 5) {
      setZipCodeError("Please enter a 5-digit ZIP code");
      toast({ title: "Please enter a valid ZIP code", variant: "destructive" });
      return;
    }
    if (!isValidUSZipCode(zipCode)) {
      setZipCodeError("Please enter a valid US ZIP code (00501-99950)");
      toast({ title: "Please enter a valid US ZIP code", variant: "destructive" });
      return;
    }
    setZipCodeError("");
    // Go to step 3 (Project Details & Urgency)
    setStep(3);
  };

  const handleStep3Next = () => {
    // Go to step 4 (Contact Info) and trigger search animation
    setStep(4);
    simulateSearch();
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Determine service label - if it's "other", use the custom text, otherwise use the service label
      const isOtherService = service === "other" || !services.find(s => s.value === service);
      const serviceLabel = isOtherService 
        ? (otherServiceDescription || customServiceText || projectDetails || "Custom Service")
        : (services.find(s => s.value === service)?.label || service);
      
      // For "Other" services, use otherServiceDescription in projectDetails if not already there
      const finalProjectDetails = isOtherService && otherServiceDescription && !projectDetails.trim()
        ? otherServiceDescription
        : (isOtherService && otherServiceDescription && projectDetails && !projectDetails.includes(otherServiceDescription)
          ? `${otherServiceDescription}${projectDetails ? ` - ${projectDetails}` : ''}`
          : projectDetails);

      // Map urgency values to readable text
      const urgencyText = urgency === "asap" 
        ? "As soon as possible" 
        : urgency === "week" 
        ? "Within a week" 
        : "Flexible timing";

      // Step 1: Save to database
      const payload: any = {
        form_type: "booking",
        name,
        email,
        phone,
        zip: zipCode,
        service_category: serviceLabel,
        message: finalProjectDetails,
        urgency: urgencyText,
      };

      const { error: dbError } = await supabase.from("form_submissions").insert(payload).select();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save submission. Please try again.");
      }
      
      // Step 2: Send lead email notification
      const { data: emailData, error: emailError } = await supabase.functions.invoke("send-lead", {
        body: {
          serviceType: serviceLabel,
          zipCode: zipCode,
          customer: {
            name: name,
            email: email,
            phone: phone,
          },
          urgency: urgencyText,
          projectDetails: finalProjectDetails || "",
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        throw new Error("Connection error. Please call (818) 584-7389.");
      }
      
      // Step 3: Navigate to booking confirmed page
      onClose();
      window.location.href = "/booking-confirmed";
    } catch (error: any) {
      console.error("Submit error details:", error);
      const errorMessage = error?.message || "Unknown error occurred";
      
      // Show inline error message
      if (errorMessage.includes("Connection") || errorMessage.includes("fetch") || errorMessage.includes("network")) {
        setSubmitError("Connection error. Please call (818) 584-7389.");
      } else {
        setSubmitError("Something went wrong. Please try again or call (818) 584-7389.");
      }
      
      setIsSubmitting(false);
    }
  };

  // Adjust progress calculation - now we have 4 steps (1, 2, 3, 4)
  const progressValue = step === 1 
    ? 25 // Step 1 of 4
    : step === 2
    ? 50 // Step 2 of 4
    : step === 3
    ? 75 // Step 3 of 4
    : 100; // Step 4 (final step)

  return (
    <>
      {/* Personalizing Overlay */}
      {isPersonalizing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
            <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground text-center">
              Personalizing your request...
            </p>
          </div>
        </div>
      )}
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

              <Select 
                value={service} 
                onValueChange={(value) => {
                  setService(value);
                  // Clear otherServiceDescription if switching away from "Other"
                  if (value !== "other") {
                    setOtherServiceDescription("");
                  }
                }}
              >
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

              {/* Show service description input when "Other" is selected */}
              {service === "other" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Please describe your service
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Appliance repair, Carpet cleaning, etc."
                    value={otherServiceDescription}
                    onChange={(e) => setOtherServiceDescription(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              )}

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

              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter ZIP code"
                    value={zipCode}
                    onChange={(e) => {
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
                    }}
                    className={`h-14 text-base pl-12 ${
                      zipCodeError ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    maxLength={5}
                  />
                </div>
                {zipCodeError && (
                  <p className="text-sm text-red-500">{zipCodeError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleStep2Next} className="flex-1 h-12 bg-cta hover:bg-cta/90">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details & Urgency */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {mode === 'quote' ? 'Details for your Quote' : 'Details for your Service Request'}
                </h3>
                <p className="text-muted-foreground">
                  Help us understand what you need
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    When do you need this done?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgency("asap")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        urgency === "asap"
                          ? "border-red-500 bg-red-50 text-red-700 font-semibold"
                          : "border-border bg-background text-foreground hover:border-accent"
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">As soon as possible</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency("week")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        urgency === "week"
                          ? "border-accent bg-accent/10 text-accent font-semibold"
                          : "border-border bg-background text-foreground hover:border-accent"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Within a week</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency("flexible")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        urgency === "flexible"
                          ? "border-accent bg-accent/10 text-accent font-semibold"
                          : "border-border bg-background text-foreground hover:border-accent"
                      }`}
                    >
                      <Coffee className="w-4 h-4" />
                      <span className="text-sm">Flexible timing</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Tell us about your project
                  </label>
                  <Textarea
                    placeholder="Describe your project, any specific requirements, or questions you have..."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleStep3Next} className="flex-1 h-12 bg-cta hover:bg-cta/90">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
                  {mode === 'quote' 
                    ? `Great News! We found ${prosFound}+ Pros.`
                    : `Great News! There are ${prosFound}+ Pros available.`
                  }
                </h3>
                <p className="text-muted-foreground">
                  {mode === 'quote' 
                    ? 'Complete your details to get a quote'
                    : 'Complete your details to book your appointment'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12"
                />
                
                {/* Inline error message */}
                {submitError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(3)} 
                  disabled={isSubmitting}
                  className="flex-1 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 h-12 ${
                    mode === 'booking' 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-cta hover:bg-cta/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    mode === 'quote' ? "Get My Free Quote" : "Request Appointment"
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default BookingModal;
