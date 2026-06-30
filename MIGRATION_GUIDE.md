# Migration Guide: FastAPI → Next.js

บทนำในการย้ายจาก FastAPI Backend เป็น Next.js Full-Stack Application

## สรุปการเปลี่ยนแปลง

### What's Changed
- **Framework Backend**: FastAPI → Next.js API Routes
- **Database ORM**: SQLAlchemy → better-sqlite3
- **Frontend**: ไม่มี → React with Next.js
- **Language**: Python → JavaScript
- **Server**: Uvicorn → Node.js with Next.js

### What's Stayed the Same
- ✅ SQLite database
- ✅ Same API endpoints structure
- ✅ Same data model
- ✅ Same business logic

## Comparison

### FastAPI vs Next.js

| Feature | FastAPI | Next.js |
|---------|---------|---------|
| Endpoint | `@app.get("/issues")` | `app/api/issues/route.js` |
| Request Handler | Function | Default export handler |
| Response | Return object | `NextResponse.json()` |
| Dependency | `Depends(get_db)` | Import functions |
| Database | SQLAlchemy ORM | SQL queries |
| Frontend | Separate app | Built-in with React |

## File Mapping

### FastAPI Structure
```
app/
├── main.py          (routes)
├── crud.py          (operations)
├── models.py        (database models)
├── schemas.py       (data validation)
├── database.py      (connection)
└── __init__.py
```

### Next.js Structure
```
app/
├── api/
│   └── issues/
│       ├── route.js         (GET, POST)
│       └── [id]/
│           └── route.js     (GET, PUT, DELETE)
├── components/
│   ├── IssueForm.js         (create form)
│   ├── IssueList.js         (list view)
│   ├── IssueCard.js         (single item)
│   └── IssueEdit.js         (edit form)
├── globals.css
├── layout.js
└── page.js                  (dashboard)
lib/
└── db.js                    (database functions)
```

## API Routes Mapping

### GET /issues → GET /api/issues
```python
# FastAPI
@app.get("/issues", response_model=list[schemas.Issue])
def read_issues(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_issues(db, skip=skip, limit=limit)
```

```javascript
// Next.js
export async function GET(request) {
  const url = new URL(request.url);
  const skip = parseInt(url.searchParams.get('skip') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || '100', 10);
  
  const issues = getAllIssues(skip, limit);
  return NextResponse.json(issues, { status: 200 });
}
```

### POST /issues → POST /api/issues
```python
# FastAPI
@app.post("/issues", response_model=schemas.Issue, status_code=201)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    return crud.create_issue(db, issue=issue)
```

```javascript
// Next.js
export async function POST(request) {
  const body = await request.json();
  
  if (!body.title || !body.description || !body.location || !body.reported_by) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  const newIssue = createIssue(body);
  return NextResponse.json(newIssue, { status: 201 });
}
```

### GET /issues/{id} → GET /api/issues/[id]
```python
# FastAPI
@app.get("/issues/{issue_id}", response_model=schemas.Issue)
def read_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = crud.get_issue(db, issue_id=issue_id)
    if db_issue is None:
        raise HTTPException(status_code=404, detail="Not found")
    return db_issue
```

```javascript
// Next.js
export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  const issue = getIssueById(id);
  
  if (!issue) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json(issue, { status: 200 });
}
```

## Database Changes

### SQLAlchemy Model
```python
class WaterIssue(Base):
    __tablename__ = "water_issues"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String(200), nullable=False)
    reported_by = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False, default="reported")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Better-SQLite3 Query
```javascript
// Create table
database.exec(`
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
`);

// Query
const stmt = database.prepare('SELECT * FROM water_issues WHERE id = ?');
const issue = stmt.get(id);
```

## Running the Application

### Before (FastAPI)
```powershell
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
# http://localhost:8000
```

### After (Next.js)
```powershell
npm install
npm run dev
# http://localhost:3000
```

## Testing API

### cURL
```bash
# Before
curl http://localhost:8000/issues

# After
curl http://localhost:3000/api/issues
```

### Python Requests
```python
# Before
import requests
response = requests.get("http://localhost:8000/issues")

# After (Node.js version)
import requests
response = requests.get("http://localhost:3000/api/issues")
```

## Benefits of Migration

✅ **Full-stack JavaScript** - Single language for frontend and backend
✅ **Built-in React UI** - Dashboard included without separate frontend
✅ **Better Performance** - Faster cold starts, optimized Next.js
✅ **Easier Deployment** - Single project to deploy
✅ **Modern Framework** - Latest Next.js 15 features
✅ **TypeScript Ready** - Can migrate to TypeScript later if needed

## Potential Issues & Solutions

### Issue: better-sqlite3 won't install
```powershell
# Windows requires build tools
npm install --save-dev windows-build-tools
npm install
```

### Issue: Database locked error
- Ensure only one process is accessing the database
- Close development server and restart

### Issue: Port 3000 in use
```powershell
npm run dev -- -p 3001
```

### Issue: Module not found for '@/lib/db'
- Ensure `jsconfig.json` is created with path alias (auto-generated by Next.js)

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run development server: `npm run dev`
3. ✅ Test API endpoints: Visit http://localhost:3000
4. ✅ Build for production: `npm run build && npm start`
5. (Optional) Convert to TypeScript for better type safety
6. (Optional) Add authentication/authorization
7. (Optional) Add more features to the UI

## Questions?

Refer to official documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [React Documentation](https://react.dev)
