import ServicePage from "@/components/ServicePage";
import { Sparkles } from "lucide-react";

const HolidayLightingInstallation = () => (
  <ServicePage
    title="Holiday Lighting Installation"
    metaTitle="Holiday Lighting Installation | Christmas Lights | Deals Of Quality"
    metaDescription="Professional holiday lighting installation and removal. Beautiful, safe holiday light displays for Christmas and all seasons. Installation and takedown service."
    metaKeywords="holiday lighting, christmas lights installation, holiday light installation, christmas light service, holiday decor installation"
    price="$199"
    priceNote="starting at"
    icon={Sparkles}
    category="Outdoor Services"
    includedServices={[
      "Christmas light installation",
      "Holiday light removal and storage",
      "LED lighting installation",
      "Roof and gutter light installation",
      "Tree and shrub lighting",
      "Timer and automation setup",
      "Light maintenance and repair"
    ]}
    faqs={[
      { question: "When should I schedule holiday light installation?", answer: "We recommend scheduling 2-4 weeks before your desired display date. Popular time slots fill up quickly, especially in November and December." },
      { question: "Do you provide the lights or do I?", answer: "You can provide your own lights, or we can supply professional-grade LED lights. We handle all installation and setup regardless." },
      { question: "Do you also remove the lights after the holidays?", answer: "Yes, we offer complete service including professional removal, storage, and maintenance of your holiday lights for next year." }
    ]}
  />
);

export default HolidayLightingInstallation;
