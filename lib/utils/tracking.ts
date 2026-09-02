// Simple analytics tracking using localStorage (client-side only)

interface VisitData {
  date: string;
  time: string;
  page: string;
  referrer: string;
  device: string;
}

interface CTAClick {
  button: string;
  date: string;
  time: string;
}

interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString();
}

// Get today's date in YYYY-MM-DD format
export function trackVisit() {
  if (typeof window === "undefined") return;
  try {
    const visits = JSON.parse(localStorage.getItem("frank_visits") || "[]");
    const visit: VisitData = {
      date: getToday(),
      time: getTime(),
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
      time: getTime(),
    };
    clicks.push(click);
    localStorage.setItem("frank_clicks", JSON.stringify(clicks));
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// Get analytics summary
export function getAnalytics(): VisitStats & { visits: VisitData[]; clicks: CTAClick[] } {
  if (typeof window === "undefined") return { visits: [], clicks: [], totalVisits: 0, uniqueVisitors: 0, totalClicks: 0 };
  try {
    const visits = JSON.parse(localStorage.getItem("frank_visits") || "[]");
    const clicks = JSON.parse(localStorage.getItem("frank_clicks") || "[]");
    
    // Calculate unique visitors (based on referrer + date + device combination as a simple proxy)
    const uniqueVisitors = new Set(visits.map((v: VisitData) => `${v.referrer}-${v.device}-${v.date}`)).size;
    
    return {
      visits,
      clicks,
      totalVisits: visits.length,
      uniqueVisitors,
      totalClicks: clicks.length,
    };
  } catch (error) {
    return { visits: [], clicks: [], totalVisits: 0, uniqueVisitors: 0, totalClicks: 0 };
  }
}