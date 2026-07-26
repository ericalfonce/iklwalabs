import Link from "next/link";

const h2 = "font-display font-bold text-[clamp(1.3rem,3vw,2rem)] text-white mt-16 mb-4 tracking-[-0.01em]";
const p = "font-sans text-[16px] leading-[1.85] text-muted m-0 mb-5 max-w-[70ch]";
const ul = "font-sans text-[16px] leading-[1.85] text-muted m-0 mb-5 pl-5 max-w-[70ch] list-disc space-y-2";
const strongCyan = "text-cyan font-medium";

export default function CommonWebVulnerabilitiesPost() {
  return (
    <article>
      <p className={p}>
        Most small and medium businesses across East Africa run on WordPress,
        a lightweight custom PHP site, or an off-the-shelf e-commerce
        platform — built quickly, on a tight budget, with no dedicated
        security review. That&apos;s not a criticism; it&apos;s just how
        growing businesses move. But it also means the same handful of
        issues shows up again and again when we run a MulikaScans
        assessment. Here are the five we see most often, and what to do
        about each one.
      </p>

      <h2 className={h2}>1. SQL Injection</h2>
      <p className={p}>
        SQL injection happens when user input — a login field, a search box,
        a URL parameter — gets passed straight into a database query without
        being sanitized. An attacker who finds one of these can often read,
        modify, or delete data they were never meant to touch, and in the
        worst cases take over admin accounts entirely.
      </p>
      <p className={p}>
        <span className={strongCyan}>Fix:</span>{" "}use parameterized queries or
        prepared statements everywhere — never build SQL strings by
        concatenating user input. Most frameworks and ORMs do this by
        default; the risk shows up in older or hand-rolled PHP/MySQL code.
        A web application firewall can catch some attempts as a stopgap, but
        it doesn&apos;t replace fixing the query itself.
      </p>

      <h2 className={h2}>2. Missing Security Headers</h2>
      <p className={p}>
        Headers like <code>X-Frame-Options</code>,{" "}
        <code>Content-Security-Policy</code>, and{" "}
        <code>Strict-Transport-Security</code> cost nothing to add but are
        skipped constantly. Without <code>X-Frame-Options</code>, for
        example, your site can be embedded in an invisible frame on another
        page — a technique called clickjacking, used to trick visitors into
        clicking things they didn&apos;t intend to.
      </p>
      <p className={p}>
        <span className={strongCyan}>Fix:</span>{" "}most modern frameworks and
        CDNs let you set these headers in a few lines of config. Run your
        domain through a free header-checking tool after deploying to
        confirm they&apos;re actually being sent — misconfiguration is easy
        to miss.
      </p>

      <h2 className={h2}>3. Exposed Admin Panels with Weak Credentials</h2>
      <p className={p}>
        <code>/admin</code>, <code>/wp-admin</code>, and similar paths are
        the first thing an automated scanner checks, and they&apos;re
        rarely hidden. Combined with a default or weak password — or no
        rate limiting on login attempts — an exposed admin panel becomes a
        simple brute-force target rather than a real barrier.
      </p>
      <ul className={ul}>
        <li>Restrict admin access by IP address or VPN where possible</li>
        <li>Enforce multi-factor authentication on every admin account</li>
        <li>Rate-limit or lock out repeated failed login attempts</li>
        <li>Remove default, sample, or unused accounts entirely</li>
      </ul>

      <h2 className={h2}>4. Outdated CMS Software and Plugins</h2>
      <p className={p}>
        WordPress and similar platforms make it easy to add functionality
        through plugins — and easy to forget to update them. Publicly
        disclosed vulnerabilities in old plugin versions are exactly what
        automated attack bots scan the internet for; the site doesn&apos;t
        need to be targeted specifically to get hit.
      </p>
      <p className={p}>
        <span className={strongCyan}>Fix:</span>{" "}keep core software and
        plugins on their latest stable versions, remove anything
        that&apos;s no longer in use, and test updates on a staging copy
        before pushing to production if the site is business-critical.
      </p>

      <h2 className={h2}>5. Missing or Misconfigured HTTPS</h2>
      <p className={p}>
        Some sites still serve pages over plain HTTP, or load a mix of
        HTTPS and HTTP resources on the same page — both of which let data
        travel unencrypted and expose visitors to interception on shared or
        untrusted networks.
      </p>
      <p className={p}>
        <span className={strongCyan}>Fix:</span>{" "}force HTTPS redirects
        site-wide, make sure every asset the page loads is served over
        HTTPS too, and enable <code>Strict-Transport-Security</code> so
        browsers refuse to fall back to HTTP. Free certificates from
        Let&apos;s Encrypt make this close to zero-cost.
      </p>

      <h2 className={h2}>None of this is exotic — that&apos;s the point</h2>
      <p className={p}>
        These five issues aren&apos;t sophisticated attacks; they&apos;re
        the fundamentals attackers check first, precisely because
        they&apos;re common. It&apos;s the same pattern you can see in the
        sample scan output on our{" "}
        <Link href="/#mulikascans" className="text-cyan no-underline hover:underline">
          MulikaScans
        </Link>{" "}
        section: a flagged SQL injection vector, a missing security header,
        an exposed admin panel — and HTTPS correctly enforced.
      </p>
      <p className={p}>
        If you&apos;re not sure which of these apply to your own site,
        that&apos;s exactly what a scan is for.{" "}
        <a
          href="https://mulikascans.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan no-underline hover:underline"
        >
          Visit mulikascans.com
        </a>{" "}
        or{" "}
        <Link href="/#contact" className="text-cyan no-underline hover:underline">
          get in touch
        </Link>{" "}
        to have us take a look.
      </p>
    </article>
  );
}
