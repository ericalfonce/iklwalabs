const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IklwaLabs",
  url: "https://iklwalabs.co.tz",
  logo: "https://iklwalabs.co.tz/favicon.svg",
  description:
    "Cybersecurity and IT solutions company based in Arusha, Tanzania.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Arusha, Tanzania",
  },
  areaServed: {
    "@type": "Place",
    name: "East Africa",
  },
  serviceType: [
    "Web Vulnerability Assessment",
    "Digital Forensics",
    "Security Awareness Training",
    "IT Infrastructure",
  ],
  sameAs: [
    "https://github.com/ericalfonce",
    "https://mulikascans.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@mulikascans.com",
    contactType: "customer support",
  },
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
