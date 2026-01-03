import { useState, useEffect, useRef, useCallback } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "In just 4 hours, we managed to install 3 TVs and set up new Wi-Fi in our new office. The pro was professional and knew exactly what he was doing.",
    author: "Mark L.",
    rating: 5,
    service: "TV Mounting & WiFi Setup",
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
  {
    quote: "The smart home installation was seamless! They set up my entire home automation system including thermostats, door locks, and security cameras. Everything works perfectly and I can control it all from my phone.",
    author: "Sarah M.",
    rating: 5,
    service: "Smart Home Installation",
    verified: true,
  },
  {
    quote: "Absolutely incredible home theater setup! The surround sound system they installed makes every movie feel like a theater experience. Professional installation and excellent customer service throughout.",
    author: "David Chen",
    rating: 5,
    service: "Home Theater Setup",
    verified: true,
  },
  {
    quote: "I feel so much safer now with the security cameras installed. The technician was knowledgeable, respectful of my home, and explained everything clearly. The system works flawlessly!",
    author: "Patricia G.",
    rating: 5,
    service: "Security Camera Installation",
    verified: true,
  },
  {
    quote: "My computer was running so slow I thought I needed a new one. They fixed it completely - removed viruses, optimized performance, and even upgraded my RAM. It's like a brand new computer now!",
    author: "Robert T.",
    rating: 5,
    service: "Computer Repair",
    verified: true,
  },
  {
    quote: "Had a plumbing emergency on a Sunday evening and they sent someone out within an hour! The plumber was professional, fixed the issue quickly, and the price was fair. Couldn't ask for better service.",
    author: "Jennifer Lopez",
    rating: 5,
    service: "Plumbing Emergency",
    verified: true,
  },
];

const VerifiedReviews = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerView = isMobile ? 1 : 3;
  const scrollDuration = 4000; // 4 seconds per testimonial

  // Auto-scroll function
  const scrollToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Start auto-scroll
  useEffect(() => {
    if (!isPaused && !isHovered && !isTapped) {
      scrollIntervalRef.current = setInterval(scrollToNext, scrollDuration);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isPaused, isHovered, isTapped, scrollToNext]);

  // Handle hover (desktop)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle tap (mobile)
  const handleTouchStart = () => {
    setIsTapped(true);
  };

  const handleTouchEnd = () => {
    // Resume after a delay on mobile
    setTimeout(() => {
      setIsTapped(false);
    }, 2000);
  };

  // Manual navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStartEvent = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    handleTouchStart();
  };

  const handleTouchEndEvent = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    
    // Handle swipe
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (distance > minSwipeDistance) {
        // Swipe left - go to next
        goToNext();
      } else if (distance < -minSwipeDistance) {
        // Swipe right - go to previous
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    handleTouchEnd();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Calculate transform for smooth scrolling
  const getTransform = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`;
    }
    // For desktop, show 3 at a time - each slide is 33.333% wide (accounting for padding)
    // We need to calculate based on the actual width including padding
    const slideWidth = 100 / itemsPerView; // 33.333%
    const offset = currentIndex * slideWidth;
    return `translateX(-${offset}%)`;
  };

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

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStartEvent}
          onTouchEnd={handleTouchEndEvent}
          role="region"
          aria-label="Customer testimonials carousel"
        >
          {/* Carousel Wrapper */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: getTransform(),
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.author}-${index}`}
                  className="min-w-full md:min-w-[calc(33.333%-0.5rem)] px-2 flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <article
                    className="bg-card rounded-2xl border border-border p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 h-full"
                  >
                    {/* Header with Service Tag */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {/* Stars */}
                        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-cta fill-cta"
                              aria-hidden="true"
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
                            <BadgeCheck className="w-4 h-4 text-success" aria-label="Verified customer" />
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Verified Customer
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (visible on hover) */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 backdrop-blur-sm"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 backdrop-blur-sm"
              onClick={goToNext}
              aria-label="Next testimonial"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Pause/Play Button (for accessibility) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 opacity-0 focus:opacity-100 z-10"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Resume auto-scrolling" : "Pause auto-scrolling"}
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4" />
                <span className="sr-only">Resume auto-scrolling</span>
              </>
            ) : (
              <>
                <Pause className="h-4 w-4" />
                <span className="sr-only">Pause auto-scrolling</span>
              </>
            )}
          </Button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
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
