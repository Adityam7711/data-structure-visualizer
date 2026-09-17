import React from 'react';
import { Activity, Info } from 'lucide-react';

export default function ComplexityCard({ title = "Time Complexity", operations = [], note }) {
  return (
    <div className="card complexity-card">
      <div className="card-header flex-align gap-2">
        <Activity size={18} className="text-primary" />
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="complexity-table-wrapper">
        <table className="complexity-table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op, idx) => (
              <tr key={idx}>
                <td className="op-name">{op.name}</td>
                <td className="op-time">
                  <span className={`complexity-badge ${op.time === 'O(1)' ? 'constant' : 'linear'}`}>
                    {op.time}
                  </span>
                </td>
                <td className="op-space">
                  <span className="complexity-badge constant">{op.space || 'O(1)'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <div className="complexity-note">
          <Info size={14} className="text-info" />
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}
