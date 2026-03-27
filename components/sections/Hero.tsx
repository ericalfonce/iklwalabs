"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HeroProps {
  animate: boolean;
}

export default function Hero({ animate }: HeroProps) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Live clock — Africa/Dar_es_Salaam
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        timeZone: "Africa/Dar_es_Salaam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    }
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

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
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#050C1A",
        overflow: "hidden",
        padding: "1.5rem 2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Logo + cursor */}
        <span
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "14px",
            color: "#F8FAFC",
            letterSpacing: "0.06em",
          }}
        >
          IklwaLabs
          <span
            style={{
              color: "#22D3EE",
              opacity: cursorVisible ? 1 : 0,
              transition: "opacity 0.1s",
              marginLeft: "2px",
            }}
          >
            |
          </span>
        </span>

        {/* Live clock */}
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "13px",
            color: "#94A3B8",
            letterSpacing: "0.05em",
          }}
        >
          Local Time — ARU&nbsp;&nbsp;
          <span style={{ color: "#F8FAFC" }}>{time}</span>
        </span>
      </div>

      {/* Center content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "2rem",
        }}
      >
        {/* Headline */}
        <div
          ref={headlineRef}
          className="hero-headline"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(3rem, 11vw, 10rem)",
            lineHeight: 1.0,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.28em",
            columnGap: "0.28em",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word"
              style={{
                display: "inline-block",
                opacity: animate ? undefined : 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.2em",
            marginTop: "2rem",
            textTransform: "uppercase",
          }}
        >
          EST. 2024 — ARUSHA, TZ
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Page index */}
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.1em",
          }}
        >
          /01
        </span>

        {/* Scroll indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "#94A3B8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <ScrollArrow />
        </div>
      </div>
    </section>
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
      style={{ overflow: "visible" }}
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
