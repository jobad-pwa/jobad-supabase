// api/indeed-feed.js
import { createClient } from '@supabase/supabase-js';
import { getZoneName } from '../data/zones.js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c] || c));
}

function getWorkMode(mode) {
  const modes = { 0: 'Full-time', 1: 'Full-time', 2: 'Contract', 3: 'Full-time', 4: 'Remote', 5: 'Hybrid' };
  return modes[mode] || 'Full-time';
}

export default async function handler(req, res) {
  try {
    // Get ALL active jobs
    const { data: jobs, error } = await supabase
      .from('active_jobs')
      .select('*')
      .eq('status', 1)  // Only ACTIVE jobs
      .order('posted_date', { ascending: false })
      .limit(200); // Limit to avoid timeout

    if (error || !jobs) {
      console.error('Indeed feed error:', error);
      return res.status(500).send('Error generating Indeed feed');
    }

    // Filter out expired jobs
    const now = new Date();
    const activeJobs = jobs.filter(job => new Date(job.expiry_date) > now);

    const baseUrl = 'https://jobad-pwa.vercel.app';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>JobAd</publisher>
  <publisherurl>${baseUrl}</publisherurl>
  <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
  <jobs>`;

    activeJobs.forEach(job => {
      const zoneName = getZoneName(job.zone_id) || 'India';
      const salary = job.max_salary_monthly || 0;
      
      xml += `
    <job>
      <id>${job.job_id}</id>
      <title>${escapeXml(job.job_title || 'Job Opportunity')}</title>
      <company>${escapeXml(job.company_name || 'Company')}</company>
      <city>${escapeXml(zoneName)}</city>
      <state>${escapeXml(zoneName)}</state>
      <country>IN</country>
      <postalcode></postalcode>
      <salary>${salary}</salary>
      <currency>INR</currency>
      <salarytype>monthly</salarytype>
      <description>${escapeXml(job.job_description || 'No description available')}</description>
      <url>${baseUrl}/job/${job.job_id}</url>
      <jobtype>${getWorkMode(job.work_mode)}</jobtype>
      <category>Construction</category>
      <date>${new Date(job.posted_date).toISOString().split('T')[0]}</date>
      <expirationdate>${new Date(job.expiry_date).toISOString().split('T')[0]}</expirationdate>
      <skills>${escapeXml(job.skills_comma_separated || '')}</skills>
      <experience>${job.min_experience_years || 0} years</experience>
      <education>${job.education_required || 'Not specified'}</education>
    </job>`;
    });

    xml += `
  </jobs>
</source>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.status(200).send(xml);

  } catch (err) {
    console.error('Indeed feed error:', err);
    res.status(500).send('Error generating Indeed feed');
  }
}
