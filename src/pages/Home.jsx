import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GitCommit, 
  Layers, 
  ListOrdered, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Database,
  Cpu,
  Workflow,
  Users,
  ShieldCheck
} from 'lucide-react';
import { teamMembers } from '../data/teamData';

export default function Home() {
  const learningOutcomes = [
    { title: "How data is stored", desc: "Linear vs priority ordered contiguous memory representation" },
    { title: "How insertion works", desc: "Push, Enqueue, and priority-sorted placement algorithms" },
    { title: "How deletion works", desc: "FIFO head eviction, LIFO top popping, and max-priority selection" },
    { title: "How elements are accessed", desc: "Controlled peek operations at strict architectural boundaries" },
    { title: "FIFO vs LIFO behavior", desc: "Observing real-time entry and exit order divergence" },
    { title: "Priority-based processing", desc: "Handling weighted priorities with stable tie-breaking" },
    { title: "Time complexity of operations", desc: "Big-O runtime analysis for memory and step efficiency" },
  ];

  const comparisonData = [
    {
      feature: "Principle",
      queue: "FIFO (First In, First Out)",
      stack: "LIFO (Last In, First Out)",
      pq: "Priority (Weighted Highest First)"
    },
    {
      feature: "Insert",
      queue: "Rear",
      stack: "Top",
      pq: "According to priority"
    },
    {
      feature: "Delete",
      queue: "Front",
      stack: "Top",
      pq: "Highest priority"
    },
    {
      feature: "Main operation",
      queue: "Enqueue",
      stack: "Push",
      pq: "Insert"
    },
    {
      feature: "Removal",
      queue: "Dequeue",
      stack: "Pop",
      pq: "Delete"
    },
    {
      feature: "Access",
      queue: "Front",
      stack: "Top",
      pq: "Highest priority"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Interactive Computer Science Laboratory</span>
        </div>
        <h1 className="hero-title">Data Structure Visualizer</h1>
        <p className="hero-subtitle">
          Understand data structures by seeing their operations in action.
        </p>
        <p className="hero-description">
          This interactive simulator demonstrates how Queue, Stack and Priority Queue work by visualizing their fundamental operations.
        </p>

        <div className="hero-cta-group">
          <Link to="/queue" className="btn btn-primary">
            Explore Queue <ArrowRight size={16} />
          </Link>
          <Link to="/stack" className="btn btn-secondary">
            Explore Stack
          </Link>
          <Link to="/priority-queue" className="btn btn-accent">
            Explore Priority Queue
          </Link>
        </div>
      </section>

      {/* 3 Main Data Structure Cards */}
      <section className="cards-section">
        <div className="cards-grid">
          {/* Card 1: FIFO Queue */}
          <div className="ds-card queue-card">
            <div className="ds-card-header">
              <div className="ds-icon-bubble queue-icon">
                <GitCommit size={26} />
              </div>
              <span className="ds-tag">Linear Structure</span>
            </div>
            <h2 className="ds-card-title">Queue — FIFO</h2>
            <div className="ds-card-desc-pill">First In, First Out</div>
            <p className="ds-card-explanation">
              The element inserted first is removed first. New elements enter from the rear, and removals occur from the front.
            </p>
            <div className="ds-card-example-box">
              <div className="example-label">Example Demonstration:</div>
              <div className="example-flow">"A → B → C"</div>
              <div className="example-result">
                Dequeue removes: <strong>"A"</strong>
              </div>
            </div>
            <Link to="/queue" className="btn-card-action">
              <span>Open Queue Simulator</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 2: LIFO Stack */}
          <div className="ds-card stack-card">
            <div className="ds-card-header">
              <div className="ds-icon-bubble stack-icon">
                <Layers size={26} />
              </div>
              <span className="ds-tag">Linear Structure</span>
            </div>
            <h2 className="ds-card-title">Stack — LIFO</h2>
            <div className="ds-card-desc-pill">Last In, First Out</div>
            <p className="ds-card-explanation">
              The element inserted last is removed first. Elements are pushed onto the top and popped from the top.
            </p>
            <div className="ds-card-example-box">
              <div className="example-label">Example Demonstration:</div>
              <div className="example-flow">Push: "A → B → C"</div>
              <div className="example-result">
                Pop removes: <strong>"C"</strong>
              </div>
            </div>
            <Link to="/stack" className="btn-card-action">
              <span>Open Stack Simulator</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 3: Priority Queue */}
          <div className="ds-card pq-card">
            <div className="ds-card-header">
              <div className="ds-icon-bubble pq-icon">
                <ListOrdered size={26} />
              </div>
              <span className="ds-tag">Priority Structure</span>
            </div>
            <h2 className="ds-card-title">Priority Queue</h2>
            <div className="ds-card-desc-pill">Elements are served according to priority</div>
            <p className="ds-card-explanation">
              The element with the highest priority is processed before lower-priority elements, with stable FIFO tie-breaking for equal priorities.
            </p>
            <div className="ds-card-example-box">
              <div className="example-label">Example Demonstration:</div>
              <div className="example-flow">"A (3), B (1), C (5)"</div>
              <div className="example-result">
                Highest priority: <strong>"C (5)"</strong>
              </div>
            </div>
            <Link to="/priority-queue" className="btn-card-action">
              <span>Open Priority Queue</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Diagram Section: Data Structure -> Operation -> Result */}
      <section className="diagram-section">
        <div className="section-header-center">
          <span className="section-badge">Algorithmic Lifecycle</span>
          <h2 className="section-title">Visual Execution Pipeline</h2>
          <p className="section-subtitle">
            Every operation transitions through a deterministic execution pipeline.
          </p>
        </div>

        <div className="pipeline-card">
          <div className="pipeline-step">
            <div className="pipeline-node node-ds">
              <Database size={24} />
              <span>Data Structure</span>
            </div>
            <p className="pipeline-note">Initial memory state & capacity</p>
          </div>

          <div className="pipeline-arrow">
            <div className="arrow-line"></div>
            <ArrowRight size={20} className="arrow-head" />
            <span className="arrow-label">Invokes</span>
          </div>

          <div className="pipeline-step">
            <div className="pipeline-node node-op">
              <Cpu size={24} />
              <span>Operation</span>
            </div>
            <p className="pipeline-note">Enqueue, Push, Pop, or Delete</p>
          </div>

          <div className="pipeline-arrow">
            <div className="arrow-line"></div>
            <ArrowRight size={20} className="arrow-head" />
            <span className="arrow-label">Produces</span>
          </div>

          <div className="pipeline-step">
            <div className="pipeline-node node-res">
              <Workflow size={24} />
              <span>Result</span>
            </div>
            <p className="pipeline-note">Updated structure, return value, or status</p>
          </div>
        </div>
      </section>

      {/* What will you learn section */}
      <section className="learn-section">
        <div className="section-header-center">
          <span className="section-badge">Curriculum Objectives</span>
          <h2 className="section-title">What will you learn?</h2>
          <p className="section-subtitle">
            Master fundamental computer science paradigms through interactive visual experimentation.
          </p>
        </div>

        <div className="learn-grid">
          {learningOutcomes.map((item, idx) => (
            <div key={idx} className="learn-item-card">
              <div className="learn-icon-check">
                <CheckCircle2 size={20} />
              </div>
              <div className="learn-text">
                <h4 className="learn-item-title">{item.title}</h4>
                <p className="learn-item-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section">
        <div className="section-header-center">
          <span className="section-badge">Structural Comparison</span>
          <h2 className="section-title">Core Characteristics Matrix</h2>
          <p className="section-subtitle">
            Quick reference comparing the behavioural rules and properties across Queue, Stack, and Priority Queue.
          </p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Queue</th>
                <th>Stack</th>
                <th>Priority Queue</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx}>
                  <td className="feature-cell">{row.feature}</td>
                  <td className="queue-cell">{row.queue}</td>
                  <td className="stack-cell">{row.stack}</td>
                  <td className="pq-cell">{row.pq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dedicated Group Members Section */}
      <section className="team-section" id="team">
        <div className="section-header-center">
          <div className="team-label-tag">
            <Users size={14} />
            <span>Project Team</span>
          </div>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Data Structures CCE Activity
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={member.rollNo} className="team-card">
              <div 
                className="team-avatar"
                style={{ backgroundColor: `${member.color}15`, color: member.color, borderColor: `${member.color}35` }}
              >
                <span className="avatar-initials">{member.initials}</span>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <div className="roll-badge">
                  <span>Roll No:</span>
                  <strong>{member.rollNo}</strong>
                </div>
              </div>
              <div className="card-subtle-indicator" style={{ backgroundColor: member.color }}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
