import { Truck, Shield, Headphones, CreditCard, RefreshCw, Award } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over GH₵500 worldwide",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment with SSL encryption",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team available round the clock",
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    description: "Flexible payment plans with 0% interest",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Hassle-free returns within 30 days",
  },
  {
    icon: Award,
    title: "Best Quality",
    description: "Premium products from top brands only",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative Line */}
          <div className="w-16 h-1 bg-[#FCA331] mx-auto mb-6 rounded-full"></div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We provide exceptional services to make your shopping experience seamless and enjoyable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-gray-50/50 hover:bg-gray-100/80 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 mx-auto items-center justify-center mb-6 text-[#FCA331] group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-12 w-12" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3 leading-tight">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
