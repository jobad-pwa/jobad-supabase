// api/job/[id].js - SIMPLE TEST VERSION
export default function handler(req, res) {
  const { id } = req.query;
  
  console.log('📌 Test API called for job:', id);
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Test Job ${id} - JobAd</title>
    <style>
      body { font-family: system-ui; background: #f3f4f6; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      .card { max-width: 400px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
      h1 { color: #2563eb; }
      .job-id { font-size: 48px; font-weight: 700; color: #1e40af; }
    </style>
</head>
<body>
  <div class="card">
    <h1>🔍 Test Job Page</h1>
    <p>This is a test page for job ID:</p>
    <div class="job-id">${id}</div>
    <p style="margin-top: 16px;">If you see this, the API is working!</p>
    <a href="/job" style="color: #2563eb; text-decoration: none;">← Back to Jobs</a>
  </div>
</body>
</html>
  `);
}
