import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CookieConsent from "@/components/CookieConsent";
import MobileEmergencyBar from "@/components/MobileEmergencyBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics";
import { getConstructionPage } from "@/lib/sanity";
import type { ConstructionPage } from "@/types/sanity";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Component to handle scroll-to-top on route change and analytics
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page view for analytics
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

// Component to check construction mode and authentication
const ConstructionGuard = ({ children }: { children: React.ReactNode }) => {
  const [constructionPage, setConstructionPage] = useState<ConstructionPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("ttr_auth_token");
        const timestamp = localStorage.getItem("ttr_auth_timestamp");

        if (token && timestamp) {
          // Check if token is still valid (24 hours)
          const tokenAge = Date.now() - parseInt(timestamp, 10);
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (tokenAge < twentyFourHours) {
            setIsAuthenticated(true);
          } else {
            // Token expired, clear it
            localStorage.removeItem("ttr_auth_token");
            localStorage.removeItem("ttr_auth_timestamp");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    let isMounted = true;

    // Fetch construction page settings with timeout
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn("Construction page fetch timed out, proceeding with site");
        setIsLoading(false);
        setHasError(true);
      }
    }, 5000); // 5 second timeout

    getConstructionPage()
      .then((page) => {
        clearTimeout(timeoutId);
        if (isMounted) {
          console.log("Construction page fetched:", page);
          setConstructionPage(page);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (isMounted) {
          console.error("Error fetching construction page:", error);
          // If CORS error, show a warning but don't block the site
          if (error?.message?.includes('CORS') || error?.message?.includes('Access-Control')) {
            console.warn("CORS error detected. Please add http://localhost:8080 to Sanity CORS origins.");
          }
          setHasError(true);
          setIsLoading(false);
          // Continue to show site even if construction page fetch fails
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Debug logging
  console.log("ConstructionGuard render:", {
    constructionPage,
    isActive: constructionPage?.isActive,
    isActiveType: typeof constructionPage?.isActive,
    isAuthenticated,
    hasError,
    isLoading,
    shouldShowLoading: isLoading && !hasError,
  });

  // If loading for too long or error, show the site anyway
  if (isLoading && !hasError) {
    console.log("Showing loading spinner");
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If construction mode is active and user is not authenticated, show construction page
  // Check explicitly for true (handles boolean true, string "true", etc.)
  const isConstructionActive = constructionPage?.isActive === true || constructionPage?.isActive === "true";
  if (constructionPage && constructionPage.isActive && isConstructionActive && !isAuthenticated) {
    console.log("Rendering Construction component - isActive:", isConstructionActive, "constructionPage:", constructionPage);
    // Ensure we have valid data before rendering
    if (!constructionPage) {
      console.warn("constructionPage is null/undefined, cannot render Construction");
      return <>{children}</>;
    }
    return <Construction key="construction-page" initialData={constructionPage} />;
  }

  console.log("Rendering children (normal site)");

  // If construction mode is active but user is authenticated, allow access
  // If construction mode is not active, allow access
  // If there was an error fetching construction page, allow access (fail open)
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ConstructionGuard>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/accessibility" element={<Accessibility />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
              <MobileEmergencyBar />
            </ConstructionGuard>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
