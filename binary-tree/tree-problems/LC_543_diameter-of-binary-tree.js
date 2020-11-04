// LEETCODE LC 543 Diameter of Binary Tree
// EASY
// https://leetcode.com/problems/diameter-of-binary-tree/
// Given a binary tree, you need to compute the length of the diameter of the 
// tree. The diameter of a binary tree is the length of the longest path between 
// any two nodes in a tree. This path may or may not pass through the root.
//
// INPUT:  Tree Node (representing root)
// OUTPUT: integer
// 
// Example 1:
// Given the following tree:
//       1
//      / \
//     2   3
//    /  \
//   4    5
// Return 3, length of path [4, 2, 1, 3] or [5, 2, 1, 3]
// 
// - length of path between two nodes = the number of EDGES between them
//          
// Definition of Tree Node:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// NOTES
// MAX DEPTH (tree)= # NODES root to leaf (longest path)                        LEETCODE Definition
// HEIGHT (tree) = height of root node or deepest node (i.e. MAX DEPTH)         STACK OVERFLOW
// DIAMETER or WIDTH (tree) = # NODES between any two leaf nodes (longest path) STACK OVERFLOW
// DIAMETER or WIDTH (tree) = # EDGES between any two leaf nodes (longest path) LEETCODE
// DEPTH (node) = # EDGES root to leaf (longest path)                           STACK OVERFLOW



// *****************************************************************************
// VERSION 1- DFS, recursive
// TIME COMPLEXITY:  O(N),    N = number of nodes in tree
// SPACE COMPLEXITY: O(N)     call stack 

// TreeNode 1  =>  3
function diameterOfBinaryTree(root) {
  let diameter = 0;

  // 1) helper function, that:
  //    1- calculates maxDepth of a tree, given a root node
  //       maxDepth = #NODES
  //    2- keeps updating the max diameter of the tree
  function maxDepth(node) {

    if (!node) return 0;                                                        // 2) base case- if no node, depth is 0

    let left = maxDepth(node.left);                                             // 3) recursively calculate left and right subtree depths
    let right = maxDepth(node.right);

    diameter = Math.max(diameter, left + right);                                // 5) update diameter = greater of current diameter and sum of left + right subtree depths

    return Math.max(left, right) + 1;                                           // 4) maxDepth is the greater of the left and right subtrees (for every node)
  }

  maxDepth(root);                                                               // call helper, and return diameter

  return diameter;
}


// EXAMPLE 1:
//       1
//      / \
//     2   3
//    / \
//   4   5
let one = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
one.left = two;
one.right = three;
two.left = four;
two.right = five;
console.log(diameterOfBinaryTree(one));       //=> 3


// EXAMPLE 2: diameter doesn't pass through root
//          1
//         / \
//        2   3
//       / \
//      4   5
//     /     \
//    6       7
//   /         \
//  8           9
one = new TreeNode(1);
two = new TreeNode(2);
three = new TreeNode(3);
four = new TreeNode(4);
five = new TreeNode(5);
let six = new TreeNode(6);
let seven = new TreeNode(7);
let eight = new TreeNode(8);
let nine = new TreeNode(9);
one.left = two;
one.right = three;
two.left = four;
two.right = five;
four.left = six;
six.left = eight;
five.right = seven;
seven.right = nine;
console.log(diameterOfBinaryTree(one));       //=> 6
