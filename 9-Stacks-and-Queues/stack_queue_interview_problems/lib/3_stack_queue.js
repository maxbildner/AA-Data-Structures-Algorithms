// ============================================================================
// Interview Problem: StackQueue
// SIMILAR TO LEETCODE LC 232 Implement Queue using Stacks (EASY)
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement your preferred Stack implementation, including the methods:
//   - Push 		returns new stack size (takes in a node obj)
//   - Pop 			returns removed node (no param)
//   - Size
//
// Then, implement a Queue by instantiating two Stack instances for storage.
//
// The StackQueue implementation should include the following methods:
//   - Enqueue	returns new queue size (takes in a value), creates new node
//   - Dequeue	returns removed node from front of queue (no param)
//   - Size
//
// -----------


// TODO: Implement the Node class!
class Node {
	constructor(val) {
		this.value = val;
		this.next = null;
	}
}


// TODO: Implement the Stack class!
class Stack {
	constructor(){
		this.top = null;
		this.bottom = null;
		this.length = 0;
	}

	push(newNode) {
		if (this.top === null) {      					// if stack empty
			this.top = newNode;
			this.bottom = newNode;

		} else {																// stack not empty
			newNode.next = this.top;
			this.top = newNode;
		}
		
		return ++this.length;										// returns new stack size
	}

	pop() {
		if (this.length === 0) return null;
		let removedTop = this.top;

		if (this.length === 1) {
			this.top = null;
			this.bottom = null;

		} else {
			this.top = removedTop.next;
		}

		this.length--;
		return removedTop;
	}

	size() {
		return this.length;
	}
}


// TODO: Implement the StackQueue class!
class StackQueue {
	constructor() {
		this.inStack = new Stack();							// stack for nodes going in ?
		this.outStack = new Stack();						// stack for nodes going out ?
		this.front = null;
		this.back = null;
	}

	// returns new queue size(takes in a value), creates new node
	enqueue(val) {
		let newNode = new Node(val);
		// newNode = { value:val, next:null }

		if (this.front === null) { 							// if queue is empty
			this.front = newNode;
			this.back = newNode;

		} else {																// queue not empty
			this.back.next = newNode;
			this.back = newNode;
		}

		// this.inStack.push(newNode);					// DOESN'T WORK!!!!??
		this.inStack.push(new Node(newNode.value));

		return this.size();
	}

	dequeue() {
		if (this.front === null) return null;		// if queue is empty

		if (this.size() === 1) {								// reset front/back if queue only has 1 node
			this.front = null
			this.back = null;

		} else {																// queue > 1 node
			this.front = this.front.next;
		}

		if (this.outStack.size() === 0) {
			while (this.inStack.size() > 0) {
				this.outStack.push(this.inStack.pop());
			}
		}

		let x = this.outStack.pop();
		return x;
	}

	size() {
		return this.inStack.size() + this.outStack.size();
	}
};


exports.Node = Node;
exports.Stack = Stack;
exports.StackQueue = StackQueue;


// let myStack = new Stack();
// console.log(myStack.push('A'));
// console.log(myStack);

