// LC 70 Climbing Stairs
// EASY
// https://leetcode.com/problems/climbing-stairs/
// You are climbing a stair case. It takes n steps to reach to the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can 
// you climb to the top ? Note : Given n will be a positive integer.
// 
// Ex1:
// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// 
// Ex2:
// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step


// SOLUTION1- AA Solution using Dynamic Programming Tabulation
// Time Complexity: O(n),   where n = input num
// Space Complexity: O(n),  size of table array
// Solution Description:
//  First we create create a new table of length n + 1 (incase we n = 0)
//  Each val in table refers to num of distinct ways to climb to top, where
//  the idx refers to n. Then we populate the first two vals with trivial cases
//  lastly, we loop through and populate the rest of the values. 
// n    table         output
// 0    [1, 1]        1
// 1    [1, 1]        1
// 2    [1, 1, 2]     2
// 3    [1, 1, 2, 3]  3
// Note: 
// f(2) = f(1) + f(0)         = 1 + 1  = 2
// f(3) = f(2) + f(1)         = 2 + 1  = 3
// f(n) = f(n - 1) + f(n - 2)
// 
// Ex. 3    =>  3
function climbStairs(n) {
  // 1) create empty table of length n + 1 
  // We have "n + 1" incase n = 0, we can take 0 steps. Note* choosing to take
  // 0 steps itself is 1 action
  let table = new Array(n + 1);
  // table = [ <4 empty items> ]

  // 2) assign 1st two vals in table
  table[0] = 1
  table[1] = 1
  // table = [ 1, 1, <2 empty items> ]

  // 3) loop through rest of the table
  for (let i = 2; i < table.length; i++) {

    // 4) current value in table = previous val in table + previous previous val
    table[i] = table[i - 1] + table[i - 2];
  }

  // return last val in table
  return table[table.length -1];
}


console.log(climbStairs(0));     //=> 1
console.log(climbStairs(1));     //=> 1
console.log(climbStairs(2));     //=> 2
console.log(climbStairs(3));     //=> 3