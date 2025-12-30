import ServicePage from "@/components/ServicePage";
import { Cable } from "lucide-react";

const TVCableConcealment = () => (
  <ServicePage
    title="TV Wire In-Wall Concealment"
    metaTitle="TV Cable Concealment | In-Wall Wire Hiding | Deals Of Quality"
    metaDescription="Professional in-wall cable concealment for mounted TVs. Clean, code-compliant installation. Same-day service available."
    metaKeywords="cable concealment, hide TV wires, in-wall cable, wire management"
    rating={4.9}
    reviewCount={645}
    price="$149"
    icon={Cable}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Cut access holes in drywall",
      "Run cables through wall cavity",
      "Install low-voltage cable plates",
      "Patch and finish openings",
      "Clean installation area"
    ]}
    faqs={[
      { question: "Is in-wall cable concealment code compliant?", answer: "Yes, we use proper low-voltage rated cables and boxes that meet building codes." },
      { question: "Can you conceal power cables too?", answer: "Power cables require a special in-wall power kit for code compliance, which we can install at an additional cost." }
    ]}
  />
);

export default TVCableConcealment;
