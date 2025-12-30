import ServicePage from "@/components/ServicePage";
import { Wind } from "lucide-react";

const HVAC = () => (
  <ServicePage
    title="HVAC Services"
    metaTitle="HVAC Services | Heating & Cooling | Deals Of Quality"
    metaDescription="Professional HVAC services including installation, repair, and maintenance. Keep your home comfortable year-round with expert heating and cooling solutions."
    metaKeywords="HVAC services, heating and cooling, AC repair, furnace repair, HVAC installation, air conditioning"
    price="$99"
    priceNote="service call"
    icon={Wind}
    category="Home Services"
    includedServices={[
      "AC installation and repair",
      "Furnace installation and repair",
      "HVAC system maintenance",
      "Ductwork installation and repair",
      "Thermostat installation",
      "Air quality services",
      "Emergency HVAC service"
    ]}
    faqs={[
      { question: "Do you service all HVAC brands?", answer: "Yes, we service all major HVAC brands and systems including central air, heat pumps, and furnaces." },
      { question: "How often should I have my HVAC serviced?", answer: "We recommend annual maintenance in the spring for cooling systems and fall for heating systems to ensure optimal performance." },
      { question: "Do you offer 24/7 emergency service?", answer: "Yes, we offer emergency HVAC service for urgent heating and cooling issues that need immediate attention." }
    ]}
  />
);

export default HVAC;
