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
        <title>Blog | Tips & Insights | Deals Of Quality</title>
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
              Tips & Insights
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert advice to help you find a quality solution for every service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/blog/7-reasons-why-your-local-business-needs-modern-website-2026"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Jan 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>10 min</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors flex-1">
                    7 Reasons Why Your Local Business Needs a Modern Website in 2026: Stop Losing Revenue to Outdated Tech
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    Is your business website a loyal 24/7 salesperson, or is it an antique storefront scaring away customers? Learn why investing in a modern website is non-negotiable for your future success.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/signs-your-computer-needs-professional-support"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Jan 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8 min</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors flex-1">
                    Signs Your Computer Needs Professional Support
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    Your computer is trying to tell you something. Learn to recognize the warning signs before a minor issue becomes a major problem—or a complete system failure.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/tv-mounting-done-right-why-professional-installation-matters"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Jan 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>7 min</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors flex-1">
                    TV Mounting Done Right: Why Professional Installation Matters
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    Your new TV is a significant investment. Don't risk damage, injury, or poor viewing experience with a DIY installation. Here's why professional TV mounting is worth every penny.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>

            <Link
              to="/blog/top-5-mistakes-to-avoid-when-mounting-your-tv"
              className="group block"
            >
              <article className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Jan 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>6 min</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors flex-1">
                    Top 5 Mistakes to Avoid When Mounting Your TV
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    Learn from the most common TV mounting mistakes so you can avoid costly damage, safety hazards, and viewing problems. These errors are easier to prevent than to fix.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
