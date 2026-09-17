import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function StatusPanel({ status }) {
  if (!status || !status.message) return null;

  const { type = 'info', message, details } = status;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="status-icon success" size={20} />;
      case 'error':
        return <AlertCircle className="status-icon error" size={20} />;
      case 'warning':
        return <AlertTriangle className="status-icon warning" size={20} />;
      default:
        return <Info className="status-icon info" size={20} />;
    }
  };

  return (
    <div className={`status-panel status-${type}`}>
      <div className="status-header">
        {getIcon()}
        <span className="status-message">{message}</span>
      </div>
      {details && <p className="status-details">{details}</p>}
    </div>
  );
}
