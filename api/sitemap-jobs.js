// api/sitemap-jobs.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { data: jobs, error } = await supabase
    .from('active_jobs')
    .select('job_id, posted_date')
    .order('posted_date', { ascending: false });

  if (error || !jobs) {
    res.status(500).send('Error generating sitemap');
    return;
  }

  const baseUrl = 'https://jobad-pwa.vercel.app';
  const now = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  jobs.forEach(job => {
    const lastmod = job.posted_date || now;
    sitemap += `
  <url>
    <loc>${baseUrl}/job/${job.job_id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
