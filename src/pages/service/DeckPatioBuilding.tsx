import ServicePage from "@/components/ServicePage";
import { Trees } from "lucide-react";

const DeckPatioBuilding = () => (
  <ServicePage
    title="Deck and Patio Building"
    metaTitle="Deck & Patio Building | Custom Outdoor Spaces | Deals Of Quality"
    metaDescription="Custom deck and patio construction services. Design, build, and finish outdoor living spaces with quality materials and craftsmanship."
    metaKeywords="deck building, patio construction, outdoor deck, patio installation, deck builder"
    price="$1,499"
    priceNote="starting at"
    icon={Trees}
    category="Home Services"
    includedServices={[
      "Custom deck design and construction",
      "Patio installation (pavers, concrete, stone)",
      "Railings and safety features",
      "Stairs and access points",
      "Built-in seating and features",
      "Staining and sealing",
      "Permit assistance"
    ]}
    faqs={[
      { question: "What materials do you work with?", answer: "We build with wood (pressure-treated, cedar, composite), pavers, concrete, natural stone, and composite decking materials." },
      { question: "Do I need permits for a deck or patio?", answer: "Most deck and patio projects require permits. We can help with permit applications and ensure code compliance." },
      { question: "How long does deck/patio construction take?", answer: "Construction time varies by size and complexity. A typical deck takes 3-5 days, while patios may take 2-4 days." }
    ]}
  />
);

export default DeckPatioBuilding;
