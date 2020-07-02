// Make a binary tree with node/values that look like this:
// Note* Assume arrowheads point downards only
//      A
//     / \
//    B   C
//   / \   \
//  D   E   F
//  
//  LEAF nodes = no children (Ex. DEF)

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode('a');                    // root node
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;                                   
a.right = c;
b.left = d;
b.right = e;
c.right = f;

// *****************************************************************************
// 1) IN ORDER:     LEFT,  ROOT,  RIGHT
// Prints out values of binary tree in order
// - Go all the down to left leaf, then back up/down
// Rules: 
// - A node can only be printed once its left subtree has been completely printed
// - a node's right subtree can only be printed once the node itself has been printed
// [TreeNode A]  => 'd b e a c f'
function inOrderPrint(root) {
  if (root === null) return;                  // base case if root is empty
  // 1: a === null     false
  // 2: b === null     false
  // 3: d === null     false
  // 4: null === null  true
  // 5: null === null  true


  inOrderPrint(root.left);                    // print all nodes in the left subtree
  // 1: inOrderPrint(b)

  // 2: inOrderPrint(d)
  // 3: inOrderPrint(null)

  console.log(root.val);                      // print root
  // 3: 'd'
  //    2: 'b'
  //    6: 'e'

  inOrderPrint(root.right);                   // print all nodes in the right subtree
  // 3: inOrderPrint(null)
  //    2: inOrderPrint(e)
}

// console.log(inOrderPrint(a));
// => 
// 'd'
// 'b'
// 'e'
// 'a'
// 'c'
// 'f'



// *****************************************************************************
// 2) PRE ORDER:    ROOT, LEFT, RIGHT
// print root
// print all nodes in the left subtree
// print all nodes in the right subtree
// Rules: 
// - a node must be printed before its children
// - a nodes left subtree must be printed before its right subtree
// [TreeNode A]  => 'a, b, d, e, c, f'
function preOrderPrint(root) {
  if (!root) return;

  console.log(root.val);
  preOrderPrint(root.left);
  preOrderPrint(root.right);
}
// console.log(preOrderPrint(a));
// => 
// 'a'
// 'b'
// 'd'
// 'e'
// 'c'
// 'f'



// *****************************************************************************
// 3) POST ORDER:    LEFT, RIGHT, ROOT
// print all nodes in the left subtree
// print all nodes in the right subtree
// print root
// Rules: 
// - a node can only be printed after it's left and right subtrees
// - a node's left subtree is printed before its right subtree
// [TreeNode A]  => 'd, e, b, f, c, a'
function postOrderPrint(root) {
  if (!root) return;

  postOrderPrint(root.left);
  postOrderPrint(root.right);
  console.log(root.val);
}
// console.log(postOrderPrint(a));
// => 
// 'd'
// 'e'
// 'b'
// 'f'
// 'c'
// 'a'