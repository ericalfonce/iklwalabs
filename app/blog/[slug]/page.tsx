import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";
import CommonWebVulnerabilitiesPost from "@/components/blog/CommonWebVulnerabilitiesPost";

const POST_CONTENT: Record<string, React.ComponentType> = {
  "common-web-vulnerabilities-african-smes": CommonWebVulnerabilitiesPost,
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://iklwalabs.co.tz/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const Content = POST_CONTENT[slug];

  if (!post || !Content) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "IklwaLabs" },
    publisher: { "@type": "Organization", name: "IklwaLabs" },
    mainEntityOfPage: `https://iklwalabs.co.tz/blog/${post.slug}`,
  };

  return (
    <main className="bg-navy-deep min-h-screen py-6 px-8 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Top bar */}
      <div className="flex justify-between items-start mb-16">
        <Link
          href="/blog"
          className="font-display text-[14px] text-white tracking-[0.06em] no-underline"
        >
          ← Insights
        </Link>
        <span className="font-mono text-[12px] text-muted tracking-[0.12em]">
          /blog
        </span>
      </div>

      {/* Header */}
      <div className="max-w-[720px] mx-auto w-full">
        <span className="font-mono text-[11px] text-cyan tracking-[0.14em] uppercase block mb-4">
          {new Date(post.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readingTime}
        </span>
        <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white m-0 mb-10 tracking-[-0.02em]">
          {post.title}
        </h1>

        <Content />
      </div>
    </main>
  );
}
