import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MetaTags } from "@/components/SEO/MetaTags";
import { StructuredData } from "@/components/SEO/StructuredData";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Phone } from "lucide-react";
import { getProjectBySlug } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { Project } from "@/types/sanity";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { format } from "date-fns";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Project not found");
      setLoading(false);
      return;
    }

    getProjectBySlug(slug)
      .then((data) => {
        if (!data) {
          setError("Project not found");
        } else {
          setProject(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "The project you're looking for doesn't exist."}</p>
              <Button onClick={() => navigate("/gallery")} asChild>
                <Link to="/gallery">Back to Gallery</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const mediaItems = [
    ...(project.images || []).map((img) => ({
      type: 'image' as const,
      image: img,
    })),
    ...(project.videos || []).map((video) => ({
      type: 'video' as const,
      video: video,
    })),
  ];

  const mainImageUrl = project.images?.[0]
    ? urlFor(project.images[0]).width(1200).height(630).url()
    : 'https://ttrindy.com/og-image.webp';

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={project.title}
        description={project.description || `View ${project.title} project by Top Tier Restoration.`}
        ogImage={mainImageUrl}
        keywords={project.category ? `${project.category}, restoration project, ${project.location}` : undefined}
      />
      <StructuredData
        type="Article"
        data={{
          headline: project.title,
          description: project.description,
          image: mainImageUrl,
          datePublished: project.date ? new Date(project.date).toISOString() : undefined,
        }}
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/gallery")}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Button>

          {/* Project Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {project.category && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {project.category}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(new Date(project.date), "MMMM yyyy")}</span>
                </div>
              )}
            </div>

            {project.description && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            )}
          </div>

          {/* Media Carousel */}
          {mediaItems.length > 0 && (
            <div className="mb-12 animate-fade-in">
              <Carousel className="w-full">
                <CarouselContent>
                  {mediaItems.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        {item.type === 'image' && item.image ? (
                          <img
                            src={urlFor(item.image).width(1200).height(675).url()}
                            alt={item.image.alt || project.title}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding={index === 0 ? "sync" : "async"}
                          />
                        ) : item.type === 'video' && item.video ? (
                          <div className="w-full h-full">
                            {item.video.url?.includes('youtube.com') || item.video.url?.includes('youtu.be') ? (
                              <iframe
                                src={item.video.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={item.video.url}
                                controls
                                className="w-full h-full object-cover"
                                poster={item.video.thumbnail ? urlFor(item.video.thumbnail).width(1200).height(675).url() : undefined}
                              />
                            )}
                          </div>
                        ) : null}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {mediaItems.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
          )}

          {/* Full Description */}
          {project.fullDescription && project.fullDescription.length > 0 && (
            <div className="mb-12 animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                  <div className="prose prose-slate max-w-none">
                    <PortableText
                      value={project.fullDescription}
                      components={portableTextComponents}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us help restore or remodel your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-micro-animate gap-2" asChild>
                <Link to="/about#contact">
                  <Phone className="w-5 h-5" />
                  Get a Free Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-micro-animate btn-micro-animate-outline" asChild>
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

