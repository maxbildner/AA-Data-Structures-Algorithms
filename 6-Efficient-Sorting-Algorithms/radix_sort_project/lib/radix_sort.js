// *****************************************************************************
// SOLUTION V1- ONLY POSITIVE INTEGERS
// TIME COMPLEXITY: 		O(N * L),		N = array length, L = length of longest integer (maxDigits)
// SPACE COMPLEXITY: 		O(N + L)
// - can only be used if we're sorting integers (or binary)
// - radix = base of number system. Example humans use base 10 to count
//   and there are 10 digits 0-9 (thus radix = 10). Ex2 binary has radix of 2
// DOES NOT Mutate the original array
// [ 23, 1, 263, 40 ]		=>   [ 1, 23, 40 263 ]
function radixSort(arr) {
	if (!Array.isArray(arr)) return null;																					// exit if input is not an array
	if (arr.length <= 1) return arr;																							// trivial case if array empty or only has 1 integer

	let L = getMaxDigits(arr);																										// 1) Find L (length of longest integer), O(N) Time

	for (let i = 1; i <= L; i++) {																								// 2) loop L times
		let buckets = [[], [], [], [], [], [], [], [], [], []];											// 3) create "bucket" (array) of 10 sub arrays. using base 10 radix so each bucket refers to digit 0-9

		for (let j = 0; j < arr.length; j++) {																			// 4) loop through array
			let num = arr[j];
			let lthDigit = getDigit(num, i);																					// 5) grab digit in ith place, O(1) Time
			buckets[lthDigit].push(num);																							// 6) add integer in appropriate bucket (determined by lth digit)
		}

		arr = [].concat(...buckets);																								// 7) "flatten" nums in bucket into one array of nums, O(N) Time
	}

	return arr;
}
// console.log(radixSort([23, 1, 263, 40]));																		//=> [ 1, 23, 40 263 ]



// Helper function, O(1) Time
// 23 	=>	2
// 234 	=>	3
function getIntLength(num) {
	if (num === 0) {
		return 1;
	} else {
		return Math.floor(Math.log10(Math.abs(num))) + 1;
	}
}


// Helper function, O(1) Time
// [ 23, 1, 269, 40, 0 ]			=>    3																						// bec 269 has the most digits (3 digits)
function getMaxDigits(nums) {
	let maxDigits = 0;
	for (let i = 0; i < nums.length; i++) {
		maxDigits = Math.max(maxDigits, getIntLength(nums[i]));
	}
	return maxDigits;
}


// Helper Function, O(1) Time
// (23, 1)			=>   3
// (23, 2)			=>   2
function getDigit(number, i) {
	return Math.floor(number / Math.pow(10, i - 1)) % 10;
}






// *****************************************************************************
// SOLUTION V2- WORKS FOR ALL INTEGERS POSTIVE/NEGATIVE
// TIME COMPLEXITY: 		O(N * L),		N = array length, L = length of longest integer (maxDigits)
// SPACE COMPLEXITY: 		O(N + L)
// - Uses helper function radixSort to sort negatives
// - concats sorted negatives and sorted positives
// - uses all functions above in V1
// Runtime: 74% faster than JS submissions
// Memory: 31% less than JS submissions
// DOES NOT Mutate the original array
// [23, -1, 263, -40]			=>    [ -40, -1, 23, 263 ]
function radixSortWithNegatives(arr) {
	if (!Array.isArray(arr)) return null;																					// exit if input is not an array
	let negatives = arr.filter(integer => integer < 0);														// 1) filter negative integers

	if (negatives.length > 0) {																										// 2) if there are negatives, sort them using radixSort
		negatives = radixSort(negatives.map(num => Math.abs(num)))									// remove negative signs, + O(N)Time, then radixSort
			.reverse()																																// reverse nums,				  + O(N)Time
			.map(num => -num);																												// add negative signs,		+ O(N)Time
	}

	let positives = arr.filter(integer=> integer >= 0);														// 3) filter positive integers, O(N) Time

	if (positives.length > 0) positives = radixSort(positives);										// 4) if there are positives, sort them using radixSort

	return negatives.concat(positives);																						// 5) concat negatives with positives
}
// console.log(radixSortWithNegatives([23, -1, 263, -40]));											//=> [ -40, -1, 23, 263 ]


module.exports = {
	radixSort
};