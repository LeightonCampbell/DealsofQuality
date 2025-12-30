import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
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
    question: "What types of devices can you support remotely?",
    answer: "We offer remote support for PCs, Macs, laptops, tablets, printers, routers, and most smart home devices. Whether you're troubleshooting software or need help setting up your tech, we've got you covered.",
  },
  {
    question: "Can you help with both residential and business tech needs?",
    answer: "Absolutely! Deals of Quality provides tailored tech support for both home users and businesses. From setting up home Wi-Fi to securing office networks, we deliver scalable, reliable solutions.",
  },
  {
    question: "What smart home brands do you work with?",
    answer: "We support a wide range of smart home products, including Ring, Nest, Google Home, Amazon Alexa, Arlo, SmartThings, and more. If you're unsure about compatibility, just ask—we'll help you find the right setup.",
  },
  {
    question: "What are your rates/pricing structure?",
    answer: "We provide upfront, transparent pricing before any work begins. Basic installations start at $79, and we offer free estimates for larger projects. There are never any hidden fees or surprise charges.",
  },
  {
    question: "How do remote support sessions work?",
    answer: "After booking a session, we'll send you a secure link to connect with one of our technicians. You'll be able to see everything we do on your screen, and you can end the session at any time. It's fast, safe, and convenient.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
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
      </div>
    </section>
  );
};

export default FAQ;
