// LC 199 Binary Tree Right Side View
// MEDIUM
// https://leetcode.com/problems/binary-tree-right-side-view/
// Given a binary tree, imagine yourself standing on the right side of it, 
// return the values of the nodes you can see ordered from top to bottom.
// return empty array if tree empty
// 
// EX 1
// INPUT:  TreeNode (root)  [ 1, 2, 3, null, 5, null, 4 ]
// OUTPUT: array [ 1, 3, 4 ]
// 			 1      <-- 
// 			/ \
// 		 2   3    <--
// 			  / \
// 		   5   4  <--
//
// EXAMPLE 2:
// OUTPUT = [ 1, 3, 5 ]
// 			 1     <-- 
// 			/ \
// 		 2   3   <-- 
// 		/	\    
// 	 4   5     <-- 
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



// TIME: 32min (11/14/20)
// *****************************************************************************
// SOLUTION V1- 
// Right Side = [ 1, 3, 5 ]
//
// 			 1      <--     currLevel = [ 1 ]     when this empty, last node removed is farthest right, and nextLevel is full
// 			/ \
// 		 2   3    <--     nextLevel = [ 2, 3 ]  then this becomes the currLevel, and nextLevel reset to empty
// 	  / \
// 	 4   5
//
// TIME COMPLEXITY:  O(N),   N = num nodes in tree 
// SPACE COMPLEXITY: O(D)    D = tree Diameter, to keep the queues
               

// EX: (TreeNode 1) =>  [ 1, 3, 5 ]
function rightSideView(root) {
  
};


// EXAMPLE 1:
// OUTPUT = [ 1, 3, 4 ]
// 			 1      <-- 
// 			/ \
// 		 2   3    <--
// 			  / \
// 		   5   4  <--
let one = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
one.left = two;
one.right = three;
three.left = five;
three.right = four;
console.log(rightSideView(one));    //=> [ 1, 3, 4 ]


// EXAMPLE 2:
// OUTPUT = [ 1, 3, 5 ]
// 			 1     <-- 1
// 			/ \
// 		 2   3   <-- 3
// 		/	\    
// 	 4   5     <-- 5
one = new TreeNode(1);
two = new TreeNode(2);
three = new TreeNode(3);
four = new TreeNode(4);
five = new TreeNode(5);
one.left = two;
one.right = three;
two.left = four;
two.right = five;
console.log(rightSideView(one));    //=> [ 1, 3, 5 ]


// EXAMPLE 3:
// OUTPUT = []
console.log(rightSideView());       //=> []