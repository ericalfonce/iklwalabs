import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Cybersecurity insights, security tips, and IT news for African SMEs from IklwaLabs.",
};

export default function BlogPage() {
  return (
    <main className="bg-navy-deep min-h-screen py-6 px-8 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-start mb-24">
        <Link href="/" className="font-display text-[14px] text-white tracking-[0.06em] no-underline">
          ← IklwaLabs
        </Link>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /blog
        </span>
      </div>

      {/* Heading */}
      <div className="max-w-[720px]">
        <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-white mt-0 mx-0 mb-4 tracking-[-0.02em]">
          Insights
        </h1>
        <p className="font-sans text-[16px] text-muted mt-0 mx-0 mb-16 leading-[1.7]">
          Cybersecurity insights for African businesses.
        </p>

        {/* Placeholder card */}
        <div className="border border-[rgba(34,211,238,0.12)] p-8 max-w-[480px]">
          <span className="font-mono text-[10px] text-cyan tracking-[0.14em] uppercase block mb-3">
            Coming Soon
          </span>
          <h2 className="font-display font-semibold text-[18px] text-white mt-0 mx-0 mb-2">
            First post coming soon
          </h2>
          <p className="font-sans text-[14px] text-[#64748B] m-0 leading-[1.6]">
            We&apos;re preparing cybersecurity articles tailored for African
            SMEs. Stay tuned.
          </p>
        </div>
      </div>
    </main>
  );
}
