import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How IklwaLabs handles cookies and similar technologies on iklwalabs.co.tz. We do not use advertising, analytics or tracking cookies.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "29 September 2026";

export default function CookiesPage() {
  return (
    <main className="bg-navy-deep min-h-[100dvh] py-6 px-8 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-start mb-24">
        <Link href="/" className="font-display text-[14px] text-white tracking-[0.06em] no-underline">
          ← IklwaLabs
        </Link>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /cookies
        </span>
      </div>

      <div className="max-w-[720px] pb-24">
        {/* Heading */}
        <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-white mt-0 mx-0 mb-4 tracking-[-0.02em]">
          Cookie Policy
        </h1>
        <p className="font-sans text-[16px] text-muted mt-0 mx-0 mb-4 leading-[1.7]">
          Last updated: {LAST_UPDATED}
        </p>
        <p className="font-sans text-[16px] text-muted mt-0 mx-0 mb-16 leading-[1.7]">
          This policy explains what cookies and similar technologies are, what this website uses, and
          what choices you have. It applies to{" "}
          <a
            href="https://iklwalabs.co.tz"
            className="font-mono text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
          >
            iklwalabs.co.tz
          </a>{" "}
          only.
        </p>

        <Section title="The short version">
          <p>
            This website does not set any cookies. It runs no analytics, no advertising, no social
            media embeds and no third-party tracking scripts. We cannot identify you, follow you
            between pages, or build a profile of your behaviour, because there is no technology here
            doing that.
          </p>
          <p>
            The only thing stored anywhere is your cookie-notice choice, which stays in your own
            browser and never reaches us.
          </p>
        </Section>

        <Section title="What cookies are">
          <p>
            A cookie is a small text file a website asks your browser to store and send back on
            later requests. Related technologies — local storage, session storage and similar
            browser APIs — serve the same purpose of remembering information between visits.
          </p>
          <p>
            Most cookies on the web exist for advertising and analytics. A small number are strictly
            necessary, for example keeping a session alive or remembering that you dismissed a
            cookie banner.
          </p>
        </Section>

        <Section title="What this website uses">
          <p>
            No cookies at all. We have deliberately built this site without cookies, tracking
            pixels, Google Analytics, advertising tags, embedded social media widgets, or
            third-party chat widgets. Fonts and images are served from our own domain, so loading a
            page does not contact Google, Facebook or any advertising network.
          </p>
        </Section>

        <Section title="The cookie notice">
          <p>
            This site displays a short notice on your first visit offering a choice. Because no
            non-essential cookies are in use, both options produce exactly the same result: no
            cookies are set. We keep the choice only so that we do not have to ask you again on
            every page.
          </p>
          <p>
            That choice is saved using your browser&apos;s local storage, on your own device. It is
            never sent to us, is not readable by us, and is not shared with anyone. Deleting it is
            as simple as clearing your browser data for this site.
          </p>
          <p>
            You can change or withdraw your choice at any time using the control below.
          </p>
          <CookieSettingsButton />
        </Section>

        <Section title="Hosting and network-level data">
          <p>
            This site is hosted on Vercel, and your request reaches our network provider before it
            reaches any page content. Like any web server, the hosting infrastructure processes
            technical connection data such as your IP address, browser user agent, requested URL and
            timestamp in order to deliver the page and protect against abuse.
          </p>
          <p>
            This is inherent to serving a website over the internet. It is not used by us to build a
            profile, and it is not combined with any other data about you. We do not maintain a
            behavioural advertising or analytics dataset.
          </p>
        </Section>

        <Section title="External links">
          <p>
            This site links to other websites, including MulikaScans, GitHub and Instagram. Once you
            follow one of those links you are on a different website governed by that
            operator&apos;s own privacy policy and cookie practices, over which we have no control.
            We do not receive any data from those sites.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under the Personal Data Protection Act, 2022 of the United Republic of Tanzania, and the
            GDPR where it applies to you, you have the right to ask what personal data an
            organisation holds about you, to request correction or deletion of that data, to object
            to processing, and to withdraw consent at any time.
          </p>
          <p>
            Because this website collects no personal data and sets no cookies, there is normally
            nothing for us to disclose, correct or delete. The one item that exists is the choice
            you made in the cookie notice, and that lives only in your own browser, so you can view
            or erase it yourself at any time using the control above. We will always tell you
            honestly if that position changes.
          </p>
          <p>
            You can also clear or block cookies in your browser settings at any time. Because we use
            none, blocking them will not affect your ability to read anything on this site.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we ever introduce cookies or third-party tools, we will update this page first, state
            plainly what changed and why, and where a cookie is not strictly necessary, ask for your
            consent before setting it.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy, or about security more generally, are welcome at{" "}
            <a
              href="mailto:support@mulikascans.com"
              className="font-mono text-cyan no-underline hover:underline [text-decoration-color:#22D3EE]"
            >
              support@mulikascans.com
            </a>
            .
          </p>
          <p className="font-mono text-[13px] text-muted">
            IklwaLabs · Arusha, Tanzania
          </p>
        </Section>
      </div>
    </main>
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
