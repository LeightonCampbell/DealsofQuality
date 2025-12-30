import { useState } from "react";
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
import { ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BookingFormDialogProps {
  serviceName: string;
  serviceOptions: string[];
  triggerText: string;
  triggerVariant?: "default" | "cta" | "outline" | "hero" | "heroOutline";
  triggerSize?: "default" | "sm" | "lg" | "xl";
  triggerClassName?: string;
  children?: React.ReactNode;
}

const BookingFormDialog = ({
  serviceName,
  serviceOptions,
  triggerText,
  triggerVariant = "cta",
  triggerSize = "lg",
  triggerClassName,
  children,
}: BookingFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    address: "",
    details: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast({
          title: "Please fill in all required fields",
          description: "Name, email, and phone are required.",
          variant: "destructive",
        });
        return;
      }
    }
    if (step === 2) {
      if (!formData.service) {
        toast({
          title: "Please select a service",
          description: "Choose the service you need.",
          variant: "destructive",
        });
        return;
      }
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
        specific_service: formData.service,
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
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      address: "",
      details: "",
    });
    setShowThankYou(true);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      address: "",
      details: "",
    });
  };

  return (
    <>
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
            {triggerText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Book {serviceName}
          </DialogTitle>
          <DialogDescription>
            Step {step} of 3 - {step === 1 ? "Your Information" : step === 2 ? "Select Service" : "Appointment Details"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-accent" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Contact Information */}
        {step === 1 && (
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
          </div>
        )}

        {/* Step 2: Service Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">Select Service *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
                <li>• Professional installation by certified technicians</li>
                <li>• All necessary mounting hardware</li>
                <li>• Cable management & concealment</li>
                <li>• System testing & demonstration</li>
                <li>• 30-day satisfaction guarantee</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 3: Appointment Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => handleInputChange("preferredTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
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
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Tell us about your TV size, wall type, or any special requirements..."
                value={formData.details}
                onChange={(e) => handleInputChange("details", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button variant="cta" onClick={handleNext}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="cta" onClick={handleSubmit}>
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
            Your booking request has been submitted successfully. A DoQuality Agent will contact you shortly to confirm your appointment.
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

export default BookingFormDialog;
