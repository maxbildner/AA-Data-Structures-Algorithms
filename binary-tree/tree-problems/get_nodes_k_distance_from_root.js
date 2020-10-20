// https://www.geeksforgeeks.org/print-nodes-at-k-distance-from-root/
// Print nodes at k distance from root
// Given a root of a tree, and an integer k. Print all the nodes which are at k 
// distance from root.
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


// function getNodesKDistanceFromRoot(node, k) {
//   if (!node) return;
//   if (k === 0)   {
//     console.log(node.val + " ");
//   } else {
//     getNodesKDistanceFromRoot(node.left, k - 1);
//     getNodesKDistanceFromRoot(node.right, k - 1);
//   }
// }


// N1, 2    => [4, 5, 8]
function getNodesKDistanceFromRoot(node, k) {
  if (!node) return [];

  let nodes = [];

  if (k === 0)   {
    nodes.push(node.val);

  } else { 
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


// https://leetcode.com/discuss/interview-question/759958/walmart-oa-dynasty-problem
// for any person at position i, 
// his/her 2 children are at positions (2i + 1) and (2i + 2)
// input 1: array respresenting family tree
// input 2: person whose siblings we're looking for
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
  // 1) create tree from ancestors array

  // 2) get depth (level) of person
  // 3) get all nodes at depth/level, store in array
  // 4) filter out person from nodes array
}

// console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 5));   //=> [ 4, 6 ]
// console.log(getAllSiblings([1, 2, 3, 4, 5, 6], 3));   //=> [ 2 ]
// console.log(getAllSiblings([1, 2, 3, 4, 5], 1));      //=> [ -1 ]


// [ 1, 2, 3, 4, 5, 6 ]   => TreeNode 1
function createTree(arr) {
  
  // if arr empty, exit
  if (!arr.length) return null;

  // // treat arr like a queue
  // let queue = arr;

  let root = new TreeNode(queue[0]);
  // root = 1   queue = [ 1, 2, 3, 4, 5, 6 ]

  // current position in array
  // let i = 0;

  // while (queue.length) {
    // 1:   queue = [ 1, 2, 3, 4, 5, 6 ]
    // let node = new TreeNode(queue.shift());
    // 1:   node = {val:1}    queue = [ 2, 3, 4, 5, 6 ]
    
  let root = new TreeNode(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    let person = arr[i];
    // i = 0:   person = 1
    // i = 1:   person = 2

    let node = new TreeNode(person);
    // i = 0:   node = {val:1}    
    // i = 1:   node = {val:2}    

    // capture root node
    if (i === 0) root = node;
    
    // grab 2 positions of two children
    let child1Idx = 2*i + 1;
    let child2Idx = 2*i + 2;
    // i = 0:   child1Idx = 1   child2Idx = 2

    // grab children and create nodes
    let child1 = new TreeNode(arr[child1Idx]);
    let child2 = new TreeNode(arr[child2Idx]);
    // i = 0:   child1 = {val:2}      child2 = {val:3}

    // assign children to parent node
    node.left = child1;
    node.right = child2;
    // i = 0:   node = { val:1, left:{val:2}, right:{val:3} }
  }

  return root;
}

