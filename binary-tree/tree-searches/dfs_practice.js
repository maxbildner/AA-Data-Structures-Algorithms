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


// TIME: 7min (11/19/20)
// *****************************************************************************
// SOLUTION V1- RECURSIVE
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found
// DFS = continuously travel deeper into a tree before switching branches. 
// 		(i.e. must visit all descendants before visiting siblings)
//     = PRE ORDER (SELF, LEFT, RIGHT)
// 
// (TreeNode A, 'x') => TreeNode X node3
function depthFirstSearch(root, targetVal) {
  
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
// console.log(depthFirstSearch(root, 'a'));		  //=> root    a
// console.log(depthFirstSearch(root, 'x'));		  //=> node3   x
// console.log(depthFirstSearch(root, 'e'));		  //=> node4   e
// console.log(depthFirstSearch(root, 'z'));		  //=> null    or -1
// console.log(depthFirstSearch(null, 'z'));		  //=> null    or -1



// TIME: 6min (11/19/20)
// *****************************************************************************
// SOLUTION V2- ITERATIVE PREORDER
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found
// DFS = continuously travel deeper into a tree before switching branches. 
// 		(i.e. must visit all descendants before visiting siblings)
//     = PRE ORDER (SELF, LEFT, RIGHT)
// 
// (TreeNode A, 'x') => TreeNode X node3
function depthFirstSearchIter(root, targetVal) {
  
}

// EXAMPLE 2:
//      a
//     / \      
//    b   x			 x = Node2
//   / \  
//  x   e 			 x = Node3
root = new TreeNode('a');
node1 = new TreeNode('b');
node2 = new TreeNode('x');
node3 = new TreeNode('x');
node4 = new TreeNode('e');
root.left = node1;
root.right = node2;
node1.left = node3;
node1.right = node4;
// console.log(depthFirstSearchIter(root, 'a'));		//=> root    a
// console.log(depthFirstSearchIter(root, 'x'));		//=> node3   x
// console.log(depthFirstSearchIter(root, 'e'));		//=> node4   e
// console.log(depthFirstSearchIter(root, 'z'));		//=> null    or -1
// console.log(depthFirstSearchIter(null, 'z'));		//=> null    or -1