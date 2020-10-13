class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// EXAMPLE 1:
//      A
//     / \                            = Level 0
//    B   C			B and C are siblings  = Level 1
//   / \   \
//  D   E   F                         = Level 2
//
// let a = new TreeNode('a');           // root node
// let b = new TreeNode('b');
// let c = new TreeNode('c');
// let d = new TreeNode('d');
// let e = new TreeNode('e');
// let f = new TreeNode('f');
//
// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// c.right = f;
//
// DFS Order = A B D E C F


// *****************************************************************************
// SOLUTION V1- RECURSIVE
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found
// DFS = continuously travel deeper into a tree before switching branches. 
// 		(i.e. must visit all descendants before visiting siblings)
//     = PRE ORDER (SELF, LEFT, RIGHT)
// 
// (TreeNode A, 'x') => TreeNode X node2
function depthFirstSearch(root, targetVal) {
  if (!root) return null;																												// base case if no root, return null
  if (root.val === targetVal) return root;																			// if current node's (root) val matches target, return current node
  return depthFirstSearch(root.left, targetVal) ||  														// recursively search left and right child nodes of current node
         depthFirstSearch(root.right, targetVal);

  // Below works aswell as above:
  // if (root === null) return null;																						// base case, exit if root doesnt exist (null)
  // if (root.val === targetVal) return root;																		// if root's val == targetVal, found! return root node
  // let leftSearch = depthFirstSearch(root.left, targetVal);										// recursively store left search 
  // return leftSearch ? leftSearch : depthFirstSearch(root.right, targetVal);
}

// EXAMPLE 2:
//      a
//     / \      
//    b   x			 x = Node2
//   / \  
//  x   e 			 x = Node3
let root = new TreeNode('a');
let node1 = new TreeNode('b');
let node2 = new TreeNode('x');
let node3 = new TreeNode('x');
let node4 = new TreeNode('e');
root.left = node1;
root.right = node2;
node1.left = node3;
node1.right = node4;
// console.log(depthFirstSearch(root, 'x'));		//=> node3
// console.log(depthFirstSearch(root, 'e'));		//=> node4




// *****************************************************************************
// SOLUTION V2- ITERATIVE
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found
// DFS = continuously travel deeper into a tree before switching branches. 
// 		(i.e. must visit all descendants before visiting siblings)
//     = PRE ORDER (SELF, LEFT, RIGHT)
// 
// (TreeNode A, 'x') => TreeNode X node2
function depthFirstSearchIter(root, targetVal) {
  if (!root) return null;
  let stack = [root];															// use array stack (push/pop) to represent ?

  while (stack.length !== 0) {										// loop until stack is empty
    let node = stack.pop();												// pop node off stack
    if (node.val === targetVal) return node;			// check if node's val matches target
    if (node.right) stack.push(node.right);				// if right and left nodes exist, push them to stack
    if (node.left) stack.push(node.left);					// we want to push right first so we can pop left off first in next loop
  }
}

// EXAMPLE 2:
//      a
//     / \      
//    b   x			 x = Node2
//   / \  
//  x   e 			 x = Node3
let root = new TreeNode('a');
let node1 = new TreeNode('b');
let node2 = new TreeNode('x');
let node3 = new TreeNode('x');
let node4 = new TreeNode('e');
root.left = node1;
root.right = node2;
node1.left = node3;
node1.right = node4;
// console.log(depthFirstSearch(root, 'x'));		//=> node3
// console.log(depthFirstSearch(root, 'e'));		//=> node4