const { initDb, runQuery, getRows } = require('../../../lib/db');

exports.GET = async function GET(request) {
  await initDb();

  try {
    const { searchParams } = new URL(request.url);
    const skip = Math.max(0, Number.parseInt(searchParams.get('skip') || '0', 10));
    const limit = Math.max(1, Number.parseInt(searchParams.get('limit') || '100', 10));

    const issues = await getRows(
      'SELECT * FROM water_issues ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, skip]
    );

    return Response.json(issues, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to fetch issues', error: error.message }, { status: 500 });
  }
};

exports.POST = async function POST(request) {
  await initDb();

  try {
    const body = await request.json();
    const { title, description, location, reported_by, status } = body || {};

    if (!title || !description || !location || !reported_by) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
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
    return Response.json(createdIssue[0], { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Failed to create issue', error: error.message }, { status: 500 });
  }
};
