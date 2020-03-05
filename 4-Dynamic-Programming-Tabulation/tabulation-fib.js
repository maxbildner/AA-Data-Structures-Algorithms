// Tabulation Notes
// 1) Tabulation
//   - function we’re writing is iterative and not recursive
//   - an additional data structure is used(usually an array = table)

// 2) Tabulation Guidelines
//    1. Create table array based off size of input
//    2. Initialize some values in array that represent the most basic subproblem
//    3. Loop through array and fill remaining values
//    4. Final answer is usually last value in array

// 3) Example:
// fib(0);      // => 0
// fib(1);      // => 1
// fib(2);      // => 1
// fib(6);      // => 8
// fib(7);      // => 13

// VERSION1- Tabulation, but O(n) space
// Time Complexity: O(n), n = length of table or input num
// Space Complexity: O(n)
// fib(6) => 8
function tabulatedFib(n) {
  // create blank array of length n
  let table = new Array(n);

  // seed first 2 elements in array
  table[0] = 0;
  table[1] = 1;

  // complete the table by looping through left->right
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2];
    // i = 2: table = [ 0, 1, 1, x, x, x, x ]
    // i = 3: table = [ 0, 1, 1, 2, x, x, x ]
    // i = 4: table = [ 0, 1, 1, 2, 3, x, x ]
    // i = 5: table = [ 0, 1, 1, 2, 3, 5, x ]
    // i = 6: table = [ 0, 1, 1, 2, 3, 5, 8 ]
  }

  return table[n];
}
// console.log(tabulatedFib(6));       //=> 8



// VERSION2- No Tabulation, but optimized O(1) space
// Time Complexity: O(n), n = length of table or input num
// Space Complexity: O(1)

// fib(4) => 3
function tabulatedFib2(n) {
  // 'Edge cases'
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  // Only keep track of last 2 nums
  let secondLast = 0;
  let last = 1;
  
  // loop from 2 to n (inclusive)
  for (let i = 2; i <= n; i++) {
    // save last num 
    let temp = last;
    // i = 2: temp = 1
    // i = 3: temp = 1
    // i = 4: temp = 2

    // recalcualte last
    last = secondLast + last;
    // i = 2: last = 0 + 1 = 1
    // i = 3: last = 1 + 1 = 2
    // i = 4: last = 1 + 2 = 3

    // reassign secondLast
    secondLast = temp;
    // i = 2: secondLast = 1
    // i = 3: secondLast = 1
    // i = 4: secondLast = 2
  }

  return last;
}

console.log(tabulatedFib2(4));       //=> 3