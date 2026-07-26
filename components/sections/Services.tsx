"use client";

import { useRef } from "react";
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
      className="bg-navy min-h-screen py-6 px-8 flex flex-col"
    >
      {/* Section label */}
      <div className="flex justify-between items-center mb-16 pt-4">
        <span className="font-mono text-[12px] text-muted tracking-[0.2em] uppercase">
          Core Capabilities
        </span>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /03
        </span>
      </div>

      {/* Service list */}
      <div className="flex-1 max-w-[900px] w-full">
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
    return (
      <div ref={ref} style={{ opacity: 0 }}>
        {/* Top rule */}
        <div className="h-px w-full bg-[rgba(248,250,252,0.05)]" />

        <div className="group grid grid-cols-[3rem_1fr] gap-6 py-7 cursor-default">
          {/* Number */}
          <span className="font-mono text-[13px] text-cyan tracking-[0.05em] pt-[3px] shrink-0">
            {service.number}
          </span>

          {/* Title + description */}
          <div>
            <div className="font-display font-medium text-[clamp(1.1rem,2vw,1.5rem)] text-white tracking-[-0.01em] transition-colors duration-200 group-hover:text-cyan">
              {service.title}
            </div>

            {/* Expandable description */}
            <div className="overflow-hidden max-h-0 group-hover:max-h-[120px] transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
              <p className="font-sans text-[15px] leading-[1.7] text-muted m-0 pt-3 max-w-[60ch]">
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
