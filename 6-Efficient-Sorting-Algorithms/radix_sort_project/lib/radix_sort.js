// TIME COMPLEXITY: 		O(n * k),		n = array length, k = length of longest integer (maxDigits)
// SPACE COMPLEXITY: 		O(n * k)
// - can only be used if we're sorting integers (or binary)
// - radix = base of number system. Example humans use base 10 to count
//   and there are 10 digits 0-9 (thus radix = 10). Ex2 binary has radix of 2
// DOES NOT Mutate the original array
// SOLUTION FOR ONLY POSITIVE INTEGERS
// [ 23, 1, 263, 40 ]		=>   [ 1, 23, 40 263 ]
function radixSort(arr) {

	if (!Array.isArray(arr)) return null;																					// exit if input is not an array
	if (arr.length <=1) return arr;																								// trivial case if array empty or only has 1 integer

	// 1) get the max num of digits from all the numbers in the input array
	let maxDigits = getMaxDigits(arr);
	//  maxDigits = 3

	// 2) Loop number of times equal to maxDigits
	for (let k = 1; k <= maxDigits; k++) {

		// 3) create 10 buckets (bec we're using base 10 radix, each bucket each representing digits 0-9)
		let buckets = [ [], [], [], [], [], [], [], [], [], [] ];
		
		// 4) loop through integers, looking at only the digit in the kth place
		for (let i = 0; i < arr.length; i++) {
	
			let num = arr[i];
			// i = 0:	num = 23
			// i = 1:	num = 1
			// i = 2:	num = 263
			// i = 3:	num = 40
	
			// 4) Get digit from the kth place
			let digit = getDigitFrom(num, k);
			// i = 0: digit = 3
			// i = 1: digit = 1
			// i = 2: digit = 3
			// i = 3: digit = 0
	
			// 5) Add integer to appropriate bucket, (determined by digit)
			buckets[digit].push(num);
			// i = 0: buckets = [ [], [], [], [23], [], [], [], [], [], [] ]
			// i = 1: buckets = [ [], [1], [], [23], [], [], [], [], [], [] ]
			// i = 2: buckets = [ [], [1], [], [23, 263], [], [], [], [], [], [] ]
			// i = 3: buckets = [ [40], [1], [], [23, 263], [], [], [], [], [], [] ]
		}
	
		// 6) Create new list by "flattening" numbers in buckets
		arr = [].concat(...buckets);
		// arr = [ 40, 1, 23, 263 ]
	}

	return arr;
}
// console.log(radixSort([23, 1, 263, 40]));																				//=> [ 1, 23, 40 263 ]



// Helper function
// (23, 1)			=>   3
// (23, 2)			=>   2
function getDigitFrom(num, nthPlace) {																					// nthPlace = nth place from right of num (not same as place value in ones, tens, etc...)
	// return Math.floor(Math.abs(num) / Math.pow(10, nthPlace - 1)) % 10;				// for negative nums
	return Math.floor(num/Math.pow(10, nthPlace - 1)) % 10;
}
// console.log(getDigitFrom(23, 1));					//=> 3
// console.log(getDigitFrom(23, 2));					//=> 2



// Helper function
// 23 	=>	2
// 234 	=>	3
function getIntLength(num) {
	if (num === 0) {
		return 1;
	} else {
		return Math.floor(Math.log10(Math.abs(num))) + 1;
	}
}
// console.log(getIntLength(23));								//=> 2
// console.log(getIntLength(234));							//=> 3



// Helper Function
// [ 23, 1, 269, 40, 0 ]			=>    3						bec 269 has the most digits and has 3 digits
function getMaxDigits(nums) {
	let maxDigits = 0;
	for (let i = 0; i < nums.length; i++) {
		maxDigits = Math.max(maxDigits, getIntLength(nums[i]));
	}
	return maxDigits;
}
// console.log(getMaxDigits([ 23, 1, 269, 40, 0 ]));														//=> 3




// 2.3		=>  2
// function myFloor(num) {
// 	let remainder = num % 1;

// 	return num - remainder;
// }
// console.log(myFloor(2.3));		//=> 2
// console.log(myFloor(2.6));		//=> 2
// console.log(myFloor(.6));			//=> 0




module.exports = {
	radixSort
};