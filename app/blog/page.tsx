import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Cybersecurity insights, security tips, and IT news for African SMEs from IklwaLabs.",
};

export default function BlogPage() {
  return (
    <main
      style={{
        backgroundColor: "#050C1A",
        minHeight: "100vh",
        padding: "1.5rem 2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "6rem",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "14px",
            color: "#F8FAFC",
            letterSpacing: "0.06em",
            textDecoration: "none",
          }}
        >
          ← IklwaLabs
        </a>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "12px",
            color: "#94A3B8",
            letterSpacing: "0.12em",
          }}
        >
          /blog
        </span>
      </div>

      {/* Heading */}
      <div style={{ maxWidth: "720px" }}>
        <h1
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            lineHeight: 1.05,
            color: "#F8FAFC",
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Insights
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            color: "#94A3B8",
            margin: "0 0 4rem",
            lineHeight: 1.7,
          }}
        >
          Cybersecurity insights for African businesses.
        </p>

        {/* Placeholder card */}
        <div
          style={{
            border: "1px solid rgba(34, 211, 238, 0.12)",
            padding: "2rem",
            maxWidth: "480px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "#22D3EE",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Coming Soon
          </span>
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#F8FAFC",
              margin: "0 0 0.5rem",
            }}
          >
            First post coming soon
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              color: "#64748B",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            We&apos;re preparing cybersecurity articles tailored for African
            SMEs. Stay tuned.
          </p>
        </div>
      </div>
    </main>
  );
}
