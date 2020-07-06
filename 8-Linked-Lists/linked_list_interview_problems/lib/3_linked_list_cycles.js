// ============================================================================
// Interview Problem: Linked List Cycles
// SIMILAR TO LEETCODE LC 141 EASY
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


// *****************************************************************************
// VERSION 1- MY SOLUTION, (won't work for LeetCode because of assumptions)
// TIME COMPLEXITY:   O(1),   
// SPACE COMPLEXITY:  O(1),   
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
function hasCycleV1(linkedList) {
  return linkedList.tail.next !== null;
}



// *****************************************************************************
// VERSION 2- AA SOLUTION (only 17% faster than all submissions)
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
function hasCycle(linkedList) {
  if (!head) return false;        
  let slow = linkedList.head;
  let fast = linkedList.head;
  let pause = true;

  while (fast = fast.next) {
    if (fast === slow) return true;
    slow = pause ? slow : slow.next;
    pause = !pause;                                                             // flip boolean pause
  }

  return false;
}



// *****************************************************************************
// VERSION 3- LEET CODE SOLUTION
// HINT: Imagine two runners running on a track at different speed. What happens 
//  when the track is actually a circle? Consider a slow pointer that moves one 
//  step at a time while the fast pointer moves two steps at a time.
// 
// TIME COMPLEXITY:   O(N),   O(N + K) => O(N),  N = Length of list
//      N = Non-Cyclic length of list (num nodes)
//      K = Cyclic length of list
// INPUTS:  1 linked list object
// OUTPUT:  boolean, true if cyclical linked list, false if not
// ASSUMPTIONS
//  - we DO NOT have O(1) access to the linked lists tail!!
// EX Input:
// A -> B -> C -> D -> E          =>      false
// A -> B -> C -> D -> E -> B     =>      true
// if there is a cycle, eventually slow and fast will meet
function hasCycle(linkedList) {
  if (!linkedList.head) return false;                                           //    edge case if list empty
  let slow = linkedList.head;                                                   // 1) slow runner will move 1 node at a time
  let fast = linkedList.head;                                                   // 2) fast runner will move 2 nodes at a time

  while (fast) {                                                                // 3) keep looping as long as fast node exists (not null)
    if (fast.next === null) {                                                   // 4) if no node after fast (null), then there's no cycle
      return false;

    } else {                                                                    // 5) else there is a node after fast, update slow/fast pointers
      fast = fast.next.next;
      slow = slow.next;
    }

    if (slow === fast) return true;                                             // 6) if slow == fast, then we have a cycle (runners meet)
  }

  return false;                                                                 // 7) if we get here that means we've looped through all nodes and we've reached null, so no cycle
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


// let myLinkedList = new LinkedList();
// console.log(myLinkedList.addToTail('A'));   //=> LinkedList { head: Node { value: 'A', next: null }, tail: Node { value: 'A', next: null }, length: 1 }
// console.log(hasCycle(myLinkedList));        //=> false


exports.Node = Node;
exports.LinkedList = LinkedList;
exports.hasCycle = hasCycle;
