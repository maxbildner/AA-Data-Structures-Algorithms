// Work through this problem on https://leetcode.com/problems/coin-change-2/ 
// and use the specs given there.
// Feel free to use this file for scratch work.
// You are given coins of different denominations and a total amount of money.
// Write a function to compute the number of combinations that make up that 
// amount.You may assume that you have infinite number of each kind of coin.
// Example:
// Input: amount = 5, coins = [1, 2, 5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5 = 5
// 5 = 2 + 2 + 1
// 5 = 2 + 1 + 1 + 1
// 5 = 1 + 1 + 1 + 1 + 1
// You can assume that:
//    0 <= amount <= 5000
//    1 <= coin <= 5000
//    the number of coins is less than 500
//    the answer is guaranteed to fit into signed 32 - bit integer
/*
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
*/

// V1- WITHOUT MEMOIZATION
/*
// 5, [1, 2, 5]     => 4
function coinChange2(amount, coins, memo={}) {
  // if 0 amount is asked, we can give them nothing back which counts as 1 way to give them back something
  if (amount === 0) return 1;   
  
  // grab last coin
  let currentCoin = coins[coins.length - 1];

  let total = 0;

  // qty = quantity
  for (let qty = 0; qty * currentCoin <= amount; qty++) {
    let value = qty * currentCoin

    // decrease amount by value, then pass into next recursive call
    // make sure we only pass in all coins except for last coin into next call
    total += coinChange2(amount - value, coins.slice(0, -1));
  }

  return total;
};
*/



// V2- WITH MEMOIZATION
// 5, [1, 2, 5]     => 4
function coinChange2(amount, coins, memo={}) {
  // if 0 amount is asked, we can give them nothing back which counts as 1 way to give them back something
  if (amount === 0) return 1;

  let key = amount + '-' + coins;
  // ex. '5-1,2,3'

  if (amount in memo) return memo[amount];

  // grab last coin
  let currentCoin = coins[coins.length - 1];

  let total = 0;

  // qty = quantity
  for (let qty = 0; qty * currentCoin <= amount; qty++) {
    let value = qty * currentCoin

    // decrease amount by value, then pass into next recursive call
    // make sure we only pass in all coins except for last coin into next call
    total += coinChange2(amount - value, coins.slice(0, -1), memo);
  }

  memo[key] = total;
  return memo[key];
};

console.log(coinChange2(0, [1, 2, 5]));                     //=> 1
console.log(coinChange2(3, [2]));                           //=> 0
console.log(coinChange2(10, [10]));                         //=> 1
console.log(coinChange2(5, [1, 2, 5]));                     //=> 4
console.log(coinChange2(500, [3, 5, 7, 8, 9, 10, 11]));     //=> 
