import { Calendar, UserCheck, Smile } from "lucide-react";
const steps = [{
  icon: Calendar,
  step: "01",
  title: "Schedule Appointment",
  description: "Book online or give us a call. Pick a time that works for your schedule."
}, {
  icon: UserCheck,
  step: "02",
  title: "Expert Arrives",
  description: "Our verified professional arrives on time with all the tools needed."
}, {
  icon: Smile,
  step: "03",
  title: "Enjoy & Relax",
  description: "Your project is completed perfectly. 100% Satisfaction guaranteed."
}];
const Process = () => {
  return <section id="process" className="section-padding bg-secondary">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-[35px] font-bold text-foreground mb-4">
            Simple, Hassle-Free Process
          </h2>
          <p className="text-lg text-muted-foreground">Getting expert home improvement has never been easier</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => <div key={step.title} className="relative text-center animate-fade-in-up" style={{
          animationDelay: `${index * 150}ms`
        }}>
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border z-0" />}

              {/* Icon Container */}
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-card border-2 border-accent shadow-lg flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-accent" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Process;