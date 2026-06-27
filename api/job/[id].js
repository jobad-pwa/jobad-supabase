// api/job/[id].js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { id } = req.query;
  
  // Fetch job from Supabase
  const { data: job, error } = await supabase
    .from('active_jobs')
    .select('*')
    .eq('job_id', parseInt(id))
    .single();

  if (error || !job) {
    // If job not found, redirect to homepage
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  // Get zone and area names
  const zones = [
    { zone_id: 100, zone_name: "Hyderabad" },
    { zone_id: 200, zone_name: "North Telangana" },
    { zone_id: 300, zone_name: "East Telangana" },
    { zone_id: 400, zone_name: "South Telangana" }
  ];
  const areas = [
    { area_id: 100000, zone_id: 100, area_name: "All Hyderabad" },
    { area_id: 200000, zone_id: 200, area_name: "All North Telangana" },
    { area_id: 300000, zone_id: 300, area_name: "All East Telangana" },
    { area_id: 400000, zone_id: 400, area_name: "All South Telangana" },
    { area_id: 100001, zone_id: 100, area_name: "Kukatpally" },
    { area_id: 100002, zone_id: 100, area_name: "Madhapur" },
    { area_id: 100003, zone_id: 100, area_name: "Kondapur" },
    { area_id: 100004, zone_id: 100, area_name: "Gachibowli" },
    { area_id: 100005, zone_id: 100, area_name: "Hitech City" },
    { area_id: 100006, zone_id: 100, area_name: "Miyapur" },
    { area_id: 100007, zone_id: 100, area_name: "Uppal" },
    { area_id: 100008, zone_id: 100, area_name: "LB Nagar" },
    { area_id: 100009, zone_id: 100, area_name: "Dilsukhnagar" },
    { area_id: 100995, zone_id: 100, area_name: "Shamshabad" },
    { area_id: 100996, zone_id: 100, area_name: "Jadcharla" },
    { area_id: 100997, zone_id: 100, area_name: "Medak" },
    { area_id: 100998, zone_id: 100, area_name: "Sangareddy" },
    { area_id: 100999, zone_id: 100, area_name: "Zahirabad" },
    { area_id: 200001, zone_id: 200, area_name: "Adilabad" },
    { area_id: 200002, zone_id: 200, area_name: "Asifabad" },
    { area_id: 200003, zone_id: 200, area_name: "Mancherial" },
    { area_id: 200004, zone_id: 200, area_name: "Nirmal" },
    { area_id: 200005, zone_id: 200, area_name: "Nizamabad" },
    { area_id: 200006, zone_id: 200, area_name: "Jagtial" },
    { area_id: 200007, zone_id: 200, area_name: "Peddapalli" },
    { area_id: 200008, zone_id: 200, area_name: "Karimnagar" },
    { area_id: 200009, zone_id: 200, area_name: "Sircilla" },
    { area_id: 200010, zone_id: 200, area_name: "Kamareddy" },
    { area_id: 200011, zone_id: 200, area_name: "Siddipet" },
    { area_id: 300001, zone_id: 300, area_name: "Warangal" },
    { area_id: 300002, zone_id: 300, area_name: "Hanumakonda" },
    { area_id: 300003, zone_id: 300, area_name: "Khammam" },
    { area_id: 300004, zone_id: 300, area_name: "Bhupalpally" },
    { area_id: 300005, zone_id: 300, area_name: "Mulugu" },
    { area_id: 300006, zone_id: 300, area_name: "Mahabubabad" },
    { area_id: 300007, zone_id: 300, area_name: "Kothagudem" },
    { area_id: 300008, zone_id: 300, area_name: "Bhuvanagiri" },
    { area_id: 300009, zone_id: 300, area_name: "Jangaon" },
    { area_id: 400001, zone_id: 400, area_name: "Mahabubnagar" },
    { area_id: 400002, zone_id: 400, area_name: "Nalgonda" },
    { area_id: 400003, zone_id: 400, area_name: "Suryapet" },
    { area_id: 400004, zone_id: 400, area_name: "Nagarkurnool" },
    { area_id: 400005, zone_id: 400, area_name: "Vikarabad" },
    { area_id: 400006, zone_id: 400, area_name: "Narayanpet" },
    { area_id: 400007, zone_id: 400, area_name: "Wanaparthy" },
    { area_id: 400008, zone_id: 400, area_name: "Gadwal" }
  ];

  function getZoneName(id) {
    const z = zones.find(z => z.zone_id === id);
    return z ? z.zone_name : 'Unknown';
  }

  function getAreaName(id) {
    const a = areas.find(a => a.area_id === id);
    return a ? a.area_name : '';
  }

  const zoneName = getZoneName(job.zone_id);
  const areaName = getAreaName(job.area_id);
  const locationName = areaName ? `${areaName}, ${zoneName}` : zoneName;

  // Build JSON-LD for Google Jobs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.job_title || 'Job Opportunity',
    "description": job.job_description || 'Job opportunity on JobAd',
    "identifier": {
      "@type": "PropertyValue",
      "name": "JobAd",
      "value": job.job_id
    },
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
    },
    "experienceRequirements": {
      "@type": "OccupationalExperienceRequirements",
      "monthsOfExperience": (job.min_experience_years || 0) * 12
    },
    "skills": job.skills_comma_separated || '',
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "India"
    },
    "jobLocationType": "TELECOMMUTE",
    "workHours": "Full-time",
    "responsibilities": job.job_description || '',
    "qualifications": job.skills_comma_separated || '',
    "industry": "Technology",
    "occupationalCategory": "Software Development"
  };

  // Generate HTML with JSON-LD injected
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${job.job_title || 'Job'} at ${job.company_name || 'Company'} - JobAd</title>
    <meta name="description" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'} in ${zoneName}. ${job.min_experience_years || 0} years experience required. Salary: ₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month.">
    <meta name="keywords" content="jobs, ${job.job_title || ''}, ${job.company_name || ''}, hiring, recruitment">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563eb">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <!-- Open Graph Tags for social sharing -->
    <meta property="og:title" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'}">
    <meta property="og:description" content="Apply for ${job.job_title || 'this job'} at ${job.company_name || 'Company'}. Located in ${zoneName}. Experience: ${job.min_experience_years || 0} years. Salary: ₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://jobad-pwa.vercel.app/job/${job.job_id}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'}">
    <meta name="twitter:description" content="Apply for ${job.job_title || 'this job'} at ${job.company_name || 'Company'}. Located in ${zoneName}.">
    
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd, null, 2)}
    </script>
    
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background: #f3f4f6;
        margin: 0;
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .card {
        max-width: 400px;
        width: 100%;
        background: white;
        border-radius: 24px;
        padding: 20px 18px 10px 18px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        height: 95vh;
        max-height: 780px;
        position: relative;
        overflow: hidden;
      }
      .job-title { font-size: 20px; font-weight: 700; color: #1e40af; margin: 0 0 4px 0; }
      .company-name { font-size: 16px; color: #475569; margin: 0 0 12px 0; }
      .job-field { margin-bottom: 8px; }
      .job-field label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; }
      .job-field .value { font-size: 14px; color: #1e293b; }
      .btn-open { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 12px; }
      .btn-open:hover { background: #1d4ed8; }
      .badge { display: inline-block; padding: 2px 12px; border-radius: 12px; font-size: 10px; font-weight: 700; background: #dbeafe; color: #1e40af; }
    </style>
</head>
<body>
  <div class="card">
    <div class="badge">JOB</div>
    <h1 class="job-title">${job.job_title || 'Untitled Job'}</h1>
    <p class="company-name">${job.company_name || 'Company'}</p>
    
    <div class="job-field">
      <label>📍 Location</label>
      <div class="value">${locationName || 'Not specified'}</div>
    </div>
    
    <div class="job-field">
      <label>💼 Experience</label>
      <div class="value">${job.min_experience_years || 0} years</div>
    </div>
    
    <div class="job-field">
      <label>💰 Salary</label>
      <div class="value">₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month</div>
    </div>
    
    <div class="job-field">
      <label>🛠️ Skills</label>
      <div class="value">${job.skills_comma_separated || 'Not specified'}</div>
    </div>
    
    <div class="job-field">
      <label>📝 Description</label>
      <div class="value" style="white-space: pre-wrap;">${job.job_description || 'No description provided.'}</div>
    </div>
    
    <button class="btn-open" onclick="window.location.href='/?type=JOB&id=${job.job_id}'">
      Open in App
    </button>
  </div>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
