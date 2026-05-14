import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "Amazing selection and the delivery was super fast! My new laptop exceeded all expectations. The customer service team was incredibly helpful.",
    name: "Sarah Johnson",
    designation: "Software Developer",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    quote:
      "Best prices I've found anywhere. The product quality is outstanding and the warranty support gave me peace of mind. Highly recommended!",
    name: "Michael Chen",
    designation: "Graphic Designer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    quote:
      "Tech Zone has become my go-to store for all tech purchases. The website is easy to use and the checkout process is seamless.",
    name: "Emily Williams",
    designation: "Business Analyst",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    quote:
      "I've been a loyal customer for 3 years now. Every purchase has been smooth and the products are always genuine and well-packaged.",
    name: "David Martinez",
    designation: "Content Creator",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-1 bg-[#FCA331] mx-auto mb-6 rounded-full"></div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted by thousands of happy customers worldwide
          </p>
        </div>

        {/* Circular Testimonials */}
        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#14213D",
              designation: "#6b7280",
              testimony: "#4b5563",
              arrowBackground: "#FCA331",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#14213D",
            }}
            fontSizes={{
              name: "1.5rem",
              designation: "0.925rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </div>
    </section>
  );
};
