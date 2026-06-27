// api/sitemap.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const baseUrl = 'https://jobad-pwa.vercel.app';
  const now = new Date().toISOString();

  // Return sitemap index
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
