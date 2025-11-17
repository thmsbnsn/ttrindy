import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Flame, CloudRain, Hammer, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Droplets,
    title: "Water Damage Restoration",
    description: "Expert water damage restoration services available 24/7 for emergencies.",
    features: [
      "Emergency water extraction",
      "Structural drying & dehumidification",
      "Mold prevention & remediation",
      "Insurance claim assistance",
      "Complete restoration services"
    ],
    image: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=800&auto=format&fit=crop"
  },
  {
    icon: Flame,
    title: "Fire Damage Restoration",
    description: "Comprehensive fire and smoke damage restoration to bring your property back to life.",
    features: [
      "Smoke & soot removal",
      "Odor elimination",
      "Structural repairs",
      "Content cleaning & restoration",
      "Board-up & security services"
    ],
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop"
  },
  {
    icon: CloudRain,
    title: "Storm Damage Repair",
    description: "Fast response to storm damage including roof repairs and structural restoration.",
    features: [
      "Emergency tarping services",
      "Roof & structural repairs",
      "Window & door replacement",
      "Debris removal",
      "Full property restoration"
    ],
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop"
  },
  {
    icon: Hammer,
    title: "Complete Remodeling",
    description: "Transform your space with our professional remodeling services.",
    features: [
      "Kitchen & bathroom remodels",
      "Basement finishing",
      "Custom carpentry",
      "Flooring installation",
      "Complete home renovations"
    ],
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&auto=format&fit=crop"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional restoration and remodeling services to restore and enhance your property
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={isEven ? "md:order-1" : "md:order-2"}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                    />
                  </div>
                  
                  <Card className={`${isEven ? "md:order-2" : "md:order-1"} border-2`}>
                    <CardHeader>
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        Get a Free Quote
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-primary/5 rounded-lg p-8 md:p-12 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Emergency Service?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're available 24/7 for emergency restoration services. Don't wait - contact us now for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Call Now: (555) 123-4567
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
