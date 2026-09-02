import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabaseUrl = 'https://eykdzkcptghkimhaxerv.supabase.co';
const supabaseKey = 'sb_publishable_sycGswphleXOZW32o_dMxQ_mR1NOEJN';
export const supabase = createClient(supabaseUrl, supabaseKey);

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
  return new Date().toISOString().split('T')[0];
}

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString();
}

// Track a page visit
export function trackVisit() {
  if (typeof window === 'undefined') return;
  try {
    const visits = JSON.parse(localStorage.getItem('frank_visits') || '[]');
    const visit: VisitData = {
      date: getToday(),
      time: getTime(),
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
      device: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
    };
    visits.push(visit);
    localStorage.setItem('frank_visits', JSON.stringify(visits));
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
}

// Track a CTA click
export function trackClick(buttonName: string) {
  if (typeof window === 'undefined') return;
  try {
    const clicks = JSON.parse(localStorage.getItem('frank_clicks') || '[]');
    const click: CTAClick = {
      button: buttonName,
      date: getToday(),
      time: getTime(),
    };
    clicks.push(click);
    localStorage.setItem('frank_clicks', JSON.stringify(clicks));
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

// Get analytics summary
export function getAnalytics(): VisitStats & { visits: VisitData[]; clicks: CTAClick[] } {
  if (typeof window === 'undefined') return { visits: [], clicks: [], totalVisits: 0, uniqueVisitors: 0, totalClicks: 0 };
  try {
    const visits = JSON.parse(localStorage.getItem('frank_visits') || '[]');
    const clicks = JSON.parse(localStorage.getItem('frank_clicks') || '[]');
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

// Supabase Functions: Get site config
export async function getSiteConfigFromSupabase() {
  try {
    const { data, error } = await supabase.from('site_config').select('*').eq('id', 1).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

// Supabase Functions: Save site config
export async function saveSiteConfigToSupabase(config: any) {
  try {
    const { error } = await supabase.from('site_config').update(config).eq('id', 1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving site config:', error);
    return false;
  }
}

// Supabase Functions: Get project links
export async function getProjectLinksFromSupabase() {
  try {
    const { data, error } = await supabase.from('project_links').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching project links:', error);
    return null;
  }
}

// Supabase Functions: Save project links
export async function saveProjectLinksToSupabase(links: any[]) {
  try {
    // Delete existing
    await supabase.from('project_links').delete().neq('id', 0);
    // Insert new
    const { error } = await supabase.from('project_links').insert(links);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving project links:', error);
    return false;
  }
}