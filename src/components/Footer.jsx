import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-icon-wrapper">
              <Code2 className="brand-icon" size={20} />
            </div>
            <div>
              <h4 className="footer-title">Data Structure Visualizer</h4>
              <p className="footer-desc">
                An interactive educational platform designed for the Data Structures Continuous Comprehensive Evaluation (CCE) activity.
              </p>
            </div>
          </div>
          <div className="footer-links">
            <span className="footer-heading">Simulators</span>
            <Link to="/queue">Queue (FIFO)</Link>
            <Link to="/stack">Stack (LIFO)</Link>
            <Link to="/priority-queue">Priority Queue</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-academic">
            <GraduationCap size={16} />
            <span>Computer Science & Engineering • Data Structures CCE Activity</span>
          </div>
          <div className="footer-copy">
            <span>Built with React & Vite for algorithmic learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
