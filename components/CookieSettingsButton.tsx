"use client";

import { useState, useSyncExternalStore } from "react";
import { clearConsent, consentStore } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
  const decision = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );

  const [justCleared, setJustCleared] = useState(false);

  const undecided = decision === consentStore.UNDECIDED;

  function onReset() {
    clearConsent();
    setJustCleared(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[12px] text-muted leading-[1.6] m-0" role="status">
        {justCleared
          ? "Preference cleared. The banner will appear again on your next page load."
          : undecided
            ? "You have not chosen yet. The banner appears on your next page load."
            : `Your saved choice: ${
                decision === "accepted" ? "Accept" : "Essential only"
              }, and no non-essential cookies were in use.`}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer self-start border border-[rgba(34,211,238,0.35)] bg-transparent text-white font-mono text-[12px] tracking-[0.06em] px-5 py-3 hover:border-cyan hover:bg-[rgba(34,211,238,0.08)] transition-colors duration-200"
      >
        Change my cookie preferences
      </button>
    </div>
  );
}
