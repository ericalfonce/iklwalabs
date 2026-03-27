"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Web Vulnerability Assessment",
    description:
      "Automated and manual scanning of web applications. We find what attackers find — before they do.",
  },
  {
    number: "02",
    title: "Digital Forensics & Incident Response",
    description:
      "Evidence collection, analysis, and post-incident reporting for organizations across East Africa.",
  },
  {
    number: "03",
    title: "Security Awareness & Training",
    description:
      "Practical cybersecurity training for teams, institutions, and communities.",
  },
  {
    number: "04",
    title: "IT Infrastructure & Solutions",
    description:
      "Network setup, configuration, and hardening for small-to-medium organizations.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const items = itemsRef.current.filter(Boolean);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
        backgroundColor: "#0A1628",
        minHeight: "100vh",
        padding: "1.5rem 2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "4rem",
          paddingTop: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Core Capabilities
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.12em",
          }}
        >
          /03
        </span>
      </div>

      {/* Service list */}
      <div style={{ flex: 1, maxWidth: "900px", width: "100%" }}>
        {SERVICES.map((service, i) => (
          <ServiceItem
            key={service.number}
            service={service}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

import { forwardRef } from "react";

interface ServiceItemProps {
  service: {
    number: string;
    title: string;
    description: string;
  };
}

const ServiceItem = forwardRef<HTMLDivElement, ServiceItemProps>(
  ({ service }, ref) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div ref={ref} style={{ opacity: 0 }}>
        {/* Top rule */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(248, 250, 252, 0.05)",
            width: "100%",
          }}
        />

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "3rem 1fr",
            gap: "1.5rem",
            padding: "1.75rem 0",
            cursor: "default",
          }}
        >
          {/* Number */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "13px",
              color: "#22D3EE",
              letterSpacing: "0.05em",
              paddingTop: "3px",
              flexShrink: 0,
            }}
          >
            {service.number}
          </span>

          {/* Title + description */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "#F8FAFC",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
                ...(hovered && { color: "#22D3EE" }),
              }}
            >
              {service.title}
            </div>

            {/* Expandable description */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: hovered ? "120px" : "0px",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#94A3B8",
                  margin: 0,
                  paddingTop: "0.75rem",
                  maxWidth: "60ch",
                }}
              >
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServiceItem.displayName = "ServiceItem";
