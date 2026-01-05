import ServicePage from "@/components/ServicePage";
import { Wind } from "lucide-react";

const ACTuneUp = () => (
  <ServicePage
    title="AC Tune-Up"
    metaTitle="AC Tune-Up Services | HVAC Maintenance | Deals Of Quality"
    metaDescription="Professional AC tune-up and HVAC maintenance services. Keep your air conditioning running efficiently with regular maintenance from certified technicians."
    metaKeywords="AC tune up, HVAC maintenance, air conditioning service, AC service, HVAC tune up"
    price="$149"
    priceNote="starting at"
    icon={Wind}
    category="Home Services"
    includedServices={[
      "AC system inspection and cleaning",
      "Filter replacement",
      "Refrigerant level check and recharge",
      "Thermostat calibration",
      "Ductwork inspection",
      "Energy efficiency optimization",
      "Preventive maintenance checklist"
    ]}
    faqs={[
      { question: "How often should I get an AC tune-up?", answer: "We recommend annual AC tune-ups to maintain efficiency and prevent costly repairs. Spring is the ideal time before peak cooling season." },
      { question: "What's included in an AC tune-up?", answer: "Our tune-up includes inspection, cleaning, filter replacement, refrigerant check, thermostat calibration, and system optimization." },
      { question: "Will a tune-up reduce my energy bills?", answer: "Yes, a properly maintained AC system runs more efficiently, which can reduce energy consumption and lower your monthly bills." }
    ]}
  />
);

export default ACTuneUp;
