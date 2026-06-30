'use client';

import { useState } from 'react';

export default function IssueForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    reported_by: '',
    status: 'reported'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ไม่สามารถสร้างรายงาน');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        location: '',
        reported_by: '',
        status: 'reported'
      });

      setTimeout(() => {
        setSuccess(false);
        onSubmit();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>สร้างรายงานปัญหาใหม่</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">บันทึกรายงานสำเร็จ!</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">หัวข้อปัญหา *</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="เช่น น้ำขุ่นสีเหลือง"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">คำอธิบายรายละเอียด *</label>
          <textarea
            id="description"
            name="description"
            placeholder="อธิบายปัญหาเพิ่มเติม"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">ตำแหน่งที่พบปัญหา *</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="เช่น แขวงวังทองหลาง"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reported_by">ชื่อผู้รายงาน *</label>
          <input
            id="reported_by"
            type="text"
            name="reported_by"
            placeholder="ชื่อของคุณ"
            value={formData.reported_by}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">สถานะ</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="reported">รายงานแล้ว</option>
            <option value="investigating">กำลังตรวจสอบ</option>
            <option value="resolved">แก้ไขแล้ว</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึกรายงาน'}
        </button>
      </form>
    </div>
  );
}
