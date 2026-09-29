export const CONSENT_KEY = "iklwalabs.consent.v1";

export type ConsentChoice = "accepted" | "essential-only";

export interface ConsentRecord {
  choice: ConsentChoice;
  /** No non-essential cookies are in use today. Recorded so that anything
   *  added in future inherits a known, explicit decision. */
  nonEssentialInUse: boolean;
  savedAt: string;
}

function isRecord(v: unknown): v is ConsentRecord {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return (
    (r.choice === "accepted" || r.choice === "essential-only") &&
    typeof r.nonEssentialInUse === "boolean" &&
    typeof r.savedAt === "string"
  );
}

export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // Private mode, disabled storage, or corrupt value -> treat as not chosen.
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    const record: ConsentRecord = {
      choice,
      nonEssentialInUse: false,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: the banner simply reappears next visit. Never fatal.
  }
  notify();
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* no-op */
  }
  notify();
}

/* ── External store ────────────────────────────────────────────────────────
 * localStorage is state that lives outside React, so it is read through
 * useSyncExternalStore rather than copied into state inside an effect. */

export const CONSENT_EVENT = "iklwalabs:consent-change";

const UNDECIDED = "undecided";

function notify(): void {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Stable primitive snapshot — safe to call on every render. */
function getSnapshot(): string {
  const rec = readConsent();
  return rec ? rec.choice : UNDECIDED;
}

function getServerSnapshot(): string {
  return UNDECIDED;
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  // `storage` fires in other tabs, so preferences stay consistent across them.
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export const consentStore = { subscribe, getSnapshot, getServerSnapshot, UNDECIDED };
