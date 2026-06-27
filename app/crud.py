from sqlalchemy.orm import Session
from . import models, schemas


def get_issue(db: Session, issue_id: int):
    return db.query(models.WaterIssue).filter(models.WaterIssue.id == issue_id).first()


def get_issues(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.WaterIssue).offset(skip).limit(limit).all()


def create_issue(db: Session, issue: schemas.IssueCreate):
    db_issue = models.WaterIssue(
        title=issue.title,
        description=issue.description,
        location=issue.location,
        reported_by=issue.reported_by,
        status=issue.status or "reported"
    )
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue


def update_issue(db: Session, db_issue: models.WaterIssue, issue_update: schemas.IssueUpdate):
    for field, value in issue_update.dict(exclude_unset=True).items():
        setattr(db_issue, field, value)
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue


def delete_issue(db: Session, db_issue: models.WaterIssue):
    db.delete(db_issue)
    db.commit()
    return db_issue
