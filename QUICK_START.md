# QUICK START - ระบบจัดการปัญหาน้ำประปา

เริ่มต้นใช้งานระบบใหม่ด้วย Next.js ใน 3 ขั้นตอนง่าย

## ✅ ขั้นตอนที่ 1: ติดตั้ง Dependencies

```powershell
npm install
```

หรือ หากใช้ yarn:
```powershell
yarn install
```

หรือ หากใช้ pnpm:
```powershell
pnpm install
```

## ✅ ขั้นตอนที่ 2: รัน Development Server

```powershell
npm run dev
```

Output จะแสดงดังนี้:
```
> water-issue-system@1.0.0 dev
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

## ✅ ขั้นตอนที่ 3: เปิดเบราว์เซอร์

ไปที่ [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์ของคุณ

---

## 📝 ฟีเจอร์ที่ใช้ได้

### Dashboard
- ✅ ดูรายงานปัญหาทั้งหมด
- ✅ ค้นหาและกรองรายงาน
- ✅ เรียงลำดับตามวันที่ล่าสุด

### สร้างรายงาน
- ✅ กรอกข้อมูลปัญหา
- ✅ เลือกสถานะ (รายงานแล้ว/กำลังตรวจสอบ/แก้ไขแล้ว)
- ✅ บันทึกโดยอัตโนมัติในฐานข้อมูล

### แก้ไขรายงาน
- ✅ อัปเดตข้อมูลใดๆ ของรายงาน
- ✅ เปลี่ยนสถานะ
- ✅ บันทึกการแก้ไข

### ลบรายงาน
- ✅ ลบรายงานที่ไม่จำเป็น
- ✅ มีการยืนยันก่อนลบ

---

## 🔧 API Endpoints

ระบบให้ API สำหรับ integrations อื่นๆ:

### สร้างรายงาน
```bash
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -d '{
    "title": "น้ำขุ่นสีเหลือง",
    "description": "น้ำประปามีสีเหลืองและมีกลิ่นคาว",
    "location": "แขวงบางกะปิ",
    "reported_by": "ชื่อผู้รายงาน",
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

### อัปเดตรายงาน
```bash
curl -X PUT http://localhost:3000/api/issues/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "investigating"}'
```

### ลบรายงาน
```bash
curl -X DELETE http://localhost:3000/api/issues/1
```

---

## 📊 ฐานข้อมูล

ข้อมูลเก็บในไฟล์ `water_issues.db` (SQLite)

ไฟล์นี้จะสร้างอัตโนมัติเมื่อรันครั้งแรก

---

## 🛑 หยุด Development Server

กด `Ctrl + C` ในขั้นเทอร์มินัล

---

## 🚀 Build สำหรับ Production

```powershell
npm run build
npm start
```

---

## 🐛 Troubleshooting

### ❌ Error: Module not found
```powershell
# ลบ node_modules และติดตั้งใหม่
rm -r node_modules
npm install
```

### ❌ Port 3000 ถูกใช้งาน
```powershell
npm run dev -- -p 3001
```

### ❌ better-sqlite3 installation error (Windows)
```powershell
npm install --save-dev windows-build-tools
npm install
```

### ❌ Database locked
- ปิด development server
- ลบไฟล์ `water_issues.db-wal` และ `water_issues.db-shm` ถ้ามี
- รันใหม่

---

## 📖 เอกสารเพิ่มเติม

- [README.md](./README.md) - เอกสารทั้งหมด
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - คู่มือย้ายจาก FastAPI
- [CLAUDE.md](./CLAUDE.md) - ข้อมูล Backend (เดิม)

---

## ❓ คำถาม

หากมีคำถาม ให้ตรวจสอบเอกสารหรือลองรันคำสั่ง:
```powershell
npm run dev
```

พร้อมใช้งาน! 🎉
