import { Link } from "react-router-dom";
import { 
  Wrench,
  Hammer,
  Wind,
  Tv,
  Home,
  Sparkles,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Plumbing",
    href: "/plumbing",
  },
  {
    icon: Hammer,
    title: "Remodeling",
    href: "/kitchen-remodeling",
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    href: "/hvac",
  },
  {
    icon: Home,
    title: "Handyman",
    href: "/handyman-services",
  },
  {
    icon: Tv,
    title: "TV Mounting",
    href: "/tv-mounting-up-to-50",
  },
  {
    icon: Sparkles,
    title: "Home Cleaning",
    href: "/house-cleaning",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
              Top Service Requests
            </h2>
            <p className="text-muted-foreground">
              Quality expertise for your home's most essential needs.
            </p>
          </div>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-1 text-accent font-semibold mt-4 md:mt-0 hover:gap-2 transition-all duration-300"
          >
            See all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid - horizontal scrollable on mobile, 6 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group bg-card rounded-xl border border-border p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Title */}
              <h3 className="font-display text-sm font-semibold text-foreground leading-tight">
                {service.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
