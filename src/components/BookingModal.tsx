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

// TV Mounting flow: detect from initialService label
const isTVMountingService = (s: string) => /TV Wall Mounting|TV Mounting/i.test(s || "");

const TV_SIZE_OPTIONS = [
  { value: 'TV Wall Mounting - Standard (up to 55")', label: 'Up to 55"' },
  { value: 'TV Wall Mounting - Large (56" - 75")', label: '56" - 75"' },
  { value: 'TV Wall Mounting - Extra Large (76"+)', label: '76" and above' },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialZip?: string;
  customServiceText?: string; // For "Other" service custom text
  initialStep?: number; // Optional: start at a specific step (1-4 or 1-5 for TV Mounting)
  skipToProjectDetails?: boolean; // Skip steps 1-2 and go directly to step 3
  mode?: 'quote' | 'booking'; // Dual-mode: 'quote' for quotes, 'booking' for appointments
  isTVMountingQuote?: boolean; // When true, use 5-step TV Mounting quote flow (Zip → TV Size & Wall → Mount Details → Date/Time → Contact)
}

const BookingModal = ({ isOpen, onClose, initialService = "", initialZip = "", customServiceText = "", initialStep, skipToProjectDetails = false, mode = 'quote', isTVMountingQuote: isTVMountingQuoteProp = false }: BookingModalProps) => {
  const navigate = useNavigate();
  const isTVMountingFlow = isTVMountingQuoteProp || (mode === 'quote' && isTVMountingService(initialService));
  const [step, setStep] = useState(initialStep ?? (isTVMountingFlow ? 1 : 1));
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prosFound, setProsFound] = useState(0);
  const [isPersonalizing, setIsPersonalizing] = useState(false);

  // Form state
  const [service, setService] = useState(initialService);
  const [zipCode, setZipCode] = useState(initialZip);
  const [zipCodeError, setZipCodeError] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [urgency, setUrgency] = useState<"asap" | "week" | "flexible">("week");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherServiceDescription, setOtherServiceDescription] = useState("");
  const [submitError, setSubmitError] = useState("");
  // TV Mounting–specific state
  const [wallType, setWallType] = useState("");
  const [hasMount, setHasMount] = useState<"yes" | "no" | "">("");
  const [mountType, setMountType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

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
        const startStep = isTVMountingFlow ? 1 : (initialStep || 1);
        setStep(startStep);
        setService(initialService);
        setZipCode(initialZip);
        if (customServiceText) {
          setOtherServiceDescription(customServiceText);
          setProjectDetails(customServiceText);
        }
        if (isTVMountingFlow) {
          setWallType("");
          setHasMount("");
          setMountType("");
          setPreferredDate("");
          setPreferredTime("");
        }
        setIsSearching(false);
      }
    } else {
      // Reset personalizing state when modal closes
      setIsPersonalizing(false);
    }
  }, [isOpen, initialService, initialZip, customServiceText, initialStep, skipToProjectDetails, isTVMountingFlow]);

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
      let finalProjectDetails: string = isOtherService && otherServiceDescription && !projectDetails.trim()
        ? otherServiceDescription
        : (isOtherService && otherServiceDescription && projectDetails && !projectDetails.includes(otherServiceDescription)
          ? `${otherServiceDescription}${projectDetails ? ` - ${projectDetails}` : ''}`
          : projectDetails);
      // TV Mounting flow: append wall type, mount details, preferred date/time
      if (isTVMountingFlow) {
        const parts = [finalProjectDetails, wallType && `Wall: ${wallType}`, hasMount && `Has mount: ${hasMount}`, mountType && `Mount type: ${mountType}`, (preferredDate || preferredTime) && `Preferred: ${[preferredDate, preferredTime].filter(Boolean).join(' ')}`].filter(Boolean);
        finalProjectDetails = parts.length ? parts.join('. ') : (service ? `TV Mounting: ${service}` : 'TV Mounting quote');
      }

      // Map urgency values to readable text
      const urgencyText = urgency === "asap" 
        ? "As soon as possible" 
        : urgency === "week" 
        ? "Within a week" 
        : "Flexible timing";

      // Validate required fields before submission
      if (!zipCode || zipCode.length < 5) {
        throw new Error("Please enter a valid ZIP code");
      }

      if (!serviceLabel || serviceLabel.trim() === "") {
        throw new Error("Please select a service");
      }

      // Step 1: Save to leads table (has proper RLS for public insert)
      const payload = {
        service_type: serviceLabel,
        zip_code: zipCode,
        urgency: urgencyText,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        project_details: finalProjectDetails,
        status: "new",
      };

      const { error: dbError } = await supabase.from("leads").insert(payload);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save submission. Please try again.");
      }

      console.log("Database save successful, attempting to send email...");
      
      // Step 2: Send email notification (non-blocking - form succeeds even if this fails)
      try {
        console.log("Attempting to send email notification...");

        const { data: emailData, error: emailError } = await supabase.functions.invoke("send-lead", {
          body: {
            serviceType: serviceLabel,
            zipCode: zipCode,
            urgency: urgencyText,
            projectDetails: finalProjectDetails || "",
            customer: {
              name: name,
              email: email,
              phone: phone
            }
          },
        });

        if (emailError) {
          console.error("❌ Email error:", emailError);
        } else {
          console.log("✅ Email notification sent successfully", emailData);
        }
      } catch (emailException: any) {
        console.error("❌ Email error:", emailException);
        // Silent fail as DB save succeeded
      }
      
      // Step 3: Navigate to appropriate success page based on mode
      console.log("Submission successful, redirecting to confirmation page...");
      onClose();
      if (mode === 'quote') {
        navigate("/quote-received");
      } else {
        navigate("/booking-confirmed");
      }
    } catch (error: any) {
      // Only database save errors reach here (email errors are caught separately)
      console.error("Submit error details:", error);
      console.error("Error object:", JSON.stringify(error, null, 2));
      console.error("Error message:", error?.message);
      console.error("Error name:", error?.name);
      console.error("Error stack:", error?.stack);
      
      const errorMessage = error?.message || error?.error?.message || "Unknown error occurred";
      
      // Show inline error message
      if (errorMessage.includes("ZIP code") || errorMessage.includes("service")) {
        setSubmitError(errorMessage + " Please try again.");
      } else if (errorMessage.includes("Database") || errorMessage.includes("leads") || errorMessage.includes("save")) {
        setSubmitError("Failed to save your submission. Please try again or call (818) 584-7389.");
      } else {
        setSubmitError(`Something went wrong: ${errorMessage}. Please try again or call (818) 584-7389.`);
      }
      
      setIsSubmitting(false);
    }
  };

  const progressValue = isTVMountingFlow
    ? (step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100)
    : (step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100);

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
          {/* TV Mounting Quote Flow: Title */}
          {isTVMountingFlow && (
            <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">
              Get a Free TV Mounting Quote
            </h2>
          )}
          {/* Step 1: Service Selection (standard flow only) */}
          {!isTVMountingFlow && step === 1 && (
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

          {/* TV Step 1: Zip Code */}
          {isTVMountingFlow && step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Where is the installation?</h3>
                <p className="text-muted-foreground text-sm">Enter your ZIP code</p>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="ZIP code"
                    value={zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                      setZipCode(value);
                      if (value.length === 5) setZipCodeError(isValidUSZipCode(value) ? "" : "Please enter a valid US ZIP code (00501-99950)");
                      else setZipCodeError("");
                    }}
                    className={`h-12 pl-12 ${zipCodeError ? "border-red-500" : ""}`}
                    maxLength={5}
                  />
                </div>
                {zipCodeError && <p className="text-sm text-red-500">{zipCodeError}</p>}
              </div>
              <Button onClick={() => { if (zipCode.length === 5 && isValidUSZipCode(zipCode)) { setZipCodeError(""); setStep(2); } else { setZipCodeError("Please enter a valid 5-digit ZIP code"); toast({ title: "Invalid ZIP", variant: "destructive" }); } }} className="w-full h-12 bg-cta hover:bg-cta/90">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          {/* Step 2: Location (standard flow only) */}
          {!isTVMountingFlow && step === 2 && (
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

          {/* TV Step 2: TV Size & Wall Type */}
          {isTVMountingFlow && step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">TV Size & Wall Type</h3>
                <p className="text-muted-foreground text-sm">
                  {service ? "Confirm your TV size and wall type" : "Choose your TV size and wall type"}
                </p>
              </div>
              {service ? (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">TV Size</p>
                  <p className="font-semibold text-foreground">{service}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">TV size</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select TV size" /></SelectTrigger>
                    <SelectContent>
                      {TV_SIZE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Wall type</label>
                <Select value={wallType} onValueChange={setWallType}>
                  <SelectTrigger className="h-12"><SelectValue placeholder="Select wall type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drywall">Drywall</SelectItem>
                    <SelectItem value="brick">Brick / Concrete</SelectItem>
                    <SelectItem value="plaster">Plaster</SelectItem>
                    <SelectItem value="fireplace">Above Fireplace</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button
                  onClick={() => {
                    if (!service) { toast({ title: "Please select TV size", variant: "destructive" }); return; }
                    if (!wallType) { toast({ title: "Please select wall type", variant: "destructive" }); return; }
                    setStep(3);
                  }}
                  className="flex-1 h-12 bg-cta hover:bg-cta/90"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
          {/* TV Step 3: Mount Details */}
          {isTVMountingFlow && step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Mount details</h3>
                <p className="text-muted-foreground text-sm">Do you already have a mount?</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setHasMount("yes"); setMountType(""); }} className={`flex-1 py-3 rounded-lg border-2 font-medium ${hasMount === "yes" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}>Yes</button>
                <button type="button" onClick={() => { setHasMount("no"); setMountType(""); }} className={`flex-1 py-3 rounded-lg border-2 font-medium ${hasMount === "no" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}>No</button>
              </div>
              {hasMount === "yes" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What type?</label>
                  <Select value={mountType} onValueChange={setMountType}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select mount type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed / Flat</SelectItem>
                      <SelectItem value="tilting">Tilting</SelectItem>
                      <SelectItem value="full-motion">Full-motion / Articulating</SelectItem>
                      <SelectItem value="unknown">Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1 h-12 bg-cta hover:bg-cta/90">Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}
          {/* TV Step 4: Preferred Date & Time */}
          {isTVMountingFlow && step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">When do you need this done?</h3>
                <p className="text-muted-foreground text-sm">Preferred date and time</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button type="button" onClick={() => setUrgency("asap")} className={`flex-1 min-w-[100px] py-3 rounded-lg border-2 ${urgency === "asap" ? "border-red-500 bg-red-50 text-red-700 font-semibold" : "border-border"}`}><Zap className="w-4 h-4 mx-auto mb-1" /> ASAP</button>
                <button type="button" onClick={() => setUrgency("week")} className={`flex-1 min-w-[100px] py-3 rounded-lg border-2 ${urgency === "week" ? "border-accent bg-accent/10 text-accent font-semibold" : "border-border"}`}><Calendar className="w-4 h-4 mx-auto mb-1" /> Within a week</button>
                <button type="button" onClick={() => setUrgency("flexible")} className={`flex-1 min-w-[100px] py-3 rounded-lg border-2 ${urgency === "flexible" ? "border-accent bg-accent/10 text-accent font-semibold" : "border-border"}`}><Coffee className="w-4 h-4 mx-auto mb-1" /> Flexible</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Preferred date</label>
                  <Input type="text" placeholder="e.g. Tomorrow" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Preferred time</label>
                  <Input type="text" placeholder="e.g. Morning" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="h-12" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1 h-12"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button onClick={() => { setProsFound(12); setStep(5); }} className="flex-1 h-12 bg-cta hover:bg-cta/90">Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}
          {/* Step 3: Project Details & Urgency (standard flow only) */}
          {!isTVMountingFlow && step === 3 && (
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

          {/* Step 4: Contact Info (standard) or TV Step 5: Contact */}
          {((!isTVMountingFlow && step === 4) || (isTVMountingFlow && step === 5)) && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {isTVMountingFlow ? `Great News! We found ${prosFound || 12}+ Pros.` : mode === 'quote' 
                    ? `Great News! We found ${prosFound}+ Pros.`
                    : `Great News! There are ${prosFound}+ Pros available.`
                  }
                </h3>
                <p className="text-muted-foreground">
                  {isTVMountingFlow ? 'Complete your details to get your quote' : mode === 'quote' 
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
                  onClick={() => isTVMountingFlow ? setStep(4) : setStep(3)} 
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
                  ) : isTVMountingFlow ? "Get Quote" : (mode === 'quote' ? "Get My Free Quote" : "Request Appointment")
                  }
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
