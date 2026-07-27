// api/job-id.js
const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

// ============================================================
// ZONES DATA - Compact with State Mapping
// ============================================================
const ZONES = [
  [5001,"Hyderabad","Telangana"],[5601,"Bangalore","Karnataka"],[6001,"Chennai","Tamil Nadu"],
  [4001,"Mumbai","Maharashtra"],[1101,"Delhi","Delhi"],[1221,"Gurugram","Haryana"],
  [2011,"Noida","Uttar Pradesh"],[4111,"Pune","Maharashtra"],[7001,"Kolkata","West Bengal"],
  [3801,"Ahmedabad","Gujarat"],[3951,"Surat","Gujarat"],[5351,"Vizianagaram","Andhra Pradesh"],
  [5301,"Visakhapatnam","Andhra Pradesh"],[6411,"Coimbatore","Tamil Nadu"],[3901,"Vadodara","Gujarat"],
  [4521,"Indore","Madhya Pradesh"],[4401,"Nagpur","Maharashtra"],[6821,"Kochi","Kerala"],
  [4221,"Nashik","Maharashtra"],[3021,"Jaipur","Rajasthan"],[2261,"Lucknow","Uttar Pradesh"],
  [4621,"Bhopal","Madhya Pradesh"],[6951,"Thiruvananthapuram","Kerala"],[8311,"Jamshedpur","Jharkhand"],
  [7511,"Bhubaneswar","Odisha"],[5201,"Vijayawada","Andhra Pradesh"],[3601,"Rajkot","Gujarat"],
  [2081,"Kanpur","Uttar Pradesh"],[1411,"Ludhiana","Punjab"],[6251,"Madurai","Tamil Nadu"],
  [2211,"Varanasi","Uttar Pradesh"],[2501,"Meerut","Uttar Pradesh"],[2821,"Agra","Uttar Pradesh"],
  [8001,"Patna","Bihar"],[8341,"Ranchi","Jharkhand"],[7801,"Guwahati","Assam"],
  [1600,"Chandigarh","Chandigarh"],[1403,"Mohali","Punjab"],[1341,"Panchkula","Haryana"],
  [6201,"Trichy","Tamil Nadu"],[6361,"Salem","Tamil Nadu"],[5751,"Mangaluru","Karnataka"],
  [5701,"Mysuru","Karnataka"],[5221,"Guntur","Andhra Pradesh"],[4311,"Aurangabad","Maharashtra"],
  [4131,"Solapur","Maharashtra"],[4161,"Kolhapur","Maharashtra"],[1431,"Amritsar","Punjab"],
  [1441,"Jalandhar","Punjab"],[8261,"Dhanbad","Jharkhand"],[4921,"Raipur","Chhattisgarh"],
  [4901,"Bhilai-Durg","Chhattisgarh"],[3421,"Jodhpur","Rajasthan"],[3131,"Udaipur","Rajasthan"],
  [3241,"Kota","Rajasthan"],[4741,"Gwalior","Madhya Pradesh"],[4821,"Jabalpur","Madhya Pradesh"],
  [2431,"Bareilly","Uttar Pradesh"],[2021,"Aligarh","Uttar Pradesh"],[2441,"Moradabad","Uttar Pradesh"],
  [2731,"Gorakhpur","Uttar Pradesh"],[1211,"Faridabad","Haryana"],[1321,"Panipat","Haryana"],
  [1801,"Jammu","Jammu & Kashmir"],[1901,"Srinagar","Jammu & Kashmir"],[2481,"Dehradun","Uttarakhand"],
  [2491,"Haridwar","Uttarakhand"],[2631,"Rudrapur","Uttarakhand"],[1731,"Baddi","Himachal Pradesh"],
  [3881,"Anand","Gujarat"],[3931,"Ankleshwar-Bharuch","Gujarat"],[3961,"Vapi","Gujarat"],
  [3631,"Morbi-Wankaner","Gujarat"],[3611,"Jamnagar","Gujarat"],[3641,"Bhavnagar","Gujarat"],
  [5331,"Kakinada","Andhra Pradesh"],[5241,"Nellore","Andhra Pradesh"],[5171,"Tirupati","Andhra Pradesh"],
  [5061,"Warangal","Telangana"],[5051,"Karimnagar","Telangana"],[5801,"Hubli-Dharwad","Karnataka"],
  [5901,"Belagavi","Karnataka"],[6351,"Hosur","Tamil Nadu"],[6381,"Erode","Tamil Nadu"],
  [6281,"Thoothukudi","Tamil Nadu"],[6781,"Palakkad","Kerala"],[6911,"Kollam","Kerala"],
  [3962,"Daman","Daman & Diu"],[3963,"Diu","Daman & Diu"],[7691,"Rourkela","Odisha"],
  [7681,"Sambalpur","Odisha"],[7131,"Asansol","West Bengal"],[7132,"Durgapur","West Bengal"],
  [7211,"Haldia","West Bengal"],[7341,"Siliguri","West Bengal"],[8421,"Muzaffarpur","Bihar"],
  [8121,"Bhagalpur","Bihar"],[4951,"Bilaspur","Chhattisgarh"],[4952,"Korba","Chhattisgarh"],
  [8271,"Bokaro","Jharkhand"],[5311,"Alluri-Paderu","Andhra Pradesh"],[5312,"Anakapalli","Andhra Pradesh"],
  [5151,"Anantapur","Andhra Pradesh"],[5222,"Narasaraopet","Andhra Pradesh"],[5332,"East Godavari-Rajahmundry","Andhra Pradesh"],
  [5341,"Eluru","Andhra Pradesh"],[5211,"Krishna-Machilipatnam","Andhra Pradesh"],[5181,"Kurnool","Andhra Pradesh"],
  [5231,"Markapuram","Andhra Pradesh"],[5352,"Parvathipuram Manyam","Andhra Pradesh"],[5334,"Rampachodavaram","Andhra Pradesh"],
  [5232,"Ongole","Andhra Pradesh"],[5152,"Sri Sathya Sai-Puttaparthi","Andhra Pradesh"],[5321,"Srikakulam","Andhra Pradesh"],
  [5342,"Bhimavaram","Andhra Pradesh"],[5161,"Kadapa","Andhra Pradesh"],[5041,"Adilabad","Telangana"],
  [5071,"Kothagudem","Telangana"],[5052,"Jagtial","Telangana"],[5062,"Jangaon","Telangana"],
  [5063,"Bhupalpally","Telangana"],[5091,"Gadwal","Telangana"],[5031,"Kamareddy","Telangana"],
  [5072,"Khammam","Telangana"],[5042,"Asifabad","Telangana"],[5092,"Mahabubnagar","Telangana"],
  [5043,"Mancherial","Telangana"],[5021,"Medak","Telangana"],[5064,"Mulugu","Telangana"],
  [5093,"Nagarkurnool","Telangana"],[5081,"Nalgonda","Telangana"],[5094,"Narayanpet","Telangana"],
  [5044,"Nirmal","Telangana"],[5032,"Nizamabad","Telangana"],[5053,"Peddapalli","Telangana"],
  [5054,"Sircilla","Telangana"],[5022,"Sangareddy","Telangana"],[5023,"Siddipet","Telangana"],
  [5082,"Suryapet","Telangana"],[5011,"Vikarabad","Telangana"],[5083,"Bhongir","Telangana"],
  [6211,"Ariyalur","Tamil Nadu"],[6031,"Chengalpattu","Tamil Nadu"],[6071,"Cuddalore","Tamil Nadu"],
  [6362,"Dharmapuri","Tamil Nadu"],[6241,"Dindigul","Tamil Nadu"],[6061,"Kallakurichi","Tamil Nadu"],
  [6311,"Kancheepuram","Tamil Nadu"],[6291,"Nagercoil","Tamil Nadu"],[6391,"Karur","Tamil Nadu"],
  [6091,"Mayiladuthurai","Tamil Nadu"],[6111,"Nagapattinam","Tamil Nadu"],[6371,"Namakkal","Tamil Nadu"],
  [6212,"Perambalur","Tamil Nadu"],[6221,"Pudukkottai","Tamil Nadu"],[6231,"Ramanathapuram","Tamil Nadu"],
  [6321,"Ranipet","Tamil Nadu"],[6301,"Sivaganga","Tamil Nadu"],[6271,"Tenkasi","Tamil Nadu"],
  [6131,"Thanjavur","Tamil Nadu"],[6431,"Udhagamandalam","Tamil Nadu"],[6252,"Theni","Tamil Nadu"],
  [6021,"Thiruvallur","Tamil Nadu"],[6352,"Tirupathur","Tamil Nadu"],[6062,"Tiruvannamalai","Tamil Nadu"],
  [6322,"Vellore","Tamil Nadu"],[6051,"Viluppuram","Tamil Nadu"],[6261,"Virudhunagar","Tamil Nadu"],
  [6891,"Pathanamthitta","Kerala"],[6881,"Alappuzha","Kerala"],[6861,"Kottayam","Kerala"],
  [6851,"Painavu","Kerala"],[6801,"Thrissur","Kerala"],[6761,"Malappuram","Kerala"],
  [6731,"Kozhikode","Kerala"],[6732,"Kalpetta","Kerala"],[6701,"Kannur","Kerala"],
  [6711,"Kasaragod","Kerala"],[5871,"Bagalkot","Karnataka"],[5831,"Ballari","Karnataka"],
  [5851,"Bidar","Karnataka"],[5711,"Chamarajanagar","Karnataka"],[5621,"Chikballapur","Karnataka"],
  [5771,"Chikkamagaluru","Karnataka"],[5772,"Chitradurga","Karnataka"],[5773,"Davanagere","Karnataka"],
  [5821,"Gadag","Karnataka"],[5731,"Hassan","Karnataka"],[5811,"Haveri","Karnataka"],
  [5852,"Kalaburagi","Karnataka"],[5712,"Madikeri","Karnataka"],[5631,"Kolar","Karnataka"],
  [5832,"Koppal","Karnataka"],[5713,"Mandya","Karnataka"],[5841,"Raichur","Karnataka"],
  [5622,"Ramanagara","Karnataka"],[5721,"Tumakuru","Karnataka"],[5761,"Udupi","Karnataka"],
  [5812,"Karwar","Karnataka"],[5833,"Hosapete","Karnataka"],[5861,"Vijayapura","Karnataka"],
  [5853,"Yadgir","Karnataka"],[4031,"Goa","Goa"],[1711,"Shimla","Himachal Pradesh"],
  [1751,"Kullu","Himachal Pradesh"],[1732,"Nahan","Himachal Pradesh"],[1733,"Solan","Himachal Pradesh"],
  [1741,"Bilaspur","Himachal Pradesh"],[1742,"Una","Himachal Pradesh"],[1761,"Chamba","Himachal Pradesh"],
  [1762,"Dharamshala","Himachal Pradesh"],[1771,"Hamirpur","Himachal Pradesh"],[1722,"Reckong Peo","Himachal Pradesh"],
  [1752,"Keylong","Himachal Pradesh"],[1753,"Mandi","Himachal Pradesh"],[2632,"Almora","Uttarakhand"],
  [2633,"Bageshwar","Uttarakhand"],[2461,"Gopeshwar","Uttarakhand"],[2621,"Champawat","Uttarakhand"],
  [2631,"Nainital","Uttarakhand"],[2462,"Pauri","Uttarakhand"],[2622,"Pithoragarh","Uttarakhand"],
  [2463,"Rudraprayag","Uttarakhand"],[2492,"New Tehri","Uttarakhand"],[2493,"Uttarkashi","Uttarakhand"],
  [7951,"Manipur","Manipur"],[7961,"Mizoram","Mizoram"],[7991,"Tripura","Tripura"],
  [7992,"Agartala","Tripura"],[7932,"Shillong","Meghalaya"],[7931,"Meghalaya","Meghalaya"],
  [7441,"Port Blair","Andaman & Nicobar"],[7442,"Mayabunder","Andaman & Nicobar"],
  [7443,"Car Nicobar","Andaman & Nicobar"],[6822,"Kavaratti","Lakshadweep"],
  [6052,"Oulgaret","Puducherry"],[6053,"Villianur","Puducherry"],[6054,"Bahour","Puducherry"],
  [6092,"Karaikal","Puducherry"],[6093,"Thirunallar","Puducherry"],[6733,"Mahe","Puducherry"]
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function getZoneInfo(id) {
  const z = ZONES.find(z => z[0] === id);
  return z ? { name: z[1], state: z[2] } : { name: 'Unknown', state: 'India' };
}

function getWorkMode(mode) {
  const modes = { 0: 'Any', 1: 'Onsite (Office)', 2: 'Onsite (Project site)', 3: 'Field work', 4: 'Remote (WFH)', 5: 'Hybrid' };
  return modes[mode] || 'Not specified';
}

function getEmploymentType(mode) {
  const map = { 0: 'FULL_TIME', 1: 'FULL_TIME', 2: 'FULL_TIME', 3: 'FULL_TIME', 4: 'REMOTE', 5: 'FULL_TIME' };
  return map[mode] || 'FULL_TIME';
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============================================================
// API HANDLER - Supports both HTML and JSON
// ============================================================
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urlParts = req.url.split('/');
    let id = urlParts[urlParts.length - 1] || req.query.id;
    
    // Remove query params if present
    if (id && id.includes('?')) {
      id = id.split('?')[0];
    }

    // Check if JSON is requested
    const acceptHeader = req.headers.accept || '';
    const isJsonRequest = acceptHeader.includes('application/json') || req.query.format === 'json';

    if (!id) {
      return res.status(400).json({ success: false, error: 'Missing job ID' });
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

    if (!job) {
      if (isJsonRequest) {
        return res.status(404).json({ success: false, error: 'Job not found' });
      }
      return res.status(404).send(getErrorHTML('Job Not Found', `Job with ID "${id}" was not found.`));
    }

    const zoneInfo = getZoneInfo(job.zone_id);
    const workMode = getWorkMode(job.work_mode);
    const employmentType = getEmploymentType(job.work_mode);

    // ============================================================
    // Google Jobs JSON-LD Schema
    // ============================================================
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
      "employmentType": employmentType,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company_name || 'Company',
        "website": job.company_website || 'https://jobad-pwa.vercel.app'
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
    if (job.max_salary_monthly && job.max_salary_monthly > 0) {
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

    // ============================================================
    // JSON Response for APIs
    // ============================================================
    if (isJsonRequest) {
      return res.status(200).json({
        success: true,
        job: {
          id: job.job_id,
          title: job.job_title,
          company: job.company_name,
          company_website: job.company_website,
          location: zoneInfo.name,
          state: zoneInfo.state,
          description: job.job_description,
          salary: job.max_salary_monthly ? `₹${job.max_salary_monthly.toLocaleString('en-IN')}/month` : 'Not specified',
          experience: `${job.min_experience_years || 0} years`,
          skills: job.skills_comma_separated,
          work_mode: workMode,
          posted_date: job.posted_date,
          expiry_date: job.expiry_date,
          url: `https://jobad-pwa.vercel.app/job/${job.job_id}`,
          schema: jsonLd
        }
      });
    }

    // ============================================================
    // HTML Response with SSR for Google
    // ============================================================
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')} - JobAd</title>
  <meta name="description" content="Apply for ${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')} in ${zoneInfo.name}. ${job.min_experience_years || 0} years experience. Salary ₹${(job.max_salary_monthly || 0).toLocaleString('en-IN')}/month.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://jobad-pwa.vercel.app/job/${job.job_id}">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#2563eb">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')}">
  <meta property="og:description" content="Apply for ${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')} in ${zoneInfo.name}.">
  <meta property="og:url" content="https://jobad-pwa.vercel.app/job/${job.job_id}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')}">
  <meta name="twitter:description" content="Apply for ${escapeHtml(job.job_title || 'Job')} at ${escapeHtml(job.company_name || 'Company')}.">
  
  <!-- Google Jobs Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif; background: #f1f5f9; padding: 16px; min-height: 100vh; display: flex; justify-content: center; align-items: center; }
    .container { max-width: 420px; width: 100%; background: #ffffff; border-radius: 24px; padding: 24px 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .badge { display: inline-block; background: #dbeafe; color: #1e40af; font-size: 10px; font-weight: 700; padding: 2px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 8px; }
    .title { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 2px 0; line-height: 1.3; }
    .company { font-size: 15px; color: #2563eb; font-weight: 600; margin-bottom: 16px; cursor: pointer; }
    .company:hover { text-decoration: underline; }
    .divider { height: 1px; background: #f1f5f9; margin: 12px 0; }
    .field { margin-bottom: 10px; }
    .field-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 1px; }
    .field-value { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f8fafc; }
    .field-value-multiline { font-size: 14px; color: #1e293b; padding: 4px 0; border-bottom: 1px solid #f8fafc; white-space: pre-wrap; word-break: break-word; }
    .skills-container { display: flex; flex-wrap: wrap; gap: 4px; padding: 4px 0; }
    .skill-tag { background: #f1f5f9; color: #475569; font-size: 12px; font-weight: 500; padding: 2px 10px; border-radius: 12px; }
    .btn-app { display: block; width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; text-align: center; text-decoration: none; margin-top: 16px; transition: background 0.2s; }
    .btn-app:hover { background: #1d4ed8; }
    .footer { margin-top: 16px; text-align: center; font-size: 11px; color: #94a3b8; }
    .footer a { color: #2563eb; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    .perks { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 12px 16px; margin: 12px 0; }
    .perks-title { font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 4px; }
    .perks-list { font-size: 13px; color: #166534; }
    .perks-list li { list-style: none; padding: 2px 0; }
    .perks-list li::before { content: "✅ "; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">💼 JOB #${job.job_id}</span>
    <h1 class="title">${escapeHtml(job.job_title || 'Untitled Job')}</h1>
    <p class="company">🏢 ${escapeHtml(job.company_name || 'Company')}</p>

    <div class="divider"></div>

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
      <span class="field-label">🛠️ Work Mode</span>
      <div class="field-value">${workMode}</div>
    </div>

    <div class="field">
      <span class="field-label">🛠️ Skills</span>
      <div class="skills-container">
        ${(job.skills_comma_separated || '').split(',').filter(s => s.trim()).map(s => `<span class="skill-tag">${escapeHtml(s.trim())}</span>`).join('') || '<span class="field-value">Not specified</span>'}
      </div>
    </div>

    ${job.job_description ? `
    <div class="field">
      <span class="field-label">📝 Description</span>
      <div class="field-value-multiline">${escapeHtml(job.job_description)}</div>
    </div>
    ` : ''}

    <!-- Perks & Benefits -->
    <div class="perks">
      <div class="perks-title">✨ Perks & Benefits</div>
      <ul class="perks-list">
        <li>Free Food & Accommodation</li>
        <li>Immediate joining</li>
      </ul>
    </div>

    <a href="https://jobad-pwa.vercel.app/?type=JOB&id=${job.job_id}" class="btn-app">📱 Open in App</a>

    <div class="footer">
      <p>JobAd - Find Jobs in Your Area</p>
      <p style="margin-top: 4px; font-size: 10px; color: #cbd5e1;">
        Posted: ${job.posted_date ? new Date(job.posted_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'} 
        • Expires: ${job.expiry_date ? new Date(job.expiry_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
      </p>
    </div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(html);

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send(getErrorHTML('Error Loading Job', error.message));
  }
}

// ============================================================
// ERROR HTML HELPER
// ============================================================
function getErrorHTML(title, message) {
  return `<!DOCTYPE html>
<html>
<head><title>${title} - JobAd</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  .card { max-width: 400px; background: white; border-radius: 24px; padding: 32px 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
  h1 { color: #dc2626; font-size: 24px; margin: 0 0 8px 0; }
  p { color: #64748b; margin: 0 0 16px 0; }
  .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; }
  .btn:hover { background: #1d4ed8; }
</style>
</head>
<body>
  <div class="card">
    <h1>❌ ${title}</h1>
    <p>${escapeHtml(message)}</p>
    <a href="/" class="btn">📋 Browse Jobs</a>
  </div>
</body>
</html>`;
}
