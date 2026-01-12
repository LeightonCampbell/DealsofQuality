import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, Globe, Headphones, Server, Wrench } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design",
    href: "/website-design",
    benefit: "Professional websites that convert visitors into customers. Modern, responsive design that grows your business online."
  },
  {
    icon: Headphones,
    title: "Remote Support",
    href: "/remote-support-service",
    benefit: "Get instant tech support without leaving your office. Fast, secure remote assistance for all your IT needs."
  },
  {
    icon: Server,
    title: "Business IT Solutions",
    href: "/business-it-solutions",
    benefit: "Comprehensive IT infrastructure for your business. Scalable solutions that support growth and improve efficiency."
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    href: "/custom-solutions",
    benefit: "Tailored technology solutions designed for your unique business needs. Expert consultation and implementation."
  },
];

const BusinessCategory = () => {
  return (
    <>
      <SEO 
        title="Business Services | IT Solutions & Support | Deals Of Quality"
        description="Professional business IT services. Website design, remote support, business IT solutions, and custom tech services. Same-day service available."
        keywords="business IT, website design, remote support, IT solutions, tech services"
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Business Services
              </h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive tech solutions for businesses of all sizes. From websites to IT infrastructure, we've got you covered.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our Business Services
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

export default BusinessCategory;
