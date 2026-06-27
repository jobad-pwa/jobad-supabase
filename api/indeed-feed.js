// api/indeed-feed.js
import { createClient } from '@supabase/supabase-js';
import { ZONES, getZoneName } from '../data/zones.js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function(c) {
    switch(c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default async function handler(req, res) {
  const { data: jobs, error } = await supabase
    .from('active_jobs')
    .select('*')
    .order('posted_date', { ascending: false });

  if (error || !jobs) {
    res.status(500).send('Error generating Indeed feed');
    return;
  }

  const baseUrl = 'https://jobad-pwa.vercel.app';
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>JobAd</publisher>
  <publisherurl>${baseUrl}</publisherurl>
  <lastBuildDate>${now}</lastBuildDate>
  <jobs>`;

  jobs.forEach(job => {
    const description = escapeXml(job.job_description || '');
    const title = escapeXml(job.job_title || 'Job Opportunity');
    const company = escapeXml(job.company_name || 'Company');
    const skills = escapeXml(job.skills_comma_separated || '');
    const zoneName = getZoneName(job.zone_id);

    xml += `
    <job>
      <title>${title}</title>
      <company>${company}</company>
      <location>${zoneName || 'Telangana'}, India</location>
      <salary>${job.max_salary_monthly || 0}</salary>
      <currency>INR</currency>
      <salarytype>monthly</salarytype>
      <description>${description}</description>
      <url>${baseUrl}/job/${job.job_id}</url>
      <jobtype>Full-time</jobtype>
      <category>Technology</category>
      <date>${(job.posted_date || now).split('T')[0]}</date>
      <expirationdate>${(job.expiry_date || new Date(Date.now() + 30*24*60*60*1000).toISOString()).split('T')[0]}</expirationdate>
      <skills>${skills}</skills>
      <experience>${job.min_experience_years || 0} years</experience>
    </job>`;
  });

  xml += `
  </jobs>
</source>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
