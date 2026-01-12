import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleServiceDialog from "@/components/ScheduleServiceDialog";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock,
  CheckCircle,
  Headphones,
  Building,
  Home,
  Wrench,
  Thermometer,
  Printer,
  Users
} from "lucide-react";

const otherServices = [
  {
    icon: Thermometer,
    title: "Smart Thermostat Installation",
    description: "Professional installation of Nest, Ecobee, Honeywell, and other smart thermostats.",
  },
  {
    icon: Printer,
    title: "Printer Setup & Troubleshooting",
    description: "Wireless printer configuration, driver installation, and connectivity issues.",
  },
  {
    icon: Home,
    title: "Smart Home Integration",
    description: "Connect and configure smart devices, hubs, and voice assistants.",
  },
  {
    icon: Building,
    title: "Business IT Solutions",
    description: "Network infrastructure, server setup, and enterprise technology consulting.",
  },
  {
    icon: Wrench,
    title: "General Handyman Services",
    description: "Minor home repairs, mounting, and installation services.",
  },
  {
    icon: Users,
    title: "Custom Tech Projects",
    description: "Have a unique tech need? We'll work with you to find a solution.",
  },
];

const ContactSales = () => {
  return (
    <>
      <SEO 
        title="Contact Sales - Other Services | Deals Of Quality"
        description="Contact our sales team for custom tech solutions, business IT services, smart home integration, and other technology needs. Call (818) 584-7389"
        keywords="tech support, custom services, business IT, smart home, thermostat installation, printer setup, contact sales"
      />

      <Header />

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <Headphones className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground text-sm font-medium">
                We're Here to Help
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in-up lg:text-4xl">
              Contact Sales for <span className="text-accent">Other Services</span>
            </h1>

            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100 text-sm">
              Don't see what you're looking for? Our team can help with custom tech solutions, 
              business services, and specialized installations. Get in touch today!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-200">
              <ScheduleServiceDialog
                triggerText="Schedule a Service"
                triggerVariant="hero"
                triggerSize="heroLg"
                defaultCategory="Other Services"
              />
              <Button variant="heroOutline" size="heroLg" asChild>
                <a href="tel:+18185847389" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (818) 584-7389
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Free Consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Custom Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in <span className="text-accent">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your preferred way to contact our sales team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a 
              href="tel:+18185847389"
              className="bg-card border border-border rounded-xl p-8 text-center card-hover group"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-accent font-semibold text-lg mb-2">(818) 584-7389</p>
              <p className="text-muted-foreground text-sm">Available 7 days a week</p>
            </a>

            <Link 
              to="/contact"
              className="bg-card border border-border rounded-xl p-8 text-center card-hover group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Contact Us</h3>
              <p className="text-accent font-semibold mb-2">Send us a message</p>
              <p className="text-muted-foreground text-sm">We respond within 24 hours</p>
            </Link>

            <ScheduleServiceDialog
              triggerText=""
              triggerVariant="default"
              defaultCategory="Other Services"
            >
              <div className="bg-card border border-border rounded-xl p-8 text-center card-hover group cursor-pointer">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">Request Quote</h3>
                <p className="text-accent font-semibold mb-2">Online Form</p>
                <p className="text-muted-foreground text-sm">Get a free estimate</p>
              </div>
            </ScheduleServiceDialog>
          </div>
        </div>
      </section>

      {/* Other Services We Offer */}
      <section className="section-padding bg-secondary/30">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Other Services <span className="text-accent">We Offer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              In addition to our main services, we provide these specialized solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 card-hover"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-accent" />
                <h3 className="font-display text-2xl font-bold text-foreground">Business Hours</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground font-medium">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground font-medium">Sunday</span>
                  <span className="text-muted-foreground">10:00 AM - 5:00 PM</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  <strong className="text-foreground">Note:</strong> For urgent tech issues, 
                  same-day service may be available. Call us to check availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
              No matter your tech needs, our team is ready to help. Call us today for a free consultation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ScheduleServiceDialog
                triggerText="Get Support Now"
                triggerVariant="hero"
                triggerSize="heroLg"
                defaultCategory="Other Services"
              />
              <Button variant="heroOutline" size="heroLg" asChild>
                <a href="tel:+18185847389" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (818) 584-7389
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactSales;
