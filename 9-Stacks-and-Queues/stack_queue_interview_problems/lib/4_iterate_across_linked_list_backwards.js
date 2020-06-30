// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Iterate over a Singly Linked List of primitives backwards. When finished, 
// return a string representing the original linked list's values backwards 
// in the following format:
//
//                             'A -> B -> C -> D' 
//
// ------------
// Constraints:
// ------------
//
// (1) Your function must be iterative, not recursive.
// (2) Your function must consume O(n) space.
// (3) Employee either a Stack, Queue, or some combination of the two in your
//     solution. (Implement any data structures you need, as you need them.)
//
//
// -----------


// VERSION 1- MY SOLUTION- no stack ADT, just O(N) loop, and .slice
// Returns String ex. 'DCBA'
// 'A -> B -> C -> D'			=>  'D -> C -> B -> A'
// TODO: Implement the iterateAcrossLinkedListBackwards function here
// TIME 10Min to complete
function iterateAcrossLinkedListBackwardsV1(linkedList) {
	let reversedString = '';									
	let currentNode = linkedList.head;	

	while (currentNode) {											// loop over all nodes in linked list
		reversedString = currentNode.value + ' -> ' + reversedString;
		currentNode = currentNode.next; 
	}

	reversedString = reversedString.slice(0, reversedString.length - 4);

	return reversedString;
}



// VERSION 2- MY SOLUTION- no stack ADT, but O^2 TIME due to array.unshift inside loop
// Returns String ex. 'DCBA'
// 'A -> B -> C -> D'			=>  'D -> C -> B -> A'
// TODO: Implement the iterateAcrossLinkedListBackwards function here
function iterateAcrossLinkedListBackwardsV2(linkedList) {
	let reversedString = [];									
	let currentNode = linkedList.head;	

	while (currentNode) {														// loop over all nodes in linked list
		reversedString.unshift(String(currentNode.value));
		currentNode = currentNode.next; 
	}

	return reversedString.join(' -> ');
}



// VERSION 3- MY SOLUTION- Stack ADT used
// TIME COMPLEXITY:  O(N), 	N = linked list length
// SPACE COMPLEXITY: O(N)
// Returns String ex. 'DCBA'
// 'A -> B -> C -> D'			=>  'D -> C -> B -> A'
// TODO: Implement the iterateAcrossLinkedListBackwards function here
function iterateAcrossLinkedListBackwards(linkedList) {
	let stack = new Stack();
	let currentNode = linkedList.head;	
	let result = '';

	while (currentNode) {														// loop over all nodes in linked list
		stack.push(currentNode.value);
		currentNode = currentNode.next; 
	}

	currentNode = stack.head;
	let firstVal = true;
	
	while (currentNode) {
		if (firstVal) {
			result = result + currentNode.value;
			firstVal = false;
		} else {
			result = result + ' -> ' + currentNode.value;
		}
		currentNode = currentNode.next;
	}

	return result;
}


class Stack {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	push(val) {																			// adds to head
		let newNode = { value: val, next: null };

		if (this.head === null) {											// stack empty
			this.head = newNode;
			this.tail = newNode;

		} else {																			// stack not empty
			newNode.next = this.head;
			this.head = newNode
		}
	}
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards;
