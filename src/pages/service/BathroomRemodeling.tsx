import ServicePage from "@/components/ServicePage";
import { Droplet } from "lucide-react";

const BathroomRemodeling = () => (
  <ServicePage
    title="Bathroom Remodeling"
    metaTitle="Bathroom Remodeling | Complete Renovation Services | Deals Of Quality"
    metaDescription="Complete bathroom remodeling services. Design, plumbing, tile, fixtures, and finishing. Transform your bathroom with professional craftsmanship."
    metaKeywords="bathroom remodeling, bathroom renovation, bathroom remodel, bathroom design, bathroom contractor"
    price="$2,999"
    priceNote="starting at"
    icon={Droplet}
    category="Home Services"
    includedServices={[
      "Bathroom design and planning",
      "Plumbing and electrical work",
      "Tile and flooring installation",
      "Vanity and cabinet installation",
      "Fixture installation",
      "Paint and finishing touches",
      "Cleanup and final inspection"
    ]}
    faqs={[
      { question: "How long does a bathroom remodel take?", answer: "A full bathroom remodel typically takes 2-3 weeks depending on scope and material availability." },
      { question: "Do you handle permits?", answer: "Yes, we handle all necessary permits for plumbing, electrical, and structural work." },
      { question: "Can you work with my design ideas?", answer: "Absolutely! We work with your vision and can provide design recommendations to achieve your goals within budget." }
    ]}
  />
);

export default BathroomRemodeling;
