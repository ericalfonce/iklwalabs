"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const STICKERS = [
  {
    text: "[ CVE-2024-PATCHED ]",
    color: "#22D3EE",
    pos: { top: "9%", left: "3%" },
    rotate: "-2deg",
    delay: 0.2,
  },
  {
    text: "! THREAT NEUTRALIZED",
    color: "#EF4444",
    pos: { top: "7%", right: "3%" },
    rotate: "2.5deg",
    delay: 0.35,
  },
  {
    text: "RECON: COMPLETE",
    color: "#22D3EE",
    pos: { top: "22%", left: "4%" },
    rotate: "1.5deg",
    delay: 0.5,
  },
  {
    text: "ENCRYPTED · AES-256",
    color: "#94A3B8",
    pos: { top: "42%", left: "2%" },
    rotate: "-3deg",
    delay: 0.65,
  },
  {
    text: "FIREWALL: ACTIVE",
    color: "#94A3B8",
    pos: { top: "38%", right: "2%" },
    rotate: "2deg",
    delay: 0.55,
  },
  {
    text: "// ZERO-DAY: BLOCKED",
    color: "#F59E0B",
    pos: { bottom: "20%", left: "3%" },
    rotate: "-1.5deg",
    delay: 0.7,
  },
  {
    text: "SEC_AUDIT: PASS",
    color: "#22D3EE",
    pos: { bottom: "14%", right: "3%" },
    rotate: "1deg",
    delay: 0.8,
  },
  {
    text: "VULN_SCORE: 0.0",
    color: "#F59E0B",
    pos: { bottom: "33%", right: "4%" },
    rotate: "-2deg",
    delay: 0.45,
  },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [dark, setDark] = useState(false);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  // Stage 1: trigger bg transition at 400ms.
  // Dismiss only when user scrolls / swipes / presses Space|ArrowDown.
  // While visible, body scroll is locked.
  useEffect(() => {
    const t1 = setTimeout(() => setDark(true), 400);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Minimum dwell: don't let an accidental early scroll dismiss before
    // the spear has finished drawing (~2.4 s). Respect user intent after that.
    let canDismiss = false;
    const unlockDismiss = setTimeout(() => { canDismiss = true; }, 2400);

    function dismiss() {
      if (!canDismiss) return;
      document.body.style.overflow = "";
      setVisible(false);
    }

    // Wheel — any downward scroll
    function onWheel(e: WheelEvent) {
      if (e.deltaY > 0) dismiss();
    }
    // Touch swipe up
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (touchStartY - e.touches[0].clientY > 30) dismiss();
    }
    // Keyboard: Space / ArrowDown / PageDown / Enter
    function onKey(e: KeyboardEvent) {
      if (["Space", "ArrowDown", "PageDown", "Enter"].includes(e.code)) dismiss();
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(unlockDismiss);
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Irregular counter: random increments, random delays
  useEffect(() => {
    let val = 0;
    let mounted = true;
    let tid: ReturnType<typeof setTimeout>;

    function step() {
      if (!mounted) return;
      const remaining = 100 - val;
      const inc =
        remaining > 40
          ? Math.floor(Math.random() * 6) + 3
          : Math.floor(Math.random() * 2) + 1;
      val = Math.min(100, val + inc);
      setCount(val);
      if (val < 100) {
        const delay =
          remaining > 50
            ? 45 + Math.random() * 55
            : 90 + Math.random() * 100;
        tid = setTimeout(step, delay);
      } else {
        setReady(true);
      }
    }

    tid = setTimeout(step, 650);
    return () => {
      mounted = false;
      clearTimeout(tid);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loading"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#050C1A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── CSS animation keyframes ── */}
          <style>{`
            @keyframes blade-draw {
              from { stroke-dashoffset: 220; }
              to   { stroke-dashoffset: 0; }
            }
            @keyframes blade-fill-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes shaft-draw {
              from { stroke-dashoffset: 96; }
              to   { stroke-dashoffset: 0; }
            }
            @keyframes glow-appear {
              from { opacity: 0; transform: scale(0.4); }
              to   { opacity: 1; transform: scale(1); }
            }
            @keyframes glow-pulse {
              0%, 100% { opacity: 0.55; transform: scale(0.75); }
              50%       { opacity: 1;    transform: scale(1.7); }
            }
            @keyframes item-appear {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes spike-appear {
              from { opacity: 0; transform: scaleY(0); }
              to   { opacity: 1; transform: scaleY(1); }
            }

            .spear-blade-outline {
              stroke-dasharray: 220;
              stroke-dashoffset: 220;
              animation: blade-draw 1.1s cubic-bezier(.4,0,.2,1) 0.3s forwards;
            }
            .spear-blade-fill {
              opacity: 0;
              animation: blade-fill-in 0.5s ease 1.4s forwards;
            }
            .spear-blade-spine {
              opacity: 0;
              animation: blade-fill-in 0.4s ease 1.5s forwards;
            }
            .spear-shaft {
              stroke-dasharray: 96;
              stroke-dashoffset: 96;
              animation: shaft-draw 0.9s cubic-bezier(.4,0,.2,1) 1.4s forwards;
            }
            .spear-grip {
              opacity: 0;
              animation: item-appear 0.3s ease 2.35s forwards;
            }
            .spear-spike {
              opacity: 0;
              transform-box: fill-box;
              transform-origin: top;
              animation: spike-appear 0.35s cubic-bezier(.4,0,.2,1) 2.2s forwards;
            }
            .spear-glow {
              opacity: 0;
              transform-box: fill-box;
              transform-origin: center;
              animation:
                glow-appear 0.35s ease 1.2s forwards,
                glow-pulse  1.5s ease-in-out 1.55s infinite;
            }
          `}</style>

          {/* ── Cyber sticker badges ── */}
          {STICKERS.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...(s.pos as React.CSSProperties),
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: s.color,
                border: `1px solid ${s.color}`,
                borderRadius: "2px",
                padding: "3px 8px",
                letterSpacing: "0.07em",
                transform: `rotate(${s.rotate})`,
                opacity: dark ? 1 : 0,
                transition: `opacity 0.55s ease ${s.delay}s`,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {s.text}
            </div>
          ))}

          {/* ── Center stack ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.85rem",
            }}
          >
            {/* Iklwa spear SVG */}
            <svg
              width="56"
              height="200"
              viewBox="0 0 56 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              {/* Blade fill (background tint) */}
              <path
                className="spear-blade-fill"
                d="M 28,5 C 42,18 44,50 35,72 L 28,82 L 21,72 C 12,50 14,18 28,5 Z"
                fill="#22D3EE"
                fillOpacity="0.15"
              />

              {/* Blade outline — draws itself */}
              <path
                className="spear-blade-outline"
                d="M 28,5 C 42,18 44,50 35,72 L 28,82 L 21,72 C 12,50 14,18 28,5 Z"
                stroke="#22D3EE"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Center spine */}
              <line
                className="spear-blade-spine"
                x1="28" y1="9" x2="28" y2="76"
                stroke="rgba(34,211,238,0.28)"
                strokeWidth="0.8"
              />

              {/* Shaft */}
              <line
                className="spear-shaft"
                x1="28" y1="82" x2="28" y2="178"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Grip wrap lines */}
              <line className="spear-grip" x1="23" y1="115" x2="33" y2="115" stroke="rgba(34,211,238,.35)" strokeWidth="1.5" strokeLinecap="round" />
              <line className="spear-grip" x1="23" y1="138" x2="33" y2="138" stroke="rgba(34,211,238,.35)" strokeWidth="1.5" strokeLinecap="round" />
              <line className="spear-grip" x1="23" y1="161" x2="33" y2="161" stroke="rgba(34,211,238,.35)" strokeWidth="1.5" strokeLinecap="round" />

              {/* Butt spike */}
              <polygon
                className="spear-spike"
                points="23,178 28,198 33,178"
                fill="#94A3B8"
              />

              {/* Tip glow */}
              <circle
                className="spear-glow"
                cx="28"
                cy="5"
                r="3.5"
                fill="#22D3EE"
              />
            </svg>

            {/* Brand name */}
            <div
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontWeight: 900,
                fontSize: "38px",
                letterSpacing: "0.22em",
                color: "#F8FAFC",
                display: "flex",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              IKLWA
              <span style={{ color: "#22D3EE" }}>/</span>
              LABS
            </div>

            {/* Horizontal rule — expands when dark */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#22D3EE",
                width: dark ? "180px" : "0px",
                transition: "width 0.55s cubic-bezier(.4,0,.2,1) 0.4s",
              }}
            />

            {/* Subtitle */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                color: "#22D3EE",
                letterSpacing: "0.14em",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.6s ease 0.8s",
              }}
            >
              Cybersecurity · Arusha, TZ
            </div>

            {/* City line */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "#475569",
                letterSpacing: "0.07em",
                textAlign: "center",
                maxWidth: "340px",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.6s ease 1.1s",
              }}
            >
              EST. 2024 · FOCUS ON YOUR WORK. LEAVE CYBER THREATS TO US.
            </div>

            {/* Heritage card */}
            <div
              style={{
                border: "1px solid rgba(34,211,238,.18)",
                backgroundColor: "rgba(10,22,40,.6)",
                borderRadius: "3px",
                padding: "10px 16px",
                maxWidth: "290px",
                width: "100%",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.6s ease 1.2s",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  color: "#22D3EE",
                  marginBottom: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                iklwa /ɪklwɑ/
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "9px",
                  color: "#64748B",
                  lineHeight: 1.65,
                  opacity: dark ? 1 : 0,
                  transition: "opacity 0.6s ease 1.4s",
                }}
              >
                The sound a short stabbing spear makes on impact.
                Close-range. Precise. Decisive. That is how we handle threats.
              </div>
            </div>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "9px",
                color: "#22D3EE",
                letterSpacing: "0.2em",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.6s ease 1.6s",
              }}
            >
              MULIKA · ILLUMINATE · PROTECT
            </div>

            {/* Scroll prompt — appears after spear finishes */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                opacity: ready ? 1 : 0,
                transition: "opacity 0.6s ease",
                marginTop: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "9px",
                  color: "#475569",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                scroll to enter
              </span>
              <style>{`
                @keyframes scroll-caret {
                  0%, 100% { transform: translateY(0); opacity: 0.4; }
                  50%       { transform: translateY(4px); opacity: 1; }
                }
                .scroll-caret { animation: scroll-caret 1.4s ease-in-out infinite; }
              `}</style>
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                className="scroll-caret"
              >
                <line x1="6" y1="0" x2="6" y2="11" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" />
                <polyline points="2,8 6,13 10,8" stroke="#22D3EE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* ── Progress bar (bottom edge) ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "rgba(34,211,238,0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#22D3EE",
                width: dark ? "100%" : "0%",
                transition: "width 2.6s cubic-bezier(.4,0,.55,1) 0.4s",
              }}
            />
          </div>

          {/* ── Percentage counter ── */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "#22D3EE",
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
              opacity: dark ? 1 : 0,
              transition: "opacity 0.5s ease 0.5s",
            }}
          >
            {ready ? "READY" : `LOADING ${count}%`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
