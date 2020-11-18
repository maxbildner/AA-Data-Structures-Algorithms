// 3 DEPTH FIRST TRAVERSAL ALGORITHMS (PRE, IN, POST ORDER)
// RECURSIVELY AND ITERATIVELY
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let root = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

root.left = b;
root.right = c;
b.left = d;
b.right = e;
c.right = f;
// Note* Assume arrowheads point downards only
// 			A
//		 / \
//	  B		C
//	 / \   \
//	D   E	  F


// TIME: 17Min (11/16/20)
// *****************************************************************************
// DEPTH FIRST- PRE ORDER RECURSIVE-  
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ A, B, D, E, C, F ]
function preOrderArray(root) {

}
// console.log(preOrderArray(root));				//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]


// TIME: 10Min (11/16/20)
// DEPTH FIRST- PRE ORDER ITERATIVE
// (TreeNode A) => [ A, B, D, E, C, F ]
// (TreeNode B)	=> [ B, D, E ]
function preOrderArrayIter(root) {

}  
// console.log(preOrderArrayIter(root));		//=> [ 'a', 'b', 'd', 'e', 'c', 'f' ]



// TIME: 11Min (11/16/20)
// *****************************************************************************
// DEPTH FIRST- IN ORDER RECURSIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArray(root) {

}
// console.log(inOrderArray(root));					//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]


// TIME: 22Min (11/18/20)
// DEPTH FIRST- IN ORDER ITERATIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, B, E, A, C, F ]
// (TreeNode B)	=> 	[ D, B, E ]
// (TreeNode D)	=> 	[ D ]
function inOrderArrayIter(root) {

}
// console.log(inOrderArrayIter(root));			//=> [ 'd', 'b', 'e', 'a', 'c', 'f' ]



// TIME: 11Min (11/18/20)
// *****************************************************************************
// DEPTH FIRST- POSTORDER RECURSIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ]
function postOrderArray(root) {

}
// console.log(postOrderArray(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]



// TIME: 10Min (11/18/20)
// DEPTH FIRST- POSTORDER ITERATIVE
// (TreeNode)   => 	Array
// (TreeNode A)	=> 	[ D, E, B, F, C, A ]
function postOrderArrayIter(root) {

}
// console.log(postOrderArrayIter(root));				//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]






