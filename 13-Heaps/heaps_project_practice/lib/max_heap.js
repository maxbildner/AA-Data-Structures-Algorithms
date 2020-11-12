// Create a MaxHeap Data Structure w/ the following Attribute:
// 	array of values where indices represent nodes (indexing starting at 1 for easy math)
// Methods:
// 	#getParent(idx) 		=> idx						
// 	#getLeftChild(idx) 	=> idx
// 	#getRightChild(idx) => idx
// 	#insert(val) 				=> undefined			 O(log N) TIME,  O(N) SPACE
//  #siftUp(idx)			  => undefined   
//  #deleteMax()			  => val (int)			 O(log N) TIME,  O(N) SPACE
//  #siftDown(idx)			=> undefined			 
// 
// converting array to maxHeap TIME Compleixty = N * log N => amortized O(N)
// Run `npx mocha` in terminal for testing
// see test.js for specs/behavior of methods


// TIME: 30MIN (11/11/20)
class MaxHeap {
	constructor() {
		this.array = [null];                                                      // array of values
	}


	getParent(idx) {
		return Math.floor(idx / 2);
	}


	getLeftChild(idx) {
		return 2 * idx;
	}


	getRightChild(idx) {
		return 2 * idx + 1;
	}


	// TIME COMPLEXITY:  O(log N),       N = number of nodes in heap
	// SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
	insert(val) {
		this.array.push(val);																												// push value to end of array (add node to farthest bottom left of tree)

		this.siftUp(this.array.length - 1);																					// continuously swap value toward front of array to maintain maxHeap property
	}


	// helper- No return value (undefined)
	siftUp(idx) {
		if (idx === 1) return;																											// no need to siftUp if node is at root

		let parentIdx = this.getParent(idx);																				// grab parent node idx

		if (this.array[idx] > this.array[parentIdx]) {															// if node is bigger than parent, we're breaking heap proprty, so siftUp

			[this.array[idx], this.array[parentIdx]] = 																// swap node w/ parent
				[this.array[parentIdx], this.array[idx]];

			this.siftUp(parentIdx);																										// recursively siftUp node
		}
	}


	// returns deleted max value (root) in heap
	// TIME COMPLEXITY:  O(log N),       N = number of nodes in heap
	// SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
	deleteMax() {
		// recall that we have an empty position at the very front of the array, 
		// so an array length of 2 means there is only 1 item in the heap

		if (this.array.length === 1) return null;																		// edge case- if no nodes in tree, exit

		if (this.array.length === 2) return this.array.pop();												// edge case- if only 1 node in heap, just remove it (2 bec. null doesnt count)

		let max = this.array[1];																										// save reference to root value (max)

		let last = this.array.pop();																								// remove last val in array (farthest right node in tree), and update root value with it
		this.array[1] = last;

		this.siftDown(1);																														// continuoully swap the new root toward the back of the array to maintain maxHeap property

		return max;																																	// return max value
	}


	// helper- no return value
	siftDown(idx) {
		let ary = this.array;																												// optional- reference to this.array w/ shorter variable name

		let leftIdx = this.getLeftChild(idx);																				// optional- grab left and right child indexes/values (easier to work w/ variable names)
		let rightIdx = this.getRightChild(idx);
		let leftVal = ary[leftIdx] || -Infinity;																		// short circuit if node missing child/undefined, use -Infinity (any val is > -Inifinity)
		let rightVal = ary[rightIdx] || -Infinity;

		if (ary[idx] > leftVal && ary[idx] > rightVal) return;											// if node is bigger than both children, we have restored heap property, so exit

		if (leftVal < rightVal) {																										// node bigger than one of it's children, so swap this node with the larger of the two children
			var swapIdx = rightIdx;

		} else {
			var swapIdx = leftIdx;
		}
		[ary[idx], ary[swapIdx]] = [ary[swapIdx], ary[idx]];

		this.siftDown(swapIdx);																											// continue to sift node down recursively
	}
}


module.exports = {
	MaxHeap
};