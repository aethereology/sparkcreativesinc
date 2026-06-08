/**
 * JSON-LD builders. Only emit facts we hold in the content layer — never invent
 * ratings, reviews, or claims. Plan: 06_seo_and_schema/04-schema-plan.md.
 */
import { org } from "@/content/org";
import { programs, type Program } from "@/content/programs";
import { SITE_URL } from "@/lib/utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: org.name,
    legalName: org.name,
    url: SITE_URL,
    email: org.email,
    slogan: org.tagline,
    description: org.thesis,
    // US 501(c)(3) status.
    nonprofitStatus: "Nonprofit501c3",
    taxID: org.ein,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.address.street,
      addressLocality: org.address.city,
      addressRegion: org.address.region,
      postalCode: org.address.postalCode,
      addressCountry: org.address.country,
    },
    areaServed: org.locations,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: org.name,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function serviceSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: program.name,
    serviceType: program.role,
    description: program.shortDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: org.locations,
    url: `${SITE_URL}/programs/${program.slug}`,
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function programListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SparkCreatives Programs",
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/programs/${p.slug}`,
    })),
  };
}
