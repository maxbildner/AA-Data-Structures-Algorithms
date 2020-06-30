// HELPER FUNCTION VERSION1- memory intensive, duplicates inputs, also uses shift and concat, does not mutate inputs
// TIME COMPLEXITY:  O(N)			N = combined length of both input arrays
// SPACE COMPLEXITY: O(N)  
// [1, 5, 10, 15], [0, 2, 3, 7, 10]			=> [0, 1, 2, 3, 5, 7, 10, 10, 15]
// [10, 13, 15, 25], []									=> [10, 13, 15, 25]
// returns new sorted merged array. Note input arrays could be diff lengths
function mergeV1(array1, array2) {
	let mergedArr = [];
	
	// make copy of arrays
	let leftArr = array1.slice();
	let rightArr = array2.slice();

	// loop until one of the copied arrays are empty
	while (leftArr.length > 0 && rightArr.length > 0) {

		// compare leftmost nums of both copied arrays, push smaller one to mergedArr
		if (leftArr[0] < rightArr[0]) {

			mergedArr.push(leftArr.shift());
			
			// else, push first num of rightArr to mergedArr (make sure to delete num from rightArr)
		} else {
			mergedArr.push(rightArr.shift());
		}
	}
	
	// if arr copies are diff lengths, then by this point one will be empty and other will not
	// so merge them
	return mergedArr.concat(leftArr, rightArr);
}
// console.log(mergeV1([1, 5, 10, 15], [0, 2, 3, 7, 10]));



// HELPER FUNCTION VERSION2- AA Solution- avoids concatenation at end (saves a little memory/time)
// TIME COMPLEXITY:  O(N)			N = combined length of both input arrays
// SPACE COMPLEXITY: O(N)  
// [1, 5, 10, 15], [0, 2, 3, 7, 10]			=> [0, 1, 2, 3, 5, 7, 10, 10, 15]
// [10, 13, 15, 25], []									=> [10, 13, 15, 25]
// returns new sorted merged array. Note input arrays could be diff lengths
function mergeV2(array1, array2) {
	let mergedArr = [];
	
	// make copy of arrays
	let leftArr = array1.slice();
	let rightArr = array2.slice();

	// loop until one of the copied arrays are empty
	// while (leftArr.length > 0 && rightArr.length > 0) {
	while (leftArr.length || rightArr.length) {																		// note* 0 considered falsey value
		let leftNum = leftArr.length ? leftArr[0] : Infinity;												// Inifinity as default value incase one array is empty, without this we'll get infinite loop
		let rightNum = rightArr.length ? rightArr[0] : Infinity;

		let next;

		// compare leftmost nums of both copied arrays, push smaller one to mergedArr
		if (leftNum < rightNum) {
			next = leftArr.shift();
			
			// else, push first num of rightArr to mergedArr (make sure to delete num from rightArr)
		} else {
			next = rightArr.shift();
		}

		// This line below also work instead of above if statement
		// let next = (leftNum < rightNum) ? leftArr.shift() : rightArr.shift();

		mergedArr.push(next);
	}
	
	return mergedArr;
}
// console.log(mergeV2([1, 5, 10, 15], [0, 2, 3, 7, 10]));




// *****************************************************************************
// HELPER FUNCTION VERSION 3- MY SOLUTION (MUTATES INPUTS!!!)
// Takes in two already sorted arrays, returns merged array
// TIME COMPLEXITY:  O(N)			N = combined length of both input arrays
// SPACE COMPLEXITY: O(N)  
// TIME 1PM
// EX: ([0, 1, 5], [2, 3])   => [ 0, 1, 2, 3, 5 ]
function merge(array1, array2) {
	let merged = [];																															// 1) create new array to hold merged arrays

	while (array1.length && array2.length) {																			// 2) keep looping until one of the arrays are empty
		let arr1Num = array1[0];																										// 3) grab first num from arr1, store in var
		let arr2Num = array2[0];																										// 4) grab first num from arr2, store in var

		// removing and pushing smaller num only
		if (arr1Num < arr2Num) {																										// 5) if arr1Num < arr2Num, remove arr1Num from arr1 and push to merged
			merged.push(array1.shift());

		} else {																																		// 6) else remove arr2Num from arr2 and push to merged
			merged.push(array2.shift());
		}
	}

	return merged.concat(array1, array2);																					// 7) return merged concatonated arrays
}
// console.log(merge([0, 1, 5], [2, 3]));		//=> [ 0, 1, 2, 3, 5 ]



// V1- Does NOT Mutate array
// TIME COMPLEXITY:  O(N Log(N)),	N = input array length
//   log(N) 										represents the two recursive calls
//   the first N in N * log(N) 	represents the while loop in the merge helper function!
// SPACE COMPLEXITY: O(N)
// [2, -1, 4, 3, 7, 3]  =>  [-1, 2, 3, 3, 4, 7]
// [2, 1]		=>  [1, 2]
function mergeSort(array) {
	if (array.length <= 1) return array;																					// 1) base case if array length <=1, then array already sorted

	// split array in two
	let midIdx = Math.floor(array.length/2);																			// 2) grab middle index
	let left = array.slice(0, midIdx);																						// 3) grab left side of array
	let right = array.slice(midIdx);																							// 4) grab right side of array

	return merge(mergeSort(left), mergeSort(right));															// 5) recursive call, return merged sorted left and sorted right
}
// console.log(mergeSort([2, -1, 4, 3, 7, 3]));					// => [-1, 2, 3, 3, 4, 7]
// console.log(mergeSort([2, 1]));											// => [1, 2]



module.exports = {
	merge,
	mergeSort
};