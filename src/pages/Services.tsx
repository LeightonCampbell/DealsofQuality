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
  Hammer,
  Droplet,
  Zap,
  Wind,
  Square,
  Package,
  Grid3x3,
  DoorOpen,
  Trees,
  Fence,
  ChefHat,
  Refrigerator,
  Droplets,
  DoorClosed,
  Sun,
  Sparkles,
  SquareStack,
  Trash2,
  Bug,
  Boxes,
  TreePine,
  Snowflake,
  Film,
  Play,
  Gamepad2,
  Thermometer,
  Lock,
  Zap as ZapIcon,
  Camera,
  Activity,
  Router,
  Signal,
  Building2,
  Globe,
  Headphones,
  Server,
  ArrowRight
} from "lucide-react";

interface Service {
  title: string;
  href: string;
}

interface ServiceCategory {
  icon: any;
  title: string;
  description: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    icon: Wrench,
    title: "Home Services",
    description: "Comprehensive home maintenance, repair, and improvement services.",
    services: [
      { title: "Handyman Services", href: "/handyman-services" },
      { title: "Painting", href: "/painting" },
      { title: "Flooring Installation", href: "/flooring-installation" },
      { title: "Drywall Installation", href: "/drywall-installation" },
      { title: "Cabinet Installation", href: "/cabinet-installation" },
      { title: "Tile Work", href: "/tile-work" },
      { title: "Window and Door Replacement", href: "/window-door-replacement" },
      { title: "Deck and Patio Building", href: "/deck-patio-building" },
      { title: "Fence Installation", href: "/fence-installation" },
      { title: "Bathroom Remodeling", href: "/bathroom-remodeling" },
      { title: "Kitchen Remodeling", href: "/kitchen-remodeling" },
      { title: "Plumbing", href: "/plumbing" },
      { title: "Electrical", href: "/electrical" },
      { title: "HVAC", href: "/hvac" },
      { title: "Roofing", href: "/roofing" },
      { title: "Appliance Repair", href: "/appliance-repair" },
      { title: "Water Heater Installation", href: "/water-heater-installation" },
      { title: "Gutter Installation", href: "/gutter-installation" },
      { title: "Siding Installation", href: "/siding-installation" },
      { title: "Garage Door Installation", href: "/garage-door-installation" },
      { title: "Solar Panel Installation", href: "/solar-panel-installation" },
      { title: "House Cleaning", href: "/house-cleaning" },
      { title: "Carpet Cleaning", href: "/carpet-cleaning" },
      { title: "Junk Removal", href: "/junk-removal" },
      { title: "Pressure Washing", href: "/pressure-washing" },
      { title: "Gutter Cleaning", href: "/gutter-cleaning" },
      { title: "Pest Control", href: "/pest-control" },
      { title: "Organization Services", href: "/organization-services" },
      { title: "Landscaping", href: "/landscaping" },
      { title: "Snow Removal", href: "/snow-removal" },
    ],
  },
  {
    icon: Tv,
    title: "TV Mounting",
    description: "Professional TV installation and setup services for all screen sizes.",
    services: [
      { title: "TV Mounting (Up to 50\")", href: "/tv-mounting-up-to-50" },
      { title: "TV Mounting (51\"-65\")", href: "/tv-mounting-51-to-65" },
      { title: "TV Mounting (Over 65\")", href: "/tv-mounting-over-65" },
      { title: "TV Cable Concealment", href: "/tv-cable-concealment" },
      { title: "Soundbar Installation", href: "/soundbar-installation" },
      { title: "TV Dismount/Remount", href: "/tv-dismount-remount" },
    ],
  },
  {
    icon: Home,
    title: "Smart Home",
    description: "Complete smart home automation and device installation.",
    services: [
      { title: "Smart Thermostats", href: "/smart-thermostats" },
      { title: "Video Doorbells", href: "/video-doorbells" },
      { title: "Smart Locks", href: "/smart-locks" },
      { title: "Smart Home Integration", href: "/smart-home-integration" },
    ],
  },
  {
    icon: Speaker,
    title: "Audio & Video",
    description: "Home theater and entertainment system setup and installation.",
    services: [
      { title: "Home Theater", href: "/home-theater" },
      { title: "Surround Sound", href: "/surround-sound" },
      { title: "Streaming Setup", href: "/streaming-setup" },
      { title: "Gaming Setup", href: "/gaming-setup" },
    ],
  },
  {
    icon: Wifi,
    title: "WiFi & Network",
    description: "Network setup, optimization, and troubleshooting services.",
    services: [
      { title: "Router Setup", href: "/router-setup" },
      { title: "Network Optimization", href: "/network-optimization" },
      { title: "Dead Zone Elimination", href: "/dead-zone-elimination" },
      { title: "Business Networks", href: "/business-networks" },
    ],
  },
  {
    icon: Shield,
    title: "Home Security",
    description: "Security camera installation and smart security system setup.",
    services: [
      { title: "Security Cameras", href: "/security-cameras" },
      { title: "Video Doorbells", href: "/video-doorbells" },
      { title: "Smart Locks", href: "/smart-locks" },
      { title: "Motion Sensors", href: "/motion-sensors" },
    ],
  },
  {
    icon: Monitor,
    title: "Computers & Printers",
    description: "Computer repair, maintenance, and printer setup services.",
    services: [
      { title: "Computer Repair", href: "/computer-repair" },
      { title: "Virus Removal", href: "/virus-removal" },
      { title: "Printer Setup", href: "/printer-setup" },
      { title: "Data Backup", href: "/data-backup" },
    ],
  },
  {
    icon: Briefcase,
    title: "Business Services",
    description: "Professional business technology solutions and support.",
    services: [
      { title: "Website Design", href: "/website-design" },
      { title: "Remote Support", href: "/remote-support-service" },
      { title: "Business IT Solutions", href: "/business-it-solutions" },
      { title: "Custom Solutions", href: "/custom-solutions" },
    ],
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
              Our Premium Home Services
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Carefully vetted, local professionals for all your home service needs. From plumbing and electrical to remodeling and smart home installation.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a service to view details and book an appointment
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, categoryIndex) => {
              // Home Services: Keep the special 3-column layout with 10 services per column
              if (category.title === "Home Services") {
                return (
                  <div key={category.title} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <category.icon className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Home Services: 3 columns with 10 services each */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[0, 1, 2].map((colIndex) => (
                        <div key={colIndex} className="space-y-1">
                          {category.services.slice(colIndex * 10, (colIndex + 1) * 10).map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className="block py-2 px-1 text-foreground hover:text-accent transition-colors duration-200 border-b border-transparent hover:border-accent/20"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}

            {/* Other Categories: Display in 3-column grid */}
            {(() => {
              const otherCategories = serviceCategories.filter(cat => cat.title !== "Home Services");
              const rows = [];
              for (let i = 0; i < otherCategories.length; i += 3) {
                rows.push(otherCategories.slice(i, i + 3));
              }
              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {row.map((category, colIndex) => (
                    <div 
                      key={category.title} 
                      className="animate-fade-in-up" 
                      style={{ animationDelay: `${(serviceCategories.findIndex(c => c.title === category.title)) * 100}ms` }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                            {category.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Services List */}
                      <div className="space-y-1">
                        {category.services.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className="block py-2 px-1 text-foreground hover:text-accent transition-colors duration-200 border-b border-transparent hover:border-accent/20"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
