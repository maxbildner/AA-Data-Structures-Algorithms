// LEETCODE LC 108 Convert Sorted Array to Binary Search Tree
// EASY
// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
// Given an array where elements are sorted in ascending order, convert it to a 
// height balanced BST. For this problem, a height - balanced binary tree is 
// defined as a binary tree in which the depth of the two subtrees of every node
// never differ by more than 1.
// Note* there may be more than 1 solution
// INPUT:  Array of node values (integers)
// OUTPUT: Tree Node (representing root)
// 
// Example:
// [-10, -3, 0, 5, 9]
// One possible answer is: [0, -3, 9, -10, null, 5], which represents the 
// following height balanced BST:
//       0
//      / \
//    -3   9
//    /   /
// - 10  5
// 
// class TreeNode {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }


// *****************************************************************************
// VERSION 1- RECURSIVE, Always choose middle node as root
// TIME COMPLEXITY:  O(N)   N = Length of array, since each node is visited once
// SPACE COMPLEXITY: O(N)   recursion stack?
// ([-10, -3, 0, 5, 9])     =>  Tree Node
function sortedArrayToBST(nums) {
  if (!nums.length) return null;                                                // 1) if no numbers, then return emptry tree (null)
  // make middle element of array the root of your tree
  // then make left half of array a subtree and the right half another subtree

  let midIdx = Math.floor(nums.length/2);                                       // 2) grab midIdx and midNum from array
  let midNum = nums[midIdx];
  let root = new TreeNode(midNum);                                              // 3) make midNum the val in a new tree node
  let left = nums.slice(0, midIdx);                                             
  let right = nums.slice(midIdx + 1);
  let leftSubtree = sortedArrayToBST(left);                                     // 4) recursively create left and right subtrees from left and right halves of array
  let rightSubtree = sortedArrayToBST(right);

  root.left = leftSubtree;                                                      // 5) connect left and right subtrees to root
  root.right = rightSubtree;

  return root;
}