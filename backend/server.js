const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_PATH = path.join(__dirname, 'data', 'feedback.json');

app.use(cors());
app.use(bodyParser.json());

// Ensure DB file exists
async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch (e) {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, '[]', 'utf8');
  }
}

async function readDB() {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/feedback', async (req, res) => {
  try {
    const items = await readDB();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read feedback' });
  }
});

app.post('/feedback', async (req, res) => {
  try {
    const { name, rating, comment, tempId } = req.body;
    if (!name || !rating) {
      return res.status(400).json({ error: 'name and rating are required' });
    }
    const items = await readDB();
    const newItem = {
      id: Date.now().toString(),
      name,
      rating,
      comment: comment || '',
      createdAt: new Date().toISOString()
    };
    items.unshift(newItem); // add to front
    await writeDB(items);
    // simulate small processing delay to make optimistic updates visible
    setTimeout(() => {
      res.status(201).json({ success: true, item: newItem, tempId: tempId || null });
    }, 300);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`Feedback backend running on http://localhost:${PORT}`);
});
