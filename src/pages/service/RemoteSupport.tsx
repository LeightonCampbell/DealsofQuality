import ServicePage from "@/components/ServicePage";
import { Headphones } from "lucide-react";

const RemoteSupport = () => (
  <ServicePage
    title="Remote Tech Support"
    metaTitle="Remote Tech Support | Online Computer Help | Deals Of Quality"
    metaDescription="Professional remote tech support. Get help without a home visit."
    metaKeywords="remote support, online tech help, virtual support, computer help"
    rating={4.8}
    reviewCount={634}
    price="$49"
    priceNote="per session"
    icon={Headphones}
    category="Business Services"
    includedServices={[
      "Secure remote connection",
      "Diagnose and fix issues",
      "Software installation",
      "Settings configuration",
      "Follow-up support"
    ]}
    faqs={[
      { question: "Is remote support secure?", answer: "Yes, we use encrypted connections and you can see everything we do on screen." },
      { question: "What issues can be fixed remotely?", answer: "Most software issues, settings, and configurations can be resolved remotely." }
    ]}
  />
);

export default RemoteSupport;
