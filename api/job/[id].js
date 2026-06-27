// api/job/[id].js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

const ZONES = [
  { zone_id: 100, zone_name: "Hyderabad" },
  { zone_id: 200, zone_name: "North Telangana" },
  { zone_id: 300, zone_name: "East Telangana" },
  { zone_id: 400, zone_name: "South Telangana" }
];

function getZoneName(id) {
  const z = ZONES.find(z => z.zone_id === id);
  return z ? z.zone_name : 'Unknown';
}

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    if (!id) {
      // Show all jobs if no ID provided
      const { data: jobs, error } = await supabase
        .from('active_jobs')
        .select('job_id, job_title, company_name')
        .order('job_id', { ascending: true });

      if (error || !jobs || jobs.length === 0) {
        return res.send(`
<!DOCTYPE html>
<html>
<head><title>No Jobs - JobAd</title></head>
<body style="font-family: system-ui; padding: 20px;">
  <h1>No jobs found in database</h1>
  <a href="/">Go Home</a>
</body>
</html>
        `);
      }

      let jobList = jobs.map(job => 
        `<li><a href="/job/${job.job_id}">Job #${job.job_id}: ${job.job_title || 'Untitled'} at ${job.company_name || 'Unknown'}</a></li>`
      ).join('');

      return res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>All Jobs - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; }
      .card { max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      h1 { color: #2563eb; }
      ul { list-style: none; padding: 0; }
      li { padding: 12px; border-bottom: 1px solid #e2e8f0; }
      li a { color: #2563eb; text-decoration: none; font-weight: 500; }
      li a:hover { text-decoration: underline; }
      .count { background: #dbeafe; padding: 2px 10px; border-radius: 12px; font-size: 14px; }
      .back { display: inline-block; margin-top: 16px; color: #2563eb; text-decoration: none; }
    </style>
</head>
<body>
  <div class="card">
    <h1>📋 All Jobs</h1>
    <p>Total: <span class="count">${jobs.length}</span> jobs</p>
    <ul>${jobList}</ul>
    <a href="/" class="back">← Back to Home</a>
  </div>
</body>
</html>
      `);
    }

    // Fetch job by ID
    const jobId = parseInt(id);
    if (isNaN(jobId)) {
      return res.status(400).send('Invalid job ID');
    }

    const { data: job, error } = await supabase
      .from('active_jobs')
      .select('*')
      .eq('job_id', jobId)
      .single();

    if (error || !job) {
      return res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Job Not Found - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
      h1 { color: #dc2626; }
      .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; text-decoration: none; cursor: pointer; margin-top: 12px; }
    </style>
</head>
<body>
  <div class="card">
    <h1>🔍 Job Not Found</h1>
    <p>Job with ID <strong>${id}</strong> was not found.</p>
    <a href="/job" class="btn">📋 View All Jobs</a>
    <br><br>
    <a href="/" style="color: #2563eb; text-decoration: none;">← Back to Home</a>
  </div>
</body>
</html>
      `);
    }

    const zoneName = getZoneName(job.zone_id);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.job_title || 'Job Opportunity',
      "description": job.job_description || 'Job opportunity on JobAd',
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company_name || 'Company'
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": zoneName || 'Hyderabad',
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },
      "datePosted": job.posted_date || new Date().toISOString(),
      "validThrough": job.expiry_date || new Date(Date.now() + 30*24*60*60*1000).toISOString(),
      "employmentType": "FULL_TIME",
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.max_salary_monthly || 0,
          "unitText": "MONTH"
        }
      }
    };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${job.job_title || 'Job'} at ${job.company_name || 'Company'} - JobAd</title>
    <meta name="description" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'} in ${zoneName}. ${job.min_experience_years || 0} years experience.">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563eb">
    <meta property="og:title" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'}">
    <meta property="og:description" content="Apply for ${job.job_title || 'this job'} at ${job.company_name || 'Company'}. Located in ${zoneName}.">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; margin: 0; padding: 16px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; width: 100%; background: white; border-radius: 24px; padding: 24px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      .job-title { font-size: 22px; font-weight: 700; color: #1e40af; margin: 0; }
      .company-name { font-size: 16px; color: #475569; margin: 4px 0 16px 0; }
      .job-field { margin-bottom: 10px; }
      .job-field label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; letter-spacing: 0.05em; }
      .job-field .value { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
      .job-field .value-multiline { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f1f5f9; white-space: pre-wrap; }
      .badge { display: inline-block; padding: 2px 12px; border-radius: 12px; font-size: 10px; font-weight: 700; background: #dbeafe; color: #1e40af; margin-bottom: 8px; }
      .btn-open { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 16px; }
      .btn-open:hover { background: #1d4ed8; }
      .footer { margin-top: 16px; text-align: center; font-size: 12px; color: #94a3b8; }
      .id-badge { font-size: 10px; color: #94a3b8; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
    </style>
</head>
<body>
  <div class="card">
    <div class="badge">💼 JOB <span class="id-badge">#${job.job_id}</span></div>
    <h1 class="job-title">${job.job_title || 'Untitled Job'}</h1>
    <p class="company-name">🏢 ${job.company_name || 'Company'}</p>
    <div class="job-field"><label>📍 Location</label><div class="value">${zoneName || 'Not specified'}</div></div>
    <div class="job-field"><label>💼 Experience</label><div class="value">${job.min_experience_years || 0} years</div></div>
    <div class="job-field"><label>💰 Salary</label><div class="value">₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month</div></div>
    <div class="job-field"><label>🛠️ Skills</label><div class="value">${job.skills_comma_separated || 'Not specified'}</div></div>
    <div class="job-field"><label>📝 Description</label><div class="value-multiline">${job.job_description || 'No description provided.'}</div></div>
    <button class="btn-open" onclick="window.location.href='/?type=JOB&id=${job.job_id}'">📱 Open in App</button>
    <div class="footer">JobAd - Find Jobs in Your Area</div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error: ' + error.message);
  }
}
