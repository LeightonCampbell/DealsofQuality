import ServicePage from "@/components/ServicePage";
import { Refrigerator } from "lucide-react";

const ApplianceRepair = () => (
  <ServicePage
    title="Appliance Repair"
    metaTitle="Appliance Repair | Refrigerator, Washer, Dryer, Oven | Deals Of Quality"
    metaDescription="Expert appliance repair services for all major brands. Refrigerators, washers, dryers, ovens, dishwashers, and more. Same-day service available."
    metaKeywords="appliance repair, refrigerator repair, washer repair, dryer repair, oven repair, dishwasher repair"
    price="$79"
    priceNote="service call"
    icon={Refrigerator}
    category="Home Services"
    includedServices={[
      "Refrigerator repair",
      "Washer and dryer repair",
      "Oven and range repair",
      "Dishwasher repair",
      "Microwave repair",
      "Garbage disposal repair",
      "All major appliance brands"
    ]}
    faqs={[
      { question: "What appliance brands do you service?", answer: "We service all major appliance brands including Whirlpool, GE, Samsung, LG, Maytag, KitchenAid, and more." },
      { question: "Do you offer same-day service?", answer: "Yes, we offer same-day and next-day appliance repair service depending on availability." },
      { question: "Can you repair commercial appliances?", answer: "Yes, we service both residential and commercial appliances." }
    ]}
  />
);

export default ApplianceRepair;
