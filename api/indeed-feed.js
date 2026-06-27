// api/indeed-feed.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

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

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>JobAd</publisher>
  <publisherurl>${baseUrl}</publisherurl>
  <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
  <jobs>`;

  jobs.forEach(job => {
    const description = (job.job_description || '').replace(/[<>&]/g, (m) => {
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      if (m === '&') return '&amp;';
      return m;
    });

    const locationName = job.zone_id === 100 ? 'Hyderabad' : 
                         job.zone_id === 200 ? 'North Telangana' :
                         job.zone_id === 300 ? 'East Telangana' :
                         job.zone_id === 400 ? 'South Telangana' : 'Telangana';

    xml += `
    <job>
      <title>${(job.job_title || 'Job Opportunity').replace(/[<>&]/g, (m) => m === '<' ? '&lt;' : m === '>' ? '&gt;' : '&amp;')}</title>
      <company>${(job.company_name || 'Company').replace(/[<>&]/g, (m) => m === '<' ? '&lt;' : m === '>' ? '&gt;' : '&amp;')}</company>
      <location>${locationName}, India</location>
      <salary>${job.max_salary_monthly || 0}</salary>
      <currency>INR</currency>
      <salarytype>monthly</salarytype>
      <description>${description}</description>
      <url>${baseUrl}/job/${job.job_id}</url>
      <jobtype>Full-time</jobtype>
      <category>Technology</category>
      <date>${(job.posted_date || new Date().toISOString()).split('T')[0]}</date>
      <expirationdate>${(job.expiry_date || new Date(Date.now() + 30*24*60*60*1000).toISOString()).split('T')[0]}</expirationdate>
      <skills>${(job.skills_comma_separated || '').replace(/[<>&]/g, (m) => m === '<' ? '&lt;' : m === '>' ? '&gt;' : '&amp;')}</skills>
      <experience>${job.min_experience_years || 0} years</experience>
    </job>`;
  });

  xml += `
  </jobs>
</source>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
