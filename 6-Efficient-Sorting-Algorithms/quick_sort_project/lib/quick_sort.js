// TIME COMPLEXITY:		AVG:  	O(N Log(N)),		N = input array length, if lucky, pivot will be median so halving will occur during partition (thus log(N))
// TIME COMPLEXITY:		BEST:  	O(N Log(N))
// TIME COMPLEXITY:		WORST:  O(N^2)
// SPACE COMPLEXITY:					O(N),  					Note* theres a O(log(N)) that's inpalce that also exists
// [2, -1, 4, 3, 7, 3]     =>   [-1, 2, 3, 3, 4, 7]
// MUTATES INPUT ARRAY (deletes first num)
function quickSort(array) {
	if (array.length <= 1) return array;																					// 1) Base case if input array length <= 1 (already sorted)

	// let pivot = array[0];																											//    WRONG! Don't forget to remove num from array!
	let pivot = array.shift();																										// 2) Select pivot point (lets use first element for now)

	let left = array.filter(num => num < pivot);																	// 3) Sort/partition all nums < and > pivot in two diff arrays
	let right = array.filter(num => num >= pivot);

	let leftSorted = quickSort(left);																							// 4) Recursively sort left and right subarrays
	let rightSorted = quickSort(right);

	// return leftSorted.concat(pivot, rightSorted);															// 5) return merged sorted subarrays (w/ pivot in middle)
	return [ ...leftSorted, pivot, ...rightSorted ];															// Also works instead of step 5 above
	// return quickSort(left).concat(pivot, quickSort(right));										// Also works instead of steps 4 and 5 above
}
// console.log(quickSort([2, -1, 4, 3, 7, 3]));																	//=> [-1, 2, 3, 3, 4, 7]



// Helper function (not needed/used)- separates nums less than/greater than pivot target
// [7, 3, 8, 9, 2], 5		=>  [[3, 2], [7,8,9]]
function partition(arr, pivot) {
	let left = [];
	let right = [];

	for (let i = 0; i < arr.length; i++) {
		let num = arr[i];

		if (num < pivot) {
			left.push(num);
		} else {
			right.push(num);
		}
	}
	
	return [ left, right ];
}
// console.log(partition([7, 3, 8, 9, 2], 5));																	//=> [[3, 2], [7,8,9]]


module.exports = {
	quickSort
};