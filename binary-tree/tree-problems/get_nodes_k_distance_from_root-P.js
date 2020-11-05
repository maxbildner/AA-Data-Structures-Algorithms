// https://www.geeksforgeeks.org/print-nodes-at-k-distance-from-root/
// Print nodes at k distance from root
// Given a root of a tree, and an integer k. 
// return an array of  all the nodes which are at k distance from root.
// For example, in the below tree, 4, 5 & 8 are at distance 2 from root.
//       1               level 0
//     /   \
//   2      3            level 1
//  /  \    /
// 4    5  8          <- level 2  get all nodes at this level 

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}



// N1, 2    => [4, 5, 8]
// N1, 1    => [2, 3]
function getNodesKDistanceFromRoot(node, k) {
  
}

let root = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
let eight = new TreeNode(8);
root.left = two;
root.right = three;
two.left = four;
two.right = five;
three.left = eight;

console.log(getNodesKDistanceFromRoot(root, 2));    //=> [ 4, 5, 8 ]
console.log(getNodesKDistanceFromRoot(root, 1));    //=> [ 2, 3 ]
console.log(getNodesKDistanceFromRoot(root, 0));    //=> [ 1 ]


























// *****************************************************************************
// DYNASTY PROBLEM
// https://leetcode.com/discuss/interview-question/759958/walmart-oa-dynasty-problem
// for any person at position i, 
// his/her 2 children are at positions (2i + 1) and (2i + 2)
// input 1: array respresenting family tree
// input 2: person whose siblings we're looking for
// 
// Ex.
// [ 1, 2, 3, 4, 5, 6 ], 5    => [ 4, 6 ]
// Tree:
//      1         <- root has no siblings
//    /   \
//   2     3      <- 2 and 3 are siblings
//  / \    /  
// 4   5  6       <- 4, 5, and 6 are siblings

// [ 1, 2, 3, 4, 5, 6 ], 5    => [ 4, 6 ]
function getAllSiblings(ancestors, person) {

}

// console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 5));   //=> [ 4, 6 ]
// console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 3));   //=> [ 2 ]
// console.log(getAllSiblings([1, 2, 3, 4, 5], 1));      //=> [ -1 ]


// Helper function, takes in array of integers, and returns tree node (root)
// TIME COMPLEXITY:  O(N)    N = length of array
// SPACE COMPLEXITY: O(N)    creating queue
// [ 1, 2, 3, 4, 5, 6 ]   => TreeNode 1
//   0  1  2  3  4  5
function createTree(arr) {

}

// EXAMPLE 1
// let tree = createTree([1, 2, 3, 4, 5, 6]);      
// console.log(tree);                              //=> TreeNode 1
// console.log(tree.val);                          //=> 1
// console.log(tree.left.val);                     //=> 2
// console.log(tree.right.val);                    //=> 3
// console.log(tree.left.left.val);                //=> 4
// console.log(tree.left.right.val);               //=> 5
// console.log(tree.right.left.val);               //=> 6
// console.log(tree.right.right);                  //=> null
// Tree:
//      1         <- root has no siblings
//    /   \
//   2     3      <- 2 and 3 are siblings
//  / \    /  
// 4   5  6       <- 4, 5, and 6 are siblings



// Helper function, given tree root node, and person value, return level
// Ex. (N1, 5)    => 2
function getLevel(root, value) {
  
}

// EXAMPLE 1
// let tree = createTree([1, 2, 3, 4, 5, 6]);      
// console.log(getLevel(tree, 4));               //=> 2
// console.log(getLevel(tree, 5));               //=> 2
// console.log(getLevel(tree, 6));               //=> 2
// console.log(getLevel(tree, 2));               //=> 1
// console.log(getLevel(tree, 3));               //=> 1
// console.log(getLevel(tree, 1));               //=> 0
// console.log(getLevel(null, 1));               //=> null
//      1         <- level 0
//    /   \
//   2     3      <- level 1
//  / \    /  
// 4   5  6       <- level 2