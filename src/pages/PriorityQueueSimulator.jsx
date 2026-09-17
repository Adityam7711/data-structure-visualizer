import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trash2, 
  Eye, 
  ListOrdered, 
  Activity, 
  PlusCircle, 
  MinusCircle, 
  Gauge, 
  AlertTriangle,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import StatusPanel from '../components/StatusPanel';
import HistoryPanel from '../components/HistoryPanel';
import StepExplainer from '../components/StepExplainer';
import AlgorithmPanel from '../components/AlgorithmPanel';
import ComplexityCard from '../components/ComplexityCard';
import RealWorldExample from '../components/RealWorldExample';
import { priorityQueueAlgorithms } from '../data/algorithmsData';

export default function PriorityQueueSimulator() {
  // Initial items maintained in priority order (descending by priority; stable for ties)
  const initialItems = [
    { id: '1', value: 'C', priority: 5, insertOrder: 3 },
    { id: '2', value: 'A', priority: 3, insertOrder: 1 },
    { id: '3', value: 'B', priority: 1, insertOrder: 2 },
  ];

  const [pq, setPq] = useState(initialItems);
  const [valInput, setValInput] = useState('');
  const [priInput, setPriInput] = useState('5');
  const [capacity, setCapacity] = useState(10);
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Priority Queue initialized with sample items [C(5), A(3), B(1)].',
    details: 'Elements are maintained in descending priority order. Higher value = higher priority.'
  });
  const [history, setHistory] = useState([
    { id: 1, op: 'INIT', detail: 'Initialized with [C: 5, A: 3, B: 1]', time: 'Just now', type: 'info' }
  ]);
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentOpTitle, setCurrentOpTitle] = useState('');
  const [animatingId, setAnimatingId] = useState(null);
  const [animatingType, setAnimatingType] = useState(null); // 'insert' | 'delete' | 'peek'

  const complexityOps = [
    { name: 'Insert (Sorted Array)', time: 'O(n)', space: 'O(1)' },
    { name: 'Delete / Dequeue (Head)', time: 'O(1)', space: 'O(1)' },
    { name: 'Peek (Head)', time: 'O(1)', space: 'O(1)' },
    { name: 'IsEmpty', time: 'O(1)', space: 'O(1)' },
    { name: 'IsFull', time: 'O(1)', space: 'O(1)' },
    { name: 'Size', time: 'O(1)', space: 'O(1)' }
  ];

  const logOperation = (op, detail, result, type = 'info') => {
    const newEntry = {
      id: Date.now() + Math.random(),
      op,
      detail,
      result,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  // Color helper according to priority level
  const getPriorityColorClass = (priority) => {
    if (priority >= 8) return 'pri-critical';
    if (priority >= 5) return 'pri-high';
    if (priority >= 3) return 'pri-medium';
    return 'pri-low';
  };

  // 1. Insert Operation (maintains descending priority order; preserves FIFO tie-breaking)
  const handleInsert = (e) => {
    if (e) e.preventDefault();
    const val = valInput.trim();
    const pri = parseInt(priInput, 10);

    if (!val) {
      setStatus({
        type: 'warning',
        message: 'Please enter a value to insert.',
        details: 'Value field cannot be empty.'
      });
      return;
    }

    if (isNaN(pri)) {
      setStatus({
        type: 'warning',
        message: 'Please enter a valid integer priority.',
        details: 'Priority must be a numeric integer.'
      });
      return;
    }

    if (pq.length >= capacity) {
      setStatus({
        type: 'error',
        message: 'Priority Queue is full — cannot insert another element.',
        details: `Maximum capacity of ${capacity} reached.`
      });
      logOperation('Insert Failed', `Tried inserting "${val}" (Pri: ${pri})`, 'Capacity Limit', 'error');
      if (stepMode) {
        setCurrentOpTitle(`Insert [${val} | Pri: ${pri}] [FAILED]`);
        setSteps([
          { title: 'Check Capacity', description: `Current size ${pq.length} == capacity ${capacity}.`, state: 'isFull() == true' },
          { title: 'Reject Insert', description: 'Prevent insertion to stay within buffer limits.', state: 'return false' }
        ]);
      }
      return;
    }

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      value: val,
      priority: pri,
      insertOrder: Date.now()
    };

    // Find insertion index:
    // Elements sorted descending by priority.
    // For elements with equal priority, we preserve insertion order (FIFO tie-breaking: insert after existing items with >= priority).
    let targetIndex = 0;
    while (targetIndex < pq.length && pq[targetIndex].priority >= pri) {
      targetIndex++;
    }

    const newPq = [...pq];
    newPq.splice(targetIndex, 0, newItem);

    setAnimatingId(newItem.id);
    setAnimatingType('insert');
    setPq(newPq);
    setValInput('');

    setStatus({
      type: 'success',
      message: `Successfully inserted [${val} | Priority: ${pri}] at position ${targetIndex}.`,
      details: targetIndex === 0 
        ? `This item now has the HIGHEST priority in the queue!`
        : `Placed behind ${targetIndex} higher/equal priority element(s).`
    });

    logOperation('Insert', `[${val} | Pri: ${pri}]`, `Pos: ${targetIndex}, Size: ${newPq.length}`, 'success');

    if (stepMode) {
      setCurrentOpTitle(`Insert [${val} | Priority: ${pri}]`);
      setSteps([
        { title: 'Scan Priority Slots', description: `Scanned array from left to find insertion position for priority ${pri}.`, state: `scanIndex = ${targetIndex}` },
        { title: 'Preserve Stability', description: `Items with priority >= ${pri} remain ahead; items with priority < ${pri} are shifted right.`, state: `splice(${targetIndex}, 0, newItem)` },
        { title: 'Structure Updated', description: `Item inserted at index ${targetIndex}. Queue now has ${newPq.length} items.`, state: `size = ${newPq.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingId(null);
      setAnimatingType(null);
    }, 600);
  };

  // 2. Delete / Dequeue (Highest Priority)
  const handleDelete = () => {
    if (pq.length === 0) {
      setStatus({
        type: 'error',
        message: 'Priority Queue is empty — cannot delete.',
        details: 'No elements available to process.'
      });
      logOperation('Delete Failed', 'Attempted delete on empty priority queue', 'Underflow', 'error');
      if (stepMode) {
        setCurrentOpTitle('Delete [FAILED]');
        setSteps([
          { title: 'Check Empty', description: 'Queue contains 0 elements.', state: 'isEmpty() == true' },
          { title: 'Underflow', description: 'Cannot delete from empty priority queue.', state: 'return null' }
        ]);
      }
      return;
    }

    const removedItem = pq[0];
    setAnimatingId(removedItem.id);
    setAnimatingType('delete');

    setTimeout(() => {
      const newPq = pq.slice(1);
      setPq(newPq);
      setAnimatingId(null);
      setAnimatingType(null);

      setStatus({
        type: 'success',
        message: `Removed highest-priority element: [${removedItem.value} | Priority: ${removedItem.priority}].`,
        details: newPq.length > 0 
          ? `Next highest priority element is now [${newPq[0].value} | Priority: ${newPq[0].priority}].`
          : 'Priority queue is now empty.'
      });

      logOperation('Delete', `Removed [${removedItem.value} | Pri: ${removedItem.priority}]`, `Remaining: ${newPq.length}`, 'info');

      if (stepMode) {
        setCurrentOpTitle(`Delete [${removedItem.value} | Pri: ${removedItem.priority}]`);
        setSteps([
          { title: 'Access Head Element', description: `In sorted array, index 0 is guaranteed to hold the highest priority element.`, state: `highest = pq[0]` },
          { title: 'Extract Element', description: `Removed [${removedItem.value} | Priority: ${removedItem.priority}] from head in O(1) step.`, state: `pq.shift()` },
          { title: 'Updated Head', description: newPq.length > 0 ? `Next in line is [${newPq[0].value} | Priority: ${newPq[0].priority}].` : 'Queue is now empty.', state: `size = ${newPq.length}` }
        ]);
      }
    }, 450);
  };

  // 3. Peek Operation
  const handlePeek = () => {
    if (pq.length === 0) {
      setStatus({
        type: 'warning',
        message: 'Priority Queue is empty — nothing to peek.',
        details: 'No elements available.'
      });
      logOperation('Peek Failed', 'Attempted peek on empty PQ', 'Empty', 'warning');
      return;
    }

    const highest = pq[0];
    setAnimatingId(highest.id);
    setAnimatingType('peek');

    setStatus({
      type: 'info',
      message: `Highest priority element: [${highest.value} | Priority: ${highest.priority}]`,
      details: `This element currently holds the maximum priority (${highest.priority}) and will be the next one deleted/processed.`
    });

    logOperation('Peek', `Highest is [${highest.value} | Pri: ${highest.priority}]`, `Next to be removed`, 'info');

    if (stepMode) {
      setCurrentOpTitle('Peek Highest Priority');
      setSteps([
        { title: 'Inspect Head Item', description: 'Read index 0 without modifying the array.', state: `return pq[0]` },
        { title: 'Observation', description: `[${highest.value} | Priority: ${highest.priority}] is at the head. Queue state intact.`, state: `size = ${pq.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingId(null);
      setAnimatingType(null);
    }, 1200);
  };

  // 4. Is Empty Check
  const handleIsEmpty = () => {
    const empty = pq.length === 0;
    setStatus({
      type: empty ? 'info' : 'success',
      message: empty ? 'Priority Queue is empty.' : `Priority Queue is NOT empty (contains ${pq.length} elements).`,
      details: empty ? 'length == 0' : `Highest priority element is [${pq[0].value} | Priority: ${pq[0].priority}].`
    });
    logOperation('IsEmpty', 'Checked empty state', empty ? 'true (Empty)' : `false (${pq.length} items)`, 'info');
  };

  // 5. Is Full Check
  const handleIsFull = () => {
    const full = pq.length >= capacity;
    setStatus({
      type: full ? 'warning' : 'info',
      message: full ? `Priority Queue is full (${pq.length} / ${capacity}).` : `Priority Queue has space (${pq.length} / ${capacity} used).`,
      details: full ? 'No more items can be inserted.' : `${capacity - pq.length} slots remaining.`
    });
    logOperation('IsFull', 'Checked capacity', full ? 'true (Full)' : `false (${capacity - pq.length} free)`, 'info');
  };

  // 6. Size Check
  const handleSize = () => {
    setStatus({
      type: 'info',
      message: `Current size: ${pq.length} / ${capacity}`,
      details: `The priority queue holds ${pq.length} items.`
    });
    logOperation('Size', 'Queried size', `${pq.length} items`, 'info');
  };

  // 7. Clear
  const handleClear = () => {
    if (pq.length === 0) {
      setStatus({
        type: 'info',
        message: 'Priority Queue is already empty.',
        details: 'Nothing to clear.'
      });
      return;
    }
    setPq([]);
    setStatus({
      type: 'warning',
      message: 'Priority Queue cleared completely.',
      details: 'All items removed.'
    });
    logOperation('Clear', 'Cleared priority queue', 'Empty', 'warning');
    if (stepMode) {
      setCurrentOpTitle('Clear');
      setSteps([
        { title: 'Purge Elements', description: 'Deallocated all items from internal sorted list.', state: 'pq = []' }
      ]);
    }
  };

  // 8. Reset Simulator
  const handleReset = () => {
    setPq(initialItems);
    setCapacity(10);
    setValInput('');
    setPriInput('5');
    setStatus({
      type: 'info',
      message: 'Simulator reset to default state.',
      details: 'Restored initial items [C(5), A(3), B(1)].'
    });
    setHistory([
      { id: Date.now(), op: 'RESET', detail: 'Reset simulator to default state', time: 'Just now', type: 'info' }
    ]);
    setSteps([]);
    setCurrentOpTitle('');
  };

  // Preset demo loader for quick presentation testing
  const loadPresetDemo = () => {
    const demo = [
      { id: 'd1', value: 'A', priority: 3, insertOrder: 1 },
      { id: 'd2', value: 'B', priority: 3, insertOrder: 2 },
      { id: 'd3', value: 'C', priority: 5, insertOrder: 3 },
    ];
    // Sort descending by priority, stable for equal priority
    const sorted = [...demo].sort((a, b) => b.priority - a.priority || a.insertOrder - b.insertOrder);
    setPq(sorted);
    setStatus({
      type: 'success',
      message: 'Loaded Stable Tie-Breaking Preset: A(3), B(3), C(5).',
      details: 'Resulting order: C(5) → A(3) → B(3). Notice A was inserted before B and stays ahead of B!'
    });
    logOperation('Preset Loaded', 'A(3), B(3), C(5)', 'C(5) → A(3) → B(3)', 'success');
  };

  return (
    <div className="simulator-page">
      {/* Top Header */}
      <div className="sim-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
        <div className="sim-title-group">
          <div className="badge-pill pq-badge">Priority-Based Structure</div>
          <h1 className="sim-title">Priority Queue Simulator</h1>
          <p className="sim-subtitle">Elements are processed according to priority.</p>
        </div>
      </div>

      {/* Distinction Banner */}
      <div className="pq-distinction-banner">
        <div className="distinction-icon">
          <Sparkles size={20} />
        </div>
        <div className="distinction-content">
          <h4>How does Priority Queue differ from a normal FIFO Queue?</h4>
          <p>
            In a standard Queue, items leave strictly in arrival order (FIFO). In a <strong>Priority Queue</strong>, every element is assigned an explicit <strong>priority weight</strong>. High-priority elements jump ahead and are served first regardless of when they arrived. If two elements have equal priority, their original insertion order is preserved (<strong>Stable Priority Handling</strong>).
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="sim-grid">
        {/* Left Column */}
        <div className="sim-main-col">
          {/* Status Panel */}
          <StatusPanel status={status} />

          {/* Visualization Card */}
          <div className="card visualizer-card">
            <div className="card-header flex-between">
              <div className="flex-align gap-2">
                <Gauge size={18} className="text-primary" />
                <h3 className="card-title">Priority Queue Visualization</h3>
              </div>
              <div className="flex-align gap-2">
                <button onClick={loadPresetDemo} className="btn-ghost-sm" title="Load sample tie-breaking demo">
                  <Sparkles size={14} />
                  <span>Load Stable Tie Demo</span>
                </button>
                <div className="capacity-badge-display">
                  <span>Current Size:</span>
                  <strong>{pq.length} / {capacity}</strong>
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="capacity-meter">
              <div 
                className={`capacity-meter-fill ${pq.length >= capacity ? 'meter-full' : ''}`}
                style={{ width: `${(pq.length / capacity) * 100}%` }}
              ></div>
            </div>

            {/* Priority Rule Indicator Card */}
            <div className="priority-rule-bar">
              <div className="rule-badge">
                <Flame size={14} />
                <span>Priority Rule:</span>
              </div>
              <span className="rule-text">
                <strong>Higher numerical value = higher priority</strong> (e.g. Priority 5 &gt; Priority 3 &gt; Priority 1).
              </span>
            </div>

            {/* Visual Priority Queue Lane */}
            <div className="pq-lane-wrapper">
              <div className="pq-indicator-banner">
                <span className="pq-next-tag">
                  ★ Highest Priority → Next to be Removed
                </span>
                <span className="pq-order-tag">
                  Descending Priority Order (Left to Right)
                </span>
              </div>

              <div className="pq-elements-track">
                {pq.length === 0 ? (
                  <div className="pq-empty-state">
                    <span>Priority Queue is Empty</span>
                    <p>Insert a value and priority to populate the priority queue.</p>
                  </div>
                ) : (
                  pq.map((item, index) => {
                    const isHighest = index === 0;
                    const isAnimating = animatingId === item.id;
                    const colorClass = getPriorityColorClass(item.priority);

                    return (
                      <div
                        key={item.id}
                        className={`pq-card-node ${colorClass} ${
                          isAnimating ? `node-anim-${animatingType}` : ''
                        } ${isHighest ? 'is-highest-priority' : ''}`}
                      >
                        {isHighest && (
                          <div className="highest-crown-badge">
                            <span>NEXT REMOVED</span>
                          </div>
                        )}

                        <div className="pq-node-header">
                          <span className="pq-slot-index">Pos [{index}]</span>
                          <span className="pq-pri-badge">
                            Pri: <strong>{item.priority}</strong>
                          </span>
                        </div>

                        <div className="pq-node-body">
                          <span className="pq-node-val-label">Value:</span>
                          <span className="pq-node-value">{item.value}</span>
                        </div>

                        <div className="pq-node-footer">
                          <code>[{item.value} | Priority: {item.priority}]</code>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Textual Representation */}
              <div className="textual-representation">
                <span className="textual-label">Current Queue Order:</span>
                <code>
                  {pq.length === 0 
                    ? '[ Empty ]' 
                    : pq.map(item => `[${item.value} | Pri: ${item.priority}]`).join(' → ')
                  }
                </code>
              </div>
            </div>

            {/* Input Form & Operations */}
            <div className="sim-controls-section">
              {/* Insert Form with Value and Priority */}
              <form onSubmit={handleInsert} className="control-row-form pq-form">
                <div className="input-group">
                  <label htmlFor="pq-val">Value:</label>
                  <input
                    id="pq-val"
                    type="text"
                    placeholder="e.g. A or Patient"
                    value={valInput}
                    onChange={(e) => setValInput(e.target.value)}
                    className="sim-input"
                    disabled={pq.length >= capacity}
                  />
                </div>

                <div className="input-group pri-group">
                  <label htmlFor="pq-pri">Priority (Number):</label>
                  <input
                    id="pq-pri"
                    type="number"
                    placeholder="e.g. 5"
                    value={priInput}
                    onChange={(e) => setPriInput(e.target.value)}
                    className="sim-input pri-input"
                    disabled={pq.length >= capacity}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pq.length >= capacity}
                >
                  <PlusCircle size={16} />
                  <span>Insert</span>
                </button>
              </form>

              {/* Operation Buttons */}
              <div className="controls-button-grid">
                <button
                  onClick={handleDelete}
                  disabled={pq.length === 0}
                  className="btn btn-secondary"
                  title="Remove highest priority element"
                >
                  <MinusCircle size={16} />
                  <span>Delete / Dequeue (Highest Priority)</span>
                </button>

                <button
                  onClick={handlePeek}
                  disabled={pq.length === 0}
                  className="btn btn-outline"
                  title="Peek highest priority element"
                >
                  <Eye size={16} />
                  <span>Peek (Highest)</span>
                </button>

                <button
                  onClick={handleIsEmpty}
                  className="btn btn-outline"
                  title="Check if empty"
                >
                  <span>Is Empty</span>
                </button>

                <button
                  onClick={handleIsFull}
                  className="btn btn-outline"
                  title="Check if full"
                >
                  <span>Is Full</span>
                </button>

                <button
                  onClick={handleSize}
                  className="btn btn-outline"
                  title="Query size"
                >
                  <span>Size</span>
                </button>

                <button
                  onClick={handleClear}
                  disabled={pq.length === 0}
                  className="btn btn-danger-outline"
                  title="Clear all items"
                >
                  <Trash2 size={16} />
                  <span>Clear</span>
                </button>
              </div>

              {/* Capacity Slider & Reset */}
              <div className="config-bar">
                <div className="capacity-slider-group">
                  <label htmlFor="pq-cap-slider">
                    Max Capacity: <strong>{capacity}</strong>
                  </label>
                  <input
                    id="pq-cap-slider"
                    type="range"
                    min="3"
                    max="20"
                    value={capacity}
                    onChange={(e) => {
                      const num = Math.max(3, Math.min(20, parseInt(e.target.value) || 10));
                      setCapacity(num);
                      if (pq.length > num) setPq(pq.slice(0, num));
                    }}
                    className="range-slider"
                  />
                  <span className="slider-range-hint">(3 – 20)</span>
                </div>

                <button onClick={handleReset} className="btn btn-reset">
                  <RotateCcw size={15} />
                  <span>Reset Simulator</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step-by-Step Mode */}
          <StepExplainer
            isEnabled={stepMode}
            onToggle={setStepMode}
            steps={steps}
            currentOpTitle={currentOpTitle}
          />

          {/* Pseudocode Panel */}
          <AlgorithmPanel
            title="Priority Queue Algorithms"
            algorithms={priorityQueueAlgorithms}
          />
        </div>

        {/* Right Column */}
        <div className="sim-side-col">
          {/* Real-world Example Card */}
          <RealWorldExample
            title="Priority Queue"
            scenario="Hospital emergency triage / CPU scheduling"
            explanation="In a hospital emergency room, a critical patient with acute trauma (Priority 9) is treated before a patient with a minor sprain (Priority 2), even if the sprain patient arrived earlier. Similarly, an operating system schedules high-priority hardware interrupts ahead of background tasks."
            icon={Activity}
          />

          {/* Complexity Table */}
          <ComplexityCard
            title="Priority Queue Time Complexity"
            operations={complexityOps}
            note="Explicit Implementation Note: Implemented using an array/list maintained in sorted priority order. Insertion requires finding the position and shifting elements (O(n)), while Delete and Peek are instantaneous (O(1)). Heap-based implementations offer O(log n) insertion."
          />

          {/* History */}
          <HistoryPanel
            history={history}
            onClearHistory={() => setHistory([])}
          />
        </div>
      </div>
    </div>
  );
}
