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



// ATTEMPT V2- 
// [2, -1, 4, 3, 7, 3]  =>  [-1, 2, 3, 3, 4, 7]
// In place sort (mutates input array)
function insertionSort(arr) {

	// loop through nums in array (but start at 2nd num, no need to start at 1st)
	for (let i = 1; i < arr.length; i++) {
		let currentNum = arr[i];

		// loop (right to left) look through the sorted left side of array for where to place currentNum
		for (var j = i - 1; j >= 0 && currentNum < arr[j]; j--) {
		
			// replace val at innerIdx + 1 with val at innerIdx
			arr[j + 1] = arr[j];
		}

		// insert currentNum into old spot
		arr[j + 1] = currentNum;
	}

	return arr;
}																													
console.log(insertionSort([2, -1, 4, 3, 7, 3]));																//=>  [-1, 2, 3, 3, 4, 7]

module.exports = {
	insertionSort
};