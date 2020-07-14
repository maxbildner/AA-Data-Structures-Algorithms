class MaxHeap {
  constructor() {
		this.array = [ null ];
	}

	getParent(idx) {
		return Math.floor(idx/2);
	}

	getLeftChild(idx) {
		return 2 * idx;
	}

	getRightChild(idx) {
		return 2 * idx + 1;
	}

	insert(val) {
		this.array.push(val);

		let insertedNodeIdx = this.array.length - 1;																// idx of node we just inserted
		this.siftUp(insertedNodeIdx);
	}

	siftUp(idx) {
		if (idx === 1) return;                                                      // no need to sift up, node is at the root

    let parentIdx = this.getParent(idx);

    // if node is bigger than parent, we are breaking heap definition, so we need to sift up
    if (this.array[parentIdx] < this.array[idx]) {

      // swap node with it's parent
      [ this.array[parentIdx], this.array[idx] ] = [ this.array[idx], this.array[parentIdx] ];

      // continue to sift it up recursively
      this.siftUp(parentIdx);
    }
	}


	deleteMax() {
		if (this.array.length === 2) return this.array.pop();
		if (this.array.length === 1) return null;
		
		let rootMax = this.array[1];

		this.array[1] = this.array.pop();

		this.siftDown(1);

		return rootMax;
	}
	
	
	siftDown(idx) {
		let ary = this.array;
		let leftChildIdx = this.getLeftChild(idx);
		let rightChildIdx = this.getRightChild(idx);
		let leftVal = ary[leftChildIdx];
		let rightVal = ary[rightChildIdx];
		if (leftVal === undefined) leftVal = -Infinity;
		if (rightVal === undefined) rightVal = -Infinity;

		if (ary[idx] > leftVal && ary[idx] > rightVal) return;
		
		// swap node with greater of left/right
		if (leftVal > rightVal) {
			var swapIdx = leftChildIdx;
		} else {
			var swapIdx = rightChildIdx;
		}
		[ ary[idx], ary[swapIdx] ] = [ ary[swapIdx], ary[idx] ];
		
		this.siftDown(swapIdx);
	}
}

module.exports = {
	MaxHeap
};