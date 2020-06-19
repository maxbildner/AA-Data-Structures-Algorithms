// TIME COMPLEXITY:		O(n + k), 	n = array length, 	k = largest integer value in array, or length of counters array
// SPACE COMPLEXITY: 	O(k)				
// - can only be used in sorting integers
// - MUST know the largest integer value (k) in the array (prior to sorting)
// - solution below works for only positive numbers (possible to sort negatives also)
// - limited to integers less than about 4.2B (limit of array lengths in ECMA 262 32 bit numbers in JS)
// ([1, 0, 13, 1, 7], 13)     =>    [ 0, 1, 1, 7, 13 ]
function countingSort(arr, k) {																									// k = largest integer val in array
	const result = [];
	
	const counters = new Array(k + 1).fill(0);																		// 1) Create array, length k + 1 (i.e. largest integer in arr), fill w/ 0's
	// be careful array.fill() new vals filled each point to same spot in memory	//    k + 1, bec. array indexing starts at 0, or else step 3) below wouldnt work
	// counters = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

	for (let i = 0; i < arr.length; i++) {																				// 2) Loop through array
		let integer = arr[i];
		// i = 0: integer = 1
		// i = 1: integer = 0
		// i = 2: integer = 13
		// i = 3: integer = 1
		// i = 4: integer = 7

		counters[integer]++;																												// 3) Increment val in counters by 1, @ index = current integer we're looping
		// i = 0:  counters = [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		// i = 1:  counters = [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		// i = 2:  counters = [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
		// i = 3:  counters = [ 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
		// i = 4:  counters = [ 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ]
	}

	for (let i = 0; i < counters.length; i++) {																		// 4) loop through counters array
		let counter = counters[i];

		while (counter > 0) {																												// 5) push index i of counters to result counter num of times (while loop)
			result.push(i);
			counter--;
		}
	}

	return result;	
}
// console.log(countingSort([1, 0, 13, 284, 7], 284));                          //=> [ 0, 1, 7, 13, 284 ]
console.log(countingSort([1, 0, 13, 1, 7], 13));                             	  //=> [ 0, 1, 1, 7, 13 ]



module.exports = {
	countingSort
};