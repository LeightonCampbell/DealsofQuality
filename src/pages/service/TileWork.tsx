import ServicePage from "@/components/ServicePage";
import { Grid3x3 } from "lucide-react";

const TileWork = () => (
  <ServicePage
    title="Tile Work"
    metaTitle="Tile Installation & Repair | Floor & Wall Tile | Deals Of Quality"
    metaDescription="Professional tile installation for floors, walls, backsplashes, and showers. Expert grouting and sealing services."
    metaKeywords="tile installation, tile repair, floor tile, wall tile, backsplash tile, grouting"
    price="$399"
    priceNote="starting at"
    icon={Grid3x3}
    category="Home Services"
    includedServices={[
      "Floor tile installation",
      "Wall and backsplash tile",
      "Shower and tub surrounds",
      "Tile repair and replacement",
      "Grouting and sealing",
      "Pattern and design layout",
      "Cleanup and protection"
    ]}
    faqs={[
      { question: "What types of tile do you install?", answer: "We install ceramic, porcelain, natural stone, glass, and mosaic tiles for floors, walls, and backsplashes." },
      { question: "Do you handle complex patterns?", answer: "Yes, we can install various tile patterns including herringbone, chevron, and custom designs." },
      { question: "How long does tile work take?", answer: "Tile installation time varies by area size and complexity. A typical bathroom takes 2-3 days including grouting and sealing." }
    ]}
  />
);

export default TileWork;
