import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Tv, 
  Home, 
  Speaker, 
  Wifi, 
  Shield, 
  Monitor, 
  Briefcase,
  Wrench,
  ArrowRight
} from "lucide-react";

const serviceCategories = [
  {
    icon: Tv,
    title: "TV Mounting",
    description: "Professional TV wall mounting, cable concealment, and soundbar installation for any TV size.",
    href: "/services/tv-mounting",
    services: ["TV Mounting (Up to 50\") - $95", "TV Mounting (51\"-65\") - $120", "TV Mounting (Over 65\") - $180", "TV Wire Concealment", "Soundbar Installation"]
  },
  {
    icon: Home,
    title: "Smart Home",
    description: "Complete smart home setup including thermostats, doorbells, locks, and home automation integration.",
    href: "/services/smart-home",
    services: ["Smart Thermostats", "Video Doorbells", "Smart Locks", "Smart Home Integration"]
  },
  {
    icon: Speaker,
    title: "Audio & Video",
    description: "Home theater, surround sound, streaming setup, and gaming console configuration.",
    href: "/services/audio-video",
    services: ["Home Theater", "Surround Sound", "Streaming Setup", "Gaming Console Setup"]
  },
  {
    icon: Wifi,
    title: "WiFi & Network",
    description: "Router setup, network optimization, dead zone elimination, and business network solutions.",
    href: "/services/wifi-network",
    services: ["Router Setup", "Network Optimization", "Dead Zone Elimination", "Business Networks"]
  },
  {
    icon: Shield,
    title: "Home Security",
    description: "Security camera installation, video doorbells, smart locks, and motion sensor setup.",
    href: "/services/home-security",
    services: ["Security Cameras", "Video Doorbells", "Smart Locks", "Motion Sensors"]
  },
  {
    icon: Monitor,
    title: "Computers & Printers",
    description: "Computer repair, virus removal, printer setup, and data backup services.",
    href: "/services/computers-printers",
    services: ["Computer Repair", "Virus Removal", "Printer Setup", "Data Backup"]
  },
  {
    icon: Briefcase,
    title: "Business Services",
    description: "Website design, remote support, business IT solutions, and custom tech services.",
    href: "/services/business",
    services: ["Website Design", "Remote Support", "Business IT Solutions", "Custom Solutions"]
  },
  {
    icon: Wrench,
    title: "General Home Services",
    description: "Professional home maintenance and repair services for your everyday needs.",
    href: "#",
    services: ["House Cleaning", "Handyman", "Heating & Air Conditioning", "Electrician", "Plumber"]
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Premium Home Services | Carefully Vetted Local Professionals | Deals Of Quality</title>
        <meta
          name="description"
          content="Browse our comprehensive range of premium home services. From plumbing and electrical to remodeling, cleaning, and smart home installation. Carefully vetted professionals you can trust."
        />
        <meta name="keywords" content="home services, premium services, plumbing, electrical, HVAC, remodeling, cleaning, handyman, TV mounting, smart home, local professionals" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Carefully vetted, local professionals for all your home service needs. From plumbing and electrical to remodeling and smart home installation.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What kind of help do you need?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a service category to explore our offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="group bg-card border border-border rounded-2xl p-8 card-hover block"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <category.icon className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {category.services.map((service, sIndex) => (
                    <li key={sIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  View Services
                  <ArrowRight className="w-4 h-4" />
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

export default Services;