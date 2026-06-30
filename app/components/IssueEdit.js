'use client';

import { useState } from 'react';

export default function IssueEdit({ issue, onCancel, onUpdated }) {
  const [formData, setFormData] = useState({
    title: issue.title,
    description: issue.description,
    location: issue.location,
    reported_by: issue.reported_by,
    status: issue.status
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
      const response = await fetch(`/api/issues/${issue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ไม่สามารถแก้ไขรายงาน');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onUpdated();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>แก้ไขรายงานปัญหา</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">อัปเดตรายงานสำเร็จ!</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">หัวข้อปัญหา *</label>
          <input
            id="title"
            type="text"
            name="title"
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

        <div className="button-group">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'กำลังอัปเดต...' : 'บันทึกการแก้ไข'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
