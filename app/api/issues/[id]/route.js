const { initDb, runQuery, getRow } = require('../../../../lib/db');

exports.GET = async function GET(request, { params }) {
  await initDb();

  const issueId = Number(params.id);
  if (!Number.isInteger(issueId)) {
    return Response.json({ message: 'Invalid issue id' }, { status: 400 });
  }

  try {
    const issue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
    if (!issue) {
      return Response.json({ message: 'Issue not found' }, { status: 404 });
    }

    return Response.json(issue, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to fetch issue', error: error.message }, { status: 500 });
  }
};

exports.PUT = async function PUT(request, { params }) {
  await initDb();

  const issueId = Number(params.id);
  if (!Number.isInteger(issueId)) {
    return Response.json({ message: 'Invalid issue id' }, { status: 400 });
  }

  try {
    const existingIssue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
    if (!existingIssue) {
      return Response.json({ message: 'Issue not found' }, { status: 404 });
    }

    const body = await request.json();
    const fields = ['title', 'description', 'location', 'reported_by', 'status'];
    const updates = [];
    const values = [];

    fields.forEach((field) => {
      if (body && Object.prototype.hasOwnProperty.call(body, field) && body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    });

    if (updates.length === 0) {
      return Response.json(existingIssue, { status: 200 });
    }

    values.push(new Date().toISOString(), issueId);
    await runQuery(`UPDATE water_issues SET ${updates.join(', ')}, updated_at = ? WHERE id = ?`, values);

    const updatedIssue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
    return Response.json(updatedIssue, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to update issue', error: error.message }, { status: 500 });
  }
};

exports.DELETE = async function DELETE(request, { params }) {
  await initDb();

  const issueId = Number(params.id);
  if (!Number.isInteger(issueId)) {
    return Response.json({ message: 'Invalid issue id' }, { status: 400 });
  }

  try {
    const issue = await getRow('SELECT * FROM water_issues WHERE id = ?', [issueId]);
    if (!issue) {
      return Response.json({ message: 'Issue not found' }, { status: 404 });
    }

    await runQuery('DELETE FROM water_issues WHERE id = ?', [issueId]);
    return Response.json(issue, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to delete issue', error: error.message }, { status: 500 });
  }
};
