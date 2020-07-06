// ============================================================================
// Interview Problem: Linked List Intersection (Singly Linked)
// SIMILAR TO LEETCODE LC 160 EASY
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Write a function linkedListIntersection that returns the node at which the 
// intersection of two linked lists begins, or null if there is no such 
// intersection.
//
// ---------- 
// Example 1:
// ----------
// 
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1,list2) should return D 
// as the node of intersection.
// 
//  A → B → C
//           ↘
//             D → E → F
//           ↗
//      X → Y
//
// ---------- 
// Example 2:
// ----------
//
// Given the following two linked lists, list1 and list2, 
// linkedListIntersection(list1, list2) should return null 
// as there is no point of intersection.
// 
//    A → B → C → D
//
//    X → Y → Z
// 
// -----------


// *****************************************************************************
// VERSION 1- MY SOLUTION,     Good time, meh space
// TIME COMPLEXITY:   O(N),   N = shorter list length
// SPACE COMPLEXITY:  O(N),   bec we create obj to store shorter list vals
// INPUTS:  Two Singly Linked List Objects
// OUTPUT:  Node Object that has the intersecting value
// ASSUMPTIONS:
//  - values are all unique, or that you want the first value that intersects
//  - lists can be different sizes
//  - only 1 intersection
//  - we have reference to both list lengths
// EX Inputs:
//    list1 = A -> B -> C ->  D -> E -> F   length 6
//    list2 = X -> Y ->       D -> E -> F   length 5
// => Node D
function linkedListIntersectionV1(list1, list2) {  
  let shorterList = (list2.length > list1.length) ? list1 : list2;              // find shorter list, store in var
  let longerList = (list2.length > list1.length) ? list2 : list1;               // find longer list, store in var
  
  let shorterListValues = {};                                                   // create object (for fast lookup), to store values in shorterList
  
  let currentNodeShortL = shorterList.head;                                     // create vars to track currentNodes for both lists
  let currentNodeLongL = longerList.head;                                    
  // currentNodeShortL = X
  // currentNodeLongL = A
  
  while (currentNodeShortL !== null) {                                          // Loop through all nodes in shorter list
    
    shorterListValues[currentNodeShortL.value] = true;                          // store val from shorter list node in object
    // 1: shorterListValues = { X:true }
    // 2: shorterListValues = { X:true, Y:true }
    // 3: shorterListValues = { X:true, Y:true, D:true }
    // 4: shorterListValues = { X:true, Y:true, D:true, E:true }

    if (shorterListValues[currentNodeLongL.value]) {                            // check if longer list current node val is in object
      // 1: { X:true }['A']                           'A' not in object   false
      // 2: { X:true, Y:true }['B']                   'B' not in object   false
      // 3: { X:true, Y:true, D:true }['C']           'C' not in object   false
      // 4: { X:true, Y:true, D:true, E:true }['D']   'D' in object       true
      return currentNodeLongL;                                                  // if it is we have intersection
    }
    
    currentNodeShortL = currentNodeShortL.next;                                 // update currentNodes for both lists
    currentNodeLongL = currentNodeLongL.next;
    // 1: currentNodeShortL = B,    currentNodeLongL = Y
    // 2: currentNodeShortL = C,    currentNodeLongL = D
    // 3: currentNodeShortL = D,    currentNodeLongL = E
  }

  return null;
}




// *****************************************************************************
// VERSION 2- AA SOLUTION          efficient space, ok time (compared to v1)
// TIME COMPLEXITY:   O(N),       N = Longer List Length
// SPACE COMPLEXITY:  O(1)   
// INPUTS:  Two Singly Linked List Objects
// OUTPUT:  Node Object that has the intersecting value
// ASSUMPTIONS:
//  - values are all unique, or that you want the first value that intersects
//  - lists can be different sizes
//  - only 1 intersection
//  - we have reference to both list lengths
// EX Inputs:
//    list1 = A -> B -> C ->  D -> E -> F   length 6
//    list2 = X -> Y ->       D -> E -> F   length 5
// => Node D
function linkedListIntersection(list1, list2) {
  const list1Length = getLinkedListLength(list1.head);
  const list2Length = getLinkedListLength(list2.head);

  let diff = Math.abs(list2Length - list1Length);                               // get difference of list lengths (absolute val)
  // diff = abs(5 - 6)  = 1
  let long = list1Length >= list2Length ? list1.head : list2.head;              // current head node from longer list
  let short = list1Length >= list2Length ? list2.head : list1.head;             // current head node from shorter list
  // long = A
  // short = X

  // while (long && short) {                                                    //  AA solution has this, idk why mine works below
  while (short) {                                                               // loop while shorter node exists (total num loops will actually be = length longer list)
    if (diff > 0) {                                                             // keep updating current node from longer list until diff = 0
      // 1:   1 > 0   true
      // 2:   0 > 0   false

      long = long.next;                                                         
      // 1: long = B,       short = X

      diff--;
      // 1: diff = 1 - 1    = 0

      continue;
    }

    if (long === short) return long;
    // 2:   B === X     false
    // 3:   C === Y     false
    // 4:   D === D     true

    long = long.next;
    short = short.next;
    // 2:     long = C      short = Y
    // 3:     long = D      short = D
  }

  return null;
}

// Helper to find a list's length
function getLinkedListLength(listNode) {
  if (listNode.next === null) {
    return 1;
  } else {
    return getLinkedListLength(listNode.next) + 1;
  }
}






// *****************************************************************************
// VERSION 3- HASH TABLE/SET
// LC 160 Intersection of Two Linked Lists
// https://leetcode.com/problems/intersection-of-two-linked-lists/solution/
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(M) or O(N)   depending on which list you use to store the hash/set
function linkedListIntersection(list1, list2) {
  let l1Head = list1.head;
  let l2Head = list2.head;
  let list1Nodes = new Set();

  while (l1Head) {                                                              // 1) loop through list1 and store nodes in hash table/set
    list1Nodes.add(l1Head);
    l1Head = l1Head.next;
  }

  while (l2Head) {                                                              // 2) loop through list2 and see if any nodes are in list1Nodes
    if (list1Nodes.has(l2Head)) return l2Head;
    l2Head = l2Head.next;
  }

  return null;                                                                  // 3) return null if we reach this point, no intersection
}




// *****************************************************************************
// VERSION 4- 2 POINTERS BEST SOLUTION
// LC 160 Intersection of Two Linked Lists
// https://leetcode.com/problems/intersection-of-two-linked-lists/solution/
// TIME COMPLEXITY: O(M + N)        M = list1 length,  N = list2 length
// SPACE COMPLEXITY: O(1)   
// function linkedListIntersection(head1, head2) {
function linkedListIntersection(list1, list2) {
  let head1 = list1.head;
  let head2 = list2.head;

  if (!head1 || !head2) return null;                                            // 1) return null if either list is empty

  let pNode1 = head1;                                                           // 2) initialize 2 pointers to both heads
  let pNode2 = head2;

  while (pNode1 != pNode2) {                                                    // 3) keep looping as long as node pointers are different. loop through both lists one node at a time
    pNode1 = pNode1 == null ? head2 : pNode1.next;                              // 4) update each node to the next node, unless node reaches end of its list- then update it to the head of opposite list
    pNode2 = pNode2 == null ? head1 : pNode2.next;                              
  }

  return pNode1;                                                                // 5) return either pointer (they will be the same or null)
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

// --------------------------------------
// Helper For Testing Only - Do Not Edit!
// --------------------------------------
var stringify = function(list) {
  var result = [];
  while(list !== null) {
    result.push(list.value);
    list = list.next;
  }
  return result.join("");
}

exports.Node = Node;
exports.LinkedList = LinkedList;
exports.linkedListIntersection = linkedListIntersection;
exports.stringify = stringify;
