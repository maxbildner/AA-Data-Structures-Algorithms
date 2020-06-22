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
//			arrays O(N). This assumes you have a reference to the node of where
//			you wnant to delete/insert, otherwise it's O(N)
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
		// while (currentNode.next) {																								// 	same as above^
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



	// returns updated linked list
	// 						LinkedList { head: Node { value: 'B', next: null }, 														tail: Node { value: 'B', next: null }, 	length: 1 }
	// ('A')	=>  LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	addToHead(val) {
		let newHead = new Node(val);																								// create newHead node to add
	
		if (this.length === 0) {																										// if list empty before calling addToHead, update tail
			this.tail = newHead;
		} else {
			newHead.next = this.head;																									// update newHead to point to old Head
		}

		this.head = newHead;																												// update linked lists new head
		this.length++;																															// increment length of list by 1
		return this;
	}



	// returns removed head node
	// 		LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	// => Node { value: 'A', next: Node { value: 'B', next: null } }
	// LinkedList { head: Node { value: 'B', next: null }, 	tail: Node { value: 'B', next: null }, 	length: 1 }
	removeHead() {
		if (this.length === 0) return undefined;																		// if list empty, return undefined

		let removedHead = this.head;																								// store head to remove/return
		this.head = this.head.next;																									// update head to be new next node in list
		this.length--;																															// update length property of linked list

		if (this.length === 0) this.tail = null;																		// if new list is empty, reset tail pointer to null

		return removedHead;
	}



	// returns boolean, true if target is a value in linked list
	// LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	// ('A')	=>  true
	// ('C')	=>  false
	contains(target) {
		let currentNode = this.head;

		while (currentNode) {																												// loop through ALL nodes in linked list 
			if (currentNode.value === target) return true;														// return true if val found
			currentNode = currentNode.next;																						// update currentNode to be the Next Node
		}
																							
		return false;																																// return false if val not found (outside loop)	
	}



	// returns node at input index, null if out of bounds
	// LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	// (7) => null
	// (1) => Node { value: 'B', next: null }
	get(index) {
		if (index >= this.length) return null;																			// return null if out of bounds
		let currentNode = this.head;

		for (let i = 0; i < index; i++) {																						// loop until index number of times
			currentNode = currentNode.next;																						// update currentNode to be the Next Node	
		}

		return currentNode;
	}



	// returns true if node exists at index. Updates value at node
	// LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	// (1, 'X')  =>  true
	// LinkedList { head: Node { value: 'A', next: Node { value: 'X', next: null } }, 	tail: Node { value: 'X', next: null }, 	length: 2 }
	// (2, 'X)	 =>  false
	set(index, val) {
		let foundNode = this.get(index);																						// get current node at input index

		if (foundNode) {																														// if foundNode exists, update value of that node/return true
			foundNode.value = val;								
			return true;												
		} 
		return false;																																// return false if foundNode doesn't exist at input index
	}



	// returns boolean true if node exists at index. Also inserts new node at index
	// LinkedList { head: Node { value: 'A', next: Node { value: 'C', next: null } }, tail: Node { value: 'C', next: null }, length: 2 }
	// (1, 'B')  =>  true
	// LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: Node{value:'C',next:null} } }, 	tail: Node { value: 'C', next: null }, 	length: 3 }
	insert(index, val) {
		if (index < 0 || index >= this.length) return false;												// return false if index out of bounds
		if (index === 0) return !!this.addToHead(val);															// edge case if index = 0, below code wont work

		let previousNode = this.get(index - 1);																			// get node before node@index

		let nodeAtIndex = previousNode.next;																				// get node@index

		let newNode = new Node(val);																								// create new node
		previousNode.next = newNode;																								// update node before node@index to point to new node
		newNode.next = nodeAtIndex;																									// update new node to point to node@index
		this.length++;																															// update list length

		return true;
	}



	// return undefined if index out of bounds. Removes node at index
	// return removed node (if index not out of bounds)
	// LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
	// (0)  =>	Node { value: 'A', next: Node { value: 'B', next: null } }
	// LinkedList { head: Node { value: 'B', next: null }, 	tail: Node { value: 'B', next: null }, 	length: 1 }
	remove(index) {
		if (index < 0 || index >= this.length) return undefined; 										// return undefined if index out of bounds
		if (index === 0) return this.removeHead();																	// edge case if index = 0, remove head
		if (index === this.length - 1) return this.removeTail();										// edge case if index = index@last node, remove tail

		let previousNode = this.get(index - 1);																			// get previousNode
		let nodeAtIndex = previousNode.next;																				// get node@index
		let nextNode = nodeAtIndex.next;																						// get nextNode
		previousNode.next = nextNode;																								// update previousNode to point to nextNode
		this.length--;																															// update list length
		return nodeAtIndex;																													// return node@index 
	}



	// returns linked list length
	size() {
		return this.length;
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
// console.log(myLinkedList.addToTail('C'));		//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('D'));		//=> LinkedList { head: Node { value: 'C', next: Node { value: 'D', next: null } }, 	tail: Node { value: 'D', next: null }, length: 2 }
// console.log(myLinkedList.removeTail());			//=> Node { value: 'D', next: null }
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }

// Ex 3:	removeTail
// console.log(myLinkedList.addToTail('C'));		//=> LinkedList { head: Node { value: 'C', next: null }, 	tail: Node { value: 'C', next: null }, 	length: 1 }
// console.log(myLinkedList.removeTail());			//=> Node Node { value: 'C', next: null }
// console.log(myLinkedList);										//=> LinkedList { head: null, 	tail: null, 	length: 0 }

// Ex 4:	addToHead
// console.log(myLinkedList.addToHead('B'));		//=> LinkedList { head: Node { value: 'B', next: null }, 	tail: Node { value: 'B', next: null }, 	length: 1 }
// console.log(myLinkedList.addToHead('A'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }

// Ex 5:	removeHead
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.removeHead());			//=> Node { value: 'A', next: Node { value: 'B', next: null } }
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'B', next: null }, 	tail: Node { value: 'B', next: null }, 	length: 1 }
// console.log(myLinkedList.removeHead());			//=> Node { value: 'B', next: null }
// console.log(myLinkedList);										//=> LinkedList { head: null, 														tail: null, 	length: 0 }

// Ex 6:	contains()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.contains('A'));			//=> true
// console.log(myLinkedList.contains('B'));			//=> true
// console.log(myLinkedList.contains('C'));			//=> false

// Ex 7:	get()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.get(7));						//=> null
// console.log(myLinkedList.get(1));						//=> Node { value: 'B', next: null } 

// Ex 8:	set()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.set(1, 'X'));				//=> true
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'A', next: Node { value: 'X', next: null } }, 	tail: Node { value: 'X', next: null }, 	length: 2 }
// console.log(myLinkedList.set(3, 'X'));				//=> false

// Ex 9:	insert()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('C'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'C', next: null } }, 	tail: Node { value: 'C', next: null }, 	length: 2 }
// console.log(myLinkedList.insert(1, 'B'));		//=> true
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: Node{value:'C',next:null} } }, 	tail: Node { value: 'C', next: null }, 	length: 3 }

// Ex 10:	remove()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 	tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.remove(0));					//=> Node { value: 'A', next: Node { value: 'B', next: null } }
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'B', next: null }, 	tail: Node { value: 'B', next: null }, 	length: 1 }

// Ex 11:	remove()
// console.log(myLinkedList.addToTail('A'));		//=> LinkedList { head: Node { value: 'A', next: null }, 	tail: Node { value: 'A', next: null }, 	length: 1 }
// console.log(myLinkedList.addToTail('B'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: null } }, 		tail: Node { value: 'B', next: null }, 	length: 2 }
// console.log(myLinkedList.addToTail('C'));		//=> LinkedList { head: Node { value: 'A', next: Node { value: 'B', next: [NodeC] } }, 	tail: Node { value: 'C', next: null }, 	length: 3 }
// console.log(myLinkedList.remove(1));					//=> Node { value: 'B', next: Node { value: 'C', next: null } }
// console.log(myLinkedList);										//=> LinkedList { head: Node { value: 'A', next: Node {value:'B',next:[NodeC]} }, 	tail: Node { value: 'C', next: null }, 	length: 2 }



exports.Node = Node;
exports.LinkedList = LinkedList;
