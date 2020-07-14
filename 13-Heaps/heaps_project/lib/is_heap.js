// *****************************************************************************
// VERSION 1- MY SOLUTION- ITERATIVE
// you may assume that the array will always have a null element at the 0-th index
// TIME COMPLEXITY: 	O(N), N = array length
// SPACE COMPLEXITY:	O(1)
// [null, 50, 42, 27, 32, 24]		=> true
function isMaxHeapV1(array, idx=1) {
	// max heap properties:
	// - for any node @ index i, left child <= node AND right child <= node

	if (array.length <= 2) return true;

	for (let i = 1; i < array.length; i++) {
		let num = array[i];	
		let leftIdx = i * 2;
		let rightIdx = i * 2 + 1;
		let leftVal = array[leftIdx] === undefined ? -Infinity : array[leftIdx];
		let rightVal = array[rightIdx] === undefined ? -Infinity : array[rightIdx];
		if (num < leftVal || num < rightVal) return false;
	}

	return true;
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