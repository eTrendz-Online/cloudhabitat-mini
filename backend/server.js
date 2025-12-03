/**
 * CloudHabitat Mini Lab - backend/server.js
 * Minimal, deploy-friendly Express backend
 */
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allowed frontend origins — exact strings, no trailing slash
const allowedOrigins = [
  'https://cloudhabitat-mini.pages.dev',
  'https://cloud.eetrendz.workers.dev',
  'http://localhost:8787',
  'https://0f883717.cloudhabitat-mini.pages.dev'
];

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (curl/postman)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS policy — origin not allowed'));
  }
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/echo', (req, res) => {
  res.json({
    ok: true,
    method: 'GET',
    ts: Date.now(),
    query: req.query,
    headers: req.headers
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    ok: true,
    method: 'POST',
    ts: Date.now(),
    body: req.body,
    headers: req.headers
  });
});

app.get('/', (req, res) => res.send('CloudHabitat backend is running'));


/**
 * Start server — use PORT provided by Fly (or fallback to 8787 for local)
 */
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`CloudHabitat backend listening on ${PORT}`);
  // print a simple readiness line for Fly logs / health checks
  console.log('READY');
});
