"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { writeConsent, consentStore, type ConsentChoice } from "@/lib/cookie-consent";

export default function CookieBanner() {
  const decision = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );

  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (decision !== consentStore.UNDECIDED) return;
    // Delay so the banner does not compete with the intro preloader.
    const t = setTimeout(() => setArmed(true), 2200);
    return () => clearTimeout(t);
  }, [decision]);

  // Closing is derived, not stored: saving a choice changes `decision` and
  // the banner disappears without needing to mirror that into state.
  const open = armed && decision === consentStore.UNDECIDED;

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
  }

  // z-index sits above the intro preloader (9999) so the choice is never occluded.
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      className="fixed left-0 right-0 bottom-0 z-[10000] px-4 pb-4 sm:px-6 sm:pb-6 font-sans"
    >
      <div className="mx-auto max-w-[900px] border border-[rgba(34,211,238,0.22)] bg-[rgba(5,12,26,0.96)] backdrop-blur-sm p-5 sm:p-6 shadow-[0_-8px_40px_rgba(0,0,0,0.45)]">
        <h2
          id="cookie-banner-title"
          className="font-mono text-[12px] text-cyan tracking-[0.14em] uppercase m-0 mb-3"
        >
          Cookies &amp; privacy
        </h2>

        <p
          id="cookie-banner-body"
          className="font-sans text-[14px] leading-[1.65] text-muted m-0 mb-5 max-w-[68ch]"
        >
          We do not use cookies, advertising or analytics — there is nothing on this site that
          tracks you. We store your choice below in your own browser only, so we do not ask again.
          See our{" "}
          <Link
            href="/cookies"
            className="font-mono text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
          >
            cookie policy
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Link
            href="/cookies"
            className="font-mono text-[12px] text-muted no-underline hover:text-cyan hover:underline [text-decoration-color:#22D3EE] tracking-[0.06em] order-2 sm:order-1"
          >
            Read full policy
          </Link>

          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <button
              type="button"
              onClick={() => choose("essential-only")}
              className="cursor-pointer border border-[rgba(34,211,238,0.35)] bg-transparent text-white font-mono text-[12px] tracking-[0.06em] px-5 py-3 hover:border-cyan hover:bg-[rgba(34,211,238,0.08)] transition-colors duration-200"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="cursor-pointer border border-cyan bg-cyan text-navy-deep font-mono text-[12px] font-semibold tracking-[0.06em] px-5 py-3 hover:bg-transparent hover:text-cyan transition-colors duration-200"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
