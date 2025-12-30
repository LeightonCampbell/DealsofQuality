import ServicePage from "@/components/ServicePage";
import { Globe } from "lucide-react";

const WebsiteDesign = () => (
  <ServicePage
    title="Website Design"
    metaTitle="Website Design | Small Business Websites | Deals Of Quality"
    metaDescription="Professional website design for small businesses. Modern, responsive websites."
    metaKeywords="website design, small business website, web development, responsive design"
    rating={4.9}
    reviewCount={178}
    price="$499"
    priceNote="starting price"
    icon={Globe}
    category="Business Services"
    includedServices={[
      "Custom website design",
      "Mobile-responsive layout",
      "SEO optimization",
      "Contact forms setup",
      "Training on updates"
    ]}
    faqs={[
      { question: "How long does a website take?", answer: "A basic business website typically takes 1-2 weeks to design and launch." },
      { question: "Do you provide hosting?", answer: "We can recommend hosting solutions and help you set up and maintain your site." }
    ]}
  />
);

export default WebsiteDesign;
