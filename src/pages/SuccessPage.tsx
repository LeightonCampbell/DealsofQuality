import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Search, Phone, Shield, Check } from "lucide-react";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("service") || "Service";
  const zipCode = searchParams.get("zip") || "";

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
          content="Your service request has been received. We're finding the perfect professional for your project."
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
                Request Received! We're on it.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in-up animation-delay-100">
                Hang tight. We're finding the perfect Pro for your project{zipCode && ` in ${zipCode}`}.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container-max px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 relative">
                <TimelineStep
                  step={1}
                  icon={CheckCircle2}
                  title="Request Submitted"
                  status="completed"
                />
                <TimelineStep
                  step={2}
                  icon={Search}
                  title="Matching with The Right Pro"
                  subtitle="You are being matched with a highly-rated specialist nearby."
                  status="active"
                />
                <TimelineStep
                  step={3}
                  icon={Phone}
                  title="Pro Connects with You"
                  subtitle="Expect a call or text within 15–30 minutes to confirm details."
                  status="pending"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Safety Card */}
        <section className="py-12">
          <div className="container-max px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">
                    Your Safety & Peace of Mind Are Our Priority
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        100% Background-Checked Pros
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Every technician entering your home has passed a rigorous criminal and professional background check. No exceptions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Licensed, Insured & Vetted
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We verify all necessary trade licenses and insurance policies so you are fully protected against any liability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        The "Deals of Quality" Happiness Guarantee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        If you're not 100% satisfied with the work, we'll step in to make it right or refund your money. The job isn't done until you're happy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* While You Wait Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container-max px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Preparing for Your Pro
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Clear the Workspace
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ensure the area around the project is accessible and free of clutter or breakables.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Secure Your Pets
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For the safety of your technician and your pets, please keep them in a separate room during the visit.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Note Your Questions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Write down any specific concerns or questions you have so you can discuss them directly with your Pro.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer & Support Section */}
        <section className="py-16">
          <div className="container-max px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground">
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

export default SuccessPage;

