import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/SEO/MetaTags";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/config/contact";
import { getServicesPage, getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import * as LucideIcons from "lucide-react";
import type { ServicesPage, SiteSettings, ServiceDetail } from "@/types/sanity";

// Icon mapping
const iconMap: Record<string, any> = {
  Droplets: LucideIcons.Droplets,
  Flame: LucideIcons.Flame,
  CloudRain: LucideIcons.CloudRain,
  Hammer: LucideIcons.Hammer,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || LucideIcons.Hammer;
};

const Services = () => {
  const [servicesPage, setServicesPage] = useState<ServicesPage | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getServicesPage(),
      getSiteSettings()
    ])
      .then(([pageData, settings]) => {
        if (pageData) {
          setServicesPage(pageData);
        }
        if (settings) {
          setSiteSettings(settings);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Get data from CMS
  const services = servicesPage?.services || [];
  const emergencyCta = servicesPage?.emergencyCta;

  // Get contact info from site settings
  const contactFormUrl = CONTACT_INFO.contactFormUrl;

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={servicesPage?.seo?.metaTitle || servicesPage?.pageTitle || "Our Services"}
        description={servicesPage?.seo?.metaDescription || servicesPage?.subtitle || "Professional restoration and remodeling services to restore and enhance your property"}
        keywords={servicesPage?.seo?.keywords?.join(", ")}
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {servicesPage?.pageTitle || "Our Services"}
            </h1>
            {servicesPage?.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {servicesPage.subtitle}
              </p>
            )}
          </div>

          {services.length > 0 && (
            <div className="space-y-16">
              {services.map((service: ServiceDetail, index) => {
                const Icon = getIcon(service.icon);
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    id={service.faqId}
                    className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in scroll-mt-24`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={isEven ? "md:order-1" : "md:order-2"}>
                      {service.image?.asset ? (
                        <img
                          src={urlFor(service.image).width(800).height(400).url()}
                          alt={service.image.alt || service.title}
                          className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                        />
                      ) : (
                        <div className="rounded-lg shadow-xl w-full h-[400px] bg-muted flex items-center justify-center">
                          <Icon className="w-24 h-24 text-muted-foreground" />
                        </div>
                      )}
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
                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-3 mb-6">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <Button className="btn-micro-animate w-full" asChild>
                          <Link to={contactFormUrl}>
                            Get a Free Quote
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
