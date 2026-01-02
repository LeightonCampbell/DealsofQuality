import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import HeroNew from "@/components/HeroNew";
import TrustRibbon from "@/components/TrustRibbon";
import ServiceGrid from "@/components/ServiceGrid";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import VerifiedReviews from "@/components/VerifiedReviews";
import FAQ from "@/components/FAQ";
import TipsUpdates from "@/components/TipsUpdates";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileBookingFooter from "@/components/MobileBookingFooter";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Premium Home Services | Hire Vetted Local Professionals | Deals Of Quality</title>
        <meta
          name="description"
          content="Premium home services with hand-picked pros ready today. From smart home installs to emergency repairs, get expert help with upfront pricing and our 100% Satisfaction Guarantee. Same-day service available."
        />
        <meta name="keywords" content="home services, local professionals, plumbing, electrical, HVAC, remodeling, handyman, house cleaning, TV mounting, smart home installation, premium home services" />
      </Helmet>
      <main className="min-h-screen">
        <Header />
        <HeroNew />
        <TrustRibbon />
        <ServiceGrid />
        <Process />
        <WhyChooseUs />
        <VerifiedReviews />
        <FAQ />
        <TipsUpdates />
        <CTA />
        <Footer />
        <MobileBookingFooter />
      </main>
    </>
  );
};

export default Index;
