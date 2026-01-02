import { useState, useEffect } from "react";
import { ShieldCheck, FileCheck, DollarSign, Award } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "100% Background Checked",
  },
  {
    icon: FileCheck,
    label: "Licensed & Insured",
  },
  {
    icon: DollarSign,
    label: "Upfront Pricing",
  },
  {
    icon: Award,
    label: "Happiness Guarantee",
  },
];

const TrustRibbon = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel effect for mobile only
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trustItems.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 bg-card border-y border-border">
      <div className="container-max px-4">
        {/* Desktop: Show all items */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel showing one item at a time */}
        <div className="md:hidden flex items-center justify-center min-h-[60px]">
          <div
            key={currentIndex}
            className="flex items-center gap-3 text-muted-foreground animate-fade-in"
          >
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              {(() => {
                const Icon = trustItems[currentIndex].icon;
                return <Icon className="w-5 h-5 text-success" />;
              })()}
            </div>
            <span className="text-sm font-medium whitespace-nowrap">
              {trustItems[currentIndex].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustRibbon;
