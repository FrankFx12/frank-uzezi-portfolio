import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eykdzkcptghkimhaxerv.supabase.co';
const supabaseKey = 'sb_publishable_sycGswphleXOZW32o_dMxQ_mR1NOEJN';
export const supabase: any = createClient(supabaseUrl, supabaseKey);

function getToday(): string { return new Date().toISOString().split('T')[0]; }
function getTime(): string { return new Date().toLocaleTimeString(); }
function getDevice(): string {
  if (typeof window === 'undefined') return 'Desktop';
  if (window.innerWidth < 768) return 'Mobile';
  if (window.innerWidth < 1024) return 'Tablet';
  return 'Desktop';
}

export function trackVisit() {
  if (typeof window === 'undefined') return;
  const visit = { date: getToday(), time: getTime(), page: window.location.pathname, referrer: document.referrer || 'direct', device: getDevice() };

  supabase.from('visits').insert([visit]).then(({ error }: any) => {
    if (error) console.error('Supabase visit error:', error.message);
  }).catch((err: any) => console.error(err));

  try {
    const visits = JSON.parse(localStorage.getItem('frank_visits') || '[]');
    visits.push(visit);
    localStorage.setItem('frank_visits', JSON.stringify(visits));
  } catch (e) {}
}

export function trackClick(buttonName: string) {
  if (typeof window === 'undefined') return;
  const click = { button: buttonName, date: getToday(), time: getTime() };

  supabase.from('clicks').insert([click]).then(({ error }: any) => {
    if (error) console.error('Supabase click error:', error.message);
  }).catch((err: any) => console.error(err));

  try {
    const clicks = JSON.parse(localStorage.getItem('frank_clicks') || '[]');
    clicks.push(click);
    localStorage.setItem('frank_clicks', JSON.stringify(clicks));
  } catch (e) {}
}

export async function getAnalyticsFromSupabase() {
  try {
    const [visitsData, clicksData]: any = await Promise.all([
      supabase.from('visits').select('*').order('id', { ascending: false }),
      supabase.from('clicks').select('*').order('id', { ascending: false }),
    ]);
    return { 
      visits: visitsData.data || [], 
      clicks: clicksData.data || [], 
      totalVisits: visitsData.data?.length || 0, 
      totalClicks: clicksData.data?.length || 0 
    };
  } catch (e) {
    return { visits: [], clicks: [], totalVisits: 0, totalClicks: 0 };
  }
}