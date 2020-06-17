// VERSION1- memory intensive, duplicates inputs, also uses shift and concat, does not mutate inputs
// Time: O(N)
// Space: O(N)
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



// VERSION2- AA Solution- avoids concatenation at end (saves a little memory)
// Time: O(N)
// [1, 5, 10, 15], [0, 2, 3, 7, 10]			=> [0, 1, 2, 3, 5, 7, 10, 10, 15]
// [10, 13, 15, 25], []									=> [10, 13, 15, 25]
// returns new sorted merged array. Note input arrays could be diff lengths
function merge(array1, array2) {
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
// console.log(merge([1, 5, 10, 15], [0, 2, 3, 7, 10]));


// V1- Does NOT Mutate array
// Time Complexity: O(N Log(N)),	N = input array length
// log(N) 										represents the two recursive calls
// the first N in N * log(N) 	represents the while loop in the merge helper function!
// Space Complexity: O(N)
// [2, -1, 4, 3, 7, 3]  =>  [-1, 2, 3, 3, 4, 7]
// [2, 1]		=>  [1, 2]
function mergeSort(array) {
	
	// base case if array length is empty or only has 1 num, then array already sorted
	if (array.length <= 1) return array;

	// split array in two
	let midIdx = Math.floor(array.length/2);
	// 1: midIdx = 2/2 = 1

	let left = array.slice(0, midIdx);
	// 1: left = [2]

	let right = array.slice(midIdx);
	// 1: right = [1]

	return merge(mergeSort(left), mergeSort(right));
}
// console.log(mergeSort([2, -1, 4, 3, 7, 3]));			// => [-1, 2, 3, 3, 4, 7]
console.log(mergeSort([2, 1]));											// => [1, 2]



module.exports = {
	merge,
	mergeSort
};