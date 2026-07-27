// api/job-list.js - COMPLETE REVISION
export default async function handler(req, res) {
  const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

  // Set CORS headers for API access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse query parameters
  const { format = 'json', limit = 100, offset = 0 } = req.query;

  try {
    // Fetch ALL job data needed for job platforms
    const response = await fetch(
      `${supabaseUrl}/rest/v1/active_jobs?select=job_id,job_title,company_name,company_website,job_description,min_experience_years,max_salary_monthly,preferred_gender,skills_comma_separated,zone_id,area_id,expiry_date,posted_date,work_mode,education_required,share_count,views,calls,applicants,status&status=eq.1&order=posted_date.desc&limit=${limit}&offset=${offset}`,
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

    // Handle XML format for Indeed
    if (format === 'xml') {
      return res.status(200).setHeader('Content-Type', 'application/xml').send(generateIndeedFeed(jobs));
    }

    // Handle HTML format for human viewing
    if (format === 'html') {
      return res.status(200).setHeader('Content-Type', 'text/html').send(generateHTML(jobs));
    }

    // Default: JSON with Google Jobs Schema
    const formattedJobs = jobs.map(job => ({
      id: job.job_id,
      title: job.job_title || 'Untitled Job',
      company: job.company_name || 'Unknown Company',
      company_website: job.company_website || '',
      description: job.job_description || '',
      location: getLocation(job.zone_id),
      area: getArea(job.area_id),
      experience: job.min_experience_years || 0,
      salary: job.max_salary_monthly || 0,
      salary_display: job.max_salary_monthly ? `₹${job.max_salary_monthly.toLocaleString('en-IN')}/month` : 'Not specified',
      gender: getGender(job.preferred_gender),
      skills: job.skills_comma_separated || '',
      work_mode: getWorkMode(job.work_mode),
      education: getEducation(job.education_required),
      posted_date: job.posted_date,
      expiry_date: job.expiry_date,
      url: `https://jobad-pwa.vercel.app/job/${job.job_id}`,
      // For Google Jobs Schema
      schema: generateJobSchema(job)
    }));

    // Return JSON with schema
    res.status(200).json({
      success: true,
      total: formattedJobs.length,
      jobs: formattedJobs
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Location mapping (add more as needed)
function getLocation(zoneId) {
  const zones = {
    5001: 'Hyderabad',
    5601: 'Bangalore',
    6001: 'Chennai',
    4001: 'Mumbai',
    1101: 'Delhi',
    7001: 'Kolkata',
    4111: 'Pune',
    3801: 'Ahmedabad',
    3021: 'Jaipur',
    2261: 'Lucknow',
    1751: 'Shimla',
    2011: 'Noida',
    1221: 'Gurugram',
    4521: 'Indore',
    4401: 'Nagpur',
    6821: 'Kochi',
    4221: 'Nashik',
    4621: 'Bhopal',
    6951: 'Thiruvananthapuram',
    8311: 'Jamshedpur',
    7511: 'Bhubaneswar',
    5201: 'Vijayawada',
    3601: 'Rajkot',
    2081: 'Kanpur',
    1411: 'Ludhiana',
    6251: 'Madurai',
    2211: 'Varanasi',
    2501: 'Meerut',
    2821: 'Agra',
    8001: 'Patna',
    7801: 'Guwahati',
    1601: 'Chandigarh',
  };
  return zones[zoneId] || 'India';
}

function getArea(areaId) {
  // Return area name if available, else empty
  return areaId ? `Area ${areaId}` : '';
}

function getGender(code) {
  const genders = {
    0: 'No Preference',
    1: 'Female',
    2: 'Male'
  };
  return genders[code] || 'No Preference';
}

function getWorkMode(mode) {
  const modes = {
    0: 'Any',
    1: 'Onsite (Office)',
    2: 'Onsite (Project site)',
    3: 'Field work',
    4: 'Remote (WFH)',
    5: 'Hybrid'
  };
  return modes[mode] || 'Not specified';
}

function getEducation(code) {
  const educations = {
    0: 'Not Specified',
    1: 'High School (10th)',
    2: 'Intermediate (12th)',
    3: 'Diploma',
    4: 'Graduate',
    5: 'Graduate (Technical)',
    6: 'Post Graduate',
    7: 'Post Graduate (Technical)',
    8: 'Doctorate / PhD',
    9: 'Professional Certification'
  };
  return educations[code] || 'Not Specified';
}

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

// ============================================================
// GOOGLE JOBS SCHEMA GENERATOR
// ============================================================
function generateJobSchema(job) {
  const workModeMap = {
    0: 'FULL_TIME',
    1: 'FULL_TIME',
    2: 'FULL_TIME',
    3: 'FULL_TIME',
    4: 'REMOTE',
    5: 'FULL_TIME'
  };

  const location = getLocation(job.zone_id);
  const stateMap = {
    'Hyderabad': 'Telangana',
    'Bangalore': 'Karnataka',
    'Chennai': 'Tamil Nadu',
    'Mumbai': 'Maharashtra',
    'Delhi': 'Delhi',
    'Kolkata': 'West Bengal',
    'Pune': 'Maharashtra',
    'Ahmedabad': 'Gujarat',
    'Jaipur': 'Rajasthan',
    'Lucknow': 'Uttar Pradesh',
    'Shimla': 'Himachal Pradesh',
    'Noida': 'Uttar Pradesh',
    'Gurugram': 'Haryana',
    'Indore': 'Madhya Pradesh',
    'Nagpur': 'Maharashtra',
    'Kochi': 'Kerala',
    'Nashik': 'Maharashtra',
    'Bhopal': 'Madhya Pradesh',
    'Thiruvananthapuram': 'Kerala',
    'Jamshedpur': 'Jharkhand',
    'Bhubaneswar': 'Odisha',
    'Vijayawada': 'Andhra Pradesh',
    'Rajkot': 'Gujarat',
    'Kanpur': 'Uttar Pradesh',
    'Ludhiana': 'Punjab',
    'Madurai': 'Tamil Nadu',
    'Varanasi': 'Uttar Pradesh',
    'Meerut': 'Uttar Pradesh',
    'Agra': 'Uttar Pradesh',
    'Patna': 'Bihar',
    'Guwahati': 'Assam',
    'Chandigarh': 'Chandigarh'
  };

  const postedDate = job.posted_date ? new Date(job.posted_date) : new Date();
  const expiryDate = job.expiry_date ? new Date(job.expiry_date) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.job_title || 'Job Opportunity',
    'description': job.job_description || 'Job description not available',
    'identifier': {
      '@type': 'PropertyValue',
      'name': job.company_name || 'Company',
      'value': `JOB-${job.job_id}`
    },
    'datePosted': postedDate.toISOString().split('T')[0],
    'validThrough': expiryDate.toISOString().split('T')[0],
    'employmentType': workModeMap[job.work_mode] || 'FULL_TIME',
    'hiringOrganization': {
      '@type': 'Organization',
      'name': job.company_name || 'Company',
      'website': job.company_website || 'https://jobad-pwa.vercel.app/'
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': location,
        'addressRegion': stateMap[location] || location,
        'addressCountry': 'IN'
      }
    },
    'applicantLocationRequirements': {
      '@type': 'Country',
      'name': 'IN'
    },
    'skills': job.skills_comma_separated || '',
    'qualifications': job.skills_comma_separated || '',
    'experienceRequirements': {
      '@type': 'ExperienceRequirements',
      'yearsOfExperience': job.min_experience_years || 0
    },
    'occupationalCategory': job.job_title || 'Machine Operator'
  };

  // Add salary if available
  if (job.max_salary_monthly && job.max_salary_monthly > 0) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      'currency': 'INR',
      'value': {
        '@type': 'QuantitativeValue',
        'value': job.max_salary_monthly,
        'unitText': 'MONTH'
      }
    };
  }

  return schema;
}

// ============================================================
// INDEED XML FEED GENERATOR
// ============================================================
function generateIndeedFeed(jobs) {
  const now = new Date();
  const activeJobs = jobs.filter(job => new Date(job.expiry_date) > now);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>JobAd</publisher>
  <publisherurl>https://jobad-pwa.vercel.app</publisherurl>
  <lastBuildDate>${now.toISOString()}</lastBuildDate>
  <jobs>`;

  activeJobs.forEach(job => {
    const location = getLocation(job.zone_id);
    const salary = job.max_salary_monthly || '';
    
    xml += `
    <job>
      <id>${job.job_id}</id>
      <title>${escapeXml(job.job_title || '')}</title>
      <company>${escapeXml(job.company_name || '')}</company>
      <city>${escapeXml(location)}</city>
      <country>IN</country>
      <description>${escapeXml(job.job_description || '')}</description>
      <salary>${escapeXml(salary)}</salary>
      <date>${job.posted_date ? new Date(job.posted_date).toISOString().split('T')[0] : ''}</date>
      <url>https://jobad-pwa.vercel.app/job/${job.job_id}</url>
      <experience>${job.min_experience_years || 0}</experience>
      <skills>${escapeXml(job.skills_comma_separated || '')}</skills>
      <workmode>${getWorkMode(job.work_mode)}</workmode>
    </job>`;
  });

  xml += `
  </jobs>
</source>`;

  return xml;
}

// ============================================================
// HTML GENERATOR (for human viewing)
// ============================================================
function generateHTML(jobs) {
  let jobList = jobs.map(job => {
    const title = job.job_title || 'Untitled Job';
    const company = job.company_name || 'Unknown Company';
    const exp = job.min_experience_years || 0;
    const location = getLocation(job.zone_id);
    const salary = job.max_salary_monthly ? `₹${job.max_salary_monthly.toLocaleString('en-IN')}` : 'Not specified';
    const expiry = job.expiry_date ? new Date(job.expiry_date).toLocaleDateString('en-IN') : 'N/A';
    const isExpired = job.expiry_date ? new Date(job.expiry_date) < new Date() : false;
    
    return `<li>
      <a href="/job/${job.job_id}">
        <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <div style="font-size:13px;color:#64748b;">${escapeHtml(company)} • ${exp} yrs • 📍 ${escapeHtml(location)}</div>
          </div>
          <div style="text-align:right;font-size:13px;">
            <div style="font-weight:600;color:#2563eb;">${escapeHtml(salary)}</div>
            ${isExpired ? '<span style="color:#dc2626;font-size:11px;">⚠️ Expired</span>' : ''}
          </div>
        </div>
      </a>
    </li>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
    <title>All Jobs - JobAd</title>
    <meta name="description" content="Browse all job opportunities on JobAd. Find jobs in your area.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://jobad-pwa.vercel.app/api/jobs?format=html">
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; margin: 0; padding: 20px; }
      .container { max-width: 700px; margin: 0 auto; }
      .card { background: white; border-radius: 24px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      h1 { color: #2563eb; margin: 0 0 4px 0; font-size: 28px; }
      .subtitle { color: #64748b; margin: 0 0 20px 0; font-size: 14px; }
      .count { background: #dbeafe; padding: 2px 12px; border-radius: 12px; font-size: 14px; font-weight: 600; color: #1e40af; }
      ul { list-style: none; padding: 0; margin: 0; }
      li { padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
      li:last-child { border-bottom: none; }
      li a { color: #1e293b; text-decoration: none; display: block; transition: 0.15s; }
      li a:hover { color: #2563eb; }
      .back { display: inline-block; margin-top: 20px; color: #64748b; text-decoration: none; font-size: 14px; }
      .back:hover { color: #2563eb; }
      .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      .debug { background: #f8fafc; padding: 8px 12px; border-radius: 8px; font-size: 12px; color: #64748b; margin-bottom: 16px; border: 1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; }
      .json-link { color: #2563eb; font-weight:500; }
    </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>📋 All Jobs</h1>
      <p class="subtitle">Browse all available job opportunities on JobAd</p>
      <div class="debug">
        <span>Total jobs: <span class="count">${jobs.length}</span></span>
        <a href="/api/jobs" class="json-link">📄 View JSON</a>
      </div>
      <ul>${jobList}</ul>
      <a href="/" class="back">← Back to Home</a>
    </div>
    <div class="footer">JobAd - Find Jobs in Your Area</div>
  </div>
</body>
</html>`;
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[&<>"]/g, function(c) {
    switch(c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
