// Notes From Reading:
// - Binary Tree = A tree where nodes have at most 2 children nodes
// - Binary Search Tree (BST) = 
//    - for any node, values in the left subtree must all be < nodes value
//    - values in the right subtree must all be >= nodes value
// - empty tree(0 nodes) = a BST
// - Traversing the tree IN ORDER results in visiting nodes: 1, 5, 7, 10, 16, 16
// Example of BST:
//       10
//      / \
//     5   16
//    / \    \
//   1   7    16


// *****************************************************************************
// 1) Naive BST Implementation
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}


class BST {
  constructor() {
    this.root = null;
  }

  // takes in value, and root node  =>  undefined
  insert(val, root=this.root) {
    if (!this.root) {                                                           // if tree is empty, make a new node and have it be the root
      this.root = new TreeNode(val);
      return;
    }

    // tree is not empty
    if (val < root.val) {                                                       // if val < root val
      if (!root.left) {                                                         //    and left child does NOT exist, make a node as roots left child
        root.left = new TreeNode(val);
      } else {                                                                  //    left child DOES exist, recursively insert on left child node
        this.insert(val, root.left);
      }

    } else {                                                                    // if val >= root val
      if (!root.right) {                                                        //    and right child does NOT exist, make a node as roots right child
        root.right = new TreeNode(val);
      } else {                                                                  //    left child DOES exist, recursively insert on right child node
        this.insert(val, root.right);
      }
    }
  }
}

// Examples:
// tree1 = new BST();
// tree1.insert(10);
// tree1.insert(5);
// tree1.insert(16);
// tree1.insert(1);
// tree1.insert(7);
// tree1.insert(16);
// TREE 1:
//       10
//      / \
//     5   16
//    / \    \
//   1   7    16

// tree2 = new BST();
// tree2.insert(1);
// tree2.insert(5);
// tree2.insert(7);
// tree2.insert(10);
// tree2.insert(16);
// tree2.insert(16);
// TREE 2:
//       1
//        \
//         5
//          \
//           7
//            \
//             10
//              \
//               16
//                \
//                 16
// 
// - Both trees above are BST's but TREE 2 looks terrible (height not balanced)


// *****************************************************************************
// 2) Implementing Binary Search on a BST
// Write #search method for the BST class (takes in value) => returns boolean
// Given a binary search tree and a target value, return a boolean indicating 
// whether or not the target is contained in the tree.
// tree1 = new BST();
// tree1.insert(10);
// tree1.insert(5);
// tree1.insert(16);
// tree1.insert(1);
// tree1.insert(7);
// tree1.insert(16);

// Examples:
// tree1.search(7);     // => true
// tree1.search(16);    // => true
// tree1.search(14);    // => false
// TREE 1:
//       10
//      / \
//     5   16
//    / \    \
//   1   7    16

// Solution:
BST.prototype.search = function(val, root=this.root) {
  if (!root) return false;                                                      // base case if BST is empty, return false

  if (val < root.val) {                                                         // if target val < root val, search left substree
    return this.search(val, root.left);
  } else if (val > root.val) {                                                  // if target val > root val, search right substree
    return this.search(val, root.right);
  } else {                                                                      // target val == root val, found!
    return true;
  }
}

// console.log(tree1.search(7));     // => true
// console.log(tree1.search(16));    // => true
// console.log(tree1.search(14));    // => false



// *****************************************************************************
// 3) HEIGHT BALANCE
// Height = number of edges between root and farthest leaf in a tree 
