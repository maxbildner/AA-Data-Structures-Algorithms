// Note* Assume arrowheads point downards only
//      A
//     / \
//    B   C
//   / \   \
//  D   E   F

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
// PRE ORDER RECURSIVE-  S, L, R
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ A, B, D, E, C, F ]
function preOrderArray(root) {
	let path = [];
	if (!root) return [];

	path.push(root.val);
	path = path.concat(preOrderArray(root.left));
	path = path.concat(preOrderArray(root.right));

	return path;
}


// PRE ORDER ITERATIVE
// (TreeNode A) => [ A, B, D, E, C, F ]
// (TreeNode B)	=> [ B, D, E ]
function preOrderArrayIter(root) {
	let path = [];
	let stack = [root];

	while (stack.length) {																												// loop while stack is NOT empty
		let node = stack.pop(root);																									// "visit" root node/top of stack
		path.push(node.val);																												// push current node val to path

		if (node.right) stack.push(node.right);																			// add right/left nodes of current node to stack
		if (node.left) stack.push(node.left);
	}

	return path;
}


// *****************************************************************************
// IN ORDER RECURSIVE - L, S, R
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArray(root) {								// L, S, R
	let path = [];
	if (!root) return [];
	path = inOrderArray(root.left);
	path.push(root.val);
	path = path.concat(inOrderArray(root.right));
	return path;
}


// IN ORDER ITERATIVE 
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArrayIter(root) {
	let path = [];
	let stack = [];
	let node = root;

	while (stack.length || node) {
		if (node) {
			stack.push(node);
			node = node.left;

		} else {
			node = stack.pop();
			path.push(node.val);
			node = node.right;
		}
	}

	return path;
}



// *****************************************************************************
// POSTORDER RECURSIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ]
function postOrderArray(root) {
	let path = [];
	if (!root) return [];
	path = path.concat(postOrderArray(root.left));
	path = path.concat(postOrderArray(root.right));
	path.push(root.val);
	return path;
}


module.exports = {
	inOrderArray,
	postOrderArray
};


// console.log(preOrderArray(root));				//=> [ A, B, D, E, C, F ]
// console.log(inOrderArray(root));					//=> [ D, B, E, A, C, F ]
// console.log(postOrderArray(root));				//=> [ D, E, B, F, C, A ]

// console.log(preOrderArrayIter(root));		//=> [ A, B, D, E, C, F ]
// console.log(inOrderArrayIter(root));			//=> [ D, B, E, A, C, F ]