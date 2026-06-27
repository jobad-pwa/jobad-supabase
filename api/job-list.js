// api/job-list.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    // Fetch all active jobs
    const { data: jobs, error } = await supabase
      .from('active_jobs')
      .select('job_id, job_title, company_name, min_experience_years, zone_id')
      .order('job_id', { ascending: true });

    if (error || !jobs || jobs.length === 0) {
      return res.send(`
<!DOCTYPE html>
<html>
<head><title>No Jobs - JobAd</title></head>
<body style="font-family: system-ui; padding: 20px;">
  <h1>No jobs found</h1>
  <a href="/">Go Home</a>
</body>
</html>
      `);
    }

    // Generate HTML list
    let jobList = jobs.map(job => 
      `<li><a href="/job/${job.job_id}">Job #${job.job_id}: ${job.job_title || 'Untitled'} at ${job.company_name || 'Unknown'}</a></li>`
    ).join('');

    // Return HTML page with job list
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
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
  } catch (error) {
    console.error('Error in job-list handler:', error);
    res.status(500).send('Internal server error');
  }
}
