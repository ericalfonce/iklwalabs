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
      className="relative bg-navy-deep min-h-screen pt-6 px-8 pb-0 flex flex-col overflow-hidden"
      style={{
        // Radial glow
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)",
      }}
    >
      {/* Section number */}
      <span className="font-mono text-[12px] text-muted tracking-[0.12em] mb-12">
        /03
      </span>

      {/* Two-column body */}
      <div
        className="two-col-grid flex-1 grid gap-20 items-start pb-20"
        style={{ gridTemplateColumns: "60fr 40fr" }}
      >
        {/* ── Left column ── */}
        <div className="flex flex-col gap-7">
          {/* Eyebrow */}
          <span className="font-mono text-[11px] text-cyan tracking-[0.22em] uppercase">
            Flagship Product
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-none text-white m-0 tracking-[-0.03em]">
            MulikaScans
          </h2>

          {/* Subheadline */}
          <p className="font-display text-[clamp(1rem,2vw,1.6rem)] font-light text-muted m-0 leading-[1.4]">
            AI-Powered Web Vulnerability Scanner for African SMEs
          </p>

          {/* Body */}
          <p className="font-sans text-[16px] leading-[1.8] text-muted m-0 max-w-[56ch]">
            Most African SMEs can&apos;t afford enterprise security tools.
            MulikaScans changes that — automated web vulnerability scanning,
            plain-language reports, and actionable remediation steps. Built for
            businesses that need to know they&apos;re safe.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-[0.6rem]">
            {FEATURE_PILLS.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[12px] text-muted border border-[rgba(34,211,238,0.30)] rounded-full py-[0.3rem] px-[0.9rem] tracking-[0.04em] whitespace-nowrap"
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
        <div className="terminal-sticky bg-navy border border-[rgba(34,211,238,0.10)] rounded-lg overflow-hidden sticky top-8">
          {/* Window chrome */}
          <div className="flex items-center gap-2 py-3 px-4 border-b border-[rgba(248,250,252,0.05)] bg-[rgba(5,12,26,0.6)]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#EF4444] inline-block" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#EAB308] inline-block" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#22C55E] inline-block" />
            <span className="font-mono text-[11px] text-muted ml-2 tracking-[0.05em]">
              mulika — scan report
            </span>
          </div>

          {/* Scan output */}
          <div className="pt-5 px-5 pb-6 flex flex-col gap-[0.6rem]">
            {SCAN_LINES.map((line, i) => (
              <div
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                className="font-mono text-[12px] leading-[1.6] flex gap-2"
                style={{ opacity: 0 }} // GSAP reveals
              >
                <span style={{ color: line.tagColor }} className="shrink-0 min-w-[3.5rem]">
                  {line.tag}
                </span>
                <span className="text-muted">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee ticker ── */}
      <div className="w-full overflow-hidden border-t border-[rgba(248,250,252,0.04)] py-4">
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 28s linear infinite" }}
        >
          {/* Duplicate for seamless loop */}
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-mono text-[12px] text-[rgba(248,250,252,0.25)] tracking-[0.15em] pr-8"
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
      className="inline-block font-mono text-[13px] tracking-[0.06em] text-cyan border border-cyan py-[0.7rem] px-6 rounded-[2px] no-underline transition-colors duration-300 hover:bg-cyan hover:text-navy-deep"
    >
      {children}
    </a>
  );
}
