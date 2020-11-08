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
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}













// *****************************************************************************
// TIME COMPLEXITY:  O(N^2), ?  N = num nodes in tree 
// SPACE COMPLEXITY: O(N) 

// EX: ([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])			=>   [TreeNode]
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0 && inorder.length === 0) return null;               // exit if tree empty

  let rootVal = preorder[0];                                                    // grab root val (1st ele in preorder is always root)

  let root = new TreeNode(rootVal);                                             // create root TreeNode

  let midIdx = inorder.indexOf(rootVal);                                        // find idx in inorder of root

  let inOrderLeft = inorder.slice(0, midIdx);                                   // grab left children of root

  let inOrderRight = inorder.slice(midIdx + 1);                                 // grab right children of root

  let preOrderLeft = preorder.filter(num => inOrderLeft.includes(num));         // filter preorder for only left children of root
  let preOrderRight = preorder.filter(num => inOrderRight.includes(num));       // filter preorder for only right children of root

  root.left = buildTree(preOrderLeft, inOrderLeft);                             // recursively build left and right subtrees
  root.right = buildTree(preOrderRight, inOrderRight);

  return root;
}

// TEST:
// let preOrder = [3, 9, 20, 15, 7];
// let inOrder  = [9, 3, 15, 20, 7];
// console.log(buildTree(preOrder, inOrder));			//=> 
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




// TIME: 26m
// *****************************************************************************
// TIME COMPLEXITY:  O(N^2), ?  N = num nodes in tree 
// SPACE COMPLEXITY: O(N) 

// EX: ([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])			=>   [TreeNode]
var buildTree = function (preorder, inorder) {

}

// TEST:
let preOrder = [ 3, 9, 20, 15, 7 ];
let inOrder = [ 9, 3, 15, 20, 7 ];
console.log(buildTree(preOrder, inOrder));			//=> 
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