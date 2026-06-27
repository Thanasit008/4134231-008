# Architecture Overview

## 1. Overview
ระบบ backend ใช้สถาปัตยกรรมแบบ REST API ประกอบด้วย:
- FastAPI สำหรับสร้าง API
- SQLAlchemy ORM สำหรับเชื่อมต่อฐานข้อมูล
- SQLite สำหรับเก็บข้อมูลรายงานปัญหา

## 2. ส่วนประกอบหลัก

### 2.1 `app/main.py`
- จุดเริ่มต้นของแอป
- กำหนดเส้นทาง API
- จัดการ HTTP request/response

### 2.2 `app/database.py`
- สร้าง engine และ session สำหรับ SQLAlchemy
- จัดการการเชื่อมต่อฐานข้อมูล

### 2.3 `app/models.py`
- กำหนดโครงสร้างตารางฐานข้อมูล `WaterIssue`
- ฟิลด์หลัก: id, title, description, location, reported_by, status, created_at, updated_at

### 2.4 `app/schemas.py`
- กำหนด data models ด้วย Pydantic
- ใช้สำหรับ validation ของ request และ response

### 2.5 `app/crud.py`
- ฟังก์ชัน CRUD (Create, Read, Update, Delete)
- แยก logic การเข้าถึงฐานข้อมูลจาก API

## 3. การไหลของคำขอ
1. ผู้ใช้เรียก endpoint เช่น `POST /issues`
2. FastAPI รับ request แล้วแปลงเป็น Pydantic model
3. route เรียกใช้ฟังก์ชันใน `crud.py`
4. `crud.py` ทำงานกับเซสชันฐานข้อมูลจาก `database.py`
5. ฐานข้อมูล SQLite บันทึกหรือดึงข้อมูล
6. ส่งผลลัพธ์กลับไปยัง client

## 4. Database
- ใช้ SQLite ไฟล์ `water_issues.db`
- CRUD ทุกคำสั่งผ่าน SQLAlchemy ORM
- สร้างตารางโดยอัตโนมัติเมื่อรัน `app.main`

## 5. Deployment
- ใช้ Uvicorn เป็น ASGI server
- รันด้วยคำสั่ง:
  - `uvicorn app.main:app --reload`

## 6. ขยายระบบได้ง่าย
- สามารถเปลี่ยนฐานข้อมูลเป็น PostgreSQL หรือ MySQL ได้โดยปรับ `SQLALCHEMY_DATABASE_URL`
- สามารถเพิ่มชั้น service หรือ repository หากระบบซับซ้อนขึ้น
- สามารถเพิ่ม authentication และ logging ได้ง่าย
