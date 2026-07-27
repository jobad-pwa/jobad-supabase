// api/job-id.js
const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

// ============================================================
// COMPLETE ZONES DATA
// ============================================================
const ZONES = [
  [5001, "Hyderabad", "Telangana"],
  [5601, "Bangalore", "Karnataka"],
  [6001, "Chennai", "Tamil Nadu"],
  [4001, "Mumbai", "Maharashtra"],
  [1101, "Delhi", "Delhi"],
  [1221, "Gurugram", "Haryana"],
  [2011, "Noida", "Uttar Pradesh"],
  [4111, "Pune", "Maharashtra"],
  [7001, "Kolkata", "West Bengal"],
  [3801, "Ahmedabad", "Gujarat"],
  [3951, "Surat", "Gujarat"],
  [5301, "Visakhapatnam", "Andhra Pradesh"],
  [6411, "Coimbatore", "Tamil Nadu"],
  [3901, "Vadodara", "Gujarat"],
  [4521, "Indore", "Madhya Pradesh"],
  [4401, "Nagpur", "Maharashtra"],
  [6821, "Kochi", "Kerala"],
  [4221, "Nashik", "Maharashtra"],
  [3021, "Jaipur", "Rajasthan"],
  [2261, "Lucknow", "Uttar Pradesh"],
  [4621, "Bhopal", "Madhya Pradesh"],
  [6951, "Thiruvananthapuram", "Kerala"],
  [8311, "Jamshedpur", "Jharkhand"],
  [7511, "Bhubaneswar", "Odisha"],
  [5201, "Vijayawada", "Andhra Pradesh"],
  [3601, "Rajkot", "Gujarat"],
  [2081, "Kanpur", "Uttar Pradesh"],
  [1411, "Ludhiana", "Punjab"],
  [6251, "Madurai", "Tamil Nadu"],
  [2211, "Varanasi", "Uttar Pradesh"],
  [2501, "Meerut", "Uttar Pradesh"],
  [2821, "Agra", "Uttar Pradesh"],
  [8001, "Patna", "Bihar"],
  [8341, "Ranchi", "Jharkhand"],
  [7801, "Guwahati", "Assam"],
  [1600, "Chandigarh", "Chandigarh"],
  [1403, "Mohali", "Punjab"],
  [1341, "Panchkula", "Haryana"],
  [6201, "Trichy", "Tamil Nadu"],
  [6361, "Salem", "Tamil Nadu"],
  [5751, "Mangaluru", "Karnataka"],
  [5701, "Mysuru", "Karnataka"],
  [5221, "Guntur", "Andhra Pradesh"],
  [4311, "Aurangabad", "Maharashtra"],
  [4131, "Solapur", "Maharashtra"],
  [4161, "Kolhapur", "Maharashtra"],
  [1431, "Amritsar", "Punjab"],
  [1441, "Jalandhar", "Punjab"],
  [8261, "Dhanbad", "Jharkhand"],
  [4921, "Raipur", "Chhattisgarh"],
  [4901, "Bhilai-Durg", "Chhattisgarh"],
  [3421, "Jodhpur", "Rajasthan"],
  [3131, "Udaipur", "Rajasthan"],
  [3241, "Kota", "Rajasthan"],
  [4741, "Gwalior", "Madhya Pradesh"],
  [4821, "Jabalpur", "Madhya Pradesh"],
  [2431, "Bareilly", "Uttar Pradesh"],
  [2021, "Aligarh", "Uttar Pradesh"],
  [2441, "Moradabad", "Uttar Pradesh"],
  [2731, "Gorakhpur", "Uttar Pradesh"],
  [1211, "Faridabad", "Haryana"],
  [1321, "Panipat", "Haryana"],
  [1801, "Jammu", "Jammu & Kashmir"],
  [1901, "Srinagar", "Jammu & Kashmir"],
  [2481, "Dehradun", "Uttarakhand"],
  [2491, "Haridwar", "Uttarakhand"],
  [2631, "Rudrapur", "Uttarakhand"],
  [1731, "Baddi", "Himachal Pradesh"],
  [3881, "Anand", "Gujarat"],
  [3931, "Ankleshwar-Bharuch", "Gujarat"],
  [3961, "Vapi", "Gujarat"],
  [3631, "Morbi-Wankaner", "Gujarat"],
  [3611, "Jamnagar", "Gujarat"],
  [3641, "Bhavnagar", "Gujarat"],
  [5331, "Kakinada", "Andhra Pradesh"],
  [5241, "Nellore", "Andhra Pradesh"],
  [5171, "Tirupati", "Andhra Pradesh"],
  [5061, "Warangal", "Telangana"],
  [5051, "Karimnagar", "Telangana"],
  [5801, "Hubli-Dharwad", "Karnataka"],
  [5901, "Belagavi", "Karnataka"],
  [6351, "Hosur", "Tamil Nadu"],
  [6381, "Erode", "Tamil Nadu"],
  [6281, "Thoothukudi", "Tamil Nadu"],
  [6781, "Palakkad", "Kerala"],
  [6911, "Kollam", "Kerala"],
  [7691, "Rourkela", "Odisha"],
  [7681, "Sambalpur", "Odisha"],
  [7131, "Asansol", "West Bengal"],
  [7132, "Durgapur", "West Bengal"],
  [7211, "Haldia", "West Bengal"],
  [7341, "Siliguri", "West Bengal"],
  [8421, "Muzaffarpur", "Bihar"],
  [8121, "Bhagalpur", "Bihar"],
  [4951, "Bilaspur", "Chhattisgarh"],
  [4952, "Korba", "Chhattisgarh"],
  [8271, "Bokaro", "Jharkhand"],
  [1711, "Shimla", "Himachal Pradesh"],
  // Add more zones as needed
];

const WORK_MODES = {
  0: 'FULL_TIME',
  1: 'FULL_TIME',
  2: 'FULL_TIME',
  3: 'FULL_TIME',
  4: 'REMOTE',
  5: 'FULL_TIME'
};

const WORK_MODE_LABELS = {
  0: 'Any',
  1: 'Onsite (Office)',
  2: 'Onsite (Project site)',
  3: 'Field work',
  4: 'Remote (WFH)',
  5: 'Hybrid'
};

function getZoneInfo(id) {
  const z = ZONES.find(z => z[0] === id);
  return z ? { name: z[1], state: z[2] || z[1] } : { name: 'India', state: 'India' };
}

function getWorkMode(mode) {
  return WORK_MODE_LABELS[mode] || 'Not specified';
}

// ============================================================
// JOB LIST API - /api/job
// ============================================================
export async function listJobs(req, res) {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/active_jobs?select=*&status=eq.1&order=posted_date.desc&limit=100`,
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

    const now = new Date();
    const activeJobs = jobs.filter(job => new Date(job.expiry_date) > now);

    // Generate HTML list
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jobs - JobAd</title>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563eb">
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, sans-serif; background: #f3f4f6; margin: 0; padding: 16px; }
      .container { max-width: 800px; margin: 0 auto; }
      .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      .logo { font-size: 24px; font-weight: 900; color: #2563eb; text-decoration: none; }
      .job-card { background: white; border-radius: 16px; padding: 16px; margin-bottom: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; cursor: pointer; transition: 0.2s; }
      .job-card:hover { border-color: #2563eb; background: #f8faff; }
      .job-title { font-weight: 600; font-size: 16px; color: #1e40af; margin: 0; }
      .company-name { font-size: 14px; color: #475569; margin: 2px 0; }
      .job-meta { font-size: 12px; color: #64748b; margin: 4px 0; display: flex; gap: 12px; flex-wrap: wrap; }
      .job-meta span { display: inline-flex; align-items: center; gap: 4px; }
      .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 10px; font-weight: 700; background: #dbeafe; color: #1e40af; }
      .no-jobs { text-align: center; padding: 40px 0; color: #94a3b8; }
      .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px; padding: 16px 0; border-top: 1px solid #e2e8f0; }
      @media (max-width: 600px) { .job-meta { flex-direction: column; gap: 4px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="/" class="logo">JobAd</a>
            <span style="font-size: 14px; color: #64748b;">${activeJobs.length} jobs</span>
        </div>`;

    if (activeJobs.length === 0) {
      html += `<div class="no-jobs">No active jobs available</div>`;
    } else {
      activeJobs.forEach(job => {
        const zone = getZoneInfo(job.zone_id);
        html += `
        <div class="job-card" onclick="window.location.href='/job/${job.job_id}'">
            <div class="job-title">${job.job_title || 'Untitled Job'}</div>
            <div class="company-name">🏢 ${job.company_name || 'Company'}</div>
            <div class="job-meta">
                <span>📍 ${zone.name}</span>
                <span>💰 ₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/mo</span>
                <span>📅 ${job.min_experience_years || 0} yrs</span>
                <span class="badge">${getWorkMode(job.work_mode)}</span>
            </div>
        </div>`;
      });
    }

    html += `
        <div class="footer">JobAd - Find Jobs in Your Area</div>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).send(html);
  } catch (error) {
    console.error('❌ Error listing jobs:', error);
    res.status(500).send(`
<!DOCTYPE html>
<html>
<head><title>Error - JobAd</title></head>
<body>
  <h1>Error Loading Jobs</h1>
  <p>${error.message}</p>
  <a href="/">Go Home</a>
</body>
</html>
    `);
  }
}

// ============================================================
// SINGLE JOB API - /api/job/:id
// ============================================================
export default async function handler(req, res) {
  // Add CORS headers for Google and Indeed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Handle /job path (list all jobs)
    if (req.url === '/job' || req.url === '/job/') {
      return listJobs(req, res);
    }

    // Extract job ID from URL
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1] || req.query.id;
    
    console.log('📌 Job ID requested:', id);

    if (!id) {
      return res.status(400).send('Missing job ID');
    }

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

    // Check if job exists and is active
    const now = new Date();
    if (!job || job.status !== 1 || new Date(job.expiry_date) < now) {
      return res.status(404).send(`
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
    <p>Job with ID <strong>${id}</strong> was not found or has expired.</p>
    <a href="/api/job" class="btn">📋 View All Jobs</a>
  </div>
</body>
</html>
      `);
    }

    const zoneInfo = getZoneInfo(job.zone_id);
    const workModeLabel = getWorkMode(job.work_mode);
    const workModeSchema = WORK_MODES[job.work_mode] || 'FULL_TIME';

    // Build Google Jobs JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.job_title || 'Job Opportunity',
      "description": job.job_description || 'Job opportunity on JobAd',
      "identifier": {
        "@type": "PropertyValue",
        "name": job.company_name || 'Company',
        "value": `JOB-${job.job_id}`
      },
      "datePosted": job.posted_date ? new Date(job.posted_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      "validThrough": job.expiry_date ? new Date(job.expiry_date).toISOString().split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      "employmentType": workModeSchema,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company_name || 'Company',
        "website": job.company_website || 'https://jobad-pwa.vercel.app/'
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": zoneInfo.name,
          "addressRegion": zoneInfo.state,
          "addressCountry": "IN"
        }
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "IN"
      },
      "skills": job.skills_comma_separated || '',
      "experienceRequirements": {
        "@type": "ExperienceRequirements",
        "yearsOfExperience": job.min_experience_years || 0
      }
    };

    // Add salary if available
    if (job.max_salary_monthly > 0) {
      jsonLd.baseSalary = {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.max_salary_monthly,
          "unitText": "MONTH"
        }
      };
    }

    // Generate HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${job.job_title || 'Job'} at ${job.company_name || 'Company'} - JobAd</title>
    <meta name="description" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'} in ${zoneInfo.name}. ${job.min_experience_years || 0} years experience. Salary ₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month.">
    <meta name="keywords" content="${job.job_title}, ${job.company_name}, ${zoneInfo.name} jobs, ${job.skills_comma_separated || ''}">
    <link rel="canonical" href="https://jobad-pwa.vercel.app/job/${job.job_id}">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563eb">
    <meta property="og:title" content="${job.job_title || 'Job'} at ${job.company_name || 'Company'}">
    <meta property="og:description" content="Apply for ${job.job_title || 'this job'} at ${job.company_name || 'Company'} in ${zoneInfo.name}.">
    <meta property="og:url" content="https://jobad-pwa.vercel.app/job/${job.job_id}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="robots" content="index, follow">
    
    <!-- Google Jobs Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
    
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; margin: 0; padding: 16px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; width: 100%; background: white; border-radius: 24px; padding: 24px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      .badge { display: inline-block; padding: 2px 12px; border-radius: 12px; font-size: 10px; font-weight: 700; background: #dbeafe; color: #1e40af; margin-bottom: 8px; }
      .job-title { font-size: 22px; font-weight: 700; color: #1e40af; margin: 0; }
      .company-name { font-size: 16px; color: #2563eb; font-weight: 600; margin: 4px 0 16px 0; cursor: pointer; }
      .company-name:hover { text-decoration: underline; }
      .job-field { margin-bottom: 10px; }
      .job-field label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; letter-spacing: 0.05em; }
      .job-field .value { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f1f5f9; }
      .job-field .value-multiline { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f1f5f9; white-space: pre-wrap; }
      .perks { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 12px 16px; margin: 12px 0; }
      .perks h4 { color: #166534; margin: 0 0 6px 0; font-size: 13px; }
      .perks ul { margin: 0; padding-left: 20px; color: #166534; font-size: 13px; }
      .btn-open { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 16px; transition: 0.2s; }
      .btn-open:hover { background: #1d4ed8; }
      .footer { margin-top: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px; }
      .skill-tag { display: inline-block; background: #f1f5f9; padding: 2px 10px; border-radius: 12px; font-size: 12px; color: #475569; margin: 2px 4px 2px 0; }
      @media (max-width: 480px) { .card { padding: 16px; } }
    </style>
</head>
<body>
  <div class="card">
    <div class="badge">💼 JOB #${job.job_id}</div>
    <h1 class="job-title">${job.job_title || 'Untitled Job'}</h1>
    <p class="company-name" onclick="window.location.href='/api/company/${job.mobile}'">🏢 ${job.company_name || 'Company'}</p>
    
    <div class="job-field"><label>📍 Location</label><div class="value">${zoneInfo.name}, ${zoneInfo.state}</div></div>
    <div class="job-field"><label>💼 Experience</label><div class="value">${job.min_experience_years || 0} years</div></div>
    <div class="job-field"><label>💰 Salary</label><div class="value">₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month</div></div>
    <div class="job-field"><label>🛠️ Skills</label><div class="value">${(job.skills_comma_separated || 'Not specified').split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}</div></div>
    <div class="job-field"><label>💼 Work Mode</label><div class="value">${workModeLabel}</div></div>
    
    ${job.job_description ? `
    <div class="job-field"><label>📝 Description</label><div class="value-multiline">${job.job_description.replace(/\n/g, '<br>')}</div></div>
    ` : ''}
    
    ${job.job_description && job.job_description.includes('Free') ? `
    <div class="perks">
        <h4>✨ Perks & Benefits</h4>
        <ul>
            ${job.job_description.includes('Food') ? '<li>🍽️ Free Food</li>' : ''}
            ${job.job_description.includes('Accommodation') ? '<li>🏠 Free Accommodation</li>' : ''}
            ${job.job_description.includes('immediate') ? '<li>⚡ Immediate Joining</li>' : ''}
        </ul>
    </div>
    ` : ''}
    
    <button class="btn-open" onclick="window.location.href='/?type=JOB&id=${job.job_id}'">📱 Open in App</button>
    
    <div class="footer">
        JobAd - Find Jobs in Your Area<br>
        <span style="font-size: 10px;">Posted: ${job.posted_date ? new Date(job.posted_date).toLocaleDateString('en-IN') : 'N/A'} | Expires: ${job.expiry_date ? new Date(job.expiry_date).toLocaleDateString('en-IN') : 'N/A'}</span>
    </div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
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
    <a href="/api/job" class="btn">📋 View All Jobs</a>
  </div>
</body>
</html>
    `);
  }
}
