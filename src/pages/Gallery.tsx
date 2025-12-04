import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Flame, CloudRain, Hammer, ChevronLeft, ChevronRight, Phone, ArrowRight } from "lucide-react";
import { getProjects, getCategories } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import { CONTACT_INFO } from "@/config/contact";
import type { Project, Category } from "@/types/sanity";

const iconMap: Record<string, any> = {
  "Water Damage": Droplets,
  "Fire Damage": Flame,
  "Storm Damage": CloudRain,
  "Remodeling": Hammer,
};

const ITEMS_PER_PAGE = 9;

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getCategories()])
      .then(([projectsData, categoriesData]) => {
        setProjects(projectsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const allCategories = ["All", ...categories.map(c => c.title)];

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore completed restoration and remodeling projects showcasing our craftsmanship, precision, and commitment to quality.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
            <ChevronLeft className="w-4 h-4" />
            <span>Swipe to view more projects</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProjects.map((project, index) => {
                const Icon = project.category ? iconMap[project.category] || Hammer : Hammer;
                return (
                  <Link key={project._id} to={`/projects/${project.slug}`}>
                    <Card
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in h-full cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden aspect-video">
                        {project.mainImage ? (
                          <img
                            src={urlFor(project.mainImage).width(800).height(450).url()}
                            alt={project.mainImage.alt || project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding={index < 6 ? "sync" : "async"}
                            onError={(e) => {
                              console.error("Image failed to load:", project.title);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
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
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
              </div>

              {/* Desktop Pagination */}
              {totalPages > 1 && (
                <div className="hidden md:flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="btn-micro-animate-outline"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "btn-micro-animate" : "btn-micro-animate-outline"}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-micro-animate-outline"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-primary/5 rounded-lg p-8 md:p-12 text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us help restore or remodel your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-micro-animate gap-2" asChild>
                <a href={CONTACT_INFO.phone.href}>
                  <Phone className="w-5 h-5" />
                  Get a Free Quote
                </a>
              </Button>
              <Button size="lg" variant="outline" className="btn-micro-animate btn-micro-animate-outline gap-2" asChild>
                <Link to="/services">
                  View Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
