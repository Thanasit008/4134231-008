const { initDb, runQuery, getRows } = require('../../../lib/db');

module.exports = async function handler(req, res) {
  await initDb();

  if (req.method === 'GET') {
    try {
      const skip = Math.max(0, parseInt(req.query.skip || '0', 10));
      const limit = Math.max(1, parseInt(req.query.limit || '100', 10));

      const issues = await getRows(
        'SELECT * FROM water_issues ORDER BY id DESC LIMIT ? OFFSET ?',
        [limit, skip]
      );

      return res.status(200).json(issues);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch issues', error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, location, reported_by, status } = req.body || {};

      if (!title || !description || !location || !reported_by) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const now = new Date().toISOString();
      const result = await runQuery(
        `
        INSERT INTO water_issues (title, description, location, reported_by, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [title, description, location, reported_by, status || 'reported', now, now]
      );

      const createdIssue = await getRows('SELECT * FROM water_issues WHERE id = ?', [result.id]);
      return res.status(201).json(createdIssue[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create issue', error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: 'Method not allowed' });
};
