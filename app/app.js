const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), 'water_issues.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS water_issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        reported_by TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'reported',
        created_at TEXT NOT NULL,
        updated_at TEXT
      )
    `);
  });
}

initDb();

app.get('/api/issues', (req, res) => {
  db.all('SELECT * FROM water_issues ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch issues', error: err.message });
    }
    res.json(rows);
  });
});

app.post('/api/issues', (req, res) => {
  const { title, description, location, reported_by, status } = req.body || {};

  if (!title || !description || !location || !reported_by) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const now = new Date().toISOString();

  db.run(
    'INSERT INTO water_issues (title, description, location, reported_by, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, description, location, reported_by, status || 'reported', now, now],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create issue', error: err.message });
      }

      db.get('SELECT * FROM water_issues WHERE id = ?', [this.lastID], (getErr, row) => {
        if (getErr) {
          return res.status(500).json({ message: 'Failed to fetch created issue', error: getErr.message });
        }
        res.status(201).json(row);
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
