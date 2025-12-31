import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wifi, Router, Signal, Building2 } from "lucide-react";

const services = [
  {
    icon: Router,
    title: "Router Setup",
    href: "/router-setup",
    benefit: "Proper router configuration for maximum speed and security. Get the most out of your internet connection with expert setup."
  },
  {
    icon: Signal,
    title: "Network Optimization",
    href: "/network-optimization",
    benefit: "Boost your network performance and eliminate bottlenecks. Faster speeds and more reliable connections throughout your space."
  },
  {
    icon: Wifi,
    title: "Dead Zone Elimination",
    href: "/dead-zone-elimination",
    benefit: "Say goodbye to WiFi dead zones. Professional solutions ensure strong, consistent coverage in every room of your home or office."
  },
  {
    icon: Building2,
    title: "Business Networks",
    href: "/business-networks",
    benefit: "Enterprise-grade network solutions for your business. Secure, scalable infrastructure that supports your growing operations."
  },
];

const WifiNetworkCategory = () => {
  return (
    <>
      <Helmet>
        <title>WiFi & Network | Setup & Optimization Services | Deals Of Quality</title>
        <meta
          name="description"
          content="Professional WiFi and network services. Router setup, network optimization, dead zone elimination, and business network solutions. Same-day service available."
        />
        <meta name="keywords" content="wifi setup, network optimization, router installation, dead zone elimination, business network" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                WiFi & Network
              </h1>
              <p className="text-muted-foreground text-lg">
                Get fast, reliable internet throughout your home or office. We optimize networks for maximum performance.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Wifi className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our WiFi & Network Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group bg-card border border-border rounded-xl p-6 card-hover block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.benefit}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WifiNetworkCategory;
