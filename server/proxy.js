import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Handle all HTTP methods for Jira API
app.all('/api/jira/*', async (req, res) => {
  const { domain, email, apitoken } = req.headers;
  
  if (!domain || !email || !apitoken) {
    return res.status(400).json({ error: 'Missing required headers' });
  }

  const jiraPath = req.path.replace('/api/jira', '');
  const url = `https://${domain}.atlassian.net/rest/api/3${jiraPath}`;

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.method !== 'GET' ? req.body : undefined,
      auth: {
        username: email,
        password: apitoken
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.errorMessages?.[0] || 'Request failed',
      details: error.response?.data
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});