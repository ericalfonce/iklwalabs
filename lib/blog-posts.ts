export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "common-web-vulnerabilities-african-smes",
    title: "5 Common Web Vulnerabilities Facing African SMEs",
    description:
      "The issues that show up again and again when we scan small business websites across East Africa — and what to do about each one.",
    date: "2026-07-26",
    readingTime: "7 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
