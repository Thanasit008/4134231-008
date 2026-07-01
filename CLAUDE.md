# CLAUDE

## Project Overview
This project is an API-only backend for managing water issue reports using Next.js API Routes and SQLite.

## Development Rules
- Keep the project focused on backend API functionality.
- Do not add frontend UI unless explicitly requested.
- Use Next.js API routes under pages/api.
- Store data in SQLite via lib/db.js.
- Keep code simple and easy to test.

## Commands
- npm install
- npm run dev
- npm run build

## Notes
- Main API endpoints:
  - GET /api/issues
  - GET /api/issues/[id]
  - POST /api/issues
  - PUT /api/issues/[id]
  - DELETE /api/issues/[id]
