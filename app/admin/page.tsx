"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Frank12" && password === "134679") {
      setIsLoggedIn(true);
      setError("");
      // Load saved config from localStorage
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
    // Refresh the page to see changes on main site
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
    <div className="min-h-screen bg-navy-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Logout
          </button>
        </div>

        {/* Contact Info Section */}
        <div className="bg-navy-800 p-6 rounded-2xl border border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary block mb-1">WhatsApp 1</label>
              <input value={whatsapp1} onChange={(e) => setWhatsapp1(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label className="text-sm text-text-secondary block mb-1">WhatsApp 2</label>
              <input value={whatsapp2} onChange={(e) => setWhatsapp2(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-text-secondary block mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-navy-800 p-6 rounded-2xl border border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram URL" className="bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            <input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="TikTok URL" className="bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="X (Twitter) URL" className="bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
            <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="bg-navy-900 border border-white/10 rounded-lg p-2 text-white" />
          </div>
        </div>

        {/* Project Links Section */}
        <div className="bg-navy-800 p-6 rounded-2xl border border-white/10 mb-6">
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
                  className="w-full bg-navy-900 border border-white/10 rounded-lg p-2 text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-accent-blue to-accent-violet text-white font-bold py-3 rounded-lg text-lg hover:shadow-glow transition-shadow"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}