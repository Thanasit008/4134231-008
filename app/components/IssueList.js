'use client';

import { useState } from 'react';
import IssueCard from './IssueCard';

export default function IssueList({ issues, onIssueDeleted, onIssueUpdated }) {
  if (issues.length === 0) {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '40px 0' }}>
          ไม่มีรายงานปัญหา
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>รายงานปัญหาที่บันทึก ({issues.length})</h2>
      <div className="issues-grid">
        {issues.map(issue => (
          <IssueCard 
            key={issue.id} 
            issue={issue}
            onDeleted={onIssueDeleted}
            onUpdated={onIssueUpdated}
          />
        ))}
      </div>
    </div>
  );
}
