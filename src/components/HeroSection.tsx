import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import laptop1 from "@/assets/laptop-1.jpg";
import laptop4 from "@/assets/laptop-4.jpg";

const heroImages = [laptop1, laptop4];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Tech Zone Hero"
            className={`h-full w-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative py-20 md:py-32 lg:py-40">
        <div className="max-w-xl space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur">
            <Zap className="h-4 w-4" />
            <span>Up to 40% Off on Selected Items</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Stay Ahead With{" "}
            <span className="text-accent">Latest</span>{" "}
            Technology
          </h1>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Discover the newest laptops and innovative gadgets that keep you ahead. 
            Premium quality, competitive prices.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary"
            >
              View Collection
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-sm text-primary-foreground/70">Products</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">50k+</p>
              <p className="text-sm text-primary-foreground/70">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">24/7</p>
              <p className="text-sm text-primary-foreground/70">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
