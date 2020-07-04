class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// EXAMPLE 1 NODE Positions:
//      A
//     / \                                 
//    B   C			
//   / \   \
//  D   E   F                               
//
// VALUES:
//      10
//     / \                                 
//   -4   3			
//   / \   \
//  6   2   2                               
//
let a = new TreeNode(10);
let b = new TreeNode(-4);
let c = new TreeNode(3);
let d = new TreeNode(6);
let e = new TreeNode(2);
let f = new TreeNode(2);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
// DFS Order = A B D E C F


// 10MIN
// *****************************************************************************
// SOLUTION V1- ITERATIVE, uses DF Depth First Traversal
// Takes in root TreeNode, returns sum of all node values in the tree
//                         returns 0 if tree is empty
// 
// (TreeNode A)     =>   19
// (TreeNode D)     =>   16
function treeSum(root) {
	if (root === null) return 0;
	let stack = [ root ];													// 1) use stack array with root node
	let sum = 0;

	while (stack.length > 0) {										// 2) loop while stack is not empty
		let node = stack.pop();											// 3) remove last node in stack
		sum += node.val;														// 4) add node's value to sum
		if (node.right) stack.push(node.right);			// 5) add right, then left nodes to stack if they exist
		if (node.left) stack.push(node.left);
	}

	return sum;
}

// console.log(treeSum(a));			//=> 19
// console.log(treeSum(d));			//=> 6
// console.log(treeSum(null));	//=> 0


module.exports = {
	treeSum
};