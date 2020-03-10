// *****************************************************************************
// 1) STEPPER
// Write a function, stepper(nums), that takes in an array of non negative numbers.
// Each element of the array represents the maximum number of steps you can take from that position in the array.
// The function should return a boolean indicating if it is possible to travel from the 
// first position of the array to the last position.
//
// For Example:
//
// Given [3, 1, 0, 5, 10]
//      - We begin at first position, 3. 
//      - Since the element is 3 we can take up to 3 steps from this position.
//      - This means we can step to the 1, 0, or 5
//      - Say we step to 1
//      - Since the element is 1, now the only option is to take 1 step to land on 0
//      - etc...
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
// stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
// stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end

// SOLUTION 1- TABULATION
// Ex. ([3, 1, 0, 5, 10]) 	=>	true
// function stepper(nums) {
// 	// 1) create table (array) where each val is a bool referring to whether
// 	// it's possble to step from the 1st position to that vals position
// 	let table = new Array(nums.length).fill(false);
// 	// table = [ false, false, false, false, false]
	
// 	// 2) populate first val in table (trivial case will always be true)
// 	table[0] = true;
// 	// table = [true, false, false, false, false]

// 	// 3) loop through each val in table
// 	for (let i = 0; i < table.length; i++) {
		
// 		// 4) if current val is true
// 		if (table[i] === true) {
// 			let range = nums[i];

// 			// 5) loop from 1 to (range, AND we're not at the end of the table)
// 			for (let step = 1; (step <= range) && (i + step < table.length); step++) {

// 				// 6) populate table with true
// 				table[i + step] = true;
// 			}
// 		}
// 	}

// 	// 7) return last val in table
// 	return table[table.length - 1];
// }


// SOLUTION 2- MEMOIZATION
// Ex. ([3, 1, 0, 5, 10]) 	=>	true
// memo object keys = inputs, values = outputs of previous function calls
function stepper(nums, memo={}) {
	if (nums.length in memo) return memo[nums.length];
	// 1st: [3, 1, 0].length in memo			3 in {}		false
	// 2nd: [1, 0].length in memo					2 in {}		false

	// base cases if nums only has 1 val or empty
	if (nums.length === 1) return true;
	if (nums.length === 0) return false;

	// first num in nums
	let range = nums[0];
	// 1st: range = [3, 1, 0][0] 	= 3
	// 2nd: range = [1, 0][0] 		= 1
	
	// loop from 1 to range
	for (let step = 1; step <= range; step++) {
		if (stepper(nums.slice(step), memo)) {
			// 1st, step = 1: stepper([3, 1, 0].slice(1), {})
			// 1st, step = 1: stepper([1, 0], {}) 

			// 2nd, step = 1: stepper([1, 0].slice(1), {})
			// 2nd, step = 1: stepper([0], {})	== true
			
			memo[nums.length] = true;
			// 2nd, step = 1: memo[ [1, 0].length ] = true
			// 2nd, step = 1: memo[ 2 ] = true			memo = { 2:true }

			// console.log(step, nums, memo);
			return true;
		}
	}

	memo[nums.length] = false;
	return false;
}
// console.log(stepper([2, 3, 1, 1, 0, 4, 7, 8]));		//=> false
// console.log(stepper([3, 1, 0, 5, 10]));						//=> true
// console.log(stepper([3, 1]));											//=> true
// console.log(stepper([3, 1, 0]));										//=> true



// *****************************************************************************
// 2) maxNonAdjacentSum
// Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative numbers.
// The function should return the maximum sum of elements in the array we can get if we cannot take
// adjacent elements into the sum.
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// maxNonAdjacentSum([2, 7, 9, 3, 4])   // => 15, because 2 + 9 + 4
// maxNonAdjacentSum([4,2,1,6])         // => 10, because 4 + 6 

// SOLUTION 1- TABULATION
// Ex. [4, 2, 1, 6]		=> 10 bec. 4 + 6
function maxNonAdjacentSum(nums) {
	// if input nums empty
	if (nums.length === 0) return 0;

	// build table, fill with undefineds for now
	let table = new Array(nums.length).fill();
	
	// populate first val with first val of nums
	table[0] = nums[0];

	// loop through table and fill other vals
	for (let i = 1; i < table.length; i++){
		// current num in NUMS
		let currentNum = nums[i];
		
		// grab last last num in TABLE (if undefined, make it 0)
		let skipLeftNeighbor = table[i - 2] === undefined ? 0 : table[i - 2];

		let bestWithThisNum = currentNum + skipLeftNeighbor;

		// grab previous num in TABLE
		let bestWithoutThisNum = table[i - 1];
	
		// assign table val the larger of the two nums (with/without)
		table[i] = Math.max(bestWithThisNum, bestWithoutThisNum);
	}

	// return last val in table
	return table[table.length - 1];
}
// console.log(maxNonAdjacentSum([4, 2, 1, 6]));		//=> 10



// SOLUTION 2- MEMOIZATION
// Ex. [4, 2, 1, 6]		=> 10 bec. 4 + 6
function maxNonAdjacentSum(nums) {
	
}



// *****************************************************************************
// 3) minChange
// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// You've seen this problem before with memoization, but now solve it using the Tabulation strategy!
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100
function minChange(coins, amount) {

}


module.exports = {
    stepper,
    maxNonAdjacentSum,
    minChange
};