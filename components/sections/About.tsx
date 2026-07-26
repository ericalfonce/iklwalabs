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
      className="relative bg-navy-deep min-h-screen py-6 px-8 flex flex-col overflow-hidden"
    >
      {/* Section number */}
      <span className="font-mono text-[12px] text-muted tracking-[0.12em] mb-12">
        /02
      </span>

      {/* Main content area */}
      <div className="two-col-grid flex-1 grid grid-cols-2 gap-16 items-start pt-16 pb-24">
        {/* Left column — headline + body */}
        <div className="flex flex-col gap-10">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2rem,5vw,5rem)] leading-[1.1] text-white m-0 font-bold tracking-[-0.02em]"
          >
            Not an agency —{" "}
            <em className="italic font-light text-white">just us.</em>
          </h2>

          <p className="font-sans text-[18px] leading-[1.8] text-muted m-0 max-w-[52ch]">
            IklwaLabs is a cybersecurity and IT solutions company based in Arusha, Tanzania. We build tools and services that make digital
            security accessible to African businesses — from SMEs to
            institutions. We believe the continent&apos;s digital future must be
            defended from within.
          </p>
        </div>

        {/* Right column — stat blocks (off-grid) */}
        <div className="flex flex-col gap-8 pt-20">
          <StatBlock
            ref={stat1Ref}
            rotation="-1.5deg"
            label="Founded 2024 · Arusha, Tanzania"
          />
          <StatBlock
            ref={stat2Ref}
            rotation="1deg"
            label="IklwaLabs · Digital Forensics & Cybersecurity"
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
        className={`border border-[rgba(34,211,238,0.10)] p-5 max-w-[280px] ${
          alignRight ? "self-end" : "self-start"
        }`}
        style={{
          transform: `rotate(${rotation})`,
          opacity: 0, // GSAP will animate this
        }}
      >
        <span className="font-mono text-[12px] text-muted tracking-[0.08em] leading-[1.6]">
          {label}
        </span>
      </div>
    );
  }
);

StatBlock.displayName = "StatBlock";
