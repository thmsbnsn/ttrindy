import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Phone } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { BlogPost } from "@/types/sanity";
import { format } from "date-fns";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Post not found");
      setLoading(false);
      return;
    }

    getBlogPostBySlug(slug)
      .then((data) => {
        if (!data) {
          setError("Post not found");
        } else {
          setPost(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog post:", err);
        setError("Failed to load post");
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
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "The post you're looking for doesn't exist."}</p>
              <Button onClick={() => navigate("/blog")} asChild>
                <Link to="/blog">Back to Blog</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          {/* Post Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {post.mainImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-8">
                <img
                  src={urlFor(post.mainImage).width(1200).height(675).url()}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post.excerpt && (
              <p className="text-xl text-muted-foreground italic mb-8">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Post Body */}
          {post.body && post.body.length > 0 && (
            <div className="mb-12 animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <div className="prose prose-slate max-w-none">
                    {/* Render portable text - simplified for now */}
                    {post.body.map((block: any, index: number) => {
                      if (block._type === 'block') {
                        const text = block.children?.map((child: any) => child.text).join('') || '';
                        const style = block.style || 'normal';

                        if (style === 'h1') {
                          return <h1 key={index} className="text-3xl font-bold mb-4 mt-8">{text}</h1>;
                        }
                        if (style === 'h2') {
                          return <h2 key={index} className="text-2xl font-bold mb-3 mt-6">{text}</h2>;
                        }
                        if (style === 'h3') {
                          return <h3 key={index} className="text-xl font-semibold mb-2 mt-4">{text}</h3>;
                        }
                        return <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{text}</p>;
                      }
                      if (block._type === 'image' && block.asset) {
                        return (
                          <div key={index} className="my-8">
                            <img
                              src={urlFor(block).width(800).url()}
                              alt={block.alt || ''}
                              className="rounded-lg w-full"
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Restoration Services?</h2>
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

export default BlogDetail;

