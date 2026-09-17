export const queueAlgorithms = [
  {
    name: "Enqueue",
    description: "Inserts a new element at the REAR of the queue.",
    pseudocode: `function ENQUEUE(queue, value, capacity):
    if IS_FULL(queue, capacity):
        print "Error: Queue is full (Overflow)"
        return false
    rear = rear + 1
    queue[rear] = value
    size = size + 1
    return true`
  },
  {
    name: "Dequeue",
    description: "Removes and returns the element from the FRONT of the queue.",
    pseudocode: `function DEQUEUE(queue):
    if IS_EMPTY(queue):
        print "Error: Queue is empty (Underflow)"
        return null
    removedItem = queue[front]
    front = front + 1
    size = size - 1
    return removedItem`
  },
  {
    name: "Peek / Front",
    description: "Retrieves the element currently at the FRONT without removing it.",
    pseudocode: `function PEEK(queue):
    if IS_EMPTY(queue):
        print "Queue is empty"
        return null
    return queue[front]`
  },
  {
    name: "IsEmpty",
    description: "Checks whether the queue contains zero elements.",
    pseudocode: `function IS_EMPTY(queue):
    return size == 0`
  },
  {
    name: "IsFull",
    description: "Checks whether the queue has reached its maximum capacity.",
    pseudocode: `function IS_FULL(queue, capacity):
    return size >= capacity`
  }
];

export const stackAlgorithms = [
  {
    name: "Push",
    description: "Adds a new element onto the TOP of the stack.",
    pseudocode: `function PUSH(stack, value, capacity):
    if IS_FULL(stack, capacity):
        print "Error: Stack is full (Overflow)"
        return false
    top = top + 1
    stack[top] = value
    return true`
  },
  {
    name: "Pop",
    description: "Removes and returns the TOP element from the stack.",
    pseudocode: `function POP(stack):
    if IS_EMPTY(stack):
        print "Error: Stack is empty (Underflow)"
        return null
    poppedItem = stack[top]
    top = top - 1
    return poppedItem`
  },
  {
    name: "Peek / Top",
    description: "Inspects the element at the TOP without removing it.",
    pseudocode: `function PEEK(stack):
    if IS_EMPTY(stack):
        print "Stack is empty"
        return null
    return stack[top]`
  },
  {
    name: "IsEmpty",
    description: "Checks whether the stack has any elements.",
    pseudocode: `function IS_EMPTY(stack):
    return top == -1  // or size == 0`
  },
  {
    name: "IsFull",
    description: "Checks whether the stack has reached maximum capacity.",
    pseudocode: `function IS_FULL(stack, capacity):
    return top == capacity - 1`
  }
];

export const priorityQueueAlgorithms = [
  {
    name: "Insert (Priority Order)",
    description: "Inserts an element into the sorted list based on numerical priority, preserving FIFO order for ties.",
    pseudocode: `function INSERT(pq, value, priority, capacity):
    if IS_FULL(pq, capacity):
        print "Error: Priority Queue is full"
        return false
    newItem = { value, priority, id }
    // Find first index where priority is lower
    index = 0
    while index < length(pq) and pq[index].priority >= priority:
        index = index + 1
    // Insert item at position index (shifts lower priority items)
    pq.insertAt(index, newItem)
    return true`
  },
  {
    name: "Delete (Highest Priority)",
    description: "Removes and returns the element with the highest priority (head of sorted list).",
    pseudocode: `function DELETE(pq):
    if IS_EMPTY(pq):
        print "Error: Priority Queue is empty"
        return null
    // In sorted array, element at index 0 has highest priority
    removedItem = pq.shift()
    return removedItem`
  },
  {
    name: "Peek",
    description: "Inspects the highest priority element without removing it.",
    pseudocode: `function PEEK(pq):
    if IS_EMPTY(pq):
        print "Priority Queue is empty"
        return null
    return pq[0]`
  },
  {
    name: "IsEmpty",
    description: "Checks if the priority queue contains zero elements.",
    pseudocode: `function IS_EMPTY(pq):
    return length(pq) == 0`
  },
  {
    name: "IsFull",
    description: "Checks if the priority queue has reached maximum capacity.",
    pseudocode: `function IS_FULL(pq, capacity):
    return length(pq) >= capacity`
  }
];
