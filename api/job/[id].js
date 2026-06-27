// api/job/[id].js - SIMPLIFIED TEST VERSION
export default function handler(req, res) {
  const { id } = req.query;
  
  // Return a simple HTML page
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Job ${id} - JobAd</title>
    <meta name="description" content="Job ${id} on JobAd">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Test Job ${id}",
      "description": "This is a test job description",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Test Company"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },
      "datePosted": "${new Date().toISOString()}",
      "employmentType": "FULL_TIME"
    }
    </script>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      h1 { color: #1e40af; }
      .btn { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 12px; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>
  <div class="card">
    <h1>Test Job ${id}</h1>
    <p>This is a test page to verify the API is working.</p>
    <p><strong>Job ID:</strong> ${id}</p>
    <button class="btn" onclick="window.location.href='/?type=JOB&id=${id}'">Open in App</button>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
