import { ClipboardCheck, ShieldCheck, MapPin, BarChart3, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "The 5-Point Vetting Rigor",
    description:
      "Every pro in our network undergoes a manual background check and license verification. If they wouldn't work in our homes, they won't work in yours.",
  },
  {
    icon: ShieldCheck,
    title: "California Compliance Checked",
    description:
      "We verify CSLB (Contractors State License Board) status and active insurance policies for every specialist, from HVAC to TV mounting.",
    badge: "Licensed & Insured",
    badgeIcon: BadgeCheck,
  },
  {
    icon: MapPin,
    title: "Local Accountability",
    description:
      "We focus exclusively on the LA area. We know the local building codes in Pasadena and the permit requirements in Santa Monica.",
  },
  {
    icon: BarChart3,
    title: "Performance Monitored",
    description:
      "We continuously track customer satisfaction. Our pros stay in the network based on their current quality, not their past reputation.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-max px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-[35px] font-bold text-foreground mb-4">
            Why Los Angeles Trusts Deals of Quality
          </h2>
          <p className="text-xl text-accent font-semibold mb-4">
            We don't just find pros; we curate excellence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            In a city of millions, finding a contractor you can actually trust shouldn't be a gamble. We do the heavy lifting before they ever step foot in your home.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const BadgeIcon = feature.badgeIcon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Title + optional badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  {feature.badge && BadgeIcon && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      {feature.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
