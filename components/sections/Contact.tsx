"use client";

import { useState } from "react";

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com" },
  { label: "GitHub",    href: "https://github.com/iklwalabs" },
  { label: "Instagram", href: "https://instagram.com/iklwalabs" },
];

export default function Contact() {
  return (
    <section
      style={{
        backgroundColor: "#050C1A",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "1.5rem 2rem 0",
        boxSizing: "border-box",
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
        /04
      </span>

      {/* Center body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "2rem",
          paddingBottom: "6rem",
        }}
      >
        {/* Main headline */}
        <h2
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 5rem)",
            lineHeight: 1.1,
            color: "#F8FAFC",
            margin: 0,
            letterSpacing: "-0.02em",
            maxWidth: "16ch",
          }}
        >
          Let&apos;s build a safer digital Africa.
        </h2>

        {/* Contact block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              color: "#94A3B8",
            }}
          >
            Reach out at:
          </span>
          <a
            href="mailto:support@mulikascans.com"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "15px",
              color: "#22D3EE",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            support@mulikascans.com
          </a>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          borderTop: "1px solid rgba(248, 250, 252, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 0",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "11px",
            color: "#94A3B8",
            letterSpacing: "0.06em",
          }}
        >
          IklwaLabs © 2025 — Arusha, Tanzania
        </span>
        <a
          href="https://mulikascans.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "11px",
            color: "#94A3B8",
            textDecoration: "none",
            letterSpacing: "0.06em",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#22D3EE"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#94A3B8"; }}
        >
          mulikascans.com
        </a>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px",
        color: "#94A3B8",
        textDecoration: hovered ? "underline" : "none",
        textDecorationColor: "#22D3EE",
        transition: "color 0.2s ease",
        ...(hovered && { color: "#22D3EE" }),
      }}
    >
      {label}
    </a>
  );
}
