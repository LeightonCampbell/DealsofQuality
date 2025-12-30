import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

const TipsUpdates = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@") || trimmedEmail.length > 255) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save subscription to database
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "newsletter",
        name: "Newsletter Subscriber",
        email: trimmedEmail,
        message: "Newsletter subscription request",
      });

      if (error) {
        if (import.meta.env.DEV) console.error("Subscription error:", error);
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      } else {
        setShowThankYou(true);
        setEmail("");
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Subscription error:", err);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container-max px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Stay updated with quality tips
          </h2>
          <p className="text-muted-foreground mb-8">
            Get weekly insights, service updates, and exclusive offers directly in your inbox
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background border-border"
              disabled={isSubmitting}
              maxLength={255}
              aria-label="Email address for newsletter"
            />
            <Button 
              type="submit" 
              variant="cta" 
              className="h-12 px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">terms</a>
            {" "}and{" "}
            <a href="/privacy" className="text-primary hover:underline">privacy policy</a>
          </p>
        </div>
      </div>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-2xl font-display">Thank You!</DialogTitle>
            <DialogDescription className="text-base">
              You've been successfully subscribed to our newsletter. A DoQuality Agent will keep you updated with the latest tips and offers.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowThankYou(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TipsUpdates;
