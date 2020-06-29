// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
// Using Singly Linked List
// Methods
//  enqueue(val)  => O(1) TIME adds node to Back (Tail), of line,      returns new size
//  dequeue()     => O(1) TIME removes node from Front (Head) of line, returns removed node value
// -----------




class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}



class Queue {
  constructor() {
    this.front = null;      // analagous to HEAD in linked list
    this.back = null;       // analagous to TAIL in linked list
    this.length = 0;
  }


  // adds node to back of line (list)
  enqueue(val) {
    let newNode = new Node(val);    // create new node

    if (this.front === null) {      // if queue is empty
      this.front = newNode;         // HEAD
      this.back = newNode;          // TAIL

    } else {                        // queue not empty
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;

    return this.length;
  }


  dequeue() {
    if (this.front === null) return null;       // return null if queue empty
    
    let removedNode = this.front;

    if (this.length === 1) {                    // if queue only has 1 node, reset front/back
      this.front = null;
      this.back = null;

    } else {                                    // queue has more than 1 node
      let newFront = this.front.next;
      this.front = newFront;
    }

    this.length--;
    
    return removedNode.value;
  }


  size() {
    return this.length;
  }
}



exports.Node = Node;
exports.Queue = Queue;