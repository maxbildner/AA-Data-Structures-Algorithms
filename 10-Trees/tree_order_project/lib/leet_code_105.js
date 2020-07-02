// LC 105 Construct Binary Tree from Preorder and Inorder Traversal
// MEDIUM
// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// Given preorder and inorder traversal of a tree, construct the binary tree.
// Note: !!! You may assume that duplicates do not exist in the tree.
// 2 arrays are given to result in a unique output
// 
// INPUT:  2 arrays of numbers. Numbers refer to values in nodes
// 		preorder = [3, 9, 20, 15, 7]
// 		inorder  = [9, 3, 15, 20, 7]
// OUTPUT: TreeNode Object that represents the root node (ex. 3 below)
// 			 3
// 			/ \
// 		 9  20
// 			 /  \
// 		  15   7
//
// Leetcode Definition for a binary tree node:
// function TreeNode(val, left, right) {
// 		this.val = (val===undefined ? 0 : val)
// 		this.left = (left===undefined ? null : left)
// 		this.right = (right===undefined ? null : right)
// }


// const { TreeNode } = require('./tree_node.js');
class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}


// *****************************************************************************
// SOLUTION V1- AA SOLUTION (extremely slow only faster than 5% of JS submissions)
// TIME COMPLEXITY: O( ? ),   N = ?
// SPACE CPMLEXITY: O( ? )
// EX: ([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])			=>   [TreeNode]
function buildTree(preorder, inorder) {
	if (preorder.length === 0 && inorder.length === 0) return null;								// base case if preorder & inorder are empty. Null represents no tree
	
	let rootVal = preorder[0];																										// first element of preorder must be the root by definition!
	let root = new TreeNode(rootVal);																							// create TreeNode object from rootVal
	// 1: rootVal = 3

	// need to check where rootVal is in the inorder array
	// this also tells us which elements are to the left and right of the root, so we can call this middle index!
	let midIdx = inorder.indexOf(rootVal);																				
	// 1: midIdx = [9, 3, 15, 20, 7].inddexOf(3)   =  1
	let leftInorder = inorder.slice(0, midIdx);																		// grab all elements to left of root (exclusive of root)
	let rightInorder = inorder.slice(midIdx + 1);																	// grab all elements to right of root (exlcusive of root);
	// 1: leftInorder = [ 9 ]			rightInorder = [ 15, 20, 7 ]

	// at anytime, preorder/inorder elements should be the same, but in different order
	let leftPreorder = preorder.filter(val => leftInorder.includes(val));					// filter preorder for vals that are in leftInorder (preserves ordering)
	// 1: leftPreorder = [3, 9, 20, 15, 7].filter[9]							= [ 9 ]
	let rightPreorder = preorder.filter(val => rightInorder.includes(val));				// filter preorder for vals that are in rightInorder (preserves ordering)
	// 1: leftPreorder = [3, 9, 20, 15, 7].filter[ 15, 20, 7 ]		= [ 20, 15, 7 ]

	let leftSubTree = buildTree(leftPreorder, leftInorder);												// recursive call to get root node of Left substree
	let rightSubTree = buildTree(rightPreorder, rightInorder);										// recursive call to get root node of Right substree

	root.left = leftSubTree;																											// update root to point at correct left and right subtree root nodes
	root.right = rightSubTree;

	return root;
}


// TEST:
// let preOrder = [3, 9, 20, 15, 7];
// let inOrder  = [9, 3, 15, 20, 7];
// console.log(buildTree(preOrder, inOrder));			
//=> 
// TreeNode {
// 	val: 3,
// 	left: TreeNode { val: 9, left: null, right: null },
// 	right:
// 		TreeNode {
// 			val: 20,
// 			left: TreeNode { val: 15, left: null, right: null },
// 			right: TreeNode { val: 7, left: null, right: null }
// 		}
// }