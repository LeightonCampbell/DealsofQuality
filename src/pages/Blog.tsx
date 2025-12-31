import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Business Tips & Insights | Deals Of Quality</title>
        <meta
          name="description"
          content="Expert insights on business growth, technology, and local business success. Learn how to grow your business with modern solutions."
        />
        <meta name="keywords" content="business blog, local business tips, website design, business growth, technology insights" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-secondary/30 relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-max px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Business Insights & Tips
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert advice to help your business grow and succeed in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link
              to="/blog/7-reasons-why-your-local-business-needs-modern-website-2026"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>January 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>10 min read</span>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    7 Reasons Why Your Local Business Needs a Modern Website in 2026: Stop Losing Revenue to Outdated Tech
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Is your business website a loyal 24/7 salesperson, or is it an antique storefront scaring away customers? Learn why investing in a modern website is non-negotiable for your future success.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    Read Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/signs-your-computer-needs-professional-support"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>January 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    Signs Your Computer Needs Professional Support
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your computer is trying to tell you something. Learn to recognize the warning signs before a minor issue becomes a major problem—or a complete system failure.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    Read Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/tv-mounting-done-right-why-professional-installation-matters"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>January 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>7 min read</span>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    TV Mounting Done Right: Why Professional Installation Matters
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your new TV is a significant investment. Don't risk damage, injury, or poor viewing experience with a DIY installation. Here's why professional TV mounting is worth every penny.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    Read Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/top-5-mistakes-to-avoid-when-mounting-your-tv"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>January 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>6 min read</span>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    Top 5 Mistakes to Avoid When Mounting Your TV
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Learn from the most common TV mounting mistakes so you can avoid costly damage, safety hazards, and viewing problems. These errors are easier to prevent than to fix.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    Read Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
