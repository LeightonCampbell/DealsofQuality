import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Privacy Policy | Deals Of Quality</title>
        <meta
          name="description"
          content="Privacy Policy for Deals of Quality. Learn how we collect, use, and protect your personal information."
        />
      </Helmet>

      <Header />

      <main className="flex-1 bg-background">
        <section className="hero-gradient relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max max-w-4xl">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Name, email address, phone number, and physical address</li>
                <li>Service requests and preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communications you send to us</li>
                <li>Information provided when applying to join as a service professional</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Schedule and manage service appointments</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, and promotions</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with service professionals assigned to your job, payment processors to complete transactions, and as required by law or to protect our rights.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p className="mb-6">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Children's Privacy</h2>
              <p className="mb-6">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
              <p className="mb-6">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policy of every website you visit.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at (818) 584-7389 or through our contact page.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
