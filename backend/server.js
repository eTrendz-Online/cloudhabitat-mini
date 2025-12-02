// tiny Express backend for CloudHabitat Mini Lab
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/echo', (req, res) => {
  res.json({ ok: true, method: 'GET', ts: Date.now(), query: req.query });
});

app.post('/api/echo', (req, res) => {
  res.json({ ok: true, method: 'POST', ts: Date.now(), body: req.body });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`backend listening on http://localhost:${PORT}`));
