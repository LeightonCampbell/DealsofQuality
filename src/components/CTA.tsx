import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import ScheduleServiceDialog from "@/components/ScheduleServiceDialog";

const CTA = () => {
  return (
    <section id="quote" className="section-padding hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Schedule your service today and experience premium home services from carefully vetted professionals. 
            Our expert team is standing by to help with all your home service needs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ScheduleServiceDialog 
              triggerText="Find A Pro Now" 
              triggerVariant="hero" 
              triggerSize="xl"
            />
            <Button variant="heroOutline" size="xl" asChild>
              <a href="tel:+18185847389" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                (818) 584-7389
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
