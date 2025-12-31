import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Users, DollarSign, Calendar, MapPin, Shield, Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ApplicationForm = () => {
  const { toast } = useToast();
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    expertise: "",
    experience: "",
    about: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      await supabase.from("form_submissions").insert({
        form_type: "application",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        zip: formData.zipCode,
        service_category: formData.expertise,
        years_experience: formData.experience,
        message: formData.about,
      });

      // Send email notifications
      const { error } = await supabase.functions.invoke("send-form-email", {
        body: {
          formType: "application",
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          formData: {
            phone: formData.phone,
            zipCode: formData.zipCode,
            expertise: formData.expertise,
            experience: formData.experience,
            about: formData.about,
          },
        },
      });

      if (error && import.meta.env.DEV) {
        console.error("Email error:", error);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Submit error:", err);
    }
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      expertise: "",
      experience: "",
      about: "",
    });
    setIsSubmitting(false);
    setShowThankYou(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-xl p-8 border border-border shadow-sm space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            required
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            placeholder="90210"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Select
            value={formData.experience}
            onValueChange={(value) => setFormData({ ...formData, experience: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">Less than 1 year</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5-10">5-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expertise">Area of Expertise *</Label>
        <Select
          value={formData.expertise}
          onValueChange={(value) => setFormData({ ...formData, expertise: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your primary expertise" />
          </SelectTrigger>
              <SelectContent>
                <SelectItem value="home-services">Home Services (Plumbing, Electrical, HVAC, etc.)</SelectItem>
                <SelectItem value="tv-mounting">TV Mounting & Installation</SelectItem>
                <SelectItem value="smart-home">Smart Home Devices</SelectItem>
                <SelectItem value="audio-video">Audio & Video Systems</SelectItem>
                <SelectItem value="networking">WiFi & Networking</SelectItem>
                <SelectItem value="security">Home Security</SelectItem>
                <SelectItem value="computer">Computer Repair & Support</SelectItem>
                <SelectItem value="cleaning">Cleaning Services</SelectItem>
                <SelectItem value="landscaping">Landscaping & Outdoor Services</SelectItem>
                <SelectItem value="multiple">Multiple Areas</SelectItem>
              </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="about">Tell Us About Yourself</Label>
        <Textarea
          id="about"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          placeholder="Describe your experience, certifications, and why you'd be a great fit for our team..."
          rows={4}
        />
      </div>
      
      <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Application
          </>
        )}
      </Button>
      
      <p className="text-sm text-muted-foreground text-center">
        By submitting this form, you agree to our terms of service and privacy policy.
      </p>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-2xl font-display">Thank You!</DialogTitle>
            <DialogDescription className="text-base">
              Your application has been submitted successfully. A DoQuality Agent will review your application and contact you within 24-48 hours.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowThankYou(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </form>
  );
};

const JoinAsPro = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Join as a Pro | Prequalified Leads for Service Contractors | Deals Of Quality</title>
        <meta 
          name="description" 
          content="Join our network of Professional Service Contractors. Get prequalified leads, grow your business, and escape unreliable lead generation platforms. Quality customers, not spam leads." 
        />
        <meta name="keywords" content="service contractor jobs, prequalified leads, home service professionals, contractor network, Angi alternative, Thumbtack alternative, quality leads" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230073E6%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Grow Your Business with <span className="text-primary">Prequalified Leads</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Join our network of Professional Service Contractors and escape the uncertainty of Angi, Thumbtack, and other spammy lead generation tools. We provide quality, prequalified leads that convert—not endless spam calls and wasted time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="#apply-form">
                    Apply Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="tel:8185847389">
                    Call (818) 584-7389
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <Users className="w-24 h-24 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-foreground">1000+ Contractors</p>
                  <p className="text-muted-foreground">Growing their businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-muted-foreground mb-8 font-medium">
            Helping contractors build sustainable, growing businesses
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">85%+</div>
              <div className="text-sm text-muted-foreground">Lead Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Active Contractors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Prequalified</div>
              <div className="text-sm text-muted-foreground">Quality Leads Only</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">48hrs</div>
              <div className="text-sm text-muted-foreground">Fast Payments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="p-8 text-center">
                  <Users className="w-20 h-20 text-primary mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground">Quality Over Quantity</p>
                  <p className="text-muted-foreground">Prequalified leads that convert</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">Why Join Us?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Grow Your Business, Not Your Spam Folder
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tired of paying for leads that never convert? We vet every customer before they reach you. No more competing with 5 other contractors for the same job. No more spam calls. Just quality, prequalified leads ready to hire.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Prequalified Leads</p>
                    <p className="text-muted-foreground text-sm">Every lead is vetted and ready to hire</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">No Competition</p>
                    <p className="text-muted-foreground text-sm">You're the only contractor they'll contact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Higher Conversion</p>
                    <p className="text-muted-foreground text-sm">85%+ conversion rate vs. 10-15% on other platforms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fast Payments</p>
                    <p className="text-muted-foreground text-sm">Get paid within 48 hours of job completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Grow Your Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlike Angi and Thumbtack, we don't sell your information to multiple contractors. You get exclusive, prequalified leads that are ready to hire.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Prequalified Leads</h3>
              <p className="text-sm text-muted-foreground">
                Every lead is vetted and ready to hire. No spam, no tire-kickers—just quality customers.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Exclusive Leads</h3>
              <p className="text-sm text-muted-foreground">
                You're the only contractor they contact. No competing with 5 other pros for the same job.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Better ROI</h3>
              <p className="text-sm text-muted-foreground">
                Higher conversion rates mean better return on your investment. Grow your business, not your expenses.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Flexible Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Accept leads that fit your schedule. Build your business on your terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">Service Categories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Service Categories We Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From home services to smart technology, we connect you with quality customers across multiple categories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Home Services", desc: "Plumbing, electrical, HVAC, remodeling" },
              { title: "TV Mounting", desc: "Wall mounting for all TV sizes" },
              { title: "Smart Home", desc: "Thermostats, doorbells, locks" },
              { title: "Audio & Video", desc: "Home theater, surround sound" },
              { title: "WiFi & Networking", desc: "Router setup, optimization" },
              { title: "Home Security", desc: "Cameras, sensors, monitoring" },
              { title: "Computer Repair", desc: "Repairs, virus removal, backup" },
              { title: "Cleaning Services", desc: "House cleaning, carpet, pressure washing" },
              { title: "Landscaping", desc: "Lawn care, snow removal, maintenance" },
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">Requirements</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Look For
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl p-8 border border-border">
                <h3 className="font-semibold text-lg text-foreground mb-4">Basic Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Valid driver's license and reliable transportation",
                    "Smartphone for job management",
                    "Professional tools for your trade",
                    "Pass a background check",
                    "Proof of liability insurance",
                  ].map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-background rounded-xl p-8 border border-border">
                <h3 className="font-semibold text-lg text-foreground mb-4">Preferred Qualifications</h3>
                <ul className="space-y-3">
                  {[
                    "2+ years of relevant experience",
                    "Excellent customer service skills",
                    "Strong problem-solving abilities",
                    "Certifications in relevant fields",
                    "Bilingual capabilities (bonus)",
                  ].map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">Apply Now</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Start Your Application
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we&apos;ll be in touch within 24-48 hours.
              </p>
            </div>
            
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our growing network of Professional Service Contractors and escape the uncertainty of Angi, Thumbtack, and other spammy lead generation tools. Get prequalified leads that convert into real business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="#apply-form">
                Apply Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="tel:8185847389">
                Call (818) 584-7389
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinAsPro;
