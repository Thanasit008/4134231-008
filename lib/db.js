import sqlite3 from 'sqlite3';
import path from 'path';

// Promisify sqlite3
const dbPath = path.join(process.cwd(), 'water_issues.db');

// สร้าง database instance
const db = new sqlite3.Database(dbPath);

// ใช้ Promise version
db.configure('busyTimeout', 5000);

export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS water_issues (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          location TEXT NOT NULL,
          reported_by TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'reported',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

export function getAllIssues(skip = 0, limit = 100) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM water_issues 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `, [limit, skip], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

export function getIssueById(issueId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM water_issues WHERE id = ?', [issueId], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
}

export function createIssue(issue) {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO water_issues (title, description, location, reported_by, status)
      VALUES (?, ?, ?, ?, ?)
    `, [
      issue.title,
      issue.description,
      issue.location,
      issue.reported_by,
      issue.status || 'reported'
    ], function(err) {
      if (err) {
        reject(err);
      } else {
        // ส่งกลับรายงานที่สร้างขึ้น
        getIssueById(this.lastID).then(resolve).catch(reject);
      }
    });
  });
}

export function updateIssue(issueId, updates) {
  return new Promise(async (resolve, reject) => {
    try {
      const issue = await getIssueById(issueId);
      if (!issue) {
        return resolve(null);
      }

      const allowedFields = ['title', 'description', 'location', 'reported_by', 'status'];
      const fieldsToUpdate = Object.keys(updates)
        .filter(key => allowedFields.includes(key) && updates[key] !== undefined);

      if (fieldsToUpdate.length === 0) {
        return resolve(issue);
      }

      const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
      const values = fieldsToUpdate.map(field => updates[field]);
      values.push(issueId);

      db.run(`
        UPDATE water_issues
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, values, (err) => {
        if (err) {
          reject(err);
        } else {
          getIssueById(issueId).then(resolve).catch(reject);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteIssue(issueId) {
  return new Promise(async (resolve, reject) => {
    try {
      const issue = await getIssueById(issueId);
      if (!issue) {
        return resolve(null);
      }

      db.run('DELETE FROM water_issues WHERE id = ?', [issueId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(issue);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Initialize database on import
initializeDatabase().catch(console.error);
