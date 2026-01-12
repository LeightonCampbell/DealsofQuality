import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  const popularServices = [
    { label: "TV Mounting", href: "/services/tv-mounting" },
    { label: "Smart Home", href: "/services/smart-home" },
    { label: "Plumbing", href: "/plumbing" },
    { label: "Electrical", href: "/electrical" },
    { label: "HVAC", href: "/hvac" },
    { label: "Handyman Services", href: "/handyman-services" },
  ];

  return (
    <>
      <SEO 
        title="Page Not Found | Deals Of Quality"
        description="The page you're looking for doesn't exist. Return to our homepage or browse our services."
        noIndex={true}
      />
      <main className="min-h-screen bg-background">
        <Header />
        
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container-max px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Premium 404 Design */}
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-8 animate-fade-in">
                  <span className="text-5xl md:text-6xl font-display font-bold text-primary">404</span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up animation-delay-100">
                  Oops! We can't find that page.
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                  The page you're looking for might have been moved, deleted, or doesn't exist. 
                  Let's get you back on track.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="mb-16 animate-fade-in-up animation-delay-300">
                <Button
                  asChild
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Return to Homepage
                  </Link>
                </Button>
              </div>

              {/* Popular Services */}
              <div className="animate-fade-in-up animation-delay-400">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  Popular Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {popularServices.map((service) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      className="group relative p-4 rounded-lg border border-border bg-card hover:border-accent hover:shadow-md transition-all duration-300 text-center"
                    >
                      <span className="text-foreground group-hover:text-accent font-medium transition-colors">
                        {service.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Additional Help */}
              <div className="mt-16 pt-12 border-t border-border animate-fade-in-up animation-delay-500">
                <p className="text-muted-foreground mb-4">
                  Need help finding what you're looking for?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/services">Browse All Services</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default NotFound;
