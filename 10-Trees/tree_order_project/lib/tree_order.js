// Note* Assume arrowheads point downards only
//      A
//     / \
//    B   C
//   / \   \
//  D   E   F

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
// IN ORDER-			   LEFT, SELF, RIGHT
// [TreeNode A] => [ 'd', 'b', 'e', 'a', 'c', 'f' ]
function inOrderArray(root) {
	if (root === null) return [];				// base case, if no node given
	// 1: root = A   false
	// 2: root = B	 false
	// 3: root = D	 false

	let path = [];

	path = inOrderArray(root.left);
	// 1: inOrderArray(B)			=> 					 path = [ 'd', 'b', 'e' ]
	// 2: inOrderArray(D)			=> [ 'd' ]   path = [ 'd' ]
	// 3: inOrderArray(null)	=> []

	path.push(root.val);
	// 3: [].push(D.val)											path = [ 'd' ]
	// 2: [ 'd' ].push(B.val)									path = [ 'd', 'b' ]
	// 1: [ [ 'd', 'b', 'e' ] ].push(A.val)		path = [ 'd', 'b', 'e', 'a' ]

	path = path.concat(inOrderArray(root.right));
	// 3: inOrderArray(null)  => []
	// 2: path = [ 'd', 'b' ].concat(inOrderArray(E)) = [ 'd', 'b' ].concat(['e]
	// 2: path = [ 'd', 'b', 'e' ]
	// 1: path = [ 'd', 'b', 'e', 'a' ].concat(inOrderArray(C))
 
	return path;
	// 3: [ 'd' ]
}
// console.log(inOrderArray(a));		=>   [ 'd', 'b', 'e', 'a', 'c', 'f' ]




// *****************************************************************************
// POST ORDER-			  LEFT, RIGHT, SELF
// [TreeNode A] => [ 'd', 'e', 'b', 'f', 'c', 'a' ]
function postOrderArray(root) {
	if (root === null) return [];

	let path = [];

	path = postOrderArray(root.left);
	path = path.concat(postOrderArray(root.right));
	path.push(root.val);

	return path;
}
console.log(postOrderArray(a));		//=> [ 'd', 'e', 'b', 'f', 'c', 'a' ]


module.exports = {
	inOrderArray,
	postOrderArray
};