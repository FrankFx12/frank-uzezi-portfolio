"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, getAnalyticsFromSupabase } from "@/lib/utils/tracking";
import { Smartphone, Monitor, Activity, Eye } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [whatsapp1, setWhatsapp1] = useState("");
  const [whatsapp2, setWhatsapp2] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [projectLinks, setProjectLinks] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState("dashboard");

  // State matching the Supabase data exactly (with as any to fix TypeScript)
  const [analytics, setAnalytics] = useState<any>({ visits: [], clicks: [], totalVisits: 0, totalClicks: 0 });

  useEffect(() => {
    const loadConfig = async () => {
      const { data, error } = await supabase.from('site_config').select('*').eq('id', 1).single();
      if (data) {
        setWhatsapp1(data.whatsapp_primary || "");
        setWhatsapp2(data.whatsapp_secondary || "");
        setEmail(data.email || "");
        setInstagram(data.instagram || "");
        setTiktok(data.tiktok || "");
        setTwitter(data.twitter || "");
        setLinkedin(data.linkedin || "");
      }
      const { data: projData } = await supabase.from('project_links').select('*');
      if (projData) {
        const links: { [key: string]: string } = {};
        projData.forEach((item: any) => links[item.project_name] = item.link);
        setProjectLinks(links);
      }
      
      // Set analytics from Supabase
      const analyticsData = await getAnalyticsFromSupabase();
      setAnalytics(analyticsData);
    };
    loadConfig();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Frank12" && password === "134679") {
      setIsLoggedIn(true);
      setError("");
    } else setError("Invalid credentials.");
  };

  const handleSave = async () => {
    const { error: configError } = await supabase.from('site_config').update({
      whatsapp_primary: whatsapp1, whatsapp_secondary: whatsapp2, email,
      instagram: instagram, tiktok: tiktok, twitter: twitter, linkedin: linkedin,
    }).eq('id', 1);

    if (configError) return alert("Error: " + configError.message);

    await supabase.from('project_links').delete().neq('id', 0);
    const projectEntries = Object.entries(projectLinks).map(([project_name, link]) => ({ project_name, link }));
    if (projectEntries.length > 0) await supabase.from('project_links').insert(projectEntries);

    alert("Saved! Now live for all visitors.");
    router.refresh();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-full max-w-md bg-navy-800 border border-white/10 rounded-2xl p-8 shadow-glow">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-accent-blue" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-accent-blue" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-gradient-to-r from-accent-blue to-accent-violet text-white font-bold py-3 rounded-lg hover:shadow-glow">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const mobileCount = analytics.visits.filter((v: any) => v.device === 'Mobile').length;
  const tabletCount = analytics.visits.filter((v: any) => v.device === 'Tablet').length;
  const desktopCount = analytics.visits.filter((v: any) => v.device === 'Desktop').length;
  const totalDevices = Math.max(mobileCount + tabletCount + desktopCount, 1);

  return (
    <div className="min-h-screen bg-navy-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white"><span className="text-gradient">Admin</span> Dashboard</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 hover:text-red-400">Logout</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'analytics', 'contact', 'projects'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${activeTab === tab ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white' : 'bg-navy-800 text-text-secondary border border-white/10'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-navy-800/50 border border-accent-blue/30 rounded-2xl p-6 shadow-glow">
                <Eye className="w-6 h-6 text-accent-blue mb-2" />
                <p className="text-text-secondary text-sm">Total Visits</p>
                <p className="text-4xl font-bold text-white">{analytics.totalVisits}</p>
              </div>
              <div className="bg-navy-800/50 border border-accent-violet/30 rounded-2xl p-6 shadow-glow">
                <Activity className="w-6 h-6 text-accent-violet mb-2" />
                <p className="text-text-secondary text-sm">CTA Clicks</p>
                <p className="text-4xl font-bold text-white">{analytics.totalClicks}</p>
              </div>
              <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6">
                <Smartphone className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-text-secondary text-sm">Mobile Users</p>
                <p className="text-4xl font-bold text-white">{mobileCount}</p>
              </div>
              <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6">
                <Monitor className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-text-secondary text-sm">Desktop Users</p>
                <p className="text-4xl font-bold text-white">{desktopCount}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Device Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="text-sm text-text-secondary">📱 Mobile</span><span className="text-white font-bold">{Math.round((mobileCount / totalDevices) * 100)}%</span></div>
                  <div className="h-2 bg-navy-900 rounded-full overflow-hidden"><div className="h-full bg-accent-blue" style={{ width: `${(mobileCount / totalDevices) * 100}%` }} /></div>
                  <div className="flex items-center justify-between pt-2"><span className="text-sm text-text-secondary">💻 Desktop</span><span className="text-white font-bold">{Math.round((desktopCount / totalDevices) * 100)}%</span></div>
                  <div className="h-2 bg-navy-900 rounded-full overflow-hidden"><div className="h-full bg-accent-violet" style={{ width: `${(desktopCount / totalDevices) * 100}%` }} /></div>
                </div>
              </div>

              <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Visits</h3>
                <div className="space-y-2">
                  {analytics.visits.slice(0, 5).map((v: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-navy-900/50 p-3 rounded-lg">
                      <div className="text-xs">
                        <p className="text-white">{v.device}</p>
                        <p className="text-text-secondary">{v.page}</p>
                      </div>
                      <div className="text-xs text-text-secondary text-right"><p>{v.date}</p><p>{v.time}</p></div>
                    </div>
                  ))}
                  {analytics.visits.length === 0 && <p className="text-text-secondary text-sm">No visits yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All CTA Clicks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-text-secondary border-b border-white/10">
                  <tr><th className="py-2 pr-4">Button</th><th className="py-2 pr-4">Date</th><th className="py-2">Time</th></tr>
                </thead>
                <tbody>
                  {analytics.clicks.map((c: any, i: number) => (
                    <tr key={i} className="border-b border-white/5"><td className="py-2 text-white">{c.button}</td><td className="py-2 text-text-secondary">{c.date}</td><td className="py-2 text-text-secondary">{c.time}</td></tr>
                  ))}
                  {analytics.clicks.length === 0 && <tr><td colSpan={3} className="text-center py-4 text-text-secondary">No clicks yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Contact Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={whatsapp1} onChange={(e) => setWhatsapp1(e.target.value)} placeholder="WhatsApp Primary" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={whatsapp2} onChange={(e) => setWhatsapp2(e.target.value)} placeholder="WhatsApp Secondary" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="TikTok" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="X (Twitter)" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-navy-800/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Project Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["HeatFlow Experts", "Izoduwa Asemota", "Migrants Welfare", "Vine Interiors", "Edo Youth Impact Forum", "Health Career Boost", "Kiid Africa", "Tech Scholar", "SiC Africa", "TriFRM", "Cyan University"].map((project) => (
                <input key={project} value={projectLinks[project] || ""} onChange={(e) => setProjectLinks((prev) => ({ ...prev, [project]: e.target.value }))} placeholder={project} className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              ))}
            </div>
          </div>
        )}

        {(activeTab === "contact" || activeTab === "projects") && (
          <button onClick={handleSave} className="w-full mt-6 bg-gradient-to-r from-accent-blue to-accent-violet text-white font-bold py-3 rounded-lg text-lg hover:shadow-glow">Save All Changes</button>
        )}
      </div>
    </div>
  );
}