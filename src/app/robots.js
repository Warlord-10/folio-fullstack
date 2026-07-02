const base = process.env.NEXT_PUBLIC_SITE_URL || "https://folio.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
