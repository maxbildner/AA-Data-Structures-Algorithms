// TIME COMPLEXITY:		WORST:  O(N^2),				N = input array length, however research shows worst case to be rare 
//														First N comes from partitioning array, then O(N) again for every recursive step if pivot is min or max (see below)
// TIME COMPLEXITY:		AVG:  	O(N log(N))
// TIME COMPLEXITY:		BEST:  	O(N log(N))
// SPACE COMPLEXITY:					O(N),  	bec of partition arrays created, but a worst case O(log(N)) in place solution exists
//                                
// NOTES
//   	- Num of recursive calls = num times array is split to reach base case, which is dependant on how pivot is chosen
// 		- Best Case: If lucky, pivot will be median so halving will occur during partition (left and right partitions equal lengths). O(log(N)) to reach base case
//		- Worst Case: pivot is min or max, so one partion will contain everything and other is empty (this will decrease array length by 1 each recursive step), so O(N)
// [2, -1, 4, 3, 7, 3]     =>   [-1, 2, 3, 3, 4, 7]
// MUTATES INPUT ARRAY (deletes first num)
function quickSort(array) {
	if (array.length <= 1) return array;																					// 1) Base case if input array length <= 1 (already sorted)

	let pivot = array[0];																													// 2) Select pivot point (use 1st num for simplicity unless array nearly sorted)
	array = array.slice(1);

	let left = array.filter(num => num < pivot);																	// 3) partition all nums < and >= pivot in two diff arrays
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