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
  let max = 0;

  // helper function that:
  // - returns maxDepth of tree
  // - keeps track/updates max diameter at each node
  function maxDepth(node) {
    if (!node) return 0;                      // base case, if no node/null, tree has 0 depth
    // 1:   N1    false  
    // 2:   N2    false  
    // 3:   N4    false  
    // 4:   null  true
    // 5:   null  true
    // 6:   N5    false
    // 7:   null  true
    // 8:   null  true
    // 9:   N3    false
    // 10:  null  true
    // 11:  null  true

    let left = maxDepth(node.left);           // calculate maxDepth of left subtree
    // 1:   left = maxDepth(N2)   = 2
    // 2:   left = maxDepth(N4)   = 1
    // 3:   left = maxDepth(null) = 0
    // 6:   left = maxDepth(null) = 0
    // 9:   left = maxDepth(null) = 0

    let right = maxDepth(node.right);         // calculate maxDepth of right subtree
    // 3:   right = maxDepth(null) = 0
    // 2:   right = maxDepth(N5)   = 1
    // 6:   right = maxDepth(null) = 0
    // 1:   right = maxDepth(N3)   = 1
    // 9:   right = maxDepth(null) = 0

    max = Math.max(max, left + right);        // meat and pototoes! update diameter at every node
    // 3:   max = max(0, 0 + 0)    = 0
    // 6:   max = max(0, 0 + 0)    = 0
    // 2:   max = max(0, 1 + 1)    = 2
    // 9:   max = max(2, 0 + 0)    = 2
    // 1:   max = max(2, 2 + 1)    = 3

    return Math.max(left, right) + 1;         // update current node depth
    // 3:   max(0, 0) + 1       = 1
    // 6:   max(0, 0) + 1       = 1
    // 2:   max(1, 1) + 1       = 2
    // 9:   max(0, 0) + 1       = 1
    // 1:   max(2, 1) + 1       = 3
  }

  maxDepth(root);

  return max;
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
