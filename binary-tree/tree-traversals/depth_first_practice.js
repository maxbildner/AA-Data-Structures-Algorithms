// 3 DEPTH FIRST TRAVERSAL ALGORITHMS (PRE, IN, POST ORDER)
// RECURSIVELY AND ITERATIVELY
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let root = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

root.left = b;
root.right = c;
b.left = d;
b.right = e;
c.right = f;
// Note* Assume arrowheads point downards only
// 			A
//		 / \
//	  B		C
//	 / \   \
//	D   E	  F


// TIME: 17Min (11/16/20)
// *****************************************************************************
// DEPTH FIRST- PRE ORDER RECURSIVE-  
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ A, B, D, E, C, F ]
function preOrderArray(root) {

  // base case- if no node, return empty array
  if (!root) return [];

  // intialize array to return (will contain path values)
  let path = [];

  // push current node val to path
  path.push(root.val);

  // recursively concat left and right children of current node to path
  path = path.concat(preOrderArray(root.left));
  path = path.concat(preOrderArray(root.right));

  return path;
}
// console.log(preOrderArray(root));				//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]


// TIME: 10Min (11/16/20)
// DEPTH FIRST- PRE ORDER ITERATIVE
// (TreeNode A) => [ A, B, D, E, C, F ]
// (TreeNode B)	=> [ B, D, E ]
function preOrderArrayIter(root) {

  // edge case- if no node- return empty array
  if (!root) return [];

  // initialize path to return later (empty array)
  let path = [];

  // use stack to emulate recursive stack- initialize with root node
  let stack = [ root ];

  // loop while stack not empty
  while (stack.length) {
    
    // remove last node from stack
    let node = stack.pop();

    // add node val to path
    path.push(node.val);

    // push right / left children (if they exist) of node to stack
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return path;
}  
// console.log(preOrderArrayIter(root));		//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]



// TIME: 11Min (11/16/20)
// *****************************************************************************
// DEPTH FIRST- IN ORDER RECURSIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArray(root) {
  // base case- if no node, return empty path
  if (!root) return [];

  // initialize empty array path to return
  let path = [];

  // recursively concat left subtree to path
  path = path.concat(inOrderArray(root.left));

  // push middle/current node to path
  path.push(root.val);

  // recursively concat right subtree to path
  path = path.concat(inOrderArray(root.right));

  return path;
}
console.log(inOrderArray(root));					//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]


// DEPTH FIRST- IN ORDER ITERATIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArrayIter(root) {
 
}
// console.log(inOrderArrayIter(root));			//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]



// *****************************************************************************
// DEPTH FIRST- POSTORDER RECURSIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ]
function postOrderArray(root) {

}
// console.log(postOrderArray(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]



// DEPTH FIRST- POSTORDER ITERATIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ]
function postOrderArrayIter(root) {
 
}
// console.log(postOrderArrayIter(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]






