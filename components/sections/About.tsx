"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current || !stat1Ref.current || !stat2Ref.current) return;

      // Clip-path reveal on the headline
      gsap.fromTo(
        headlineRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stat blocks staggered fade + drift
      gsap.fromTo(
        [stat1Ref.current, stat2Ref.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: stat1Ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#050C1A",
        minHeight: "100vh",
        padding: "1.5rem 2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section number */}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "12px",
          color: "#94A3B8",
          letterSpacing: "0.12em",
          marginBottom: "3rem",
        }}
      >
        /02
      </span>

      {/* Main content area */}
      <div
        className="two-col-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
          paddingTop: "4rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Left column — headline + body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              lineHeight: 1.1,
              color: "#F8FAFC",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Not an agency —{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "#F8FAFC",
              }}
            >
              just us.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#94A3B8",
              margin: 0,
              maxWidth: "52ch",
            }}
          >
            IklwaLabs is a cybersecurity and IT solutions company based in Dar es
            Salaam, Tanzania. We build tools and services that make digital
            security accessible to African businesses — from SMEs to
            institutions. We believe the continent&apos;s digital future must be
            defended from within.
          </p>
        </div>

        {/* Right column — stat blocks (off-grid) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingTop: "5rem",
          }}
        >
          <StatBlock
            ref={stat1Ref}
            rotation="-1.5deg"
            label="Founded 2024 · Arusha, Tanzania"
          />
          <StatBlock
            ref={stat2Ref}
            rotation="1deg"
            label="IklwaLabs · Digital Forensics &amp; Cybersecurity"
            alignRight
          />
        </div>
      </div>
    </section>
  );
}

import { forwardRef } from "react";

interface StatBlockProps {
  label: string;
  rotation: string;
  alignRight?: boolean;
}

const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(
  ({ label, rotation, alignRight }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          border: "1px solid rgba(34, 211, 238, 0.10)",
          padding: "20px",
          transform: `rotate(${rotation})`,
          alignSelf: alignRight ? "flex-end" : "flex-start",
          maxWidth: "280px",
          opacity: 0, // GSAP will animate this
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      </div>
    );
  }
);

StatBlock.displayName = "StatBlock";
