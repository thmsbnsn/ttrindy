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

  useEffect(() => {
    const checkAuth = () => {
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
    };

    checkAuth();

    // Fetch construction page settings
    getConstructionPage()
      .then((page) => {
        setConstructionPage(page);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching construction page:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If construction mode is active and user is not authenticated, show construction page
  if (constructionPage?.isActive && !isAuthenticated) {
    return <Construction />;
  }

  // If construction mode is active but user is authenticated, allow access
  // If construction mode is not active, allow access
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
