// USES ADJACENCY LIST
// let graph1 = {
//     'a': ['b'],
//     'b': ['a'],
//     'c': ['d'],
//     'd': ['e', 'c'],
//     'e': ['d'],
// };


// *****************************************************************************
// VERSION 1- Helper function that uses Depth First Recursion
// Returns Number of connected components that make up the full graph
// Example:
// let graph1 = {
// 		'a': ['b'],
// 		'b': ['a'],
// 		'c': ['d'],
// 		'd': ['e', 'c'],
// 		'e': ['d'],
// };
//
//  	C ↔  D      A ↔ B
//         ↕
//         E     
// 
// Returns => 2

function numRegions(graph) {
	let visited = new Set();
	let regions = 0;
	
	for (let node in graph) {																											// traverse graph by looping through keys (nodes)

		if (_depthFirstRecur(node, graph, visited)) regions++;											// number of times we call this helper == number of regions there are
	}	

	return regions;
}


// HELPER returns true for every region
// The number of times we call this function == number of regions there are
function _depthFirstRecur(node, graph, visited) {
	if (visited.has(node)) return false;

	visited.add(node);

	graph[node].forEach(neighbor => {
		_depthFirstRecur(neighbor, graph, visited);		
	});

	return true;
}


// EXAMPLE 1:
// let graph1 = {
// 	'a': ['b'],
// 	'b': ['a'],
// 	'c': ['d'],
// 	'd': ['e', 'c'],
// 	'e': ['d'],
// };

// console.log(numRegions(graph1));			//=> 2


module.exports = {
	numRegions
};




