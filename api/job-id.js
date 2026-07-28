// api/job-id.js
const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

export default async function handler(req, res) {
  const { id } = req.query;
  
  // Fetch job from Supabase
  const response = await fetch(
    `${supabaseUrl}/rest/v1/active_jobs?select=*&job_id=eq.${id}`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );
  
  const jobs = await response.json();
  const job = jobs[0];
  
  if (!job) {
    return res.status(404).send('Job not found');
  }
  
  // Generate HTML with job data embedded
  const html = generateJobHTML(job);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(html);
}

function generateJobHTML(job) {
  const zoneInfo = getZoneInfo(job.zone_id);
  const workMode = getWorkMode(job.work_mode);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${job.job_title} at ${job.company_name} - JobAd</title>
  <meta name="description" content="Apply for ${job.job_title} at ${job.company_name} in ${zoneInfo.name}. ${job.min_experience_years} years experience. Salary ₹${job.max_salary_monthly}/month.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://jobad-pwa.vercel.app/job/${job.job_id}">
  
  <!-- Google Jobs Schema -->
  <script type="application/ld+json">
${JSON.stringify(generateJobSchema(job), null, 2)}
  </script>
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, system-ui, sans-serif; background: #f1f5f9; padding: 16px; min-height: 100vh; display: flex; justify-content: center; align-items: center; }
    .container { max-width: 420px; width: 100%; background: #ffffff; border-radius: 24px; padding: 24px 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .title { font-size: 22px; font-weight: 800; color: #0f172a; }
    .company { font-size: 15px; color: #2563eb; font-weight: 600; margin: 4px 0 12px; }
    .field { margin-bottom: 10px; }
    .field-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; }
    .field-value { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f8fafc; }
    .btn-app { display: block; width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; text-align: center; text-decoration: none; margin-top: 16px; }
    .btn-app:hover { background: #1d4ed8; }
    .footer { margin-top: 16px; text-align: center; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="title">${escapeHtml(job.job_title || 'Untitled Job')}</h1>
    <p class="company">🏢 ${escapeHtml(job.company_name || 'Company')}</p>
    
    <div class="field">
      <span class="field-label">📍 Location</span>
      <div class="field-value">${zoneInfo.name}, ${zoneInfo.state}</div>
    </div>
    
    <div class="field">
      <span class="field-label">💼 Experience</span>
      <div class="field-value">${job.min_experience_years || 0} years</div>
    </div>
    
    <div class="field">
      <span class="field-label">💰 Salary</span>
      <div class="field-value">₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month</div>
    </div>
    
    <div class="field">
      <span class="field-label">🛠️ Skills</span>
      <div class="field-value">${escapeHtml(job.skills_comma_separated || 'Not specified')}</div>
    </div>
    
    <div class="field">
      <span class="field-label">📝 Description</span>
      <div class="field-value">${escapeHtml(job.job_description || 'No description')}</div>
    </div>
    
    <a href="/" class="btn-app">📱 Open in App</a>
    
    <div class="footer">
      <p>JobAd - Find Jobs in Your Area</p>
      <p style="font-size: 10px; color: #cbd5e1; margin-top: 4px;">
        Posted: ${new Date(job.posted_date).toLocaleDateString('en-IN')} • Expires: ${new Date(job.expiry_date).toLocaleDateString('en-IN')}
      </p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getZoneInfo(zoneId) {
  // Your zone mapping here
  const zones = { 5001: { name: 'Hyderabad', state: 'Telangana' }, 1751: { name: 'Shimla', state: 'Himachal Pradesh' } };
  return zones[zoneId] || { name: 'India', state: 'India' };
}

function getWorkMode(mode) {
  const modes = { 0: 'Any', 1: 'Onsite (Office)', 2: 'Onsite (Project site)', 3: 'Field work', 4: 'Remote (WFH)', 5: 'Hybrid' };
  return modes[mode] || 'Not specified';
}

function generateJobSchema(job) {
  const zoneInfo = getZoneInfo(job.zone_id);
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.job_title || 'Job Opportunity',
    description: job.job_description || 'Job description not available',
    datePosted: new Date(job.posted_date).toISOString().split('T')[0],
    validThrough: new Date(job.expiry_date).toISOString().split('T')[0],
    employmentType: 'FULL_TIME',
    hiringOrganization: { '@type': 'Organization', name: job.company_name || 'Company' },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: zoneInfo.name, addressCountry: 'IN' }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: { '@type': 'QuantitativeValue', value: job.max_salary_monthly || 0, unitText: 'MONTH' }
    }
  };
}
