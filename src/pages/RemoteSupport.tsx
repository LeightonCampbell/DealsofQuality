import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Monitor, Shield, Clock, CheckCircle, Headphones, MousePointer, Users } from "lucide-react";

const DOWNLOAD_LINK = "https://my.splashtop.com/team_deployment/download/KHHWJ5L7RXHJ";

const RemoteSupportPage = () => {
  const steps = [
    {
      number: "1",
      title: "Download the App",
      description: "Click the download button to get the Splashtop SOS app for your device.",
      icon: Download,
    },
    {
      number: "2",
      title: "Run the Application",
      description: "Open the downloaded file and run the application. No installation required.",
      icon: MousePointer,
    },
    {
      number: "3",
      title: "Share Your Code",
      description: "The app will display a 9-digit code. Share this code with your technician.",
      icon: Users,
    },
    {
      number: "4",
      title: "Get Support",
      description: "Your technician will connect securely and resolve your issue while you watch.",
      icon: Headphones,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Connection",
      description: "256-bit AES encryption ensures your data and privacy are protected throughout the session.",
    },
    {
      icon: Monitor,
      title: "Full Visibility",
      description: "Watch everything your technician does on screen. You're always in control.",
    },
    {
      icon: Clock,
      title: "Fast Resolution",
      description: "No waiting for a home visit. Get help in minutes from anywhere.",
    },
  ];

  return (
    <>
      <SEO 
        title="Remote Support | Get Instant Tech Help | Deals Of Quality"
        description="Get instant remote tech support from Deals Of Quality. Download our secure remote support app and let our pros help you resolve computer issues fast."
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 section-padding">
          <div className="container-max">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                <Headphones className="w-4 h-4" />
                Instant Remote Assistance
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Remote Support
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Get expert tech help from the comfort of your home. Our certified pros can securely connect to your computer and resolve issues in real-time.
              </p>
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href={DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Download Remote Support App
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Compatible with Windows and Mac
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-muted/30">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Getting remote support is quick and easy. Follow these simple steps:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <Card key={step.number} className="relative border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container-max">
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary/5">
          <div className="container-max">
            <Card className="border-primary/20 bg-card">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to Get Help?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Download the remote support app and call us at{" "}
                  <a href="tel:+18185847389" className="text-accent font-semibold hover:underline">
                    (818) 584-7389
                  </a>{" "}
                  to start your session.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg" asChild>
                    <a href={DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5 mr-2" />
                      Download Now
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg" asChild>
                    <a href="tel:+18185847389">
                      <Headphones className="w-5 h-5 mr-2" />
                      Call for Support
                    </a>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      No installation required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Secure encrypted connection
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Works on Windows & Mac
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RemoteSupportPage;