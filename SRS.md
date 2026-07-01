# Software Requirements Specification

## 1. Project Title
ระบบจัดการปัญหาน้ำประปาไม่สะอาด (Water Issue Management API)

## 2. Purpose
สร้างระบบ backend สำหรับรับ-จัดการรายงานปัญหาน้ำประปาไม่สะอาดผ่าน API โดยใช้ Next.js API Routes และ SQLite

## 3. Scope
- รับข้อมูลรายงานปัญหาจากผู้ใช้ผ่าน API
- บันทึกข้อมูลลงฐานข้อมูล SQLite
- ดึงรายงานทั้งหมดและรายงานตาม ID
- แก้ไขสถานะและรายละเอียดของรายงาน
- ลบรายงาน

## 4. Functional Requirements
### FR-01: Create Issue
ผู้ใช้สามารถสร้างรายงานปัญหาใหม่ผ่าน POST /api/issues

### FR-02: Read All Issues
ระบบสามารถแสดงรายงานปัญหาทั้งหมดผ่าน GET /api/issues

### FR-03: Read Issue by ID
ระบบสามารถแสดงรายงานตาม ID ผ่าน GET /api/issues/[id]

### FR-04: Update Issue
ระบบสามารถอัปเดตข้อมูลรายงานผ่าน PUT /api/issues/[id]

### FR-05: Delete Issue
ระบบสามารถลบรายงานผ่าน DELETE /api/issues/[id]

## 5. Non-Functional Requirements
- ใช้งานง่ายผ่าน REST API
- รองรับการรันบน Next.js development server
- ใช้ SQLite สำหรับจัดเก็บข้อมูลในตัว
- รองรับคำขอ JSON

## 6. Data Fields
- id
- title
- description
- location
- reported_by
- status
- created_at
- updated_at

## 7. Status Values
- reported
- investigating
- resolved
