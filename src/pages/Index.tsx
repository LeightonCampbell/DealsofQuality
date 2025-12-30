import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import TipsUpdates from "@/components/TipsUpdates";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Premium Home Services | Hire Vetted Local Professionals | Deals Of Quality</title>
        <meta
          name="description"
          content="Carefully vetted, local professionals for homeowners who demand quality service. From plumbing and electrical to remodeling and smart home installation. Same-day service available. Call (818) 584-7389"
        />
        <meta name="keywords" content="home services, local professionals, plumbing, electrical, HVAC, remodeling, handyman, house cleaning, TV mounting, smart home installation, premium home services" />
      </Helmet>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <TipsUpdates />
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
