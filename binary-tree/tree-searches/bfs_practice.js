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
// BFS Order = A B C D E F


// TIME: 
// *****************************************************************************
// SOLUTION V1- RECURSIVE
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found

// (TreeNode A, 'x') => TreeNode X node2
function breadthFirstSearch(root, targetVal) {

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
console.log(breadthFirstSearch(root, 'x'));		          //=> node2   x
console.log(breadthFirstSearch(root, 'x') === node2);		//=> true    
console.log(breadthFirstSearch(root, 'e'));		          //=> node4   e
console.log(breadthFirstSearch(root, 'z'));		          //=> null    or -1
console.log(breadthFirstSearch(null, 'z'));		          //=> null    or -1



// TIME: 10m (11//19/20)
// *****************************************************************************
// SOLUTION V2- ITERATIVE
// Takes in root TreeNode, and string val, returns first TreeNode matching string val
// Return null if targetVal not found


// (TreeNode A, 'x') => TreeNode X node2
function breadthFirstSearchIter(root, targetVal) {
  
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
// console.log(breadthFirstSearchIter(root, 'x'));		          //=> node2   x
// console.log(breadthFirstSearchIter(root, 'x') === node2);		//=> true    
// console.log(breadthFirstSearchIter(root, 'e'));		          //=> node4   e
// console.log(breadthFirstSearchIter(root, 'z'));		          //=> null    or -1
// console.log(breadthFirstSearchIter(null, 'z'));		          //=> null    or -1