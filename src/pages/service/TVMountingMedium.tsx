import ServicePage from "@/components/ServicePage";
import { Tv } from "lucide-react";

const TVMountingMedium = () => (
  <ServicePage
    title='TV Mounting (51"-65")'
    metaTitle="TV Mounting 51-65 Inch | Professional Installation | Deals Of Quality"
    metaDescription="Professional TV wall mounting for TVs 51 to 65 inches. Secure installation, cable management, optimal viewing angles. Same-day service available."
    metaKeywords="TV mounting, 55 inch TV mount, 65 inch TV mount, TV wall mount, TV installation"
    price="$120"
    icon={Tv}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Mount TV on wall (51\"-65\")",
      "Level and secure mounting bracket",
      "Connect to existing power and cables",
      "Premium cable management",
      "Test and demonstrate features"
    ]}
    faqs={[
      { question: "What wall types can you mount on?", answer: "We mount on drywall, concrete, brick, and stone walls. Our technicians come prepared with the right hardware for any surface." },
      { question: "Do I need to provide the mount?", answer: "You can provide your own mount or we can recommend and install one for you at an additional cost." },
      { question: "Do medium-large TVs require special mounts?", answer: "TVs in this size range typically require sturdier mounts. We can provide these at an additional cost if needed." }
    ]}
  />
);

export default TVMountingMedium;