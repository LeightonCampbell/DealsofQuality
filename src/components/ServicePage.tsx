import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleServiceDialog from "@/components/ScheduleServiceDialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle, 
  Phone,
  Users,
  Clock,
  BadgeCheck
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServicePageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  rating?: number;
  reviewCount?: number;
  price: string;
  priceNote?: string;
  icon: LucideIcon;
  includedServices: string[];
  faqs: { question: string; answer: string }[];
  category: string;
}

const ServicePage = ({
  title,
  metaTitle,
  metaDescription,
  metaKeywords,
  price,
  priceNote = "+ additional fees",
  icon: Icon,
  includedServices,
  faqs,
  category,
}: ServicePageProps) => {
  const location = useLocation();
  const canonicalUrl = `https://www.dealsofquality.com${location.pathname}`;
  const priceNumber = price.replace(/[^0-9.]/g, "") || "0";

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.dealsofquality.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": title,
            "provider": {
              "@type": "Organization",
              "name": "Deals Of Quality",
              "url": "https://www.dealsofquality.com",
              "telephone": "(818) 584-7389"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "description": metaDescription,
            "offers": {
              "@type": "Offer",
              "price": priceNumber,
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-background">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Icon/Visual Area */}
              <div className="relative">
                <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-secondary/30 rounded-2xl p-16 flex items-center justify-center min-h-[350px] shadow-lg">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl" />
                    <Icon className="w-40 h-40 text-accent relative z-10 drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Right Side - Booking Info */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {title}
                </h1>

                {/* Pricing Card */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 text-accent mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">We Serve Your Area!</span>
                  </div>

                  {/* Standard Price */}
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4 border-2 border-accent">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-accent" />
                      <div>
                        <p className="font-semibold text-foreground">Standard Price</p>
                        <p className="text-lg font-bold text-foreground">{price} <span className="text-sm font-normal text-muted-foreground">{priceNote}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <ScheduleServiceDialog
                    triggerText="Book Now"
                    triggerVariant="cta"
                    triggerSize="lg"
                    triggerClassName="w-full"
                    defaultCategory={category}
                    initialService={title}
                  />
                </div>

                {/* What's Included */}
                <div className="space-y-3">
                  {includedServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-primary py-4">
          <div className="container-max px-4 md:px-8 lg:px-16">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Vetted Professionals Nationwide</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Service as Soon as Today</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Don't Pay Until It's Done</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-background">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                Book your service today and enjoy professional installation with satisfaction guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ScheduleServiceDialog
                  triggerText="Schedule a Service"
                  triggerVariant="hero"
                  initialService={title}
                  triggerSize="heroLg"
                  defaultCategory={category}
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
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;