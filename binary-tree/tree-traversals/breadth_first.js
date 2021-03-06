class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// EXAMPLE 1:
//      A
//     / \                                  = Level 0
//    B   C			B and C are siblings    	  = Level 1
//   / \   \
//  D   E   F                               = Level 2
//
let a = new TreeNode('a');                  // root node
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
//
// BFS Order = A B C D E F



// *****************************************************************************
// SOLUTION V1- ITERATIVE
// Takes in root TreeNode, returns array with node values in BFS order (left to right)
// BFS = Will visit all the nodes on a current level before moving down to the 
//      next level. (Move laterally before going down deeper)
// 
// (TreeNode A)    				=>      				['a', 'b', 'c', 'd', 'e', 'f']
function breadthFirstArray(root) {
  if (!root) return [];
  let queue = [root];																														// 1) use lazy Queue array (shift, push)
  let path = [];

  while (queue.length > 0) {																										// 2) loop while queue is not empty
    let node = queue.shift();																										// 3) remove first node from queue
    path.push(node.val);																											  // 4) push node's val to path
    if (node.left) queue.push(node.left);																				// 5) push left and right nodes to queue (if they exist)
    if (node.right) queue.push(node.right);
  }

  return path;
}
// console.log(breadthFirstArray(b));																						//=> ['b', 'd', 'e' ]
// console.log(breadthFirstArray(a));																						//=> ['a', 'b', 'c', 'd', 'e', 'f']
// console.log(breadthFirstArray(null));																				//=> []