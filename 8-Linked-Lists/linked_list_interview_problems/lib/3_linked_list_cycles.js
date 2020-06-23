// ============================================================================
// Interview Problem: Linked List Cycles
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Given a Singly Linked List, write a function that returns true if the linked
// list contains a cycle, or false if terminates somewhere.
//
// ------------
// Constraints:
// ------------ 
//
// (1) Your function must run in linear time, O(n).
// (2) Your function must use constant space, O(1).
// (3) Do not mutate the linked list or it's nodes in any way.
// 
// ------------
// Explanation:
// ------------
//
// In general, we assume that a linked list is said to "terminate" at it's tail.
// This means that the linked list's tail should have a next pointer that points
// to null. For example:
// 
//                           A → B → C → D → E → null
// 
// A "cycle" occurs when there exists a node in the list whose next pointer
// points to a node that appeard previously in the list. Traversing a cyclical
// list results in an infinite loop, where one visits the same nodes (those
// LinkedIn to the cycle...see what I did there? :P) again and again.
//
// --------
// Example:
// --------
//
// Let's create the following linked list with a four-node cycle:
//
//                         A → B → C
//                             ↑   ↓
//                             E ← D
// 
// const linkedList = new LinkedList();
// let secondNode;
//
// linkedList.addToTail('A');
// linkedList.addToTail('B');
// linkedList.addToTail('C');
// linkedList.addToTail('D');
// linkedList.addToTail('E');
// hasCycle(linkedList);               => false
//
// secondNode = linkedList.get(1);
// linkedList.tail.next = secondNode;
// hasCycle(linkedList);               => true
//
// -----------



// VERSION1- MY SOLUTION,     
// TIME COMPLEXITY:   O(1),   
// SPACE COMPLEXITY:  O(1),   
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we have access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
function hasCycleV1(linkedList) {

  // // create var to track curent node, initialize to head node
  // let currentNode = linkedList.head;
  // // currentNode = A

  // // loop num times = length of linked list (all nodes)
  // for (let i = 0; i < linkedList.length; i++) {
  //   // i = 0:   0 < 5   true

  //   currentNode = currentNode.next;                                             // update current node
  //   // i = 0: currentNode = B

  // }

  // if (linkedList.tail.next === null) {
  //   return false;
  // } else {
  //   return true;
  // }

  return linkedList.tail.next !== null;
}



// VERSION2- AA SOLUTION,     
// TIME COMPLEXITY:   O(1),   
// SPACE COMPLEXITY:  O(1),   
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
function hasCycle(linkedList) {
  let slow = linkedList.head;
  let fast = linkedList.head;
  // slow = A
  // fast = A
  let pause = true;

  while (fast = fast.next) {
    // 1:  (fast = B)     =>    B     true
    // 2:  (fast = C)     =>    C     true
    // 3:  (fast = D)     =>    D     true
    // 4:  (fast = E)     =>    E     true
    // 5:  (fast = null)  =>    B     false, exit loop

    if (fast === slow) return true;
    // 1:   B === A   false
    // 2:   C === A   false
    // 3:   D === B   false
    // 4:   E === B   false
    // 5:   B === B   true      

    slow = pause ? slow : slow.next;
    // 1:   slow =  (true)  ? A : B     =>    A
    // 2:   slow =  (false) ? A : B     =>    B
    // 3:   slow =  (true)  ? B : C     =>    B
    // 4:   slow =  (false) ? B : C     =>    C

    pause = !pause;                                                             // flip boolean pause
    // 1: pause = !true               => false
    // 2: pause = !false              => true
    // 3: pause = !true               => false
    // 4: pause = !false              => true
  }

  return false;



  // let slow = linkedList.head;
  // let fast = linkedList.head;
  // // slow = A
  // // fast = A
  // let pause = true;

  // while (fast = fast.next) {
  //   // 1:  (fast = B)   =>    B     true
  //   // 2:  (fast = C)   =>    C     true
  //   // 3:  (fast = D)   =>    D     true
  //   // 4:  (fast = E)   =>    E     true
  //   // 5:  (fast = B)   =>    B     true

  //   if (fast === slow) return true;
  //   // 1:   B === A   false
  //   // 2:   C === A   false
  //   // 3:   D === B   false
  //   // 4:   E === B   false
  //   // 5:   B === B   true      

  //   slow = pause ? slow : slow.next;
  //   // 1:   slow =  (true)  ? A : B     =>    A
  //   // 2:   slow =  (false) ? A : B     =>    B
  //   // 3:   slow =  (true)  ? B : C     =>    B
  //   // 4:   slow =  (false) ? B : C     =>    C

  //   pause = !pause;                   // flip boolean pause
  //   // 1: pause = !true               => false
  //   // 2: pause = !false              => true
  //   // 3: pause = !true               => false
  //   // 4: pause = !false              => true
  // }

  // return false;
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

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
}


let myLinkedList = new LinkedList();
console.log(myLinkedList.addToTail('A'));   //=> LinkedList { head: Node { value: 'A', next: null }, tail: Node { value: 'A', next: null }, length: 1 }
console.log(hasCycle(myLinkedList));        //=> false


exports.Node = Node;
exports.LinkedList = LinkedList;
exports.hasCycle = hasCycle;
