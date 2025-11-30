import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import { MetaTags } from "@/components/SEO/MetaTags";
import { StructuredData } from "@/components/SEO/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Flame, CloudRain, Hammer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Droplets,
    title: "Water Damage",
    description: "24/7 rapid water extraction, structural drying, mold prevention, sanitation, and full restoration.",
    blogSlug: "water-damage-restoration-indianapolis",
    projectCategory: "Water Damage",
    faqAnchor: "water-damage-faq",
  },
  {
    icon: Flame,
    title: "Fire Damage",
    description: "Smoke & soot removal, odor elimination, structural repairs, and full fire damage reconstruction.",
    blogSlug: "fire-damage-restoration-indianapolis",
    projectCategory: "Fire Damage",
    faqAnchor: "fire-damage-faq",
  },
  {
    icon: CloudRain,
    title: "Storm Damage",
    description: "Emergency tarping, exterior repairs, debris removal, and complete property restoration.",
    blogSlug: "storm-damage-repair-indianapolis",
    projectCategory: "Storm Damage",
    faqAnchor: "storm-damage-faq",
  },
  {
    icon: Hammer,
    title: "Remodeling",
    description: "Professional remodeling services including kitchens, bathrooms, basements, and full-home renovations.",
    blogSlug: "home-remodeling-indianapolis",
    projectCategory: "Remodeling",
    faqAnchor: "remodeling-faq",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Home"
        description="Top Tier Restoration - Professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis and surrounding Indiana areas."
        keywords="water damage restoration, fire damage restoration, storm damage repair, home remodeling, Indianapolis restoration, emergency restoration services"
      />
      <StructuredData type="LocalBusiness" />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />

        {/* Services Preview Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert restoration and remodeling services to bring your property back to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg hover:scale-105 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs">
                      <Link
                        to={`/blog/${service.blogSlug}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Learn More
                      </Link>
                      <span className="text-muted-foreground">•</span>
                      <Link
                        to={`/gallery?category=${encodeURIComponent(service.projectCategory)}`}
                        className="text-primary hover:underline font-medium"
                      >
                        View Projects
                      </Link>
                      {service.faqAnchor && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <Link
                            to={`/services#${service.faqAnchor}`}
                            className="text-primary hover:underline font-medium"
                          >
                            FAQs
                          </Link>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-micro-animate" asChild>
              <Link to="/services" className="gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <WhyUs />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let Us Restore Your Property to Its Best Condition<br />
              Contact us today for a free quote or immediate emergency response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-micro-animate" asChild>
                <Link to="/about#contact">Get a Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-micro-animate btn-micro-animate-outline" asChild>
                <Link to="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
