import ServicePage from "@/components/ServicePage";
import { Droplets } from "lucide-react";

const PressureWashing = () => (
  <ServicePage
    title="Pressure Washing Services"
    metaTitle="Pressure Washing | Driveway, Siding, Deck Cleaning | Deals Of Quality"
    metaDescription="Professional pressure washing services for driveways, decks, siding, and more. Remove dirt, mold, and stains to restore your property's appearance."
    metaKeywords="pressure washing, power washing, driveway cleaning, deck cleaning, house washing"
    price="$199"
    priceNote="starting at"
    icon={Droplets}
    category="Home Services"
    includedServices={[
      "Driveway and sidewalk cleaning",
      "House siding washing",
      "Deck and patio cleaning",
      "Fence cleaning",
      "Gutter cleaning (exterior)",
      "Pre-paint surface preparation",
      "Eco-friendly cleaning solutions"
    ]}
    faqs={[
      { question: "Will pressure washing damage my siding or deck?", answer: "Our professionals use appropriate pressure settings and techniques to clean effectively without damaging surfaces." },
      { question: "How often should I pressure wash my home?", answer: "We recommend annual pressure washing, or more frequently in areas with high humidity or pollution." },
      { question: "Do you use eco-friendly cleaning solutions?", answer: "Yes, we use eco-friendly cleaning solutions that are safe for your family, pets, and landscaping." }
    ]}
  />
);

export default PressureWashing;
