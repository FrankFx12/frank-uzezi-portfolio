// Simple analytics tracking using localStorage (client-side only)

interface VisitData {
  date: string;
  page: string;
  referrer: string;
  device: string;
}

interface CTAClick {
  button: string;
  date: string;
}

// Get today's date in YYYY-MM-DD format
function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

// Track a page visit
export function trackVisit() {
  if (typeof window === "undefined") return;
  
  try {
    const visits = JSON.parse(localStorage.getItem("frank_visits") || "[]");
    
    const visit: VisitData = {
      date: getToday(),
      page: window.location.pathname,
      referrer: document.referrer || "direct",
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
    };
    
    visits.push(visit);
    localStorage.setItem("frank_visits", JSON.stringify(visits));
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

// Track a CTA click
export function trackClick(buttonName: string) {
  if (typeof window === "undefined") return;
  
  try {
    const clicks = JSON.parse(localStorage.getItem("frank_clicks") || "[]");
    
    const click: CTAClick = {
      button: buttonName,
      date: getToday(),
    };
    
    clicks.push(click);
    localStorage.setItem("frank_clicks", JSON.stringify(clicks));
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// Get analytics summary
export function getAnalytics() {
  if (typeof window === "undefined") return { visits: [], clicks: [], totals: { visits: 0, clicks: 0 } };
  
  try {
    const visits = JSON.parse(localStorage.getItem("frank_visits") || "[]");
    const clicks = JSON.parse(localStorage.getItem("frank_clicks") || "[]");
    
    return {
      visits,
      clicks,
      totals: {
        visits: visits.length,
        clicks: clicks.length,
      },
    };
  } catch (error) {
    return { visits: [], clicks: [], totals: { visits: 0, clicks: 0 } };
  }
}