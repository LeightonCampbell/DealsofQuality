import { Link } from "react-router-dom";
import {
  Tv,
  Home,
  Droplet,
  Zap,
  Wrench,
  Wifi,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "House Cleaning",
    description: "Professional house cleaning and maid services",
    href: "/house-cleaning",
    popular: true,
  },
  {
    icon: Wrench,
    title: "Handyman Services",
    description: "Furniture assembly, repairs & odd jobs",
    href: "/handyman-services",
    popular: true,
  },
  {
    icon: Droplet,
    title: "Plumbing Services",
    description: "Repairs, installations & emergencies",
    href: "/plumbing",
    popular: false,
  },
  {
    icon: Camera,
    title: "Security Camera Setup",
    description: "Professional camera installation",
    href: "/security-cameras",
    popular: false,
  },
  {
    icon: Tv,
    title: "TV Mounting",
    description: "Professional wall mounting for any TV size",
    href: "/services/tv-mounting",
    popular: true,
  },
  {
    icon: Zap,
    title: "Electrical Services",
    description: "Safe, licensed electrical work",
    href: "/electrical",
    popular: true,
  },
  {
    icon: Sparkles,
    title: "Smart Home Integration",
    description: "Thermostats, locks, doorbells & more",
    href: "/smart-home-integration",
    popular: false,
  },
  {
    icon: Wifi,
    title: "Wi-Fi & Networking",
    description: "Setup, optimization & dead zones",
    href: "/router-setup",
    popular: true,
  },
];

const ServiceGrid = () => {
  return (
    <section id="popular-services" className="section-padding bg-background" aria-labelledby="popular-services-heading">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div className="text-center md:text-left">
            <h2 id="popular-services-heading" className="font-display text-[35px] font-bold text-foreground mb-2">
              Popular Services
            </h2>
            <p className="text-muted-foreground">
              Expert help for your home's most important needs
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-accent font-semibold mt-4 md:mt-0 hover:gap-2 transition-all duration-300"
            aria-label="View all services"
          >
            View all services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Services Grid */}
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <li key={service.title}>
              <Link
                to={service.href}
                className="group relative block bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={`${service.title} - ${service.description}`}
              >
                {/* Hot Badge - high contrast colors for accessibility */}
                {service.popular && (
                  <span 
                    className="absolute -top-2 -right-2 bg-cta text-cta-foreground text-xs font-semibold px-2 py-1 rounded-full"
                    aria-hidden="true"
                  >
                    Hot
                  </span>
                )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300" aria-hidden="true">
                <service.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Title */}
              <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceGrid;
