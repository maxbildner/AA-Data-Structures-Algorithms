// SIMILAR TO LEETCODE LC 104 Maximum Depth of Binary Tree
class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// EXAMPLE 1:
//      A
//     / \ 			                  = edge              
//    B   C			
//   / \   											  = edge
//  D   E                                  
//
let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
a.left = b;
a.right = c;
b.left = d;
b.right = e;
// DFS Order = A B D E C



// *****************************************************************************
// SOLUTION V1- RECURSIVE, uses DEPTH FIRST (DF) Traversal
// TIME COMPLEXITY:  O(N),			N = Number of nodes in tree
// SPACE COMPLEXITY: O(N)				worst case, tree unbalanced so recursion call would occur N times (each node only has a left child)
// Takes in root TreeNode, returns height of tree (i.e. max num of edges btwn the root and any leaf)
//                         returns -1 if tree is empty
//												 returns 0 if tree only has a root
// (TreeNode A)     =>   2
// (TreeNode W)     =>   3
function treeHeight(root) {
	if (!root) return -1;																													// if tree empty/no root, return -1
	return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));						
}

// EXAMPLE 1:
// console.log(treeHeight(a));					//=> 2

// EXAMPLE 2:
//     	  W
//     	 /  			                  = edge              
//    	X   			
//  	 /    											  = edge
// 	  Y
// 	 /    													= edge                                 
// 	Z
let w = new TreeNode('w');
let x = new TreeNode('x');
let y = new TreeNode('y');
let z = new TreeNode('z');
w.left = x;
x.left = y;
y.left = z;
// console.log(treeHeight(w));					//=> 3


module.exports = {
	treeHeight
};