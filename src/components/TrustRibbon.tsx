import { ShieldCheck, FileCheck, DollarSign } from "lucide-react";

const trustItems = [
  {
    icon: FileCheck,
    label: "No-Obligation Quotes",
  },
  {
    icon: ShieldCheck,
    label: "100% Vetted Pros",
  },
  {
    icon: DollarSign,
    label: "$1,000 Happiness Guarantee",
  },
  {
    icon: FileCheck,
    label: "Licensed & Insured",
  },
  {
    icon: DollarSign,
    label: "Upfront Pricing",
  },
];

const TrustRibbon = () => {
  // Duplicate items multiple times for seamless infinite scroll
  const duplicatedItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="py-6 bg-card border-y border-border overflow-hidden">
      <div className="container-max px-4">
        {/* Continuous left-scrolling carousel */}
        <div className="relative">
          <div className="flex items-center gap-8 md:gap-12 lg:gap-16 animate-scroll-left">
            {duplicatedItems.map(({ icon: Icon, label }, index) => (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
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
        </div>
      </div>
    </section>
  );
};

export default TrustRibbon;
