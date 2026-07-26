"use client";

import { forwardRef, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What does IklwaLabs do?",
    answer:
      "IklwaLabs is a cybersecurity and IT solutions company based in Arusha, Tanzania. We help African businesses find and fix security weaknesses before attackers do — through web vulnerability assessments, digital forensics, security training, and IT infrastructure support.",
  },
  {
    question: "How does a web vulnerability scan work?",
    answer:
      "We combine automated scanning with manual verification against the OWASP Top 10 and other common attack classes, then deliver a plain-language report ranking issues by severity with concrete remediation steps — not a generic checklist.",
  },
  {
    question: "How much does an assessment cost?",
    answer:
      "Pricing depends on the size and complexity of what's being assessed. Reach out with a brief description of your systems and we'll send a scoped quote.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "Most web vulnerability assessments take a few business days from kickoff to report delivery. Digital forensics and incident response timelines depend on the scope of the incident.",
  },
  {
    question: "Do you work with organizations outside Tanzania?",
    answer:
      "Yes. We work with SMEs and institutions across East Africa, and can support remote engagements more broadly.",
  },
  {
    question: "Is our data safe during an assessment?",
    answer:
      "Assessments are scoped and authorized in advance, evidence and findings are handled confidentially, and we follow standard responsible-disclosure practice for anything discovered.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function FAQ() {
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
          stagger: 0.08,
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
      className="bg-navy-deep min-h-[100dvh] py-6 px-8 flex flex-col"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section label */}
      <div className="flex justify-between items-center mb-16 pt-4">
        <span className="font-mono text-[12px] text-muted tracking-[0.2em] uppercase">
          Frequently Asked Questions
        </span>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /05
        </span>
      </div>

      {/* FAQ list */}
      <div className="flex-1 max-w-[760px] w-full">
        {FAQS.map((faq, i) => (
          <FAQItem
            key={faq.question}
            faq={faq}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string };
}

const FAQItem = forwardRef<HTMLDivElement, FAQItemProps>(({ faq }, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {/* Top rule */}
      <div className="h-px w-full bg-[rgba(248,250,252,0.05)]" />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer bg-transparent border-none"
      >
        <span className="font-display font-medium text-[clamp(1rem,1.6vw,1.25rem)] text-white tracking-[-0.01em]">
          {faq.question}
        </span>
        <span
          className={`font-mono text-[18px] text-cyan shrink-0 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-[160px]" : "max-h-0"
        }`}
      >
        <p className="font-sans text-[15px] leading-[1.7] text-muted m-0 pb-6 max-w-[64ch]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";
