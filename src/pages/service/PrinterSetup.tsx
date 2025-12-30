import ServicePage from "@/components/ServicePage";
import { Printer } from "lucide-react";

const PrinterSetup = () => (
  <ServicePage
    title="Printer Setup"
    metaTitle="Printer Setup | Wireless Printing | Deals Of Quality"
    metaDescription="Professional printer setup. Wireless printing from all your devices."
    metaKeywords="printer setup, wireless printer, printer installation, print setup"
    rating={4.7}
    reviewCount={345}
    price="$69"
    icon={Printer}
    category="Computers & Printers"
    includedServices={[
      "Unbox and set up printer",
      "Connect to WiFi network",
      "Install drivers on devices",
      "Configure print settings",
      "Test printing from all devices"
    ]}
    faqs={[
      { question: "Can you set up wireless printing?", answer: "Yes, we configure wireless printing from computers, phones, and tablets." },
      { question: "Do you set up scanning too?", answer: "Yes, we configure all printer functions including scanning and copying." }
    ]}
  />
);

export default PrinterSetup;
