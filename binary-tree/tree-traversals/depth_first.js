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



// *****************************************************************************
// PRE ORDER RECURSIVE-  S, L, R
// - a node must be "visited" before its left and right children
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ A, B, D, E, C, F ]
function preOrderArray(root) {

  if (!root) return [];																													// base case if no root (null), return empty path
  let path = [];

  path.push(root.val);
  path = path.concat(preOrderArray(root.left));
  path = path.concat(preOrderArray(root.right));

  return path;
}
// console.log(preOrderArray(root));				//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]


// PRE ORDER ITERATIVE
// (TreeNode A) => [ A, B, D, E, C, F ]
// (TreeNode B)	=> [ B, D, E ]
function preOrderArrayIter(root) {
  let path = [];																																// 1) initialze stack w/ root node in it
  let stack = [root];

  while (stack.length) {																												// 2) while loop stack is NOT empty

    let node = stack.pop();																											// 3) "visit" root node/top of stack by popping last node in stack

    path.push(node.val);																												// 4) push current node val to path

    if (node.right) stack.push(node.right);																			// 5) add right/left children of current node to stack
    if (node.left) stack.push(node.left);
  }

  return path;
}
// console.log(preOrderArrayIter(root));		//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]



// *****************************************************************************
// IN ORDER RECURSIVE 
// - a node can only be "visited" once its left subtree has been visited
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArray(root) {
  if (!root) return [];																													// 1)base case- if no root, return path (empty arr [])
  let path = [];

  path = path.concat(inOrderArray(root.left))																		// 2) recursively go down current node's (root) left child until we hit bottom
  path.push(root.val);																													// 3) push curent node's (root) val to path (pushing == "visiting a node")
  path = path.concat(inOrderArray(root.right));																	// 4) recursively concat current node's right child

  return path;
}
// console.log(inOrderArray(root));					//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]


// IN ORDER ITERATIVE 
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArrayIter(root) {
  let path = [];																																// 1) initialize empty stack, and current node to root
  let stack = [];
  let node = root;

  while (stack.length || node) {																								// 2) loop while stack NOT empty OR node exists

    if (node) {																																	// 3) if current node exists, push node to stack, update node to left node
      stack.push(node);
      node = node.left;

    } else {																																		// 4) if current node does NOT exist

      node = stack.pop();																												// 5) update node/"visit" node/pop last node in stack
      path.push(node.val);																											// 6) push node val to path
      node = node.right;																												// 7) update node to right node
    }
  }

  return path;
}
// console.log(inOrderArrayIter(root));			//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]



// *****************************************************************************
// POSTORDER RECURSIVE
// - a node can only be "visited" once its left and right subtrees have been visited
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ] 
function postOrderArray(root) {
  if (!root) return [];
  let path = [];
  path = path.concat(postOrderArray(root.left));
  path = path.concat(postOrderArray(root.right));
  path.push(root.val);

  return path;
}
// console.log(postOrderArray(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]


// POSTORDER ITERATIVE
// - a node can only be "visited" once its left and right subtrees have been visited
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ] 
function postOrderArrayIter(root) {
  if (!root) return [];                                                         // 1) if no root, exit
  let stack = [ root ];                                                         // 2) initialize stack with root node
  let path = [];                                                                

  while (stack.length) {                                                        // 3) loop while stack NOT empty

    let node = stack.pop();                                                     // 4) remove last node from stack, set that node as current node
    
    path.unshift(node.val);                                                     // 5) insert currentNode's value to begin of path result
    // path.push(node.val);            
    
    if (node.left) stack.push(node.left);                                       // 6) if currentNode's left child exists, push to stack

    if (node.right) stack.push(node.right);                                     // 7) if currentNode's right child exists, push to stack
  }

  // return path.reverse(); // optional- can also reverse path if node pushed instead of unshifted
  return path;
}
// console.log(postOrderArrayIter(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]







