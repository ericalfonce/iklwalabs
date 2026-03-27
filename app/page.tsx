"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import MulikaScans from "@/components/sections/MulikaScans";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setHeroReady(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero animate={heroReady} />
        <About />
        <Services />
        <MulikaScans />
        <Contact />
      </motion.div>
    </>
  );
}
