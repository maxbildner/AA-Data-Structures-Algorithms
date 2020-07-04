//      A
//     / \                            = Level 0
//    B   C			B and C are siblings  = Level 1
//   / \   \
//  D   E   F                         = Level 2
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode('a');                    // root node
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

// *****************************************************************************
// 1) DEPTH FIRST (DF)- ITERATIVE
//    - Tree traversal Algorithm
//    - Will continuously travel deeper into a tree before switching branches. (i.e.must visit all descendants before visiting siblings)
//    - A B D E C F
//    - Use an Array Stack (LIFO) pop/push
function depthFirstIterative(root) {
  let stack = [ root ];                                                         // 1) initialize stack with root node   
  // stack = [ {TreeNode A} ]

  while (stack.length) {                                                        // 2) keep looping while there are nodes in stack
    // 1: [ {TreeNode A} ].length                              == 1   true
    // 2: [ {TreeNode C}, {TreeNode B} ].length                == 2   true
    // 3: [ {TreeNode C}, {TreeNode E}, {TreeNode D} ].length  == 3   true
    // 4: [ {TreeNode C}, {TreeNode E} ].length                == 2   true
    // 5: [ {TreeNode C} ].length                              == 1   true
    // 6: [ {TreeNode F} ].length                              == 1   true
    // 7: [ ].length                                           == 0   false

    let node = stack.pop();                                                     // 3) remove top node from stack (top of stack = back/right of array)
    // 1: node = {TreeNode A},    stack = [ ]
    // 2: node = {TreeNode B},    stack = [ {TreeNode C} ]
    // 3: node = {TreeNode D},    stack = [ {TreeNode C}, {TreeNode E} ]
    // 4: node = {TreeNode E},    stack = [ {TreeNode C} ]
    // 5: node = {TreeNode C},    stack = [ ]
    // 6: node = {TreeNode F},    stack = [ ]
    
    console.log(node.val);                                                      // 4) a node is "visited" once we POP it not push it

    if (node.right) stack.push(node.right);                                     // 5) add the node's right and left children, if they exist (not null)
    // 1: stack = [ {TreeNode C} ]
    // 2: stack = [ {TreeNode C}, {TreeNode E} ]
    // 3: stack = [ {TreeNode C}, {TreeNode E} ]
    // 4: stack = [ {TreeNode C} ]
    // 5: stack = [ {TreeNode F} ]
    // 6: stack = [ ]
    
    if (node.left) stack.push(node.left);
    // 1: stack = [ {TreeNode C}, {TreeNode B} ]
    // 2: stack = [ {TreeNode C}, {TreeNode E}, {TreeNode D} ]
    // 3: stack = [ {TreeNode C}, {TreeNode E} ]
    // 4: stack = [ {TreeNode C} ]
    // 5: stack = [ {TreeNode F} ]
    // 6: stack = [ ]
  }
}

// depthFirstIterative(a);
//=>
// "a"
// "b"
// "d"
// "e"
// "c"
// "f"




//      A
//     / \                            = Level 0
//    B   C			B and C are siblings  = Level 1
//   / \   \
//  D   E   F                         = Level 2
// *****************************************************************************
// 2) DEPTH FIRST (DF)- RECURSIVE, IDENTICAL TO PRE ORDER
//    - Tree traversal Algorithm
//    - Will continuously travel deeper into a tree before switching branches. (i.e.must visit all descendants before visiting siblings)
//    - A B D E C F
//    - Use an Array Stack (LIFO) pop/push
function depthFirstRecursive(root) {
  if (!root) return;
  console.log(root.val);
  depthFirstRecursive(root.left);
  depthFirstRecursive(root.right);
}

// depthFirstRecursive(a);
//=>
// "a"
// "b"
// "d"
// "e"
// "c"
// "f"




//      A
//     / \                            = Level 0
//    B   C			B and C are siblings  = Level 1
//   / \   \
//  D   E   F                         = Level 2
// *****************************************************************************
// 3) BREADTH FIRST (BF)- ITERATIVE, 
//    - Tree traversal Algorithm
//    - "Breadth" = Width
//    - Will visit all the nodes on a level before moving to the next level. We move laterally before going deeper down
//    - A B C D E F
//    - Use an Array Queue (FIFO). shift/push
function breadthFirst(root) {
  let queue = [ root ];                                                         // 1) initialize queue as an array with root node

  while (queue.length) {                                                        // 2) keep looping while there are nodes in queue
    let node = queue.shift();                                                   // 3) remove front node from queue (front of queue = begin/left of array)

    console.log(node.val);                                                      // 4) a node is "visited" once we SHIFT it not push it

    if (node.left) queue.push(node.left);                                       // 5) add node's left and right children to back of queue, if they exist (not null)
    if (node.right) queue.push(node.right);
  }
}

// breadthFirst(a);
//=>
// "a"
// "b"
// "c"
// "d"
// "e"
// "f"