import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Code } from 'lucide-react';

export default function AlgorithmPanel({ title, algorithms }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState(0);

  return (
    <div className="card algorithm-card">
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex-align gap-2">
          <BookOpen size={18} className="text-primary" />
          <h3 className="card-title">{title}</h3>
          <span className="badge-pill">{algorithms.length} Algorithms</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="accordion-content">
          <p className="algo-intro">
            Reference standard pseudocode implementations used to understand operations under the hood.
          </p>

          <div className="algo-tabs">
            {algorithms.map((algo, idx) => (
              <button
                key={algo.name}
                className={`algo-tab-btn ${selectedAlgo === idx ? 'active' : ''}`}
                onClick={() => setSelectedAlgo(idx)}
              >
                {algo.name}
              </button>
            ))}
          </div>

          {algorithms[selectedAlgo] && (
            <div className="algo-display">
              <div className="algo-info">
                <h4 className="algo-name">{algorithms[selectedAlgo].name}</h4>
                <p className="algo-desc">{algorithms[selectedAlgo].description}</p>
              </div>
              <div className="pseudocode-block">
                <div className="code-header">
                  <Code size={14} />
                  <span>Pseudocode</span>
                </div>
                <pre>
                  <code>{algorithms[selectedAlgo].pseudocode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
