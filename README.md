# Data Structure Visualizer — CCE Activity

A modern, interactive educational web application designed for a Data Structures Continuous Comprehensive Evaluation (CCE) activity.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Adityam7711/data-structure-visualizer)

## Live Preview & Deployment
- **GitHub Repository**: [https://github.com/Adityam7711/data-structure-visualizer](https://github.com/Adityam7711/data-structure-visualizer)
- **Deploy to Render (1-Click)**: [Deploy with Render](https://render.com/deploy?repo=https://github.com/Adityam7711/data-structure-visualizer)

## Features

- **Queue Simulator (FIFO)**:
  - Visual horizontal queue with dynamic `FRONT ↓` and `REAR ↑` pointers.
  - Enqueue with rear entrance animation, Dequeue with front exit animation, and Peek highlight.
  - Full boundary checks: Overflow (Is Full) and Underflow (Is Empty).
  - Dynamic capacity slider (3 to 20 elements).
  - Real-world analogy: People waiting in a ticket line.
  - Time complexity table ($O(1)$ operations) and collapsible pseudocode algorithms.

- **Stack Simulator (LIFO)**:
  - Visual vertical stack chute with `TOP ↓` and `BOTTOM ↑` indicators and solid base.
  - Push animation dropping elements from top, Pop animation lifting elements away, and Peek glowing pulse.
  - Full boundary checks (Stack Overflow and Underflow).
  - Current size display with capacity slider.
  - Real-world analogy: Undo operations & browser navigation history.
  - Time complexity table ($O(1)$ operations) and collapsible pseudocode algorithms.

- **Priority Queue Simulator**:
  - Educational distinction banner explaining how Priority Queue diverges from normal FIFO queues.
  - Clear priority rule: **Higher numerical value = higher priority** ($5 > 3 > 1$).
  - **Stable Priority Handling**: Equal priorities strictly preserve FIFO arrival order.
  - Visual item cards: `[Value: X | Priority: P]` with color-coded priority badges and `Highest Priority → Next to be Removed` indicator.
  - Explicit implementation note: Sorted array/list with $O(n)$ Insert and $O(1)$ Delete/Peek.
  - Real-world analogy: Hospital emergency triage & CPU interrupt scheduling.
  - One-click demo loader to immediately demonstrate stable tie-breaking: `A(3)`, `B(3)`, `C(5)` resulting in `C → A → B`.

- **Educational Step-by-Step Mode**:
  - Available across all three simulators.
  - Breaks down operations into granular algorithmic phases (e.g. Check Capacity → Scan/Insert → Update Pointer State).

- **Operation History**:
  - Live reverse-chronological log of every action, timestamp, and status.

- **Comparison Matrix & Pipeline Diagram**:
  - High-level overview on the Home page showing Principle, Insert, Delete, Main operation, Removal, and Access across structures.
  - Responsive layout for desktop, tablet, and mobile with hamburger navigation.

---

## Project Team

**Data Structures CCE Activity**

1. **Aditya Mhetre** — Roll No: 2141
2. **Kharanshu Pande** — Roll No: 2148
3. **Rohan Surywanshi** — Roll No: 2160
4. **Sarthak Varpe** — Roll No: 2165

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running

```bash
# Navigate to project directory
cd /home/alarion/.gemini/antigravity/scratch/data-structure-visualizer

# Start local Vite development server
npm run dev

# Or build for production
npm run build
npm run preview
```
