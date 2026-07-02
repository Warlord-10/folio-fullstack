import requests from "@/Networking/Requests";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://folio.app";

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = ["", "/home"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
  }));

  try {
    // Public portfolio list — no auth needed, so a plain fetch keeps this cacheable
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${requests.fetchPortfolios_v2()}`, {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    const profiles = (json?.data || []).map((p) => ({
      url: `${base}/profile/${p._id}`,
      lastModified: now,
    }));
    return [...staticRoutes, ...profiles];
  } catch {
    return staticRoutes;
  }
}
