"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCAN_LINES: { tag: string; text: string; tagColor: string }[] = [
  { tag: ">",      text: " Scanning: example-sme.co.tz",                        tagColor: "#22D3EE" },
  { tag: "[INFO]", text: " Crawling site structure...",                          tagColor: "#94A3B8" },
  { tag: "[WARN]", text: " SQL Injection vector detected — /login",              tagColor: "#FBBF24" },
  { tag: "[WARN]", text: " Missing X-Frame-Options header",                      tagColor: "#FBBF24" },
  { tag: "[OK]  ", text: " HTTPS enforced",                                      tagColor: "#22D3EE" },
  { tag: "[CRIT]", text: " Exposed admin panel — /admin",                        tagColor: "#F87171" },
  { tag: ">",      text: " Report generated. 3 critical, 2 warnings.",           tagColor: "#22D3EE" },
];

const TICKER_TEXT =
  "MULIKA · LINDA · SALAMA · MULIKASCANS · WEB SECURITY · EAST AFRICA · AUTOMATED SCANNING · AI TRIAGE · ";

const FEATURE_PILLS = ["Automated Scanning", "AI Triage", "Plain-Language Reports"];

export default function MulikaScans() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const lines = linesRef.current.filter(Boolean);
      if (!lines.length) return;

      gsap.fromTo(
        lines,
        { opacity: 0, x: -6 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.22,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
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
        padding: "1.5rem 2rem 0",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        // Radial glow
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)",
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
        /03
      </span>

      {/* Two-column body */}
      <div
        className="two-col-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "60fr 40fr",
          gap: "5rem",
          alignItems: "start",
          paddingBottom: "5rem",
        }}
      >
        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "#22D3EE",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Flagship Product
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              color: "#F8FAFC",
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            MulikaScans
          </h2>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.6rem)",
              fontWeight: 300,
              color: "#94A3B8",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            AI-Powered Web Vulnerability Scanner for African SMEs
          </p>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#94A3B8",
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            Most African SMEs can&apos;t afford enterprise security tools.
            MulikaScans changes that — automated web vulnerability scanning,
            plain-language reports, and actionable remediation steps. Built for
            businesses that need to know they&apos;re safe.
          </p>

          {/* Feature pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {FEATURE_PILLS.map((pill) => (
              <span
                key={pill}
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "12px",
                  color: "#94A3B8",
                  border: "1px solid rgba(34, 211, 238, 0.30)",
                  borderRadius: "999px",
                  padding: "0.3rem 0.9rem",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div>
            <CTAButton href="https://mulikascans.com">
              Visit mulikascans.com →
            </CTAButton>
          </div>
        </div>

        {/* ── Right column — terminal ── */}
        <div
          className="terminal-sticky"
          style={{
            backgroundColor: "#0A1628",
            border: "1px solid rgba(34, 211, 238, 0.10)",
            borderRadius: "8px",
            overflow: "hidden",
            position: "sticky",
            top: "2rem",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(248, 250, 252, 0.05)",
              backgroundColor: "rgba(5, 12, 26, 0.6)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EAB308", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                color: "#94A3B8",
                marginLeft: "0.5rem",
                letterSpacing: "0.05em",
              }}
            >
              mulika — scan report
            </span>
          </div>

          {/* Scan output */}
          <div
            style={{
              padding: "1.25rem 1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {SCAN_LINES.map((line, i) => (
              <div
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: "0.5rem",
                  opacity: 0, // GSAP reveals
                }}
              >
                <span style={{ color: line.tagColor, flexShrink: 0, minWidth: "3.5rem" }}>
                  {line.tag}
                </span>
                <span style={{ color: "#94A3B8" }}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee ticker ── */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid rgba(248, 250, 252, 0.04)",
          padding: "1rem 0",
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 28s linear infinite",
          }}
        >
          {/* Duplicate for seamless loop */}
          {[0, 1].map((n) => (
            <span
              key={n}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "12px",
                color: "rgba(248, 250, 252, 0.25)",
                letterSpacing: "0.15em",
                paddingRight: "2rem",
              }}
            >
              {TICKER_TEXT.repeat(6)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Button ── */
function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: "13px",
        letterSpacing: "0.06em",
        color: "#22D3EE",
        border: "1px solid #22D3EE",
        padding: "0.7rem 1.5rem",
        borderRadius: "2px",
        textDecoration: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "#22D3EE";
        el.style.color = "#050C1A";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "transparent";
        el.style.color = "#22D3EE";
      }}
    >
      {children}
    </a>
  );
}
