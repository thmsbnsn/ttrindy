import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Award, Clock, Users, Heart, Target, Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "We never cut corners — your home’s safety and longevity come first.",
  },
  {
    icon: Clock,
    title: "Timely Response",
    description: "24/7 emergency service with fast on-site arrival and efficient restoration.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "We communicate clearly, answer questions quickly, and treat every home with respect.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Meticulous attention to detail ensures durable, lasting results.",
  },
];

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "1000+", label: "Projects Completed" },
  { number: "100%", label: "Licensed & Insured" },
  { number: "24/7", label: "Emergency Service" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(20, { message: "Phone number must be less than 20 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const About = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Top Tier Restoration</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in home restoration and remodeling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
              Founded over 15 years ago, Top Tier Restoration was built on a simple mission:
              deliver honest, reliable, and professional restoration services that put homeowners first.
              </p>
              <p className="text-muted-foreground mb-4">
              What started as a small family-run business has grown into a full-service restoration team known for quality workmanship, rapid emergency response, and exceptional customer care.
              We’ve proudly restored thousands of homes across Indiana, helping families recover from fire, water, and storm damage with confidence.
              </p>
              <p className="text-muted-foreground">
              We believe your home deserves the highest standard of craftsmanship and care.
              That’s why every project — big or small — is handled by licensed, insured, and highly trained professionals dedicated to doing the job right.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop"
                alt="Our team"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
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

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
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

          <div id="contact" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-10 text-center">Get In Touch</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <a href="tel:5551234567" className="text-muted-foreground hover:text-primary transition-colors">
                          (317) 123-4567
                        </a>
                        <p className="text-sm text-muted-foreground">24/7 Emergency Line</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <p className="text-muted-foreground">info@toptierrestoration.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Service Area</p>
                        <p className="text-muted-foreground">Serving the Greater Indianapolis Metro Area</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">License Information</p>
                        <p className="text-muted-foreground">Indiana License #: IN-12345-PLACEHOLDER</p>
                        <p className="text-muted-foreground text-sm mt-1">Fully Licensed & Insured</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold mb-2">Emergency Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7 for water damage, fire damage, and storm emergencies.
                      Call now for immediate assistance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
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
                        placeholder="Tell us about your project or emergency..."
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
