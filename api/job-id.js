// api/job-id.js
const supabaseUrl = 'https://njhioapckeupxrcixmdh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaGlvYXBja2V1cHhyY2l4bWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTE3OTcsImV4cCI6MjA5NjQ4Nzc5N30.LR9O3xI3kKlU20RORX7d3mu4ktWs6Nw-grSwoOCZhiE';

// ============================================================
// ZONES DATA - Compact Format (Deduplicated)
// ============================================================
const ZONES = [
  [5001,"Hyderabad"],[5601,"Bangalore"],[6001,"Chennai"],[4001,"Mumbai"],
  [1101,"Delhi"],[1221,"Gurugram"],[2011,"Noida"],[4111,"Pune"],
  [7001,"Kolkata"],[3801,"Ahmedabad"],[3951,"Surat"],[5351,"Vizianagaram"],
  [5301,"Visakhapatnam"],[6411,"Coimbatore"],[3901,"Vadodara"],[4521,"Indore"],
  [4401,"Nagpur"],[6821,"Kochi"],[4221,"Nashik"],[3021,"Jaipur"],
  [2261,"Lucknow"],[4621,"Bhopal"],[6951,"Thiruvananthapuram"],[8311,"Jamshedpur"],
  [7511,"Bhubaneswar"],[5201,"Vijayawada"],[3601,"Rajkot"],[2081,"Kanpur"],
  [1411,"Ludhiana"],[6251,"Madurai"],[2211,"Varanasi"],[2501,"Meerut"],
  [2821,"Agra"],[8001,"Patna"],[8341,"Ranchi"],[7801,"Guwahati"],
  [1600,"Chandigarh"],[1403,"Mohali"],[1341,"Panchkula"],[6201,"Trichy"],
  [6361,"Salem"],[5751,"Mangaluru"],[5701,"Mysuru"],[5221,"Guntur"],
  [4311,"Aurangabad"],[4131,"Solapur"],[4161,"Kolhapur"],[1431,"Amritsar"],
  [1441,"Jalandhar"],[8261,"Dhanbad"],[4921,"Raipur"],[4901,"Bhilai-Durg"],
  [3421,"Jodhpur"],[3131,"Udaipur"],[3241,"Kota"],[4741,"Gwalior"],
  [4821,"Jabalpur"],[2431,"Bareilly"],[2021,"Aligarh"],[2441,"Moradabad"],
  [2731,"Gorakhpur"],[1211,"Faridabad"],[1321,"Panipat"],[1801,"Jammu"],
  [1901,"Srinagar"],[2481,"Dehradun"],[2491,"Haridwar"],[2631,"Rudrapur"],
  [1731,"Baddi"],[3881,"Anand"],[3931,"Ankleshwar-Bharuch"],[3961,"Vapi"],
  [3631,"Morbi-Wankaner"],[3611,"Jamnagar"],[3641,"Bhavnagar"],[5331,"Kakinada"],
  [5241,"Nellore"],[5171,"Tirupati"],[5061,"Warangal"],[5051,"Karimnagar"],
  [5801,"Hubli-Dharwad"],[5901,"BELAGAVI"],[6351,"Hosur"],[6381,"Erode"],
  [6281,"Thoothukudi"],[6781,"Palakkad"],[6911,"Kollam"],[3962,"Daman"],
  [3963,"Diu"],[7691,"Rourkela"],[7681,"Sambalpur"],[7131,"Asansol"],
  [7132,"Durgapur"],[7211,"Haldia"],[7341,"Siliguri"],[8421,"Muzaffarpur"],
  [8121,"Bhagalpur"],[4951,"Bilaspur"],[4952,"Korba"],[8271,"Bokaro"],
  [5311,"Alluri-Paderu"],[5312,"Anakapalli"],[5151,"Anantapur"],[5222,"Narasaraopet"],
  [5332,"East Godavari-Rajahmundry"],[5341,"Eluru"],[5211,"krishna-Machilipatnam"],
  [5181,"Kurnool"],[5231,"Markapuram"],[5352,"Parvathipuram Manyam"],
  [5334,"Rampachodavaram"],[5232,"Ongole"],[5152,"Sri Sathya Sai-Puttaparthi"],
  [5321,"Srikakulam"],[5342,"Bhimavaram"],[5161,"Kadapa"],[5041,"Adilabad"],
  [5071,"Kothagudem"],[5052,"Jagtial"],[5062,"Jangaon"],[5063,"Bhupalpally"],
  [5091,"Gadwal"],[5031,"Kamareddy"],[5072,"Khammam"],[5042,"Asifabad"],
  [5092,"Mahabubnagar"],[5043,"Mancherial"],[5021,"Medak"],[5064,"Mulugu"],
  [5093,"Nagarkurnool"],[5081,"Nalgonda"],[5094,"Narayanpet"],[5044,"Nirmal"],
  [5032,"Nizamabad"],[5053,"Peddapalli"],[5054,"Sircilla"],[5022,"Sangareddy"],
  [5023,"Siddipet"],[5082,"Suryapet"],[5011,"Vikarabad"],[5083,"Bhongir"],
  [6211,"Ariyalur"],[6031,"Chengalpattu"],[6071,"Cuddalore"],[6362,"Dharmapuri"],
  [6241,"Dindigul"],[6061,"Kallakurichi"],[6311,"Kancheepuram"],[6291,"Nagercoil"],
  [6391,"Karur"],[6091,"Mayiladuthurai"],[6111,"Nagapattinam"],[6371,"Namakkal"],
  [6212,"Perambalur"],[6221,"Pudukkottai"],[6231,"Ramanathapuram"],[6321,"Ranipet (Walajah)"],
  [6301,"Sivaganga"],[6271,"Tenkasi"],[6131,"Thanjavur"],[6431,"Udhagamandalam (Ooty)"],
  [6252,"Theni"],[6021,"Thiruvallur"],[6352,"Tirupathur"],[6062,"Tiruvannamalai"],
  [6322,"Vellore"],[6051,"Viluppuram"],[6261,"Virudhunagar"],[6891,"Pathanamthitta"],
  [6881,"Alappuzha"],[6861,"Kottayam"],[6851,"Painavu / Kuyilimala"],[6801,"Thrissur"],
  [6761,"Malappuram"],[6731,"Kozhikode"],[6732,"Kalpetta"],[6701,"Kannur"],
  [6711,"Kasaragod"],[5871,"Bagalkot"],[5831,"Ballari"],[5851,"Bidar"],
  [5711,"Chamarajanagar"],[5621,"Chikballapur"],[5771,"Chikkamagaluru"],[5772,"Chitradurga"],
  [5773,"Davanagere"],[5821,"Gadag"],[5731,"Hassan"],[5811,"Haveri"],
  [5852,"Kalaburagi"],[5712,"Madikeri"],[5631,"Kolar"],[5832,"Koppal"],
  [5713,"Mandya"],[5841,"Raichur"],[5622,"Ramanagara"],[5721,"Tumakuru"],
  [5761,"Udupi"],[5812,"Karwar"],[5833,"Hosapete"],[5861,"Vijayapura"],
  [5853,"Yadgir"],[4031,"Goa"],[4151,"Satara"],[4162,"Sangli"],
  [4011,"Palghar"],[4152,"Ratnagiri"],[4141,"Ahilyanagar (Ahmednagar)"],[4251,"Jalgaon"],
  [4241,"Dhule"],[4312,"Jalna"],[4313,"Beed"],[4132,"Latur"],
  [4133,"Dharashiv (Osmanabad)"],[4314,"Nanded"],[4315,"Parbhani"],[4316,"Hingoli"],
  [4441,"Amravati"],[4442,"Akola"],[4431,"Buldhana"],[4451,"Yavatmal"],
  [4443,"Washim"],[4421,"Wardha"],[4411,"Bhandara"],[4412,"Gondia"],
  [4422,"Chandrapur"],[4423,"Gadchiroli"],[4941,"Jagdalpur"],[4961,"Raigarh"],
  [4911,"Rajnandgaon"],[4971,"Ambikapur"],[4953,"Janjgir"],[4931,"Dhamtari"],
  [4932,"Mahasamund"],[4942,"Kanker"],[4943,"Dantewada"],[4912,"Kawardha"],
  [4972,"Baikunthpur"],[4962,"Jashpur"],[4913,"Balod"],[4914,"Bemetara"],
  [4933,"Baloda Bazar"],[4934,"Gariaband"],[4973,"Surajpur"],[4974,"Balrampur"],
  [4944,"Kondagaon"],[4945,"Narayanpur"],[4946,"Bijapur"],[4947,"Sukma"],
  [4975,"Manendragarh"],[4915,"Mohla"],[4954,"Sakti"],[4963,"Sarangarh"],
  [7591,"Angul"],[7671,"Balangir"],[7561,"Balasore"],[7682,"Bargarh"],
  [7562,"Bhadrak"],[7621,"Boudh"],[7531,"Cuttack"],[7683,"Deogarh"],
  [7592,"Dhenkanal"],[7611,"Paralakhemundi"],[7612,"Chhatrapur"],[7541,"Jagatsinghpur"],
  [7551,"Jajpur"],[7661,"Bhawanipatna"],[7622,"Phulbani"],[7542,"Kendrapara"],
  [7581,"Keonjhar"],[7641,"Koraput"],[7642,"Malkangiri"],[7571,"Baripada"],
  [7643,"Nabarangpur"],[7521,"Nayagarh"],[7662,"Nuapada"],[7522,"Puri"],
  [7651,"Rayagada"],[7672,"Sonepur"],[4561,"Ujjain"],[4701,"Sagar"],
  [4861,"Rewa"],[4851,"Satna"],[4571,"Ratlam"],[4801,"Chhindwara"],
  [4611,"Narmadapuram"],[4541,"Dhar"],[4551,"Dewas"],[4761,"Morena"],
  [4501,"Khandwa"],[4511,"Khargone"],[4771,"Bhind"],[4731,"Shivpuri"],
  [4732,"Guna"],[4581,"Mandsaur"],[3651,"Amreli"],[3851,"Palanpur"],
  [3621,"Junagadh"],[3701,"Bhuj"],[3841,"Mehsana"],[3891,"Godhra"],
  [3842,"Patan"],[3831,"Himatnagar"],[3632,"Surendranagar"],[3941,"Vyara"],
  [3963,"Valsad"],[3051,"Ajmer"],[3011,"Alwar"],[3341,"Bikaner"],
  [3111,"Bhilwara"],[3321,"Sikar"],[3331,"Jhunjhunu"],[3351,"Sri Ganganagar"],
  [3352,"Hanumangarh"],[3311,"Churu"],[3411,"Nagaur"],[3211,"Bharatpur"],
  [3281,"Dholpur"],[3221,"Sawai Madhopur"],[3251,"Baran"],[3261,"Jhalawar"],
  [3121,"Chittorgarh"],[3132,"Rajsamand"],[3441,"Barmer"],[3451,"Jaisalmer"],
  [3431,"Jalor"],[3071,"Sirohi"],[3031,"Dausa"],[3041,"Tonk"],
  [3231,"Bundi"],[3271,"Banswara"],[3141,"Dungarpur"],[3122,"Pratapgarh"],
  [1271,"Bhiwani"],[1272,"Charkhi Dadri"],[1251,"Fatehabad"],[1252,"Hisar"],
  [1241,"Jhajjar"],[1261,"Jind"],[1361,"Kaithal"],[1322,"Karnal"],
  [1362,"Kurukshetra"],[1231,"Narnaul"],[1222,"Nuh"],[1212,"Palwal"],
  [1342,"Panchkula"],[1232,"Rewari"],[1242,"Rohtak"],[1311,"Sonipat"],
  [1351,"Yamunanagar"],[1481,"Barnala"],[1511,"Bathinda"],[1512,"Faridkot"],
  [1401,"Sirhind"],[1521,"Fazilka"],[1522,"Firozpur"],[1461,"Hoshiarpur"],
  [1442,"Kapurthala"],[1482,"Malerkotla"],[1513,"Mansa"],[1421,"Moga"],
  [1523,"Sri Muktsar Sahib"],[1451,"Pathankot"],[1471,"Patiala"],[1402,"Rupnagar"],
  [1483,"Sangrur"],[1443,"Nawanshahr"],[1432,"Tarn Taran"],[1921,"Anantnag"],
  [1931,"Bandipora"],[1821,"Doda"],[1841,"Kathua"],[1822,"Kishtwar"],
  [1922,"Kulgam"],[1932,"Kupwara"],[1851,"Poonch"],[1852,"Rajouri"],
  [1823,"Ramban"],[1824,"Reasi"],[1842,"Samba"],[1923,"Shopian"],
  [1825,"Udhampur"],[1941,"Leh"],[1942,"Kargil"],[1741,"Bilaspur"],
  [1761,"Chamba"],[1771,"Hamirpur"],[1762,"Dharamshala"],[1722,"Reckong Peo"],
  [1751,"Kullu"],[1752,"Keylong"],[1753,"Mandi"],[1711,"Shimla"],
  [1732,"Nahan"],[1733,"Solan"],[1742,"Una"],[2632,"Almora"],
  [2633,"Bageshwar"],[2461,"Gopeshwar"],[2621,"Champawat"],[2462,"Pauri"],
  [2622,"Pithoragarh"],[2463,"Rudraprayag"],[2492,"New Tehri"],[2493,"Uttarkashi"],
  [2411,"Hardoi"],[2291,"Rae Bareli"],[2611,"Sitapur"],[2091,"Unnao"],
  [2092,"Akbarpur - Kanpur Dehat"],[2061,"Etawah"],[2093,"Kannauj"],[2062,"Auraiya"],
  [2241,"Ayodhya"],[2242,"Akbarpur - Ambedkar Nagar"],[2251,"Barabanki"],[2281,"Sultanpur"],
  [2271,"Gauriganj"],[2502,"Baghpat"],[2031,"Bulandshahr"],[2451,"Hapur"],
  [2111,"Prayagraj"],[2121,"Fatehpur"],[2122,"Manjhanpur"],[2301,"Pratapgarh"],
  [2432,"Badaun"],[2421,"Shahjahanpur"],[2741,"Deoria"],[2742,"Padrauna"],
  [2732,"Maharajganj"],[2841,"Jhansi"],[2851,"Orai"],[2842,"Lalitpur"],
  [2442,"Amroha"],[2443,"Sambhal / Bahjoi"],[2471,"Saharanpur"],[2511,"Muzaffarnagar"],
  [2472,"Shamli"],[8541,"Araria"],[8041,"Arwal"],[8241,"Aurangabad"],
  [8131,"Banka"],[8511,"Begusarai"],[8021,"Ara"],[8022,"Buxar"],
  [8461,"Darbhanga"],[8451,"Motihari"],[8231,"Gaya"],[8411,"Gopalganj"],
  [8111,"Jamui"],[8042,"Jehanabad"],[8211,"Bhabua"],[8512,"Khagaria"],
  [8551,"Kishanganj"],[8112,"Lakhisarai"],[8521,"Madhepura"],[8471,"Madhubani"],
  [8113,"Munger"],[8422,"Muzaffarpur"],[8031,"Biharsharif"],[8051,"Nawada"],
  [8542,"Purnia"],[8212,"Sasaram"],[8522,"Saharsa"],[8481,"Samastipur"],
  [8412,"Chhapra"],[8114,"Sheikhpura"],[8431,"Sheohar"],[8432,"Sitamarhi"],
  [8413,"Siwan"],[8523,"Supaul"],[8452,"Bettiah"],[8331,"Chaibasa"],
  [8251,"Hazaribagh"],[8221,"Medininagar"],[8151,"Giridih"],[8141,"Deoghar"],
  [8142,"Dumka"],[8161,"Sahibganj"],[8162,"Pakur"],[8152,"Jamtara"],
  [8252,"Chatra"],[8253,"Koderma"],[8222,"Garhwa"],[8291,"Latehar"],
  [8351,"Lohardaga"],[8352,"Gumla"],[8353,"Simdega"],[8354,"Khunti"],
  [7361,"Alipurduar"],[7221,"Bankura"],[7311,"Suri"],[7362,"Cooch Behar"],
  [7331,"Balurghat"],[7342,"Darjeeling"],[7121,"Chinsurah-Mogra"],[7351,"Jalpaiguri"],
  [7321,"Malda / English Bazar"],[7421,"Berhampore"],[7411,"Krishnanagar"],
  [7212,"Midnapore"],[7133,"Burdwan"],[7231,"Purulia"],[7332,"Raiganj"],
  [7371,"Gangtok"],[7372,"Pakyong"],[7373,"Namchi"],[7374,"Gyalshing"],
  [7375,"Soreng"],[7376,"Mangan"],[7811,"Pathsala"],[7812,"Mushalpur"],
  [7813,"Barpeta"],[7841,"Biswanath Chariali"],[7831,"Bongaigaon"],[7881,"Silchar"],
  [7851,"Sonari"],[7832,"Kajalgaon"],[7842,"Mangaldai"],[7871,"Dhemaji"],
  [7833,"Dhubri"],[7861,"Dibrugarh"],[7882,"Haflong"],[7834,"Goalpara"],
  [7852,"Golaghat"],[7883,"Hailakandi"],[7821,"Sankardev Nagar"],[7853,"Jorhat"],
  [7822,"Diphu"],[7884,"Karimganj"],[7835,"Kokrajhar"],[7872,"North Lakhimpur"],
  [7854,"Garamur"],[7823,"Morigaon"],[7824,"Nagaon"],[7814,"Nalbari"],
  [7855,"Sivasagar"],[7843,"Tezpur"],[7836,"Hatsingimari"],[7862,"Tinsukia"],
  [7844,"Udalguri"],[7825,"Hamren"],[7901,"Tawang"],[7902,"Bomdila"],
  [7903,"Seppa"],[7904,"Lemmi"],[7911,"Yupia"],[7912,"Itanagar"],
  [7913,"Koloriang"],[7914,"Palin"],[7915,"Siang"],[7921,"Changlang"],
  [7863,"Khonsa"],[7922,"Longding"],[7923,"Namsai"],[7924,"Tezu"],
  [7925,"Hawai"],[7926,"Dibang Valley"],[7916,"Basar"],[7917,"Tato"],
  [7918,"Napangphung"],[7971,"Chümoukedima"],[7972,"Dimapur"],[7981,"Kiphire"],
  [7973,"Kohima"],[7982,"Longleng"],[7974,"Meluri"],[7983,"Mokokchung"],
  [7984,"Mon"],[7975,"Niuland"],[7985,"Noklak"],[7976,"Peren"],
  [7977,"Phek"],[7986,"Shamator"],[7978,"Tseminyü"],[7987,"Tuensang"],
  [7979,"Wokha"],[7988,"Zünheboto"],[7951,"Manipur"],[7961,"Mizoram"],
  [7991,"Tripura"],[7992,"Agartala"],[7932,"Shillong"],[7931,"Megalaya"],
  [7441,"Port Blair"],[7442,"Mayabunder"],[7443,"Car Nicobar"],[6822,"Kavaratti"],
  [6052,"Oulgaret"],[6053,"Villianur"],[6054,"Bahour"],[6092,"Karaikal"],
  [6093,"Thirunallar"],[6733,"Mahe"]
];

function getZoneName(id) {
  const z = ZONES.find(z => z[0] === id);
  return z ? z[1] : 'Unknown';
}

// ============================================================
// API Handler
// ============================================================
export default async function handler(req, res) {
  try {
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
