import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Wrench, 
  Paintbrush, 
  SquareStack, 
  Grid3x3, 
  Package, 
  Grid, 
  DoorOpen, 
  Trees, 
  Fence, 
  ChefHat, 
  Refrigerator, 
  Droplets, 
  DoorClosed, 
  Sun, 
  Sparkles, 
  SquareStack as SquareStackIcon, 
  Trash2, 
  Bug, 
  Boxes, 
  TreePine, 
  Snowflake,
  Droplet,
  Zap,
  Wind,
  Hammer
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Handyman Services",
    href: "/handyman-services",
    benefit: "Expert repairs and installations for all your home maintenance needs. Save time and money with professional solutions."
  },
  {
    icon: Paintbrush,
    title: "Painting",
    href: "/painting",
    benefit: "Transform your space with professional interior and exterior painting. Quality finishes that last for years."
  },
  {
    icon: SquareStack,
    title: "Flooring Installation",
    href: "/flooring-installation",
    benefit: "Beautiful, durable flooring installed correctly the first time. Enhance your home's value and comfort."
  },
  {
    icon: Grid3x3,
    title: "Drywall Installation",
    href: "/drywall-installation",
    benefit: "Smooth, seamless walls and ceilings. Professional drywall work for renovations and repairs."
  },
  {
    icon: Package,
    title: "Cabinet Installation",
    href: "/cabinet-installation",
    benefit: "Custom or pre-built cabinets installed perfectly. Maximize storage and enhance your kitchen or bathroom."
  },
  {
    icon: Grid,
    title: "Tile Work",
    href: "/tile-work",
    benefit: "Stunning tile installations for floors, walls, and backsplashes. Precision craftsmanship for lasting beauty."
  },
  {
    icon: DoorOpen,
    title: "Window and Door Replacement",
    href: "/window-door-replacement",
    benefit: "Energy-efficient windows and doors that reduce utility costs and improve home security."
  },
  {
    icon: Trees,
    title: "Deck and Patio Building",
    href: "/deck-patio-building",
    benefit: "Create your perfect outdoor living space. Custom decks and patios built to last and enhance your lifestyle."
  },
  {
    icon: Fence,
    title: "Fence Installation",
    href: "/fence-installation",
    benefit: "Privacy, security, and curb appeal. Professional fence installation for residential and commercial properties."
  },
  {
    icon: Droplets,
    title: "Bathroom Remodeling",
    href: "/bathroom-remodeling",
    benefit: "Transform your bathroom into a spa-like retreat. Complete remodels that add value and functionality."
  },
  {
    icon: ChefHat,
    title: "Kitchen Remodeling",
    href: "/kitchen-remodeling",
    benefit: "The heart of your home, redesigned. Modern kitchens that improve functionality and increase property value."
  },
  {
    icon: Droplet,
    title: "Plumbing",
    href: "/plumbing",
    benefit: "Reliable plumbing services for repairs, installations, and maintenance. Prevent costly water damage."
  },
  {
    icon: Zap,
    title: "Electrical",
    href: "/electrical",
    benefit: "Safe, code-compliant electrical work. From simple repairs to complete rewiring, we've got you covered."
  },
  {
    icon: Wind,
    title: "HVAC",
    href: "/hvac",
    benefit: "Year-round comfort with expert HVAC installation, repair, and maintenance. Lower energy bills guaranteed."
  },
  {
    icon: SquareStackIcon,
    title: "Roofing",
    href: "/roofing",
    benefit: "Protect your investment with quality roofing. Repairs, replacements, and maintenance for all roof types."
  },
  {
    icon: Refrigerator,
    title: "Appliance Repair",
    href: "/appliance-repair",
    benefit: "Fast, reliable appliance repairs. Get your appliances working again without the cost of replacement."
  },
  {
    icon: Sun,
    title: "Water Heater Installation",
    href: "/water-heater-installation",
    benefit: "Never run out of hot water again. Professional installation of energy-efficient water heaters."
  },
  {
    icon: Sparkles,
    title: "Gutter Installation",
    href: "/gutter-installation",
    benefit: "Protect your home from water damage. Properly installed gutters that channel water away effectively."
  },
  {
    icon: DoorClosed,
    title: "Siding Installation",
    href: "/siding-installation",
    benefit: "Boost curb appeal and energy efficiency. Durable siding that protects and beautifies your home."
  },
  {
    icon: Package,
    title: "Garage Door Installation",
    href: "/garage-door-installation",
    benefit: "Secure, reliable garage doors that enhance security and improve your home's appearance."
  },
  {
    icon: Sun,
    title: "Solar Panel Installation",
    href: "/solar-panel-installation",
    benefit: "Reduce energy costs and environmental impact. Professional solar panel installation with maximum efficiency."
  },
  {
    icon: Sparkles,
    title: "House Cleaning",
    href: "/house-cleaning",
    benefit: "Deep cleaning services that restore your home's sparkle. More time for what matters most."
  },
  {
    icon: SquareStack,
    title: "Carpet Cleaning",
    href: "/carpet-cleaning",
    benefit: "Extend the life of your carpets with professional deep cleaning. Remove allergens and restore appearance."
  },
  {
    icon: Trash2,
    title: "Junk Removal",
    href: "/junk-removal",
    benefit: "Fast, eco-friendly junk removal. Clear out clutter and reclaim your space quickly and safely."
  },
  {
    icon: Sparkles,
    title: "Pressure Washing",
    href: "/pressure-washing",
    benefit: "Restore your home's exterior beauty. Professional pressure washing that removes years of grime."
  },
  {
    icon: Sparkles,
    title: "Gutter Cleaning",
    href: "/gutter-cleaning",
    benefit: "Prevent costly water damage. Regular gutter cleaning keeps your home protected year-round."
  },
  {
    icon: Bug,
    title: "Pest Control",
    href: "/pest-control",
    benefit: "Effective pest elimination and prevention. Safe, professional solutions for a pest-free home."
  },
  {
    icon: Boxes,
    title: "Organization Services",
    href: "/organization-services",
    benefit: "Transform chaos into order. Professional organization that maximizes space and improves daily life."
  },
  {
    icon: TreePine,
    title: "Landscaping",
    href: "/landscaping",
    benefit: "Create stunning outdoor spaces. Professional landscaping that enhances beauty and property value."
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    href: "/snow-removal",
    benefit: "Safe, reliable snow removal service. Keep your property accessible and safe during winter months."
  },
];

const HomeServicesCategory = () => {
  return (
    <>
      <Helmet>
        <title>Home Services | Comprehensive Home Maintenance & Repair | Deals Of Quality</title>
        <meta
          name="description"
          content="Complete home services from plumbing and electrical to remodeling and cleaning. Expert professionals for all your home maintenance needs. Same-day service available."
        />
        <meta name="keywords" content="home services, plumbing, electrical, HVAC, remodeling, home repair, handyman, cleaning services" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Home Services
              </h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive home maintenance, repair, and improvement services. From plumbing and electrical to remodeling and cleaning, we've got you covered.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Wrench className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our Home Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default HomeServicesCategory;
