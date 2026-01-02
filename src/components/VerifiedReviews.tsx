import { Star, BadgeCheck, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "In just 4 hours, we managed to install 3 TVs and set up new Wi-Fi in our new office. The pro was professional and knew exactly what he was doing.",
    author: "Mark L.",
    rating: 5,
    service: "TV Mounting & WiFi Setup",
    verified: true,
  },
  {
    quote: "DoQuality helped me find the right team to fix my website SEO. Now I can actually find my website on Google. Huge difference!",
    author: "Frank R.",
    rating: 5,
    service: "Website Design",
    verified: true,
  },
  {
    quote: "After struggling with slow Wi-Fi for years, they came in and fixed everything in one visit. Now I can work from home without any issues!",
    author: "Fernando B.",
    rating: 5,
    service: "WiFi Optimization",
    verified: true,
  },
  {
    quote: "Leighton is a brilliant IT problem solver. He is well-versed in all aspects of computer network technology. Highly recommend!",
    author: "John E.",
    rating: 5,
    service: "Network Setup",
    verified: true,
  },
];

const VerifiedReviews = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BadgeCheck className="w-4 h-4" />
            Verified Reviews
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands of Homeowners
          </h2>
          <p className="text-lg text-muted-foreground">
            Real reviews from verified customers
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.author}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header with Service Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-cta fill-cta"
                      />
                    ))}
                  </div>
                </div>
                {/* Service Tag */}
                <span className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">
                  {testimonial.service}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-base md:text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-foreground">
                      {testimonial.author}
                    </span>
                    {testimonial.verified && (
                      <BadgeCheck className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Verified Customer
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">4.9</div>
              <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Vetted Pros</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedReviews;
