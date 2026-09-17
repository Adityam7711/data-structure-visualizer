import React from 'react';
import { HelpCircle, CheckCircle, ChevronRight } from 'lucide-react';

export default function StepExplainer({ isEnabled, onToggle, steps = [], currentOpTitle }) {
  return (
    <div className={`step-explainer-card ${isEnabled ? 'active' : ''}`}>
      <div className="step-explainer-header flex-between">
        <div className="flex-align gap-2">
          <HelpCircle size={18} className={isEnabled ? 'text-primary' : 'text-muted'} />
          <div>
            <h4 className="step-explainer-title">Step-by-Step Educational Mode</h4>
            <p className="step-explainer-subtitle">
              {isEnabled
                ? 'Detailed algorithmic explanation of the current operation'
                : 'Enable to view granular step breakdowns suitable for CCE presentations'}
            </p>
          </div>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      {isEnabled && (
        <div className="step-breakdown-content">
          {currentOpTitle && (
            <div className="step-op-title">
              <span>Current Execution:</span> <strong>{currentOpTitle}</strong>
            </div>
          )}

          {steps.length > 0 ? (
            <div className="steps-timeline">
              {steps.map((step, idx) => (
                <div key={idx} className="timeline-step">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-body">
                    <h5 className="step-headline">{step.title}</h5>
                    <p className="step-desc">{step.description}</p>
                    {step.state && (
                      <div className="step-state-code">
                        <code>{step.state}</code>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-steps-yet">
              <ChevronRight size={18} className="text-muted" />
              <span>Perform an operation (e.g., Push/Enqueue/Insert) to inspect the algorithmic step-by-step breakdown.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
