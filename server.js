// Simple proxy server for Edamam Recipe Search API v2
// Run: node server.js  (port 3001)

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Allow requests from your React app (Vite is running on port 3001, per vite.config.js)
app.use(cors({ origin: 'http://localhost:4000' }));

// Your Edamam keys (better to move these to a .env file later)
const My_ID = 'da16e455';
const My_KEY = '92d9a8e2936484536fea9e5a918e5db3';

app.get('/api/recipes', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(q)}&app_id=${My_ID}&app_key=${My_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Error fetching from Edamam:', err);
    res.status(500).json({ error: 'Failed to fetch data from Edamam' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log(`Try it: http://localhost:${PORT}/api/recipes?q=chicken`);
});