// ============================================================================
// Interview Problem: Constant Time Stack Max
// SIMILAR TO LEETCODE LC 155 Min Stack EASY or Max Stack (716)
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Modify the definition of the Stack class provided to create an enhanced 
// version of a Stack data structure called MinMaxStack.
//
// A MinMaxStack has all of the same behavior as a Stack, but can also return
// the node with the minimum or maximum value in constant time.
//
// You may alter any of the original Stack's methods, including the 
// constructor.
//  
// Values of nodes of the MinMaxStack are always guaranteed to be numbers.
//
//
// ------------
// Constraints:
// ------------
//
// (1) All MinMaxStack methods must run in constant time, O(1).
//
//
// --------
// Example:
// --------
//
// const minMaxStack = new MinMaxStack();
//
// minMaxStack.push(10);
// minMaxStack.push(12);
// minMaxStack.push(8);
// minMaxStack.push(2);
// minMaxStack.push(20);
//
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 20
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 2
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 8
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 12
//
// minMaxStack.pop();
// console.log(minMaxStack.min().value);   => 10
// console.log(minMaxStack.max().value);   => 10
//
// minMaxStack.pop();
// console.log(minMaxStack.min());   => null
// console.log(minMaxStack.max());   => null
// -----------


class Node {
	constructor(val) {
		this.value = val;
		this.next = null;
	}
}

// VERSION 1- MY SOLUTION (uses helper method, easier to read, but similar to AA solution)
// USES Singly Linked List (with nodes) as underlying stack data structure
// Refactor the regular Stack below into a MinMaxStack!
class MinMaxStack {
	constructor() {
		this.top = null;
		this.bottom = null;
		this.length = 0;		
		this.minimums = [];													// stack array of nodes to track history of min vals
		this.maximums = [];													// stack array of nodes to track history of max vals
	}

	updateMinMax(node, calledFromPush) {
		if (this.length === 0 && calledFromPush) {	// if stack empty and called from .push
			this.minimums.push(node);									// push node to min and max arrays
			this.maximums.push(node);
			
		} else if (calledFromPush) {								// stack not empty and called from .push
			if (node.value > this.maximums[this.maximums.length - 1].value) this.maximums.push(node);
			if (node.value < this.minimums[this.minimums.length - 1].value) this.minimums.push(node);

		} else if (!calledFromPush) {								// stack not empty and called from .pop()
			// if last node in minimums or maximums is the node we popped, 
			// then pop last node in minimums/maximums
			if (this.maximums[this.maximums.length - 1] === node) this.maximums.pop();
			if (this.minimums[this.minimums.length - 1] === node) this.minimums.pop();
		}
	}

	push(val) {
		const newNode = new Node(val);
		if (!this.top) {
			this.top = newNode;
			this.bottom = newNode;
		} else {
			const temp = this.top;
			this.top = newNode;
			this.top.next = temp;
		}
		
		this.updateMinMax(newNode, true);									// check if min/max needs to be updated

		return ++this.length;
	}

	pop() {
		if (!this.top) {
			return null;
		}
		const temp = this.top;
		if (this.top === this.bottom) {
			this.bottom = null;
		}
		this.top = this.top.next;
		this.length--;

		this.updateMinMax(temp, false);										// check if min/max needs to be updated

		// return temp.value;
		return temp;
	}

	size() {
		return this.length;
	}

	min() {
		if (this.top === null) return null;
		return this.minimums[this.minimums.length - 1];		// return last node in array
	}

	max() {
		if (this.top === null) return null;
		return this.maximums[this.maximums.length - 1];		// return last node in array
	}
}


// Forgetting something down here? 
exports.Node = Node;
exports.MinMaxStack = MinMaxStack;


// EX 1:
// push 2
// 	2  	min=2, max=2

// push 2,  push 3
// 	3
// 	2  	min=2, max=3

// push 2,  push 3,  push 2
// 	2
// 	3
// 	2		min=2, max = 3

// push 2,  push 3,  push 2,	 pop()
// 	3
// 	2		min=2, max = 3


// EX 2:
// push 3
// 	3 	min=3, max=3

// push 3,  push 2
// 	2
// 	3  	min=2, max=3

// push 3,  push 2,  push 5
// 	5
// 	2
// 	3		min=2, max=5

// push 3,  push 2,  push 5,	 pop()
// 	2
// 	3		min=2, max=3
