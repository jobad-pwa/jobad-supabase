// api/robots.js
export default function handler(req, res) {
  const robots = `# JobAd Robots.txt
User-agent: *
Allow: /
Allow: /job/
Allow: /api/data/job-list
Allow: /api/data/job-id
Disallow: /profile/
Disallow: /edit-seeker/
Disallow: /postjob/

# Google Jobs
User-agent: Googlebot
Allow: /job/
Allow: /api/data/job-id
Allow: /api/data/job-list

# Indeed
User-agent: Indeedbot
Allow: /job/
Allow: /api/data/indeed-feed

# Sitemaps
Sitemap: https://jobad-pwa.vercel.app/api/data/sitemap-jobs
Sitemap: https://jobad-pwa.vercel.app/sitemap.xml

# Crawl delay
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(robots);
}
