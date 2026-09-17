import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Trash2, 
  Eye, 
  HelpCircle, 
  PlusCircle, 
  MinusCircle, 
  Layers, 
  Users,
  Maximize2,
  Gauge
} from 'lucide-react';
import StatusPanel from '../components/StatusPanel';
import HistoryPanel from '../components/HistoryPanel';
import StepExplainer from '../components/StepExplainer';
import AlgorithmPanel from '../components/AlgorithmPanel';
import ComplexityCard from '../components/ComplexityCard';
import RealWorldExample from '../components/RealWorldExample';
import { queueAlgorithms } from '../data/algorithmsData';

export default function QueueSimulator() {
  const [queue, setQueue] = useState([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState('');
  const [capacity, setCapacity] = useState(10);
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Queue initialized with sample data (10, 20, 30, 40).',
    details: 'Front element is 10; Rear element is 40.'
  });
  const [history, setHistory] = useState([
    { id: 1, op: 'INIT', detail: 'Initialized queue [10, 20, 30, 40]', time: 'Just now', type: 'info' }
  ]);
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentOpTitle, setCurrentOpTitle] = useState('');
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [animatingType, setAnimatingType] = useState(null); // 'enqueue' | 'dequeue' | 'peek'

  const complexityOps = [
    { name: 'Enqueue (at Rear)', time: 'O(1)', space: 'O(1)' },
    { name: 'Dequeue (from Front)', time: 'O(1)', space: 'O(1)' },
    { name: 'Peek / Front', time: 'O(1)', space: 'O(1)' },
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

  // 1. Enqueue Operation
  const handleEnqueue = (e) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) {
      setStatus({
        type: 'warning',
        message: 'Please enter a value to enqueue.',
        details: 'Input cannot be empty.'
      });
      return;
    }

    if (queue.length >= capacity) {
      setStatus({
        type: 'error',
        message: 'Queue is full — cannot enqueue another element.',
        details: `Maximum capacity of ${capacity} reached (Queue Overflow).`
      });
      logOperation('Enqueue Failed', `Attempted to enqueue "${val}"`, 'Queue Overflow', 'error');
      if (stepMode) {
        setCurrentOpTitle(`Enqueue "${val}" [FAILED]`);
        setSteps([
          { title: 'Check Capacity', description: `Queue length (${queue.length}) equals capacity (${capacity}).`, state: 'isFull() == true' },
          { title: 'Abort Operation', description: 'Prevent insertion to avoid buffer overflow violation.', state: 'return false' }
        ]);
      }
      return;
    }

    // Perform enqueue
    const newQueue = [...queue, val];
    setAnimatingIndex(newQueue.length - 1);
    setAnimatingType('enqueue');
    setQueue(newQueue);
    setInputValue('');

    setStatus({
      type: 'success',
      message: `Successfully enqueued "${val}" at the REAR.`,
      details: `New size is ${newQueue.length} / ${capacity}. REAR is now "${val}".`
    });

    logOperation('Enqueue', `Enqueued "${val}"`, `Size: ${newQueue.length}`, 'success');

    if (stepMode) {
      setCurrentOpTitle(`Enqueue "${val}"`);
      setSteps([
        { title: 'Validate Space', description: `Checked queue capacity: ${queue.length} < ${capacity}. Space available.`, state: `isFull() == false` },
        { title: 'Insert at Rear', description: `Placed element "${val}" at index ${queue.length} (REAR).`, state: `queue[rear] = "${val}"` },
        { title: 'Update State', description: `The queue now contains [${newQueue.join(', ')}].`, state: `size = ${newQueue.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimatingType(null);
    }, 600);
  };

  // 2. Dequeue Operation
  const handleDequeue = () => {
    if (queue.length === 0) {
      setStatus({
        type: 'error',
        message: 'Queue is empty — cannot dequeue.',
        details: 'There are no elements remaining in the queue (Queue Underflow).'
      });
      logOperation('Dequeue Failed', 'Attempted to dequeue from empty queue', 'Queue Underflow', 'error');
      if (stepMode) {
        setCurrentOpTitle('Dequeue [FAILED]');
        setSteps([
          { title: 'Check Empty', description: 'Queue contains zero elements.', state: 'isEmpty() == true' },
          { title: 'Abort Operation', description: 'Underflow condition: cannot remove from an empty queue.', state: 'return null' }
        ]);
      }
      return;
    }

    const removedItem = queue[0];
    setAnimatingIndex(0);
    setAnimatingType('dequeue');

    setTimeout(() => {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setAnimatingIndex(null);
      setAnimatingType(null);

      setStatus({
        type: 'success',
        message: `Removed element: "${removedItem}" from the FRONT.`,
        details: newQueue.length > 0 
          ? `New FRONT element is "${newQueue[0]}". Current size: ${newQueue.length}.`
          : 'Queue is now empty.'
      });

      logOperation('Dequeue', `Removed "${removedItem}" from FRONT`, `Remaining: ${newQueue.length}`, 'info');

      if (stepMode) {
        setCurrentOpTitle(`Dequeue "${removedItem}"`);
        setSteps([
          { title: 'Access Front', description: `Identified element "${removedItem}" at index 0 (FRONT).`, state: `frontItem = "${removedItem}"` },
          { title: 'Remove Element', description: 'Extracted front item following First In, First Out principle.', state: `queue.shift()` },
          { title: 'Re-align Front Pointer', description: newQueue.length > 0 ? `Next item "${newQueue[0]}" is now at FRONT.` : 'Queue is now completely empty.', state: `size = ${newQueue.length}` }
        ]);
      }
    }, 450);
  };

  // 3. Peek / Front Operation
  const handlePeek = () => {
    if (queue.length === 0) {
      setStatus({
        type: 'warning',
        message: 'Queue is empty — nothing to peek.',
        details: 'Front pointer is unassigned.'
      });
      logOperation('Peek Failed', 'Attempted to peek empty queue', 'Empty', 'warning');
      return;
    }

    const frontItem = queue[0];
    setAnimatingIndex(0);
    setAnimatingType('peek');

    setStatus({
      type: 'info',
      message: `Front element: "${frontItem}"`,
      details: `The element currently at the FRONT (index 0) is "${frontItem}". It is next in line to be dequeued.`
    });

    logOperation('Peek', 'Inspected FRONT element', `"${frontItem}"`, 'info');

    if (stepMode) {
      setCurrentOpTitle(`Peek`);
      setSteps([
        { title: 'Inspect Front Slot', description: 'Read value at index 0 without modifying structure.', state: `return queue[0]` },
        { title: 'Observation', description: `Front element is "${frontItem}". Queue order remains strictly unchanged.`, state: `size = ${queue.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimatingType(null);
    }, 1200);
  };

  // 4. Is Empty Check
  const handleIsEmpty = () => {
    const empty = queue.length === 0;
    setStatus({
      type: empty ? 'info' : 'success',
      message: empty ? 'Queue is empty.' : `Queue is NOT empty (contains ${queue.length} elements).`,
      details: empty ? 'size == 0' : `FRONT is "${queue[0]}", REAR is "${queue[queue.length - 1]}".`
    });
    logOperation('IsEmpty', 'Checked if empty', empty ? 'true (Empty)' : `false (${queue.length} items)`, 'info');
  };

  // 5. Is Full Check
  const handleIsFull = () => {
    const full = queue.length >= capacity;
    setStatus({
      type: full ? 'warning' : 'info',
      message: full ? `Queue is full (${queue.length} / ${capacity}).` : `Queue has free capacity (${queue.length} / ${capacity} slots used).`,
      details: full ? 'No more elements can be enqueued.' : `${capacity - queue.length} slots remaining.`
    });
    logOperation('IsFull', 'Checked capacity status', full ? 'true (Full)' : `false (${capacity - queue.length} free)`, 'info');
  };

  // 6. Size Check
  const handleSize = () => {
    setStatus({
      type: 'info',
      message: `Current size: ${queue.length} / ${capacity}`,
      details: `The queue currently holds ${queue.length} elements out of a maximum capacity of ${capacity}.`
    });
    logOperation('Size', 'Queried element count', `${queue.length} elements`, 'info');
  };

  // 7. Clear Queue
  const handleClear = () => {
    if (queue.length === 0) {
      setStatus({
        type: 'info',
        message: 'Queue is already empty.',
        details: 'No elements to clear.'
      });
      return;
    }
    setQueue([]);
    setStatus({
      type: 'warning',
      message: 'Queue cleared completely.',
      details: 'All elements were removed. Capacity remains unchanged.'
    });
    logOperation('Clear', 'Removed all elements', 'Queue is now empty', 'warning');
    if (stepMode) {
      setCurrentOpTitle('Clear Queue');
      setSteps([
        { title: 'Reset Pointers', description: 'Front and rear indices reset to initial positions.', state: 'front = 0, rear = -1' },
        { title: 'Deallocate Elements', description: 'Memory buffer cleared.', state: 'queue = []' }
      ]);
    }
  };

  // 8. Reset Simulator
  const handleReset = () => {
    setQueue([10, 20, 30, 40]);
    setCapacity(10);
    setInputValue('');
    setStatus({
      type: 'info',
      message: 'Simulator reset to default state.',
      details: 'Queue restored with initial sample items [10, 20, 30, 40].'
    });
    setHistory([
      { id: Date.now(), op: 'RESET', detail: 'Reset simulator to initial state', time: 'Just now', type: 'info' }
    ]);
    setSteps([]);
    setCurrentOpTitle('');
  };

  // Handle capacity slider change
  const handleCapacityChange = (newCap) => {
    const num = Math.max(3, Math.min(20, parseInt(newCap) || 10));
    setCapacity(num);
    if (queue.length > num) {
      setQueue(queue.slice(0, num));
      setStatus({
        type: 'warning',
        message: `Capacity reduced to ${num}.`,
        details: `Queue was truncated to match new capacity.`
      });
    } else {
      setStatus({
        type: 'info',
        message: `Capacity updated to ${num}.`,
        details: `Slots available: ${num - queue.length}.`
      });
    }
  };

  return (
    <div className="simulator-page">
      {/* Top Breadcrumb & Header */}
      <div className="sim-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
        <div className="sim-title-group">
          <div className="badge-pill queue-badge">Linear Data Structure</div>
          <h1 className="sim-title">Queue Simulator</h1>
          <p className="sim-subtitle">FIFO — First In, First Out</p>
        </div>
      </div>

      {/* Main Simulator Layout Grid */}
      <div className="sim-grid">
        {/* Left Column: Visualizer + Controls */}
        <div className="sim-main-col">
          {/* Status Output Panel */}
          <StatusPanel status={status} />

          {/* Visualization Container Card */}
          <div className="card visualizer-card">
            <div className="card-header flex-between">
              <div className="flex-align gap-2">
                <Gauge size={18} className="text-primary" />
                <h3 className="card-title">Queue Visualization</h3>
              </div>
              <div className="capacity-badge-display">
                <span>Current Size:</span>
                <strong>{queue.length} / {capacity}</strong>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="capacity-meter">
              <div 
                className={`capacity-meter-fill ${queue.length >= capacity ? 'meter-full' : ''}`}
                style={{ width: `${(queue.length / capacity) * 100}%` }}
              ></div>
            </div>

            {/* Visual Queue Lane */}
            <div className="queue-lane-wrapper">
              <div className="queue-direction-bar">
                <span className="direction-tag front-tag">← DEQUEUE (Exit)</span>
                <span className="direction-label">FIFO Flow Direction</span>
                <span className="direction-tag rear-tag">ENQUEUE (Entry) ←</span>
              </div>

              <div className="queue-container">
                {/* FRONT Pointer Indicator */}
                <div className={`queue-pointer-label pointer-front ${queue.length === 0 ? 'disabled' : ''}`}>
                  <span className="pointer-title">FRONT</span>
                  <span className="pointer-arrow">↓</span>
                </div>

                {/* Queue Elements Display */}
                <div className="queue-slots-track">
                  {queue.length === 0 ? (
                    <div className="queue-empty-state">
                      <span>Queue is Empty (Underflow)</span>
                      <p>Use the Enqueue form below to insert elements at the REAR.</p>
                    </div>
                  ) : (
                    queue.map((item, index) => {
                      const isFront = index === 0;
                      const isRear = index === queue.length - 1;
                      const isAnimating = animatingIndex === index;

                      return (
                        <div
                          key={`${index}-${item}`}
                          className={`queue-node ${
                            isAnimating ? `node-anim-${animatingType}` : ''
                          } ${isFront ? 'is-front' : ''} ${isRear ? 'is-rear' : ''}`}
                        >
                          <div className="node-index">[{index}]</div>
                          <div className="node-value">{item}</div>
                          <div className="node-role-tag">
                            {isFront && isRear ? 'FRONT & REAR' : isFront ? 'FRONT' : isRear ? 'REAR' : 'ITEM'}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* REAR Pointer Indicator */}
                <div className={`queue-pointer-label pointer-rear ${queue.length === 0 ? 'disabled' : ''}`}>
                  <span className="pointer-arrow">↑</span>
                  <span className="pointer-title">REAR</span>
                </div>
              </div>

              {/* Textual Representation */}
              <div className="textual-representation">
                <span className="textual-label">Internal State:</span>
                <code>
                  FRONT → [{queue.join(', ')}] ← REAR
                </code>
              </div>
            </div>

            {/* Operation Controls */}
            <div className="sim-controls-section">
              {/* Enqueue Form */}
              <form onSubmit={handleEnqueue} className="control-row-form">
                <div className="input-group">
                  <label htmlFor="queue-input">Enter value:</label>
                  <input
                    id="queue-input"
                    type="text"
                    placeholder="e.g. 50 or Alex"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="sim-input"
                    disabled={queue.length >= capacity}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={queue.length >= capacity}
                >
                  <PlusCircle size={16} />
                  <span>Enqueue</span>
                </button>
              </form>

              {/* Primary Operation Action Buttons */}
              <div className="controls-button-grid">
                <button
                  onClick={handleDequeue}
                  disabled={queue.length === 0}
                  className="btn btn-secondary"
                  title="Remove front element (FIFO)"
                >
                  <MinusCircle size={16} />
                  <span>Dequeue</span>
                </button>

                <button
                  onClick={handlePeek}
                  disabled={queue.length === 0}
                  className="btn btn-outline"
                  title="Inspect front element without removing"
                >
                  <Eye size={16} />
                  <span>Peek / Front</span>
                </button>

                <button
                  onClick={handleIsEmpty}
                  className="btn btn-outline"
                  title="Check if size == 0"
                >
                  <span>Is Empty</span>
                </button>

                <button
                  onClick={handleIsFull}
                  className="btn btn-outline"
                  title="Check if capacity reached"
                >
                  <span>Is Full</span>
                </button>

                <button
                  onClick={handleSize}
                  className="btn btn-outline"
                  title="Query current number of elements"
                >
                  <span>Size</span>
                </button>

                <button
                  onClick={handleClear}
                  disabled={queue.length === 0}
                  className="btn btn-danger-outline"
                  title="Remove all elements"
                >
                  <Trash2 size={16} />
                  <span>Clear Queue</span>
                </button>
              </div>

              {/* Configurable Capacity & Reset Bar */}
              <div className="config-bar">
                <div className="capacity-slider-group">
                  <label htmlFor="cap-slider">
                    Max Capacity: <strong>{capacity}</strong>
                  </label>
                  <input
                    id="cap-slider"
                    type="range"
                    min="3"
                    max="20"
                    value={capacity}
                    onChange={(e) => handleCapacityChange(e.target.value)}
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

          {/* Educational Step-by-Step Mode */}
          <StepExplainer
            isEnabled={stepMode}
            onToggle={setStepMode}
            steps={steps}
            currentOpTitle={currentOpTitle}
          />

          {/* Collapsible Algorithms Pseudocode Section */}
          <AlgorithmPanel
            title="Queue Algorithms"
            algorithms={queueAlgorithms}
          />
        </div>

        {/* Right Column: History, Complexity, Analogy */}
        <div className="sim-side-col">
          {/* Real-world Example Card */}
          <RealWorldExample
            title="FIFO Queue"
            scenario="People waiting in a line"
            explanation="Just like customers queueing up at a ticket counter or cafe, the person who arrives first is served first and leaves first (FIFO). New arrivals join at the back of the queue (rear)."
            icon={Users}
          />

          {/* Complexity Table */}
          <ComplexityCard
            title="Queue Time Complexity"
            operations={complexityOps}
            note="Using array with efficient front/rear indexing provides O(1) constant time for all basic operations."
          />

          {/* Operation History */}
          <HistoryPanel
            history={history}
            onClearHistory={() => setHistory([])}
          />
        </div>
      </div>
    </div>
  );
}
