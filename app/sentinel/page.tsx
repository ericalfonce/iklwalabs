import type { Metadata } from "next";
import Link from "next/link";
import release from "@/data/sentinel-release.json";

export const metadata: Metadata = {
  title: "Sentinel — Download",
  description:
    "Iklwa Sentinel: local-first network visibility and threat detection for Windows, Linux, macOS and Android. No account, no cloud, nothing leaves your machine.",
  alternates: { canonical: "/sentinel" },
  openGraph: {
    title: "Iklwa Sentinel — Download",
    description:
      "Local-first network visibility and threat detection. Captures traffic, reconstructs connections, stores everything locally.",
    url: "https://iklwalabs.co.tz/sentinel",
  },
};

/**
 * The download page.
 *
 * Every fact is read from `@/data/sentinel-release.json`, which is a copy of
 * `site/release-manifest.json` in the product repository (IklwaLabs/assegai-sentinel). That
 * manifest is the single source of truth and is what the product's own CI checks against the
 * code: the version has to match Cargo.toml and the command list has to match the CLI's enum.
 *
 * Copying it rather than importing over the network keeps this page a static build with no
 * runtime dependency on GitHub. The duplication is deliberate and the sync command is in the
 * header of the JSON file.
 *
 * When `release.published` is false the buttons render disabled with a plain explanation.
 * That is not a placeholder: no GitHub release exists for this version yet, and a page whose
 * buttons all 404 would tell visitors the product is broken rather than that the build is
 * not out yet.
 */

type Artifact = { kind: string; label: string; asset: string; detail: string };
type Platform = {
  id: string;
  name: string;
  status: string;
  driver: string;
  driver_url?: string;
  privilege: string;
  summary: string;
  install: string[];
  artifacts: Artifact[];
};

const platforms = release.platforms as Platform[];
const published = Boolean(release.release.published);
const baseUrl = `${release.product.repository.replace(/\/$/, "")}/releases/download/${release.release.tag}`;

const STATUS_LABEL: Record<string, string> = {
  supported: "Supported",
  partial: "Analysis only",
};

export default function SentinelDownloadPage() {
  return (
    <main className="bg-navy-deep min-h-[100dvh] py-6 px-8 flex flex-col">
      <div className="flex justify-between items-start mb-16">
        <Link href="/" className="font-display text-[14px] text-white tracking-[0.06em] no-underline">
          ← IklwaLabs
        </Link>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /sentinel
        </span>
      </div>

      <div className="max-w-[1100px] pb-24">
        <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-white mt-0 mx-0 mb-5 tracking-[-0.02em]">
          {release.product.name}
          <span className="font-mono text-[0.28em] text-cyan align-middle ml-4 tracking-[0.1em]">
            v{release.release.version}
          </span>
        </h1>

        <p className="font-sans text-[17px] text-muted mt-0 mx-0 mb-6 leading-[1.7] max-w-[62ch]">
          {release.product.summary}
        </p>

        <p className="font-mono text-[12px] text-muted tracking-[0.06em] mb-16">
          capture → decode → flow engine → SQLite → interface
        </p>

        {!published && (
          <div className="border-l-2 border-cyan bg-navy-mid/40 px-6 py-5 mb-16 max-w-[68ch]">
            <p className="font-sans text-[15px] text-white mt-0 mx-0 mb-2">
              No published build yet.
            </p>
            <p className="font-sans text-[14px] text-muted mt-0 mx-0 mb-0 leading-[1.7]">
              {release.release.unpublished_reason}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6 mb-20">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} published={published} baseUrl={baseUrl} />
          ))}
        </div>

        <Section title="What it does">
          <ul className="list-none p-0 m-0 flex flex-col gap-5">
            {release.features.map((feature) => (
              <li key={feature.title}>
                <p className="font-display font-semibold text-[15px] text-white mt-0 mx-0 mb-1">
                  {feature.title}
                </p>
                <p className="font-sans text-[14px] text-muted mt-0 mx-0 leading-[1.7]">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Not in this release">
          <p className="mb-5">
            These are absent from the interface rather than faked. A threat rule that cannot
            fire would be worse than an honest gap.
          </p>
          <ul className="list-none p-0 m-0 flex flex-col gap-4">
            {release.not_implemented.map((item) => (
              <li key={item.title}>
                <span className="font-display font-semibold text-white">{item.title}. </span>
                {item.body}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Command line">
          <p className="mb-5">
            The CLI is a thin client over the same engine as the desktop application, so the
            two cannot disagree about what your network is doing.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] text-left py-2 pr-6 border-b border-white/10">
                    Command
                  </th>
                  <th className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] text-left py-2 border-b border-white/10">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {release.cli_commands.map((entry) => (
                  <tr key={entry.command}>
                    <td className="font-mono text-cyan py-2 pr-6 border-b border-white/5 align-top whitespace-nowrap">
                      {entry.command}
                    </td>
                    <td className="text-muted py-2 border-b border-white/5 align-top">
                      {entry.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-[13px] text-muted mt-4">
            Add <code className="font-mono text-cyan">--json</code> for machine-readable output,{" "}
            <code className="font-mono text-cyan">-v</code> for more detail,{" "}
            <code className="font-mono text-cyan">-q</code> for less.
          </p>
        </Section>

        <Section title="Verify a download">
          <p className="mb-4">{release.verification.body}</p>
          <pre className="font-mono text-[13px] text-white bg-navy-mid border border-white/10 px-4 py-3 overflow-x-auto">
            {release.verification.command}
          </pre>
          <ul className="mt-5 flex flex-col gap-3">
            {release.verification.notes.map((note) => (
              <li key={note} className="text-[14px]">
                {note}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Questions">
          <div className="flex flex-col gap-4">
            {release.faq.map((item) => (
              <details key={item.q} className="border border-white/10 px-5 py-4 group">
                <summary className="font-display font-semibold text-[15px] text-white cursor-pointer list-none">
                  <span className="font-mono text-cyan mr-3 group-open:rotate-90 transition-transform inline-block">
                    →
                  </span>
                  {item.q}
                </summary>
                <p className="font-sans text-[14px] text-muted mt-3 mb-0 leading-[1.75] max-w-[68ch]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <Section title="Build from source">
          <p className="mb-4">{release.build_from_source.prerequisites}</p>
          <pre className="font-mono text-[13px] text-white bg-navy-mid border border-white/10 px-4 py-3 overflow-x-auto">
            {release.build_from_source.commands.join("\n")}
          </pre>
          <ul className="mt-5 flex flex-col gap-3">
            {release.build_from_source.notes.map((note) => (
              <li key={note} className="text-[14px]">
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <a
              href={release.product.repository}
              className="font-mono text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
            >
              {release.product.repository}
            </a>
          </p>
        </Section>

        <p className="font-mono text-[13px] text-muted mt-16">
          {release.footer.copyright} · {release.product.license} licensed ·{" "}
          <a
            href={release.product.repository}
            className="text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
          >
            source
          </a>
        </p>
      </div>
    </main>
  );
}

function PlatformCard({
  platform,
  published,
  baseUrl,
}: {
  platform: Platform;
  published: boolean;
  baseUrl: string;
}) {
  return (
    <section className="border border-white/10 bg-navy-mid/30 px-6 py-6 md:px-8 md:py-8">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h2 className="font-display font-semibold text-[22px] text-white mt-0 mx-0 mb-0">
          {platform.name}
        </h2>
        <span
          className={`font-mono text-[11px] tracking-[0.08em] px-2 py-0.5 border ${
            platform.status === "supported"
              ? "text-cyan border-cyan/40"
              : "text-muted border-white/20"
          }`}
        >
          {STATUS_LABEL[platform.status] ?? platform.status}
        </span>
      </div>

      <p className="font-sans text-[14px] text-muted mt-0 mx-0 mb-6 leading-[1.7] max-w-[68ch]">
        {platform.summary}
      </p>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <h3 className="font-mono text-[11px] text-muted uppercase tracking-[0.12em] mt-0 mx-0 mb-4">
            Downloads
          </h3>
          <div className="flex flex-col gap-3">
            {platform.artifacts.map((artifact) =>
              published ? (
                <a
                  key={artifact.asset}
                  href={`${baseUrl}/${artifact.asset}`}
                  className="group border border-cyan/40 bg-navy-deep/50 px-4 py-3 no-underline hover:border-cyan hover:bg-cyan/5 transition-colors"
                >
                  <span className="font-display font-semibold text-[14px] text-white block">
                    {artifact.label} <span className="text-cyan">↓</span>
                  </span>
                  <span className="font-mono text-[11px] text-muted block mt-1 break-all">
                    {artifact.asset}
                  </span>
                  <span className="font-sans text-[12px] text-muted block mt-1">
                    {artifact.detail}
                  </span>
                </a>
              ) : (
                <div
                  key={artifact.asset}
                  aria-disabled="true"
                  className="border border-dashed border-white/15 px-4 py-3 opacity-70"
                >
                  <span className="font-display font-semibold text-[14px] text-muted block">
                    {artifact.label} — not yet published
                  </span>
                  <span className="font-mono text-[11px] text-muted/70 block mt-1 break-all">
                    {artifact.asset}
                  </span>
                  <span className="font-sans text-[12px] text-muted/70 block mt-1">
                    {artifact.detail}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[11px] text-muted uppercase tracking-[0.12em] mt-0 mx-0 mb-4">
            Requirements
          </h3>
          <dl className="m-0 mb-6">
            <dt className="font-display font-semibold text-[13px] text-white">Capture driver</dt>
            <dd className="text-muted text-[13px] mt-1 mb-3 leading-[1.7]">
              {platform.driver_url ? (
                <a
                  href={platform.driver_url}
                  className="font-mono text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
                >
                  {platform.driver}
                </a>
              ) : (
                platform.driver
              )}
            </dd>
            <dt className="font-display font-semibold text-[13px] text-white">Privileges</dt>
            <dd className="text-muted text-[13px] mt-1 mb-0 leading-[1.7]">{platform.privilege}</dd>
          </dl>

          <h3 className="font-mono text-[11px] text-muted uppercase tracking-[0.12em] mt-0 mx-0 mb-4">
            Installing
          </h3>
          <ol className="m-0 pl-5 flex flex-col gap-2 text-[13px] text-muted leading-[1.7]">
            {platform.install.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="font-display font-semibold text-[20px] text-white mt-0 mx-0 mb-4">
        {title}
      </h2>
      <div className="font-sans text-[15px] text-muted leading-[1.75] flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
}