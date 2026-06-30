# ระบบจัดการปัญหาน้ำประปาไม่สะอาด (Next.js Full-Stack)

ระบบ Full-Stack สำหรับจัดการรายงานปัญหาน้ำประปาไม่สะอาดโดยใช้ Next.js 15, React, และ SQLite

## คุณสมบัติ
- ✅ สร้างรายงานปัญหาใหม่
- ✅ ดูรายงานทั้งหมด
- ✅ ดูรายงานตาม ID
- ✅ แก้ไขสถานะและรายละเอียดรายงาน
- ✅ ลบรายงาน
- ✅ Dashboard ที่ใช้งานง่าย
- ✅ API RESTful ที่ดี

## ติดตั้ง

### ขั้นตอนที่ 1: ติดตั้ง Dependencies
```powershell
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

### ขั้นตอนที่ 2: รันแอป (Development)
```powershell
npm run dev
```

จากนั้นเปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## คำสั่ง

- `npm run dev` - รัน development server
- `npm run build` - สร้าง production build
- `npm start` - รัน production server
- `npm run lint` - ตรวจสอบ code style

## โครงสร้าง Project

```
.
├── app/
│   ├── api/
│   │   └── issues/
│   │       ├── route.js              # GET /api/issues, POST /api/issues
│   │       └── [id]/
│   │           └── route.js          # GET/PUT/DELETE /api/issues/[id]
│   ├── components/
│   │   ├── IssueForm.js              # ฟอร์มสร้างรายงานใหม่
│   │   ├── IssueList.js              # รายการรายงานทั้งหมด
│   │   ├── IssueCard.js              # การ์ดรายงานเดี่ยว
│   │   └── IssueEdit.js              # ฟอร์มแก้ไขรายงาน
│   ├── globals.css                   # Stylesheet ทั่วไป
│   ├── layout.js                     # Root layout
│   └── page.js                       # หน้าแรก (Dashboard)
├── lib/
│   └── db.js                         # ฟังก์ชัน Database
├── public/                           # Static files
├── package.json                      # Dependencies
├── next.config.js                    # Next.js Configuration
├── .env.local                        # Environment variables
└── .gitignore                        # Git ignore

```

## API Endpoints

### ดึงรายงานทั้งหมด
```
GET /api/issues
Query Parameters:
  - skip: int (default: 0) - ข้ามรายงาน N รายการแรก
  - limit: int (default: 100) - จำนวนรายงานที่ดึง
```

### ดึงรายงานตาม ID
```
GET /api/issues/{id}
```

### สร้างรายงานใหม่
```
POST /api/issues
Content-Type: application/json

{
  "title": "น้ำขุ่นสีเหลือง",
  "description": "น้ำประปามีสีเหลืองและมีกลิ่นคาวหลังจากหยุดจ่ายน้ำ",
  "location": "แขวงวังทองหลาง",
  "reported_by": "นายสมชาย",
  "status": "reported"
}
```

### แก้ไขรายงาน
```
PUT /api/issues/{id}
Content-Type: application/json

{
  "title": "...",
  "description": "...",
  "location": "...",
  "reported_by": "...",
  "status": "investigating"  # reported, investigating, resolved
}
```

### ลบรายงาน
```
DELETE /api/issues/{id}
```

## ตัวอย่าง cURL

### สร้างรายงาน
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

### ดึงรายงานทั้งหมด
```bash
curl http://localhost:3000/api/issues
```

### ดึงรายงานตาม ID
```bash
curl http://localhost:3000/api/issues/1
```

### แก้ไขรายงาน
```bash
curl -X PUT http://localhost:3000/api/issues/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "investigating"
  }'
```

### ลบรายงาน
```bash
curl -X DELETE http://localhost:3000/api/issues/1
```

## ฐานข้อมูล

ระบบใช้ SQLite ซึ่งเก็บข้อมูลในไฟล์ `water_issues.db` ที่ root directory

### Schema

```sql
CREATE TABLE water_issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  reported_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reported',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## ค่า Status ที่ใช้งาน

- `reported` - รายงานแล้ว
- `investigating` - กำลังตรวจสอบ
- `resolved` - แก้ไขแล้ว

## Environment Variables

ตัวแปรในไฟล์ `.env.local`:

- `DATABASE_PATH` - ตำแหน่งของไฟล์ SQLite database
- `NODE_ENV` - สภาวะการทำงาน (development, production)

## Troubleshooting

### ข้อมูลสูญหายหลังจากรีสตาร์ท

ตรวจสอบว่าไฟล์ `water_issues.db` ยังคงอยู่ใน root directory

### Better-sqlite3 Installation Error

หากพบข้อมูลติดตั้ง better-sqlite3:
```powershell
npm install --save-dev windows-build-tools
npm install
```

### Port 3000 ถูกใช้งานแล้ว

เปลี่ยน port โดยเรียก:
```powershell
npm run dev -- -p 3001
```
