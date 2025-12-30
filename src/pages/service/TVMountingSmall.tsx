import ServicePage from "@/components/ServicePage";
import { Tv } from "lucide-react";

const TVMountingSmall = () => (
  <ServicePage
    title='TV Mounting (Up to 50")'
    metaTitle="TV Mounting up to 50 Inch | Professional Installation | Deals Of Quality"
    metaDescription="Professional TV wall mounting for TVs up to 50 inches. Clean installation, cable management, optimal viewing angles. Same-day service available."
    metaKeywords="TV mounting, 50 inch TV mount, TV wall mount, TV installation"
    price="$95"
    icon={Tv}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Mount TV on wall (up to 50\")",
      "Level and secure mounting bracket",
      "Connect to existing power and cables",
      "Basic cable management",
      "Test and demonstrate features"
    ]}
    faqs={[
      { question: "What wall types can you mount on?", answer: "We mount on drywall, concrete, brick, and stone walls. Our technicians come prepared with the right hardware for any surface." },
      { question: "Do I need to provide the mount?", answer: "You can provide your own mount or we can recommend and install one for you at an additional cost." },
      { question: "How long does installation take?", answer: "Most installations take 30-60 minutes depending on the wall type and cable management needs." }
    ]}
  />
);

export default TVMountingSmall;