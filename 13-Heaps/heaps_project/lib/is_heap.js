// *****************************************************************************
// VERSION 1- MY SOLUTION- ITERATIVE
// you may assume that the array will always have a null element at the 0-th index
// TIME COMPLEXITY: 	O(N), N = array length
// SPACE COMPLEXITY:	O(1)
// [null, 50, 42, 27, 32, 24]		=> true

function isMaxHeapV1(array) {

	for (let i = 1; i < array.length; i++) {																			// loop through array and check each node's children <= parent node

		let leftChildIdx = i * 2;																										// grab child indices/vals
		let rightChildIdx = i * 2 + 1;
		let leftChildVal = array[leftChildIdx] || -Infinity;												// short circuit -Inf bec. easier for comparison than undefined
		let rightChildVal = array[rightChildIdx] || -Infinity;

		if (array[i] < leftChildVal || array[i] < rightChildVal) return false;			// exit if maxHeap property broken
	}

	return true;																																	// return true- finished looping
}




// *****************************************************************************
// VERSION 2- AA SOLUTION- RECURSIVE
function isMaxHeap(array) {
	// check if the tree is complete, i.e. there are no gaps like [null, 50, undefined, 20]
	let isComplete = array.every(el => el !== undefined);
	return isComplete && _isMaxHeap(array);
}

function _isMaxHeap(array, idx = 1) {
	if (array[idx] === undefined) return true;
	let leftIdx = 2 * idx;
	let rightIdx = 2 * idx + 1;
	let leftVal = array[leftIdx] === undefined ? -Infinity : array[leftIdx];
	let rightVal = array[rightIdx] === undefined ? -Infinity : array[rightIdx];
	return array[idx] > leftVal && array[idx] > rightVal
		&& _isMaxHeap(array, leftIdx) && _isMaxHeap(array, rightIdx);
}


module.exports = {
	isMaxHeap
};