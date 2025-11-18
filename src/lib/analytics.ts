// Google Analytics setup
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

export const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  // Check if already initialized
  if (window.gtag) return;

  // Create dataLayer
  window.dataLayer = window.dataLayer || [];

  // Initialize gtag function
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };

  // Set default consent mode
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
  });

  // Check user consent
  const consent = localStorage.getItem("cookie-consent");
  if (consent === "accepted") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }

  // Load Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize GA
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (path: string) => {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

