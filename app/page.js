'use client';

import { useState, useEffect } from 'react';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchIssues();
  }, [refreshTrigger]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/issues');
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลรายงาน');
      }
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleIssueDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main>
      <div className="container">
        <h1>ระบบจัดการปัญหาน้ำประปาไม่สะอาด</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'ปิดฟอร์ม' : 'รายงานปัญหาใหม่'}
          </button>
        </div>

        {showForm && (
          <IssueForm onSubmit={handleFormSubmit} />
        )}

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">กำลังโหลดข้อมูล...</div>
        ) : (
          <IssueList 
            issues={issues} 
            onIssueDeleted={handleIssueDeleted}
            onIssueUpdated={() => setRefreshTrigger(prev => prev + 1)}
          />
        )}
      </div>
    </main>
  );
}
