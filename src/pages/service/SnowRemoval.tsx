import ServicePage from "@/components/ServicePage";
import { Snowflake } from "lucide-react";

const SnowRemoval = () => (
  <ServicePage
    title="Snow Removal Services"
    metaTitle="Snow Removal | Driveway & Walkway Clearing | Deals Of Quality"
    metaDescription="Professional snow removal services. Driveway and walkway clearing, salting, and ice management. Reliable service for safe access to your home."
    metaKeywords="snow removal, snow plowing, driveway clearing, walkway clearing, ice removal, snow service"
    price="$49"
    priceNote="per visit"
    icon={Snowflake}
    category="Home Services"
    includedServices={[
      "Driveway snow removal",
      "Walkway and sidewalk clearing",
      "Ice treatment and salting",
      "Snow shoveling",
      "Emergency snow removal",
      "Seasonal contracts available",
      "Priority service options"
    ]}
    faqs={[
      { question: "Do you offer seasonal contracts?", answer: "Yes, we offer seasonal snow removal contracts with priority service and predictable pricing." },
      { question: "How quickly can you clear snow?", answer: "We provide timely service, typically clearing snow within hours of accumulation based on your service level." },
      { question: "What areas do you service?", answer: "We service residential driveways, walkways, and sidewalks in our service area. Contact us to confirm availability in your location." }
    ]}
  />
);

export default SnowRemoval;
