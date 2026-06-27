// api/sitemap.js - SIMPLIFIED TEST VERSION
export default function handler(req, res) {
  const baseUrl = 'https://jobad-pwa.vercel.app';
  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-jobs.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
