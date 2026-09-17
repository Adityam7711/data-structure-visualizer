import React from 'react';
import { History, Clock, ArrowRight, Trash2 } from 'lucide-react';

export default function HistoryPanel({ history, onClearHistory }) {
  return (
    <div className="card history-panel">
      <div className="card-header flex-between">
        <div className="flex-align gap-2">
          <History size={18} className="text-primary" />
          <h3 className="card-title">Operation History</h3>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="btn-ghost-sm"
            title="Clear history log"
          >
            <Trash2 size={14} />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-history">
            <Clock size={24} className="text-muted" />
            <p>No operations recorded yet. Perform an operation to see it logged here.</p>
          </div>
        ) : (
          history.slice(0, 15).map((entry, index) => (
            <div key={entry.id || index} className="history-item">
              <div className="history-item-top">
                <span className={`history-badge badge-${entry.type || 'info'}`}>
                  {entry.op}
                </span>
                <span className="history-time">{entry.time}</span>
              </div>
              <div className="history-detail">
                <span>{entry.detail}</span>
                {entry.result && (
                  <span className="history-result">
                    <ArrowRight size={12} /> {entry.result}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
