// definition of GraphNode:
// class GraphNode {
// 	constructor(val) {
// 		this.val = val;
// 		this.neighbors = [];
// 	}
// }

// *****************************************************************************
// VERSION1- MY SOLUTION- DEPTH SEARCH ITERATIVELY
// - USES GRAPH NODE AND NEIGHBORS ARRAY (no adj list/matrix)
// - visit all nodes on current level before moving down (use queue shift/push)
// (GraphNode 5)   => 10
function maxValueV1(node, visited=new Set()) {
	let stack = [node];																														// use stack array for nodes to visit, initialize with node
	let maxNum = -Infinity;																												// absurdly low negative num, so we can overwrite later

	while (stack.length) {																												// loop while nodes in stack

		let removedNode = stack.pop();																							// remove last node in stack to visit

		if (removedNode.val > maxNum) maxNum = removedNode.val;											// update maxNum

		visited.add(removedNode);																										// add removed node to visited
		
		removedNode.neighbors.forEach(neighbor => {																	// add removedNode's children to stack
			if (!visited.has(neighbor)) stack.push(neighbor);
		});
	}

	return maxNum;
}



// *****************************************************************************
// VERSION 2- AA SOLUTION- RECURSIVE
function maxValue(node, visited = new Set()) {
	if (visited.has(node)) return -Infinity;
	visited.add(node);
	let neighborMaxes = node.neighbors.map((neighbor) => maxValue(neighbor, visited));
	return Math.max(node.val, ...neighborMaxes);
}



module.exports = {
	maxValue
};