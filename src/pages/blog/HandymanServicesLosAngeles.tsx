import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Wrench,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  FileCheck,
} from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

const HandymanServicesLosAngeles = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [initialService, setInitialService] = useState("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Vetted Handyman Services Los Angeles: Your Guide to Stress-Free Home Repairs",
    description: "Finding vetted handyman services in Los Angeles. Why pre-qualified pros matter, what services they offer, and how Deals of Quality LLC keeps you safe and compliant.",
    author: { "@type": "Organization", name: "Deals Of Quality" },
    publisher: { "@type": "Organization", name: "Deals Of Quality" },
    datePublished: "2026-01-31",
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://dealsofquality.com/blog/handyman-services-los-angeles" },
  };

  return (
    <>
      <SEO
        title="Vetted Handyman Services Los Angeles | Stress-Free Home Repairs | Deals Of Quality"
        description="Vetted handyman services in Los Angeles. Pre-qualified pros for Beverly Hills to Silver Lake. TV mounting, smart home, carpentry, fixtures. The Deals of Quality touch."
        keywords="vetted handyman Los Angeles, handyman services LA, pre-qualified handyman, home repairs Los Angeles, Deals of Quality, TV mounting LA, smart home installation"
        ogType="article"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-background to-secondary/30 py-14 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--accent)/0.15),transparent)]" />
          <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-foreground">Handyman Services Los Angeles</span>
              </nav>

              <div className="flex items-center gap-3 mb-5">
                <span className="bg-amber-500/15 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5" />
                  Los Angeles
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>January 2026</span>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Vetted Handyman Services{" "}
                <span className="text-accent">Los Angeles</span>: Your Guide to Stress-Free Home Repairs
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Finding vetted handyman services in Los Angeles is the ultimate shortcut for homeowners who value their time as much as their property. In a city where "fly-by-night" contractors are common, choosing a service that pre-qualifies its professionals is the only way to ensure your home remains a sanctuary, not a project site.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto bg-cta hover:bg-cta/90"
                  onClick={() => { setInitialService("handyman"); setIsQuoteModalOpen(true); }}
                >
                  Get a Free Quote
                </Button>
                <a href="tel:8185847389">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    (818) 584-7389
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whether you are in Beverly Hills needing precise carpentry or Silver Lake looking for a creative lighting install, a vetted handyman provides the missing link between a "to-do" list and a "done" list.
                </p>

                {/* Why Vetted Matters */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-4 flex items-center gap-2">
                  <Shield className="w-7 h-7 text-accent" />
                  Why "Vetted" Matters in the LA Market
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Unlike standard marketplaces, Deals of Quality LLC focuses on a procurement model that prioritizes safety and skill.
                </p>
                <Card className="mb-6 border-accent/20">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">The $1,000 Rule</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        While California law allows unlicensed handymen to perform work under $1,000, we ensure our network understands the strict boundaries of what requires a specialized license (like major electrical or plumbing rerouting) to keep you compliant and safe.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">White-Glove Standards</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Our pros don't just "fix things"—they respect your space, use floor protection, and provide clear communication from start to finish.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* What Services */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-4 flex items-center gap-2">
                  <Wrench className="w-7 h-7 text-accent" />
                  What Services Do Vetted Handymen in Los Angeles Offer?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A truly vetted professional in Los Angeles offers a specialized range of skills designed for high-end residential needs. Their versatility allows them to bridge the gap between minor repairs and major remodeling preparations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4 font-medium text-foreground">
                  Core services include:
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Precision TV Mounting: High-end wall mounting with full wire concealment (our personal specialty!).",
                    "Smart Home Integration: Installing security cameras, smart thermostats, and ring doorbells.",
                    "Finish Carpentry: Crown molding, custom shelving, and cabinetry touch-ups.",
                    "Fixture Upgrades: Swapping designer lighting and high-end plumbing fixtures.",
                    "Drywall & Paint: Seamless repairs that make holes from old mounting or leaks disappear.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Plumber image */}
                <figure className="my-12">
                  <img
                    src="/handyman-kitchen-sink.png"
                    alt="A vetted handyman working on plumbing under a kitchen sink in Los Angeles"
                    className="w-full rounded-2xl shadow-lg object-cover"
                  />
                  <figcaption className="text-sm text-muted-foreground mt-3 text-center">
                    A vetted handyman working on plumbing under a kitchen sink in Los Angeles
                  </figcaption>
                </figure>

                {/* Benefits of Local */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-4 flex items-center gap-2">
                  <MapPin className="w-7 h-7 text-accent" />
                  The Benefits of Local, Prequalified Expertise
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Choosing vetted handyman services in Los Angeles means hiring someone who understands the local landscape. From the unique architecture of Hollywood Hills homes to the specific climate needs of Santa Monica beach properties, local experts bring context that national apps simply can't match.
                </p>
                <Card className="bg-accent/5 border-accent/20 mb-10">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-0">
                      <strong className="text-foreground">Note:</strong> By using a pre-qualified lead service, you bypass the "quote-hunting" phase and go straight to a professional who has already been cleared for quality and reliability.
                    </p>
                  </CardContent>
                </Card>

                {/* How to Evaluate */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-14 mb-4 flex items-center gap-2">
                  <FileCheck className="w-7 h-7 text-accent" />
                  How to Evaluate and Choose the Right LA Handyman
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Don't settle for the first name on a search engine. To get the "Deals of Quality" experience, look for these three pillars:
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Verified Insurance: Ensure the pro carries liability insurance to protect your Los Angeles investment.",
                    "Specialization: If you need a 85-inch TV mounted above a marble fireplace, don't hire a generalist; hire a mounting specialist.",
                    "Transparent Estimates: A quality pro provides a detailed breakdown of labor and materials before the tools come out.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Conclusion */}
                <Card className="bg-accent/5 border-accent/20 my-14">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Conclusion: Elevate Your Home Maintenance
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Selecting the right handyman in Los Angeles shouldn't be a chore. By focusing on vetted handyman services, you aren't just paying for a repair; you're investing in peace of mind. Whether it's a quick fix in Culver City or a weekend project in Sherman Oaks, your home deserves the "Deals of Quality" touch.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 text-white" style={{ backgroundColor: "#04548C" }}>
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready for Vetted Handyman Service in LA?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Skip the quote-hunting. Get a pre-qualified pro—the Deals of Quality touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white border-0"
                  onClick={() => { setInitialService("handyman"); setIsQuoteModalOpen(true); }}
                >
                  Get a Free Quote
                </Button>
                <a href="tel:8185847389">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call (818) 584-7389
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                Related Services in Los Angeles
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  to="/handyman-services"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Wrench className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Handyman Services
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
                <Link
                  to="/plumbing"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Wrench className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Plumbing
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
                <Link
                  to="/electrical"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Wrench className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Electrical
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={initialService}
        mode="quote"
      />

      <Footer />
    </>
  );
};

export default HandymanServicesLosAngeles;
