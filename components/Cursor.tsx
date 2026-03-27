"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const currentScale = useRef(1);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Only activate on pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      scale.current = el.closest("a, button, [role='button']") ? 2.2 : 1;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1);
      currentScale.current = lerp(currentScale.current, scale.current, 0.14);

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(${currentScale.current.toFixed(3)})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        border: "1px solid #22D3EE",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    />
  );
}
