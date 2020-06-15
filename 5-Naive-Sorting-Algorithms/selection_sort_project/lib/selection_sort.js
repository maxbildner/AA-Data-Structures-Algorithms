// ['a', 'b', 'c'], 0, 2       =>  ['c', 'b', 'a']
// mutates input array
function swap(arr, idx1, idx2) {
	let oldValIdx1 = arr[idx1];

	// replace val at idx1  with val at idx2
	arr[idx1] = arr[idx2];
	// arr == ['c', 'b', 'c']

	// replace val at idx2 with old val from idx1
	arr[idx2] = oldValIdx1
	// arr = ['c', 'b', 'a']

	return arr;
}


// [2, 3, 1, 4]		=> 2
function findMinValIndex(arr) {
	return arr.reduce((accumulator, curr, idx) => {
		return (curr < arr[accumulator]) ? idx : accumulator;
	}, 1);
}
// console.log(findMinValIndex([2, 2, 2, 2]));	 //=> 1
// console.log(findMinValIndex([3, 2, 1, 4]));	 //=> 2


// [2, -1, 4, 3, 7, 3]   =>  [-1, 2, 3, 3, 4, 7]
// mutates array (inplace)
// VERSION1- Uses helper funtion (.reduce)
// function selectionSort(arr) {

// 	for (let i = 0; i < arr.length - 1; i++) {
// 		let minValIdx = findMinValIndex(arr.slice(i)) + i;
// 		swap(arr, i, minValIdx);
// 	}

// 	return arr;
// }



// [2, -1, 4, 3, 7, 3]   =>  [-1, 2, 3, 3, 4, 7]
// mutates array (inplace)
// VERSION2- No Helper Function
function selectionSort(arr) {

	// loop through each num in array
	for (let i = 0; i < arr.length; i++) {
		let minIdx = i;

		// loop through each num in array (but start with next num i + 1)
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[i]) minIdx = j; 
		}

		swap(arr, i, minIdx);
	}

	return arr;
}
// console.log(selectionSort([2, -1, 4, 3, 7, 3]));


module.exports = {
	selectionSort,
	swap
};