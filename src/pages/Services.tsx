import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck } from "lucide-react";
import { serviceCategories, ServiceItem } from "@/lib/servicesData";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceValue, setSelectedServiceValue] = useState("");

  const handleBookNow = (service: ServiceItem) => {
    // Map service to modal service value
    const serviceMap: Record<string, string> = {
      "handyman": "handyman",
      "plumbing-repair": "plumbing",
      "wifi-networking": "wifi-network",
      "security-cameras": "security",
      "home-theater": "home-theater",
      "tv-mounting": "tv-mounting",
      "smart-lock": "smart-home",
      "smart-thermostats": "smart-home",
      "video-doorbell": "smart-home",
      "light-fixture": "electrical",
      "smoke-detector": "electrical",
    };

    setSelectedService(service.label);
    setSelectedServiceValue(serviceMap[service.id] || "other");
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Your Next Project, Handled | Premium Home Services | Deals Of Quality</title>
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
              Your Next Project, Handled.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              Select a service below to get a quote or to be matched with an excellent pro
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-7xl mx-auto">
          <div className="space-y-16">
            {serviceCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="space-y-8"
                >
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {category.title}
                    </h2>
                  </div>

                  {/* Services Grid - Apple-esque Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (serviceIndex * 0.05) }}
                          className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/30"
                        >
                          {/* Icon */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <Icon className="w-6 h-6 text-accent" />
                            </div>
                            {service.badge && (
                              <span
                                className={`text-xs px-2 py-1 rounded font-semibold ${
                                  service.badge === "New"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {service.badge}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {service.label}
                          </h3>
                          {service.description && (
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {service.description}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="flex items-center justify-end mt-4 pt-4 border-t border-border">
                            <Button
                              onClick={() => handleBookNow(service)}
                              variant="outline"
                              size="sm"
                              className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Book Now
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
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
