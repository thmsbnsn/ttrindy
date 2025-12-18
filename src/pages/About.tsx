import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Mail, MapPin, Shield, CheckCircle, Award, Wrench } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/config/contact";
import { getAboutPage, getSiteSettings } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/PortableTextComponents";
import * as LucideIcons from "lucide-react";
import type { AboutPage, SiteSettings, FeatureCard, StatCard } from "@/types/sanity";

// Icon mapping
const iconMap: Record<string, any> = {
  Shield: LucideIcons.Shield,
  Award: LucideIcons.Award,
  Clock: LucideIcons.Clock,
  Users: LucideIcons.Users,
  Heart: LucideIcons.Heart,
  Target: LucideIcons.Target,
  CheckCircle2: LucideIcons.CheckCircle2,
  Star: LucideIcons.Star,
  Paintbrush: LucideIcons.Paintbrush,
  PaintRoller: LucideIcons.PaintRoller,
  Home: LucideIcons.Home,
  Saw: LucideIcons.Saw,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || LucideIcons.Shield;
};

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(20, { message: "Phone number must be less than 20 characters" }),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const About = () => {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStartTime] = useState(Date.now()); // Track when form was loaded
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    Promise.all([
      getAboutPage(),
      getSiteSettings()
    ])
      .then(([pageData, settings]) => {
        if (pageData) {
          setAboutPage(pageData);
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

  // Handle hash navigation (scroll to #contact)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !loading) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [loading]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          honeypot: '', // Honeypot field - bots will fill this
          timestamp: formStartTime.toString(), // Track form load time
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };
  // Get data from CMS or use fallbacks
  const storySection = aboutPage?.storySection;
  const stats = aboutPage?.statsSection?.stats || [];
  const values = aboutPage?.valuesSection?.values || [];
  const contactSection = aboutPage?.contactSection;
  const showContactForm = contactSection?.showContactForm !== false;

  // Get contact info from site settings
  const contactFormUrl = CONTACT_INFO.contactFormUrl;
  const email = siteSettings?.contact?.email || CONTACT_INFO.email.display;
  const emailHref = siteSettings?.contact?.email
    ? `mailto:${siteSettings.contact.email}`
    : CONTACT_INFO.email.href;
  const serviceArea = siteSettings?.contact?.serviceArea || `Greater ${CONTACT_INFO.address.city} Metro Area`;
  const licenseNumber = siteSettings?.businessInfo?.licenseNumber || CONTACT_INFO.license;

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={aboutPage?.seo?.metaTitle || aboutPage?.pageTitle || "About Top Tier Restoration"}
        description={aboutPage?.seo?.metaDescription || aboutPage?.subtitle || "Your trusted partner in home restoration and remodeling"}
        keywords={aboutPage?.seo?.keywords?.join(", ")}
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {aboutPage?.pageTitle || "About Top Tier Restoration"}
            </h1>
            {aboutPage?.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {aboutPage.subtitle}
              </p>
            )}
          </div>

          {/* Story Section - Redesigned */}
          {storySection && (
            <div className="mb-20">
              {/* Main Story Content */}
              <div className="relative">
                {/* Background accent */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full hidden md:block" />
                
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                  {/* Text Content - Takes 3 columns */}
                  <div className="lg:col-span-3 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                      {storySection.title}
                    </h2>
                    {storySection.content && (
                      <div className="prose prose-slate max-w-none text-muted-foreground mb-8">
                        <PortableText value={storySection.content} components={portableTextComponents} />
                      </div>
                    )}
                    
                    {/* Feature Grid - Replaces bullet list */}
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Decades of Combined Experience</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Licensed, Bonded & Insured</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Locally Owned & Operated</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Quality Work, Honest Service</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Wrench className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Full-Service Restoration</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm">Trusted Across Indianapolis</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image - Takes 2 columns */}
                  {storySection.image?.asset && (
                    <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <div className="relative">
                        <img
                          src={urlFor(storySection.image).width(600).height(700).url()}
                          alt={storySection.image.alt || "Our team"}
                          className="rounded-2xl shadow-2xl w-full h-auto object-contain"
                        />
                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                          <p className="text-2xl font-bold">20+</p>
                          <p className="text-xs opacity-90">Years Experience</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat: StatCard, index) => (
                <Card
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Values Section */}
          {values.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-10 text-center">
                {aboutPage?.valuesSection?.title || "Our Values"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value: FeatureCard, index) => {
                  const Icon = getIcon(value.icon);
                  return (
                    <Card
                      key={index}
                      className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div id="contact" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-10 text-center">
              {contactSection?.title || "Get In Touch"}
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="grid gap-4">
                  {/* Email Card */}
                  <a 
                    href={emailHref}
                    className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg group-hover:text-primary transition-colors">Email Us Today</p>
                      <p className="text-sm text-muted-foreground">We'll respond as soon as possible</p>
                    </div>
                  </a>

                  {/* Service Area Card */}
                  <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/50 border border-border">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Service Area</p>
                      <p className="text-sm text-muted-foreground">{serviceArea}</p>
                    </div>
                  </div>

                  {/* License Badge */}
                  <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-green-500/5 to-green-500/10 border border-green-500/20">
                    <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">Fully Licensed, Bonded & Insured</p>
                      <p className="text-sm text-muted-foreground">Your protection is our priority</p>
                    </div>
                  </div>
                </div>
              </div>

              {showContactForm && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">
                      {contactSection?.formTitle || "Send Us a Message"}
                    </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="(555) 123-4567"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us about your project..."
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Honeypot field - hidden from users, bots will fill it */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("honeypot" as any)}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
