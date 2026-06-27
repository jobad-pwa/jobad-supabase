// api/robots.js
export default function handler(req, res) {
  const robots = `# JobAd Robots.txt
User-agent: *
Allow: /
Allow: /job/
Allow: /sitemap.xml
Allow: /sitemap-jobs.xml
Disallow: /api/
Disallow: /profile/
Disallow: /edit-seeker/
Disallow: /postjob/

Sitemap: https://jobad-pwa.vercel.app/sitemap.xml

# Crawl delay for Googlebot
User-agent: Googlebot
Crawl-delay: 1

# Crawl delay for Bingbot
User-agent: Bingbot
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
}
