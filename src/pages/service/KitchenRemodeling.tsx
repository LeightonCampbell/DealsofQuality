import ServicePage from "@/components/ServicePage";
import { ChefHat } from "lucide-react";

const KitchenRemodeling = () => (
  <ServicePage
    title="Kitchen Remodeling"
    metaTitle="Kitchen Remodeling | Complete Kitchen Renovation | Deals Of Quality"
    metaDescription="Complete kitchen remodeling services. Cabinets, countertops, appliances, flooring, and more. Transform your kitchen with expert craftsmanship."
    metaKeywords="kitchen remodeling, kitchen renovation, kitchen remodel, kitchen cabinets, kitchen design"
    price="$4,999"
    priceNote="starting at"
    icon={ChefHat}
    category="Home Services"
    includedServices={[
      "Kitchen design and planning",
      "Cabinet installation",
      "Countertop installation",
      "Appliance installation",
      "Plumbing and electrical work",
      "Flooring and backsplash",
      "Paint and finishing"
    ]}
    faqs={[
      { question: "How long does a kitchen remodel take?", answer: "A full kitchen remodel typically takes 4-8 weeks depending on scope, custom orders, and permit processing." },
      { question: "Do you work with kitchen designers?", answer: "Yes, we collaborate with designers or can provide design recommendations based on your style and budget." },
      { question: "Can I stay in my home during the remodel?", answer: "Yes, we work to minimize disruption. You'll have access to other areas of your home, though some temporary inconveniences are expected." }
    ]}
  />
);

export default KitchenRemodeling;
