import ServicePage from "@/components/ServicePage";
import { Tv } from "lucide-react";

const TVDismountRemount = () => (
  <ServicePage
    title="TV Dismount or Remount"
    metaTitle="TV Dismount & Remount | Professional Service | Deals Of Quality"
    metaDescription="Professional TV dismount and remount services. Moving your TV to a new location or taking it down safely."
    metaKeywords="TV dismount, TV remount, move TV, relocate TV"
    rating={4.7}
    reviewCount={328}
    price="$79"
    icon={Tv}
    category="TV Mounting & Home Theater"
    includedServices={[
      "Safely remove TV from wall",
      "Remove or relocate mounting bracket",
      "Patch mounting holes if needed",
      "Remount in new location",
      "Reconnect all cables"
    ]}
    faqs={[
      { question: "Can you patch the old mount holes?", answer: "We can do basic patching. For finished drywall repair and painting, we recommend a handyman service." },
      { question: "Do you move the TV to a different room?", answer: "Yes, we can remount your TV anywhere in your home as part of this service." }
    ]}
  />
);

export default TVDismountRemount;
