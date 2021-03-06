// LEETCODE LC 110 Balanced Binary Tree
// EASY
// https://leetcode.com/problems/balanced-binary-tree/
// Given a binary tree, determine if it is height - balanced.
// For this problem, a height - balanced binary tree is defined as:
// a binary tree in which the left and right subtrees of every node differ in 
// height by no more than 1.
// INPUT:  Tree Node (representing root)
// OUTPUT: Boolean
// 
// Example 1:
// Given the following tree [3, 9, 20, null, null, 15, 7]:
//       3
//      / \
//     9  20
//       /  \
//      15   7
// Return true
// 
// Example 2:
// Given the following tree [1, 2, 2, 3, 3, null, null, 4, 4]:
//          1
//         / \
//        2   2
//       / \
//      3   3
//     / \
//    4   4
// Return false
// 
// Definition of Tree Node:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


// *****************************************************************************
// VERSION 1- AA SOLUTION, TOP DOWN RECURSIVE
// TIME COMPLEXITY:  O(N log(N)),    N = number of nodes in tree
//      N first N from = ?  helper function getHeight that's called d times (depth)
//      log(N) comes from = ?
// SPACE COMPLEXITY: O(N)            recursion stack may contain all nodes if tree is skewed/not balanced
// (Tree Node) => boolean 
function isBalanced(root) {
  if (!root) return true;                                                       // 1) base case if no tree/root, tree is balanced

  let heightDifference = getMaxHeight(root.left) - getMaxHeight(root.right);    // 2) find height difference of left and right subtrees

  let heightIsBalanced = Math.abs(heightDifference) <= 1;                       // 3) check if height difference is balanced

  return heightIsBalanced && isBalanced(root.left) && isBalanced(root.right);   // 4) recursively check all subtrees for balanced
}

// Helper function- Recursive
// TIME COMPLEXITY:   O(N),       N = number of nodes in tree
// SPACE COMPLEXITY:  O(N)        (worst case, tree completely unbalanced, and all nodes have to be visited/stack called)
// (root node) => height integer
function getMaxHeight(root) {
  if (!root) return -1;                                                         // 1) base case if there's no root, height = -1
  return Math.max(getMaxHeight(root.left), getMaxHeight(root.right)) + 1;       // 2) recursive call. "+ 1" is the height of the current root nodes height
}



// EXAMPLE 1:
//       a
//      / \
//     b   c
//       /  \
//      d    e
let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
a.left = b;
a.right = c;
c.left = d;
c.right = e;
console.log(isBalanced(a));       //=> true
// console.log(getMaxHeight(a));  //=> 2


// Example 2:
//          a
//         / \
//        b   c
//       / \
//      d   e
//     / \
//    f   g
a = new TreeNode('a');
b = new TreeNode('b');
c = new TreeNode('c');
d = new TreeNode('d');
e = new TreeNode('e');
f = new TreeNode('f');
g = new TreeNode('g');
a.left = b;
a.right = c;
b.left = d;
b.right = e;
d.left = f;
d.right = g;
console.log(isBalanced(a));         //=> false
// console.log(getMaxHeight(a));    //=> 3