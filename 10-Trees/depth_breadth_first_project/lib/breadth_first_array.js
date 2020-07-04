class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// EXAMPLE 1:
//      A
//     / \                                  = Level 0
//    B   C			B and C are siblings    = Level 1
//   / \   \
//  D   E   F                               = Level 2
//
let a = new TreeNode('a');                  // root node
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
//
// BFS Order = A B C D E F



// *****************************************************************************
// SOLUTION V1- ITERATIVE
// Takes in root TreeNode, returns array with node values in BFS order (left to right)
// BFS = Will visit all the nodes on a current level before moving down to the 
//      next level. (Move laterally before going down deeper)
// 
// (TreeNode A)    				=>      				['a', 'b', 'c', 'd', 'e', 'f']
function breadthFirstArray(root) {
	let queue = [root];																														// 1) use lazy Queue array (shift, push)
	// queue = [ A ]
	
	let result = [];

	while (queue.length > 0) {																										// 2) loop while queue is not empty
		// 1: [ A ].length !== 0						1 !== 0		true
		// 2: [ B, C ].length !== 0					2 !== 0		true
		// 3: [ C, D, E ].length !== 0			3 !== 0		true
		// 4: [ D, E, F ].length !== 0			3 !== 0		true
		// 5: [ E, F ].length !== 0					2 !== 0		true
		// 6: [ F ].length !== 0						1 !== 0		true

		let node = queue.shift();																										// 3) remove first node from queue
		// 1: node = A,			result = [ ]      						queue = [ ]
		// 2: node = B,			result = [ A ]      					queue = [ C ]
		// 3: node = C,			result = [ A, B ]     				queue = [ D, E ]
		// 4: node = D,			result = [ A, B, C ]  				queue = [ E, F ]
		// 5: node = E,			result = [ A, B, C, D ]  			queue = [ F ]
		// 6: node = F,			result = [ A, B, C, D, E ]  	queue = [ ]
		
		result.push(node.val);																											// 4) push node's val to result
		// 1: 							result = [ A ]      					queue = [ ]
		// 2: 							result = [ A, B ]     				queue = [ C ]
		// 3: 							result = [ A, B, C ]  				queue = [ D, E ]
		// 4: 							result = [ A, B, C, D ]  			queue = [ E, F ]
		// 5: 							result = [ A, B, C, D, E ]  	queue = [ F ]
		// 6: 							result = [ A, B, C, D, E, F ] queue = [ ]
		
		if (node.left) queue.push(node.left);																				// 5) push left and right nodes to queue (if they exist)
		// 1: 							result = [ A ]      					queue = [ B ]
		// 2: 							result = [ A, B ]     				queue = [ C, D ]
		// 3: 							result = [ A, B, C ]  				queue = [ D, E ]
		// 4: 							result = [ A, B, C, D ]  			queue = [ E, F ]
		// 5: 							result = [ A, B, C, D, E ]  	queue = [ F ]
		// 6: 							result = [ A, B, C, D, E, F ] queue = [ ]
		
		if (node.right) queue.push(node.right);			
		// 1: 							result = [ A ]      					queue = [ B, C ]
		// 2: 							result = [ A, B ]     				queue = [ C, D, E ]
		// 3: 							result = [ A, B, C ]  				queue = [ D, E, F ]
		// 4: 							result = [ A, B, C, D ]  			queue = [ E, F ]
		// 5: 							result = [ A, B, C, D, E ]  	queue = [ F ]
		// 6: 							result = [ A, B, C, D, E, F ] queue = [ ]
	}

	return result;
}

// console.log(breadthFirstArray(a));																						//=> ['a', 'b', 'c', 'd', 'e', 'f']


module.exports = {
	breadthFirstArray
};