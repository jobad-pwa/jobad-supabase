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
1221: 'Gurugram',
2011: 'Noida',
4111: 'Pune',
7001: 'Kolkata',
3801: 'Ahmedabad',
3951: 'Surat',
5351: 'Vizianagaram',
5301: 'Visakhapatnam',
6411: 'Coimbatore',
3901: 'Vadodara',
4521: 'Indore',
4401: 'Nagpur',
6821: 'Kochi',
4221: 'Nashik',
3021: 'Jaipur',
2261: 'Lucknow',
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
8341: 'Ranchi',
7801: 'Guwahati',
1600: 'Chandigarh',
1403: 'Mohali',
1341: 'Panchkula',
6201: 'Trichy',
6361: 'Salem',
6411: 'Tiruppur',
5751: 'Mangaluru',
5701: 'Mysuru',
5221: 'Guntur',
4311: 'Aurangabad',
4131: 'Solapur',
4161: 'Kolhapur',
1431: 'Amritsar',
1441: 'Jalandhar',
8261: 'Dhanbad',
8261: 'Dhanbad',
4921: 'Raipur',
4901: 'Bhilai-Durg',
3421: 'Jodhpur',
3131: 'Udaipur',
3241: 'Kota',
4741: 'Gwalior',
4821: 'Jabalpur',
2431: 'Bareilly',
2021: 'Aligarh',
2441: 'Moradabad',
2731: 'Gorakhpur',
2011: 'Ghaziabad',
1211: 'Faridabad',
1321: 'Panipat',
1341: 'Ambala',
1801: 'Jammu',
1901: 'Srinagar',
2481: 'Dehradun',
2491: 'Haridwar',
2631: 'Rudrapur',
1731: 'Baddi',
3881: 'Anand',
3931: 'Ankleshwar-Bharuch',
3961: 'Vapi',
3631: 'Morbi-Wankaner',
3611: 'Jamnagar',
3641: 'Bhavnagar',
5331: 'Kakinada',
5241: 'Nellore',
5171: 'Tirupati',
5061: 'Warangal',
5051: 'Karimnagar',
5801: 'Hubli-Dharwad',
5901: 'BELAGAVI',
6351: 'Hosur',
6381: 'Erode',
6281: 'Thoothukudi',
6781: 'Palakkad',
6911: 'Kollam',
3961: 'Silvassa',
3962: 'Daman',
3963: 'Diu',
7691: 'Rourkela',
7681: 'Sambalpur',
7131: 'Asansol',
7132: 'Asansol',
7132: 'Durgapur',
7211: 'Haldia',
7341: 'Siliguri',
8421: 'Muzaffarpur',
8121: 'Bhagalpur',
4951: 'Bilaspur',
4952: 'Korba',
8271: 'Bokaro',
5311: 'Alluri-Paderu',
5312: 'Anakapalli',
5151: 'Anantapur',
5171: 'Annamayya-Madanapalle',
5221: 'Bapatla',
5171: 'Chittoor',
5333: 'Amalapuram',
5332: 'East Godavari-Rajahmundry',
5341: 'Eluru',
5211: 'krishna-Machilipatnam',
5181: 'Kurnool',
5231: 'Markapuram',
5181: 'Nandyal',
5222: 'Narasaraopet',
5352: 'Parvathipuram Manyam',
5334: 'Rampachodavaram',
5232: 'Ongole',
5152: 'Sri Sathya Sai-Puttaparthi',
5321: 'Srikakulam',
5342: 'Bhimavaram',
5161: 'Kadapa',
5041: 'Adilabad',
5071: 'Kothagudem',
5052: 'Jagtial',
5062: 'Jangaon',
5063: 'Bhupalpally',
5091: 'Gadwal',
5031: 'Kamareddy',
5072: 'Khammam',
5042: 'Asifabad',
5063: 'Mahabubabad',
5092: 'Mahabubnagar',
5043: 'Mancherial',
5021: 'Medak',
5064: 'Mulugu',
5093: 'Nagarkurnool',
5081: 'Nalgonda',
5094: 'Narayanpet',
5044: 'Nirmal',
5032: 'Nizamabad',
5053: 'Peddapalli',
5054: 'Sircilla',
5022: 'Sangareddy',
5023: 'Siddipet',
5082: 'Suryapet',
5011: 'Vikarabad',
5094: 'Wanaparthy',
5083: 'Bhongir',
6211: 'Ariyalur',
6031: 'Chengalpattu',
6071: 'Cuddalore',
6362: 'Dharmapuri',
6241: 'Dindigul',
6061: 'Kallakurichi',
6311: 'Kancheepuram',
6291: 'Nagercoil',
6391: 'Karur',
6091: 'Mayiladuthurai',
6111: 'Nagapattinam',
6371: 'Namakkal',
6212: 'Perambalur',
6221: 'Pudukkottai',
6231: 'Ramanathapuram',
6321: 'Ranipet (Walajah)',
6301: 'Sivaganga',
6271: 'Tenkasi',
6131: 'Thanjavur',
6431: 'Udhagamandalam (Ooty)',
6252: 'Theni',
6021: 'Thiruvallur',
6271: 'Tirunelveli',
6352: 'Tirupathur',
6062: 'Tiruvannamalai',
6322: 'Vellore',
6051: 'Viluppuram',
6261: 'Virudhunagar',
6891: 'Pathanamthitta',
6881: 'Alappuzha',
6861: 'Kottayam',
6851: 'Painavu / Kuyilimala',
6801: 'Thrissur',
6761: 'Malappuram',
6731: 'Kozhikode',
6732: 'Kalpetta',
6701: 'Kannur',
6711: 'Kasaragod',
5871: 'Bagalkot',
5831: 'Ballari',
5851: 'Bidar',
5711: 'Chamarajanagar',
5621: 'Chikballapur',
5771: 'Chikkamagaluru',
5772: 'Chitradurga',
5773: 'Davanagere',
5821: 'Gadag',
5731: 'Hassan',
5811: 'Haveri',
5852: 'Kalaburagi',
5712: 'Madikeri',
5631: 'Kolar',
5832: 'Koppal',
5713: 'Mandya',
5841: 'Raichur',
5622: 'Ramanagara',
5773: 'Shivamogga',
5721: 'Tumakuru',
5761: 'Udupi',
5812: 'Karwar',
5833: 'Hosapete',
5861: 'Vijayapura',
5853: 'Yadgir',
4031: 'Goa',
4151: 'Satara',
4162: 'Sangli',
4011: 'Palghar',
4152: 'Ratnagiri',
4162: 'Oros',
4141: 'Ahilyanagar (Ahmednagar)',
4251: 'Jalgaon',
4241: 'Dhule',
4251: 'Nandurbar',
4312: 'Jalna',
4313: 'Beed',
4132: 'Latur',
4133: 'Dharashiv (Osmanabad)',
4314: 'Nanded',
4315: 'Parbhani',
4316: 'Hingoli',
4441: 'Amravati',
4442: 'Akola',
4431: 'Buldhana',
4451: 'Yavatmal',
4443: 'Washim',
4421: 'Wardha',
4411: 'Bhandara',
4412: 'Gondia',
4422: 'Chandrapur',
4423: 'Gadchiroli',
4941: 'Jagdalpur',
4961: 'Raigarh',
4911: 'Rajnandgaon',
4971: 'Ambikapur',
4953: 'Janjgir',
4931: 'Dhamtari',
4932: 'Mahasamund',
4942: 'Kanker',
4943: 'Dantewada',
4912: 'Kawardha',
4972: 'Baikunthpur',
4962: 'Jashpur',
4913: 'Balod',
4914: 'Bemetara',
4933: 'Baloda Bazar',
4934: 'Gariaband',
4951: 'Mungeli',
4952: 'Pendra',
4973: 'Surajpur',
4974: 'Balrampur',
4944: 'Kondagaon',
4945: 'Narayanpur',
4946: 'Bijapur',
4947: 'Sukma',
4975: 'Manendragarh',
4915: 'Mohla',
4954: 'Sakti',
4963: 'Sarangarh',
7591: 'Angul',
7671: 'Balangir',
7561: 'Balasore',
7682: 'Bargarh',
7562: 'Bhadrak',
7621: 'Boudh',
7531: 'Cuttack',
7683: 'Deogarh',
7592: 'Dhenkanal',
7611: 'Paralakhemundi',
7612: 'Chhatrapur',
7541: 'Jagatsinghpur',
7551: 'Jajpur',
7661: 'Bhawanipatna',
7622: 'Phulbani',
7542: 'Kendrapara',
7581: 'Keonjhar',
7641: 'Koraput',
7642: 'Malkangiri',
7571: 'Baripada',
7643: 'Nabarangpur',
7521: 'Nayagarh',
7662: 'Nuapada',
7522: 'Puri',
7651: 'Rayagada',
7672: 'Sonepur',
4561: 'Ujjain',
4701: 'Sagar',
4861: 'Rewa',
4851: 'Satna',
4571: 'Ratlam',
4801: 'Chhindwara',
4611: 'Narmadapuram',
4541: 'Dhar',
4551: 'Dewas',
4761: 'Morena',
4501: 'Khandwa',
4511: 'Khargone',
4771: 'Bhind',
4731: 'Shivpuri',
4732: 'Guna',
4581: 'Mandsaur',
3651: 'Amreli',
3851: 'Palanpur',
3621: 'Junagadh',
3701: 'Bhuj',
3841: 'Mehsana',
3962: 'Navsari',
3891: 'Godhra',
3842: 'Patan',
3601: 'Porbandar',
3831: 'Himatnagar',
3632: 'Surendranagar',
3941: 'Vyara',
3963: 'Valsad',
3051: 'Ajmer',
3011: 'Alwar',
3341: 'Bikaner',
3111: 'Bhilwara',
3321: 'Sikar',
3331: 'Jhunjhunu',
3351: 'Sri Ganganagar',
3352: 'Hanumangarh',
3311: 'Churu',
3411: 'Nagaur',
3211: 'Bharatpur',
3281: 'Dholpur',
3221: 'Sawai Madhopur',
3251: 'Baran',
3261: 'Jhalawar',
3121: 'Chittorgarh',
3132: 'Rajsamand',
3421: 'Pali',
3441: 'Barmer',
3451: 'Jaisalmer',
3431: 'Jalor',
3071: 'Sirohi',
3031: 'Dausa',
3041: 'Tonk',
3231: 'Bundi',
3271: 'Banswara',
3141: 'Dungarpur',
3122: 'Pratapgarh',
1271: 'Bhiwani',
1272: 'Charkhi Dadri',
1251: 'Fatehabad',
1252: 'Hisar',
1241: 'Jhajjar',
1261: 'Jind',
1361: 'Kaithal',
1322: 'Karnal',
1362: 'Kurukshetra',
1231: 'Narnaul',
1222: 'Nuh',
1212: 'Palwal',
1342: 'Panchkula',
1232: 'Rewari',
1242: 'Rohtak',
1252: 'Sirsa',
1311: 'Sonipat',
1351: 'Yamunanagar',
1481: 'Barnala',
1511: 'Bathinda',
1512: 'Faridkot',
1401: 'Sirhind',
1521: 'Fazilka',
1522: 'Firozpur',
1431: 'Gurdaspur',
1461: 'Hoshiarpur',
1442: 'Kapurthala',
1482: 'Malerkotla',
1513: 'Mansa',
1421: 'Moga',
1523: 'Sri Muktsar Sahib',
1451: 'Pathankot',
1471: 'Patiala',
1402: 'Rupnagar',
1483: 'Sangrur',
1443: 'Nawanshahr',
1432: 'Tarn Taran',
1921: 'Anantnag',
1931: 'Bandipora',
1931: 'Baramulla',
1821: 'Doda',
1841: 'Kathua',
1822: 'Kishtwar',
1922: 'Kulgam',
1932: 'Kupwara',
1851: 'Poonch',
1852: 'Rajouri',
1823: 'Ramban',
1824: 'Reasi',
1842: 'Samba',
1923: 'Shopian',
1825: 'Udhampur',
1941: 'Leh',
1942: 'Kargil',
1741: 'Bilaspur',
1761: 'Chamba',
1771: 'Hamirpur',
1762: 'Dharamshala',
1722: 'Reckong Peo',
1751: 'Kullu',
1752: 'Keylong',
1753: 'Mandi',
1711: 'Shimla',
1732: 'Nahan',
1733: 'Solan',
1742: 'Una',
2632: 'Almora',
2633: 'Bageshwar',
2461: 'Gopeshwar',
2621: 'Champawat',
2631: 'Nainital',
2462: 'Pauri',
2622: 'Pithoragarh',
2463: 'Rudraprayag',
2492: 'New Tehri',
2493: 'Uttarkashi',
2411: 'Hardoi',
2622: 'Lakhimpur',
2291: 'Rae Bareli',
2611: 'Sitapur',
2091: 'Unnao',
2092: 'Akbarpur - Kanpur Dehat',
2061: 'Etawah',
2092: 'Fatehgarh',
2093: 'Kannauj',
2062: 'Auraiya',
2241: 'Ayodhya',
2242: 'Akbarpur - Ambedkar Nagar',
2251: 'Barabanki',
2281: 'Sultanpur',
2271: 'Gauriganj',
2502: 'Baghpat',
2031: 'Bulandshahr',
2451: 'Hapur',
2111: 'Prayagraj',
2121: 'Fatehpur',
2122: 'Manjhanpur',
2301: 'Pratapgarh',
2432: 'Badaun',
2622: 'Pilibhit',
2421: 'Shahjahanpur',
2741: 'Deoria',
2742: 'Padrauna',
2732: 'Maharajganj',
2841: 'Jhansi',
2851: 'Orai',
2842: 'Lalitpur',
2461: 'Bijnor',
2442: 'Amroha',
2443: 'Sambhal / Bahjoi',
2471: 'Saharanpur',
2511: 'Muzaffarnagar',
2472: 'Shamli',
8541: 'Araria',
8041: 'Arwal',
8241: 'Aurangabad',
8131: 'Banka',
8511: 'Begusarai',
8021: 'Ara',
8022: 'Buxar',
8461: 'Darbhanga',
8451: 'Motihari',
8231: 'Gaya',
8411: 'Gopalganj',
8111: 'Jamui',
8042: 'Jehanabad',
8211: 'Bhabua',
8541: 'Katihar',
8512: 'Khagaria',
8551: 'Kishanganj',
8112: 'Lakhisarai',
8521: 'Madhepura',
8471: 'Madhubani',
8113: 'Munger',
8422: 'Muzaffarpur',
8031: 'Biharsharif',
8051: 'Nawada',
8542: 'Purnia',
8212: 'Sasaram',
8522: 'Saharsa',
8481: 'Samastipur',
8412: 'Chhapra',
8114: 'Sheikhpura',
8431: 'Sheohar',
8432: 'Sitamarhi',
8413: 'Siwan',
8523: 'Supaul',
8452: 'Bettiah',
8331: 'Chaibasa',
8251: 'Hazaribagh',
8221: 'Medininagar',
8151: 'Giridih',
8141: 'Deoghar',
8142: 'Dumka',
8142: 'Godda',
8161: 'Sahibganj',
8162: 'Pakur',
8152: 'Jamtara',
8252: 'Chatra',
8253: 'Koderma',
8222: 'Garhwa',
8291: 'Latehar',
8351: 'Lohardaga',
8352: 'Gumla',
8353: 'Simdega',
8354: 'Khunti',
8331: 'Saraikela',
7361: 'Alipurduar',
7221: 'Bankura',
7311: 'Suri',
7362: 'Cooch Behar',
7331: 'Balurghat',
7342: 'Darjeeling',
7121: 'Chinsurah-Mogra',
7351: 'Jalpaiguri',
7211: 'Jhargram',
7342: 'Kalimpong',
7321: 'Malda / English Bazar',
7421: 'Berhampore',
7411: 'Krishnanagar',
7001: 'Barasat',
7212: 'Midnapore',
7133: 'Burdwan',
7231: 'Purulia',
7332: 'Raiganj',
7371: 'Gangtok',
7372: 'Pakyong',
7373: 'Namchi',
7374: 'Gyalshing',
7375: 'Soreng',
7376: 'Mangan',
7811: 'Pathsala',
7812: 'Mushalpur',
7813: 'Barpeta',
7841: 'Biswanath Chariali',
7831: 'Bongaigaon',
7881: 'Silchar',
7851: 'Sonari',
7832: 'Kajalgaon',
7842: 'Mangaldai',
7871: 'Dhemaji',
7833: 'Dhubri',
7861: 'Dibrugarh',
7882: 'Haflong',
7834: 'Goalpara',
7852: 'Golaghat',
7883: 'Hailakandi',
7821: 'Sankardev Nagar',
7853: 'Jorhat',
7822: 'Diphu',
7884: 'Karimganj',
7835: 'Kokrajhar',
7872: 'North Lakhimpur',
7854: 'Garamur',
7823: 'Morigaon',
7824: 'Nagaon',
7814: 'Nalbari',
7855: 'Sivasagar',
7843: 'Tezpur',
7836: 'Hatsingimari',
7862: 'Tinsukia',
7844: 'Udalguri',
7825: 'Hamren',
7901: 'Tawang',
7902: 'Bomdila',
7903: 'Seppa',
7904: 'Lemmi',
7911: 'Yupia',
7912: 'Itanagar',
7913: 'Koloriang',
7914: 'Palin',
7914: 'Subansiri',
7915: 'Siang',
7921: 'Changlang',
7863: 'Khonsa',
7922: 'Longding',
7923: 'Namsai',
7924: 'Tezu',
7925: 'Hawai',
7926: 'Dibang Valley',
7916: 'Basar',
7917: 'Tato',
7918: 'Napangphung',
7971: 'Chümoukedima',
7972: 'Dimapur',
7981: 'Kiphire',
7973: 'Kohima',
7982: 'Longleng',
7974: 'Meluri',
7983: 'Mokokchung',
7984: 'Mon',
7975: 'Niuland',
7985: 'Noklak',
7976: 'Peren',
7977: 'Phek',
7986: 'Shamator',
7978: 'Tseminyü',
7987: 'Tuensang',
7979: 'Wokha',
7988: 'Zünheboto',
7951: 'Manipur',
7961: 'Mizoram',
7991: 'Tripura',
7992: 'Agartala',
7932: 'Shillong',
7931: 'Megalaya',
7441: 'Port Blair',
7442: 'Mayabunder',
7443: 'Car Nicobar',
6822: 'Kavaratti',
6051: 'Puducherry',
6052: 'Oulgaret',
6053: 'Villianur',
6054: 'Bahour',
6092: 'Karaikal',
6093: 'Thirunallar',
6733: 'Mahe',
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
