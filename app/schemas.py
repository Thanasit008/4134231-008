from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class IssueBase(BaseModel):
    title: str = Field(..., example="น้ำขุ่นสีเหลือง")
    description: str = Field(..., example="น้ำประปามีสีเหลืองและมีกลิ่นคาว")
    location: str = Field(..., example="แขวงบางกะปิ")
    reported_by: str = Field(..., example="นายนิรันดร์")
    status: Optional[str] = Field("reported", example="reported")

class IssueCreate(IssueBase):
    pass

class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    reported_by: Optional[str] = None
    status: Optional[str] = None

class Issue(IssueBase):
    id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
