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
  return (
    <section className="py-6 bg-card border-y border-border">
      <div className="container-max px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
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
      </div>
    </section>
  );
};

export default TrustRibbon;
