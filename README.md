# ระบบจัดการปัญหาน้ำประปาไม่สะอาด (Backend)

ระบบ backend สำหรับจัดการรายงานปัญหาน้ำประปาไม่สะอาดโดยใช้ FastAPI และ SQLite

## คุณสมบัติ
- สร้างรายงานปัญหาใหม่
- ดูรายงานทั้งหมด
- ดูรายงานตาม ID
- แก้ไขสถานะและรายละเอียดรายงาน
- ลบรายงาน

## ติดตั้ง
```powershell
python -m pip install -r requirements.txt
```

## รันแอป
```powershell
uvicorn app.main:app --reload
```

## API ผู้ใช้งาน
- `GET /issues` - ดึงรายงานทั้งหมด
- `GET /issues/{issue_id}` - ดึงรายงานตาม ID
- `POST /issues` - สร้างรายงานใหม่
- `PUT /issues/{issue_id}` - อัปเดตรายงาน
- `DELETE /issues/{issue_id}` - ลบรายงาน

## ตัวอย่าง JSON สำหรับสร้างรายงาน
```json
{
  "title": "น้ำขุ่นสีเหลือง",
  "description": "น้ำประปามีสีเหลืองและมีกลิ่นคาวหลังจากหยุดจ่ายน้ำ",
  "location": "แขวงวังทองหลาง",
  "reported_by": "นายสมชาย",
  "status": "reported"
}
```
