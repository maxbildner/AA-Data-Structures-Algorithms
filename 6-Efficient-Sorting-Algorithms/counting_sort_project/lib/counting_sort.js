// SOLUTION V1- Does NOT Mutate input array, only for positive integers
// TIME COMPLEXITY:		O(N + M), 	N = array length, 	M = Max (largest) integer in array, or length of counters array (not to be confused with radix sort L length of longest integer)
// SPACE COMPLEXITY: 	O(M)				
// - can only be used in sorting integers
// - MUST know the largest integer value (M) in the array (prior to sorting)
// - solution below works for only positive integers (use diff algo to sort negatives)
// - limited to integers less than about 4.2B (limit of array lengths in ECMA 262 32 bit numbers in JS), so see below note
// - Note: Always ask interviewer if you can be guaranteed that the largest element in input array is not huge
// ([1, 0, 13, 1, 7], 13)     =>    [ 0, 1, 1, 7, 13 ]
function countingSort(arr, m) {																									// m = Max (largest) integer val in array
	
	let counters = new Array(m + 1).fill(0);																		  // 1) create array to hold counters for each integer 0 up to max integer
	// be careful array.fill() new vals filled each point to same spot in memory	//    m + 1, bec. array indexing starts at 0, or else step 3) below wouldnt work
	// keys     =   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
	// counters = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0 ]

	for (let i = 0; i < arr.length; i++) {																				// 2) Loop through array
		let integer = arr[i];
		counters[integer]++;																												// 3) Increment val in counters by 1, @ index = current integer
	}
	
	let sorted = [];

	for (let i = 0; i < counters.length; i++) {																		// 4) loop through counters array
		let counter = counters[i];

		while (counter) {																														// 5) push index i of counters to sorted, counter number of times
			sorted.push(i);
			counter--;
		}
	}

	return sorted;	
}
// console.log(countingSort([1, 0, 13, 284, 7], 284));                          //=> [ 0, 1, 7, 13, 284 ]
// console.log(countingSort([1, 0, 13, 1, 7], 13));                             //=> [ 0, 1, 1, 7, 13 ]





// *****************************************************************************
// SOLUTION V2- Does NOT Mutate input array, works for positive AND NEGATIVE ints
// ([1, 0, -3, 1, 7], 7, -3)     =>    [ -3, 0, 1, 1, 7 ]
function countingSortV2(arr, m, s) {																						// m = Max (largest) integer val in array,   s = smallest integer val
	let m = -Infinity;
	let s = +Infinity;

	arr.forEach((num, i) => {
		if (num > m) m = num;
		if (num < s) s = num;
	});

	let sorted = [];
	let arrHasNegatives = s < 0;
	let countersLength;

	if (arrHasNegatives) {
		countersLength = m - s;																											// Indices need to be offset by Math.abs(smallest)
		var smallest = Math.abs(s);
	} else {
		countersLength = m;
	}

	let counters = new Array(countersLength + 1).fill(0);

	for (let i = 0; i < arr.length; i++) {
		let integer = arr[i];
		let num = arrHasNegatives ? integer + smallest : integer;										// Indices need to be offset by Math.abs(smallest)
		counters[num]++;
	}


	for (let i = 0; i < counters.length; i++) {
		let counter = counters[i];

		while (counter) {
			let num = arrHasNegatives ? i - smallest : i;															// Indices need to be offset by Math.abs(smallest)
			sorted.push(num);
			counter--;
		}
	}

	return sorted;
}

// console.log(countingSortV2([1, 0, -3, 1, 7], 7, -3));														//=>  [ -3, 0, 1, 1, 7 ]


module.exports = {
	countingSort
};