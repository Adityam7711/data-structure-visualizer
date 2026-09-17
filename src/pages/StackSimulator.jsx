import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trash2, 
  Eye, 
  Layers, 
  History as UndoIcon, 
  PlusCircle, 
  MinusCircle, 
  Gauge
} from 'lucide-react';
import StatusPanel from '../components/StatusPanel';
import HistoryPanel from '../components/HistoryPanel';
import StepExplainer from '../components/StepExplainer';
import AlgorithmPanel from '../components/AlgorithmPanel';
import ComplexityCard from '../components/ComplexityCard';
import RealWorldExample from '../components/RealWorldExample';
import { stackAlgorithms } from '../data/algorithmsData';

export default function StackSimulator() {
  // Stack stored with bottom element at index 0, top at last index
  // Displayed vertically with last index (TOP) rendered at the highest visual position
  const [stack, setStack] = useState([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState('');
  const [capacity, setCapacity] = useState(10);
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Stack initialized with sample elements [10, 20, 30, 40].',
    details: 'Top of stack is 40; Base/Bottom of stack is 10.'
  });
  const [history, setHistory] = useState([
    { id: 1, op: 'INIT', detail: 'Initialized stack with 4 items', time: 'Just now', type: 'info' }
  ]);
  const [stepMode, setStepMode] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentOpTitle, setCurrentOpTitle] = useState('');
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [animatingType, setAnimatingType] = useState(null); // 'push' | 'pop' | 'peek'

  const complexityOps = [
    { name: 'Push (at Top)', time: 'O(1)', space: 'O(1)' },
    { name: 'Pop (from Top)', time: 'O(1)', space: 'O(1)' },
    { name: 'Peek / Top', time: 'O(1)', space: 'O(1)' },
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

  // 1. Push Operation
  const handlePush = (e) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) {
      setStatus({
        type: 'warning',
        message: 'Please enter a value to push onto the stack.',
        details: 'Input cannot be blank.'
      });
      return;
    }

    if (stack.length >= capacity) {
      setStatus({
        type: 'error',
        message: 'Stack is full — cannot push another element.',
        details: `Maximum stack capacity of ${capacity} reached (Stack Overflow).`
      });
      logOperation('Push Failed', `Attempted push "${val}"`, 'Stack Overflow', 'error');
      if (stepMode) {
        setCurrentOpTitle(`Push "${val}" [OVERFLOW]`);
        setSteps([
          { title: 'Check Stack Bound', description: `Top index (${stack.length - 1}) == capacity - 1 (${capacity - 1}).`, state: 'isFull() == true' },
          { title: 'Reject Push', description: 'Operation aborted to prevent stack overflow.', state: 'return false' }
        ]);
      }
      return;
    }

    const newStack = [...stack, val];
    const newTopIdx = newStack.length - 1;
    setAnimatingIndex(newTopIdx);
    setAnimatingType('push');
    setStack(newStack);
    setInputValue('');

    setStatus({
      type: 'success',
      message: `Successfully pushed "${val}" onto the TOP of the stack.`,
      details: `Current size: ${newStack.length} / ${capacity}. Top element is now "${val}".`
    });

    logOperation('Push', `Pushed "${val}"`, `Top: ${val}`, 'success');

    if (stepMode) {
      setCurrentOpTitle(`Push "${val}"`);
      setSteps([
        { title: 'Verify Space', description: `Checked capacity constraint: ${stack.length} < ${capacity}. Space available.`, state: 'isFull() == false' },
        { title: 'Increment Top Pointer', description: `Incremented top pointer from index ${stack.length - 1} to index ${newTopIdx}.`, state: `top = top + 1` },
        { title: 'Place Element on Top', description: `Assigned value "${val}" at stack[top].`, state: `stack[top] = "${val}"` },
        { title: 'Resulting State', description: `The stack now holds ${newStack.length} elements with "${val}" at the TOP.`, state: `size = ${newStack.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimatingType(null);
    }, 600);
  };

  // 2. Pop Operation
  const handlePop = () => {
    if (stack.length === 0) {
      setStatus({
        type: 'error',
        message: 'Stack is empty — cannot pop.',
        details: 'Underflow condition: stack has no elements to remove.'
      });
      logOperation('Pop Failed', 'Attempted pop from empty stack', 'Stack Underflow', 'error');
      if (stepMode) {
        setCurrentOpTitle('Pop [UNDERFLOW]');
        setSteps([
          { title: 'Check Empty Condition', description: 'Top pointer is -1 (stack contains 0 elements).', state: 'isEmpty() == true' },
          { title: 'Reject Pop', description: 'Underflow triggered. No element available to pop.', state: 'return null' }
        ]);
      }
      return;
    }

    const topIdx = stack.length - 1;
    const poppedItem = stack[topIdx];
    setAnimatingIndex(topIdx);
    setAnimatingType('pop');

    setTimeout(() => {
      const newStack = stack.slice(0, -1);
      setStack(newStack);
      setAnimatingIndex(null);
      setAnimatingType(null);

      setStatus({
        type: 'success',
        message: `Popped element: "${poppedItem}" from the TOP of the stack.`,
        details: newStack.length > 0 
          ? `New TOP element is "${newStack[newStack.length - 1]}". Current size: ${newStack.length} / ${capacity}.`
          : 'Stack is now empty.'
      });

      logOperation('Pop', `Popped "${poppedItem}" from TOP`, `Remaining: ${newStack.length}`, 'info');

      if (stepMode) {
        setCurrentOpTitle(`Pop "${poppedItem}"`);
        setSteps([
          { title: 'Access Top Element', description: `Read element "${poppedItem}" from index ${topIdx} (TOP).`, state: `popped = stack[top]` },
          { title: 'Decrement Top Pointer', description: 'Decremented top pointer following Last In, First Out rule.', state: `top = top - 1` },
          { title: 'Stack Status', description: newStack.length > 0 ? `New top element is "${newStack[newStack.length - 1]}".` : 'Stack is empty.', state: `size = ${newStack.length}` }
        ]);
      }
    }, 450);
  };

  // 3. Peek / Top Operation
  const handlePeek = () => {
    if (stack.length === 0) {
      setStatus({
        type: 'warning',
        message: 'Stack is empty — nothing to peek.',
        details: 'Top index is -1.'
      });
      logOperation('Peek Failed', 'Attempted peek on empty stack', 'Empty', 'warning');
      return;
    }

    const topIdx = stack.length - 1;
    const topItem = stack[topIdx];
    setAnimatingIndex(topIdx);
    setAnimatingType('peek');

    setStatus({
      type: 'info',
      message: `Top element: "${topItem}"`,
      details: `The element at the TOP (index ${topIdx}) is "${topItem}". It is next in line to be popped.`
    });

    logOperation('Peek', 'Inspected TOP element', `"${topItem}"`, 'info');

    if (stepMode) {
      setCurrentOpTitle('Peek / Top');
      setSteps([
        { title: 'Query Top Position', description: `Inspected element at stack[top] (index ${topIdx}).`, state: `return stack[top]` },
        { title: 'Non-destructive Read', description: `Observed value "${topItem}". Stack remains entirely unmodified.`, state: `size = ${stack.length}` }
      ]);
    }

    setTimeout(() => {
      setAnimatingIndex(null);
      setAnimatingType(null);
    }, 1200);
  };

  // 4. Is Empty Check
  const handleIsEmpty = () => {
    const empty = stack.length === 0;
    setStatus({
      type: empty ? 'info' : 'success',
      message: empty ? 'Stack is empty.' : `Stack is NOT empty (contains ${stack.length} elements).`,
      details: empty ? 'top == -1' : `TOP element is "${stack[stack.length - 1]}", BOTTOM element is "${stack[0]}".`
    });
    logOperation('IsEmpty', 'Checked if empty', empty ? 'true (Empty)' : `false (${stack.length} items)`, 'info');
  };

  // 5. Is Full Check
  const handleIsFull = () => {
    const full = stack.length >= capacity;
    setStatus({
      type: full ? 'warning' : 'info',
      message: full ? `Stack is full (${stack.length} / ${capacity}).` : `Stack has free capacity (${stack.length} / ${capacity} slots used).`,
      details: full ? 'Stack overflow will occur if push is attempted.' : `${capacity - stack.length} slots remaining.`
    });
    logOperation('IsFull', 'Checked capacity limit', full ? 'true (Full)' : `false (${capacity - stack.length} slots free)`, 'info');
  };

  // 6. Size Check
  const handleSize = () => {
    setStatus({
      type: 'info',
      message: `Current size: ${stack.length} / ${capacity}`,
      details: `The stack contains ${stack.length} elements out of max capacity ${capacity}.`
    });
    logOperation('Size', 'Queried element count', `${stack.length} elements`, 'info');
  };

  // 7. Clear Stack
  const handleClear = () => {
    if (stack.length === 0) {
      setStatus({
        type: 'info',
        message: 'Stack is already empty.',
        details: 'No elements to clear.'
      });
      return;
    }
    setStack([]);
    setStatus({
      type: 'warning',
      message: 'Stack cleared completely.',
      details: 'All elements were popped. Capacity remains unchanged.'
    });
    logOperation('Clear', 'Cleared entire stack', 'Stack is empty', 'warning');
    if (stepMode) {
      setCurrentOpTitle('Clear Stack');
      setSteps([
        { title: 'Reset Top Pointer', description: 'Reset top index to -1.', state: 'top = -1' },
        { title: 'Clear Memory', description: 'All stack frames evacuated.', state: 'stack = []' }
      ]);
    }
  };

  // 8. Reset Simulator
  const handleReset = () => {
    setStack([10, 20, 30, 40]);
    setCapacity(10);
    setInputValue('');
    setStatus({
      type: 'info',
      message: 'Simulator reset to default state.',
      details: 'Stack restored with initial elements [10, 20, 30, 40].'
    });
    setHistory([
      { id: Date.now(), op: 'RESET', detail: 'Reset simulator to initial state', time: 'Just now', type: 'info' }
    ]);
    setSteps([]);
    setCurrentOpTitle('');
  };

  const handleCapacityChange = (newCap) => {
    const num = Math.max(3, Math.min(20, parseInt(newCap) || 10));
    setCapacity(num);
    if (stack.length > num) {
      setStack(stack.slice(0, num));
      setStatus({
        type: 'warning',
        message: `Capacity reduced to ${num}.`,
        details: `Stack truncated to match new capacity.`
      });
    } else {
      setStatus({
        type: 'info',
        message: `Capacity updated to ${num}.`,
        details: `Available slots: ${num - stack.length}.`
      });
    }
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
          <div className="badge-pill stack-badge">Linear Data Structure</div>
          <h1 className="sim-title">Stack Simulator</h1>
          <p className="sim-subtitle">LIFO — Last In, First Out</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="sim-grid">
        {/* Left Column: Visualizer + Controls */}
        <div className="sim-main-col">
          {/* Status Panel */}
          <StatusPanel status={status} />

          {/* Visualization Card */}
          <div className="card visualizer-card">
            <div className="card-header flex-between">
              <div className="flex-align gap-2">
                <Gauge size={18} className="text-primary" />
                <h3 className="card-title">Vertical Stack Visualization</h3>
              </div>
              <div className="capacity-badge-display">
                <span>Current Size:</span>
                <strong>{stack.length} / {capacity}</strong>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="capacity-meter">
              <div 
                className={`capacity-meter-fill ${stack.length >= capacity ? 'meter-full' : ''}`}
                style={{ width: `${(stack.length / capacity) * 100}%` }}
              ></div>
            </div>

            {/* Vertical Stack Representation */}
            <div className="stack-vertical-stage">
              {/* TOP Indicator */}
              <div className={`stack-pointer-label pointer-top ${stack.length === 0 ? 'disabled' : ''}`}>
                <span className="pointer-title">TOP</span>
                <span className="pointer-arrow">↓</span>
                <span className="pointer-sub">Newest Element</span>
              </div>

              {/* Physical Stack Box Container (Open Top, Solid Bottom) */}
              <div className="stack-chute-container">
                <div className="stack-items-column">
                  {stack.length === 0 ? (
                    <div className="stack-empty-state">
                      <span>Stack is Empty (Underflow)</span>
                      <p>Push an element to place it at the TOP.</p>
                    </div>
                  ) : (
                    // Render in reverse so top item appears at top of column
                    [...stack].map((item, originalIndex) => {
                      const isTop = originalIndex === stack.length - 1;
                      const isBottom = originalIndex === 0;
                      const isAnimating = animatingIndex === originalIndex;

                      return (
                        <div
                          key={`${originalIndex}-${item}`}
                          className={`stack-node ${
                            isAnimating ? `node-anim-${animatingType}` : ''
                          } ${isTop ? 'is-top' : ''} ${isBottom ? 'is-bottom' : ''}`}
                          style={{
                            // In a vertical flex container with flex-direction: column-reverse,
                            // elements naturally stack from bottom up
                            order: originalIndex
                          }}
                        >
                          <div className="stack-node-left">
                            <span className="node-index">Index [{originalIndex}]</span>
                            <span className="stack-node-value">{item}</span>
                          </div>
                          <div className="stack-node-role">
                            {isTop && isBottom ? 'TOP & BOTTOM' : isTop ? 'TOP' : isBottom ? 'BOTTOM' : 'STACK FRAME'}
                          </div>
                        </div>
                      );
                    }).reverse()
                  )}
                </div>

                {/* Bottom Base Plate */}
                <div className="stack-base-plate">
                  <span className="base-label">CLOSED BASE</span>
                </div>
              </div>

              {/* BOTTOM Indicator */}
              <div className={`stack-pointer-label pointer-bottom ${stack.length === 0 ? 'disabled' : ''}`}>
                <span className="pointer-arrow">↑</span>
                <span className="pointer-title">BOTTOM</span>
                <span className="pointer-sub">Oldest Element</span>
              </div>

              {/* Textual Representation */}
              <div className="textual-representation stack-textual">
                <span className="textual-label">Internal Stack State:</span>
                <code>
                  BOTTOM [ {stack.join(' | ')} ] TOP
                </code>
              </div>
            </div>

            {/* Stack Operations Controls */}
            <div className="sim-controls-section">
              {/* Push Form */}
              <form onSubmit={handlePush} className="control-row-form">
                <div className="input-group">
                  <label htmlFor="stack-input">Enter value:</label>
                  <input
                    id="stack-input"
                    type="text"
                    placeholder="e.g. 50 or URL"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="sim-input"
                    disabled={stack.length >= capacity}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={stack.length >= capacity}
                >
                  <PlusCircle size={16} />
                  <span>Push</span>
                </button>
              </form>

              {/* Operation Action Buttons */}
              <div className="controls-button-grid">
                <button
                  onClick={handlePop}
                  disabled={stack.length === 0}
                  className="btn btn-secondary"
                  title="Remove and return top element (LIFO)"
                >
                  <MinusCircle size={16} />
                  <span>Pop</span>
                </button>

                <button
                  onClick={handlePeek}
                  disabled={stack.length === 0}
                  className="btn btn-outline"
                  title="Inspect top element without removing"
                >
                  <Eye size={16} />
                  <span>Peek / Top</span>
                </button>

                <button
                  onClick={handleIsEmpty}
                  className="btn btn-outline"
                  title="Check whether stack is empty"
                >
                  <span>Is Empty</span>
                </button>

                <button
                  onClick={handleIsFull}
                  className="btn btn-outline"
                  title="Check whether stack capacity is reached"
                >
                  <span>Is Full</span>
                </button>

                <button
                  onClick={handleSize}
                  className="btn btn-outline"
                  title="Query number of elements"
                >
                  <span>Size</span>
                </button>

                <button
                  onClick={handleClear}
                  disabled={stack.length === 0}
                  className="btn btn-danger-outline"
                  title="Remove all elements"
                >
                  <Trash2 size={16} />
                  <span>Clear Stack</span>
                </button>
              </div>

              {/* Capacity Slider & Reset */}
              <div className="config-bar">
                <div className="capacity-slider-group">
                  <label htmlFor="stack-cap-slider">
                    Max Capacity: <strong>{capacity}</strong>
                  </label>
                  <input
                    id="stack-cap-slider"
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

          {/* Step-by-Step Mode */}
          <StepExplainer
            isEnabled={stepMode}
            onToggle={setStepMode}
            steps={steps}
            currentOpTitle={currentOpTitle}
          />

          {/* Collapsible Algorithms Pseudocode */}
          <AlgorithmPanel
            title="Stack Algorithms"
            algorithms={stackAlgorithms}
          />
        </div>

        {/* Right Column */}
        <div className="sim-side-col">
          {/* Real-world Example Card */}
          <RealWorldExample
            title="LIFO Stack"
            scenario="Undo operations / browser history"
            explanation="When typing in an editor or browsing pages, your most recent action is pushed to the top of the history stack. Clicking 'Undo' or 'Back' immediately pops that latest action off first (LIFO)."
            icon={UndoIcon}
          />

          {/* Complexity Table */}
          <ComplexityCard
            title="Stack Time Complexity"
            operations={complexityOps}
            note="Array implementation with top pointer provides strict O(1) constant time across all stack operations."
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
