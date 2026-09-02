"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAnalytics } from "@/lib/utils/tracking";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Data states (editable)
  const [whatsapp1, setWhatsapp1] = useState("");
  const [whatsapp2, setWhatsapp2] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [projectLinks, setProjectLinks] = useState<{ [key: string]: string }>({});

  // Analytics state
  const [analytics, setAnalytics] = useState<ReturnType<typeof getAnalytics>>({ visits: [], clicks: [], totalVisits: 0, uniqueVisitors: 0, totalClicks: 0 });
  const [activeTab, setActiveTab] = useState("dashboard");

  // Load analytics on mount
  useEffect(() => {
    const data = getAnalytics();
    setAnalytics(data);
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Frank12" && password === "134679") {
      setIsLoggedIn(true);
      setError("");
      const savedConfig = localStorage.getItem("frank_config");
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setWhatsapp1(config.whatsapp1 || "");
        setWhatsapp2(config.whatsapp2 || "");
        setEmail(config.email || "");
        setInstagram(config.instagram || "");
        setTiktok(config.tiktok || "");
        setTwitter(config.twitter || "");
        setLinkedin(config.linkedin || "");
        setProjectLinks(config.projectLinks || {});
      }
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  // Save Config to localStorage
  const handleSave = () => {
    const config = {
      whatsapp1,
      whatsapp2,
      email,
      instagram,
      tiktok,
      twitter,
      linkedin,
      projectLinks,
    };
    localStorage.setItem("frank_config", JSON.stringify(config));
    alert("Saved successfully!");
    router.refresh();
  };

  // Handle project link update
  const handleProjectLinkChange = (projectName: string, link: string) => {
    setProjectLinks((prev) => ({ ...prev, [projectName]: link }));
  };

  if (!isLoggedIn) {
    // LOGIN SCREEN
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="bg-navy-800 p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 focus:border-accent-blue outline-none text-white"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-blue to-accent-violet text-white font-bold py-3 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-navy-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "dashboard" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "analytics" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "contact" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}
          >
            Contact Settings
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "projects" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}
          >
            Project Links
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">Total Visits</p>
                <p className="text-2xl sm:text-4xl font-bold text-white mt-2">{analytics.totalVisits}</p>
              </div>
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">Unique Visitors</p>
                <p className="text-2xl sm:text-4xl font-bold text-white mt-2">{analytics.uniqueVisitors}</p>
              </div>
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">CTA Clicks</p>
                <p className="text-2xl sm:text-4xl font-bold text-white mt-2">{analytics.totalClicks}</p>
              </div>
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">WhatsApp (Primary)</p>
                <p className="text-lg sm:text-xl font-bold text-accent-blue mt-2 break-all">{whatsapp1 || "+2348161889155"}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Visits</h3>
              <div className="space-y-2">
                {analytics.visits.slice(-5).reverse().map((visit, i) => (
                  <div key={i} className="bg-navy-900 p-3 rounded-lg flex justify-between items-center text-xs sm:text-sm">
                    <div>
                      <p className="text-white">{visit.page}</p>
                      <p className="text-text-secondary">{visit.device}</p>
                    </div>
                    <div className="text-right text-text-secondary">
                      <p>{visit.date}</p>
                      <p>{visit.time}</p>
                    </div>
                  </div>
                ))}
                {analytics.visits.length === 0 && (
                  <p className="text-text-secondary text-sm">No visits yet. Share your site link!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">Total Visits</p>
                <p className="text-2xl sm:text-4xl font-bold text-white mt-2">{analytics.totalVisits}</p>
              </div>
              <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
                <p className="text-text-secondary text-xs sm:text-sm">CTA Clicks</p>
                <p className="text-2xl sm:text-4xl font-bold text-white mt-2">{analytics.totalClicks}</p>
              </div>
            </div>

            {/* Visitors Log Table */}
            <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">All Visitors Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="text-text-secondary border-b border-white/10">
                    <tr>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Time</th>
                      <th className="py-2 pr-4">Device</th>
                      <th className="py-2 pr-4">Referrer</th>
                      <th className="py-2">Page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {analytics.visits.slice().reverse().map((visit, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-4 text-white">{visit.date}</td>
                        <td className="py-2 pr-4 text-white">{visit.time}</td>
                        <td className="py-2 pr-4 text-text-secondary">{visit.device}</td>
                        <td className="py-2 pr-4 text-text-secondary">{visit.referrer}</td>
                        <td className="py-2 text-text-secondary">{visit.page}</td>
                      </tr>
                    ))}
                    {analytics.visits.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-text-secondary">No visits recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contact Settings Tab */}
        {activeTab === "contact" && (
          <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Contact Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary block mb-1">WhatsApp Primary</label>
                <input value={whatsapp1} onChange={(e) => setWhatsapp1(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-text-secondary block mb-1">WhatsApp Secondary</label>
                <input value={whatsapp2} onChange={(e) => setWhatsapp2(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-text-secondary block mb-1">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              </div>
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram URL" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="TikTok URL" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="X (Twitter) URL" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
              <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="bg-navy-900 border border-white/10 rounded-lg p-3 text-white" />
            </div>
          </div>
        )}

        {/* Project Links Tab */}
        {activeTab === "projects" && (
          <div className="bg-navy-800 p-4 sm:p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Project Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "HeatFlow Experts",
                "Izoduwa Asemota",
                "Migrants Welfare",
                "Vine Interiors",
                "Edo Youth Impact Forum",
                "Health Career Boost",
                "Kiid Africa",
                "Tech Scholar",
                "SiC Africa",
                "TriFRM",
                "Cyan University",
              ].map((project) => (
                <div key={project}>
                  <label className="text-sm text-text-secondary block mb-1">{project}</label>
                  <input
                    value={projectLinks[project] || ""}
                    onChange={(e) => handleProjectLinkChange(project, e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-navy-900 border border-white/10 rounded-lg p-3 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        {(activeTab === "contact" || activeTab === "projects") && (
          <button
            onClick={handleSave}
            className="w-full mt-6 bg-gradient-to-r from-accent-blue to-accent-violet text-white font-bold py-3 rounded-lg text-lg hover:shadow-glow transition-shadow"
          >
            Save All Changes
          </button>
        )}
      </div>
    </div>
  );
}