import { useState, useEffect, useRef, useCallback } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "In just 4 hours, we managed to install 3 TVs and set up new Wi-Fi in our new office. The pro was professional and knew exactly what he was doing.",
    author: "Mark L.",
    location: "Los Angeles, CA",
    rating: 5,
    service: "TV Mounting & WiFi Setup",
    verified: true,
  },
  {
    quote: "Leighton is a brilliant IT problem solver. He is well-versed in all aspects of computer network technology. Highly recommend!",
    author: "John E.",
    location: "Dallas, TX",
    rating: 5,
    service: "Network Setup",
    verified: true,
  },
  {
    quote: "I needed a kitchen faucet installation done quickly before hosting a dinner party. They came same-day, finished in under an hour, and the new faucet works perfectly. Worth every penny!",
    author: "Michael R.",
    location: "Chicago, IL",
    rating: 5,
    service: "Plumbing Services",
    verified: true,
  },
  {
    quote: "Our bathroom remodel turned out amazing! The team was professional, cleaned up every day, and finished on time. The new tile work and fixtures look incredible.",
    author: "Jessica K.",
    location: "Phoenix, AZ",
    rating: 5,
    service: "Bathroom Remodeling",
    verified: true,
  },
  {
    quote: "Had a leaky pipe that was causing water damage. They came out the same day I called, fixed it properly, and even helped me understand what caused it. Great service!",
    author: "Robert T.",
    location: "Miami, FL",
    rating: 5,
    service: "Plumbing Repair",
    verified: true,
  },
  {
    quote: "The electrician installed new recessed lighting throughout our living room. The work was clean, professional, and they explained everything clearly. Our home looks so much brighter now!",
    author: "Amanda S.",
    location: "Seattle, WA",
    rating: 5,
    service: "Electrical Work",
    verified: true,
  },
  {
    quote: "They mounted our 75-inch TV above the fireplace perfectly. The cables are hidden, everything is level, and they even helped us set up the soundbar. Couldn't be happier!",
    author: "David P.",
    location: "Denver, CO",
    rating: 5,
    service: "TV Mounting",
    verified: true,
  },
  {
    quote: "Our AC stopped working during a heatwave. They had someone here within 2 hours, diagnosed the problem quickly, and got us cool again. Lifesavers!",
    author: "Maria G.",
    location: "Houston, TX",
    rating: 5,
    service: "HVAC Repair",
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
      // Don't interfere if user is typing in an input, textarea, or select
      const target = e.target as HTMLElement;
      const isInputElement = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;
      
      // Only handle keyboard shortcuts if NOT in an input field
      if (!isInputElement) {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Calculate transform for smooth scrolling
  const getTransform = () => {
    if (isMobile) {
      // Mobile: show 1 testimonial at a time, fully visible
      return `translateX(-${currentIndex * 100}%)`;
    }
    // Desktop: show 3 testimonials at once, with current centered
    // With gap-8 (32px), each item is approximately 33.333% wide
    // The gap adds spacing, so we approximate the slide distance
    // For a 1400px container: item = ~445px, gap = 32px, total = ~477px per slide
    // That's about 34% of container width per slide
    // Simplified: use ~34% per slide to account for gap
    if (currentIndex === 0) {
      return `translateX(0)`;
    }
    // Each slide moves by approximately one item width + gap
    // Approximate: 34% per slide (accounts for item width ~33.3% + gap ~0.7%)
    const slideWidthPercent = 34;
    const offset = (currentIndex - 1) * slideWidthPercent;
    return `translateX(-${offset}%)`;
  };

  return (
    <section className="section-padding bg-[#f8f9fa]">
      <div className="container-max max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-3">
            Trusted by Thousands of Homeowners
          </h2>
          <p className="text-lg text-[#6b7280] font-normal">
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
          <div className="overflow-hidden w-full">
          <div
              ref={carouselRef}
              className="flex w-full gap-8 will-change-transform"
              style={{
                transform: getTransform(),
                transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {testimonials.map((testimonial, index) => {
                // On desktop: show 3 testimonials (prev, current, next) with current centered
                // On mobile: show only the current testimonial
                const isCenter = !isMobile && index === currentIndex;
                
                // Generate avatar gradient class based on index for variety
                const avatarGradients = [
                  'bg-gradient-to-br from-blue-500 to-blue-600',
                  'bg-gradient-to-br from-orange-500 to-orange-600',
                  'bg-gradient-to-br from-green-500 to-green-600',
                  'bg-gradient-to-br from-purple-500 to-purple-600',
                  'bg-gradient-to-br from-pink-500 to-pink-600',
                  'bg-gradient-to-br from-indigo-500 to-indigo-600',
                  'bg-gradient-to-br from-teal-500 to-teal-600',
                  'bg-gradient-to-br from-cyan-500 to-cyan-600',
                ];
                const avatarClass = avatarGradients[index % avatarGradients.length];
                
                // Calculate visibility and position using transform instead of padding
                const isVisible = isMobile ? index === currentIndex : true;
                
                return (
                <div
                  key={`${testimonial.author}-${index}`}
                  className={`flex-shrink-0 transition-transform duration-500 will-change-transform ${
                    isMobile 
                      ? 'w-full' 
                      : 'flex-[0_0_calc((100%-64px)/3)]'
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    marginLeft: isMobile ? '8px' : undefined,
                    marginRight: isMobile ? '8px' : undefined,
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <article
                    className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full relative ${
                      isCenter 
                        ? 'shadow-lg scale-[1.02] z-10' 
                        : isMobile 
                        ? 'scale-100'
                        : 'scale-100 opacity-90'
                    }`}
                  >
                    {/* Stars - using role="img" to allow aria-label on a presentational grouping */}
                    <div className="flex gap-1 mb-5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {/* Service Tag - Absolutely positioned */}
                    <span className="absolute top-8 right-8 bg-[#e8f3ff] text-[#0066cc] px-3.5 py-1.5 rounded-full text-xs font-medium">
                      {testimonial.service}
                    </span>

                    {/* Quote */}
                    <blockquote className="text-[#374151] text-base leading-[1.7] mb-6 mt-3">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6">
                      <div className={`w-12 h-12 rounded-full ${avatarClass} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-semibold text-lg">
                          {testimonial.author[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#1a1a1a] text-[15px]">
                            {testimonial.author}
                          </span>
                          {testimonial.verified && (
                            <BadgeCheck className="w-4 h-4 text-[#10b981]" aria-label="Verified customer" />
                          )}
                        </div>
                        <span className="text-sm text-[#6b7280] mt-0.5 block">
                          {testimonial.location} • Verified Customer
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              )})}
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
      </div>
    </section>
  );
};

export default VerifiedReviews;
