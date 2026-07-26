"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HeroProps {
  animate: boolean;
}

export default function Hero({ animate }: HeroProps) {
  const headlineRef = useRef<HTMLDivElement>(null);

  // GSAP headline animation — triggers when loading screen is done
  useEffect(() => {
    if (!animate || !headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, [animate]);

  const headline = "Securing Africa's Digital Future";
  const words = headline.split(" ");

  return (
    <section className="relative w-full h-[100dvh] bg-navy-deep overflow-hidden py-6 px-8 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-start">
        {/* Logo + cursor */}
        <span className="font-display text-[14px] text-white tracking-[0.06em]">
          IklwaLabs
          <BlinkingCursor />
        </span>

        {/* Live clock */}
        <span className="font-mono text-[13px] text-muted tracking-[0.05em]">
          Local Time — ARU&nbsp;&nbsp;
          <LiveClock />
        </span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col justify-center pb-8">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="hero-headline font-display font-bold text-[clamp(3rem,11vw,10rem)] leading-none text-white tracking-[-0.02em] flex flex-wrap gap-[0.28em]"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`word inline-block ${animate ? "" : "opacity-0"}`}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div className="font-mono text-[12px] text-muted tracking-[0.2em] mt-8 uppercase">
          EST. 2024 — ARUSHA, TZ
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end">
        {/* Page index */}
        <span className="font-mono text-[12px] text-muted tracking-[0.1em]">
          /01
        </span>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[11px] text-muted tracking-[0.15em] uppercase">
            scroll
          </span>
          <ScrollArrow />
        </div>
      </div>
    </section>
  );
}

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Dar_es_Salaam",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-white">{time}</span>;
}

function BlinkingCursor() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="text-cyan ml-[2px] transition-opacity duration-100"
      style={{ opacity: visible ? 1 : 0 }}
    >
      |
    </span>
  );
}

function ScrollArrow() {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <style>{`
        @keyframes arrow-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(5px); opacity: 1; }
        }
        .scroll-arrow { animation: arrow-bounce 1.6s ease-in-out infinite; }
      `}</style>
      <g className="scroll-arrow">
        <line x1="8" y1="0" x2="8" y2="14" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="3,10 8,16 13,10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
