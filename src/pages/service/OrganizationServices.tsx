import ServicePage from "@/components/ServicePage";
import { Boxes } from "lucide-react";

const OrganizationServices = () => (
  <ServicePage
    title="Organization Services"
    metaTitle="Home Organization Services | Decluttering & Organizing | Deals Of Quality"
    metaDescription="Professional home organization services. Declutter, organize, and maximize your space with expert organizers. Transform your home into an organized sanctuary."
    metaKeywords="home organization, decluttering, home organizer, closet organization, garage organization"
    price="$79"
    priceNote="per hour"
    icon={Boxes}
    category="Home Services"
    includedServices={[
      "Home decluttering",
      "Closet organization",
      "Garage organization",
      "Kitchen organization",
      "Home office setup",
      "Storage solutions",
      "Maintenance plans"
    ]}
    faqs={[
      { question: "How long does organization take?", answer: "Organization time varies by space size and clutter level. Most rooms take 4-8 hours, while whole-home organization may take several days." },
      { question: "Do I need to purchase storage products?", answer: "We can work with items you already have, or recommend and help you purchase appropriate storage solutions." },
      { question: "Will you help me decide what to keep or donate?", answer: "Yes, our organizers can guide you through decision-making while respecting your preferences and attachment to items." }
    ]}
  />
);

export default OrganizationServices;
