// LC 108 Convert Sorted Array to Binary Search Tree
// EASY
// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
//
// Given an array where elements are sorted in ascending order, convert it to a 
// height balanced BST.
// For this problem, a height - balanced binary tree is defined as a binary tree 
// in which the depth of the two subtrees of every node never differ by more 
// than 1.
// 
// INPUT:  Array of integers
// OUTPUT: TreeNode (root)
// 
// EXAMPLE 1:
// Given the sorted array: [-10, -3, 0, 5, 9],
// One possible answer is: [0, -3, 9, -10, null, 5], which represents the 
// following height balanced BST:
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
//
// Definition of TreeNode:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


// TIME: 26MIN
// *****************************************************************************
// VERSION 1- 
// TIME COMPLEXITY:  O(N),			N = number of nodes (length of array)
// SPACE COMPLEXITY: O(N)		    N + log(N)    N for output, log(N) for recursive stack

// (Array)                => TreeNode
// [ -10, -3, 0, 5, 9 ]   => TreeNode
var sortedArrayToBST = function (nums) {
  
};

// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -3
// console.log(rootResult.right.val);                        //=> 9
// console.log(rootResult.left.left.val);                    //=> -10
// console.log(rootResult.right.left.val);                   //=> 5






// *****************************************************************************
// VERSION 2- less memory (no slicing)
// TIME COMPLEXITY:  O(N),			N = number of nodes (length of array)
// SPACE COMPLEXITY: O(N)		    N + log(N)    N for output, log(N) for recursive stack

// (Array)                => TreeNode
// [ -10, -3, 0, 5, 9 ]   => TreeNode
//     0   1  2  3  4
var sortedArrayToBST = function (nums) {

}



// // EXAMPLE 1:
// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// // Tree looks like:
// // 			 0
// // 			/ \
// // 		-10  5
// // 		  \	  \
// // 		  -3   9
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -10
// console.log(rootResult.right.val);                        //=> 5
// console.log(rootResult.left.right.val);                   //=> -3
// console.log(rootResult.right.right.val);                  //=> 9

// EXAMPLE 2:
// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -3
// console.log(rootResult.right.val);                        //=> 9
// console.log(rootResult.left.left.val);                    //=> -10
// console.log(rootResult.right.left.val);                   //=> 5