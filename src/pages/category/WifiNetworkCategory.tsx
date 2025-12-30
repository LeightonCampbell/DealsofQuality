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
  },
  {
    icon: Signal,
    title: "Network Optimization",
    href: "/network-optimization",
  },
  {
    icon: Wifi,
    title: "Dead Zone Elimination",
    href: "/dead-zone-elimination",
  },
  {
    icon: Building2,
    title: "Business Networks",
    href: "/business-networks",
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

      {/* Select a Service */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Select a service
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group bg-card border border-border rounded-xl p-6 text-center card-hover block"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </p>
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
