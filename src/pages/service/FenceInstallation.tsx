import ServicePage from "@/components/ServicePage";
import { Fence } from "lucide-react";

const FenceInstallation = () => (
  <ServicePage
    title="Fence Installation and Repair"
    metaTitle="Fence Installation & Repair | Privacy & Security Fences | Deals Of Quality"
    metaDescription="Professional fence installation and repair services. Wood, vinyl, chain-link, and aluminum fences for privacy and security."
    metaKeywords="fence installation, fence repair, privacy fence, wood fence, vinyl fence, chain link fence"
    price="$599"
    priceNote="starting at"
    icon={Fence}
    category="Home Services"
    includedServices={[
      "Fence design and planning",
      "Post hole digging and setting",
      "Fence panel installation",
      "Gate installation and hardware",
      "Fence repair and replacement",
      "Staining and maintenance",
      "Permit assistance"
    ]}
    faqs={[
      { question: "What types of fences do you install?", answer: "We install wood, vinyl, chain-link, aluminum, and composite fences in various styles and heights." },
      { question: "How long does fence installation take?", answer: "A typical residential fence installation takes 1-3 days depending on length and terrain." },
      { question: "Do you handle fence permits?", answer: "Yes, we can help with permit applications and ensure your fence meets local codes and regulations." }
    ]}
  />
);

export default FenceInstallation;
