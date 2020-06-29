// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
// 
//  stack.push()     O(1) TIME    adds node to Top (Head), of stack,      returns new size
//  stack.pop()      O(1) TIME    removes node from Front (Head) of line, returns removed node value
//  stack.size()     O(1) TIME
//
// -----------


class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}



class Stack {
  constructor() {
    this.top = null;      // analagous to head in linked list
    this.bottom = null;   // analagous to tail in linked list
    this.length = 0;
  }


  push(val) {
    let newNode = new Node(val);
    
    if (this.top === null) {            // stack empty               
      this.bottom = newNode;
      
    } else {                            // stack not empty
      let prevTop = this.top;
      newNode.next = prevTop;           // make new top node point to old top
    }

    this.top = newNode;                 // update top node

    this.length++;

    return this.length;
  }


  pop() {
    if (this.top === null) return null;    // if stack is empty, return null
    
    let oldTop = this.top;
    let newTop = oldTop.next;
    
    if (this.length === 1) {
      this.top = null;
      this.bottom = null;
      
    } else {
      this.top = newTop;
    }

    this.length--;

    return oldTop.value;
  }


  size() {
    return this.length;
  }
}



exports.Node = Node;
exports.Stack = Stack;
