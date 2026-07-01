# Architecture

## Overview
The system is a lightweight backend service for managing water issue reports.

## Components
- Next.js server for handling API requests
- API routes under pages/api/issues
- SQLite database file at the project root
- Database helper module at lib/db.js

## Request Flow
1. Client sends HTTP request to an API route.
2. Next.js route handler receives the request.
3. The route calls database helper functions.
4. SQLite performs CRUD operations.
5. The response is returned as JSON.

## Data Model
Table: water_issues
- id: INTEGER PRIMARY KEY
- title: TEXT
- description: TEXT
- location: TEXT
- reported_by: TEXT
- status: TEXT
- created_at: TEXT
- updated_at: TEXT

## Deployment Considerations
- Suitable for local development and simple production hosting.
- Can be extended with auth, validation, and logging later.
