import ServicePage from "@/components/ServicePage";
import { Wrench } from "lucide-react";

const ComputerRepair = () => (
  <ServicePage
    title="Computer Repair"
    metaTitle="Computer Repair | PC & Mac Service | Deals Of Quality"
    metaDescription="Professional computer repair for PC and Mac. Hardware and software troubleshooting."
    metaKeywords="computer repair, PC repair, Mac repair, laptop repair"
    rating={4.8}
    reviewCount={892}
    price="$99"
    icon={Wrench}
    category="Computers & Printers"
    includedServices={[
      "Diagnose hardware/software issues",
      "Repair or replace components",
      "Clean and optimize system",
      "Test all functionality",
      "Provide recommendations"
    ]}
    faqs={[
      { question: "Do you repair Macs?", answer: "Yes, we service both PC and Mac computers, desktops and laptops." },
      { question: "Can you come to my home?", answer: "Yes, we offer on-site computer repair services." }
    ]}
  />
);

export default ComputerRepair;
