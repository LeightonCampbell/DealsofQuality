import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";
import { serviceCategories } from "@/lib/servicesData";

const Services = () => {

  return (
    <>
      <SEO 
        title="All Services | Premium Home Services | Deals Of Quality"
        description="Browse our comprehensive range of premium home services. From plumbing and electrical to smart home installation. Book in 60 seconds with vetted professionals."
        keywords="home services, plumbing, electrical, HVAC, TV mounting, smart home, handyman, cleaning services"
      />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-10 bg-gradient-to-b from-background to-secondary/30">
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
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Select a service to view more details or book a vetted local pros.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* Main 5 Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {serviceCategories.slice(0, 5).map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="space-y-4 text-center md:text-left"
                >
                  {/* Category Header */}
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>

                  {/* Services List – same structure as ServicesMegaMenu */}
                  <ul className="space-y-3">
                    {category.services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li key={service.id}>
                          <Link
                            to={service.href}
                            className="group flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            <div className="flex flex-col items-center md:items-start">
                              <span className="flex items-center gap-2 font-medium text-foreground group-hover:text-accent">
                                {service.label}
                                {service.badge && (
                                  <span
                                    className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                                      service.badge === "New"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-orange-100 text-orange-700"
                                    }`}
                                  >
                                    {service.badge}
                                  </span>
                                )}
                              </span>
                              {service.description && (
                                <span className="text-xs text-muted-foreground line-clamp-2">
                                  {service.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Computers & Printers and Business Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {serviceCategories.slice(5).map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (5 + categoryIndex) * 0.1 }}
                  className="space-y-4"
                >
                  {/* Category Header */}
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>

                  {/* Services List */}
                  <ul className="space-y-3">
                    {category.services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li key={service.id}>
                          <Link
                            to={service.href}
                            className="group flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            <div className="flex flex-col items-start">
                              <span className="flex items-center gap-2 font-medium text-foreground group-hover:text-accent">
                                {service.label}
                                {service.badge && (
                                  <span
                                    className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                                      service.badge === "New"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-orange-100 text-orange-700"
                                    }`}
                                  >
                                    {service.badge}
                                  </span>
                                )}
                              </span>
                              {service.description && (
                                <span className="text-xs text-muted-foreground line-clamp-2">
                                  {service.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Satisfaction Guarantee Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-accent text-accent-foreground py-3 px-4 shadow-lg">
        <div className="container-max flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">
            Satisfaction Guarantee: If you're not 100% happy, we'll make it right or refund your money.
          </span>
        </div>
      </div>

      {/* Add bottom padding to account for sticky bar */}
      <div className="pb-16" />

      <Footer />
    </>
  );
};

export default Services;
