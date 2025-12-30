import ServicePage from "@/components/ServicePage";
import { ShieldAlert } from "lucide-react";

const VirusRemoval = () => (
  <ServicePage
    title="Virus & Malware Removal"
    metaTitle="Virus Removal | Malware Cleanup | Deals Of Quality"
    metaDescription="Professional virus and malware removal. Protect your computer and data."
    metaKeywords="virus removal, malware, spyware, computer security, antivirus"
    rating={4.9}
    reviewCount={567}
    price="$99"
    icon={ShieldAlert}
    category="Computers & Printers"
    includedServices={[
      "Scan for viruses and malware",
      "Remove all threats",
      "Clean browser infections",
      "Install antivirus protection",
      "Optimize system performance"
    ]}
    faqs={[
      { question: "Will I lose my files?", answer: "No, we carefully remove malware while preserving your personal files." },
      { question: "Can you prevent future infections?", answer: "Yes, we install protection software and teach you security best practices." }
    ]}
  />
);

export default VirusRemoval;
