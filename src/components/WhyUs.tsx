import { Shield, Clock, Award, Users } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Rapid Response",
    description: "24/7 emergency service means we're there when you need us most, minimizing damage and starting restoration immediately."
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured professionals you can trust with your most valuable investment—your home."
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Over a decade of expertise in restoration and remodeling, with thousands of satisfied customers across Indianapolis."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We treat every home like our own, providing transparent communication and exceptional service from start to finish."
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose Top Tier?
          </h2>
          <p className="text-lg text-muted-foreground">
            When disaster strikes, you need a restoration partner you can trust. Here's why homeowners choose us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-lg bg-secondary hover:bg-secondary/60 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
