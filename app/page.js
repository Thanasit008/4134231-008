export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
      <h1>Water Issue Backend</h1>
      <p>This project exposes REST API endpoints for managing water issue reports.</p>
      <ul>
        <li>GET /api/issues</li>
        <li>GET /api/issues/[id]</li>
        <li>POST /api/issues</li>
        <li>PUT /api/issues/[id]</li>
        <li>DELETE /api/issues/[id]</li>
      </ul>
    </main>
  );
}
