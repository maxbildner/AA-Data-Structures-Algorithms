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


// *****************************************************************************
// SOLUTION V1- RECURSIVE

// N1, 2    => [4, 5, 8]
// N1, 1    => [2, 3]
function getNodesKDistanceFromRoot(node, k) {  
  if (!node) return [];                                                         // 1) edge case, if no node given, return empty array
  
  let nodes = [];                                                               // 2) initialize empty array nodes to return

  if (k === 0) {                                                                // 3) if k = 0, return the current node val in an array
    nodes.push(node.val);

  } else {                                                                      // 4) else (k !=0 ) update nodes by recursively concatenating nodes with left/right node, and shrink k by 1
    nodes = nodes.concat(getNodesKDistanceFromRoot(node.left, k - 1));    
    nodes = nodes.concat(getNodesKDistanceFromRoot(node.right, k - 1));
  }

  return nodes;
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

// console.log(getNodesKDistanceFromRoot(root, 2));    //=> [ 4, 5, 8 ]
// console.log(getNodesKDistanceFromRoot(root, 1));    //=> [ 2, 3 ]
// console.log(getNodesKDistanceFromRoot(root, 0));    //=> [ 1 ]

























// *****************************************************************************
// DYNASTY PROBLEM- uses 3 helper functions
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

  // edge case
  if (person === 1) return [ - 1];

  // 1) create tree from ancestors array
  let tree = createTree(ancestors); 

  // 2) get depth (level) of person
  let level = getLevel(tree, person);

  // 3) get all nodes at depth/level, store in array (use helper function getNodesKDistanceFromRoot)
  let siblings = getNodesKDistanceFromRoot(tree, level);

  // 4) filter out person from nodes array
  siblings = siblings.filter(val => val !== person);
  return siblings;
}

console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 5));   //=> [ 4, 6 ]
console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 3));   //=> [ 2 ]
console.log(getAllSiblings([1, 2, 3, 4, 5], 1));      //=> [ -1 ]


// Helper function, takes in array of integers, and returns tree node (root)
// TIME COMPLEXITY:  O(N)    N = length of array
// SPACE COMPLEXITY: O(N)    creating queue
// [ 1, 2, 3, 4, 5, 6 ]   => TreeNode 1
//   0  1  2  3  4  5
function createTree(arr) {
  
  // if arr empty, exit
  if (!arr.length) return null;
    
  // create var to hold root node (return later)
  let root;

  // initialize queue with Node (that has val of first ele in array)
  let queue = [ new TreeNode(arr[0]) ];

  // loop through all numbers in array
  for (let i = 0; i < arr.length; i++) {

    // remove first node from queue, store in var
    let node = queue.shift();

    // capture root node
    if (i === 0) root = node;
    
    // grab 2 positions of two children
    let child1Idx = 2*i + 1;
    let child2Idx = 2*i + 2;

    // grab children and create nodes (if person exists at index) 
    let child1 = null;
    let child2 = null;
    if (arr[child1Idx]) child1 = new TreeNode(arr[child1Idx]);
    if (arr[child2Idx]) child2 = new TreeNode(arr[child2Idx]);

    // assign children to parent node
    node.left = child1;
    node.right = child2;

    // push left and right childs to queue (if they exist)
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
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
  if (!root) return null;
  
  // helper helper function
  function getLevelUtil(node, data, level) {
    if (!node) return 0;
    if (node.val === value) return level;

    let downLevel = getLevelUtil(node.left, data, level + 1);
    if (downLevel != 0) return downLevel;

    downLevel = getLevelUtil(node.right, data, level + 1);
    return downLevel;
  }

  return getLevelUtil(root, value, 0);
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