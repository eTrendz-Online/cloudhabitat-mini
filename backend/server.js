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
  'https://cloud.eetrendz.workers.dev',
  'https://cloud.eetrendz.uk',
  'http://localhost:8787',
  'http://127.0.0.1:8787'
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

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`CloudHabitat backend listening on port ${PORT}`);
});
