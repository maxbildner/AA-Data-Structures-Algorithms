// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// ------------
// Prompt:
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// LINKED LIST NOTES
// - Linked List = an ADT (abstract data structure) that has a linear sequence 
//   of "nodes". The linked list tracks 3 properties: 
// 		- Head = first node in the list
// 		- Tail = last node in the list
// 		- Length = the number of nodes in the list
// - Node = each node usually tracks 3 properties:
// 		- Value = the actual value that this node stores (ex. a number)		
//		- Next = the next node int the list (relative to this node)
//	  - Previous (only for Doubly linked Lists) = the previous node in the list 
//      (relative to this node)
// - Similarities with arrays: they both store a linear sequence of data
//		- Search Time Complexity both O(N)
// - Differences with arrays:
// 		- How the data is stored (physically). 
//		  Arrays contain contiguous data. Each element is stored next to its
//			neighboring element in the physical hardware of the machine
//			in a single continuous block in memory
//		  Linked lists contain non-contiguous data
//			linked list nodes live at randomly distributed addresses in the machine
//	  - Access Time Complexity = O(N) unlike arrays which have O(1)
//			Since linked lists have no indices, there's no ability to look 
// 			up/access an individual node in constant time (unlike array). 
//			To find a node we have to loop through the entire list starting from the 
//			first node
//		- Deletion/Insertion Time Complexity = O(1) for doubly linked unlike 
//			arrays O(N). This assumes you know where to insert already. 
// - Types of Linked Lists:			Directionlity of each node:
//		- Singly Linked 						Head 	-> 	Tail
//		- Doubly Linked							Head 	<=>	Tail
//		- Multiply Linked						?
//		- Circularly Linked					Head -> Tail -> Head
// - In JS, we can represent a Linked List as a class (object) containing
//		instances of Node objects
// -----------


// SINGLY LINKED LIST
// TODO: Implement a Linked List Node class here
class Node {
	constructor(val) {
		this.value = val;																														// create value property
		this.next = null;																														// create next proprty
	}
}



// TODO: Implement a Singly Linked List class here
class LinkedList {
	constructor() {
		this.head = null;																														// create head property
		this.tail = null;																														// create tail property
		this.length = 0;																														// create length property
	}

	// TODO: Implement the addToTail method here
	// Returns updated linked list
	addToTail(val) {
		let newNode = new Node(val);																								// create a new node object to store the value
		
		if (this.length === 0) {																										// if linked list is empty, reassign both the head and tail pointers when a new node is added to the tail of an empty list
			this.head = newNode;																											// reassign head pointer to new node added
		} else {
			this.tail.next = newNode;																									// make old tail node point to new tail
		}
		
		this.tail = newNode;																												// update linked list new tail
		this.length++;																															// increment length property of linked list by 1
		
		return this;																																// return updated linked list
	}



	// VERSION 1- AA Solution removeTail()- (only for singly linked list)
	// returns removed tail
	// LinkedList { head: Node { value: 'C', next: Node { value: 'D', next: null } }, 		tail: Node { value: 'D', next: null }, length: 2 }
	// => Node { value: 'D', next: null }
	removeTail() {																															
		if (this.length === 0) return undefined;																		// if linked list is empty, return undefined
		let currentNode = this.head;																								// represents node to remove
		let newTail = currentNode;																									// create var to store newTail node (initialize to currentNode)

		while (currentNode.next !== null) {																					// loop until we reach the tail node (loop since singly linked list, would use .previous prop if doubly linked)
			newTail = currentNode; 																										// reassign newTail to be currentNode
			currentNode = currentNode.next;																						// reassign currentNode to be next node (so we can move down the list)
		}

		this.tail = newTail;																												// update tail to newTail
		this.tail.next = null;																											// update tails next to point to null
		this.length--;																															// decrease list length by 1

		if (this.length === 0) {																										// handles case if list length is 1 before removeTail called
			this.head = null;
			this.tail = null;
		}

		return currentNode;																													// return removed tail node
	}
	// VERSION 2- MY Solution removeTail()- more if logic
	// removeTail() {
	// 	if (this.length === 0) return undefined;																		// if linked list is empty, return undefined		
	// 	let currentNode = this.head;
	// 	let removedTail = currentNode;

	// 	while (currentNode.next !== null) {																					// loop until we reach the tail node (loop since singly linked list, would use .previous prop if doubly linked)

	// 		if (currentNode.next.next === null) { 																		// if we've reached 2nd to last node
	// 			removedTail = currentNode.next; 																				// reassign removed tail (to return later)
	// 			this.tail = currentNode;																								// update tail to currentNode
	// 			currentNode.next = null;																								// update currentNode's next to null (instead of last node)
	// 		} else {																																	// if we have not reached the 2nd to last node
	// 			currentNode = currentNode.next;																					// reassign currentNode to be the next node
	// 		}
	// 	}

	// 	this.length--;																															// decrease list length by 1
		
	// 	if (this.length === 0) {																										// handles case if list length is 1 before removeTail
	// 		this.head = null;
	// 		this.tail = null;
	// 	}

	// 	return removedTail;																													// return removed tail node
	// }



	// TODO: Implement the addToHead method here
	addToHead(val) {
		
	}

	// TODO: Implement the removeHead method here
	removeHead() {

	}

	// TODO: Implement the contains method here
	contains(target) {

	}

	// TODO: Implement the get method here
	get(index) {

	}

	// TODO: Implement the set method here
	set(index, val) {

	}

	// TODO: Implement the insert method here
	insert(index, val) {

	}

	// TODO: Implement the remove method here
	remove(index) {

	}

	// TODO: Implement the size method here
	size() {

	}
}



let myLinkedList = new LinkedList();
// Ex 1: addToTail
// console.log(myLinkedList);										//=> LinkedList { head: null, tail: null, length: 0 }
// console.log(myLinkedList.length);						//=> 0
// console.log(myLinkedList.addToTail('C'));		//=> LinkedList { head: Node { value: 'C', next: null }, tail: Node { value: 'C', next: null }, length: 1 }
// console.log(myLinkedList.length);						//=> 1
// console.log('-------');
// console.log(myLinkedList.addToTail('D'));		//=> LinkedList { head: Node { value: 'C', next: Node { value: 'D' } }, tail: Node { value: 'D', next: null }, length: 2 }

// Ex 2: removeTail
console.log(myLinkedList.addToTail('C'));				//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }
console.log(myLinkedList.addToTail('D'));				//=> LinkedList { head: Node { value: 'C', next: Node { value: 'D', next: null } }, 	tail: Node { value: 'D', next: null }, length: 2 }
console.log(myLinkedList.removeTail());					//=> Node { value: 'D', next: null }
console.log(myLinkedList);											//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }

// Ex 3:	removeTail
// console.log(myLinkedList.addToTail('C'));				//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }
// console.log(myLinkedList.removeTail());					//=> Node Node { value: 'C', next: null }
// console.log(myLinkedList);												//=> LinkedList { head: null, 	tail: null, 	length: 0 }



exports.Node = Node;
exports.LinkedList = LinkedList;
