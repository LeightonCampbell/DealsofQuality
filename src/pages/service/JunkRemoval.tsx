import ServicePage from "@/components/ServicePage";
import { Trash2 } from "lucide-react";

const JunkRemoval = () => (
  <ServicePage
    title="Junk Removal Services"
    metaTitle="Junk Removal | Furniture, Appliances, Debris | Deals Of Quality"
    metaDescription="Professional junk removal services. Furniture, appliances, construction debris, and more. Quick, efficient removal with responsible disposal."
    metaKeywords="junk removal, trash removal, furniture removal, appliance removal, debris removal"
    price="$149"
    priceNote="starting at"
    icon={Trash2}
    category="Home Services"
    includedServices={[
      "Furniture removal",
      "Appliance removal",
      "Construction debris removal",
      "Yard waste removal",
      "Electronic waste disposal",
      "Estate cleanout services",
      "Responsible recycling and disposal"
    ]}
    faqs={[
      { question: "What items do you remove?", answer: "We remove furniture, appliances, mattresses, electronics, construction debris, yard waste, and most household items." },
      { question: "Do you recycle or donate items?", answer: "Yes, we recycle and donate items whenever possible to reduce waste and benefit the community." },
      { question: "How quickly can you remove items?", answer: "We offer same-day and next-day junk removal service depending on availability in your area." }
    ]}
  />
);

export default JunkRemoval;
