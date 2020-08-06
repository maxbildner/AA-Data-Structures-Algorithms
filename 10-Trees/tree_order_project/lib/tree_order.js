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
	let path = [];																																// initialze stack w/ root node in it
	let stack = [root];

	while (stack.length) {																												// while loop stack is NOT empty

		let node = stack.pop();																											// "visit" root node/top of stack by popping last node in stack

		path.push(node.val);																												// push current node val to path

		if (node.right) stack.push(node.right);																			// add right/left children of current node to stack
		if (node.left) stack.push(node.left);
	}

	return path;
}
// console.log(preOrderArrayIter(root));		//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]



// *****************************************************************************
// IN ORDER RECURSIVE 
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArray(root) {
	if (!root) return [];
	let path = [];

	path = path.concat(inOrderArray(root.left))
	path.push(root.val);
	path = path.concat(inOrderArray(root.right));

	return path;
}
// console.log(inOrderArray(root));					//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]


// IN ORDER ITERATIVE 
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArrayIter(root) {
	let path = [];																																// initialize empty stack, and current node to root
	let stack = [];
	let node = root;

	while (stack.length || node) {																								// loop while stack NOT empty OR node exists

		if (node) {																																	// if current node exists, push node to stack, update node to left node
			stack.push(node);
			node = node.left;

		} else {																																		// if current node does NOT exist

			node = stack.pop();																												// update node"visit" node/pop last node in stack
			path.push(node.val);																											// push node val to path
			node = node.right;																												// update node to right node
		}
	}

	return path;
}
// console.log(inOrderArrayIter(root));			//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]



// *****************************************************************************
// POSTORDER RECURSIVE
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


module.exports = {
	inOrderArray,
	postOrderArray
};






