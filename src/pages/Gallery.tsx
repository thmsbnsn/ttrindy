import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Flame, CloudRain, Hammer } from "lucide-react";
import { getProjects, getCategories } from "@/lib/sanity";
import { urlFor } from "../../sanity/lib/image";
import type { Project, Category } from "@/types/sanity";

const iconMap: Record<string, any> = {
  "Water Damage": Droplets,
  "Fire Damage": Flame,
  "Storm Damage": CloudRain,
  "Remodeling": Hammer,
};

const Gallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const allCategories = ["All", ...categories.map(c => c.title)];

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
              Explore our portfolio of successful restoration and remodeling projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => {
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
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
