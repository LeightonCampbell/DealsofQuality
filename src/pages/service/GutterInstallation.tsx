import ServicePage from "@/components/ServicePage";
import { Droplet } from "lucide-react";

const GutterInstallation = () => (
  <ServicePage
    title="Gutter Installation and Repair"
    metaTitle="Gutter Installation & Repair | Seamless Gutters | Deals Of Quality"
    metaDescription="Professional gutter installation and repair services. Protect your home from water damage with quality gutters and proper drainage."
    metaKeywords="gutter installation, gutter repair, seamless gutters, gutter replacement, gutter cleaning"
    price="$299"
    priceNote="starting at"
    icon={Droplet}
    category="Home Services"
    includedServices={[
      "Gutter installation",
      "Gutter repair and replacement",
      "Gutter guard installation",
      "Downspout installation",
      "Gutter cleaning",
      "Leaf guard systems",
      "Proper slope and drainage"
    ]}
    faqs={[
      { question: "How often should gutters be cleaned?", answer: "We recommend cleaning gutters 2-3 times per year, or more frequently if you have many trees nearby." },
      { question: "What are seamless gutters?", answer: "Seamless gutters are custom-fitted on-site with fewer seams, reducing leaks and maintenance needs." },
      { question: "Do you install gutter guards?", answer: "Yes, we install various gutter guard systems to reduce maintenance and prevent clogs." }
    ]}
  />
);

export default GutterInstallation;
