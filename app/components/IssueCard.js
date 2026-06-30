'use client';

import { useState } from 'react';
import IssueEdit from './IssueEdit';

export default function IssueCard({ issue, onDeleted, onUpdated }) {
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'ไม่ระบุ';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const handleDelete = async () => {
    if (!confirm('ต้องการลบรายงานนี้ใช่หรือไม่?')) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/issues/${issue.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถลบรายงาน');
      }

      onDeleted();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (showEdit) {
    return (
      <div className="card">
        <IssueEdit 
          issue={issue}
          onCancel={() => setShowEdit(false)}
          onUpdated={() => {
            setShowEdit(false);
            onUpdated();
          }}
        />
      </div>
    );
  }

  return (
    <div className="card">
      {error && <div className="error">{error}</div>}
      
      <div className="card-header">
        <div className="card-title">{issue.title}</div>
        <span className={`status-badge ${getStatusClass(issue.status)}`}>
          {issue.status === 'reported' && 'รายงานแล้ว'}
          {issue.status === 'investigating' && 'กำลังตรวจสอบ'}
          {issue.status === 'resolved' && 'แก้ไขแล้ว'}
        </span>
      </div>

      <div className="info-row">
        <div className="info-label">รายละเอียด:</div>
        <div className="info-value">{issue.description}</div>
      </div>

      <div className="info-row">
        <div className="info-label">ตำแหน่ง:</div>
        <div className="info-value">{issue.location}</div>
      </div>

      <div className="info-row">
        <div className="info-label">ผู้รายงาน:</div>
        <div className="info-value">{issue.reported_by}</div>
      </div>

      <div className="info-row">
        <div className="info-label">วันที่สร้าง:</div>
        <div className="info-value">{formatDate(issue.created_at)}</div>
      </div>

      <div className="info-row">
        <div className="info-label">แก้ไขล่าสุด:</div>
        <div className="info-value">{formatDate(issue.updated_at)}</div>
      </div>

      <div className="button-group">
        <button 
          className="btn btn-primary btn-small"
          onClick={() => setShowEdit(true)}
        >
          แก้ไข
        </button>
        <button 
          className="btn btn-danger btn-small"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'กำลังลบ...' : 'ลบ'}
        </button>
      </div>
    </div>
  );
}
