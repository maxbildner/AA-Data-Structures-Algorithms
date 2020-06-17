// helper function swaps elements at given indexes, mutates input array
// ['a', 'b', 'c'], 0, 2		=>   ['c', 'b', 'a']
function swap(arr, idx1, idx2) {
	let previousValIdx1 = arr[idx1];
	// previousValIdx1 = 'a'

	// replace val at idx1 with val at idx2
	arr[idx1] = arr[idx2];
	// arr = ['c', 'b', 'c']

	// replace val at idx2 with old val from idx1
	arr[idx2] = previousValIdx1;
	// arr = ['c', 'b', 'a']

	return arr;
}


// ATTEMPT V1
// [2, -1, 4, 3, 7, 3] 
// [2,   -1,   4, 3, 7, 3]  =>  [-1, 2, 3, 3, 4, 7]
// [-1, 2,   4,   3, 7, 3]
// [-1, 2, 3,   4,   7, 3]
// [-1, 2, 3, 4,   7,   3]
// In place sort (mutates input array)
// function insertionSort(arr) {
	
// 	// loop through nums in array
// 	for (let i = 0; i < arr.length; i++) {
// 		let currentNum = arr[i];
// 		// i = 0: currentNum = 2
// 		// i = 1: currentNum = -1
// 		// i = 2: currentNum = 4
// 		// i = 3: currentNum = 3
// 		// i = 4: currentNum = 7

// 		// look through the sorted left side of array for where to place currentNum
// 		for (let j = i; j > 0; j--) {
// 			// i = 0, j = 0: 		0 > 0   false
// 			// i = 1, j = 1: 		1 > 0		true
// 			// i = 1, j = 0: 		0 > 0		false
// 			// i = 2, j = 2: 		2 > 0		true
// 			// i = 3, j = 3: 		3 > 0		true
// 			// i = 4, j = 4: 		7 > 0		true
// 			// i = 4, j = 4: 		7 > 0		true

// 			let innerLoopNum = arr[j];
// 			// i = 1, j = 1:		innerLoopNum = -1
// 			// i = 2, j = 2:		innerLoopNum = 4
// 			// i = 3, j = 3:		innerLoopNum = 3
// 			// i = 4, j = 4:		innerLoopNum = 7

// 			let previousNum = arr[j - 1];
// 			// i = 1, j = 1:		previousNum = 2
// 			// i = 2, j = 2:		previousNum = 2
// 			// i = 3, j = 3:		previousNum = 4
// 			// i = 4, j = 4:		previousNum = 4

// 			if (currentNum < previousNum) {
// 				// i = 1, j = 1:		-1 < 2		true
// 				// i = 2, j = 2:		4 < 2			false
// 				// i = 3, j = 3:		3 < 4			true
// 				// i = 4, j = 4:		7 < 4			false

// 				swap(arr, i, j - 1);
// 				// i = 1, j = 1:		arr = [-1, 2, 4, 3, 7, 3] 
// 				// i = 3, j = 3:		arr = [-1, 2, 3, 4, 7, 3] 

// 				break;
// 			}
// 		}
// 	}

// 	return arr;
// }



// [2], -1   			=>  [-1, 2]
// [-1, 2], 4   	=>  [-1, 2, 4]
// [-1, 2, 4], 0  =>  [0, -1, 2, 4]
// function insertionSortHelper(arr, currentNum) {
	
// 	// loop through nums in array from right to left
// 	for (let i = arr.length - 1; i >= 0; i--) {
// 		let num = arr[i];
// 		// i = 0: num = 2

// 		if (currentNum < num) {
// 			// i = 0:		-1 < 2		true

// 			swap(arr)
// 		}
	
// 	}

// 	return arr;
// }
// console.log(insertionSortHelper([2], -1));				//=>  [-1, 2]
// console.log(insertionSortHelper([-1, 2], 4));			//=>  [-1, 2, 4]
// console.log(insertionSortHelper([-1, 2, 4], 0));	//=>  [0, -1, 2, 4]



// ATTEMPT V2- (AA SOLUTION)
// [ 5, 2, 1, 2 ]			=> [ 1, 2, 2, 5]
// In place sort (mutates input array)
function insertionSortV2(arr) {

	// 1) Loop through nums in array (but start at 2nd num, no need to start at 1st bec 1st num by itself already sorted)
	for (let i = 1; i < arr.length; i++) {

		// 2) Grab first num of unsorted region
		let currentNum = arr[i];
		// i = 1: 	currentNum = 2
		// i = 2: 	currentNum = 1
		// i = 3: 	currentNum = 2

		// the `j` loop will iterate left through the sorted region,
		// looking for a legal spot to insert currElement
		// 3) Loop (right to left) look through the sorted left side of array for where to place currentNum
		// keep moving left while currElement is less than the j-th element
		for (var j = i - 1; j >= 0 && currentNum < arr[j]; j--) {										// arr[j] represents ?
			// i = 1, j = 0:		 0 >= 0 && 2 < 5						true && true			true
			// i = 1, j = -1:		-1 >= 0 && 2 < undefined		false && false		false
			// i = 2, j = 1:		 1 >= 0 && 1 < 5						true && true			true
			// i = 2, j = 0:		 0 >= 0 && 1 < 2						true && true			true
			// i = 2, j = -1:		-1 >= 0 && 1 < undefined		false && false		false
			// i = 3, j = 2:		 2 >= 0 && 2 < 5						true && true			true
			// i = 3, j = 1:		 1 >= 0 && 2 < 2						true && false			false
		
			// 4) Replace val at innerIdx + 1 with val at innerIdx
			arr[j + 1] = arr[j];
			// 																														arr = [ 5, 2, 1, 2 ]		#0
			// i = 1, j = 0:		arr[0 + 1] = arr[0]			arr[1] = arr[0]		arr = [ 5, 5, 1, 2 ]		#1
			// i = 2, j = 1:		arr[1 + 1] = arr[1]			arr[2] = arr[1]		arr = [ 2, 5, 5, 2 ]		#3
			// i = 2, j = 0:		arr[0 + 1] = arr[0]			arr[1] = arr[0]		arr = [ 2, 2, 5, 2 ]		#4
			// i = 3, j = 2:		arr[2 + 1] = arr[2]			arr[3] = arr[2]		arr = [ 1, 2, 5, 5 ]		#6
			// console.log("inner: ", "i:", i, "j:", j, " ", arr);		
		}
		
		// 5) Replace val at innerIdx + 1 with currentNum
		arr[j + 1] = currentNum;
		// i = 1, j = -1:			arr[-1 + 1] = 2			arr[0] = 2						arr = [ 2, 5, 1, 2 ]		#2
		// i = 2, j = -1:			arr[-1 + 1] = 1			arr[0] = 1						arr = [ 1, 2, 5, 2 ]		#5
		// i = 3, j = 1:			arr[1 + 1] = 2			arr[2] = 2						arr = [ 1, 2, 2, 5 ]		#7
		// console.log("outer: ", "i:", i, "j:", j, " ", arr);		
		// console.log(" ");		
	}

	return arr;
}																													
// console.log(insertionSort([2, -1, 4, 3, 7, 3]));															//=>  [-1, 2, 3, 3, 4, 7]
// console.log(insertionSort([5, 2, 1, 2]));																				//=>  [ 1, 2, 2, 5]





// ATTEMPT V3- Not as efficient as V2, but still same worst case Time
// Time Complexity: O(N^2)		bec. inner 3 loops simply to O(N) + O(N) + O(N) 	-> O(N + N + N)   ->  O(3N)   -> O(N)
// [ 3, 4, 1, 2 ]			=> [ 1, 2, 3, 4]
// In place sort (mutates input array)
function insertionSort(arr) {

	// 1) Loop through nums in array (but start at 2nd num, no need to start at 1st bec 1st num by itself already sorted)
	for (let i = 1; i < arr.length; i++) {

		// 2) Grab first num of unsorted region
		let currentNum = arr[i];

		// 3) Loop (right to left) look through the sorted left side of array for where to place currentNum
		for (var j = i - 1; j >= 0; j--) {													

			let leftNum = arr[j];

			if (currentNum > leftNum) break;
		}

		// insert currentNum at index j + 1 (+ 1 to offset -1 in for loop), all nums get moved to right of insertion
		arr.splice(j + 1, 0, currentNum);
		
		// delete currentNum from old position
		arr.splice(i + 1, 1);
	}

	return arr;
}																													
// console.log(insertionSortV3([2, -1, 4, 3, 7, 3]));														//=>  [-1, 2, 3, 3, 4, 7 ]
// console.log(insertionSortV3([5, 2, 1, 2]));																	//=>  [ 1, 2, 2, 5 ]
// console.log(insertionSortV3([3, 4, 1, 2]));																	//=> 	[ 1, 2, 3, 4 ]





module.exports = {
	insertionSort
};