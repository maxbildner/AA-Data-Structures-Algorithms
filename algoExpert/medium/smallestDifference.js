// ALGO EXPERT Smallest Difference
// MEDIUM
// https://www.algoexpert.io/questions/Smallest%20Difference
//
// Write a function that takes in two non - empty arrays of integers, finds the
// pair of numbers(one from each array) whose absolute difference is closest to
// zero, and returns an array containing these two numbers, with the number 
// from the first array in the first position.
// 
// Note that the absolute difference of two integers is the distance between
// them on the real number line.For example, the absolute difference of - 5 and 5
// is 10, and the absolute difference of - 5 and - 4 is 1.
// 
// You can assume that there will only be one pair of numbers with the smallest
// difference.
// 
// INPUTS: array, array
// OUTPUT: array
// 
// EXAMPLE 1:
// ([-1, 5, 10, 20, 28, 3], 
//  [20, 134, 135, 15, 15, 17])     => [ 28, 26 ]


// TIME: 
// *****************************************************************************
// VERSION 1- 
//      1- sort arrays in place
//      2- use two pointers starting at beginnning of botha arrays
//      3- increment pointers of smaller of nums
// TIME COMPLEXITY:  O(N * logN  +  M * logM),  N = length of array1, M = length of array2
// SPACE COMPLEXITY: O(1)                       in place sort, mutates arrays     

// let arr1 = [-1, 5, 10, 20, 28, 3];
// let arr2 = [20, 134, 135, 15, 15, 17];
// (arr1, arr2))                                    => [ 28, 26 ]
function smallestDifference(arrayOne, arrayTwo) {
  
	// sort arrays in place increasing order
	arrayOne.sort((a,b) => a - b);
	arrayTwo.sort((a,b) => a - b);
	
	let pair = [];
	
	// use two pointers starting at begin of both arrays
	let l = 0;
	let r = 0;
	
	// create var to track smallestDiff
	let smallestDiff = +Infinity;
	
	// loop through arrays until either empty
	while (l < arrayOne.length && r < arrayTwo.length) {
		let num1 = arrayOne[l];
		let num2 = arrayTwo[r];
		
		// calculate absolute delta
		let absDiff = Math.abs(num1 - num2);
		
		// exit if absolute delta == 0
		if (absDiff === 0) return [num1, num2];
		
		// update smallestDiff
		if (absDiff < smallestDiff) { 
			smallestDiff = absDiff;
			pair = [ num1, num2 ];
		}
		
		// increment pointer of smallest of two nums
    (num1 < num2) ? l++ : r++;
	}
	
	return pair;
}



let arr1 = [-1, 5, 10, 20, 28, 3];
let arr2 = [26, 134, 135, 15, 17];
console.log(smallestDifference(arr1, arr2));    //=> [ 28, 26 ]

