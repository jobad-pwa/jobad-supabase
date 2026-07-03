// api/job-id.js
const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

const ZONES = [
    // Nellore (5241)
    { zone_id: 5241, zone_name: "Nellore" },
    // Hyderabad (5001)
    { zone_id: 5001, zone_name: "Hyderabad" },
    // Vikarabad (5012)
    { zone_id: 5012, zone_name: "Vikarabad" },
    // Medak (5021)
    { zone_id: 5021, zone_name: "Medak" },
    // Sangareddy (5022)
    { zone_id: 5022, zone_name: "Sangareddy" },
    // Siddipet (5023)
    { zone_id: 5023, zone_name: "Siddipet" },
    // Kamareddy (5031)
    { zone_id: 5031, zone_name: "Kamareddy" },
    // Nizamabad (5032)
    { zone_id: 5032, zone_name: "Nizamabad" },
    // Adilabad (5041)
    { zone_id: 5041, zone_name: "Adilabad" },
    // Asifabad (5042)
    { zone_id: 5042, zone_name: "Asifabad" },
    // Mancherial (5043)
    { zone_id: 5043, zone_name: "Mancherial" },
    // Nirmal (5044)
    { zone_id: 5044, zone_name: "Nirmal" },
    // Jagtial (5051)
    { zone_id: 5051, zone_name: "Jagtial" },
    // Karimnagar (5052)
    { zone_id: 5052, zone_name: "Karimnagar" },
    // Peddapalli (5053)
    { zone_id: 5053, zone_name: "Peddapalli" },
    // Sircilla (5054)
    { zone_id: 5054, zone_name: "Sircilla" },
    // Hanumakonda (5061)
    { zone_id: 5061, zone_name: "Hanumakonda" },
    // Jangaon (5062)
    { zone_id: 5062, zone_name: "Jangaon" },
    // Bhupalpally (5063)
    { zone_id: 5063, zone_name: "Bhupalpally" },
    // Mahabubabad (5064)
    { zone_id: 5064, zone_name: "Mahabubabad" },
    // Mulugu (5065)
    { zone_id: 5065, zone_name: "Mulugu" },
    // Warangal (5066)
    { zone_id: 5066, zone_name: "Warangal" },
    // Kothagudem (5071)
    { zone_id: 5071, zone_name: "Kothagudem" },
    // Khammam (5072)
    { zone_id: 5072, zone_name: "Khammam" },
    // Nalgonda (5081)
    { zone_id: 5081, zone_name: "Nalgonda" },
    // Suryapet (5082)
    { zone_id: 5082, zone_name: "Suryapet" },
    // Bhongir (5083)
    { zone_id: 5083, zone_name: "Bhongir" },
    // Gadwal (5091)
    { zone_id: 5091, zone_name: "Gadwal" },
    // Mahabubnagar (5092)
    { zone_id: 5092, zone_name: "Mahabubnagar" },
    // Nagarkurnool (5093)
    { zone_id: 5093, zone_name: "Nagarkurnool" },
    // Narayanpet (5094)
    { zone_id: 5094, zone_name: "Narayanpet" },
    // Wanaparthy (5095)
    { zone_id: 5095, zone_name: "Wanaparthy" },
    // Anantapuram (5151)
    { zone_id: 5151, zone_name: "Anantapuram" },
    // Puttaparthi (5152)
    { zone_id: 5152, zone_name: "Puttaparthi" },
    // Kadapa (5161)
    { zone_id: 5161, zone_name: "Kadapa" },
    // Rayachoti (5162)
    { zone_id: 5162, zone_name: "Rayachoti" },
    // Chittoor (5171)
    { zone_id: 5171, zone_name: "Chittoor" },
    // Madanapalle (5172)
    { zone_id: 5172, zone_name: "Madanapalle" },
    // Tirupati (5173)
    { zone_id: 5173, zone_name: "Tirupati" },
    // Kurnool (5181)
    { zone_id: 5181, zone_name: "Kurnool" },
    // Nandyal (5182)
    { zone_id: 5182, zone_name: "Nandyal" },
    // Vijayawada (5201)
    { zone_id: 5201, zone_name: "Vijayawada" },
    // Machilipatnam (5211)
    { zone_id: 5211, zone_name: "Machilipatnam" },
    // Guntur (5221)
    { zone_id: 5221, zone_name: "Guntur" },
    // Bapatla (5222)
    { zone_id: 5222, zone_name: "Bapatla" },
    // Narasaraopeta (5223)
    { zone_id: 5223, zone_name: "Narasaraopeta" },
    // Ongole (5231)
    { zone_id: 5231, zone_name: "Ongole" },
    // Markapuram (5232)
    { zone_id: 5232, zone_name: "Markapuram" },
    // Visakhapatnam (5301)
    { zone_id: 5301, zone_name: "Visakhapatnam" },
    // Anakapalli (5311)
    { zone_id: 5311, zone_name: "Anakapalli" },
    // Paderu (5312)
    { zone_id: 5312, zone_name: "Paderu" },
    // Srikakulam (5321)
    { zone_id: 5321, zone_name: "Srikakulam" },
    // Kakinada (5331)
    { zone_id: 5331, zone_name: "Kakinada" },
    // Rajahmundry (5332)
    { zone_id: 5332, zone_name: "Rajahmundry" },
    // Amalapuram (5333)
    { zone_id: 5333, zone_name: "Amalapuram" },
    // Rampachodavaram (5334)
    { zone_id: 5334, zone_name: "Rampachodavaram" },
    // Eluru (5341)
    { zone_id: 5341, zone_name: "Eluru" },
    // Bhimavaram (5342)
    { zone_id: 5342, zone_name: "Bhimavaram" },
    // Vizianagaram (5351)
    { zone_id: 5351, zone_name: "Vizianagaram" },
    // Parvathipuram (5352)
    { zone_id: 5352, zone_name: "Parvathipuram" }
];

function getZoneName(id) {
  const z = ZONES.find(z => z.zone_id === id);
  return z ? z.zone_name : 'Unknown';
}

export default async function handler(req, res) {
  try {
    // Get the ID from the query parameter or URL path
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1] || req.query.id;
    
    console.log('📌 Job ID requested:', id);

    if (!id) {
      return res.status(400).send('Missing job ID');
    }

    // Fetch job from Supabase using REST API
    const response = await fetch(
      `${supabaseUrl}/rest/v1/active_jobs?select=*&job_id=eq.${id}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const jobs = await response.json();
    const job = jobs && jobs.length > 0 ? jobs[0] : null;

    if (!job) {
      return res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Job Not Found - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
      h1 { color: #dc2626; }
      .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; text-decoration: none; margin-top: 12px; }
    </style>
</head>
<body>
  <div class="card">
    <h1>🔍 Job Not Found</h1>
    <p>Job with ID <strong>${id}</strong> was not found.</p>
    <a href="/job" class="btn">📋 View All Jobs</a>
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
    <meta property="og:description" content="Apply for ${job.job_title || 'this job'} at ${job.company_name || 'Company'}.">
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
    </style>
</head>
<body>
  <div class="card">
    <div class="badge">💼 JOB #${job.job_id}</div>
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
    console.error('❌ Error:', error);
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
    </style>
</head>
<body>
  <div class="card">
    <h1>❌ Error Loading Job</h1>
    <p>${error.message}</p>
    <a href="/job" class="btn">📋 View All Jobs</a>
  </div>
</body>
</html>
    `);
  }
}
