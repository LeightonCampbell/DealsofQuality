import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, ShieldCheck, MapPin } from "lucide-react";

// Service data with images, prices, and categories
interface Service {
  id: string;
  title: string;
  href: string;
  category: "Home Repair" | "Smart Home" | "Tech Support" | "Outdoors";
  price: string;
  image: string; // Placeholder image URLs - replace with actual images
  description: string;
}

const services: Service[] = [
  // Home Repair
  {
    id: "handyman",
    title: "Handyman Services",
    href: "/handyman-services",
    category: "Home Repair",
    price: "$75",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    description: "Furniture assembly, repairs & odd jobs",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    href: "/plumbing",
    category: "Home Repair",
    price: "$99",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
    description: "Repairs, installations & emergencies",
  },
  {
    id: "electrical",
    title: "Electrical",
    href: "/electrical",
    category: "Home Repair",
    price: "$125",
    image: "https://images.unsplash.com/photo-1621905252472-3af65b8c3dd8?w=800",
    description: "Safe, licensed electrical work",
  },
  {
    id: "hvac",
    title: "HVAC",
    href: "/hvac",
    category: "Home Repair",
    price: "$149",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
    description: "Heating, cooling & air quality",
  },
  {
    id: "painting",
    title: "Painting",
    href: "/painting",
    category: "Home Repair",
    price: "$199",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800",
    description: "Interior & exterior painting",
  },
  {
    id: "flooring",
    title: "Flooring Installation",
    href: "/flooring-installation",
    category: "Home Repair",
    price: "$299",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    description: "Hardwood, tile & carpet installation",
  },
  // Smart Home
  {
    id: "smart-home",
    title: "Smart Home Installation",
    href: "/smart-home-integration",
    category: "Smart Home",
    price: "$149",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    description: "Thermostats, locks, doorbells & more",
  },
  {
    id: "tv-mounting",
    title: "TV Mounting",
    href: "/tv-mounting-up-to-50",
    category: "Smart Home",
    price: "$99",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
    description: "Professional wall mounting for any TV size",
  },
  {
    id: "security-cameras",
    title: "Security Cameras",
    href: "/security-cameras",
    category: "Smart Home",
    price: "$199",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    description: "Professional camera installation",
  },
  {
    id: "home-theater",
    title: "Home Theater Setup",
    href: "/home-theater",
    category: "Smart Home",
    price: "$249",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
    description: "Surround sound & streaming setup",
  },
  // Tech Support
  {
    id: "wifi-network",
    title: "WiFi & Network Setup",
    href: "/router-setup",
    category: "Tech Support",
    price: "$99",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    description: "Setup, optimization & dead zones",
  },
  {
    id: "computer-repair",
    title: "Computer Repair",
    href: "/computer-repair",
    category: "Tech Support",
    price: "$79",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800",
    description: "Virus removal, upgrades & repairs",
  },
  {
    id: "printer-setup",
    title: "Printer Setup",
    href: "/printer-setup",
    category: "Tech Support",
    price: "$69",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800",
    description: "Wireless & network printer setup",
  },
  // Outdoors
  {
    id: "landscaping",
    title: "Landscaping",
    href: "/landscaping",
    category: "Outdoors",
    price: "$199",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    description: "Lawn care, planting & design",
  },
  {
    id: "deck-patio",
    title: "Deck & Patio Building",
    href: "/deck-patio-building",
    category: "Outdoors",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    description: "Custom deck & patio construction",
  },
  {
    id: "fence-installation",
    title: "Fence Installation",
    href: "/fence-installation",
    category: "Outdoors",
    price: "$899",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    description: "Privacy & security fencing",
  },
  {
    id: "pressure-washing",
    title: "Pressure Washing",
    href: "/pressure-washing",
    category: "Outdoors",
    price: "$149",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    description: "Exterior cleaning & maintenance",
  },
];

// Recent activity data
const recentActivities = [
  { zip: "90210", service: "TV Mounting" },
  { zip: "10001", service: "Smart Home Installation" },
  { zip: "60601", service: "Plumbing" },
  { zip: "75201", service: "Electrical" },
  { zip: "30301", service: "Handyman Services" },
  { zip: "98101", service: "WiFi & Network Setup" },
  { zip: "02101", service: "Security Cameras" },
  { zip: "33101", service: "Home Theater Setup" },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceValue, setSelectedServiceValue] = useState("");

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Apply category filter
    if (selectedFilter !== "All") {
      filtered = filtered.filter((service) => service.category === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  // Get random recent activity
  const getRandomActivity = () => {
    return recentActivities[Math.floor(Math.random() * recentActivities.length)];
  };

  const [currentActivity, setCurrentActivity] = useState(getRandomActivity());

  // Rotate activity every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(getRandomActivity());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (service: Service) => {
    // Map service to modal service value
    const serviceMap: Record<string, string> = {
      handyman: "handyman",
      plumbing: "plumbing",
      electrical: "electrical",
      hvac: "hvac",
      "smart-home": "smart-home",
      "tv-mounting": "tv-mounting",
      "security-cameras": "security",
      "home-theater": "home-theater",
      "wifi-network": "wifi-network",
      "computer-repair": "computer-repair",
    };

    setSelectedService(service.title);
    setSelectedServiceValue(serviceMap[service.id] || "other");
    setIsModalOpen(true);
  };

  const filterCategories = ["All", "Home Repair", "Smart Home", "Tech Support", "Outdoors"];

  return (
    <>
      <Helmet>
        <title>Your Home, Handled | Premium Home Services | Deals Of Quality</title>
        <meta
          name="description"
          content="Browse our comprehensive range of premium home services. From plumbing and electrical to smart home installation. Book in 60 seconds with vetted professionals."
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container-max max-w-4xl mx-auto px-4">
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground"
            >
              Your Home, Handled.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              Browse our vetted professionals or search for a specific project below.
            </motion.p>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-base border-2 focus-visible:ring-2 focus-visible:ring-accent"
              />
            </motion.div>
          </div>
                        </div>
      </section>

      {/* Filter Pills */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="container-max">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === category
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-card text-foreground hover:bg-accent/10 border border-border"
                }`}
              >
                {category}
              </button>
                      ))}
                    </div>
                  </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No services found. Try a different search.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    {/* Background Image with Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
                          </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      Starting at {service.price}
                          </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="font-display text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-white/90 mb-4 text-sm">{service.description}</p>

                      {/* Book Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(service);
                        }}
                        className="bg-white text-foreground hover:bg-white/90 font-semibold w-full"
                        size="lg"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Book in 60 Seconds
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Recent Activity Feed */}
          {filteredServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Someone in {currentActivity.zip} just booked {currentActivity.service}
                  </span>
                </div>
          </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Satisfaction Guarantee Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-accent text-accent-foreground py-3 px-4 shadow-lg">
        <div className="container-max flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm font-medium">
            Satisfaction Guarantee: If you're not 100% happy, we'll make it right or refund your money.
          </span>
        </div>
      </div>

      {/* Add bottom padding to account for sticky bar */}
      <div className="pb-16" />

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedServiceValue}
        initialZip=""
        customServiceText={selectedServiceValue === "other" ? selectedService : ""}
        initialStep={2}
      />
    </>
  );
};

export default Services;
