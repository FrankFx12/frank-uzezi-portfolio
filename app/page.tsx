"use client";

import { useEffect, useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Projects } from "@/components/sections/Projects";
import { Technologies } from "@/components/sections/Technologies";
import { WhyMe } from "@/components/sections/WhyMe";
import { Process } from "@/components/sections/Process";
import { Impact } from "@/components/sections/Impact";
import { CTASection } from "@/components/sections/CTASection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { trackVisit } from "@/lib/utils/tracking";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track every visit
    trackVisit();

    // Preloader duration (matches Preloader component)
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className="bg-navy-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Projects />
      <Technologies />
      <WhyMe />
      <Process />
      <Impact />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}