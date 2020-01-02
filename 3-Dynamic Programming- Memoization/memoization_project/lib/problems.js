// Write a function, lucasNumberMemo(n), that takes in a number.
// The function should return the n-th number of the Lucas Sequence.
// The 0-th number of the Lucas Sequence is 2.
// The 1-st number of the Lucas Sequence is 1
// To generate the next number of the sequence, we add up the previous two numbers.
//
// For example, the sequence begins: 2, 1, 3, 4, 7, 11, ...
//
// Solve this recursively with memoization.
//
// Examples:
//
// lucasNumberMemo(0)   // => 2
// lucasNumberMemo(1)   // => 1
// lucasNumberMemo(40)  // => 228826127
// lucasNumberMemo(41)  // => 370248451
// lucasNumberMemo(42)  // => 599074578
function lucasNumberMemo(n, memo = {}) {
	if (n === 0) return 2;                                                      // base cases
	if (n === 1) return 1;
	// if n is a key inside the memo object, return the corresponding value
	if (n in memo) return memo[n];

	// memoize/store result in memo object with key as input, val result
	memo[n] = lucasNumberMemo(n - 1, memo) + lucasNumberMemo(n - 2, memo);
	return memo[n];
}


// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should return the minimum number 
// of coins needed to make the target amount. A coin value can be used multiple times.
//
// After you pass the first 3 examples, you'll likely need to memoize your code 
// in order to pass the 4th example in a decent runtime.
//
// Examples:
//  
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100

// WITHOUT MEMOIZATION
/*
// [1, 2, 5], 5
function minChange(coins, amount, memo = {}) {
	// base case if target amount is nothing, we give back nothing
	if (amount === 0) return 0;

	// will contain nums, where each num refers to quantity of coins that add up to target
	let numCoins = [];

	// loop through each coin in coins array
	for (let i = 0; i < coins.length; i++) {
		let coin = coins[i];
		// 1st, i = 0: coin = 1
		// 2nd, i = 0: coin = 1
		
		// we don't want to have negative coins
		if (coin <= amount) {
			// 1st, i = 0: 1 <= 5		true
			// 2nd, i = 0: 1 <= 4		true
			numCoins.push(minChange(coins, amount - coin) + 1);
			// 1st, i = 0: numCoins.push(minChange(coins, 5 - 1) + 1)
			// 1st, i = 0: numCoins.push(minChange(coins, 4) + 1)

			// 2nd, i = 0: numCoins.push(minChange(coins, 4 - 1) + 1)
			// 2nd, i = 0: numCoins.push(minChange(coins, 3) + 1)

			// 3rd, i = 0: numCoins.push(minChange(coins, 3 - 1) + 1)
			// 3rd, i = 0: numCoins.push(minChange(coins, 2) + 1)

			// 4th, i = 0: numCoins.push(minChange(coins, 2 - 1) + 1)
			// 4th, i = 0: numCoins.push(minChange(coins, 1) + 1)					
			// 4th, i = 0: numCoins.push(1 + 1)														-> .push(2)

			// 5th, i = 0: numCoins.push(minChange(coins, 1 - 1) + 1)			-> .push(1)
			// 5th, i = 0: numCoins.push(minChange(coins, 0) + 1)				
			// 5th, i = 0: numCoins.push(0 + 1)
			// console.log(coin);
		}
	}

	// console.log(numCoins)
	// console.log('---')
	// return the smallest number in our numCoins array
	return Math.min(...numCoins);
}
minChange([1,2,5],5);
*/



// WITH MEMOIZATION
function minChange(coins, amount, memo = {}) {
	if (amount in memo) return memo[amount];
	// base case if target amount is nothing, we give back nothing
	if (amount === 0) return 0;

	// will contain nums, where each num refers to quantity of coins that add up to target
	let numCoins = [];

	// loop through each coin in coins array
	for (let i = 0; i < coins.length; i++) {
		let coin = coins[i];

		// we don't want to have negative coins
		if (coin <= amount) {
			numCoins.push(minChange(coins, amount - coin, memo) + 1);
		}
	}

	// memoize smallest number in our numCoins array
	memo[amount] = Math.min(...numCoins);

	// return memoized result
	return memo[amount];
}




module.exports = {
	lucasNumberMemo,
	minChange
};