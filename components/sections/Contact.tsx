const SOCIAL_LINKS = [
  { label: "GitHub",    href: "https://github.com/iklwalabs" },
  { label: "Instagram", href: "https://instagram.com/iklwalabs" },
];

export default function Contact() {
  return (
    <section className="bg-navy-deep flex flex-col min-h-screen pt-6 px-8 pb-0">
      {/* Section number */}
      <span className="font-mono text-[12px] text-muted tracking-[0.12em] mb-12">
        /04
      </span>

      {/* Center body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 pb-24">
        {/* Main headline */}
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,5rem)] leading-[1.1] text-white m-0 tracking-[-0.02em] max-w-[16ch]">
          Let&apos;s build a safer digital Africa.
        </h2>

        {/* Contact block */}
        <div className="flex flex-col items-center gap-[0.4rem]">
          <span className="font-sans text-[15px] text-muted">
            Reach out at:
          </span>
          <a
            href="mailto:support@mulikascans.com"
            className="font-mono text-[15px] text-cyan no-underline tracking-[0.04em]"
          >
            support@mulikascans.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex gap-8 items-center">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-[rgba(248,250,252,0.08)] flex justify-between items-center py-5 flex-wrap gap-2">
        <span className="font-mono text-[11px] text-muted tracking-[0.06em]">
          IklwaLabs © 2025 — Arusha, Tanzania
        </span>
        <a
          href="https://mulikascans.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-muted no-underline tracking-[0.06em] transition-colors duration-200 hover:text-cyan"
        >
          mulikascans.com
        </a>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-sans text-[14px] text-muted no-underline transition-colors duration-200 hover:text-cyan hover:underline [text-decoration-color:#22D3EE]"
    >
      {label}
    </a>
  );
}
