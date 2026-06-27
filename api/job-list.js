// api/job-list.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (err) {
  console.error('Supabase client error:', err);
}

export default async function handler(req, res) {
  try {
    console.log('📌 Job list API called');
    
    // Check if supabase is initialized
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    // Fetch all active jobs
    const { data: jobs, error } = await supabase
      .from('active_jobs')
      .select('job_id, job_title, company_name, min_experience_years')
      .order('job_id', { ascending: true });

    console.log('📌 Jobs fetched:', jobs ? jobs.length : 0);
    console.log('📌 Error:', error ? error.message : 'None');

    if (error) {
      throw new Error(error.message);
    }

    if (!jobs || jobs.length === 0) {
      return res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>No Jobs - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
      h1 { color: #2563eb; }
      .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; text-decoration: none; margin-top: 12px; }
    </style>
</head>
<body>
  <div class="card">
    <h1>📋 No Jobs Found</h1>
    <p>There are currently no jobs in the database.</p>
    <a href="/" class="btn">🏠 Go Home</a>
  </div>
</body>
</html>
      `);
    }

    // Build job list HTML
    let jobList = jobs.map(job => {
      const title = job.job_title || 'Untitled Job';
      const company = job.company_name || 'Unknown Company';
      const exp = job.min_experience_years || 0;
      return `<li><a href="/job/${job.job_id}">🔹 ${title} at ${company} (${exp} yrs experience)</a></li>`;
    }).join('');

    // Return HTML page
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
    <title>All Jobs - JobAd</title>
    <meta name="description" content="Browse all jobs on JobAd">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; margin: 0; padding: 20px; }
      .container { max-width: 700px; margin: 0 auto; }
      .card { background: white; border-radius: 24px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      h1 { color: #2563eb; margin: 0 0 4px 0; font-size: 28px; }
      .subtitle { color: #64748b; margin: 0 0 20px 0; font-size: 14px; }
      .count { background: #dbeafe; padding: 2px 12px; border-radius: 12px; font-size: 14px; font-weight: 600; color: #1e40af; }
      ul { list-style: none; padding: 0; margin: 0; }
      li { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; }
      li:last-child { border-bottom: none; }
      li a { color: #2563eb; text-decoration: none; font-weight: 500; display: block; transition: 0.15s; }
      li a:hover { color: #1d4ed8; text-decoration: underline; background: #f8fafc; padding: 4px 8px; margin: -4px -8px; border-radius: 6px; }
      .back { display: inline-block; margin-top: 20px; color: #64748b; text-decoration: none; font-size: 14px; }
      .back:hover { color: #2563eb; }
      .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      .debug { background: #f8fafc; padding: 8px 12px; border-radius: 8px; font-size: 12px; color: #64748b; margin-bottom: 16px; border: 1px solid #e2e8f0; }
    </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>📋 All Jobs</h1>
      <p class="subtitle">Browse all available job opportunities on JobAd</p>
      <div class="debug">Total jobs: <span class="count">${jobs.length}</span></div>
      <ul>${jobList}</ul>
      <a href="/" class="back">← Back to Home</a>
    </div>
    <div class="footer">JobAd - Find Jobs in Your Area</div>
  </div>
</body>
</html>
    `);
  } catch (error) {
    console.error('❌ Error in job-list handler:', error);
    res.status(500).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Error - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
      h1 { color: #dc2626; }
      .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; text-decoration: none; margin-top: 12px; }
      .error-detail { background: #fef2f2; padding: 12px; border-radius: 8px; text-align: left; font-size: 13px; margin-top: 16px; border: 1px solid #fecaca; word-break: break-all; }
    </style>
</head>
<body>
  <div class="card">
    <h1>❌ Error Loading Jobs</h1>
    <p>There was a problem loading the job list.</p>
    <div class="error-detail">
      <strong>Error:</strong> ${error.message}
    </div>
    <a href="/" class="btn">🏠 Go Home</a>
  </div>
</body>
</html>
    `);
  }
}
