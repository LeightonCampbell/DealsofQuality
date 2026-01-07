import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Validate US ZIP code (5 digits, range 00501-99950)
const isValidUSZipCode = (zip: string): boolean => {
  if (!zip || zip.length !== 5) return false;
  const zipNum = parseInt(zip, 10);
  return zipNum >= 501 && zipNum <= 99950 && !isNaN(zipNum);
};

const serviceCategories = [
  {
    category: "TV Mounting & Home Theater",
    services: [
      "TV Wall Mounting - Standard (up to 55\")",
      "TV Wall Mounting - Large (56\" - 75\")",
      "TV Wall Mounting - Extra Large (76\"+)",
      "Full Home Theater Setup",
      "Soundbar Installation",
      "Surround Sound System",
      "Projector Installation",
      "Cable Concealment",
    ],
  },
  {
    category: "Computer Support",
    services: [
      "Computer Repair & Diagnostics",
      "Virus & Malware Removal",
      "Data Backup & Recovery",
      "Software Installation & Updates",
      "Hardware Upgrade (RAM/SSD)",
      "Operating System Reinstall",
      "Printer Setup & Troubleshooting",
      "Performance Optimization",
    ],
  },
  {
    category: "Internet & Wi-Fi",
    services: [
      "Router Setup & Configuration",
      "Wi-Fi Network Optimization",
      "Dead Zone Elimination",
      "Mesh Network Installation",
      "Network Security Setup",
      "Ethernet Wiring Installation",
      "Smart Home Network Setup",
      "Business Network Configuration",
    ],
  },
  {
    category: "Security Cameras",
    services: [
      "Indoor Camera Installation",
      "Outdoor Camera Installation",
      "Video Doorbell Setup",
      "Multi-Camera System",
      "DVR/NVR Configuration",
      "Smart Lock Installation",
      "Motion Sensor Setup",
      "Security System Integration",
    ],
  },
  {
    category: "Media Streaming",
    services: [
      "Streaming Device Setup (Roku, Fire TV, Apple TV)",
      "Smart TV Configuration",
      "Gaming Console Setup",
      "Streaming Service Installation",
      "Multi-Room Audio Setup",
      "Screen Mirroring Configuration",
      "Streaming Optimization",
      "Parental Controls Setup",
    ],
  },
  {
    category: "Remote Support",
    services: [
      "Computer Troubleshooting",
      "Software Installation",
      "Virus/Malware Removal",
      "Email Configuration",
      "Printer Setup",
      "Smart Device Help",
      "General Tech Support",
      "Performance Optimization",
    ],
  },
  {
    category: "Website Design",
    services: [
      "Business Website Design",
      "E-Commerce Website",
      "Landing Page Design",
      "Website Redesign",
      "SEO Optimization",
      "Website Maintenance",
      "Logo & Branding",
      "Social Media Setup",
    ],
  },
  {
    category: "Other Services",
    services: [
      "Smart Thermostat Installation",
      "Printer Setup & Troubleshooting",
      "Smart Home Integration",
      "Business IT Solutions",
      "General Handyman Services",
      "Custom Tech Projects",
    ],
  },
];

interface ScheduleServiceDialogProps {
  triggerText: string;
  triggerVariant?: "default" | "cta" | "outline" | "hero" | "heroOutline";
  triggerSize?: "default" | "sm" | "lg" | "xl" | "heroLg";
  triggerClassName?: string;
  children?: React.ReactNode;
  defaultCategory?: string;
  initialService?: string; // Service name when accessed from a service page
}

const ScheduleServiceDialog = ({
  triggerText,
  triggerVariant = "cta",
  triggerSize = "lg",
  triggerClassName,
  children,
  defaultCategory,
  initialService,
}: ScheduleServiceDialogProps) => {
  // If service is provided, start at step 1 (zipcode), otherwise start at step 0 (service selection)
  const initialStep = initialService ? 1 : 0;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(initialStep);
  const [showThankYou, setShowThankYou] = useState(false);
  const [zipCodeError, setZipCodeError] = useState("");
  const [formData, setFormData] = useState({
    zipCode: "",
    name: "",
    email: "",
    phone: "",
    category: defaultCategory || "",
    service: initialService || "",
    preferredDate: "",
    preferredTime: "",
    address: "",
    details: "",
  });

  const [availableServices, setAvailableServices] = useState<string[]>([]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      const startStep = initialService ? 1 : 0;
      setStep(startStep);
      setFormData({
        zipCode: "",
        name: "",
        email: "",
        phone: "",
        category: defaultCategory || "",
        service: initialService || "",
        preferredDate: "",
        preferredTime: "",
        address: "",
        details: "",
      });
      setZipCodeError("");
    }
  }, [open, initialService, defaultCategory]);

  useEffect(() => {
    if (formData.category) {
      const categoryData = serviceCategories.find(
        (cat) => cat.category === formData.category
      );
      setAvailableServices(categoryData?.services || []);
      // Reset service when category changes (only if not using initialService)
      if (!initialService && !categoryData?.services.includes(formData.service)) {
        setFormData((prev) => ({ ...prev, service: "" }));
      }
    } else {
      setAvailableServices([]);
    }
  }, [formData.category, initialService]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Step 0: Service Selection (only if no initialService)
    if (step === 0) {
      if (!formData.category || !formData.service) {
        toast({
          title: "Please select a service",
          description: "Choose a category and specific service.",
          variant: "destructive",
        });
        return;
      }
    }
    // Step 1: Zipcode (always required)
    if (step === 1) {
      if (!formData.zipCode || formData.zipCode.length !== 5) {
        setZipCodeError("Please enter a 5-digit ZIP code");
        toast({
          title: "Please enter a valid ZIP code",
          variant: "destructive",
        });
        return;
      }
      if (!isValidUSZipCode(formData.zipCode)) {
        setZipCodeError("Please enter a valid US ZIP code (00501-99950)");
        toast({
          title: "Please enter a valid US ZIP code",
          variant: "destructive",
        });
        return;
      }
      setZipCodeError("");
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      // Save to database
      await supabase.from("form_submissions").insert({
        form_type: "booking",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_category: formData.category,
        specific_service: formData.service,
        zip_code: formData.zipCode,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        address: formData.address,
        message: formData.details,
      });

      // Send email notifications
      const { error } = await supabase.functions.invoke("send-form-email", {
        body: {
          formType: "booking",
          customerEmail: formData.email,
          customerName: formData.name,
          formData: {
            phone: formData.phone,
            category: formData.category,
            service: formData.service,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
            address: formData.address,
            details: formData.details,
          },
        },
      });

      if (error && import.meta.env.DEV) {
        console.error("Email error:", error);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Submit error:", err);
    }

    setOpen(false);
    resetForm();
    setShowThankYou(true);
  };

  const resetForm = () => {
    setStep(initialStep);
    setFormData({
      zipCode: "",
      name: "",
      email: "",
      phone: "",
      category: defaultCategory || "",
      service: initialService || "",
      preferredDate: "",
      preferredTime: "",
      address: "",
      details: "",
    });
    setZipCodeError("");
  };

  const getButtonSize = () => {
    if (triggerSize === "heroLg") return "heroLg";
    return triggerSize;
  };

  return (
    <>
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={triggerVariant}
            size={getButtonSize() as any}
            className={triggerClassName}
          >
            {triggerText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initialService ? `Schedule ${initialService}` : "Schedule a Service"}
          </DialogTitle>
          <DialogDescription>
            {initialService 
              ? `Step ${step} of 2 - ${step === 1 ? "Service Area" : "Your Information"}`
              : `Step ${step + 1} of 3 - ${
                  step === 0
                    ? "Select Service"
                    : step === 1
                    ? "Service Area"
                    : "Your Information"
                }`}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {(initialService ? [1, 2] : [1, 2, 3]).map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= (initialService ? step : step + 1) ? "bg-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Service Selection (only if no initialService) */}
        {step === 0 && !initialService && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Service Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat.category} value={cat.category}>
                      {cat.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Specific Service *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      formData.category
                        ? "Choose a service"
                        : "Select a category first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                What's Included
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional service by certified technicians</li>
                <li>• All necessary equipment and supplies</li>
                <li>• Expert guidance and recommendations</li>
                <li>• System testing & demonstration</li>
                <li>• 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 1: Service Area (Zipcode) */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Service Area (ZIP Code) *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    handleInputChange("zipCode", value);
                    
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
                  className={`pl-10 ${zipCodeError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  maxLength={5}
                />
              </div>
              {zipCodeError && (
                <p className="text-sm text-red-500">{zipCodeError}</p>
              )}
            </div>

            {initialService && (
              <div className="bg-secondary/50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Service: {initialService}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Professional service by certified technicians</li>
                  <li>• All necessary equipment and supplies</li>
                  <li>• Expert guidance and recommendations</li>
                  <li>• System testing & demonstration</li>
                  <li>• 30-day satisfaction guarantee</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Contact Information & Additional Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(818) 555-1234"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                placeholder="Tell us about your specific needs or any special requirements..."
                value={formData.details}
                onChange={(e) => handleInputChange("details", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 3: Appointment Details (only if no initialService) */}
        {step === 3 && !initialService && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Service Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat.category} value={cat.category}>
                      {cat.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Specific Service *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      formData.category
                        ? "Choose a service"
                        : "Select a category first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                What's Included
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional service by certified technicians</li>
                <li>• All necessary equipment and supplies</li>
                <li>• Expert guidance and recommendations</li>
                <li>• System testing & demonstration</li>
                <li>• 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 3/4: Appointment Details (Date, Time, Address) */}
        {((initialService && step === 2) || (!initialService && step === 3)) && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) =>
                    handleInputChange("preferredDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) =>
                    handleInputChange("preferredTime", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">
                      Afternoon (12PM - 5PM)
                    </SelectItem>
                    <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                placeholder="123 Main St, Los Angeles, CA"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > (initialService ? 1 : 0) ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < (initialService ? 2 : 3) ? (
            <Button variant="cta" onClick={handleNext}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              variant="cta" 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone}
            >
              Submit Booking
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>

    {/* Thank You Dialog */}
    <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <DialogTitle className="text-2xl font-display">Thank You!</DialogTitle>
          <DialogDescription className="text-base">
            Your service request has been submitted successfully. A DoQuality Agent will contact you shortly to confirm your appointment.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => setShowThankYou(false)} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ScheduleServiceDialog;
