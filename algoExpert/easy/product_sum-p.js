// ALGO EXPERT Product Sum
// EASY
// https://www.algoexpert.io/questions/Product%20Sum
//
// INPUT:  array
// OUTPUT: number
//
// Write a function that takes in a "special" array and returns its product sum.
// 
// A "special" array is a non - empty array that contains either integers or 
// other "special" arrays.The product sum of a "special" array is the sum of its
// elements, where "special" arrays inside it are summed themselves and then
// multiplied by their level of depth.
//
// The depth of a "special" array is how far nested it is.For instance, the
// depth of [] is 1; the depth of the inner array in [[]] is 2; the depth of
// the innermost array in [[[]]] is 3.
// Therefore, the productsum of [x, y] is x + y; the product sum of 
// [x, [y, z]] is x + 2 * (y + z);
//
// EXAMPLE 1:
// [ 5, 2, [7, -1], 3, [6, [-13, 8], 4] ]   => 12
//   5 + 2 + 2*(7 - 1) + 3 + 2*(6 + 3*(-13 + 8) + 4)
// 
// EXAMPLE 2:
// [1, 2, [3], 4, 5]                        => 18


// TIME: 
// *****************************************************************************
// VERSION 1- recursion, add extra parameter in function to track multiplier
// TIME COMPLEXITY:  O(N),    N = array length
// SPACE COMPLEXITY: O(D)     D = greatest depth of the "special" arrays in arrays

// [ 5, 2, [7, -1], 3, [6, [13, 8], 4] ]   => 12
function productSum(array, m = 1) {
  
}


// EXAMPLE 1:
console.log(productSum([5, 2, [7, -1], 3, [6, [-13, 8], 4]]));    //=> 12

// EXAMPLE 2:
console.log(productSum([1, 2, [3], 4, 5]));                       //=> 18