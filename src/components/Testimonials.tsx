import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "In just 4 hours, we managed to install 3 TVs and set up new Wi-Fi in our new office. We found the Pro with DoQuality",
    author: "Mark L.",
    rating: 5,
  },
  {
    quote: "DoQuality helped me find the right team to fix my website SEO, now I can actually find my website on Google.",
    author: "Frank R.",
    rating: 5,
  },
  {
    quote: "After struggling with slow Wi-Fi for years, DoQuality came in and fixed everything in one visit. Now I can work from home without any issues!",
    author: "Fernando B.",
    rating: 5,
  },
  {
    quote: "Leighton is a brilliant IT problem solver. He is well-versed in all aspects of computer network technology.",
    author: "John E.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="reviews" className="section-padding bg-secondary">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.author}
              className="bg-card rounded-2xl border border-border p-8 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-cta fill-cta"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Verified Customer
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
