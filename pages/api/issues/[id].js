const { initDb, runQuery, getRow } = require('../../../lib/db');

module.exports = async function handler(req, res) {
  await initDb();

  const issueId = Number(req.query.id);

  if (!Number.isInteger(issueId)) {
    return res.status(400).json({ message: 'Invalid issue id' });
  }

  if (req.method === 'GET') {
    try {
      const issue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }
      return res.status(200).json(issue);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch issue', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const existingIssue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
      if (!existingIssue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      const fields = ['title', 'description', 'location', 'reported_by', 'status'];
      const updates = [];
      const values = [];

      fields.forEach((field) => {
        if (req.body && Object.prototype.hasOwnProperty.call(req.body, field) && req.body[field] !== undefined) {
          updates.push(`${field} = ?`);
          values.push(req.body[field]);
        }
      });

      if (updates.length === 0) {
        return res.status(200).json(existingIssue);
      }

      values.push(new Date().toISOString(), issueId);
      await runQuery(`UPDATE water_issues SET ${updates.join(', ')}, updated_at = ? WHERE id = ?`, values);

      const updatedIssue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
      return res.status(200).json(updatedIssue);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update issue', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const issue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }

      await runQuery('DELETE FROM water_issues WHERE id = ?', [issueId]);
      return res.status(200).json(issue);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete issue', error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ message: 'Method not allowed' });
};
