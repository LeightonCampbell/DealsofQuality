import { Helmet } from "react-helmet";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Search, FileText, Check, ClipboardList, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuoteSuccess = () => {
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("service") || "Service";

  // Animated Checkmark Component
  const AnimatedCheckmark = () => {
    return (
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-success/10 animate-ping" />
        <div className="relative w-full h-full rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-success animate-scale-in" />
        </div>
      </div>
    );
  };

  // Timeline Step Component
  const TimelineStep = ({ 
    step, 
    icon: Icon, 
    title, 
    subtitle, 
    status 
  }: { 
    step: number; 
    icon: any; 
    title: string; 
    subtitle?: string; 
    status: "completed" | "active" | "pending" 
  }) => {
    return (
      <div className="flex flex-col items-center flex-1 relative">
        {/* Connector Line */}
        {step < 3 && (
          <div className={`hidden md:block absolute top-6 left-[50%] w-full h-0.5 ${
            status === "completed" ? "bg-success" : "bg-border"
          }`} />
        )}
        
        {/* Step Circle */}
        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
          status === "completed" 
            ? "bg-success text-white" 
            : status === "active"
            ? "bg-accent text-white animate-pulse"
            : "bg-muted text-muted-foreground"
        }`}>
          {status === "completed" ? (
            <Check className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        
        {/* Step Content */}
        <div className="mt-4 text-center">
          <h4 className={`font-semibold text-sm mb-1 ${
            status === "active" ? "text-accent" : "text-foreground"
          }`}>
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-muted-foreground max-w-[200px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Request Received | Deals Of Quality</title>
        <meta
          name="description"
          content="Your quote request has been received. We're calculating your personalized estimate."
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container-max px-4">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedCheckmark />
              
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Request Received!
                <br />
                We're preparing your estimate.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in-up animation-delay-100">
                Our team is reviewing your project details. You can expect a personalized quote via email/text in approximately 15 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* What Happens Next Timeline */}
        <section className="py-12 bg-secondary/30">
          <div className="container-max px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                What Happens Next
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative">
                <TimelineStep
                  step={1}
                  icon={ClipboardList}
                  title="Review"
                  subtitle="We analyze your project needs."
                  status="active"
                />
                <TimelineStep
                  step={2}
                  icon={Users}
                  title="Match"
                  subtitle="We find the best-priced Pro."
                  status="pending"
                />
                <TimelineStep
                  step={3}
                  icon={DollarSign}
                  title="Quote"
                  subtitle="You receive a transparent price."
                  status="pending"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-max px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Link to="/">
                <Button size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground">
                  Return to Home
                </Button>
              </Link>
              
              <p className="mt-8 text-muted-foreground">
                Need to make a change?{" "}
                <a 
                  href="tel:8185847389" 
                  className="text-primary hover:underline font-semibold"
                >
                  Call us at (818) 584-7389
                </a>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default QuoteSuccess;
