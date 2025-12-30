import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleServiceDialog from "@/components/ScheduleServiceDialog";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What's your service guarantee?",
        answer: "We stand behind our work 100%. If you're not completely satisfied, we'll return to fix any issues at no additional charge. Our workmanship is guaranteed for at least 90 days, and we offer extended warranties as needed.",
      },
      {
        question: "Are your technicians certified and insured?",
        answer: "Yes! All our technicians are fully certified, background-checked, and insured. They undergo continuous training to stay current with the latest technology and installation best practices.",
      },
      {
        question: "How quickly can you schedule service?",
        answer: "We offer same-day service for most requests when you call before noon. For non-urgent appointments, we typically can schedule within 24-48 hours. Weekend appointments are also available.",
      },
      {
        question: "What are your rates/pricing structure?",
        answer: "We provide upfront, transparent pricing before any work begins. Basic installations start at $79, and we offer free estimates for larger projects. There are never any hidden fees or surprise charges.",
      },
    ]
  },
  {
    category: "Remote Support",
    questions: [
      {
        question: "What types of devices can you support remotely?",
        answer: "We offer remote support for PCs, Macs, laptops, tablets, printers, routers, and most smart home devices. Whether you're troubleshooting software or need help setting up your tech, we've got you covered.",
      },
      {
        question: "How do remote support sessions work?",
        answer: "After booking a session, we'll send you a secure link to connect with one of our technicians. You'll be able to see everything we do on your screen, and you can end the session at any time. It's fast, safe, and convenient.",
      },
    ]
  },
  {
    category: "Smart Home",
    questions: [
      {
        question: "What smart home brands do you work with?",
        answer: "We support a wide range of smart home products, including Ring, Nest, Google Home, Amazon Alexa, Arlo, SmartThings, and more. If you're unsure about compatibility, just ask—we'll help you find the right setup.",
      },
      {
        question: "Can you integrate multiple smart home systems?",
        answer: "Absolutely! We specialize in creating unified smart home experiences. We can connect devices from different brands and set up automation routines that work seamlessly together.",
      },
    ]
  },
  {
    category: "Business Services",
    questions: [
      {
        question: "Can you help with both residential and business tech needs?",
        answer: "Absolutely! Deals of Quality provides tailored tech support for both home users and businesses. From setting up home Wi-Fi to securing office networks, we deliver scalable, reliable solutions.",
      },
      {
        question: "Do you offer ongoing support contracts for businesses?",
        answer: "Yes, we offer flexible support contracts for businesses of all sizes. Contact us to discuss your specific needs and we'll create a customized support plan that fits your budget.",
      },
    ]
  },
];

const FAQs = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Deals Of Quality</title>
        <meta
          name="description"
          content="Find answers to common questions about our tech support services, pricing, scheduling, and more. Get the information you need before booking your service."
        />
        <meta name="keywords" content="FAQ, frequently asked questions, tech support questions, service guarantee, pricing, scheduling" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Everything you need to know about our services. Can't find an answer? Contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12 last:mb-0">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${sectionIndex}-${index}`}
                      className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
              Our team is here to help. Contact us directly and we'll get you the answers you need.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ScheduleServiceDialog
                triggerText="Schedule a Service"
                triggerVariant="hero"
                triggerSize="heroLg"
              />
              <Button variant="heroOutline" size="heroLg" asChild>
                <a href="tel:+18185847389" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (818) 584-7389
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQs;
