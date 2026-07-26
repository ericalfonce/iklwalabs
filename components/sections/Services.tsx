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
    details: [
      "OWASP Top 10 coverage across authenticated & unauthenticated scans",
      "Manual verification to cut false positives",
      "Plain-language report with prioritized remediation steps",
    ],
  },
  {
    number: "02",
    title: "Digital Forensics & Incident Response",
    description:
      "Evidence collection, analysis, and post-incident reporting for organizations across East Africa.",
    details: [
      "Evidence preservation following chain-of-custody practice",
      "Root-cause analysis and incident timeline reconstruction",
      "Post-incident report suitable for management and legal review",
    ],
  },
  {
    number: "03",
    title: "Security Awareness & Training",
    description:
      "Practical cybersecurity training for teams, institutions, and communities.",
    details: [
      "Phishing and social-engineering simulations",
      "Role-specific sessions for staff, IT teams, and leadership",
      "Practical playbooks, not just slides",
    ],
  },
  {
    number: "04",
    title: "IT Infrastructure & Solutions",
    description:
      "Network setup, configuration, and hardening for small-to-medium organizations.",
    details: [
      "Network segmentation and firewall configuration",
      "Endpoint and access-control hardening",
      "Ongoing monitoring and patch-management guidance",
    ],
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
    details: string[];
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
            <div className="overflow-hidden max-h-0 group-hover:max-h-[260px] transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
              <p className="font-sans text-[15px] leading-[1.7] text-muted m-0 pt-3 max-w-[60ch]">
                {service.description}
              </p>
              <ul className="font-sans text-[13px] leading-[1.6] text-muted m-0 mt-3 pl-4 max-w-[60ch] list-disc space-y-1">
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServiceItem.displayName = "ServiceItem";
