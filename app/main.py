from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ระบบจัดการปัญหาน้ำประปาไม่สะอาด",
    description="Backend API สำหรับบันทึกและติดตามปัญหาน้ำประปาไม่สะอาด",
    version="1.0.0",
)


@app.get("/", summary="สถานะระบบ")
def read_root():
    return {"message": "ระบบจัดการปัญหาน้ำประปาไม่สะอาด พร้อมทำงาน"}


@app.get("/issues", response_model=list[schemas.Issue], summary="ดึงรายงานปัญหาทั้งหมด")
def read_issues(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_issues(db, skip=skip, limit=limit)


@app.get("/issues/{issue_id}", response_model=schemas.Issue, summary="ดึงรายงานตาม ID")
def read_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = crud.get_issue(db, issue_id=issue_id)
    if db_issue is None:
        raise HTTPException(status_code=404, detail="ไม่พบรายงานปัญหา")
    return db_issue


@app.post("/issues", response_model=schemas.Issue, status_code=201, summary="สร้างรายงานปัญหาใหม่")
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    return crud.create_issue(db, issue=issue)


@app.put("/issues/{issue_id}", response_model=schemas.Issue, summary="อัปเดตรายงาน")
def update_issue(issue_id: int, issue: schemas.IssueUpdate, db: Session = Depends(get_db)):
    db_issue = crud.get_issue(db, issue_id=issue_id)
    if db_issue is None:
        raise HTTPException(status_code=404, detail="ไม่พบรายงานปัญหา")
    return crud.update_issue(db, db_issue=db_issue, issue_update=issue)


@app.delete("/issues/{issue_id}", response_model=schemas.Issue, summary="ลบรายงาน")
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = crud.get_issue(db, issue_id=issue_id)
    if db_issue is None:
        raise HTTPException(status_code=404, detail="ไม่พบรายงานปัญหา")
    return crud.delete_issue(db, db_issue=db_issue)
