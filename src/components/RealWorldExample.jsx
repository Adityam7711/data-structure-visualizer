import React from 'react';
import { Lightbulb, ExternalLink } from 'lucide-react';

export default function RealWorldExample({ title, scenario, explanation, icon: IconComponent }) {
  return (
    <div className="card real-world-card">
      <div className="card-header flex-align gap-2">
        <Lightbulb size={18} className="text-amber" />
        <h3 className="card-title">Real-World Analogy</h3>
        <span className="badge-pill badge-analogy">Educational Example</span>
      </div>
      <div className="real-world-body">
        <div className="analogy-header">
          {IconComponent && (
            <div className="analogy-icon-wrapper">
              <IconComponent size={22} />
            </div>
          )}
          <div>
            <h4 className="analogy-scenario">{scenario}</h4>
            <p className="analogy-note-tag">Concept: {title}</p>
          </div>
        </div>
        <p className="analogy-explanation">{explanation}</p>
        <div className="analogy-disclaimer">
          <span>* Note: This scenario illustrates the underlying access principle for learning purposes, rather than being an exact production system model.</span>
        </div>
      </div>
    </div>
  );
}
