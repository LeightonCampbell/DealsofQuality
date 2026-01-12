import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tv, Monitor, Cable, Speaker, Wrench } from "lucide-react";

const services = [
  {
    icon: Tv,
    title: "TV Dismount or Remount",
    href: "/tv-dismount-remount",
    benefit: "Safely relocate your TV to a new location. Professional dismounting and remounting with proper wall protection."
  },
  {
    icon: Monitor,
    title: "TV Mounting (Up to 50\")",
    href: "/tv-mounting-up-to-50",
    benefit: "Perfect viewing angles for smaller TVs. Secure wall mounting that maximizes space and enhances your viewing experience."
  },
  {
    icon: Tv,
    title: "TV Mounting (51\"-65\")",
    href: "/tv-mounting-51-to-65",
    benefit: "Professional installation for medium-sized TVs. Optimal height and angle for comfortable viewing in any room."
  },
  {
    icon: Tv,
    title: "TV Mounting (Over 65\")",
    href: "/tv-mounting-over-65",
    benefit: "Secure mounting for large TVs. Heavy-duty installation ensuring safety and stability for your premium display."
  },
  {
    icon: Cable,
    title: "TV Wire In-Wall Concealment",
    href: "/tv-cable-concealment",
    benefit: "Clean, professional cable management. Hide unsightly wires for a polished, modern look that enhances your space."
  },
  {
    icon: Speaker,
    title: "Soundbar Installation",
    href: "/soundbar-installation",
    benefit: "Enhanced audio experience with proper soundbar placement. Perfect positioning for optimal sound quality."
  },
];

const TVMountingCategory = () => {
  return (
    <>
      <SEO 
        title="TV Mounting | Professional Installation Services | Deals Of Quality"
        description="Expert TV mounting services for all TV sizes. Wall mounting, cable concealment, soundbar installation. Same-day service available. Call (818) 584-7389"
        keywords="TV mounting, TV wall mount, TV installation, cable concealment, soundbar installation"
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                TV Mounting
              </h1>
              <p className="text-muted-foreground text-lg">
                Professional TV installation for any size screen. Clean cable management and optimal viewing angles guaranteed.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Tv className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Our TV Mounting Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default TVMountingCategory;
