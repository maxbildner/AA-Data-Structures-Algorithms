// ['a', 'b', 'c'], 0, 2     =>     ['c', 'b', 'a']
// mutates array
function swap(array, idx1, idx2) {
	let oldValIdx2 = array[idx2];																									// copy val at idx2
	// oldValIdx2 == 'c'
	
	array[idx2] = array[idx1];  																									// replace val at idx2 with val at idx1
	// array == ['a', 'b', 'a']
	
	array[idx1] = oldValIdx2;																											// replace val at idx1 with old val at idx2
	// array == ['c', 'b', 'a']

	return array;
}


// [2, -1, 4, 3, 7, 3]  =>  [-1, 2, 3, 3, 4, 7]
// mutates array (in place sort)
// Time Complexity: O(N^2), N = array length
// Space Complexity: O(1)
function bubbleSort(array) {
	// create boolean flag to track whether last pair of nums was swapped
	let swapped = true;

	// keep looping until array is sorted (last pair is not swapped)
	while (swapped) {

		// set swapped flag to false (need this so we can break out of loop)
		swapped = false;

		// loop through array until 2nd to last num (bec of i + 1 below)
		for (let i = 0; i < array.length - 1; i++) {
			let num1 = array[i];
			let num2 = array[i + 1];
		
			// if num1 > num2 (out of order, so swap)
			if (num1 > num2) {
				// 1, i = 0: 2 > -1  true
				// 1, i = 1: 2 > 4   false
				// 1, i = 2: 4 > 3   true
				// 1, i = 3: 4 > 7   false
				// 1, i = 4: 7 > 3   true

				// call helper func and swap pair
				swap(array, i, i + 1);
				// 1, i = 0: array == [ -1, 2, 4, 3, 7, 3 ]
				// 1, i = 2: array == [ -1, 2, 3, 4, 7, 3 ]
				// 1, i = 4: array == [ -1, 2, 3, 4, 3, 7 ]

				// set swapped flag to tru bec we just swapped
				swapped = true;
				// 1, i = 0: swapped = true
				// 1, i = 2: swapped = true
				// 1, i = 4: swapped = true
			}
		}
	}

	return array;
}


module.exports = {
    bubbleSort,
    swap
};


