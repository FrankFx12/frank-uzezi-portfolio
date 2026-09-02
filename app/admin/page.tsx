"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/tracking";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Data states
  const [whatsapp1, setWhatsapp1] = useState("");
  const [whatsapp2, setWhatsapp2] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [projectLinks, setProjectLinks] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState("dashboard");

  // Load config from Supabase on mount
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
      
      // Load project links
      const { data: projData } = await supabase.from('project_links').select('*');
      if (projData) {
        const links: { [key: string]: string } = {};
        projData.forEach((item: any) => {
          links[item.project_name] = item.link;
        });
        setProjectLinks(links);
      }
    };
    loadConfig();
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Frank12" && password === "134679") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  // Save to Supabase
  const handleSave = async () => {
    // Update site_config
    const { error: configError } = await supabase.from('site_config').update({
      whatsapp_primary: whatsapp1,
      whatsapp_secondary: whatsapp2,
      email: email,
      instagram: instagram,
      tiktok: tiktok,
      twitter: twitter,
      linkedin: linkedin,
    }).eq('id', 1);

    if (configError) {
      alert("Error saving config: " + configError.message);
      return;
    }

    // Update project_links
    // Delete existing
    await supabase.from('project_links').delete().neq('id', 0);
    // Insert new
    const projectEntries = Object.entries(projectLinks).map(([project_name, link]) => ({
      project_name,
      link,
    }));
    if (projectEntries.length > 0) {
      const { error: projError } = await supabase.from('project_links').insert(projectEntries);
      if (projError) {
        alert("Error saving project links: " + projError.message);
        return;
      }
    }

    alert("Saved successfully! Changes are now live for ALL visitors.");
    router.refresh();
  };

  if (!isLoggedIn) {
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

  return (
    <div className="min-h-screen bg-navy-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 hover:text-red-400">Logout</button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveTab("dashboard")} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "dashboard" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}>Dashboard</button>
          <button onClick={() => setActiveTab("contact")} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "contact" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}>Contact Settings</button>
          <button onClick={() => setActiveTab("projects")} className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "projects" ? "bg-accent-blue text-white" : "bg-navy-800 text-text-secondary"}`}>Project Links</button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="bg-navy-800 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Welcome, Frank!</h2>
            <p className="text-text-secondary">Use the tabs above to manage your contact information and project links.</p>
            <div className="mt-6 bg-navy-900 p-4 rounded-lg">
              <p className="text-accent-blue font-bold">Your changes now save directly to Supabase.</p>
              <p className="text-text-secondary text-sm mt-2">This means every update you make here will show for ALL visitors on your live site instantly!</p>
            </div>
          </div>
        )}

        {/* Contact Settings Tab */}
        {activeTab === "contact" && (
          <div className="bg-navy-800 p-6 rounded-2xl border border-white/10">
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
          <div className="bg-navy-800 p-6 rounded-2xl border border-white/10">
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
                    onChange={(e) => setProjectLinks((prev) => ({ ...prev, [project]: e.target.value }))}
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