import { Clock, ShieldCheck, DollarSign, Award } from "lucide-react";
const features = [{
  icon: Clock,
  title: "Same-Day Service Available",
  description: "Need help fast? We offer same-day appointments for urgent issues."
}, {
  icon: ShieldCheck,
  title: "Certified & Background-Checked",
  description: "All pros are fully certified, insured, and background verified."
}, {
  icon: DollarSign,
  title: "Upfront Pricing, No Hidden Fees",
  description: "Know exactly what you'll pay before we start. No surprise charges."
}, {
  icon: Award,
  title: "Satisfaction Guarantee",
  description: "Not happy? We'll come back and fix it free of charge. Period."
}];
const WhyChooseUs = () => {
  return <section className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <h2 className="font-display text-[30px] font-bold text-foreground mb-6">Why Choose Us for Your Home Services</h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              We're not just contractors – we're your neighbors who happen to be home service experts. 
              For over 15 years, we've been helping local families and businesses with premium home services.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => <div key={feature.title} className="flex gap-4 animate-fade-in-up" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent/80 p-8 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <div className="text-7xl font-display font-bold mb-4">15+</div>
                <div className="text-xl font-medium opacity-90">Years of Experience</div>
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="opacity-80">Happy Customers</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="opacity-80">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;