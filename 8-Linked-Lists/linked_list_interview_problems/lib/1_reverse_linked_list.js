// ============================================================================
// Interview Problem: Reverse a Linked List
// LEETCODE LC 206 ?
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Given a Singly Linked List, write a function that reverses the order of the
// list's nodes.
//
// Note: You are guaranteed not to receive a linked list with cycles as input.
//
// ------------
// Constraints:
// ------------ 
//
// (1) Your function must run in linear time, O(n).
// (2) You must reverse the list *in place*. (i.e. Use constant space, O(1).)
//
// ------------
// Explanation:
// ------------
//
// Given the following linked list:
//
//   First → Second → Third → Fourth → Fifth → null
//
// Should be mutated into the following list:
//
//   Fifth → Fourth → Third → Second → First → null
//
// This must be done without instantiating a NEW instance of a LinkedList.
// You must do reverse the list in place, by mutating the original input.
//
// --------
// Example:
// --------
//
// const linkedList = new LinkedList();
// linkedList.addToTail('First');
// linkedList.addToTail('Second');
// linkedList.addToTail('Third');
// linkedList.addToTail('Fourth');
// linkedList.addToTail('Fifth');
//
// Current List:  First → Second → Third → Fourth → Fifth → null
//
// const result = reverseLinkedList(root);
//
// Mutated List:  Fifth → Fourth → Third → Second → First → null
//
// result.head.value            => 'Fifth'
// result.head.next.value       => 'Fourth'
// result.tail.value            => 'First'
// result.tail.value.next       =>  null
//
// The old head is now the terminal node!



// VERSION1- MY SOLUTION, Mutates Linked List, in place,
// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)
// INPUT:   Linked List Object
// OUTPUT:  Linked List Object
//    LinkedList { head: Node { value: 'A', next: [NodeB] }, 	 tail: Node { value: 'B', next: null }, 	length: 1 }
// => LinkedList { head: Node { value: 'B', next: [NodeA] }, 	 tail: Node { value: 'A', next: null }, 	length: 1 }
// Ex:  A -> B -> C -> D
//      D -> C -> B -> A
// function reverseLinkedList(linkedList) {
//   if (linkedList.length <= 1) return linkedList;                                // edge case if list only has one or 0 nodes, return linkedList

//   let headNode = linkedList.head;                                               // grab root head node
//   let previousNode = headNode;                                                  // set previousNode to headNode
//   let currentNode = headNode.next;                                              // set currentNode to Next Node
//   let tailNode = linkedList.tail;                                               // grab tail node
  
//   headNode.next = null                                                          // update headNodes next to point to null
//   linkedList.tail = headNode;                                                   // update tail to point to old headNode
//   linkedList.head = tailNode;                                                   // update head to point to old tailNode

//   for (let i = 1; i < linkedList.length; i++) {                                 // loop num times = list length - 1
//     let tempNextNode = currentNode.next;                                        // create temp var to store Next Node
//     currentNode.next = previousNode;                                            // update current node to point to previousNode
//     previousNode = currentNode;                                                 // reassign previousNode to currentNode
//     currentNode = tempNextNode;                                                 // reassign currentNode to temp var (old Next Node)
//   }

//   return linkedList;
// }



// VERSION2- AA SOLUTION, Mutates Linked List, in place,
// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)
// INPUT:   Linked List Object
// OUTPUT:  Linked List Object
//    LinkedList { head: Node { value: 'A', next: [NodeB] }, 	 tail: Node { value: 'B', next: null }, 	length: 1 }
// => LinkedList { head: Node { value: 'B', next: [NodeA] }, 	 tail: Node { value: 'A', next: null }, 	length: 1 }
// Ex:  A -> B -> C -> D
//      D -> C -> B -> A
function reverseLinkedList(linkedList) {
  let currentNode = linkedList.head;                                            // set currentNode to Head Node
  let first = currentNode;                                                      // grab head node
  let next = null;                                                              // create var to track nextNode
  let prev = null;                                                              // create var to track previousNode

  while (next = currentNode.next) {                                             // loop num times = length - 1 (until currentNode.next is falsey/null)
    // 1: next = B        B       true
    // 2: next = C        C       true
    // 3: next = D        D       true
    // 4: next = null     null    false

    currentNode.next = prev;                                                    // update currentNode to point to previousNode
    // 1:  A -> null              B -> C -> D
    // 2:  B -> A -> null         C -> D
    // 3:  C -> B -> A -> null    D

    prev = currentNode;                                                         // reassign previousNode to currentNode
    // 1:  prev = A
    // 2:  prev = B
    // 3:  prev = C

    currentNode = next;                                                         // reassign currentNode to nextNode
    // 1:  currentNode = B                  
    // 2:  currentNode = C                  
    // 3:  currentNode = D                  
  }

  linkedList.head = currentNode;                                                // update head, tail, and head.next
  linkedList.head.next = prev;
  linkedList.tail = first;
  return linkedList;
}



// ----------------------------------------
// Given: Singly Linked List - Do Not Edit!
// ----------------------------------------
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToTail(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
    return this;
  }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
exports.reverseLinkedList = reverseLinkedList;
