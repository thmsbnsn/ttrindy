import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { MetaTags } from "@/components/SEO/MetaTags";
import { StructuredData } from "@/components/SEO/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getHomePage, getFeaturedProjects } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { Project, HomePage, ServiceCard, FeatureCard } from "@/types/sanity";

// Icon mapping for service cards and categories
const iconMap: Record<string, any> = {
  Droplets: LucideIcons.Droplets,
  Flame: LucideIcons.Flame,
  CloudRain: LucideIcons.CloudRain,
  Hammer: LucideIcons.Hammer,
  Shield: LucideIcons.Shield,
  Award: LucideIcons.Award,
  Clock: LucideIcons.Clock,
  Users: LucideIcons.Users,
  Heart: LucideIcons.Heart,
  Target: LucideIcons.Target,
  CheckCircle2: LucideIcons.CheckCircle2,
  Star: LucideIcons.Star,
  // Category fallbacks
  "Water Damage": LucideIcons.Droplets,
  "Fire Damage": LucideIcons.Flame,
  "Storm Damage": LucideIcons.CloudRain,
  "Remodeling": LucideIcons.Hammer,
};

// Helper to get icon component from string
const getIcon = (iconName: string) => {
  return iconMap[iconName] || LucideIcons.Hammer;
};

const Index = () => {
  const [homePage, setHomePage] = useState<HomePage | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHomePage(),
      getFeaturedProjects(6)
    ])
      .then(([pageData, projects]) => {
        if (pageData) {
          setHomePage(pageData);
        }
        setFeaturedProjects(projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Get data from CMS or use fallbacks
  const featuredProjectsSection = homePage?.featuredProjectsSection;
  const showFeaturedProjects = featuredProjectsSection?.showFeaturedProjects !== false;
  const maxProjects = featuredProjectsSection?.maxProjects || 6;
  const displayedProjects = featuredProjects.slice(0, maxProjects);

  const servicesSection = homePage?.servicesSection;
  const services = servicesSection?.services || [];

  const whyUsSection = homePage?.whyUsSection;
  const features = whyUsSection?.features || [];

  const finalCta = homePage?.finalCta;

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={homePage?.seo?.metaTitle || "Home"}
        description={homePage?.seo?.metaDescription || "Top Tier Restoration - Professional restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis and surrounding Indiana areas."}
        keywords={homePage?.seo?.keywords?.join(", ") || "water damage restoration, fire damage restoration, storm damage repair, home remodeling, Indianapolis restoration, restoration services"}
      />
      <StructuredData type="LocalBusiness" />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />

        {/* Featured Projects Section */}
        {!loading && showFeaturedProjects && displayedProjects.length > 0 && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredProjectsSection?.title || "Featured Projects"}
                </h2>
                {featuredProjectsSection?.description && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {featuredProjectsSection.description}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedProjects.map((project, index) => {
                  const Icon = project.category ? getIcon(project.category) : LucideIcons.Hammer;
                  return (
                    <Link key={project._id} to={`/projects/${project.slug}`}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in h-full cursor-pointer">
                        <div className="relative overflow-hidden aspect-video">
                          {project.mainImage ? (
                            <img
                              src={urlFor(project.mainImage).width(800).height(450).url()}
                              alt={project.mainImage.alt || project.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading={index < 3 ? "eager" : "lazy"}
                              decoding={index < 3 ? "sync" : "async"}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Icon className="w-16 h-16 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full p-2">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <CardContent className="p-5">
                          {project.category && (
                            <Badge variant="secondary" className="mb-2">
                              {project.category}
                            </Badge>
                          )}
                          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center">
                <Button size="lg" className="btn-micro-animate" asChild>
                  <Link to="/gallery" className="gap-2">
                    View All Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Services Preview Section */}
        {services.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {servicesSection?.title || "Our Services"}
                </h2>
                {servicesSection?.description && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {servicesSection.description}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {services.map((service: ServiceCard, index) => {
                  const Icon = getIcon(service.icon);
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
                          {service.blogSlug && (
                            <>
                              <Link
                                to={`/blog/${service.blogSlug}`}
                                className="text-primary hover:underline font-medium"
                              >
                                Learn More
                              </Link>
                              {service.projectCategory && <span className="text-muted-foreground">•</span>}
                            </>
                          )}
                          {service.projectCategory && (
                            <>
                              <Link
                                to={`/gallery?category=${encodeURIComponent(service.projectCategory)}`}
                                className="text-primary hover:underline font-medium"
                              >
                                View Projects
                              </Link>
                              {service.faqAnchor && <span className="text-muted-foreground">•</span>}
                            </>
                          )}
                          {service.faqAnchor && (
                            <Link
                              to={`/services#${service.faqAnchor}`}
                              className="text-primary hover:underline font-medium"
                            >
                              FAQs
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {servicesSection?.ctaText && servicesSection?.ctaUrl && (
                <div className="text-center">
                  <Button size="lg" className="btn-micro-animate" asChild>
                    {servicesSection.ctaUrl.startsWith("http") ? (
                      <a href={servicesSection.ctaUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        {servicesSection.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link to={servicesSection.ctaUrl} className="gap-2">
                        {servicesSection.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        {features.length > 0 && (
          <section id="why-us" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {whyUsSection?.title || "Why Choose Top Tier?"}
                </h2>
                {whyUsSection?.description && (
                  <p className="text-lg text-muted-foreground">
                    {whyUsSection.description}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {features.map((feature: FeatureCard, index) => {
                  const Icon = getIcon(feature.icon);
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
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        {finalCta && (
          <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-primary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{finalCta.title}</h2>
                {finalCta.description && (
                  <p className="text-lg text-muted-foreground mb-8">
                    {finalCta.description}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {finalCta.primaryCta && (
                    <Button size="lg" className="btn-micro-animate" asChild>
                      {finalCta.primaryCta.url.startsWith("http") ? (
                        <a href={finalCta.primaryCta.url} target="_blank" rel="noopener noreferrer">
                          {finalCta.primaryCta.text}
                        </a>
                      ) : (
                        <Link to={finalCta.primaryCta.url}>{finalCta.primaryCta.text}</Link>
                      )}
                    </Button>
                  )}
                  {finalCta.secondaryCta && (
                    <Button size="lg" variant="outline" className="btn-micro-animate btn-micro-animate-outline" asChild>
                      {finalCta.secondaryCta.url.startsWith("http") ? (
                        <a href={finalCta.secondaryCta.url} target="_blank" rel="noopener noreferrer">
                          {finalCta.secondaryCta.text}
                        </a>
                      ) : (
                        <Link to={finalCta.secondaryCta.url}>{finalCta.secondaryCta.text}</Link>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
