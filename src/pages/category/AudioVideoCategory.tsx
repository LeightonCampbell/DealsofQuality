import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Speaker, Film, Play, Gamepad2 } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Home Theater",
    href: "/home-theater",
    benefit: "Cinema-quality entertainment in your home. Professional installation of projectors, screens, and audio systems."
  },
  {
    icon: Speaker,
    title: "Surround Sound",
    href: "/surround-sound",
    benefit: "Immersive audio experience with perfectly positioned speakers. Transform your space into a premium entertainment zone."
  },
  {
    icon: Play,
    title: "Streaming Setup",
    href: "/streaming-setup",
    benefit: "Access all your favorite content seamlessly. Expert configuration of streaming devices and smart TV apps."
  },
  {
    icon: Gamepad2,
    title: "Gaming Console Setup",
    href: "/gaming-setup",
    benefit: "Optimize your gaming experience. Professional setup for consoles, displays, and audio for the ultimate gaming setup."
  },
];

const AudioVideoCategory = () => {
  return (
    <>
      <SEO 
        title="Audio & Video | Home Entertainment Services | Deals Of Quality"
        description="Professional audio and video installation. Home theater, surround sound, streaming setup, and gaming console configuration. Same-day service available."
        keywords="home theater, surround sound, streaming setup, gaming console, audio installation"
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Audio & Video
              </h1>
              <p className="text-muted-foreground text-lg">
                Create the ultimate entertainment experience. From home theaters to streaming setups, we've got you covered.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Speaker className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our Audio & Video Services
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

export default AudioVideoCategory;
