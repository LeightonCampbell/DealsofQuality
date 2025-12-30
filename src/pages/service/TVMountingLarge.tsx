import ServicePage from "@/components/ServicePage";
import { Tv } from "lucide-react";

const TVMountingLarge = () => (
  <ServicePage
    title='TV Mounting (Over 65")'
    metaTitle="Large TV Mounting Over 65 Inch | Professional Installation | Deals Of Quality"
    metaDescription="Professional mounting for large TVs over 65 inches. Secure installation, premium cable management. Same-day service available."
    metaKeywords="large TV mounting, 70 inch TV mount, 75 inch TV mount, 85 inch TV mount, big TV installation"
    price="$180"
    icon={Tv}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Mount large TV on wall (over 65\")",
      "Heavy-duty mounting bracket installation",
      "Connect to existing power and cables",
      "Premium cable management",
      "Test and demonstrate features"
    ]}
    faqs={[
      { question: "Can you mount very large TVs?", answer: "Yes, we mount TVs of all sizes including 85\" and larger. Our technicians are trained for heavy installations." },
      { question: "Do large TVs require special mounts?", answer: "Yes, larger TVs require heavy-duty mounts rated for the weight. We can provide these at an additional cost." }
    ]}
  />
);

export default TVMountingLarge;