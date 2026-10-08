"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * What `sentinel doctor` prints on a working machine.
 *
 * Every line is something the application actually reports, and none of it is claimed
 * unconditionally: a machine without Npcap gets the driver line as an error, which is the
 * behaviour the product documents. Keeping the sample honest matters, because the whole point
 * of the product is that it does not overstate what it can do.
 */
const DOCTOR_LINES: { tag: string; text: string; tagColor: string }[] = [
  { tag: ">",      text: " sentinel doctor",                                tagColor: "#22D3EE" },
  { tag: "[OK]",   text: " capture driver: Npcap 1.89",                    tagColor: "#22D3EE" },
  { tag: "[OK]",   text: " privileges: elevated",                           tagColor: "#22D3EE" },
  { tag: "[OK]",   text: " interfaces: 14 capturable",                      tagColor: "#22D3EE" },
  { tag: "[OK]",   text: " database: SQLite, schema v2",                   tagColor: "#22D3EE" },
  { tag: "[OK]",   text: " outbound connections: 0 — nothing leaves",       tagColor: "#22D3EE" },
];

const FEATURE_PILLS = [
  "Windows",
  "Linux",
  "macOS",
  "Android",
  "Apache-2.0",
  "No telemetry",
];

export default function Sentinel() {
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
      // The id is for deep links. A blog post already links to /#mulikascans, so this is the
      // convention for pointing at a specific product block from elsewhere on the site.
      id="sentinel"
      className="relative bg-navy-deep min-h-[100dvh] pt-6 px-8 pb-0 flex flex-col overflow-hidden"
      style={{
        // Same radial wash as the MulikaScans section, weighted to the other side so the two
        // flagship blocks read as a pair rather than a repeat.
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 40% 40%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)",
      }}
    >
      {/* Section number */}
      <span className="font-mono text-[12px] text-muted tracking-[0.12em] mb-12">
        /05
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
            Open Source · Download
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-none text-white m-0 tracking-[-0.03em]">
            Sentinel
          </h2>

          {/* Subheadline */}
          <p className="font-display text-[clamp(1rem,2vw,1.6rem)] font-light text-muted m-0 leading-[1.4]">
            Local-first network visibility and threat detection
          </p>

          {/* Body */}
          <p className="font-sans text-[16px] leading-[1.8] text-muted m-0 max-w-[56ch]">
            See what your machine is actually sending and receiving. Sentinel
            reconstructs connections from live traffic, stores them in a local
            database, and shows them to you — no account, no cloud service, and no
            code path that opens an outbound connection.
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
            <Link
              href="/sentinel"
              className="inline-block font-mono text-[13px] tracking-[0.06em] text-cyan border border-cyan py-[0.7rem] px-6 rounded-[2px] no-underline transition-colors duration-300 hover:bg-cyan hover:text-navy-deep"
            >
              Download for your platform →
            </Link>
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
              sentinel — doctor
            </span>
          </div>

          {/* Output */}
          <div className="pt-5 px-5 pb-6 flex flex-col gap-[0.6rem]">
            {DOCTOR_LINES.map((line, i) => (
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
    </section>
  );
}