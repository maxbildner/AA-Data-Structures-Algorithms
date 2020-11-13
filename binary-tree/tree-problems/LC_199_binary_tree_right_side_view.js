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



// *****************************************************************************
// SOLUTION V1- BFS, TWO QUEUES
//  use two queues: one for the current level, and one for the next. 
//  The idea is to pop the nodes one by one from the current level and push 
//  their children into the next level queue. Each time the current queue is 
//  empty, we have the right side element in hands.
// 
// 			 1      <--     currLevel = [ 1 ]
// 			/ \
// 		 2   3    <--     nextLevel = [ 2, 3 ]
// 			  / \
// 		   5   4  
//
// TIME COMPLEXITY:  O(N),   N = num nodes in tree 
// SPACE COMPLEXITY: O(D)    D = tree Diameter, to keep the queues


// EX: (TreeNode 1) =>  [ 1, 3, 4 ]
function rightSideView(root) {
  if (!root) return [];                                                         // edge case- if tree empty

  let rightSide = [];
  let currLevel;
  let nextLevel = [root];                                                       // initialize queue nextLevel w/ root
  let node;                                                                     // declare vars to track node, currLevel, rightSide

  while (nextLevel.length) {                                                    // loop while nextLevel not empty

    currLevel = nextLevel;                                                      //  - reassign currentLevel to nextLevel
    nextLevel = [];                                                             //  - reassign nextLevel to empty array

    while (currLevel.length) {                                                  //  - loop while currentLevel not empty

      node = currLevel.shift();                                                 //    - remove first node from currentLevel queue, save ref

      if (node.left) nextLevel.push(node.left);                                 //    - push left and right children to nextLevel (if they exist)
      if (node.right) nextLevel.push(node.right);
    }

    rightSide.push(node.val);                                                   //  - push current node val to rightSide, currLevel should be empty
  }

  return rightSide;
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