import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Monitor, Wrench, ShieldAlert, Printer, HardDrive } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Computer Repair",
    href: "/computer-repair",
  },
  {
    icon: ShieldAlert,
    title: "Virus Removal",
    href: "/virus-removal",
  },
  {
    icon: Printer,
    title: "Printer Setup",
    href: "/printer-setup",
  },
  {
    icon: HardDrive,
    title: "Data Backup",
    href: "/data-backup",
  },
];

const ComputersPrintersCategory = () => {
  return (
    <>
      <Helmet>
        <title>Computers & Printers | Repair & Setup Services | Deals Of Quality</title>
        <meta
          name="description"
          content="Professional computer and printer services. Computer repair, virus removal, printer setup, and data backup solutions. Same-day service available."
        />
        <meta name="keywords" content="computer repair, virus removal, printer setup, data backup, tech support" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Computers & Printers
              </h1>
              <p className="text-muted-foreground text-lg">
                Expert computer repair and printer setup services. We fix, optimize, and protect your devices.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <Monitor className="w-32 h-32 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Select a Service */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Select a service
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group bg-card border border-border rounded-xl p-6 text-center card-hover block"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ComputersPrintersCategory;
