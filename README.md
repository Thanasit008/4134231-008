# ระบบจัดการปัญหาน้ำประปาไม่สะอาด (Next.js API Backend)

โปรเจกต์นี้เป็น backend สำหรับจัดการรายงานปัญหาน้ำประปาไม่สะอาด โดยใช้ Next.js API Routes และ SQLite

## ฟีเจอร์หลัก
- สร้างรายงานปัญหาใหม่
- ดึงรายงานทั้งหมด
- ดึงรายงานตาม ID
- อัปเดตรายงาน
- ลบรายงาน

## โครงสร้างโปรเจกต์

```
pages/
  api/
    issues/
      index.js
      [id].js
lib/
  db.js
```

## ติดตั้ง

```bash
npm install
```

## รันเซิร์ฟเวอร์

```bash
npm run dev
```

หลังจากรันแล้วเปิดที่:
- http://localhost:3000/api/issues

## API Endpoints

- GET /api/issues
- GET /api/issues/[id]
- POST /api/issues
- PUT /api/issues/[id]
- DELETE /api/issues/[id]

## ตัวอย่าง cURL

### ดึงรายงานทั้งหมด
```bash
curl http://localhost:3000/api/issues
```

### สร้างรายงานใหม่
```bash
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -d '{
    "title": "น้ำขุ่นสีเหลือง",
    "description": "น้ำประปามีสีเหลืองและมีกลิ่นคาว",
    "location": "แขวงบางกะปิ",
    "reported_by": "นายนิรันดร์",
    "status": "reported"
  }'
```

## ฐานข้อมูล

ระบบใช้ SQLite และเก็บข้อมูลในไฟล์ water_issues.db ที่ root ของโปรเจกต์
