import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Tv, 
  Phone, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Shield,
  Wrench,
  ArrowRight,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScheduleServiceDialog from "@/components/ScheduleServiceDialog";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

const TVMountingLosAngeles = () => {
  const [isTVQuoteModalOpen, setIsTVQuoteModalOpen] = useState(false);
  const [tvQuoteInitialService, setTVQuoteInitialService] = useState("");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "TV Mounting Services Los Angeles",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Deals Of Quality",
      "telephone": "(818) 584-7389",
      "areaServed": {
        "@type": "City",
        "name": "Los Angeles",
        "containedInPlace": {
          "@type": "State",
          "name": "California"
        }
      }
    },
    "serviceType": "TV Wall Mounting",
    "description": "Professional TV mounting services in Los Angeles. Same-day installation, cable concealment, and expert mounting for all TV sizes."
  };

  return (
    <>
      <SEO 
        title="TV Mounting Services Los Angeles | Same-Day Installation | Deals Of Quality"
        description="Professional TV mounting in Los Angeles. From $95 for any TV size. Same-day service, hidden cables, all wall types. Call (818) 584-7389 for a free quote."
        keywords="TV mounting Los Angeles, TV installation LA, wall mount TV Los Angeles, TV mounting service near me, professional TV mounting LA"
        ogType="article"
        jsonLd={jsonLd}
      />

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/50 to-background py-12 md:py-16">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-foreground">TV Mounting Los Angeles</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  Service Area
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Updated January 2026</span>
                </div>
              </div>

              {/* H1 - City + Service */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Professional TV Mounting Services in{" "}
                <span className="text-accent">Los Angeles</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Get your new TV on the wall today. Expert installation with hidden cables, 
                perfect positioning, and a satisfaction guarantee. Serving all LA neighborhoods.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto bg-cta hover:bg-cta/90"
                  onClick={() => { setTVQuoteInitialService(""); setIsTVQuoteModalOpen(true); }}
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

        {/* The Hook - Acknowledge DIY Frustration */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Tired of Staring at Your New TV Still in the Box?
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  We get it. You just bought that beautiful 65" Samsung or LG, and now it's sitting 
                  in your living room, still wrapped in cardboard. You've watched a few YouTube 
                  tutorials, realized you need a stud finder, the right drill bit, and somehow 
                  those "easy" mounting brackets look like an engineering puzzle.
                </p>
                
                <Card className="bg-destructive/5 border-destructive/20 my-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-destructive" />
                      The DIY Nightmare We See Every Week:
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
                        <span>Crooked TVs that drive you crazy every time you watch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
                        <span>Holes drilled in the wrong spots (hello, drywall patches)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
                        <span>Cables dangling like spaghetti down the wall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">✗</span>
                        <span>That sinking feeling when your $1,500 TV isn't secure</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <p>
                  <strong className="text-foreground">Skip the stress.</strong> Our Los Angeles 
                  TV mounting pros handle everything—finding studs, securing the mount, hiding 
                  every cable, and making sure your TV is perfectly level. Most jobs are done 
                  in under 2 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Transparent TV Mounting Prices in Los Angeles
                </h2>
                <p className="text-muted-foreground">
                  No hidden fees. No surprises. Just honest pricing.
                </p>
              </div>

              <Card className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-accent/10">
                      <TableHead className="font-semibold text-foreground">TV Size</TableHead>
                      <TableHead className="font-semibold text-foreground">Basic Mount</TableHead>
                      <TableHead className="font-semibold text-foreground">With Cable Concealment</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">Get a Free Quote</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Tv className="w-4 h-4 text-accent" />
                          Up to 55&quot;
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground font-semibold">$95</TableCell>
                      <TableCell className="text-foreground font-semibold">$145</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setTVQuoteInitialService('TV Wall Mounting - Standard (up to 55")'); setIsTVQuoteModalOpen(true); }}
                        >
                          Get a Free Quote
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-accent/5">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Tv className="w-5 h-5 text-accent" />
                          56&quot; - 65&quot;
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground font-semibold">$120</TableCell>
                      <TableCell className="text-foreground font-semibold">$175</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setTVQuoteInitialService('TV Wall Mounting - Large (56" - 75")'); setIsTVQuoteModalOpen(true); }}
                        >
                          Get a Free Quote
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Tv className="w-6 h-6 text-accent" />
                          66&quot; - 85&quot;
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground font-semibold">$180</TableCell>
                      <TableCell className="text-foreground font-semibold">$250</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setTVQuoteInitialService('TV Wall Mounting - Extra Large (76"+)'); setIsTVQuoteModalOpen(true); }}
                        >
                          Get a Free Quote
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                * Prices are estimates. Final quote based on wall type and mount complexity. 
                Fireplace and brick installations may vary.
              </p>
            </div>
          </div>
        </section>

        {/* Local Trust - LA Neighborhoods */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-accent" />
                Serving All Los Angeles Neighborhoods
              </h2>

              <p className="text-muted-foreground mb-6">
                Whether you're in a high-rise in Downtown LA or a family home in the Valley, 
                our techs know your area. We've mounted thousands of TVs across Los Angeles County.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  "Hollywood",
                  "Beverly Hills",
                  "Santa Monica",
                  "Pasadena",
                  "Burbank",
                  "Glendale",
                  "West Hollywood",
                  "Silver Lake",
                  "Echo Park",
                  "Los Feliz",
                  "Studio City",
                  "Sherman Oaks",
                  "Encino",
                  "Brentwood",
                  "Venice",
                  "Culver City"
                ].map((neighborhood) => (
                  <div 
                    key={neighborhood}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{neighborhood}</span>
                  </div>
                ))}
              </div>

              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <Clock className="w-10 h-10 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Same-Day Service Available</h3>
                    <p className="text-muted-foreground text-sm">
                      Call before 2 PM, and we can often mount your TV the same day. 
                      Evening and weekend appointments available.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Expertise - Wall Types */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Wrench className="w-8 h-8 text-accent" />
                We Handle Every Wall Type
              </h2>

              <p className="text-muted-foreground mb-8">
                LA homes are unique—from 1920s Spanish bungalows with plaster walls to 
                modern condos with concrete. Our techs come prepared for anything.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Drywall Installation</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      The most common wall type. We locate studs precisely and use 
                      heavy-duty lag bolts for secure mounting. No stud? We use 
                      specialized toggle anchors rated for your TV's weight.
                    </p>
                    <div className="text-accent font-medium text-sm">
                      ✓ Standard in most homes
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Brick & Concrete</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Common in older LA homes and lofts. We use masonry bits and 
                      concrete anchors designed for heavy loads. The mount will be 
                      rock-solid.
                    </p>
                    <div className="text-accent font-medium text-sm">
                      ✓ Lofts, industrial spaces, fireplaces
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Plaster Walls</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Found in classic LA homes. Plaster requires special care—we 
                      drill slowly to prevent cracking and use appropriate fasteners 
                      for the lath beneath.
                    </p>
                    <div className="text-accent font-medium text-sm">
                      ✓ Craftsman, Spanish Revival homes
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">Above Fireplace</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      A popular spot, but tricky. We assess the mantle material, 
                      ensure proper heat clearance, and often recommend a tilting 
                      mount for better viewing angles.
                    </p>
                    <div className="text-accent font-medium text-sm">
                      ✓ Stone, brick, or drywall surrounds
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section - Blue Logo Color #04548C */}
        <section className="py-16 md:py-20 text-white" style={{ backgroundColor: '#04548C' }}>
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Your TV on the Wall?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Book your TV mounting today and enjoy your new setup by tonight.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white border-0"
                  onClick={() => { setTVQuoteInitialService(""); setIsTVQuoteModalOpen(true); }}
                >
                  Book Your Installation
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

              <p className="text-sm text-white/80">
                Same-day appointments available • Free quotes • Satisfaction guaranteed
              </p>
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
                  to="/tv-cable-concealment"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Tv className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Cable Concealment
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>

                <Link 
                  to="/soundbar-installation"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Tv className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Soundbar Setup
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>

                <Link 
                  to="/home-theater"
                  className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Tv className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Home Theater
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
        isOpen={isTVQuoteModalOpen}
        onClose={() => setIsTVQuoteModalOpen(false)}
        initialService={tvQuoteInitialService}
        mode="quote"
        isTVMountingQuote
      />

      <Footer />
    </>
  );
};

export default TVMountingLosAngeles;
