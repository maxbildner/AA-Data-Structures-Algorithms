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
// TIME: 45MIN (11/19/20)
// TIME: 33MIN (12/3/20)
class MaxHeap {
	constructor(){
		this.array = [ null ];
	}


	getParent(idx) {
		return Math.floor(idx/2);
	}


	getLeftChild(idx) {
		return idx * 2;
	}


	getRightChild(idx) {
		return idx * 2 + 1;
	}

	
	insert(val) {
		this.array.push(val);

		this.siftUp(this.array.length - 1);
	}


	siftUp(idx) {

		if (idx === 1) return;

		let parentIdx = this.getParent(idx);
		let parentVal = this.array[parentIdx];

		// if current node val > parent node val, max heap property broken, so swap
		if (this.array[idx] > parentVal) {
			[ this.array[idx], this.array[parentIdx] ] = 
			[ this.array[parentIdx], this.array[idx] ];

			this.siftUp(parentIdx);
		}
	}


	deleteMax() {

		if (this.array.length === 1) return null;
		if (this.array.length === 2) return this.array.pop();

		let max = this.array[1];

		this.array[1] = this.array.pop();

		this.siftDown(1);

		return max;
	}


	siftDown(idx) {
		let arr = this.array;
		let leftChildIdx = this.getLeftChild(idx);
		let rightChildIdx = this.getRightChild(idx);
		let leftChildVal = arr[leftChildIdx] || -Infinity;
		let rightChildVal = arr[rightChildIdx] || -Infinity;

		// exit if current val >= both children
		if (arr[idx] >= leftChildVal && arr[idx] >= rightChildVal) return;

		// swap current node/val w/ larger of the two children
		let swapIdx;
		if (leftChildVal > rightChildVal) {
			swapIdx = leftChildIdx;
		} else {
			swapIdx = rightChildIdx;
		}
		[ arr[idx], arr[swapIdx] ] = [ arr[swapIdx], arr[idx] ];

		this.siftDown(swapIdx);
	}
}







module.exports = {
	MaxHeap
};